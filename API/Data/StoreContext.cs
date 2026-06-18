using API.Entities;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
  public required DbSet<Product> Products { get; set; }
  public required DbSet<Basket> Baskets { get; set; }
  public required DbSet<Order> Orders { get; set; }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    base.OnModelCreating(builder);

    builder.Entity<IdentityRole>()
      .HasData(
        new IdentityRole {Id = "f975d70e-8e2c-449d-9631-04a361d3c03b", Name = "Member", NormalizedName = "MEMBER" },
        new IdentityRole {Id = "e7a05e55-43c0-4466-8454-87a325367bef", Name = "Admin", NormalizedName = "ADMIN" }
      );
  }
}
