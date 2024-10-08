using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Util;
using System.Numerics;

namespace Nobeless.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly NobelessDbContext _dbContext;
        private readonly UploadHandler _uploadHandler;

        public ProductController(NobelessDbContext nobelessDbContext , UploadHandler uploadHandler)
        {
            this._dbContext = nobelessDbContext;
            this._uploadHandler = uploadHandler;

        }




        [HttpPost]
        [Route("/addproduct")]
        public async Task<IActionResult> AddProduct([FromForm] ProductDtos productDto)
        {



            // Check if image is uploaded
            if (productDto.thumbnailImage == null || productDto.thumbnailImage.Length == 0)
            {
                return BadRequest("Image is required.");
            }

            var categoryExists = await _dbContext.categories.FindAsync(productDto.CategoryId);
            if (categoryExists == null)
            {
                return BadRequest("Invalid Category ID. Category does not exist.");
            }


            var userExists = await _dbContext.users.FindAsync(productDto.UserId);
            if (userExists == null)
            {
                return BadRequest("Invalid User ID. User does not exist.");
            }




            string imageUrl = _uploadHandler.Upload(productDto.thumbnailImage);
            if (imageUrl.StartsWith("extension is not valid") || imageUrl.StartsWith("maximum size"))
            {
                return BadRequest(imageUrl);
            }

            // Create a new Product object to save in the database
            var product = new Products
            {
                Name = productDto.Name,
                Description = productDto.Description,
                StartingPrise = productDto.StartingPrise,
                thumbnailImage =imageUrl,  // Save the image URL as a string
                UserId = productDto.UserId,
                CategoryId = productDto.CategoryId,
                is_approved = false  // Assume product is available by default
            };

            // Save the product to the database
            await _dbContext.products.AddAsync(product);
            await _dbContext.SaveChangesAsync();

            return Ok(product);
        }




        [HttpGet]
        [Route("/getProduct/{id}")]
        public async Task<IActionResult> getProduct(String id)
        {
            Guid productId = Guid.Parse(id);

            var product = await _dbContext.products.FindAsync(productId);

            if (product == null)
            {
                return NotFound("not founded");
            }


            return Ok(product);




        }



        [HttpPut]
        [Route("/updateProduct/{id}")]
        public async Task<IActionResult> UpdateProduct(String id, [FromBody] ProductDtos product)
        {

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
        public async Task<IActionResult> DeleteProduct(String id)
        {


            Guid productId = Guid.Parse(id);
            var product = await _dbContext.products.FindAsync(productId);
            if (product == null)
            {
                return NotFound();
            }


            _dbContext.products.Remove(product);

            await _dbContext.SaveChangesAsync();


            return Ok();
        }








    }
}
