using SchoolManagement.Models.Models;
using SchoolManagement.Data.BaseRepository;
using Microsoft.EntityFrameworkCore;

namespace SchoolManagement.Business.TimeTableService
{
  public class TimeTableService : ITimetableService
  {
    private readonly IBaseRepository<Timetable> _timeTableRepository;

    public TimeTableService(IBaseRepository<Timetable> timeTableRepository)
    {
      _timeTableRepository = timeTableRepository;
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
      // Sử dụng phương thức GetWhereWithIncludeAsync để lấy Timetables với Subject
      var timetables = await _timeTableRepository.GetWhereWithIncludeAsync(
          t => t.ClassId == classId,
          t => t.Subject // Include Subject vào kết quả
      );

      return timetables;
    }

    public async Task<Timetable> AddTimetableAsync(Timetable timeTable)
    {
      await _timeTableRepository.AddAsync(timeTable);
      return timeTable;
    }

    public async Task<Timetable> UpdateTimetableAsync(Timetable timeTable)
    {
      await _timeTableRepository.UpdateAsync(timeTable);
      return timeTable;
    }

    public async Task<Timetable> DeleteTimetableAsync(int id)
    {
      var timeTable = await _timeTableRepository.GetByIdAsync(id);
      if (timeTable != null)
      {
        await _timeTableRepository.DeleteAsync(id);
      }
      return timeTable;
    }
  }
}
