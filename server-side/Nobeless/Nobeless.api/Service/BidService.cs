using Nobeless.api.Model.Dtos.RequestDtos;

namespace Nobeless.api.Service
{
    public interface BidService
    {
        Task AddBid(BidDtos bidDtos);
    }
}
