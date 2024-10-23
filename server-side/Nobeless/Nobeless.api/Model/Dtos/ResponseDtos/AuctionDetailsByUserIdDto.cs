namespace Nobeless.api.Model.Dtos.ResponseDtos
{
    public class AuctionDetailsByUserIdDto
    {
        public string ImageUrl { get; set; }
        public string ProductName { get; set; }
        public int BidderCount { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public double StartingPrice { get; set; }
        public decimal HighestPrice { get; set; }
        public string AuctionState { get; set; }
        public TimeSpan TimeRemaining { get; set; }
    }
}
