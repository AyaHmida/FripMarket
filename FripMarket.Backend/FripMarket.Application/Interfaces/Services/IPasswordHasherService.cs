
using FripMarket.Domain.Entites;
using FripMarket.Domain.Entities;

namespace FripMarket.Application.Interfaces;

public interface IPasswordHasherService
{
    string HashPassword(User user, string password);

    bool VerifyPassword(User user, string passwordHash, string password);
}
