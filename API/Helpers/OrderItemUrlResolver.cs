using API.DTOS;
using AutoMapper;
using Core.Entities.OrderAggregate;
using Core.Entities.Product;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class OrderUrlResolver : IValueResolver<OrderItem, OrderItemDto, string>
    {
        private IConfiguration _config;

        public OrderUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(OrderItem source, OrderItemDto destination, 
            string destMember, ResolutionContext context)
        {
            if(!string.IsNullOrEmpty(source.ItemOrdered.PictureUrl))
            {
                
                return _config["ApiUrl"] + source.ItemOrdered.PictureUrl;
            
            }

            return null;
        }
    }
}