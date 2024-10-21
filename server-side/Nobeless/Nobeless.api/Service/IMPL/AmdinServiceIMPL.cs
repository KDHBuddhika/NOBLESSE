using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Model.Dtos.ResponseDtos;

namespace Nobeless.api.Service.IMPL
{
    public class AmdinServiceIMPL : AdminService
    {
        private readonly NobelessDbContext _dbContext;

        public AmdinServiceIMPL( NobelessDbContext dbContext)
        {
            this._dbContext = dbContext;
        }


        //---------------------------dashboard static details -------------------------------------------
        public async Task<DashboardStatisticsDtos> GetDashboardStatisticsAsync()
        {

            var totalUsers = await _dbContext.users.CountAsync();

          
            var totalAuctions = await _dbContext.auctions.CountAsync();

          
            var ongoingAuctions = await _dbContext.auctions
                .Where(a => a.EndTime > DateTime.UtcNow && !a.IsCompleted)
                .CountAsync();

          
            var pendingProductApprovals = await _dbContext.products
                .Where(p => !p.is_approved)
                .CountAsync();

          
            var totalBidders = await _dbContext.Bids
                .Select(b => b.UserId)
                .Distinct()
                .CountAsync();

          
            var totalSellers = await _dbContext.products
                .Select(p => p.UserId)
                .Distinct()
                .CountAsync();

          
            return new DashboardStatisticsDtos
            {
                TotalUsers = totalUsers,
                TotalAuctions = totalAuctions,
                OngoingAuctions = ongoingAuctions,
                PendingProductApprovals = pendingProductApprovals,
                TotalBidders = totalBidders,
                TotalSellers = totalSellers
            };


        }
    }
}
