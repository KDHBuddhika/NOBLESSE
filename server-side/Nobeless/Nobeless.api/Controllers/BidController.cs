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


        // ------------------- get all bidder details by auction id ------------------------

        [HttpGet("getBidder-by-auctionId/{auctionId}")]
        public async Task<IActionResult> GetBiddersByAuctionId(int auctionId)
        {
            try
            {
                var bidders = await _bidService.GetBiddersByAuctionIdAsync(auctionId);
                return Ok(bidders); 
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); 
            }
        }



        //---------------------------------automatycally update bidding state-------------------------------

        [HttpPost("process-bid-state")]
        public async Task<IActionResult> ProcessAuctions()
        {
            await _bidService.ProcessAuctionCompletion();
            return Ok("Auctions processed successfully");
        }



        // -------------------------get bidder details by user id ---------------------------------------------

        [HttpGet]
        [Route("get-bidder-items/{userId}")]
        public async Task<IActionResult> GetBidderItems(Guid userId)
        {
            var bidderItems = await _bidService.GetBidderItemsByUserId(userId);
            if (bidderItems == null || !bidderItems.Any())
            {
                return NotFound(("No bidder items found for this user."));
            }
            return Ok(bidderItems);
        }









    }
}
