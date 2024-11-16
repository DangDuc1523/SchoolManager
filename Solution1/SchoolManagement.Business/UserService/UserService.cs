using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.UserService
{
    public class UserService : IUserService
    {
        private readonly IBaseRepository<User> _userRepository;

        public UserService(IBaseRepository<User> UserRepository)
        {
            _userRepository = UserRepository;
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


    public async Task<IEnumerable<User>> GetUsersByRoleAsync(string role)
    {
      return await _userRepository.GetWhereAsync(u => u.Role == role);
    }


  }
}
