using Nobeless.api.Model.Domain;

namespace Nobeless.api.Model.Dtos.RequestDtos
{
    public class BidDtos
    {
        public decimal Amount { get; set; }
        public DateTime BidTime { get; set; }
        public string State { get; set; }

        public Guid UserId { get; set; }

        public int AuctionId { get; set; }
      
    }
}
