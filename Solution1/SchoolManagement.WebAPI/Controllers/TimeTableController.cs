using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.TimeTableService;
using SchoolManagement.Models.Models;

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

    [HttpGet("class/{classId}")]
    public async Task<IActionResult> GetTimetablesByClassId(int classId)
    {
      var timetables = await _timeTableService.GetTimetablesByClassIdAsync(classId);
      if (timetables == null || !timetables.Any())
      {
        return NotFound();
      }
      return Ok(timetables);
    }



    [HttpPost]
    public async Task<IActionResult> AddTimeTable(Timetable TimeTable)
    {
      var createdTimeTable = await _timeTableService.AddTimetableAsync(TimeTable);
      return CreatedAtAction(nameof(GetTimeTableById), new { id = createdTimeTable.TimetableId }, createdTimeTable);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTimeTable(int id, Timetable TimeTable)
    {
      TimeTable.TimetableId = id;
      var updatedTimeTable = await _timeTableService.UpdateTimetableAsync(TimeTable);
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

  }
}
