using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;
using Core.Entities.Product;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data
{
    public class StoreContextSeed
    {
        public async static Task SeedAsync(StoreContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                if (!context.ProductBrands.Any())
                {

                    var brandsData = File.ReadAllText("../Infrastructure/Data/SeedData/brands.json");

                    var brands = JsonSerializer.Deserialize<List<ProductBrand>>(brandsData);

                    foreach (var item in brands)
                    {
                        context.Add(item);
                    }

                    await context.SaveChangesAsync();

                }

                if (!context.ProductTypes.Any())
                {

                    var typesData = File.ReadAllText("../Infrastructure/Data/SeedData/types.json");

                    var types = JsonSerializer.Deserialize<List<ProductType>>(typesData);

                    foreach (var item in types)
                    {
                        context.Add(item);
                    }

                    await context.SaveChangesAsync();

                }

                if (!context.Products.Any())
                {

                    var productsData = File.ReadAllText("../Infrastructure/Data/SeedData/products.json");

                    var products = JsonSerializer.Deserialize<List<Product>>(productsData);

                    foreach (var item in products)
                    {
                        context.Add(item);
                    }

                    await context.SaveChangesAsync();

                }

                if (!context.DeliveryMethods.Any())
                {

                    var dmData = File.ReadAllText("../Infrastructure/Data/SeedData/delivery.json");

                    var dms = JsonSerializer.Deserialize<List<DeliveryMethod>>(dmData);

                    foreach (var item in dms)
                    {
                        context.Add(item);
                    }

                    await context.SaveChangesAsync();

                }

            }

            catch(Exception e){
                var logger = loggerFactory.CreateLogger<StoreContextSeed>();
                logger.LogError(e, e.Message);
            }
        }
    }
}