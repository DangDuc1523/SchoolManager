﻿using System.Linq.Expressions;

namespace SchoolManagement.Data.BaseRepository
{
    public interface IBaseRepository<T> where T : class
    {
        Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> predicate = null);
        Task<T> GetByIdAsync(int id);
        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(int id);
        //Task<GetItemsPagingResDto<T>> GetItems(BasePagingAndSortDto payload);
    }
}
