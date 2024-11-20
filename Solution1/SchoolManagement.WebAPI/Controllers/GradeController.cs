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
    private readonly IStudentService _studentService;
    private readonly ISubjectService _subjectService;
    private readonly IClassService _classService;
    private readonly IUserService _userService;

    public GradeController(IGradeService gradeService, IUserService userService)
    {
      _gradeService = gradeService;
      _userService = userService;
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

    // Lấy tất cả điể

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

    // Lấy điểm theo ID
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



     [HttpPut("{id}")]
    public async Task<IActionResult> UpdateGrade(int id, GradeDTO gradeDTO)
    {
      gradeDTO.GradeId = id;
      var grade = await _gradeService.GetGradeByIdAsync(id);
      grade.SubjectId = gradeDTO.SubjectId;
      grade.StudentId = gradeDTO.StudentId;
      grade.Score = gradeDTO.Score;

      grade.ClassId = gradeDTO.ClassId;
      var updatedGrade = await _gradeService.UpdateGradeAsync(grade);
      if (updatedGrade == null)
      {
        return NotFound();
      }
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
      return Ok(new { message = "Grade đã được xóa.", deletedGrade });
    }

    // Lấy điểm theo ID sinh viên và môn học
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
