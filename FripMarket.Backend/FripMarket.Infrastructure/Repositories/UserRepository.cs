
using FripMarket.Application.Interfaces;
using FripMarket.Domain.Entites;
using FripMarket.Domain.Entities;
using FripMarket.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace FripMarket.Infrastructure.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users
            .Include(u => u.UserRoles)
                .ThenInclude(ur => ur.Role)
            .FirstOrDefaultAsync(u => u.Email == email);
    }
    public async Task AddAsync(User user)
    {
        await _context.Users.AddAsync(user);
    }

    public async Task<Guid?> GetRoleIdByNameAsync(string roleName)
    {
        return await _context.Roles
            .Where(r => r.Name == roleName)
            .Select(r => (Guid?)r.Id)
            .FirstOrDefaultAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
