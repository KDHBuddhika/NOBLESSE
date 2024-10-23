using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Exceptions;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Service;

namespace Nobeless.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly NobelessDbContext _context;
        private readonly AdminService _adminService;

        public AdminController( NobelessDbContext nobelessDbContext, AdminService adminService)
        { 
            _context = nobelessDbContext;
            this._adminService = adminService;
        }

        //------------------------- categorie ------------------------

        [HttpPost]
        [Route("/addCategory")]
        public async Task<IActionResult> Addcategory([FromBody] CategoryDtos categoryDto)
        {
            var category = categoryDto.Category;

            var existingCategory = await _context.categories.FirstOrDefaultAsync(c => c.CategoriesName == category);

            if (existingCategory != null)
            {
                return BadRequest("Category already exists.");
            }

            var newCategory = new Categories
            {
                CategoriesName = category
            };

            await _context.categories.AddAsync(newCategory);
            await _context.SaveChangesAsync();

            return Ok(newCategory);
        }



        [HttpPut]
        [Route("/updateCategory/{id}")]
        public async Task<IActionResult> UpdateCategory(int id, string newCategoryName)
        {
            
            var category = await _context.categories.FindAsync(id);

            if (category == null)
            {
                return NotFound("Category not found.");
            }

           
            category.CategoriesName = newCategoryName;

            _context.categories.Update(category);
            await _context.SaveChangesAsync();

            return Ok(category);  
        }





        [HttpDelete("deleteCategory/{categoryId}")]
        public async Task<IActionResult> DeleteCategory(Guid categoryId)
        {
            try
            {
                var result = await _adminService.DeleteCategoryAsync(categoryId);

                if (!result)
                {
                    return NotFound("Category not found."); 
                }

                return NoContent(); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); 
            }
        }


        //------------------------------------get All categories----------------------------

        [HttpGet]
        [Route("/getAllCategory")]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await _context.categories.ToListAsync();
            return Ok(categories);
        }






        //-------------------------------Dashboard Statis Details---------------------------------
        [HttpGet("statistics")]
        public async Task<IActionResult> GetDashboardStatistics()
        {
            try
            {
                var statistics = await _adminService.GetDashboardStatisticsAsync();
                return Ok(statistics); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message); 
            }
        }



        //-------------------------------Dashboard product Details---------------------------------------

        [HttpGet("productDetails/{productId}")]
        public async Task<IActionResult> GetProductDetailsById(int productId)
        {
            try
            {
                var productDetails = await _adminService.GetProductDetailsByIdAsync(productId);
                return Ok(productDetails); 
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



        //-------------------------------Dashboard Auction details --------------------------------

        [HttpGet("auctiondetails")]
        public async Task<IActionResult> GetAllAuctionDetails()
        {
            try
            {
                var auctionDetails = await _adminService.GetAllAuctionDetailsAsync();
                return Ok(auctionDetails); 
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); 
            }
        }






    }
}
