using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Model.Dtos.ResponseDtos;

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




    }
}
