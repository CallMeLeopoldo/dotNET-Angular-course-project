using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager){

            if(!userManager.Users.Any()){
                
                var user = new AppUser
                {
                    DisplayName = "Bob",
                    Email = "bob@gmail.com",
                    UserName = "BobSupreme@text.com",
                    Address = new Address
                    {
                        FirstName = "Bob",
                        LastName = "Stanson",
                        Street = "Sesame Street, 10",
                        City = "Transylvania",
                        Country = "United States of Amurica",
                        ZipCode = "7766090",

                    }
                };
                await userManager.CreateAsync(user, "Pas$w0rd");
            }
        }
    }
}