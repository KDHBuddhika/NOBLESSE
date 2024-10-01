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

    }
}
