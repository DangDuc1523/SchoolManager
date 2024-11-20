using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using SchoolManagement.Business.GradeService;
using SchoolManagement.Business.UserService;
using SchoolManagement.Models.Models;

namespace SchoolManagement.WebAPI.Controllers.Admin
{
  [ApiController]
  [Route("api/[controller]")]
  public class GradeController : Controller
  {
    private readonly IGradeService _gradeService;

    private readonly IUserService _userService;

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
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetGradeById(int id)
    {
      var grade = await _gradeService.GetGradeByIdAsync(id);
      if (grade == null)
      {
        return NotFound(new { message = "Grade không tìm thấy." });
      }
      return Ok(grade);
    }

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

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGrade(int id, double score)
    {
      var grades = await _gradeService.GetAllGradeAsync();
      var grade = grades.FirstOrDefault(t => t.GradeId == id);

      if (grade == null)
      {
        return NotFound(new { message = "Grade không tìm thấy để cập nhật." });
      }

      grade.Score = score;
      var updatedGrade = await _gradeService.UpdateGradeAsync(grade);
      return Ok(updatedGrade);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGrade(int id)
    {
      var deletedGrade = await _gradeService.DeleteGradeAsync(id);
      if (deletedGrade == null)
      {
        return NotFound(new { message = "Grade không tồn tại." });
      }
      return Ok(new { message = "Grade đã được xóa.", deletedGrade });
    }

    [HttpGet("{studentId}/{subjectId}")]
    public async Task<IActionResult> GetGradeBySubjectId(int studentId, int subjectId)
    {
      var grades = await _gradeService.GetGradeBySubjectId(studentId, subjectId);
      if (grades == null || !grades.Any())
      {
        return NotFound(new { message = "Không tìm thấy Grade với StudentId và SubjectId được cung cấp." });
      }
      return Ok(grades);
    }

    [HttpPost("ImportGrade")]
    public async Task<IActionResult> ImportFile(IFormFile file)
    {
      if (file == null || file.Length == 0)
        return BadRequest(new { message = "File không hợp lệ." });

      try
      {
        var grades = new List<Grade>();

        using (var stream = new MemoryStream())
        {
          await file.CopyToAsync(stream);
          ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

          using (var package = new ExcelPackage(stream))
          {
            var worksheet = package.Workbook.Worksheets[0];
            var rowCount = worksheet.Dimension.Rows;

            for (int row = 2; row <= rowCount; row++)
            {
              var grade = new Grade
              {
                StudentId = int.Parse(worksheet.Cells[row, 1].Text),
                SubjectId = int.Parse(worksheet.Cells[row, 3].Text),
                ClassId = int.Parse(worksheet.Cells[row, 4].Text),
                Score = double.TryParse(worksheet.Cells[row, 5].Text, out var score) ? (double?)score : null
              };

              var existingGrades = await _gradeService.GetAllGradeAsync();
              var existingGrade = existingGrades
                  .FirstOrDefault(g => g.StudentId == grade.StudentId &&
                                       g.ClassId == grade.ClassId &&
                                       g.SubjectId == grade.SubjectId);

              if (existingGrade != null)
              {
                existingGrade.Score = grade.Score;
                await _gradeService.UpdateGradeAsync(existingGrade);
                continue;
              }

              grades.Add(grade);
            }
          }
        }

        await _gradeService.ImportGradesAsync(grades);
        return Ok(new { message = "Cập nhật thành công!", count = grades.Count });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "Lỗi trong quá trình xử lý.", error = ex.Message });
      }
    }

    [HttpDelete("DeleteStudentAndGrades/{studentId}/{classId}")]
    public async Task<IActionResult> DeleteStudentAndGrades(int studentId, int classId)
    {
      try
      {
        await _gradeService.DeleteStudentAndGradesAsync(studentId, classId);
        return Ok(new { message = "Xóa thành công cả Student và các Grade liên quan!" });
      }
      catch (Exception ex)
      {
        return StatusCode(500, new { message = "Lỗi trong quá trình xử lý.", error = ex.Message });
      }
    }

    [HttpPost("AddDefaultGrade")]
    public async Task<IActionResult> AddDefaultGrade(int studentId, int subjectId, int classId)
    {
      try
      {
        var grade = await _gradeService.AddDefaultGradeAsync(studentId, subjectId, classId);
        return CreatedAtAction(nameof(GetGradeById), new { id = grade.GradeId }, grade);
      }
      catch (Exception ex)
      {
        return BadRequest(new { message = "Lỗi: Không thể thêm Grade mới.", error = ex.Message });
      }
    }

  }
}
