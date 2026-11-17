
using FripMarket.Application.DTOs.Auth;
using FripMarket.Application.Interfaces;
using FripMarket.Domain.Entites;
using FripMarket.Domain.Entities;
using FripMarket.Domain.Enums;

namespace FripMarket.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordHasherService _passwordHasher;
    private readonly IJwtTokenGenerator _jwtTokenGenerator;

    public AuthService(
        IUserRepository userRepository,
        IPasswordHasherService passwordHasher,
        IJwtTokenGenerator jwtTokenGenerator)
    {
        _userRepository = userRepository;
        _passwordHasher = passwordHasher;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<LoginResponseDto?> LoginAsync(
        LoginRequestDto request)
    {
        // 1. Rechercher l'utilisateur
        var user = await _userRepository.GetByEmailAsync(
            request.Email.Trim().ToLowerInvariant());

        if (user == null)
            return null;

        // 2. Vérifier le statut du compte
        if (user.AccountStatus != AccountStatus.Active)
            return null;

        // 3. Vérifier le mot de passe
        var isPasswordValid = _passwordHasher.VerifyPassword(
            user,
            user.PasswordHash,
            request.Password);

        if (!isPasswordValid)
            return null;

        // 4. Récupérer les rôles
        var roles = user.UserRoles
            .Select(ur => ur.Role.Name)
            .ToList();

        // 5. Vérifier que l'utilisateur est Admin
        if (!roles.Contains("Admin", StringComparer.OrdinalIgnoreCase))
            return null;

        // 6. Générer le JWT
        var token = _jwtTokenGenerator.GenerateToken(
            user.Id,
            user.Email,
            roles);

        // 7. Retourner la réponse
        return new LoginResponseDto
        {
            Token = token,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Roles = roles
        };
    }

    public async Task<RegisterResponseDto> RegisterAsync(
    RegisterRequestDto request)
    {
        // 1. Normaliser l'email
        var email = request.Email.Trim().ToLowerInvariant();

        // 2. Vérifier si l'email existe déjà
        var existingUser = await _userRepository.GetByEmailAsync(email);

        if (existingUser != null)
            throw new InvalidOperationException("Cet email est déjà utilisé.");

        // 3. Récupérer le rôle Client
        var roleId = await _userRepository.GetRoleIdByNameAsync("Client");

        if (roleId == null)
            throw new InvalidOperationException("Le rôle Client n'existe pas.");

        // 4. Créer le nouvel utilisateur
        var user = new User
        {
            FirstName = request.FirstName.Trim(),
            LastName = request.LastName.Trim(),
            Email = email,
            AccountStatus = AccountStatus.Active,
            IsEmailVerified = false
        };

        // 5. Hacher le mot de passe
        user.PasswordHash = _passwordHasher.HashPassword(
            user,
            request.Password
        );

        // 6. Associer le rôle Client
        user.UserRoles.Add(new UserRole
        {
            UserId = user.Id,
            RoleId = roleId.Value
        });

        // 7. Ajouter l'utilisateur
        await _userRepository.AddAsync(user);

        // 8. Enregistrer dans PostgreSQL
        await _userRepository.SaveChangesAsync();

        // 9. Retourner la réponse
        return new RegisterResponseDto
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = "Client"
        };
    }
}
