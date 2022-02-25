using Core.Entities.Product;

namespace Core.Specifications
{
    public class ProductsWithFiltersForCountSpecification : BaseSpecification<Product>
    {
        public ProductsWithFiltersForCountSpecification(ProductSpecParams productParams)
        : base(x => (string.IsNullOrEmpty(
                productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
            (!productParams.BrandId.HasValue || productParams.BrandId == x.ProductBrandId) &&
            (!productParams.TypeId.HasValue || productParams.TypeId == x.ProductTypeId))
        {
        }
    }
}