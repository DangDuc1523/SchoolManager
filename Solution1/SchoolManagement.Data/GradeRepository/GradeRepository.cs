using Microsoft.EntityFrameworkCore;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Data;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Data.GradeRepository
{
    public class GradeRepository : BaseRepository<Grade>,IGradeRepository
    {
        public GradeRepository(DbContextOptions<SchoolDbContext> options) : base(options)
        {
        }
    }
}
