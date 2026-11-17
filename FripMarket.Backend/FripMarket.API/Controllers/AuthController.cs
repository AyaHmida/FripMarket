using FripMarket.Application.DTOs.Auth;
using FripMarket.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FripMarket.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequestDto request)
    {
        var result = await _authService.LoginAsync(request);

        if (result == null)
        {
            return Unauthorized(new
            {
                message = "Email ou mot de passe incorrect, ou compte non autorisé."
            });
        }

        return Ok(result);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
    RegisterRequestDto request)
    {
        try
        {
            var result = await _authService.RegisterAsync(request);

            return Ok(result);
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new
            {
                message = ex.Message
            });
        }
    }
}