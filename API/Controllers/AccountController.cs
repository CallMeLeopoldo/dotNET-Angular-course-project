using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOS;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        
        public AccountController(UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IMapper mapper)
        {
            _tokenService = tokenService;
            _mapper = mapper;
            _signInManager = signInManager;
            _userManager = userManager;
        }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {

        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user == null) return Unauthorized(new ApiResponse(401));

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

        return new UserDto
        {
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = _tokenService.CreateToken(user)
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {

        if(CheckEmailExists(registerDto.Email).Result.Value){
            return new BadRequestObjectResult(new ApiValidationErrorResponse{Errors = new []{"Email address is already in use"}});
        }

        var user = new AppUser
        {
            Email = registerDto.Email,
            DisplayName = registerDto.DisplayName,
            UserName = registerDto.Email
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded) return BadRequest(new ApiResponse(400));

        return new UserDto
        {
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = _tokenService.CreateToken(user)
        };
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<UserDto>> GetCurrentLoggedUser(){

        var user = await _userManager.FindEmailFromClaimsPrinciple(HttpContext.User);

        return new UserDto
        {
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = _tokenService.CreateToken(user)
        };

    }

    [HttpGet("emailexists")]
    public async Task<ActionResult<bool>> CheckEmailExists([FromQuery] string email){
        
        return await _userManager.FindByEmailAsync(email) != null;

    
    }

    [HttpGet("address")]
    [Authorize]
    public async Task<ActionResult<AddressDto>> GetUserAddress(){

        var user = await _userManager.FindByEmailWithAddressAsync(HttpContext.User);
        

        return _mapper.Map<Address, AddressDto>(user.Address);
    
    }

    [HttpPut("address")]
    [Authorize]
    public async Task<ActionResult<AddressDto>> UpdateUserAddress(AddressDto address){

        var user = await _userManager.FindByEmailWithAddressAsync(HttpContext.User);
        
        user.Address = _mapper.Map<AddressDto, Address>(address);

        var result = await _userManager.UpdateAsync(user);

        if(result.Succeeded) return Ok(_mapper.Map<Address, AddressDto>(user.Address));

        return BadRequest(new ApiResponse(400));
    
    }
    
    }

}