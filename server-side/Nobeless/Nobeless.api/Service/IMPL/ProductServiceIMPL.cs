using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Exceptions;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Model.Dtos.ResponseDtos;
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



        // ----------------------- Add product --------------------------------

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




    





        //------------------- delete product ----------------------------------------------

        public async Task<bool> DeleteProductByIdAsync(int productId)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync(); 
            try
            {
               
                var product = await _dbContext.products
                    .Include(p => p.Auctions) 
                    .FirstOrDefaultAsync(p => p.ProductId == productId);

                if (product == null)
                {
                    return false; 
                }

            
                var auction = product.Auctions;

                if (auction != null)
                {
                  
                    var bids = await _dbContext.Bids.Where(b => b.AuctionId == auction.AuctionId).ToListAsync();
                    _dbContext.Bids.RemoveRange(bids); 

                    
                    _dbContext.auctions.Remove(auction);
                }

                _dbContext.products.Remove(product);
                await _dbContext.SaveChangesAsync(); 

                await transaction.CommitAsync(); 
                return true; 
            }
            catch (Exception)
            {
                await transaction.RollbackAsync(); 
                throw; 
            }
        }



        //-------------------------- approved product ---------------------------------------
        public async Task ApproveProductAsync(int productId)
        {
            var product = await _dbContext.products.FindAsync(productId);

            if (product == null)
            {
                throw new NotFoundException($"Product with ID {productId} not found.");
            }

            product.is_approved = true; // Set is_approved to true

            _dbContext.products.Update(product);
            await _dbContext.SaveChangesAsync();
        }




        //--------------------get all product by user id---------------------------
        public async Task<List<GetProductsUserDtos>> GetProductsByUserIdAsync(Guid userId)
        {
            var products = await _dbContext.products
            .Where(p => p.UserId == userId) // Filter products by user ID
            .Select(p => new GetProductsUserDtos
            {
                productId = p.ProductId,
                productName = p.Name,
                CategoryName = p.Category.CategoriesName, // Assuming you have Category navigation property
                StartingPrice = (float)p.StartingPrise,
                IsApproved = p.is_approved,
                ThumbnailImage = p.thumbnailImage // Assuming you store the image URL as string
            })
            .ToListAsync();

            return products;
        }



        //----------------------- get product detail by product id-----------------------------------
        public async Task<ProductDetailsDto> GetProductDetailsByIdAsync(int productId)
        {
            var product = await _dbContext.products
                .Where(p => p.ProductId == productId)
                .Select(p => new ProductDetailsDto
                {
                    ProductName = p.Name,
                    CategoryName = p.Category.CategoriesName, // Assuming Category navigation property
                    Price = p.StartingPrise,
                    ImageUrl = p.thumbnailImage,
                    Description = p.Description,
                    IsApproved = p.is_approved
                })
                .FirstOrDefaultAsync();

            if (product == null)
            {
                throw new KeyNotFoundException($"Product with ID {productId} not found.");
            }

            return product;
        }

    }
}
