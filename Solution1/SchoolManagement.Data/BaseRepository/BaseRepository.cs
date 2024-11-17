using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace SchoolManagement.Data.BaseRepository
{
  public class BaseRepository<T> : IBaseRepository<T> where T : class
  {
    private readonly DbContextOptions<SchoolDbContext> _options;

    public BaseRepository(DbContextOptions<SchoolDbContext> options)
    {
      _options = options;
    }

    public async Task AddAsync(T entity)
    {
      using (var context = new SchoolDbContext(_options))
      {
        context.Add<T>(entity);
        await context.SaveChangesAsync();
      }
    }

    public async Task DeleteAsync(int id)
    {
      using (var context = new SchoolDbContext(_options))
      {
        // Lấy đối tượng cần xóa dựa trên id
        var entity = await context.Set<T>().FindAsync(id);

        if (entity != null)
        {
          // Xóa đối tượng
          context.Set<T>().Remove(entity);

          // Lưu thay đổi vào database
          await context.SaveChangesAsync();
        }
      }
    }

    public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> predicate = null)
    {
      using (var context = new SchoolDbContext(_options))
      {
        IQueryable<T> query = context.Set<T>();

        if (predicate != null)
        {
          query = query.Where(predicate);
        }

        return await query.ToListAsync();
      }
    }

    public async Task<T> GetByIdAsync(int id)
    {
      using (var context = new SchoolDbContext(_options))
      {
        return await context.Set<T>().FindAsync(id);
      }
    }

    public async Task UpdateAsync(T entity)
    {
      if (entity == null) throw new ArgumentNullException(nameof(entity));

      using (var context = new SchoolDbContext(_options))
      {
        context.Entry(entity).State = EntityState.Modified;

        await context.SaveChangesAsync();
      }
    }

    public async Task<IEnumerable<T>> GetWhereAsync(Expression<Func<T, bool>> predicate)
    {
      using (var context = new SchoolDbContext(_options))
      {
        return await context.Set<T>().Where(predicate).ToListAsync();
      }
    }

    // Phương thức mới hỗ trợ Include để truy vấn các bảng liên kết
    public async Task<IEnumerable<T>> GetWhereWithIncludeAsync(
        Expression<Func<T, bool>> predicate,
        Expression<Func<T, object>> includeExpression)
    {
      using (var context = new SchoolDbContext(_options))
      {
        return await context.Set<T>()
                            .Where(predicate)
                            .Include(includeExpression)  // Bao gồm liên kết với bảng Subject
                            .ToListAsync();
      }
    }
  }
}
