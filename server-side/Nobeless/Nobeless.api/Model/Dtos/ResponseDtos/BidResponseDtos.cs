namespace Nobeless.api.Model.Dtos.ResponseDtos
{
    public class BidResponseDtos
    {
        public int BidId { get; set; }
        public int AuctionId { get; set; }
        public Guid BidderId { get; set; }
        public String BidderName { get; set; }

        public float BidPrice { get; set; }
        public DateTime BidDate { get; set; }



    }
}
