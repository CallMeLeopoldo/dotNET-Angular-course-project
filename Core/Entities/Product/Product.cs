namespace Core.Entities.Product
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }   
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl {get; set; }
        public ProductBrand Brand {get; set; }
        public int ProductBrandId {get; set; }
        public ProductType Type {get; set; }
        public int ProductTypeId {get; set; }
    }
}