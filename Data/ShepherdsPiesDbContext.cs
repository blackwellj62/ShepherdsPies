using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ShepherdsPies.Models;
using Microsoft.AspNetCore.Identity;

namespace ShepherdsPies.Data;

public class ShepherdsPiesDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<Cheese> Cheeses { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Pizza> Pizzas { get; set; }
    public DbSet<Sauce> Sauces { get; set; }
    public DbSet<Size> Sizes { get; set; }
    public DbSet<Topping> Toppings { get; set; }
    public DbSet<PizzaTopping> PizzaToppings { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }

    public ShepherdsPiesDbContext(DbContextOptions<ShepherdsPiesDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            Address = "101 Main Street",
        });

        modelBuilder.Entity<Cheese>().HasData(new Cheese[]
        {
            new Cheese
            {
                Id = 1,
                Name = "Buffalo Mozzarella"
            },
            new Cheese
            {
                Id = 2,
                Name = "Four Cheese"
            },
            new Cheese
            {
                Id = 3,
                Name = "Vegan"
            },
            new Cheese
            {
                Id = 4,
                Name = "None (cheeseless)"
            }
        });
        modelBuilder.Entity<Employee>().HasData(new Employee[]
        {
            new Employee
            {
                Id = 1,
                Name = "Fat Tony"
            },
            new Employee
            {
                Id = 2,
                Name = "Cousin Vinny"
            },
            new Employee
            {
                Id = 3,
                Name = "Frankie"
            },
            new Employee
            {
                Id = 4,
                Name = "Bobby Booey"
            },
            new Employee
            {
                Id = 5,
                Name = "Stan"
            }
        });
        modelBuilder.Entity<Sauce>().HasData(new Sauce[]
        {
            new Sauce
            {
                Id = 1,
                Name = "Marinara"
            },
            new Sauce
            {
                Id = 2,
                Name = "Arrabbiata"
            },
            new Sauce
            {
                Id = 3,
                Name = "Garlic White"
            },
            new Sauce
            {
                Id = 4,
                Name = "None (sauceless pizza)"
            }
        });
        modelBuilder.Entity<Size>().HasData(new Size[]
        {
            new Size
            {
                Id = 1,
                Name = "Small",
                Price = 10.00M
            },
             new Size
            {
                Id = 2,
                Name = "Medium",
                Price = 12.00M
            },
             new Size
            {
                Id = 3,
                Name = "Large",
                Price = 15.00M
            }
        });
        modelBuilder.Entity<Topping>().HasData(new Topping[]
        {
            new Topping
            {
                Id = 1,
                Name = "sausage",
                Price = .50M
            },
            new Topping
            {
                Id = 2,
                Name = "pepperoni",
                Price = .50M
            },
            new Topping
            {
                Id = 3,
                Name = "mushroom",
                Price = .50M
            },
            new Topping
            {
                Id = 4,
                Name = "onion",
                Price = .50M
            },
            new Topping
            {
                Id = 5,
                Name = "green pepper",
                Price = .50M
            },
            new Topping
            {
                Id = 6,
                Name = "black olive",
                Price = .50M
            },
            new Topping
            {
                Id = 7,
                Name = "basil",
                Price = .50M
            },
            new Topping
            {
                Id = 8,
                Name = "extra cheese",
                Price = .50M
            }
        });
        modelBuilder.Entity<Order>().HasData(new Order[]
        {
            new Order
            {
                Id = 1,
                IsDelivery = true,
                OrderDateTime = new DateTime(2025, 5, 30, 14, 30, 0),
                Tip = 10.00M,
                OrderTakeEpId = 1,
                DeliverEpId = 3,

            },
            new Order
            {
                Id = 2,
                TableNumber = 1,
                IsDelivery = false,
                OrderDateTime = new DateTime(2025, 5, 30, 18, 20, 0),
                Tip = 20.00M,
                OrderTakeEpId = 2
            }
        });
        modelBuilder.Entity<Pizza>().HasData(new Pizza[]
        {
            new Pizza
            {
                Id = 1,
                SizeId = 3,
                CheeseId = 1,
                SauceId = 1,
                OrderId = 1
            },
            new Pizza
            {
                Id = 2,
                SizeId = 3,
                CheeseId = 2,
                SauceId = 1,
                OrderId = 2
            },
            new Pizza
            {
                Id = 3,
                SizeId = 2,
                CheeseId = 1,
                SauceId = 1,
                OrderId = 2
            }
        });
        modelBuilder.Entity<PizzaTopping>().HasData(new PizzaTopping[]
        {
            new PizzaTopping
            {
                Id = 1,
                PizzaId = 1,
                ToppingId = 1
            },
            new PizzaTopping
            {
                Id = 2,
                PizzaId = 1,
                ToppingId = 2
            },
            new PizzaTopping
            {
                Id = 3,
                PizzaId = 2,
                ToppingId = 2
            },
            new PizzaTopping
            {
                Id = 4,
                PizzaId = 3,
                ToppingId = 1
            },
            new PizzaTopping
            {
                Id = 5,
                PizzaId = 3,
                ToppingId = 5
            }
        });
    }
}