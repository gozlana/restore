using System;

namespace API.DTOs;

public class BasketDto
{
  public required string BasketId { get; set; }
  public List<BasketItemDtos> Items { get; set; } = [];
}
