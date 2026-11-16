using System;
using System.Collections.Generic;
using System.Text;

namespace FripMarket.Domain.Entites
{

    using FripMarket.Domain.Common;
    using FripMarket.Domain.Enums;


    public class User : BaseEntity
    {
        public string Email { get; set; } = string.Empty;

        public string? PhoneNumber { get; set; }

        public string PasswordHash { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string? DisplayName { get; set; }

        public string? ProfileImageUrl { get; set; }

        public bool IsEmailVerified { get; set; } = false;

        public AccountStatus AccountStatus { get; set; } =
            AccountStatus.Active;
    }

}
