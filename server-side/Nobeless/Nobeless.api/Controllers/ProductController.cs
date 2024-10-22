using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Exceptions;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Service;
using Nobeless.api.Util;
using System.Numerics;
using InvalidOperationException = Nobeless.api.Exceptions.InvalidOperationException;

namespace Nobeless.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {

        private readonly NobelessDbContext _dbContext;
        private readonly UploadHandler _uploadHandler;
        private readonly ProductService _productService;

        public ProductController(NobelessDbContext nobelessDbContext , UploadHandler uploadHandler,ProductService productService)
        {
            this._dbContext = nobelessDbContext;
            this._uploadHandler = uploadHandler;
            this._productService = productService;

        }




        // -------------------------- Add Product ---------------------------------------

        [HttpPost]
        [Route("/addproduct")]
        public async Task<IActionResult> AddProduct([FromForm] ProductDtos productDto)
        {
            try
            {
                String status = await _productService.AddProduct(productDto);
                return Ok(new { message = status });
            }
            catch (InvalidOperationException ex) {
                return BadRequest(new { message = ex.Message });
            }
            catch(BadRequestException ex) {
                return BadRequest(new { message = ex.Message });

            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "An unexpected error occurred.", details = ex.Message });
            }

        }


        // ------------------------Get Product By User Id --------------------------------------

        [HttpGet]
        [Route("/getProductsByUserId/{id}")]
        public async Task<IActionResult> getProductByUserId(Guid id)
        {

            try
            {
                var products = await _productService.GetProductsByUserIdAsync(id);
                return Ok(products);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }


        //--------------------get all product-----------------------------------------------------
        [HttpGet]
        [Route("getAllProducts")]
        public async Task<IActionResult> getProductByUserId()
        {

            try
            {
                var products = await _productService.GetAllProducts();
                return Ok(products);
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }



        //----------------------Get product By Product Id------------------------------------

        [HttpGet("/productDetails/{productId}")]
        public async Task<IActionResult> GetProductDetailsById(int productId)
        {
            try
            {
                var productDetails = await _productService.GetProductDetailsByIdAsync(productId);
                return Ok(productDetails); // Return 200 OK with product details
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message); // Return 404 Not Found if the product does not exist
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message); // Return 500 for other errors
            }
        }



        //----------------Product Delete by product id--------------------------

        [HttpDelete]
        [Route("deleteProduct/{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
           
                try
                {
                    var result = await _productService.DeleteProductAsync(id);

                    if (!result)
                    {
                        return NotFound("Product not found."); // Return 404 if product not found
                    }

                return Ok(result); // Return 204 No Content on successful deletion
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Internal server error: {ex.Message}"); // Handle internal server errors
                }
            


        }


        //----------------------product Updated----------------------


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


        // ----------------------Approved -----------------------------------------------------------------


        [HttpPut("ApproveProduct/{productId}")]
        public async Task<IActionResult> ApproveProduct(int productId)
        {
            try
            {
                await _productService.ApproveProductAsync(productId);
                return Ok(new { message = $"Product with ID {productId} has been approved." });
            }
            catch (NotFoundException ex)
            {
                return NotFound(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An unexpected error occurred.");
            }
        }


       










    }
}
