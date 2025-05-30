namespace ShepherdsPies.Models;

public class Pizza
{
    public int Id { get; set; }
    public int SizeId { get; set; }
    public Size? Size { get; set; }
    public int CheeseId { get; set; }
    public Cheese? Cheese { get; set; }
    public int SauceId { get; set; }
    public Sauce? Sauce { get; set; }
    public int OrderId { get; set; }
    public List<PizzaTopping>? PizzaToppings { get; set; }
}