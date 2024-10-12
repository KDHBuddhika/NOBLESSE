
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Nobeless.api.Data;
using Nobeless.api.Service;

namespace Nobeless.api.Util
{
    public class AuctionCompletionHostedService : BackgroundService
    {
        private readonly ILogger<AuctionStatusCheckerService> _logger;
        private readonly IServiceProvider _serviceProvider;
      

        public AuctionCompletionHostedService(IServiceProvider serviceProvider, ILogger<AuctionStatusCheckerService> logger)
        {
            _logger = logger;
            _serviceProvider = serviceProvider;
          
        }



        protected async override Task ExecuteAsync(CancellationToken stoppingToken)
        {

            _logger.LogInformation("Auction Status Checker Service started.");

            while (!stoppingToken.IsCancellationRequested)
            {
                await ProcessAuctionCompletion();
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }


        public async Task ProcessAuctionCompletion()
        {

            using (var scope = _serviceProvider.CreateScope())
            {
                var _DbContext = scope.ServiceProvider.GetRequiredService<NobelessDbContext>(); 
                var _emailService = scope.ServiceProvider.GetRequiredService<IEmailService>(); 
                var currentTime = DateTime.UtcNow;
                var auctions = await _DbContext.auctions
               .Where(a => a.EndTime <= DateTime.UtcNow && a.IsCompleted == true)
               .Include(a => a.Bids)
               .ToListAsync();

                foreach (var auction in auctions)
                {

                    var highestBid = auction.Bids
                        .OrderByDescending(b => b.Amount)
                        .FirstOrDefault();


                    if (highestBid != null)
                    {
                        highestBid.State = "win";

                        var winnerEmail = await _DbContext.users
                        .Where(u => u.Id == highestBid.UserId)
                        .Select(u => u.Email)
                        .FirstOrDefaultAsync();

                        if (winnerEmail != null)
                        {
                            string winnerMessage = $"Congratulations! You have won the auction with Auction ID: {auction.AuctionId} for Product ID: {auction.ProductId}.";

                          //  await _emailService.SendBidStateMassage(winnerEmail, winnerMessage);

                        }
                    }

                    foreach (var bid in auction.Bids)
                    {
                        if (bid != highestBid)
                        {
                            bid.State = "lose";

                            var loserEmail = await _DbContext.users
                           .Where(u => u.Id == bid.UserId)
                           .Select(u => u.Email)
                           .FirstOrDefaultAsync();

                            if (loserEmail != null)
                            {
                                string loserMessage = $"Unfortunately, you did not win the auction with Auction ID: {auction.AuctionId} for Product ID: {auction.ProductId}.";
                              //  await _emailService.SendBidStateMassage(loserEmail, loserMessage);
                            }
                        }
                    }


                   // auction.IsCompleted = true;
                }


                await _DbContext.SaveChangesAsync();


            }



           
        }



    }
}
