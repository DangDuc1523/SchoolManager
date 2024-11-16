using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.TimeTableService
{
  public class TimeTableService : ITimetableService
  {
    private readonly IBaseRepository<Timetable> _timeTableRepository;

    public TimeTableService(IBaseRepository<Timetable> TimeTableRepository)
    {
      _timeTableRepository = TimeTableRepository;
    }

    public async Task<IEnumerable<Timetable>> GetAllTimetableAsync()
    {
      return await _timeTableRepository.GetAllAsync();
    }

    public async Task<Timetable> GetTimetableByIdAsync(int id)
    {
      return await _timeTableRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<Timetable>> GetTimetablesByClassIdAsync(int classId)
    {
      return await _timeTableRepository.GetWhereAsync(t => t.ClassId == classId);
    }

    public async Task<Timetable> AddTimetableAsync(Timetable TimeTable)
    {
      await _timeTableRepository.AddAsync(TimeTable);
      return TimeTable;
    }

    public async Task<Timetable> UpdateTimetableAsync(Timetable TimeTable)
    {
      await _timeTableRepository.UpdateAsync(TimeTable);
      return TimeTable;
    }

    public async Task<Timetable> DeleteTimetableAsync(int id)
    {
      var TimeTable = await _timeTableRepository.GetByIdAsync(id);
      if (TimeTable != null)
      {
        await _timeTableRepository.DeleteAsync(id);
      }
      return TimeTable;
    }


  }
}
