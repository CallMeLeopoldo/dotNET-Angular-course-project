using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsExtensions
    {
        public static string RetrieveEmailFromClaims(this ClaimsPrincipal user){
            return user.FindFirstValue(ClaimTypes.Email);
        }
    }
}