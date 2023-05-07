using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using WebApi.Models;


using WebApi.Dto.Intent;
using WebApi.Services.CommunicationService;
using System.Text;
using Humanizer;

namespace users_api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly IConfiguration _configuration;

        private readonly double _token_expiry;
        public readonly JWTModel jwt;

        public AuthController(IConfiguration config)
        {

            this._configuration = config;
            _token_expiry = config.GetValue("Jwt:Timeout", 300);

        }



        [HttpGet("token/{id:int}")]
        public async Task<ActionResult<string>> GetToken(int id)
        {
            var raw = _configuration["JWT:Key"];
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(raw));
            var token = GenerateToken("12344", _configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], key, "12344", "USER", _token_expiry);
            return await Task.FromResult(Ok(token));


        }


        private string GenerateToken(string id, string issuer, string audience, SymmetricSecurityKey securityKey, string driverId, string role, double expireMinute)
        {

            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, id),
                 new Claim(ClaimTypes.Role, role),
            };
            var expiry = DateTime.Now.AddMinutes(expireMinute);
            var token = new JwtSecurityToken(issuer, audience,
                claims,
                expires: expiry,
                signingCredentials: credentials);
            var tokenValue = new JwtSecurityTokenHandler().WriteToken(token);

            return tokenValue;

        }


    }


}