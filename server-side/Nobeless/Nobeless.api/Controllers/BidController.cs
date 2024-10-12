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


        //  --------------------- add bid------------------------

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



        // --------------------------- get bids by auction id--------------------------------

        [HttpGet]
        [Route ("/getBid-by-AuctionId/{id}")]
        public async Task<IActionResult> getBidsByAuctionId(int id)
        {

            try
            {
                var  bids = await _bidService.getBidsByAuctionId(id);
                return Ok(bids);
            }
            catch (Exception ex) { 
                
              return BadRequest(ex);
            
            }

            return null;
        }





        [HttpPost("process-auctions")]
        public async Task<IActionResult> ProcessAuctions()
        {
            await _bidService.ProcessAuctionCompletion();
            return Ok("Auctions processed successfully");
        }









    }
}
