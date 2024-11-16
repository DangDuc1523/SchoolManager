using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.SubjectService
{
    public interface ISubjectService
    {
        Task<IEnumerable<Subject>> GetAllSubjectAsync();
        Task<Subject> GetSubjectByIdAsync(int id);
        Task<Subject> AddSubjectAsync(Subject Class);
        Task<Subject> UpdateSubjectAsync(Subject Class);
        Task<Subject> DeleteSubjectAsync(int id);
    }
}
