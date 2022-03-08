using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByIdAsync(int id);

        Task<IReadOnlyList<T>> GetAllAsync();

        Task<T> GetEntityWithSpec(ISpecification<T> spec);

        Task<IReadOnlyList<T>> GetAllAsync(ISpecification<T> spec);

        Task<int> CountAsync(ISpecification<T> spec);
        void Add(T entity);
        void Delete(T entity);
        void Update(T entity);
    }
}