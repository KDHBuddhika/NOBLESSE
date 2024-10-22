using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nobeless.api.Data;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Service;

namespace Nobeless.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuctionController : ControllerBase
    {

        private readonly AuctionService _auctionService;

        public AuctionController(AuctionService auctionService)
        {
            this._auctionService = auctionService;
        }

        //------------------------ Add Auction --------------------------------------------
        [HttpPost]
        [Route("/addAuction")]
        public async Task<IActionResult> AddAuction([FromBody] AddAuctionDtos addAuctionDtos)
        {
            try
            {
                await _auctionService.AddAuction(addAuctionDtos);
                return Ok("Successfully Added Auction");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }


        // --------------------Get All Incompleted Auction ---------------------------------
        [HttpGet("getAuctionByNotCompleted")]
        public async Task<IActionResult> GetAuctionDetails(int page = 1, int itemsPerPage = 10)
        {
            try
            {
                var (auctionDetails, totalRecords) = await _auctionService.GetAuctionDetailsAsync(page, itemsPerPage);

                var response = new
                {
                    TotalRecords = totalRecords,
                    Page = page,
                    ItemsPerPage = itemsPerPage,
                    Data = auctionDetails
                };

                return Ok(response); // Return 200 OK with paginated auction details
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Return 500 for any internal error
            }
        }


        //--------------------Delete Auction ------------------------------------

        [HttpDelete("deleteAuction/{auctionId}")]
        public async Task<IActionResult> DeleteAuction(int auctionId)
        {
            try
            {
                var result = await _auctionService.DeleteAuctionAsync(auctionId);

                if (!result)
                {
                    return NotFound("Auction not found."); // Return 404 if auction not found
                }

                return Ok(result); // Return 204 No Content on successful deletion
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Return 500 for any internal error
            }
        }



    }
}
