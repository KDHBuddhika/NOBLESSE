namespace Nobeless.api.Model.Dtos.ResponseDtos
{
    public class BidderDetailsDto
    {
        public Guid BidderId { get; set; }
        public string BidderName { get; set; }
        public decimal BidAmount { get; set; }
        public string BidderState { get; set; } // You can replace with enum or actual type if needed
        public DateTime BidTime { get; set; }


    }
}
