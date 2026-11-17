
namespace FripMarket.Application.Interfaces;

public interface IJwtTokenGenerator
{
    string GenerateToken(
        Guid userId,
        string email,
        IEnumerable<string> roles);
}
