using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;
using System.ComponentModel;

namespace SchoolManagement.Business.TimeTableService
{
  public class TimeTableService : ITimetableService
  {
    private readonly IBaseRepository<Timetable> _timeTableRepository;
    private readonly IBaseRepository<Student> _studentRepository;

    public TimeTableService(IBaseRepository<Timetable> timeTableRepository, IBaseRepository<Student> studentRepository)
    {
      _timeTableRepository = timeTableRepository;
      _studentRepository = studentRepository;
    }

    public async Task<IEnumerable<Timetable>> GetAllTimetableAsync()
    {
      return await _timeTableRepository.GetAllAsync();
    }

    public async Task<Timetable> GetTimetableByIdAsync(int id)
    {
      return await _timeTableRepository.GetByIdAsync(id);
    }

    public async Task<IEnumerable<Timetable>> GetTimetablesWithSubjectsByClassIdAsync(int classId)
    {
<<<<<<< HEAD
      var tts = await _timeTableRepository.GetAllAsync();
      return tts.Where(tt => tt.ClassId == classId).ToList();
=======
      // Lấy dữ liệu từ bảng Timetable, bao gồm bảng Subject liên quan
      var timetables = await _timeTableRepository.GetWhereWithIncludeAsync(
          t => t.ClassId == classId, // Lọc theo ClassId
          t => t.Subject             // Include Subject vào kết quả
      );

      return timetables;


>>>>>>> c0bc557b0f2d2c7f539d9725e864977729284bd4
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
    public async Task<IEnumerable<Timetable>> GetTimetablesByClassIdAsync(int classId)
    {
      return await _timeTableRepository.GetWhereAsync(t => t.ClassId == classId);
    }


    public async Task<IEnumerable<Timetable>> GetTimetableByStudentId(int studentId)
    {
      Student s = await _studentRepository.GetByIdAsync(studentId);
      return await GetTimetablesByClassIdAsync(s.ClassId);
    }

    public async Task<IEnumerable<Timetable>> GetTimetableBySubjectId(int subjectId)
    {
      var tts = await _timeTableRepository.GetAllAsync();
      return tts.Where(t=>t.SubjectId==subjectId);
    }
  }
}
