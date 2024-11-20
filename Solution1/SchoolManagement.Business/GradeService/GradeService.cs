using Microsoft.EntityFrameworkCore;
using SchoolManagement.Data;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;
using System.Diagnostics;

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
      var grades = await _gradeRepository.GetAllAsync();
      var g = grades.Where(g => (g.StudentId == studentId || g.StudentId == null) &&
        (g.SubjectId == null || g.SubjectId == subjectId)
      ).ToList();
      if(g==null) return null;
      return g;
    }

    public async Task ImportGradesAsync(List<Grade> grades)
    {
      await _context.Grades.AddRangeAsync(grades.ToList());
      await _context.SaveChangesAsync();
    }


    public async Task DeleteStudentAndGradesAsync(int studentId, int classId)
    {
      // Lấy danh sách Grade liên quan
      var gradesToDelete = _context.Grades
          .Where(g => g.StudentId == studentId && g.ClassId == classId);

      // Xóa Grade
      if (gradesToDelete.Any())
      {
        _context.Grades.RemoveRange(gradesToDelete);
      }

      // Lấy thông tin Student cần xóa
      var studentToDelete = await _context.Students
          .FirstOrDefaultAsync(s => s.StudentId == studentId);

      if (studentToDelete != null)
      {
        // Xóa Student
        _context.Students.Remove(studentToDelete);
      }

      // Lưu thay đổi
      await _context.SaveChangesAsync();
    }


    public async Task<Grade> AddDefaultGradeAsync(int studentId, int subjectId, int classId)
    {
      // Kiểm tra nếu Grade đã tồn tại để tránh trùng lặp
      var existingGrades = await _gradeRepository.GetAllAsync();
      var existingGrade = existingGrades.FirstOrDefault(g =>
          g.StudentId == studentId && g.SubjectId == subjectId && g.ClassId == classId);

      if (existingGrade != null)
      {
        throw new Exception("Grade đã tồn tại cho các thông tin được cung cấp.");
      }

      // Tạo mới Grade với Score mặc định là 0
      var grade = new Grade
      {
        StudentId = studentId,
        SubjectId = subjectId,
        ClassId = classId,
        Score = 0 // Giá trị mặc định
      };

      await _gradeRepository.AddAsync(grade);
      return grade;
    }



    public async Task<IEnumerable<Grade>> GetGradesByStudentIdAsync(int studentId)
    {
      // Lấy tất cả điểm của học sinh với studentId
      var grades = await _context.Grades
          .Where(g => g.StudentId == studentId)
          .Include(g => g.Student)  // Include thông tin học sinh
          .Include(g => g.Subject)  // Include thông tin môn học
          .Include(g => g.Class)    // Include thông tin lớp học
          .ToListAsync();

      return grades;
    }

  }
}
