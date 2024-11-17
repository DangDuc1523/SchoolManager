using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.ClassService
{
    public class ClassService : IClassService
    {
        private readonly IBaseRepository<Class> _classRepository;

        public ClassService(IBaseRepository<Class> ClassRepository)
        {
            _classRepository = ClassRepository;
        }

        public async Task<IEnumerable<Class>> GetAllClasssAsync()
        {
            return await _classRepository.GetAllAsync();
        }

        public async Task<Class> GetClassByIdAsync(int id)
        {
            return await _classRepository.GetByIdAsync(id);
        }

        public async Task<Class> AddClassAsync(Class Class)
        {
            await _classRepository.AddAsync(Class);
            return Class;
        }

        public async Task<Class> UpdateClassAsync(Class Class)
        {
       
            await _classRepository.UpdateAsync(Class);
            return Class;
        }

        public async Task<Class> DeleteClassAsync(int id)
        {
            var Class = await _classRepository.GetByIdAsync(id);
            if (Class != null)
            {
                await _classRepository.DeleteAsync(id);
            }
            return Class;
        }

    }
}
