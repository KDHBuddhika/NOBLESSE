using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Model.Domain;
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
        public async Task<IActionResult> Addcategory(string category)
        {
            var existingCategory = await _context.categories.FirstOrDefaultAsync( c => c.CategoriesName == category);

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





        [HttpDelete]
        [Route("/deleteCategory/{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.categories.FindAsync(id);

            if (category == null)
            {
                return NotFound("Category not found.");
            }

            _context.categories.Remove(category);
            await _context.SaveChangesAsync();

            return Ok("Category deleted successfully.");
        }


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









    }
}
