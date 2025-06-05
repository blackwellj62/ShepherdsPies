
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShepherdsPies.Data;
using ShepherdsPies.Models;

namespace ShepherdsPies.Controllers;
[Route("api/[controller]")]
[ApiController]
public class PizzaToppingController : ControllerBase
{
    private  ShepherdsPiesDbContext _dbContext;

    public PizzaToppingController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpDelete("pizza/{id}")]
    //[Authorize]
    public IActionResult DeletePizzaTopping(int id)
    {
        var pizzaTopping = _dbContext.PizzaToppings.Where(pt => pt.PizzaId == id).ToList();
        if (!pizzaTopping.Any())
        {
            return NotFound();
        }

        _dbContext.PizzaToppings.RemoveRange(pizzaTopping);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost]
    //[Authorize]
    public IActionResult PostPizzaTopping(PizzaTopping pizzaTopping)
    {
        _dbContext.PizzaToppings.Add(pizzaTopping);
        _dbContext.SaveChanges();
        return Created();
    }

    // Optional: Add Get/Delete if needed
}
