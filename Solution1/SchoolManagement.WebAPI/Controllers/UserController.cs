using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.UserService;
using SchoolManagement.Models.Models;

namespace SchoolManagement.WebAPI.Controllers.Admin
{
  //[Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class UserController : Controller
  {
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
      _userService = userService;
    }
<<<<<<< HEAD

    // Phương thức GET lấy tất cả người dùng
    [HttpGet]
    public async Task<IActionResult> GetAllUser()
    {
      var users = await _userService.GetAllUserAsync();
      return Ok(users);
    }

    // Phương thức GET lấy người dùng theo id
=======
    [HttpGet]
    public async Task<IActionResult> GetAllUser()
    {
      var users = await _userService.GetAllUserAsync();
      return Ok(users);
    }

>>>>>>> 262ac9ed1b628c2651e3bfff48e37c12dcd1f5b7
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(int id)
    {
      var User = await _userService.GetUserByIdAsync(id);
      if (User == null)
      {
        return NotFound();
      }
      return Ok(User);
    }

    // Phương thức GET lấy người dùng theo classId
    [HttpGet("by-class/{classId}")]
    public async Task<IActionResult> GetUsersByClassId(int classId)
    {
      var users = await _userService.GetUsersByClassIdAsync(classId);
      if (users == null || !users.Any())
      {
        return NotFound("No users found for this class.");
      }

      return Ok(users);
    }

    // Đổi đường dẫn cho phương thức POST lấy tất cả giáo viên
    [HttpPost("teachers")]  // Đổi từ [HttpPost] thành [HttpPost("teachers")]
    public async Task<IActionResult> GetTeachers()
    {
      var teachers = await _userService.GetUsersByRoleAsync("Teacher");
      if (teachers == null || !teachers.Any())
      {
        return NotFound("No teachers found.");
      }

      return Ok(teachers);
    }

    //[HttpPost]
    //public async Task<IActionResult> AddUser(User User)
    //{
    //    var createdUser = await _userService.AddUserAsync(User);
    //    return CreatedAtAction(nameof(GetUserById), new { id = createdUser.UserId }, createdUser);
    //}

    [HttpPut("{id}")]
<<<<<<< HEAD
    public async Task<IActionResult> UpdateUser(int id, User User)
    {
      var updatedUser = await _userService.UpdateUserAsync(User);
=======
    public async Task<IActionResult> UpdateUser(int id, User user)
    {
      user.UserId = id;
      var updatedUser = await _userService.UpdateUserAsync(user);
>>>>>>> 262ac9ed1b628c2651e3bfff48e37c12dcd1f5b7
      if (updatedUser == null)
      {
        return NotFound();
      }
      return Ok(updatedUser);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
      var deletedUser = await _userService.DeleteUserAsync(id);
      if (deletedUser == null)
      {
        return NotFound();
      }
      return Ok(deletedUser);
    }
<<<<<<< HEAD
=======


    //[HttpGet("users/{userId}/search")]
    //public async Task<IActionResult> GetUsersForDoctor(Guid doctorId, int pageNumber = 1, int pageSize = 10, DateTime? startDate = null, DateTime? endDate = null, UserStatus? status = null)
    //{
    //    var Users = await _userService.GetUsersForDoctorAsync(doctorId, pageNumber, pageSize, startDate, endDate, status);
    //    return Ok(Users);
    //}

    //[HttpPatch("Users/{id}/cancel")]
    //public async Task<IActionResult> CancelUser(Guid id)
    //{
    //    var User = await _UserService.GetUserByIdAsync(id);
    //    if (User == null)
    //    {
    //        return NotFound();
    //    }

    //    User.Status = (int)UserStatus.Cancelled;
    //    var updatedUser = await _UserService.UpdateUserAsync(User);

    //    return Ok(updatedUser);
    //}

>>>>>>> 262ac9ed1b628c2651e3bfff48e37c12dcd1f5b7
  }
}
