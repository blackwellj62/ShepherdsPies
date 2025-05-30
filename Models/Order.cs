namespace ShepherdsPies.Models;

public class Order
{
    public int Id { get; set; }
    public bool isDelivery { get; set; }
    public DateTime? OrderDateTime { get; set; }
    public decimal tip { get; set; }
    public int orderTakeEpId { get; set; }
    public int deliverEpId { get; set; }
    public List<Pizza>? Pizzas { get; set; }
    public decimal? TotalCost {
        get
        {
            if (Pizzas == null){
            return null;
            }
            
            decimal total = 0m;
            foreach(Pizza p in Pizzas){
                //get the base price of the size
                total += p.Size.Price;
                if(p.PizzaToppings != null){
                    //get the price of each topping
                    foreach(PizzaTopping pt in p.PizzaToppings){
                        total += pt.Topping.Price;
                    }
                }
            }
            return total;
        }

    }
}