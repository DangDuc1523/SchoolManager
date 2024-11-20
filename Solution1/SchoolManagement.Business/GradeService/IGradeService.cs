using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.GradeService
{
  public interface IGradeService
  {
    Task<IEnumerable<Grade>> GetAllGradeAsync();
    Task<Grade> GetGradeByIdAsync(int id);
    Task<Grade> AddGradeAsync(Grade grade);
    Task<Grade> UpdateGradeAsync(Grade grade);
    Task<Grade> DeleteGradeAsync(int id);
    Task<IEnumerable<Grade>> GetGradeBySubjectId(int studentId, int subjectId);
    Task ImportGradesAsync(List<Grade> grades);

    Task DeleteStudentAndGradesAsync(int studentId, int classId);

    Task<Grade> AddDefaultGradeAsync(int studentId, int subjectId, int classId);


    Task<IEnumerable<Grade>> GetGradesByStudentIdAsync(int studentId);


  }
}
