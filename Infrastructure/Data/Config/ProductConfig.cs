using Core.Entities.Product;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config
{
    public class ProductConfig : IEntityTypeConfiguration<Product>
    {
        public ProductConfig()
        {
        }

        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Id).IsRequired();
            
            builder.Property(p => p.Name).IsRequired().HasMaxLength(100);
            
            builder.Property(p => p.Description).IsRequired().HasMaxLength(180);

            builder.Property(p => p.ImageUrl).IsRequired();
            
            builder.Property(p => p.Price).HasColumnType("decimal(18,2)");
            
            builder.HasOne(b => b.Brand).WithMany()
                .HasForeignKey(p => p.ProductBrandId);
            
            builder.HasOne(t => t.Type).WithMany()
                .HasForeignKey(p => p.ProductTypeId);
        }
    }
}