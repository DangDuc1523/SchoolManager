<<<<<<< HEAD
using Microsoft.EntityFrameworkCore;
=======
>>>>>>> Duck
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.UserService
{
<<<<<<< HEAD
  public interface IUserService
  {
    Task<IEnumerable<User>> GetAllUserAsync();
    Task<User> GetUserByIdAsync(int id);
    Task<User> GetUserByUsernameAsync(string username);
    Task<User> AddUserAsync(User Class);
    Task<User> UpdateUserAsync(User Class);
    Task<User> DeleteUserAsync(int id);
    Task<bool> UserExists(string username);
=======
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUserAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> AddUserAsync(User Class);
        Task<User> UpdateUserAsync(User Class);
        Task<User> DeleteUserAsync(int id);

         Task<IEnumerable<User>> GetUsersByRoleAsync(string role);


>>>>>>> Duck
  }
}
