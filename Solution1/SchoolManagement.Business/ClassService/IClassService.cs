using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.ClassService
{
  public interface IClassService
  {
    Task<IEnumerable<Class>> GetAllClasssAsync();
    Task<Class> GetClassByIdAsync(int id);
    Task<Class> AddClassAsync(Class Class);
    Task<Class> UpdateClassAsync(Class Class);
    Task<Class> DeleteClassAsync(int id);
    Task<Class> GetClassByStudentIdAsync(int studentId);
    Task<IEnumerable<Class>> GetClassByTeacherIdAsync(int userId);
  }
}
