using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.StudentService
{
  public interface IStudentService
  {
    Task<IEnumerable<Student>> GetAllStudentAsync();
    Task<Student> GetStudentByIdAsync(int id);
    Task<Student> AddStudentAsync(Student Class);
    Task<Student> UpdateStudentAsync(Student Class);
    Task<Student> DeleteStudentAsync(int id);
    Task<IEnumerable<Student>> GetStudentByClassIdAsync(int classId);

    Task<Student> GetStudentByUserIdAndClassIdAsync(int userId, int classId);

  }
}
