using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Threading.Tasks;

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

    // Phương thức mới hỗ trợ Include
    Task<IEnumerable<T>> GetWhereWithIncludeAsync(Expression<Func<T, bool>> predicate, Expression<Func<T, object>> includeExpression);

  }
}
