
using System;
using System.Linq;
using System.Reflection;
using Core.Entities.OrderAggregate;
using Core.Entities.Product;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Infrastructure.Data
{
    public class StoreContext : DbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {
        }

        public DbSet<Product> Products {get; set;}
        public DbSet<ProductBrand> ProductBrands {get; set;}
        public DbSet<ProductType> ProductTypes {get; set;}
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<DeliveryMethod> DeliveryMethods { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            if(Database.ProviderName == "Microsoft.EntityFrameworkCore.Sqlite")
            {
                foreach (var entity in modelBuilder.Model.GetEntityTypes())
                {
                    var properties = entity.ClrType.GetProperties().Where(p => 
                        p.PropertyType == typeof(decimal));

                    var dateProperties = entity.ClrType.GetProperties().Where(p => 
                        p.PropertyType == typeof(DateTimeOffset));

                    foreach (var prop in properties)
                    {
                        modelBuilder.Entity(entity.Name).Property(prop.Name).HasConversion<double>();
                    }

                    foreach (var prop in dateProperties)
                    {
                        modelBuilder.Entity(entity.Name).Property(prop.Name)
                            .HasConversion(new DateTimeOffsetToBinaryConverter());
                    }
                }

            }

        }

    }
}