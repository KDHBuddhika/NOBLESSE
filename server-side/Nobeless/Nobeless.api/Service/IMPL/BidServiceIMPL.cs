using Nobeless.api.Data;
using Nobeless.api.Model.Domain;
using Nobeless.api.Model.Dtos.RequestDtos;

namespace Nobeless.api.Service.IMPL
{
    public class BidServiceIMPL : BidService
    {

        private  readonly NobelessDbContext _DbContext;

        public BidServiceIMPL(NobelessDbContext nobelessDbContext)
        {
             this._DbContext = nobelessDbContext;
        }
        public async Task AddBid(BidDtos bidDtos)
        {
            if (bidDtos == null)
            {
                throw new ArgumentNullException(nameof(bidDtos));
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
    }
}
