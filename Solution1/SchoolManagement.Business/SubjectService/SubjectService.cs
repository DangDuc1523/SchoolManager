using SchoolManagement.Data;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.SubjectService
{
  public class SubjectService : ISubjectService
  {
    private readonly IBaseRepository<Subject> _subjectRepository;
    private readonly SchoolDbContext _context;

    public SubjectService(IBaseRepository<Subject> subjectRepository, SchoolDbContext context)
    {
      _subjectRepository = subjectRepository;
      _context = context;
    }

    public async Task<IEnumerable<Subject>> GetAllSubjectAsync()
    {
      return await _subjectRepository.GetAllAsync();
    }

    public async Task<Subject> GetSubjectByIdAsync(int id)
    {
      return await _subjectRepository.GetByIdAsync(id);
    }

    public async Task<Subject> AddSubjectAsync(Subject Subject)
    {
      await _subjectRepository.AddAsync(Subject);
      return Subject;
    }

    public async Task<Subject> UpdateSubjectAsync(Subject Subject)
    {
      await _subjectRepository.UpdateAsync(Subject);
      return Subject;
    }

    public async Task<Subject> DeleteSubjectAsync(int id)
    {
      var Subject = await _subjectRepository.GetByIdAsync(id);
      if (Subject != null)
      {
        await _subjectRepository.DeleteAsync(id);
      }
      return Subject;
    }

    public async Task<IEnumerable<Subject>> GetSubjectByTeacherIdAsync(int teacherId)
    {
      var classSubjects = _context.ClassSubjects.Where(cs=>cs.TeacherId==teacherId).ToList();
      List<int> subjectIdlist = new List<int>();
      foreach (var classSubject in classSubjects)
      {
        if(!subjectIdlist.Contains(classSubject.SubjectId))
        {
          subjectIdlist.Add(classSubject.SubjectId);
        }
      }
      var subjects = _context.Subjects.Where(s => subjectIdlist.Contains(s.SubjectId)).ToList();
      return subjects;
    }

  }
}
