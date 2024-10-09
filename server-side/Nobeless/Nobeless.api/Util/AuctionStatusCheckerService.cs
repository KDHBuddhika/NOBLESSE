using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;

namespace Nobeless.api.Util
{
    public class AuctionStatusCheckerService : BackgroundService
    {
        private readonly ILogger<AuctionStatusCheckerService> _logger;
        private readonly IServiceProvider _serviceProvider;

        public AuctionStatusCheckerService(ILogger<AuctionStatusCheckerService> logger, IServiceProvider serviceProvider)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Auction Status Checker Service started.");

            while (!stoppingToken.IsCancellationRequested)
            {
                await CheckAndUpdateAuctionStatusesAsync();
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken); // Check every 1 minute
            }
        }

        private async Task CheckAndUpdateAuctionStatusesAsync()
        {
            using (var scope = _serviceProvider.CreateScope())
            {
                var dbContext = scope.ServiceProvider.GetRequiredService<NobelessDbContext>(); // Inject your DbContext
                var currentTime = DateTime.UtcNow;

                var auctionsToUpdate = await dbContext.auctions
                    .Where(a => a.EndTime <= currentTime && !a.IsCompleted)
                    .ToListAsync();

                foreach (var auction in auctionsToUpdate)
                {
                    auction.IsCompleted = true;
                }

                await dbContext.SaveChangesAsync();
            }



        }
    }
}
