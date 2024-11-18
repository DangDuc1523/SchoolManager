using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.SubjectService;
using SchoolManagement.Models.Models;

namespace SchoolManagement.WebAPI.Controllers.Admin
{
  //[Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class SubjectController : Controller
  {
    private readonly ISubjectService _subjectService;

    public SubjectController(ISubjectService SubjectService)
    {
      _subjectService = SubjectService;
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
