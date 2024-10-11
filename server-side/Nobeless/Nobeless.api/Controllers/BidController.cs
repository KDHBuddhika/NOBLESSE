using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Service;

namespace Nobeless.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BidController : ControllerBase
    {

        private readonly BidService _bidService;

        public BidController(BidService bidService)
        {
            this._bidService = bidService;
        }

        [HttpPost]
        [Route("/addBid")]
        public async Task<IActionResult> AddBid([FromBody] BidDtos bidDtos)
        {
            try
            {
                await _bidService.AddBid(bidDtos);
                return  Ok("Bid is Added Succefully");
            }
            catch (Exception ex)
            { 
                return BadRequest(ex);
            }

        }





    }
}
