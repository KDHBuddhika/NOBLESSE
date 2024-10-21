using Nobeless.api.Model.Dtos.ResponseDtos;

namespace Nobeless.api.Service
{
    public interface AdminService
    {
        Task<DashboardStatisticsDtos> GetDashboardStatisticsAsync();
    }
}
