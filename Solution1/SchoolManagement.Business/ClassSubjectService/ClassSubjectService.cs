using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.ClassSubjectService
{
    public class ClassSubjectService : IClassSubjectService
    {
        private readonly IBaseRepository<ClassSubject> _classSubjectRepository;

        public ClassSubjectService(IBaseRepository<ClassSubject> ClassSubjectRepository)
        {
            _classSubjectRepository = ClassSubjectRepository;
        }

        public async Task<IEnumerable<ClassSubject>> GetAllClassSubjectAsync()
        {
            return await _classSubjectRepository.GetAllAsync();
        }

        public async Task<ClassSubject> GetClassSubjectByIdAsync(int id)
        {
            return await _classSubjectRepository.GetByIdAsync(id);
        }

        public async Task<ClassSubject> AddClassSubjectAsync(ClassSubject ClassSubject)
        {
            await _classSubjectRepository.AddAsync(ClassSubject);
            return ClassSubject;
        }

        public async Task<ClassSubject> UpdateClassSubjectAsync(ClassSubject ClassSubject)
        {
            await _classSubjectRepository.UpdateAsync(ClassSubject);
            return ClassSubject;
        }

        public async Task<ClassSubject> DeleteClassSubjectAsync(int id)
        {
            var ClassSubject = await _classSubjectRepository.GetByIdAsync(id);
            if (ClassSubject != null)
            {
                await _classSubjectRepository.DeleteAsync(id);
            }
            return ClassSubject;
        }

        
    }
}
