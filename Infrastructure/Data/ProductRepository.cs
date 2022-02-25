using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.Product;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _context;

        public ProductRepository(StoreContext context)
        {
            _context = context;

        }

        public async Task<Product> GetProductAsync(int id)
        {
            try{
                return await _context.Products
                    .Include(p => p.Type)
                    .Include(p => p.Brand)
                    .FirstOrDefaultAsync(p => p.Id == id );
            }

            catch(Exception e){
                throw new System.NotImplementedException(e.Message);
            }

            

        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
        {
            return await _context.ProductBrands.ToListAsync();
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            try{
                return await _context.Products
                    .Include(p => p.Type)
                    .Include(p => p.Brand)
                    .ToListAsync();
            }

            catch(Exception e){
                throw new System.NotImplementedException(e.Message);
            }
        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
            return await _context.ProductTypes.ToListAsync();
        }
    }
}