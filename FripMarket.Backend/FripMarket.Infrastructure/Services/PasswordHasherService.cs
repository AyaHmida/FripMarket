
using FripMarket.Application.Interfaces;
using FripMarket.Domain.Entites;
using FripMarket.Domain.Entities;
using Microsoft.AspNetCore.Identity;

namespace FripMarket.Infrastructure.Services;

public class PasswordHasherService : IPasswordHasherService
{
    private readonly PasswordHasher<User> _passwordHasher = new();

    public string HashPassword(User user, string password)
    {
        return _passwordHasher.HashPassword(user, password);
    }

    public bool VerifyPassword(
        User user,
        string passwordHash,
        string password)
    {
        var result = _passwordHasher.VerifyHashedPassword(
            user,
            passwordHash,
            password
        );

        return result != PasswordVerificationResult.Failed;
    }
}
