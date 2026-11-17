
using FripMarket.Domain.Common;
using FripMarket.Domain.Entites;

namespace FripMarket.Domain.Entities;

public class Role : BaseEntity
{
    public string Name { get; set; } = string.Empty;

    public string? Description { get; set; }

    public ICollection<UserRole> UserRoles { get; set; }
        = new List<UserRole>();
}
