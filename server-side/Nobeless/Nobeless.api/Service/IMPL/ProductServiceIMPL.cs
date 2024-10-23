using Microsoft.AspNetCore.Hosting;
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
        private readonly string _uploadPath; 

        public ProductServiceIMPL(NobelessDbContext nobelessDbContext,UploadHandler uploadHandler)
        {
            _dbContext = nobelessDbContext;
            _uploadHandler = uploadHandler;
            _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

        }



        // ----------------------- Add product --------------------------------

        public async Task<string> AddProduct(ProductDtos productDto)
        {


          
            if (productDto.thumbnailImage == null || productDto.thumbnailImage.Length == 0)
            {
                throw new BadRequestException("Image is required.");
            }

         
            var categoryExists = await _dbContext.categories.FindAsync(productDto.CategoryId);
            if (categoryExists == null)
            {
                throw new InvalidOperationException("Invalid Category ID. Category does not exist.");
            }

           
            var userExists = await _dbContext.users.FindAsync(productDto.UserId);
            if (userExists == null)
            {
                throw new InvalidOperationException("Invalid User ID. User does not exist.");
            }

           
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

        public async Task<bool> DeleteProductAsync(int productId)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync(); 

            try
            {
               
                var product = await _dbContext.products
                    .Include(p => p.Auctions)
                    .ThenInclude(a => a.Bids) 
                    .FirstOrDefaultAsync(p => p.ProductId == productId);

                if (product == null)
                {
                    return false; 
                }

               
                var auction = product.Auctions;

                if (auction != null)
                {
                    
                    var bids = auction.Bids.ToList();
                    if (bids.Any())
                    {
                        _dbContext.Bids.RemoveRange(bids); 
                    }

                  
                    _dbContext.auctions.Remove(auction);
                }

                if (!string.IsNullOrEmpty(product.thumbnailImage))
                {
                   
                    var filePath = Path.Combine(_uploadPath, product.thumbnailImage);

                    if (File.Exists(filePath))
                    {
                        File.Delete(filePath); 
                    }
                }


                _dbContext.products.Remove(product);

              
                await _dbContext.SaveChangesAsync();
                await transaction.CommitAsync();

                return true; 
            }
            catch (Exception ex)
            {
              
                await transaction.RollbackAsync();
                throw new Exception("Error while deleting product", ex);
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

            product.is_approved = true; 

            _dbContext.products.Update(product);
            await _dbContext.SaveChangesAsync();
        }




        //--------------------get all product by user id---------------------------
        public async Task<List<GetProductsUserDtos>> GetProductsByUserIdAsync(Guid userId)
        {
            var products = await _dbContext.products
            .Where(p => p.UserId == userId) 
            .Select(p => new GetProductsUserDtos
            {
                productId = p.ProductId,
                productName = p.Name,
                CategoryName = p.Category.CategoriesName, 
                StartingPrice = (float)p.StartingPrise,
                IsApproved = p.is_approved,
                ThumbnailImage = p.thumbnailImage 
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
                    CategoryName = p.Category.CategoriesName, 
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



        //------------------------- get all product-----------------------------------------------------------
        public async Task<List<GetProductsUserDtos>> GetAllProducts()
        {
            var products = await _dbContext.products
           
           .Select(p => new GetProductsUserDtos
           {
               productId = p.ProductId,
               productName = p.Name,
               CategoryName = p.Category.CategoriesName, 
               StartingPrice = (float)p.StartingPrise,
               IsApproved = p.is_approved,
               ThumbnailImage = p.thumbnailImage 
           })
           .ToListAsync();

            if (!products.Any())
            {
                throw new NotFoundException("products are not found");
            }

            return products;
        }
    }
}
