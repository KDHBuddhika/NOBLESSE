namespace Nobeless.api.Model.Dtos.ResponseDtos
{
    public class auctionproductDtos
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public double StartingPrise { get; set; }
        public string ThumbnailImage { get; set; }
        public Guid UserId { get; set; }
        public Guid CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int AuctionId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public decimal CurrentHighestBid { get; set; }
        public bool IsCompleted { get; set; }
    }
}
