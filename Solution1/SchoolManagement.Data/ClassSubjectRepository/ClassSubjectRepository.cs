using Microsoft.EntityFrameworkCore;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Data;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Data.ClassSubjectRepository
{
    public class ClassSubjectRepository : BaseRepository<ClassSubject>,IClassSubjectRepository
    {
        public ClassSubjectRepository(DbContextOptions<SchoolDbContext> options) : base(options)
        {
        }
    }
}
