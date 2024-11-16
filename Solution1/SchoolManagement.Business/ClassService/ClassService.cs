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
    public async Task<IEnumerable<Class>> GetClassByTeacherIdAsync(int userId)
    {
      var classsubjects = _context.ClassSubjects.Where(cs => cs.TeacherId == userId).ToList();
      List<int> classlist = new List<int>();
      foreach (var classsubject in classsubjects)
      {
        if (!classlist.Contains(classsubject.ClassId))
        {
          classlist.Add(classsubject.ClassId);
        }
      }
      var classes = await _classRepository.GetAllAsync();
      classes=classes.Where(u=>classlist.Contains(u.ClassId)).ToList();
      return classes;
    }
  }
}
