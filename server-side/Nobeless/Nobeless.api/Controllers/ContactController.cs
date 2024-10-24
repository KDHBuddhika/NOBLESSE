using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;

namespace Nobeless.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {

        private readonly NobelessDbContext _context;

        public ContactController(NobelessDbContext nobelessDbContext)
        {
            this._context = nobelessDbContext;
        }


        //--------------- Add Massage--------------------------
        [HttpPost]
        [Route("AddMassage")]
        public async Task<IActionResult> AddMassage([FromBody] AddMassageDto addMassage)
        {

            var massage = new Contact
            {
                Email = addMassage.Email,
                Massage = addMassage.Massage,
            };
                
                
               
          

            await _context.AddAsync(massage);
            await _context.SaveChangesAsync();

            return Ok("add massage successfully");
        } 




        // --------------------- Get All Massage -------------------------------

        [HttpGet]
        [Route("getAllmassage")]
        public async Task<IActionResult> GetAllMassage()
        {
            var massage = await _context.contacts.ToListAsync();

            if (massage == null) { 
               return NotFound("Not Found");
            }

            return Ok(massage);
        }

    }
}
