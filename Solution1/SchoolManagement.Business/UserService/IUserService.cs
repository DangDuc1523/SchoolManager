using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.UserService
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllUserAsync();
        Task<User> GetUserByIdAsync(int id);
        Task<User> AddUserAsync(User Class);
        Task<User> UpdateUserAsync(User Class);
        Task<User> DeleteUserAsync(int id);
        Task<IEnumerable<User>> GetUsersByRoleAsync(string role);
        Task<IEnumerable<User>> GetUsersByClassIdAsync(int classId);
        Task<User> GetUserByUsernameAsync(string username);
        Task<bool> UserExists(string username);
  }
}
