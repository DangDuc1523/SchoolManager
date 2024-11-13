using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.SubjectService
{
    public class SubjectService : ISubjectService
    {
        private readonly IBaseRepository<Subject> _subjectRepository;

        public SubjectService(IBaseRepository<Subject> SubjectRepository)
        {
            _subjectRepository = SubjectRepository;
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

        
    }
}
