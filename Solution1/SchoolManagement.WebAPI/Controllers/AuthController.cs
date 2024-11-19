
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SchoolManagement.Business;
using SchoolManagement.Business.UserService;
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
    private readonly IUserService _uService;
    private readonly EmailService _emailService;

    public AuthController(IConfiguration configuration, SchoolDbContext userService, IUserService uService, EmailService emailService)
    {
      _configuration = configuration;
      _userService = userService;
      _uService = uService;
      _emailService = emailService;

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
                        new Claim("UserId", acc.UserId.ToString()),
                        new Claim("Username", acc.Username),
                        new Claim("UserRole", acc.Role)
            },
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: creds);
        return Ok(new JwtSecurityTokenHandler().WriteToken(token));
      }
      return Ok("Login fail");
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserRegisterDto registerDto)
    {
      // Kiểm tra xem email hoặc username đã tồn tại chưa
      var userExists = await _uService.GetUserByUsernameAsync(registerDto.Username);
      if (userExists != null && userExists.EmailConfirmed==true)
        return BadRequest("Email hoặc Username đã tồn tại");

      // Tạo người dùng mới và lưu vào database
      var user = new User
      {
        Username = registerDto.Username,
        PasswordHash = registerDto.Password, 
        EmailConfirmed = false,
        FullName = registerDto.FullName,
        Role = "Student",
        Address = registerDto.Address,
        DateOfBirth = registerDto.DateOfBirth,
        ContactInfo = registerDto.ContactInfo,
        Specialty = registerDto.Specialty
      };
      var random = new Random();
      user.OtpCode = random.Next(100000, 999999).ToString();
      if (userExists != null) await _uService.DeleteUserAsync(userExists.UserId);
      await _uService.AddUserAsync(user);

      // Tạo mã OTP
      

      // Gửi OTP qua email
      await _emailService.SendEmailAsync(user.Username, "Mã OTP xác nhận đăng ký",
          $"Mã OTP của bạn là: {user.OtpCode}. Mã này sẽ hết hạn sau 5 phút.");

      return Ok("Đăng ký thành công! Vui lòng kiểm tra email để lấy mã OTP xác nhận.");
    }
    [HttpPost("verify-otp")]
    public async Task<IActionResult> VerifyOtp(VerifyOtpDto verifyOtpDto)
    {
      var user = await _uService.GetUserByUsernameAsync(verifyOtpDto.Username);
      if (user == null) return BadRequest("Người dùng không tồn tại");

      if (user.OtpCode != verifyOtpDto.OtpCode) return BadRequest("Mã OTP không chính xác");

      // Cập nhật trạng thái xác nhận email
      user.EmailConfirmed = true;
      user.OtpCode = null; // Xóa mã OTP sau khi xác nhận thành công

      await _uService.UpdateUserAsync(user);

      return Ok("Email của bạn đã được xác thực thành công.");
    }
    [HttpPost("forgetpassword")]
    public async Task<IActionResult> ForgetPassword(string username)
    {
      var userExists = await _uService.GetUserByUsernameAsync(username);
      if (userExists == null && userExists.EmailConfirmed == false)
        return BadRequest("Username không tồn tại");
      const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var random = new Random();
      var password = new char[8];

      for (int i = 0; i < 8; i++)
      {
        password[i] = chars[random.Next(chars.Length)];
      }
      userExists.PasswordHash = new string(password);
      await _uService.UpdateUserAsync(userExists);
      await _emailService.SendEmailAsync(username, "Mật khẩu đã được thay đổi",
          $"Mật khẩu của bạn là: {userExists.PasswordHash}.");

      return Ok("Đã gửi mật khẩu vào email của bạn");
    }
  }
}
