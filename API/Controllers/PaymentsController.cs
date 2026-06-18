using System;
using API.Data;
using API.DTOs;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;
using Stripe.V2;

namespace API.Controllers;

public class PaymentsController(PaymentsService paymentsService,
StoreContext context, IConfiguration config, ILogger<PaymentsController> logger) : BaseApiController
{
  [Authorize]
  [HttpPost]
  public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
  {
    var basket = await context.Baskets.GetBasketWithItemsAsync(Request.Cookies["basketId"]);

    var intent = await paymentsService.CreateOrUpdatePaymentIntent(basket);

    if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

    basket.PaymentIntentId = intent.Id;

    basket.ClientSecret = intent.ClientSecret;

    if (context.ChangeTracker.HasChanges())
    {
      var result = await context.SaveChangesAsync() > 0;

      if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating basket with intent" });
    }

    return Ok(basket.ToDto());
  }

  [HttpPost("webhook")]
  public async Task<IActionResult> StripeWebhook()
  {
    Console.WriteLine("Webhook hit");
    var json = await new StreamReader(Request.Body).ReadToEndAsync();

    try
    {
      var stripeEvent = ConstructStripeEvent(json);

      if (stripeEvent.Data.Object is not PaymentIntent intent)
      {
        return BadRequest("Invalid event data");
      }

      if (intent.Status == "succeeded") await HandlePaymentIntentSucceeded(intent);
      else await HandlePaymentIntentFailed(intent);

      Console.WriteLine($"Webhook received: {intent.Id} - {intent.Status}");

      return Ok();
    }
    catch (StripeException ex)
    {
      logger.LogError(ex, "Stripe webhook error");
      return StatusCode(StatusCodes.Status500InternalServerError, "Webhook error");
    }
    catch (Exception ex)
    {
      logger.LogError(ex, "Unexpected error has occurred");
      return StatusCode(StatusCodes.Status500InternalServerError, "Webhook error");
    }
  }

  private async Task HandlePaymentIntentFailed(PaymentIntent intent)
  {
    var order = await context.Orders
      .Include(x => x.OrderItems)
      .FirstOrDefaultAsync(x => x.PaymentIntendId == intent.Id)
        ?? throw new Exception("Order not found");

    foreach (var item in order.OrderItems)
    {
      var productItem = await context.Products
        .FindAsync(item.ItemOrdered.ProductId)
          ?? throw new Exception("Problem updating order stock");

      productItem.QuantityInStock += item.Quantity;
    }

    order.OrderStatus = OrderStatus.PaymentFailed;

    await context.SaveChangesAsync();
  }

  private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
  {
    Console.WriteLine($"WEBhook paymentId: {intent.Id}");
    var order = await context.Orders
      .Include(x => x.OrderItems)
      .FirstOrDefaultAsync(x => x.PaymentIntendId == intent.Id);

    if(order == null)
    {
      logger.LogError("Order not found!");
      return;
    }

    if(order.GetTotal() != intent.Amount)
    {
      order.OrderStatus = OrderStatus.PaymentMismatch;
    }
    else
    {
      order.OrderStatus = OrderStatus.PaymentReceived;
    }
    
    var basket = await context.Baskets
      .FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id);
    
    if(basket != null) context.Baskets.Remove(basket);

    await context.SaveChangesAsync();
  }

  private Stripe.Event ConstructStripeEvent(string json)
  {
    try
    {
      return EventUtility.ConstructEvent(json,
      Request.Headers["Stripe-Signature"],
      config["StripeSettings:whSecret"],
      throwOnApiVersionMismatch: false
      );
    }
    catch (Exception ex)
    {
      logger.LogError(ex, "Failed to construct stripe");
      throw;
    }
  }
}
