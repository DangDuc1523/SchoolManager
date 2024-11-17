
using SchoolManagement.Data;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Data.UserRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.ClassService
{
  public class ClassService : IClassService
  {
    private readonly IBaseRepository<Class> _classRepository;
    private readonly IBaseRepository<Student> _studentRepository;
    private readonly SchoolDbContext _context;

    public ClassService(IBaseRepository<Class> classRepository, IBaseRepository<Student> studentRepository, SchoolDbContext context)
    {
      _classRepository = classRepository;
      _studentRepository = studentRepository;
      _context = context;
    }

    public async Task<IEnumerable<Class>> GetAllClasssAsync()
    {
      return await _classRepository.GetAllAsync();
    }

    public async Task<Class> GetClassByIdAsync(int id)
    {
      return await _classRepository.GetByIdAsync(id);
    }

    public async Task<Class> AddClassAsync(Class Class)
    {
      await _classRepository.AddAsync(Class);
      return Class;
    }

    public async Task<Class> UpdateClassAsync(Class Class)
    {

      await _classRepository.UpdateAsync(Class);
      return Class;
    }

    public async Task<Class> DeleteClassAsync(int id)
    {
      var Class = await _classRepository.GetByIdAsync(id);
      if (Class != null)
      {
        await _classRepository.DeleteAsync(id);
      }
      return Class;
    }
    public async Task<Class> GetClassByStudentIdAsync(int id)
    {
      Student s = await _studentRepository.GetByIdAsync(id);
      if (s == null) return null;
      else return await _classRepository.GetByIdAsync(s.ClassId);
    }

    public async Task<IEnumerable<Class>> GetAllClassesByTeacherIdAsync(int teacherId)
    {
      var classIds = await _context.ClassSubjects
          .Where(cs => cs.TeacherId == teacherId)
          .Select(cs => cs.ClassId)
          .Distinct()
          .ToListAsync();

      var classes = await _context.Classes
          .Where(c => classIds.Contains(c.ClassId))
          .ToListAsync();

      return classes;
    }

  }
}