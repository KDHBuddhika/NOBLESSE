using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Nobeless.api.Data;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;
using System.Numerics;

namespace Nobeless.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly NobelessDbContext _dbContext;

        public ProductController(NobelessDbContext nobelessDbContext)
        {
            this._dbContext = nobelessDbContext;
            
        }




        [HttpPost]
        [Route("/addproduct")]
        public async Task<IActionResult> AddProduct([FromBody] ProductDtos product)
        {

            var product1 = new Product
            {
                Name = product.Name,
                Description = product.Description
            };


            await _dbContext.AddAsync(product1);
            await _dbContext.SaveChangesAsync();


            return Ok("successfully");
        }




        [HttpGet]
        [Route("/getProduct/{id}")]
        public async Task<IActionResult> getProduct(String id)
        {
            Guid productId = Guid.Parse(id);

            var product = await _dbContext.products.FindAsync(productId);

            if (product == null) { 
               return NotFound("not founded");
            }


            return Ok(product);

            


        }



        [HttpPut]
        [Route("/updateProduct/{id}")]
        public async Task<IActionResult> UpdateProduct(String id,[FromBody] ProductDtos product) { 
        
            Guid productId = Guid.Parse(id);

            // Find the product in the database
            var product1 = await _dbContext.products.FindAsync(productId);

            if (product1 == null)
            {
                return NotFound("Product not found");
            }

            // Update the product's properties
            
            product1.Name = product.Name;
            product1.Description = product.Description;
            // Add other fields as needed...

            // Save the changes
            _dbContext.Entry(product1).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            await _dbContext.SaveChangesAsync();

            return Ok("Success");

        }

        [HttpDelete]
        [Route("/deleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(String id) {


            Guid productId = Guid.Parse(id);
            var product = await _dbContext.products.FindAsync(productId);
            if (product == null) { 
               return NotFound();
            }


            _dbContext.products.Remove(product);

            await _dbContext.SaveChangesAsync();


            return Ok();
        }








    }
}
