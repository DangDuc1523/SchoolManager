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

<<<<<<< HEAD
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
=======
    [HttpPut("{classId}")]
    public async Task<IActionResult> UpdateClass(int classId,[FromBody]Class Class)
    {
      var updatedClass = await _classService.GetClassByIdAsync(classId);
      if (updatedClass == null)
      {
        return NotFound();
      }
      else
      {
        updatedClass = Class;
        updatedClass.ClassId = classId;
        await _classService.UpdateClassAsync(updatedClass);
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
    [HttpGet("student/{studentId}")]
    public async Task<IActionResult> GetClassByStudentId(int studentId)
    {
      var Class = await _classService.GetClassByStudentIdAsync(studentId);
      if (Class == null)
      {
        return NotFound();
      }
      return Ok(Class);
    }

    [HttpGet("teacher/{teacherId}/classes")]
    public async Task<IActionResult> GetAllClassesByTeacherId(int teacherId)
    {
      var classes = await _classService.GetAllClassesByTeacherIdAsync(teacherId);
      if (!classes.Any())
      {
        return NotFound();
      }
      return Ok(classes);
    }

  }
>>>>>>> 262ac9ed1b628c2651e3bfff48e37c12dcd1f5b7
}
