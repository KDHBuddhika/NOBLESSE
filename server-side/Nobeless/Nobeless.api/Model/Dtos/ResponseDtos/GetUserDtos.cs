using Nobeless.api.Model.Domain;
using Nobeless.api.Util;

namespace Nobeless.api.Model.Dtos.ResponseDtos
{
    public class GetUserDtos
    {
        public string Id { get; set; }
        public string UserName { get; set; }
     
        public string Email { get; set; }
        public DateTime Register_date { get; set; }
        public string usertype { get; set; }

        public bool isVerified { get; set; }

        public string? PhoneNumber { get; set; } = null;

        public string? Address { get; set; } = null;

        public string? City { get; set; } = null;
        public string? Lane { get; set; } = null;

     
    }
}
