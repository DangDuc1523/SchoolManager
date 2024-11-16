using Microsoft.EntityFrameworkCore;
using SchoolManagement.Data;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.UserService
{
  public class UserService : IUserService
  {
    private readonly IBaseRepository<User> _userRepository;
    private readonly SchoolDbContext _context;

    public UserService(IBaseRepository<User> userRepository, SchoolDbContext context)
    {
      _userRepository = userRepository;
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
      return await _context.Users.FindAsync(username);
    }
    public async Task<bool> UserExists(string username)
    {
      return await _context.Set<User>()
          .AnyAsync(u => u.Username == username);
    }
  }
}
