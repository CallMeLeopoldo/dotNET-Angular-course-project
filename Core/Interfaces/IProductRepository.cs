using System.Threading.Tasks;
using Core.Entities.Product;
using System.Collections.Generic;

namespace Core.Interfaces
{
    public interface IProductRepository
    {
         Task<Product> GetProductAsync(int id);

         Task<IReadOnlyList<Product>> GetProductsAsync();
         Task<IReadOnlyList<ProductType>> GetProductTypesAsync();
         Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync();
    }
}