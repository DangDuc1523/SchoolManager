using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.ClassSubjectService
{
    public interface IClassSubjectService
    {
        Task<IEnumerable<ClassSubject>> GetAllClassSubjectAsync();
        Task<ClassSubject> GetClassSubjectByIdAsync(int id);
        Task<ClassSubject> AddClassSubjectAsync(ClassSubject Class);
        Task<ClassSubject> UpdateClassSubjectAsync(ClassSubject Class);
        Task<ClassSubject> DeleteClassSubjectAsync(int id);
    }
}
