using API.DTOS;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;
using Core.Entities.Product;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductReturnToDto>()
                .ForMember(d => d.Brand, o => o.MapFrom(s => s.Brand.Name))
                .ForMember(d => d.Type, o => o.MapFrom(s => s.Type.Name))
                .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>());

            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(s => s.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
                .ForMember(s => s.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
                .ForMember(s => s.PictureUrl, o => o.MapFrom<OrderUrlResolver>())
                .ForMember(s => s.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName));
            CreateMap<Order, OrderToReturnDto>()
                .ForMember(s => s.Status, o => o.MapFrom(s => s.OrderStatus));
        }
    }
}