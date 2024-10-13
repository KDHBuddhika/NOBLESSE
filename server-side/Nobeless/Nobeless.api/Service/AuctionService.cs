using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Model.Dtos.ResponseDtos;

namespace Nobeless.api.Service
{
    public interface AuctionService
    {
        Task AddAuction(AddAuctionDtos addAuctionDto);
        Task<List<auctionproductDtos>> GetIncompleteAuctionProductDtos();
    }
}
