using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.StudentService;
using SchoolManagement.Models.Models;
using System.Text.Json;

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


    [HttpPost]
    public async Task<IActionResult> AddStudent([FromBody] JsonElement request)
    {
      // Kiểm tra nếu UserId và ClassId tồn tại trong request
      if (!request.TryGetProperty("UserId", out JsonElement userIdElement) || !request.TryGetProperty("ClassId", out JsonElement classIdElement))
      {
        return BadRequest("UserId and ClassId are required.");
      }

      try
      {
        // Chuyển đổi giá trị từ JsonElement sang kiểu int
        int userId = userIdElement.GetInt32();
        int classId = classIdElement.GetInt32();

        // Kiểm tra nếu sinh viên đã tồn tại với UserId và ClassId này
        var existingStudent = await _StudentService.GetStudentByUserIdAndClassIdAsync(userId, classId);
        if (existingStudent != null)
        {
          return Conflict("Student with the given UserId and ClassId already exists.");
        }

        // Tạo đối tượng Student
        var newStudent = new Student
        {
          UserId = userId,
          ClassId = classId,
          EnrollmentDate = DateTime.Now // Hoặc có thể làm gì đó khác với EnrollmentDate nếu cần
        };

        // Gọi service để thêm mới học sinh
        var addedStudent = await _StudentService.AddStudentAsync(newStudent);

        return CreatedAtAction(nameof(GetStudentById), new { id = addedStudent.StudentId }, addedStudent);
      }
      catch (Exception ex)
      {
        return StatusCode(500, "Internal server error: " + ex.Message);
      }
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

    [HttpGet("user/{userId}/class/{classId}")]
    public async Task<IActionResult> GetStudentByUserIdAndClassId(int userId, int classId)
    {
      var student = await _StudentService.GetStudentByUserIdAndClassIdAsync(userId, classId);
      if (student == null)
      {
        return NotFound();
      }

      // Trả về một đối tượng chỉ có những thông tin cần thiết
      var result = new
      {
        studentId = student.StudentId,
        userId = student.UserId,
        classId = student.ClassId,
        enrollmentDate = student.EnrollmentDate
      };

      return Ok(result);
    }



  }
}
