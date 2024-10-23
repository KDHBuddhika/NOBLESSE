namespace Nobeless.api.Model.Dtos.ResponseDtos
{
    public class BidderDetailsByUserIdDto
    {
        public int AuctionId { get; set; }
        public string AuctionName { get; set; }
        public string ImageUrl { get; set; }
        public decimal BidAmount { get; set; }
        public string State { get; set; }

        public int BidId { get; set; }
    }
}
