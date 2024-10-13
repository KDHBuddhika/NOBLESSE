using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Model.Dtos.ResponseDtos;

namespace Nobeless.api.Service
{
    public interface BidService
    {
        Task AddBid(BidDtos bidDtos);
        Task<List<BidResponseDtos>> getBidsByAuctionId(int id);

        Task ProcessAuctionCompletion();
    }
}
