using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SchoolManagement.Data;
using SchoolManagement.Models.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SchoolManagement.WebAPI.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly SchoolDbContext _userService;

        public AuthController(IConfiguration configuration, SchoolDbContext sev)
        {
            _configuration = configuration;
            _userService = sev;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string username, string password)
        {
            // Kiểm tra thông tin đăng nhập (giả sử trong ví dụ này là đúng)
            User acc = _userService.Users
                .Where(u => u.Username == username && u.PasswordHash == password).FirstOrDefault();
            if (acc != null)
            {
                var jwtSettings = _configuration.GetSection("JwtSettings");
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: jwtSettings["Issuer"],
                    audience: jwtSettings["Audience"],
                    claims: new[]
                    {
                        new Claim(ClaimTypes.Name, acc.Username),
                        new Claim(ClaimTypes.Role, acc.Role)
                    },
                    expires: DateTime.Now.AddMinutes(30),
                    signingCredentials: creds);
                return Ok(new JwtSecurityTokenHandler().WriteToken(token));
            }
            return Ok("Login fail");
        }

        [HttpPut("signup")]
        public async Task<IActionResult> SignUp(User u)
        {
            //Code SignUp here
            return Ok();
        }

    }
}
