using Microsoft.EntityFrameworkCore;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Data;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Data.TimeTableRepository
{
    public class TimeTableRepository : BaseRepository<Timetable>, ITimeTableRepository
    {
        public TimeTableRepository(DbContextOptions<SchoolDbContext> options) : base(options)
        {
        }
    }
}
