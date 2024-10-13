using Nobeless.api.Model.Domain;

namespace Nobeless.api.Model.Dtos.RequestDtos
{
    public class AddAuctionDtos
    {
        public int ProductId { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public decimal CurrentHighestBid { get; set; }

        public bool IsCompleted { get; set; }
    }
}
