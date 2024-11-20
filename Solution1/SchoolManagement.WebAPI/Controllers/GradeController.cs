using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using SchoolManagement.Business.ClassService;
using SchoolManagement.Business.GradeService;
using SchoolManagement.Business.StudentService;
using SchoolManagement.Business.SubjectService;
using SchoolManagement.Business.UserService;
using SchoolManagement.Models.Models;

namespace SchoolManagement.WebAPI.Controllers.Admin
{
  //[Authorize] // Uncomment nếu bạn muốn áp dụng quyền truy cập
  [ApiController]
  [Route("api/[controller]")]
  public class GradeController : ControllerBase
  {
    private readonly IGradeService _gradeService;
    private readonly IUserService _userService;
    private readonly IStudentService _studentService;
    private readonly ISubjectService _subjectService;
    private readonly IClassService _classService;

<<<<<<< HEAD
    public GradeController(IGradeService gradeService)
    {
      _gradeService = gradeService;
    }

    [HttpGet("student/{studentId}")]
    public async Task<IActionResult> GetGradesByStudentId(int studentId)
    {
      var grades = await _gradeService.GetGradesByStudentIdAsync(studentId);
      if (grades == null || !grades.Any())
      {
        return NotFound(new { message = "Không tìm thấy điểm cho học sinh này." });
      }
      return Ok(grades);
    }

