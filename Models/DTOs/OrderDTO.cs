using System.ComponentModel.DataAnnotations.Schema;

namespace ShepherdsPies.Models.DTOs;

public class OrderDTO
{
    public int Id { get; set; }
    public int? TableNumber { get; set; }
    public bool IsDelivery { get; set; }
    public DateTime? OrderDateTime { get; set; }
    public decimal Tip { get; set; }
    public int OrderTakeEpId { get; set; }
    public int? DeliverEpId { get; set; }
    [ForeignKey("OrderTakeEpId")] public Employee Taker { get; set; }
    [ForeignKey("DeliverEpId")] public Employee Deliver { get; set; }
    public List<PizzaDTO>? Pizzas { get; set; }
    public decimal? TotalCost {
        get
        {
            if (Pizzas == null){
            return null;
            }
            
            decimal total = 0m;
            foreach(PizzaDTO p in Pizzas){
                //get the base price of the size
                total += p.Size.Price;
                if(p.PizzaToppings != null){
                    //get the price of each topping
                    foreach(PizzaToppingDTO pt in p.PizzaToppings){
                        total += pt.Topping.Price;
                    }
                }
            }
            return total + Tip;
        }

    }
}