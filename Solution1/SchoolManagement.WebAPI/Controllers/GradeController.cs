using Microsoft.AspNetCore.Mvc;
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

        //[HttpPost]
        //public async Task<IActionResult> AddGrade(Grade Grade)
        //{
        //    var createdGrade = await _gradeService.AddGradeAsync(Grade);
        //    return CreatedAtAction(nameof(GetGradeById), new { id = createdGrade.GradeId }, createdGrade);
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateGrade(int id, Grade Grade)
        {
            var updatedGrade = await _gradeService.UpdateGradeAsync(Grade);
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


        //[HttpGet("Grades/{GradeId}/search")]
        //public async Task<IActionResult> GetGradesForDoctor(Guid doctorId, int pageNumber = 1, int pageSize = 10, DateTime? startDate = null, DateTime? endDate = null, GradeStatus? status = null)
        //{
        //    var Grades = await _gradeService.GetGradesForDoctorAsync(doctorId, pageNumber, pageSize, startDate, endDate, status);
        //    return Ok(Grades);
        //}

        //[HttpPatch("Grades/{id}/cancel")]
        //public async Task<IActionResult> CancelGrade(Guid id)
        //{
        //    var Grade = await _gradeService.GetGradeByIdAsync(id);
        //    if (Grade == null)
        //    {
        //        return NotFound();
        //    }

        //    Grade.Status = (int)GradeStatus.Cancelled;
        //    var updatedGrade = await _gradeService.UpdateGradeAsync(Grade);

        //    return Ok(updatedGrade);
        //}

    }
}
