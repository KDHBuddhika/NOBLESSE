
using Nobeless.api.Service;

namespace Nobeless.api.Util
{
    public class AuctionCompletionHostedService : BackgroundService
    {

        private readonly IServiceProvider _serviceProvider;

        public AuctionCompletionHostedService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }



        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var auctionService = scope.ServiceProvider.GetRequiredService<IAuctionService>();
                    await auctionService.ProcessAuctionCompletion();
                }

                // Wait for 1 minute before checking again
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
    }
}
