using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.TimeTableService;
using SchoolManagement.Models.Models;
using System.Xml;

namespace SchoolManagement.WebAPI.Controllers.Admin
{
  //[Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class TimeTableController : Controller
  {
    private readonly ITimetableService _timeTableService;

    public TimeTableController(ITimetableService TimeTableService)
    {
      _timeTableService = TimeTableService;
    }
    [HttpGet]
    public async Task<IActionResult> GetAllTimeTable()
    {
      var TimeTables = await _timeTableService.GetAllTimetableAsync();
      return Ok(TimeTables);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTimeTableById(int id)
    {
      var TimeTable = await _timeTableService.GetTimetableByIdAsync(id);
      if (TimeTable == null)
      {
        return NotFound();
      }
      return Ok(TimeTable);
    }

    [HttpGet("GetTimetablesByClass/{classId}")]
    public async Task<IActionResult> GetTimetablesByClass(int classId)
    {
      var timetables = await _timeTableService.GetTimetablesWithSubjectsByClassIdAsync(classId);
      return Ok(timetables);
    }



    [HttpPost]
    public async Task<IActionResult> AddTimeTable(TimetableDTO TimeTableDTO)
    {
      Timetable response = new Timetable
      {
        TimetableId = TimeTableDTO.TimetableId,
        ClassId = TimeTableDTO.ClassId,
        SubjectId = TimeTableDTO.SubjectId,
        DateLearn = TimeTableDTO.DateLearn,
        StartTime = TimeTableDTO.StartTime,
        EndTime = TimeTableDTO.EndTime,
        Room = TimeTableDTO.Room
      };
      var createdTimeTable = await _timeTableService.AddTimetableAsync(response);
      return CreatedAtAction(nameof(GetTimeTableById), new { id = createdTimeTable.TimetableId }, createdTimeTable);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTimeTable(int id, TimetableDTO timetableDTO)
    {
      timetableDTO.TimetableId = id;
      var tts = await _timeTableService.GetAllTimetableAsync();
      var tt = tts.Where(t=>t.TimetableId==id).SingleOrDefault();

      tt.ClassId = timetableDTO.ClassId;
      tt.SubjectId = timetableDTO.SubjectId;
      tt.DateLearn = timetableDTO.DateLearn;
      tt.StartTime = timetableDTO.StartTime;
      tt.EndTime = timetableDTO.EndTime;
      tt.Room = timetableDTO.Room;
      var updatedTimeTable = await _timeTableService.UpdateTimetableAsync(tt);
      if (updatedTimeTable == null)
      {
        return NotFound();
      }
      return Ok(updatedTimeTable);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTimeTable(int id)
    {
      var deletedTimeTable = await _timeTableService.DeleteTimetableAsync(id);
      if (deletedTimeTable == null)
      {
        return NotFound();
      }
      return Ok(deletedTimeTable);
    }

    [HttpGet("student/{studentId}")]
    public async Task<IActionResult> GetTimetablesByStudentId(int studentId)
    {
      var timetables = await _timeTableService.GetTimetableByStudentId(studentId);
      if (timetables == null || !timetables.Any())
      {
        return NotFound();
      }
      return Ok(timetables);
    }

    [HttpGet("subject/{subjectId}")]
    public async Task<IActionResult> GetTimetablesBySubjectId(int subjectId)
    {
      var timetables = await _timeTableService.GetTimetableBySubjectId(subjectId);
      if (timetables == null || !timetables.Any())
      {
        return NotFound();
      }
      return Ok(timetables);
    }

  }
}
