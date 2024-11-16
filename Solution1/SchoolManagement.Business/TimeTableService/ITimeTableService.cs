using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.TimeTableService
{
  public interface ITimetableService
  {
    Task<IEnumerable<Timetable>> GetAllTimetableAsync();
    Task<Timetable> GetTimetableByIdAsync(int id);
    Task<IEnumerable<Timetable>> GetTimetablesByClassIdAsync(int classId);

    Task<Timetable> AddTimetableAsync(Timetable Class);
    Task<Timetable> UpdateTimetableAsync(Timetable Class);
    Task<Timetable> DeleteTimetableAsync(int id);
  }
}
