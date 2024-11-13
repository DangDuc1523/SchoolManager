using Microsoft.EntityFrameworkCore;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Data.SubjectRepository
{
    public class SubjectRepository : BaseRepository<Subject>,ISubjectRepository
    {
        public SubjectRepository(DbContextOptions<SchoolDbContext> options) : base(options)
        {
        }
    }
}
