using Nobeless.api.Model.Dtos.RequestDtos;
using Nobeless.api.Model.Dtos.ResponseDtos;
using Nobeless.api.Model.Dtos.ResponseDtos.Dashboard;

namespace Nobeless.api.Service
{
    public interface AuctionService
    {
        Task AddAuction(AddAuctionDtos addAuctionDto);
        Task<bool> DeleteAuctionAsync(int auctionId);


        Task<(List<AuctionDetailsDto>, int)> GetAuctionDetailsAsync(int page, int itemsPerPage);


        Task<List<auctionproductDtos>> GetIncompleteAuctionProductDtos();
    }
}
