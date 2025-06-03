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

    [HttpPost]
    //[Authorize]
    public IActionResult CreateOrder(Order order)
    {
        order.OrderDateTime = DateTime.Now;
        _dbContext.Orders.Add(order);
        _dbContext.SaveChanges();
        return Created($"/api/order/{order.Id}", order);
    }

    [HttpPut("{id}")]
    //[Authorize]
    public IActionResult UpdateOrder(Order order, int id)
    {
        Order orderToUpdate = _dbContext.Orders.SingleOrDefault(o => o.Id == id);
        if(orderToUpdate == null){
            return NotFound();
        }else if(id != order.Id){
            return BadRequest();
        }

        orderToUpdate.TableNumber = order.TableNumber;
        orderToUpdate.IsDelivery = order.IsDelivery;
        orderToUpdate.Tip = order.Tip;
        orderToUpdate.OrderTakeEpId = order.OrderTakeEpId;
        orderToUpdate.DeliverEpId = order.DeliverEpId;

        _dbContext.SaveChanges();

        return NoContent();

    }

}