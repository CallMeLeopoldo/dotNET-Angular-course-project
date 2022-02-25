using System;
using System.Linq.Expressions;
using Core.Entities.Product;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductSpecParams productParams) 
            : base(x =>
                (string.IsNullOrEmpty(productParams.Search) || 
                    x.Name.ToLower().Contains(productParams.Search)) &&
                (!productParams.BrandId.HasValue || productParams.BrandId == x.ProductBrandId ) &&
                (!productParams.TypeId.HasValue || productParams.TypeId == x.ProductTypeId ))
        {
            AddInclude(x => x.Type);
            AddInclude(x => x.Brand);
            AddOrderBy(x => x.Name);
            ApplyPaging((productParams.PageIndex - 1) * productParams.PageSize, productParams.PageSize);

            switch (productParams.Sort)
            {
                case "priceAsc":
                    AddOrderBy(x => x.Price);
                    break;
                
                case "priceDesc":
                    AddOrderByDescending(x => x.Price);
                    break;
                
                case "nameDesc":
                    AddOrderByDescending(x => x.Name);
                    break;
                
                default:
                    break;
            }

        }

        public ProductsWithTypesAndBrandsSpecification(int id) 
            : base(x => x.Id == id)
        {
            AddInclude(x => x.Type);
            AddInclude(x => x.Brand);
        }
    }
}