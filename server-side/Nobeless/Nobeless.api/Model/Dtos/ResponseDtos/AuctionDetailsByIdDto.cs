namespace Nobeless.api.Model.Dtos.ResponseDtos
{
    public class AuctionDetailsByIdDto
    {
        public string ProductName { get; set; }
        public string ImageUrl { get; set; }
        public string Description { get; set; }
        public decimal HighestBid { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string CategoryName { get; set; }
        public bool IsCompleted { get; set; }
        public Guid CategoryId { get; set; }
        public Guid UserId { get; set; }
    }
}