    // Lấy tất cả điểm
    [HttpGet]
    public async Task<IActionResult> GetAllGrade()
    {
      var grades = await _gradeService.GetAllGradeAsync();
      return Ok(grades);
=======
    public GradeController(IGradeService gradeService, IUserService userService)
    {
      _gradeService = gradeService;
      _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllGrade()
    {
      var Grades = await _gradeService.GetAllGradeAsync();
      foreach (var Grade in Grades)
      {
        Grade.Student.User = await _userService.GetUserByIdAsync(Grade.Student.UserId);
      }
      return Ok(Grades);
>>>>>>> b093ef6e509be427d06c6c1b5b0e55d32f560f52
    }

    // Lấy điểm theo ID
    [HttpGet("{id}")]
    public async Task<IActionResult> GetGradeById(int id)
    {
      var grade = await _gradeService.GetGradeByIdAsync(id);
      if (grade == null)
      {
        return NotFound(new { message = "Không tìm thấy điểm với ID này." });
      }
<<<<<<< HEAD
      return Ok(grade);
=======
      Grade.Student = await _studentService.GetStudentByIdAsync(Grade.StudentId);
      Grade.Subject = await _subjectService.GetSubjectByIdAsync(Grade.SubjectId);
      Grade.Class = await _classService.GetClassByIdAsync(Grade.ClassId);
      Grade.Student.User = await _userService.GetUserByIdAsync(Grade.Student.UserId);
      return Ok(Grade);
>>>>>>> b093ef6e509be427d06c6c1b5b0e55d32f560f52
    }

    // Thêm điểm
    [HttpPost]
    public async Task<IActionResult> AddGrade(GradeDTO gradeDTO)
    {
      var grade = new Grade
      {
        ClassId = gradeDTO.ClassId,
        SubjectId = gradeDTO.SubjectId,
        StudentId = gradeDTO.StudentId,
        Score = gradeDTO.Score
      };
      var createdGrade = await _gradeService.AddGradeAsync(grade);
      return CreatedAtAction(nameof(GetGradeById), new { id = createdGrade.GradeId }, createdGrade);
    }

<<<<<<< HEAD
    // Cập nhật điểm
=======

>>>>>>> b093ef6e509be427d06c6c1b5b0e55d32f560f52
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGrade(int id, GradeDTO gradeDTO)
    {
<<<<<<< HEAD
      var grades = await _gradeService.GetAllGradeAsync();
      var grade = grades.FirstOrDefault(t => t.GradeId == id);

      if (grade == null)
=======
      gradeDTO.GradeId = id;
      var grade = await _gradeService.GetGradeByIdAsync(id);
      grade.SubjectId = gradeDTO.SubjectId;
      grade.StudentId = gradeDTO.StudentId;
      grade.Score = gradeDTO.Score;

      grade.ClassId = gradeDTO.ClassId;
      var updatedGrade = await _gradeService.UpdateGradeAsync(grade);
      if (updatedGrade == null)
>>>>>>> b093ef6e509be427d06c6c1b5b0e55d32f560f52
      {
        return NotFound(new { message = "Không tìm thấy điểm để cập nhật." });
      }

      grade.Score = score;
      var updatedGrade = await _gradeService.UpdateGradeAsync(grade);
      return Ok(updatedGrade);
    }

    // Xóa điểm
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGrade(int id)
    {
      var deletedGrade = await _gradeService.DeleteGradeAsync(id);
      if (deletedGrade == null)
      {
        return NotFound(new { message = "Không tìm thấy điểm để xóa." });
      }
      return Ok(deletedGrade);
    }

    // Lấy điểm theo ID sinh viên và môn học
    [HttpGet("{studentId}/{subjectId}")]
    public async Task<IActionResult> GetGradeBySubjectId(int studentId, int subjectId)
    {
<<<<<<< HEAD
      var grades = await _gradeService.GetGradeBySubjectId(studentId, subjectId);
      if (grades == null || !grades.Any())
=======
      var Grades = await _gradeService.GetGradeBySubjectId(studentId, subjectId);
      if (Grades == null)
>>>>>>> b093ef6e509be427d06c6c1b5b0e55d32f560f52
      {
        return NotFound(new { message = "Không tìm thấy điểm cho sinh viên và môn học này." });
      }
<<<<<<< HEAD
      return Ok(grades);
=======
      foreach (var Grade in Grades)
      {
        Grade.Student.User = await _userService.GetUserByIdAsync(Grade.Student.UserId);
      }
      return Ok(Grades);
>>>>>>> b093ef6e509be427d06c6c1b5b0e55d32f560f52
    }

    // Import điểm từ file Excel
    [HttpPost("ImportGrade")]
    public async Task<IActionResult> ImportFile(IFormFile file)
    {
      if (file == null || file.Length == 0)
      {
        return BadRequest(new { message = "File không hợp lệ." });
      }

      try
      {
        var gradesToImport = new List<Grade>();

        using (var stream = new MemoryStream())
        {
          await file.CopyToAsync(stream);
          ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

          using (var package = new ExcelPackage(stream))
          {
            var worksheet = package.Workbook.Worksheets[0];
            if (worksheet == null)
            {
              return BadRequest(new { message = "Không tìm thấy dữ liệu trong file." });
            }

            var rowCount = worksheet.Dimension.Rows;

            for (int row = 2; row <= rowCount; row++) // Bỏ qua tiêu đề
            {
              var grade = new Grade
              {
                StudentId = int.Parse(worksheet.Cells[row, 1].Text),
                SubjectId = int.Parse(worksheet.Cells[row, 3].Text),
                ClassId = int.Parse(worksheet.Cells[row, 4].Text),
                Score = double.TryParse(worksheet.Cells[row, 5].Text, out var score) ? (double?)score : null
              };

              // Kiểm tra xem điểm đã tồn tại chưa
              var existingGrades = await _gradeService.GetAllGradeAsync();
              var existingGrade = existingGrades
                  .FirstOrDefault(g => g.StudentId == grade.StudentId &&
                                       g.ClassId == grade.ClassId &&
                                       g.SubjectId == grade.SubjectId);

              if (existingGrade != null)
              {
<<<<<<< HEAD
                existingGrade.Score = grade.Score;
                await _gradeService.UpdateGradeAsync(existingGrade);
=======
                g.Score = grade.Score;

                 await _gradeService.UpdateGradeAsync(g);
>>>>>>> b093ef6e509be427d06c6c1b5b0e55d32f560f52
                continue;
              }

              gradesToImport.Add(grade);
            }
          }
        }

        await _gradeService.ImportGradesAsync(gradesToImport);

        var message = gradesToImport.Count == 0
            ? "Không có dữ liệu mới để thêm."
            : $"Cập nhật thành công {gradesToImport.Count} bản ghi.";

        return Ok(new { message, count = gradesToImport.Count });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = $"Lỗi: {ex.Message}" });
      }
    }
  }
}
