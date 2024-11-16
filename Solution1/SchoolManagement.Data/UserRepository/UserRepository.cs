using Microsoft.EntityFrameworkCore;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Data;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Data.UserRepository
{
    public class UserRepository : BaseRepository<User>,IUserRepository
    {
        public UserRepository(DbContextOptions<SchoolDbContext> options) : base(options)
        {
        }
        public async Task<User> GetAccountAuthen(string username, string password)
        {
            using (var context = new SchoolDbContext())
            {
                User account = await context.Users.FindAsync(username);
                if (account != null && account.PasswordHash == password)
                {
                    return account;
                }
                else return null;
            }
        }
    }
}
