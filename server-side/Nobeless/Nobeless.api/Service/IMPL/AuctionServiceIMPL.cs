using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Exceptions;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Model.Dtos.ResponseDtos;
using Nobeless.api.Model.Dtos.ResponseDtos.Dashboard;

namespace Nobeless.api.Service.IMPL
{
    public class AuctionServiceIMPL : AuctionService
    {

        private readonly NobelessDbContext _nobelessDbContext;

        public AuctionServiceIMPL(NobelessDbContext nobelessDbContext)
        {
            this._nobelessDbContext = nobelessDbContext;   
        }
        public async Task AddAuction(AddAuctionDtos addAuctionDto)
        {
            if (addAuctionDto == null) { 
                throw new ArgumentNullException(nameof(addAuctionDto));
            }

            var auction = new Auction { 
                ProductId = addAuctionDto.ProductId, 
                StartTime = addAuctionDto.StartTime,
                EndTime = addAuctionDto.EndTime,
                CurrentHighestBid = addAuctionDto.CurrentHighestBid,
                IsCompleted = addAuctionDto.IsCompleted,
            };
            await _nobelessDbContext.auctions.AddAsync(auction);
            await _nobelessDbContext.SaveChangesAsync();
            
        }

    




        //--------------------------------Get incompleted Auction Product ---------------------
        public async Task<List<auctionproductDtos>> GetIncompleteAuctionProductDtos()
        {
            var auctionDtos = await _nobelessDbContext.auctions
                    .Where(a => !a.IsCompleted) 
                    .Include(a => a.Product)
                    .ThenInclude(p => p.Category) 
                    .Include(a => a.Product.User) 
                    .Select(a => new auctionproductDtos
                    {
                        AuctionId = a.AuctionId,
                        StartTime = a.StartTime,
                        EndTime = a.EndTime,
                        CurrentHighestBid = a.CurrentHighestBid,
                        IsCompleted = a.IsCompleted,

                        // Product details
                        Name = a.Product.Name,
                        Description = a.Product.Description,
                        StartingPrise = a.Product.StartingPrise,
                        ThumbnailImage = a.Product.thumbnailImage,
                        UserId = a.Product.UserId,
                        CategoryId = a.Product.CategoryId,
                        CategoryName = a.Product.Category.CategoriesName
                    })
                    .ToListAsync();

            return auctionDtos;
        }






        //----------------------- Delete Auction ---------------------------------

        public async Task<bool> DeleteAuctionAsync(int auctionId)
        {
            using var transaction = await _nobelessDbContext.Database.BeginTransactionAsync();
            try
            {
               
                var auction = await _nobelessDbContext.auctions
                    .Include(a => a.Bids) 
                    .FirstOrDefaultAsync(a => a.AuctionId == auctionId);

                if (auction == null)
                {
                    return false; 
                }

               
                if (auction.Bids.Any())
                {
                    _nobelessDbContext.Bids.RemoveRange(auction.Bids);
                }

              
                _nobelessDbContext.auctions.Remove(auction);

             
                await _nobelessDbContext.SaveChangesAsync();
                await transaction.CommitAsync();

                return true; 
            }
            catch (Exception)
            {
                await transaction.RollbackAsync(); 
                throw;
            }
        }



        //---------------------------------get all auction by not completed with pagination ------------------------
        public async Task<(List<AuctionDetailsDto>, int)> GetAuctionDetailsAsync(int page, int itemsPerPage)
        {
            var query = _nobelessDbContext.auctions
            .Where(a => !a.IsCompleted)
            .Include(a => a.Product)
            .ThenInclude(p => p.Category)
            .Select(a => new AuctionDetailsDto
            {
                AuctionId = a.AuctionId,
                ProductId = a.ProductId,
                ProductName = a.Product.Name,
                StartTime = a.StartTime,
                ImageUrl= a.Product.thumbnailImage,
                EndTime = a.EndTime,
                HighestBidPrice = a.CurrentHighestBid,
                CategoryId = a.Product.Category.Id,
                CategoryName = a.Product.Category.CategoriesName
            });

            // --Calculate total records--
            var totalRecords = await query.CountAsync();

            // --Paginate-- 
            var paginatedResults = await query
                .Skip((page - 1) * itemsPerPage)
                .Take(itemsPerPage)
                .ToListAsync();

            return (paginatedResults, totalRecords);
        }



        // ----------------------------- get auction details by auction id -------------------------------------
        public async Task<AuctionDetailsByIdDto> GetAuctionDetailsByIdAsync(int auctionId)
        {
            var auction = await _nobelessDbContext.auctions
             .Where(a => a.AuctionId == auctionId)
             .Include(a => a.Product)
             .ThenInclude(p => p.Category)
             .Include(a => a.Product.User) 
             .Select(a => new AuctionDetailsByIdDto
             {
                 ProductName = a.Product.Name,
                 ImageUrl = a.Product.thumbnailImage,
                 Description = a.Product.Description,
                 HighestBid = a.CurrentHighestBid,
                 StartTime = a.StartTime,
                 EndTime = a.EndTime,
                 CategoryName = a.Product.Category.CategoriesName,
                 CategoryId = a.Product.Category.Id,
                 UserId = a.Product.User.Id,
                 IsCompleted = a.IsCompleted,
             })
             .FirstOrDefaultAsync();

            if (auction == null)
            {
                throw new NotFoundException($"Auction with ID {auctionId} not found.");
            }

            return auction;
        }



        // -------------------------- get winner By Auctiion Id --------------------------------
        public async Task<WinnerDetailsDto> GetWinnerDetailsByAuctionIdAsync(int auctionId)
        {
            var auction = await _nobelessDbContext.auctions
           .Where(a => a.AuctionId == auctionId && a.IsCompleted)
           .Include(a => a.Bids)
           .ThenInclude(b => b.User) 
           .FirstOrDefaultAsync();

            if (auction == null)
            {
                throw new KeyNotFoundException($"No completed auction found with ID {auctionId}");
            }

          
            var winningBid = auction.Bids
                .OrderByDescending(b => b.Amount)
                .FirstOrDefault();

            if (winningBid == null)
            {
                throw new Exception($"No bids found for auction with ID {auctionId}");
            }

         
            var winnerDetails = new WinnerDetailsDto
            {
                WinnerId = winningBid.User.Id,
                WinnerName = winningBid.User.UserName,
                WinningBidAmount = winningBid.Amount,
                BidTime = winningBid.BidTime
            };

            return winnerDetails;
        }



        //--------------------- get all auction detail by user id  for user prfile -----------------------
        public async Task<List<AuctionDetailsByUserIdDto>> GetAuctionDetailsByUserIdAsync(Guid userId)
        {
            var auctions = await _nobelessDbContext.auctions
              .Include(a => a.Product)
              .ThenInclude(p => p.Auctions.Bids) 
              .Where(a => a.Product.UserId == userId) 
              .Select(a => new AuctionDetailsByUserIdDto
              {
                  AuctionId = a.AuctionId,
                  ImageUrl = a.Product.thumbnailImage,
                  ProductName = a.Product.Name,
                  BidderCount = a.Bids.Count(),
                  StartTime = a.StartTime,
                  EndTime = a.EndTime,
                  StartingPrice = a.Product.StartingPrise,
                  HighestPrice = a.CurrentHighestBid,
                  AuctionState = a.IsCompleted ? "Completed" : "Ongoing",
                  TimeRemaining = a.EndTime > DateTime.UtcNow ? a.EndTime - DateTime.UtcNow : TimeSpan.Zero
              })
              .ToListAsync();

            return auctions;
        }
    }
}
