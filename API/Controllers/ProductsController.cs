using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Data;
using Core.Entities.Product;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Core.Interfaces;
using Core.Specifications;
using API.DTOS;
using AutoMapper;
using API.Errors;
using Microsoft.AspNetCore.Http;
using API.Helpers;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private readonly IGenericRepository<Product> _productsRepo;
        private readonly IGenericRepository<ProductBrand> _productBrandsRepo;
        private readonly IGenericRepository<ProductType> _productTypesRepo;

        private readonly IMapper _mapper;

        public ProductsController(IGenericRepository<Product> prodRepo,
            IGenericRepository<ProductBrand> brandRepo,
            IGenericRepository<ProductType> typeRepo, IMapper mapper)
        {
            _mapper = mapper;
            _productsRepo = prodRepo;
            _productBrandsRepo = brandRepo;
            _productTypesRepo = typeRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<ProductReturnToDto>>> GetProducts(
            [FromQuery]ProductSpecParams productParams)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(productParams);

            var countSpec = new ProductsWithFiltersForCountSpecification(productParams);

            var products = await _productsRepo.GetAllAsync(spec);

            var totalItems = await _productsRepo.CountAsync(countSpec);

            var data = _mapper.Map<IReadOnlyList<Product>, IReadOnlyList<ProductReturnToDto>>(products);

            return Ok(new Pagination<ProductReturnToDto>(productParams.PageSize, productParams.PageIndex,
            totalItems, data));

        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<ProductReturnToDto>> GetProductAsync(int id)
        {
            var spec = new ProductsWithTypesAndBrandsSpecification(id);

            var product = await _productsRepo.GetEntityWithSpec(spec);

            if (product == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return _mapper.Map<Product, ProductReturnToDto>(product);

        }

        [HttpGet("brands")]
        public async Task<ActionResult<Product>> GetProductBrandsAsync()
        {

            var productBrands = await _productBrandsRepo.GetAllAsync();

            return Ok(productBrands);

        }

        [HttpGet("types")]
        public async Task<ActionResult<Product>> GetProductTypesAsync()
        {

            var productTypes = await _productTypesRepo.GetAllAsync();

            return Ok(productTypes);

        }



    }
}