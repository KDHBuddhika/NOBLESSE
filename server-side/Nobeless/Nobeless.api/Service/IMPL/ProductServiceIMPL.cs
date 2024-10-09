using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Exceptions;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Util;
using InvalidOperationException = Nobeless.api.Exceptions.InvalidOperationException;

namespace Nobeless.api.Service.IMPL
{
    public class ProductServiceIMPL : ProductService
    {

        private readonly NobelessDbContext _dbContext;
        private readonly UploadHandler _uploadHandler;

        public ProductServiceIMPL(NobelessDbContext nobelessDbContext,UploadHandler uploadHandler)
        {
            _dbContext = nobelessDbContext;
            _uploadHandler = uploadHandler;
            
        }




        public async Task<string> AddProduct(ProductDtos productDto)
        {


            // Check if image is uploaded
            if (productDto.thumbnailImage == null || productDto.thumbnailImage.Length == 0)
            {
                throw new BadRequestException("Image is required.");
            }

            // Check if the category exists
            var categoryExists = await _dbContext.categories.FindAsync(productDto.CategoryId);
            if (categoryExists == null)
            {
                throw new InvalidOperationException("Invalid Category ID. Category does not exist.");
            }

            // Check if the user exists
            var userExists = await _dbContext.users.FindAsync(productDto.UserId);
            if (userExists == null)
            {
                throw new InvalidOperationException("Invalid User ID. User does not exist.");
            }

            // Upload the image
            string imageUrl = _uploadHandler.Upload(productDto.thumbnailImage);
            if (imageUrl.StartsWith("extension is not valid") || imageUrl.StartsWith("maximum size"))
            {
                throw new InvalidOperationException(imageUrl);
            }


            var product = new Products
            {
                Name = productDto.Name,
                Description = productDto.Description,
                StartingPrise = productDto.StartingPrise,
                thumbnailImage = imageUrl,  
                UserId = productDto.UserId,
                CategoryId = productDto.CategoryId,
                is_approved = false  
            };

           
            await _dbContext.products.AddAsync(product);
            await _dbContext.SaveChangesAsync();

            return "Product added successfully.";
        }





        public async Task<List<Products>> GetProductsByUserIdAsyn(Guid id)
        {
            var products = await _dbContext.products
            .Where(p => p.UserId == id)
            .ToListAsync();

            if (products == null || products.Count == 0)
            {
                throw new NotFoundException($"No products found for user ID: {id}");
            }

            return products;
        }





        public async Task<Products> GetProductByIdAsync(int productId)
        {
            var product = await _dbContext.products
                .FirstOrDefaultAsync(p => p.ProductId == productId);

            if (product == null)
            {
                throw new NotFoundException($"Product with ID {productId} not found.");
            }

            return product;
        }






        public async Task DeleteProductByIdAsync(int productId)
        {
            var product = await _dbContext.products.FindAsync(productId);

            if (product == null)
            {
                throw new NotFoundException($"Product with ID {productId} not found.");
            }

            _dbContext.products.Remove(product);
            await _dbContext.SaveChangesAsync();
        }


    }
}
