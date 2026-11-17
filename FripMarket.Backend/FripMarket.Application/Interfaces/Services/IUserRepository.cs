
using FripMarket.Domain.Entites;
using FripMarket.Domain.Entities;

namespace FripMarket.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task AddAsync(User user);

    Task<Guid?> GetRoleIdByNameAsync(string roleName);
    Task SaveChangesAsync();
}
