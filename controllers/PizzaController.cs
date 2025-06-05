
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShepherdsPies.Data;
using ShepherdsPies.Models;

namespace ShepherdsPies.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PizzaController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public PizzaController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    //[Authorize]

    public IActionResult Get()
    {
        return Ok(
            _dbContext.Pizzas
                .Include(p => p.Size)
                .Include(p => p.Cheese)
                .Include(p => p.Sauce)
                .Include(p => p.PizzaToppings).ThenInclude(pt => pt.Topping)
                .ToList());
    }

    [HttpGet("{id}")]
    //[Authorize]

    public IActionResult GetById(int id)
    {
        Pizza pizza = _dbContext.Pizzas
            .Include(p => p.Size)
            .Include(p => p.Cheese)
            .Include(p => p.Sauce)
            .Include(p => p.PizzaToppings).ThenInclude(pt => pt.Topping)
            .SingleOrDefault(p => p.Id == id);

        if (pizza == null)
        {
            return NotFound();
        }

        return Ok(pizza);

    }

    [HttpPost]
    //[Authorize]
    public IActionResult CreatePizza(Pizza pizza)
    {
        _dbContext.Pizzas.Add(pizza);
        _dbContext.SaveChanges();
        return Created("", pizza);
    }

    [HttpPut("{id}")]
    //[Authorize]
    public IActionResult UpdatePiza(Pizza pizza, int id)
    {
        Pizza pizzaToUpdate = _dbContext.Pizzas.SingleOrDefault(p => p.Id == id);
        if(pizzaToUpdate == null){
            return NotFound();
        }else if(id !=  pizza.Id){
            return BadRequest();
        }

        pizzaToUpdate.CheeseId = pizza.CheeseId;
        pizzaToUpdate.SauceId = pizza.SauceId;
        pizzaToUpdate.SizeId = pizza.SizeId;
        pizzaToUpdate.OrderId = pizza.OrderId;

        _dbContext.SaveChanges();

        return NoContent();
    }

    [HttpDelete("{id}")]
    //[Authorize ]
    public IActionResult DeletePizza(int id)
    {
        var pizza = _dbContext.Pizzas
            .Include(p => p.PizzaToppings)
            .FirstOrDefault(p => p.Id == id);

        if (pizza == null)
        {
            return NotFound();
        }

        _dbContext.PizzaToppings.RemoveRange(pizza.PizzaToppings);
        _dbContext.Pizzas.Remove(pizza);
        _dbContext.SaveChanges();

        return NoContent();
    }


}