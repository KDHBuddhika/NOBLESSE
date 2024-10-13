using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Util;

namespace Nobeless.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        private readonly NobelessDbContext _dbContext;
        private readonly IEmailService _emailService;

        public UserController(NobelessDbContext dbContext,IEmailService emailService)
        {
            this._dbContext = dbContext;
            this._emailService = emailService;
        }

        //-----------------------------------------------user register----------------------------------------------

        [HttpPost]
        [Route("/register")]
        public async Task<IActionResult> UserRegister([FromBody] UserRegisterDto userRegisterDto)
        {
            if(await _dbContext.users.AnyAsync(u => u.Email == userRegisterDto.Email))
            {
                return BadRequest("Email is already register");
            }

            var user = new User { 
                Email = userRegisterDto.Email ,
                UserName = userRegisterDto.FirstName +" "+ userRegisterDto.LastName ,
                Register_date =userRegisterDto.RegistationDate,
                Password = BCrypt.Net.BCrypt.HashPassword(userRegisterDto.Password),
                usertype = userRegisterDto.userType,
                isVerified = false
            
            };

            await _dbContext.users.AddAsync(user);
            await _dbContext.SaveChangesAsync();


            Guid token = Guid.NewGuid();
            var verification = new UserVarification
            {
                UserId = user.Id,
                VarificationToken = token,
                ExpirationDate= DateTime.UtcNow.AddHours(24)
            };


            await _dbContext.userVarifications.AddAsync(verification);
            await _dbContext.SaveChangesAsync();

            //send mail with verification link
            var verificationLink = $"https://localhost:3000/verifyAccount?token={token}";
            await _emailService.SendVerificationEmail(user.Email, verificationLink); 

            return Ok("User registered. Please verify your email.");
        }



        //--------------------------------------------------user verify-------------------------------------------------
        [HttpGet("/verify")]
        public async Task<IActionResult> VerifyAccount(Guid token)
        {
            var verification = await _dbContext.userVarifications
                .FirstOrDefaultAsync(v => v.VarificationToken == token);

            if (verification == null || verification.ExpirationDate < DateTime.UtcNow)
            {
                return BadRequest("Invalid or expired token.");
            }

            var user = await _dbContext.users.FindAsync(verification.UserId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            user.isVerified = true;
            _dbContext.userVarifications.Remove(verification); // Optionally remove the token after verification
            await _dbContext.SaveChangesAsync();

            return Ok("Account verified successfully.");
        }



       //--------------------------------------------------------User Login----------------------------------------------------
        [HttpPost]
        [Route("/login")]
        public async Task<IActionResult> UserLogin([FromBody] UserLoginDtos userLogin)
        {
            var user = await _dbContext.users.FirstOrDefaultAsync(u => u.Email == userLogin.Email);
            if (user == null)
            {
                return NotFound("User Not Founded");

            }

            bool isPasswordValid = BCrypt.Net.BCrypt.Verify(userLogin.Password, user.Password);

            if (!isPasswordValid)
            {
                return Unauthorized("User password is not correct");

            }

            return Ok(new { UserId = user.Id });




         }


     }
}
