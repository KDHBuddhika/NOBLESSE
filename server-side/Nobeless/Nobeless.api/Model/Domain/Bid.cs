using System.ComponentModel.DataAnnotations.Schema;

namespace Nobeless.api.Model.Domain
{
    public class Bid
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int BidId { get; set; }

     

        public decimal Amount { get; set; }
        public DateTime BidTime { get; set; }
        public string State { get; set; }

        public Guid UserId { get; set; }
        public User User { get; set; }


        public int AuctionId { get; set; }
        public Auction Auction { get; set; }
    }
}
