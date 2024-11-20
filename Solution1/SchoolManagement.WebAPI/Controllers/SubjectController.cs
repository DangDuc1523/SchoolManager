using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.ClassService;
using SchoolManagement.Business.ClassSubjectService;
using SchoolManagement.Business.GradeService;
using SchoolManagement.Business.SubjectService;
using SchoolManagement.Business.TimeTableService;
using SchoolManagement.Data;
using SchoolManagement.Data.GradeRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.WebAPI.Controllers.Admin
{
  //[Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class SubjectController : Controller
  {
    private readonly IClassService _classService;
    private readonly ISubjectService _subjectService;
    private readonly IClassSubjectService _classSubjectService;
    private readonly IGradeService _gradeService;
    private readonly ITimetableService _tt;
    private readonly SchoolDbContext _context;

    public SubjectController(IClassService classService, ISubjectService subjectService, IClassSubjectService classSubjectService,
      IGradeService gradeService, ITimetableService tt, SchoolDbContext context)
    {
      _classService = classService;
      _subjectService = subjectService;
      _classSubjectService = classSubjectService;
      _gradeService = gradeService;
      _tt = tt;
      _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSubject()
    {
      var Subjects = await _subjectService.GetAllSubjectAsync();
      return Ok(Subjects);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetSubjectById(int id)
    {
      var Subject = await _subjectService.GetSubjectByIdAsync(id);
      if (Subject == null)
      {
        return NotFound();
      }
      return Ok(Subject);
    }

    [HttpPost]
    public async Task<IActionResult> AddSubject(Subject Subject)
    {
      var createdSubject = await _subjectService.AddSubjectAsync(Subject);
      return CreatedAtAction(nameof(GetSubjectById), new { id = createdSubject.SubjectId }, createdSubject);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSubject(int id, Subject Subject)
    {
      Subject.SubjectId = id;
      var updatedSubject = await _subjectService.UpdateSubjectAsync(Subject);
      if (updatedSubject == null)
      {
        return NotFound();
      }
      return Ok(updatedSubject);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSubject(int id)
    {
      var deletedSubject = await _subjectService.DeleteSubjectAsync(id);
      if (deletedSubject == null)
      {
        return NotFound();
      }
      return Ok(deletedSubject);
    }

    [HttpGet("class/{classId}")]
    public async Task<IActionResult> GetSubjectsByClassIdAsync(int classId)
    {
      var subjects = await _subjectService.GetSubjectsByClassIdAsync(classId);
      if (!subjects.Any())
      {
        return NotFound();
      }
      return Ok(subjects);
    }
    [HttpGet("class/{classId}/teacher/{teacherId}")]
    public async Task<IActionResult> GetSubjectsByClassAndTeacher(int classId, int teacherId)
    {
      var subjects = await _subjectService.GetSubjectsByClassAndTeacherAsync(classId, teacherId);
      if (!subjects.Any())
      {
        return NotFound();
      }
      return Ok(subjects);
    }


    [HttpGet("teacher/{teacherId}")]
    public async Task<IActionResult> GetSubjectByTeacherId(int teacherId)
    {
      var Subjects = await _subjectService.GetSubjectByTeacherIdAsync(teacherId);
      if (Subjects == null)
      {
        return NotFound();
      }
      return Ok(Subjects);
    }

  }
}
