namespace Nobeless.api.Model.Dtos.ResponseDtos
{
    public class BidderItemDetailsDtos
    {
        public int BidId { get; set; }
        public decimal BidAmount { get; set; }
        public DateTime BidTime { get; set; }

        public string BidStatus { get; set; }

        public int AuctionId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public decimal CurrentHighestBid { get; set; }
        public bool IsCompleted { get; set; }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductDescription { get; set; }
        public double StartingPrice { get; set; }
        public string ThumbnailImage { get; set; }
    }
}
