using Microsoft.EntityFrameworkCore;
using SchoolManagement.Data;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.GradeService
{
  public class GradeService : IGradeService
  {
    private readonly IBaseRepository<Grade> _gradeRepository;
    private readonly SchoolDbContext _context;

    public GradeService(IBaseRepository<Grade> gradeRepository, SchoolDbContext context)
    {
      _gradeRepository = gradeRepository;
      _context = context;
    }

    public async Task<IEnumerable<Grade>> GetAllGradeAsync()
    {
      return await _gradeRepository.GetAllAsync();
    }

    public async Task<Grade> GetGradeByIdAsync(int id)
    {
      return await _gradeRepository.GetByIdAsync(id);
    }

    public async Task<Grade> AddGradeAsync(Grade Grade)
    {
      await _gradeRepository.AddAsync(Grade);
      return Grade;
    }

    public async Task<Grade> UpdateGradeAsync(Grade Grade)
    {
      await _gradeRepository.UpdateAsync(Grade);
      return Grade;
    }

    public async Task<Grade> DeleteGradeAsync(int id)
    {
      var Grade = await _gradeRepository.GetByIdAsync(id);
      if (Grade != null)
      {
        await _gradeRepository.DeleteAsync(id);
      }
      return Grade;
    }

    public async Task<IEnumerable<Grade>> GetGradeBySubjectId(int studentId, int subjectId)
    {
      var g = _context.Grades.Where(g => (g.StudentId == studentId || g.StudentId == null) &&
        (g.SubjectId == null || g.SubjectId == subjectId)
      ).ToListAsync();
      if(g==null) return null;
      return await g;
    }
  }
}