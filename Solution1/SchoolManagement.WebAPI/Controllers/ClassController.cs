using Microsoft.AspNetCore.Mvc;
using SchoolManagement.Business.ClassService;
using SchoolManagement.Models.Models;

namespace SchoolManagement.WebAPI.Controllers.Admin
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ClassController : Controller
    {
        private readonly IClassService _classService;

        public ClassController(IClassService ClassService)
        {
            _classService = ClassService;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllClass()
        {
            var Classes = await _classService.GetAllClasssAsync();
            return Ok(Classes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClassById(int id)
        {
            var Class = await _classService.GetClassByIdAsync(id);
            if (Class == null)
            {
                return NotFound();
            }
            return Ok(Class);
        }

        [HttpPost]
        public async Task<IActionResult> AddClass(Class Class)
        {
            var createdClass = await _classService.AddClassAsync(Class);
            return CreatedAtAction(nameof(GetClassById), new { id = createdClass.ClassId }, createdClass);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClass(int id, Class Class)
        {
            var updatedClass = await _classService.UpdateClassAsync(Class);
            if (updatedClass == null)
            {
                return NotFound();
            }
            return Ok(updatedClass);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClass(int id)
        {
            var deletedClass = await _classService.DeleteClassAsync(id);
            if (deletedClass == null)
            {
                return NotFound();
            }
            return Ok(deletedClass);
        }

    }
}
