using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.GradeService
{
    public class GradeService : IGradeService
    {
        private readonly IBaseRepository<Grade> _gradeRepository;

        public GradeService(IBaseRepository<Grade> GradeRepository)
        {
            _gradeRepository = GradeRepository;
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

        
    }
}
