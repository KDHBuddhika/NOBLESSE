using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nobeless.api.Data;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;

namespace Nobeless.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatBotController : ControllerBase
    {

        private readonly NobelessDbContext _context;

        public ChatBotController(NobelessDbContext context)
        {
            _context = context;
        }

        [HttpPost("train")]
        public async Task<IActionResult> TrainBot([FromBody] QuestionAnswer questionAnswer)
        {
            _context.QuestionAnswers.Add(questionAnswer);
            await _context.SaveChangesAsync();
            return Ok();
        }



        [HttpPost("chat")]
        public IActionResult ChatBot([FromBody] ChatDto chatDto)
        {
            try
            {
                var answer = _context.QuestionAnswers
                    .FirstOrDefault(qa => qa.Question.ToLower() == chatDto.massage.ToLower());

                if (answer != null)
                {
                    return Ok(new { sender = "Bot", text = answer.Answer });
                }

                return Ok(new { sender = "bot", text = "Sorry, I don't know the answer to that." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }


    }
}
