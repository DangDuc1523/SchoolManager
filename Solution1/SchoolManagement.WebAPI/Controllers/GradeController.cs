using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using SchoolManagement.Business.GradeService;
using SchoolManagement.Models.Models;

namespace SchoolManagement.WebAPI.Controllers.Admin
{
  //[Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public class GradeController : Controller
  {
    private readonly IGradeService _gradeService;

    public GradeController(IGradeService GradeService)
    {
      _gradeService = GradeService;
    }
    [HttpGet]
    public async Task<IActionResult> GetAllGrade()
    {
      var Grades = await _gradeService.GetAllGradeAsync();
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
    public async Task<IActionResult> UpdateGrade(int id, double score)
    {
      var grades = await _gradeService.GetAllGradeAsync();
      var g = grades.Where(t => t.GradeId == id).FirstOrDefault();
      g.Score = score;
      var updatedGrade = await _gradeService.UpdateGradeAsync(g);
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
      var Grade = await _gradeService.GetGradeBySubjectId(studentId, subjectId);
      if (Grade == null)
      {
        return NotFound();
      }
      return Ok(Grade);
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

              grades.Add(grade);
            }
          }
        }

        // Gửi danh sách dữ liệu vào service để xử lý lưu trữ
        await _gradeService.ImportGradesAsync(grades);

        return Ok(new { message = "Import thành công!", count = grades.Count });
      }
      catch (Exception ex)
      {
        return StatusCode(500, $"Lỗi: {ex.Message}");
      }
    }
  }
}
