namespace ShepherdsPies.Models.DTOs;

public class PizzaDTO
{
    public int Id { get; set; }
    public int SizeId { get; set; }
    public SizeDTO? Size { get; set; }
    public int CheeseId { get; set; }
    public CheeseDTO? Cheese { get; set; }
    public int SauceId { get; set; }
    public SauceDTO? Sauce { get; set; }
    public int OrderId { get; set; }
    public List<PizzaToppingDTO>? PizzaToppings { get; set; }
}