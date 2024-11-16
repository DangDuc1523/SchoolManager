using Microsoft.EntityFrameworkCore;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Data.StudentRepository
{
    public class StudentRepository : BaseRepository<Student>,IStudentRepository
    {
        public StudentRepository(DbContextOptions<SchoolDbContext> options) : base(options)
        {
        }
    }
}
