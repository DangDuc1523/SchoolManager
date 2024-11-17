using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.ClassSubjectService;
using SchoolManagement.Models.Models;

namespace SchoolManagement.WebAPI.Controllers.Admin
{
  //[Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class ClassSubjectController : Controller
  {
    private readonly IClassSubjectService _classSubjectService;

    public ClassSubjectController(IClassSubjectService ClassSubjectService)
    {
      _classSubjectService = ClassSubjectService;
    }
    [HttpGet]
    public async Task<IActionResult> GetAllClassSubject()
    {
      var ClassSubjects = await _classSubjectService.GetAllClassSubjectAsync();
      return Ok(ClassSubjects);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetClassSubjectById(int id)
    {
      var ClassSubject = await _classSubjectService.GetClassSubjectByIdAsync(id);
      if (ClassSubject == null)
      {
        return NotFound();
      }
      return Ok(ClassSubject);
    }

    [HttpPost]
    public async Task<IActionResult> AddClassSubject(ClassSubject ClassSubject)
    {
      var createdClassSubject = await _classSubjectService.AddClassSubjectAsync(ClassSubject);
      return CreatedAtAction(nameof(GetClassSubjectById), new { id = createdClassSubject.ClassSubjectId }, createdClassSubject);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateClassSubject(int id, ClassSubject ClassSubject)
    {
      var updatedClassSubject = await _classSubjectService.GetClassSubjectByIdAsync(id);
      if (updatedClassSubject == null)
      {
        return NotFound();
      }
      updatedClassSubject = ClassSubject;
      updatedClassSubject.ClassSubjectId = id;
      return Ok(updatedClassSubject);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteClassSubject(int id)
    {
      var deletedClassSubject = await _classSubjectService.DeleteClassSubjectAsync(id);
      if (deletedClassSubject == null)
      {
        return NotFound();
      }
      return Ok(deletedClassSubject);
    }

  }
}
