using SchoolManagement.Data.BaseRepository;

namespace SchoolManagement.Business.BaseService
{
    public class BaseService<T> : IBaseService<T> where T : class
    {
        private readonly IBaseRepository<T> _baseRepository;

        public BaseService(IBaseRepository<T> baseRepository)
        {
            _baseRepository = baseRepository;
        }

        //public async Task<T> GetById(Guid id)
        //{
        //    return await _baseRepository.GetByIdAsync(id);
        //}
    }
}
