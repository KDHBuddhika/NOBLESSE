using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Exceptions;
using Nobeless.api.Model.Dtos.ResponseDtos;
using Nobeless.api.Model.Dtos.ResponseDtos.Dashboard;

namespace Nobeless.api.Service.IMPL
{
    public class AmdinServiceIMPL : AdminService
    {
        private readonly NobelessDbContext _dbContext;

        public AmdinServiceIMPL( NobelessDbContext dbContext)
        {
            this._dbContext = dbContext;
        }

    


        //---------------------------dashboard static details -------------------------------------------
        public async Task<DashboardStatisticsDtos> GetDashboardStatisticsAsync()
        {

            var totalUsers = await _dbContext.users.CountAsync();

          
            var totalAuctions = await _dbContext.auctions.CountAsync();

          
            var ongoingAuctions = await _dbContext.auctions
                .Where(a => a.EndTime > DateTime.UtcNow && !a.IsCompleted)
                .CountAsync();

          
            var pendingProductApprovals = await _dbContext.products
                .Where(p => !p.is_approved)
                .CountAsync();

          
            var totalBidders = await _dbContext.Bids
                .Select(b => b.UserId)
                .Distinct()
                .CountAsync();

          
            var totalSellers = await _dbContext.products
                .Select(p => p.UserId)
                .Distinct()
                .CountAsync();

          
            return new DashboardStatisticsDtos
            {
                TotalUsers = totalUsers,
                TotalAuctions = totalAuctions,
                OngoingAuctions = ongoingAuctions,
                PendingProductApprovals = pendingProductApprovals,
                TotalBidders = totalBidders,
                TotalSellers = totalSellers
            };


        }


        //----------------------get product details for dashboard--------------------------------------------------------------
        public async Task<DashboardProductDetailsDtos> GetProductDetailsByIdAsync(int productId)
        {
            var productDetails = await _dbContext.products
            .Where(p => p.ProductId == productId)
            .Select(p => new DashboardProductDetailsDtos
            {
                ImageUrl = p.thumbnailImage,
                ProductName = p.Name,
                Description = p.Description,
                StartingPrice = p.StartingPrise,
                CategoryName = p.Category.CategoriesName, 
                IsApproved = p.is_approved,

                // User details
                UserId = p.User.Id,
                UserName = p.User.UserName,
                UserEmail = p.User.Email
            })
            .FirstOrDefaultAsync();

            if (productDetails == null)
            {
                throw new NotFoundException($"Product with ID {productId} not found.");
            }

            return productDetails;
        }





       // ----------------------  get all auction details --------------------------------------------------
        public async Task<List<AuctionDetailsDto>> GetAllAuctionDetailsAsync()
        {
            var auctionDetails = await _dbContext.auctions
             .Include(a => a.Product) 
             .ThenInclude(p => p.Category) 
             .Select(a => new AuctionDetailsDto
             {
                 AuctionId = a.AuctionId,
                 ProductId = a.ProductId,
                 ProductName = a.Product.Name,
                 ImageUrl = a.Product.thumbnailImage,
                 HighestBidPrice = a.CurrentHighestBid,
                 StartTime = a.StartTime,
                 EndTime = a.EndTime,
                 IsCompleted = a.IsCompleted,

                 // Category details
                 CategoryId = a.Product.Category.Id,
                 CategoryName = a.Product.Category.CategoriesName
             })
             .ToListAsync();

            return auctionDetails;
        }


        //----------------------------------Delete Category --------------------------------------------------
        public async Task<bool> DeleteCategoryAsync(Guid categoryId)
        {
            using var transaction = await _dbContext.Database.BeginTransactionAsync(); 

            try
            {
                
                var category = await _dbContext.categories
                    .Include(c => c.Products) 
                    .FirstOrDefaultAsync(c => c.Id == categoryId);

                if (category == null)
                {
                    return false; 
                }

                
                if (category.Products.Any())
                {
                    _dbContext.products.RemoveRange(category.Products); 
                }

                
                _dbContext.categories.Remove(category);

               
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








    }


    
}
