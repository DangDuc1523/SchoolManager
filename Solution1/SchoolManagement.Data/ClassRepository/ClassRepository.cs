using Microsoft.EntityFrameworkCore;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Data;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Data.ClassRepository
{
    public class ClassRepository : BaseRepository<Class>,IClassRepository
    {
        public ClassRepository(DbContextOptions<SchoolDbContext> options) : base(options)
        {
        }
    }
}
