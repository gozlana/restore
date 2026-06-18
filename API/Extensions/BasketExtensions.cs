using System;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class BasketExtensions
{
  public static BasketDto ToDto(this Basket basket)
  {
    return new BasketDto
    {
      BasketId = basket.BasketId,
      ClientSecret = basket.ClientSecret,
      PaymentIntentId = basket.PaymentIntentId,
      Items = [.. basket.Items.Select(x => new BasketItemDtos
      {
        ProductId = x.ProductId,
        Name = x.Product.Name,
        Price = x.Product.Price,
        Brand = x.Product.Brand,
        Type = x.Product.Type,
        PictureUrl = x.Product.PictureUrl,
        Quantity = x.Quantity  
      })]
    };
  }

  public static async Task<Basket> GetBasketWithItemsAsync(this IQueryable<Basket> query, string? basketId)
  {
    return await query
      .Include(b => b.Items)
      .ThenInclude(i => i.Product)
      .FirstOrDefaultAsync(b => b.BasketId == basketId) ?? throw new Exception("Basket not found");
  } 
}
