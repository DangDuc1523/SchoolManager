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
  //[Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class GradeController : Controller
  {
    private readonly IGradeService _gradeService;
    private readonly IUserService _userService;
    private readonly IStudentService _studentService;
    private readonly ISubjectService _subjectService;
    private readonly IClassService _classService;

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
      var Grade = await _gradeService.GetGradeByIdAsync(id);
      if (Grade == null)
      {
        return NotFound();
      }
      Grade.Student = await _studentService.GetStudentByIdAsync(Grade.StudentId);
      Grade.Subject = await _subjectService.GetSubjectByIdAsync(Grade.SubjectId);
      Grade.Class = await _classService.GetClassByIdAsync(Grade.ClassId);
      Grade.Student.User = await _userService.GetUserByIdAsync(Grade.Student.UserId);
      return Ok(Grade);
    }

    [HttpPost]
    public async Task<IActionResult> AddGrade(GradeDTO GradeDTO)
    {
      Grade g = new Grade
      {
        ClassId = GradeDTO.ClassId,
        SubjectId = GradeDTO.SubjectId,
        StudentId = GradeDTO.StudentId,
        Score = GradeDTO.Score
      };
      var createdGrade = await _gradeService.AddGradeAsync(g);
      return CreatedAtAction(nameof(GetGradeById), new { id = createdGrade.GradeId }, createdGrade);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGrade(int id, GradeDTO gradeDTO)
    {
      gradeDTO.GradeId = id;
      var grade = await _gradeService.GetGradeByIdAsync(id);
      grade.SubjectId = gradeDTO.SubjectId;
      grade.StudentId = gradeDTO.StudentId;
      grade.Score = gradeDTO.Score;
<<<<<<< HEAD
      grade.ClassId=gradeDTO.ClassId;
=======
      grade.ClassId = gradeDTO.ClassId;
>>>>>>> 15cf1ac6554ce828e36536d3e953347d765826b7
      var updatedGrade = await _gradeService.UpdateGradeAsync(grade);
      if (updatedGrade == null)
      {
        return NotFound();
      }
      return Ok(updatedGrade);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGrade(int id)
    {
      var deletedGrade = await _gradeService.DeleteGradeAsync(id);
      if (deletedGrade == null)
      {
        return NotFound();
      }
      return Ok(deletedGrade);
    }

    [HttpGet("{studentId}/{subjectId}")]
    public async Task<IActionResult> GetGradeBySubjectId(int studentId, int subjectId)
    {
      var Grades = await _gradeService.GetGradeBySubjectId(studentId, subjectId);
      if (Grades == null)
      {
        return NotFound();
      }
      foreach (var Grade in Grades)
      {
        Grade.Student.User = await _userService.GetUserByIdAsync(Grade.Student.UserId);
      }
      return Ok(Grades);
    }

    [HttpPost("ImportGrade")]
    public async Task<IActionResult> ImportFile(IFormFile file)
    {
      if (file == null || file.Length == 0)
        return BadRequest("File không hợp lệ.");
      try
      {
        var grades = new List<Grade>();

        using (var stream = new MemoryStream())
        {
          await file.CopyToAsync(stream);
          ExcelPackage.LicenseContext = LicenseContext.NonCommercial; // Cấu hình giấy phép
          using (var package = new ExcelPackage(stream))
          {
            var worksheet = package.Workbook.Worksheets[0]; // Lấy sheet đầu tiên
            var rowCount = worksheet.Dimension.Rows;

            for (int row = 2; row <= rowCount; row++) // Bỏ qua hàng tiêu đề
            {
              var grade = new Grade
              {
                StudentId = int.Parse(worksheet.Cells[row, 1].Text),
                SubjectId = int.Parse(worksheet.Cells[row, 3].Text),
                ClassId = int.Parse(worksheet.Cells[row, 4].Text),
                Score = double.TryParse(worksheet.Cells[row, 5].Text, out var score) ? (double?)score : null
              };
              var gs = await _gradeService.GetAllGradeAsync();
              var g = gs.Where(g1=>g1.StudentId==grade.StudentId&&g1.ClassId==grade.ClassId
                &&g1.SubjectId==grade.SubjectId).FirstOrDefault();
              if(g!=null)
              {
                g.Score = grade.Score;

                 await _gradeService.UpdateGradeAsync(g);
                continue;
              }
              grades.Add(grade);
            }
          }
        }

        // Gửi danh sách dữ liệu vào service để xử lý lưu trữ
        await _gradeService.ImportGradesAsync(grades);
        string mes = null;
        if (grades.Count == 0) mes = "";
        return Ok(new { message = "Cập nhật thành công!", count = grades.Count });
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Lỗi: {ex.Message}");
      }
    }
  }
}
