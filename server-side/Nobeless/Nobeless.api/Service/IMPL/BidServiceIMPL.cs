using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Exceptions;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Model.Dtos.ResponseDtos;
using Nobeless.api.Util;

namespace Nobeless.api.Service.IMPL
{
    public class BidServiceIMPL : BidService
    {

        private  readonly NobelessDbContext _DbContext;
        private readonly IEmailService _emailService;

        public BidServiceIMPL(NobelessDbContext nobelessDbContext, IEmailService emailSender)
        {
             this._DbContext = nobelessDbContext;
            this._emailService = emailSender;
        }
        public async Task AddBid(BidDtos bidDtos)
        {


            if (bidDtos == null)
            {
                throw new ArgumentNullException(nameof(bidDtos));
            }


            var auction = await _DbContext.auctions
                                      .FirstOrDefaultAsync(a => a.AuctionId == bidDtos.AuctionId);

            if (auction == null)
            {
                throw new NotFoundException("Auction not found.");
            }


            if (auction.CurrentHighestBid < bidDtos.Amount) { 
                 auction.CurrentHighestBid = bidDtos.Amount;
                 _DbContext.auctions.Update(auction);
                _DbContext.SaveChanges();
            }

            var bid = new Bid 
            {
                Amount = bidDtos.Amount ,
                State = bidDtos.State ,
                AuctionId = bidDtos.AuctionId ,
                BidTime = bidDtos.BidTime ,
                UserId = bidDtos.UserId 
                
            };

            await _DbContext.Bids.AddAsync(bid);
            await _DbContext.SaveChangesAsync();
        }

    

        public async Task<List<BidResponseDtos>> getBidsByAuctionId(int id)
        {
            var bids = await _DbContext.Bids
                                  .Where(b => b.AuctionId == id)
                                  .Select(b => new BidResponseDtos
                                  {
                                      BidId = b.BidId,
                                      AuctionId = b.AuctionId,
                                      BidderId = b.UserId, 
                                      BidderName = b.User.UserName, 
                                      BidPrice = (float)b.Amount,
                                      BidDate = b.BidTime
                                  })
                                  .ToListAsync();

            
            return bids;
        }

        public async Task ProcessAuctionCompletion()
        {
           
            var auctions = await _DbContext.auctions
                .Where(a => a.EndTime <= DateTime.UtcNow && !a.IsCompleted)
                .Include(a => a.Bids)  
                .ToListAsync();

            foreach (var auction in auctions)
            {
                
                var highestBid = auction.Bids
                    .OrderByDescending(b => b.Amount)
                    .FirstOrDefault();

              
                if (highestBid != null)
                {
                    highestBid.State = "win";

                    var winnerEmail = await _DbContext.users
                    .Where(u => u.Id == highestBid.UserId)
                    .Select(u => u.Email)
                    .FirstOrDefaultAsync();

                    if (winnerEmail != null)
                    {
                        string winnerMessage = $"Congratulations! You have won the auction with Auction ID: {auction.AuctionId} for Product ID: {auction.ProductId}.";
                      
                        await _emailService.SendBidStateMassage(winnerEmail, winnerMessage);
                     
                    }
                }

                foreach (var bid in auction.Bids)
                {
                    if (bid != highestBid)  
                    {
                        bid.State = "lose";

                        var loserEmail = await _DbContext.users
                       .Where(u => u.Id == bid.UserId)
                       .Select(u => u.Email)
                       .FirstOrDefaultAsync();

                        if (loserEmail != null)
                        {
                            string loserMessage = $"Unfortunately, you did not win the auction with Auction ID: {auction.AuctionId} for Product ID: {auction.ProductId}.";
                            await _emailService.SendBidStateMassage(loserEmail, loserMessage);
                        }
                    }
                }

             
                auction.IsCompleted = true;
            }

           
            await _DbContext.SaveChangesAsync();
        }









        public async Task<List<BidderItemDetailsDtos>> GetBidderItemsByUserId(Guid userId)
        {
            var bidderItems = await _DbContext.Bids
            .Where(b => b.UserId == userId)
            .Select(b => new BidderItemDetailsDtos
            {
                BidId = b.BidId,
                BidAmount = b.Amount,
                BidTime = b.BidTime,
                BidStatus = b.State,
                AuctionId = b.AuctionId,
                StartTime = b.Auction.StartTime,
                EndTime = b.Auction.EndTime,
                CurrentHighestBid = b.Auction.CurrentHighestBid,
                IsCompleted = b.Auction.IsCompleted,
                ProductId = b.Auction.ProductId,
                ProductName = b.Auction.Product.Name,
                ProductDescription = b.Auction.Product.Description,
                ThumbnailImage = b.Auction.Product.thumbnailImage
            })
            .ToListAsync();

            return bidderItems;
        }





        // --------------------------- Get All Bid Details By Auction Id -----------------------------
        public async Task<List<BidderDetailsDto>> GetBiddersByAuctionIdAsync(int auctionId)
        {
            var bidders = await _DbContext.Bids
           .Where(b => b.AuctionId == auctionId)
           .Include(b => b.User) 
           .Select(b => new BidderDetailsDto
           {
               BidderId = b.User.Id,
               BidderName = b.User.UserName,
               BidAmount = b.Amount,
               BidderState = b.State, 
               BidTime = b.BidTime
           })
           .ToListAsync();

            if (!bidders.Any())
            {
                throw new NotFoundException($"No bidders found for auction with ID {auctionId}");
            }

            return bidders;
        }
    }
}
