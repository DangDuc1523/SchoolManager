using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.StudentService;
using SchoolManagement.Models.Models;

namespace SchoolManagement.WebAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class StudentController : Controller
  {
    private readonly IStudentService _StudentService;

    public StudentController(IStudentService StudentService)
    {
      _StudentService = StudentService;
    }
    [HttpGet]
    public async Task<IActionResult> GetAllStudent()
    {
      var Students = await _StudentService.GetAllStudentAsync();
      return Ok(Students);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetStudentById(int id)
    {
      var Student = await _StudentService.GetStudentByIdAsync(id);
      if (Student == null)
      {
        return NotFound();
      }
      return Ok(Student);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStudent(int id)
    {
      var deletedStudent = await _StudentService.DeleteStudentAsync(id);
      if (deletedStudent == null)
      {
        return NotFound();
      }
      return Ok(deletedStudent);
    }
    [HttpGet("class/{classId}")]
    public async Task<IActionResult> GetStudentByClassId(int classId)
    {
      var Student = await _StudentService.GetStudentByClassIdAsync(classId);
      if (Student == null)
      {
        return NotFound();
      }
      return Ok(Student);
    }

    [HttpGet("class/{classId}/subject/{subjectId}")]
    public async Task<IActionResult> GetStudentsByClassAndSubject(int classId, int subjectId)
    {
      var students = await _StudentService.GetStudentsByClassAndSubjectAsync(classId, subjectId);
      if (students == null || !students.Any())
      {
        return NotFound();
      }
      return Ok(students);
    }
  }
}
