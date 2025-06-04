
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
