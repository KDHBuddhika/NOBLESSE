using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Model.Dtos.ResponseDtos;

namespace Nobeless.api.Service
{
    public interface BidService
    {
        Task AddBid(BidDtos bidDtos);
        Task<List<BidderItemDetailsDtos>> GetBidderItemsByUserId(Guid userId);
       
        // old
        Task<List<BidResponseDtos>> getBidsByAuctionId(int id);

        Task ProcessAuctionCompletion();

        // new
        Task<List<BidderDetailsDto>> GetBiddersByAuctionIdAsync(int auctionId);


        Task<List<BidderDetailsByUserIdDto>> GetBidsByUserIdAsync(Guid userId);

        Task<bool> DeleteBidAsync(int bidId);
    }
}
