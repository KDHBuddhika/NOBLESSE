using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nobeless.api.Data;
using Nobeless.api.Exceptions;
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

                return Ok(response); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); 
            }
        }


        //-------------------------------- ----- Delete Auction ---------------------------------------------

        [HttpDelete("deleteAuction/{auctionId}")]
        public async Task<IActionResult> DeleteAuction(int auctionId)
        {
            try
            {
                var result = await _auctionService.DeleteAuctionAsync(auctionId);

                if (!result)
                {
                    return NotFound("Auction not found."); 
                }

                return Ok(result); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); 
            }
        }


        //---------------------------------- Get Auction Details by Auction Id --------------------------------------


        [HttpGet("getAuction-details-byId/{auctionId}")]
        public async Task<IActionResult> GetAuctionDetailsById(int auctionId)
        {
            try
            {
                var auctionDetails = await _auctionService.GetAuctionDetailsByIdAsync(auctionId);

                return Ok(auctionDetails); 
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); 
            }
        }




        // -------------------------- Get bid Winner Details by Auction Id -------------------------------
        [HttpGet("winner/{auctionId}")]
        public async Task<IActionResult> GetWinnerDetailsByAuctionId(int auctionId)
        {
            try
            {
                var winnerDetails = await _auctionService.GetWinnerDetailsByAuctionIdAsync(auctionId);
                return Ok(winnerDetails); 
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



        //---------------------- get all auction details by user id for profile section ---------------------------

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetAuctionDetailsByUserId(Guid userId)
        {
            try
            {
                var auctionDetails = await _auctionService.GetAuctionDetailsByUserIdAsync(userId);

                if (auctionDetails == null || !auctionDetails.Any())
                {
                    return NotFound("No auctions found for this user."); 
                }

                return Ok(auctionDetails); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); 
            }
        }



    }
}
