namespace ShepherdsPies.Models.DTOs;

public class PizzaToppingDTO {
    public int Id { get; set; }
    public int PizzaId { get; set; }
    public PizzaDTO? Pizza { get; set; }
    public int ToppingId { get; set; }
    public ToppingDTO? Topping { get; set; }
}