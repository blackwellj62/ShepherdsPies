using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShepherdsPies.Data;
using ShepherdsPies.Models;

namespace ShepherdsPies.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrderController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public OrderController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    //[Authorize]

    public IActionResult Get()
    {
        return Ok(
            _dbContext.Orders
                .Include(o => o.Taker)
                .Include(o => o.Deliver)
                .Include(o => o.Pizzas).ThenInclude(p => p.Size)
                .Include(o => o.Pizzas).ThenInclude(p => p.Cheese)
                .Include(o => o.Pizzas).ThenInclude(p => p.Sauce)
                .Include(o => o.Pizzas).ThenInclude(p => p.PizzaToppings).ThenInclude(pt => pt.Topping)
                .ToList());
    }

    [HttpGet("{id}")]
    //[Authorize]

    public IActionResult GetById(int id)
    {
        Order order = _dbContext.Orders
        .Include(o => o.Taker)
        .Include(o => o.Deliver)
        .Include(o => o.Pizzas).ThenInclude(p => p.Size)
        .Include(o => o.Pizzas).ThenInclude(p => p.Cheese)
        .Include(o => o.Pizzas).ThenInclude(p => p.Sauce)
        .Include(o => o.Pizzas).ThenInclude(p => p.PizzaToppings).ThenInclude(pt => pt.Topping)
        .SingleOrDefault(o => o.Id == id);

        if(order == null){
            return NotFound();

    }

        return Ok(order);

    }

}