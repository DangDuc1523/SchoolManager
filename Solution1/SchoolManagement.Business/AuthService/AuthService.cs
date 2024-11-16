using SchoolManagement.Data;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.AuthService
{
    public class AuthService
    {
        private readonly SchoolDbContext _context;

        public AuthService(SchoolDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserAuthen(string username, string password)
        {
            User acc = await _context.Users.FindAsync(username, password);
            if (acc == null) return null;
            else return acc;
        }
    }
}
