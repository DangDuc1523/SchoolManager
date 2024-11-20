using Microsoft.EntityFrameworkCore;
using SchoolManagement.Data;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.UserService
{
  public class UserService : IUserService
  {
    private readonly IBaseRepository<User> _userRepository;
    private readonly IBaseRepository<Student> _studentRepository;
    private readonly SchoolDbContext _context;

    public UserService(IBaseRepository<User> userRepository, IBaseRepository<Student> studentRepository, SchoolDbContext context)
    {
      _userRepository = userRepository;
      _studentRepository = studentRepository; // Đảm bảo giá trị này được gán
      _context = context;
    }


    public async Task<IEnumerable<User>> GetAllUserAsync()
    {
      return await _userRepository.GetAllAsync();
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
      return await _userRepository.GetByIdAsync(id);
    }

    public async Task<User> AddUserAsync(User User)
    {
      await _userRepository.AddAsync(User);
      return User;
    }

    public async Task<User> UpdateUserAsync(User User)
    {
      await _userRepository.UpdateAsync(User);
      return User;
    }

    public async Task<User> DeleteUserAsync(int id)
    {
      var User = await _userRepository.GetByIdAsync(id);
      if (User != null)
      {
        await _userRepository.DeleteAsync(id);
      }
      return User;
    }

    public async Task<User> GetUserByUsernameAsync(string username)
    {
      User u = _context.Users.Where(u => u.Username == username).FirstOrDefault();
      return u;
    }
    public async Task<bool> UserExists(string username)
    {
      return await _context.Set<User>()
          .AnyAsync(u => u.Username == username);
    }
    public async Task<IEnumerable<User>> GetUsersByRoleAsync(string role)
    {
      return await _userRepository.GetWhereAsync(u => u.Role == role);
    }

    public async Task<IEnumerable<User>> GetUsersByClassIdAsync(int classId)
    {
      // Lấy danh sách sinh viên theo ClassId
      var students = await _studentRepository.GetWhereAsync(s => s.ClassId == classId);

      // Duyệt qua danh sách sinh viên và lấy thông tin User của mỗi sinh viên
      var users = new List<User>();
      foreach (var student in students)
      {
        var user = await _userRepository.GetByIdAsync(student.UserId);
        if (user != null)
        {
          users.Add(user);
        }
      }

      return users;
    }

    public async Task<User> ChangeUserRoleAsync(int userId, string newRole)
    {
      var user = await _userRepository.GetByIdAsync(userId);
      if (user == null)
      {
        return null; // Không tìm thấy user
      }

      if (user.Role == newRole)
      {
        return user; // Role không thay đổi
      }

      user.Role = newRole;
      await _userRepository.UpdateAsync(user); // Cập nhật user với role mới
      return user;
    }
  }
}
