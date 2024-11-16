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
    }
}
