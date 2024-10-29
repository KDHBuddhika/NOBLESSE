using Nobeless.api.Model.Dtos.ResponseDtos;
using Nobeless.api.Model.Dtos.ResponseDtos.Dashboard;

namespace Nobeless.api.Service
{
    public interface AdminService
    {
        Task<bool> DeleteCategoryAsync(Guid categoryId);
        Task<List<AuctionDetailsDto>> GetAllAuctionDetailsAsync();
        Task<DashboardStatisticsDtos> GetDashboardStatisticsAsync();
        Task<DashboardProductDetailsDtos> GetProductDetailsByIdAsync(int productId);

        Task<List<UserDetailsDto>> GetAllUsersAsync();
    }
}
