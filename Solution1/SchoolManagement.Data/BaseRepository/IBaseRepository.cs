using SchoolManagement.Models.Models;
using System.Linq.Expressions;

namespace SchoolManagement.Data.BaseRepository
{
  public interface IBaseRepository<T> where T : class
  {
    Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> predicate = null);
    Task<T> GetByIdAsync(int id);
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(int id);

    Task<IEnumerable<T>> GetWhereAsync(Expression<Func<T, bool>> predicate);



    //Task<GetItemsPagingResDto<T>> GetItems(BasePagingAndSortDto payload);
  }
}
