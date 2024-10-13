using System.ComponentModel.DataAnnotations.Schema;

namespace Nobeless.api.Model.Domain
{
    public class Auction
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AuctionId { get; set; }

       
        public int ProductId { get; set; }
        public Products Product { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public decimal CurrentHighestBid { get; set; }

         public bool IsCompleted { get; set; }

        public List<Bid> Bids { get; } = [];

        public List<User> Users { get; } = [];



    }
}
