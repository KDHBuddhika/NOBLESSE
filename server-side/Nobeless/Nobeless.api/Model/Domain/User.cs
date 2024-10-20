using Nobeless.api.Util;

namespace Nobeless.api.Model.Domain
{
    public class User
    {
        public Guid Id { get; set; } 
        

        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public DateTime Register_date { get; set; }
        public Usertype usertype {  get; set; } 

        public bool isVerified { get; set; }

        public string? PhoneNumber { get; set; } = null;

        public string? Address { get; set; } = null;

        public string? City { get; set; } = null;
        public string? Lane { get; set; } = null ;

        public ICollection<Products> Products { get; set; }

        public List<Bid> Bids { get; } = [];
        public List<Auction>? Auctions { get; set; } = [];


    }
}
