namespace Nobeless.api.Model.Dtos.ResponseDtos.Dashboard
{
    public class AuctionDetailsDto
    {
        public int AuctionId { get; set; }
        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ImageUrl { get; set; }
        public decimal HighestBidPrice { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsCompleted { get; set; }

        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
