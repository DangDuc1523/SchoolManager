using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.TimeTableService
{
    public interface ITimetableService
    {
        Task<IEnumerable<Timetable>> GetAllTimetableAsync();
        Task<Timetable> GetTimetableByIdAsync(int id);
        Task<Timetable> AddTimetableAsync(Timetable Class);
        Task<Timetable> UpdateTimetableAsync(Timetable Class);
        Task<Timetable> DeleteTimetableAsync(int id);
    }
}
