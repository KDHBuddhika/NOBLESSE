using Nobeless.api.Util;
using System.Text.Json.Serialization;

namespace Nobeless.api.Model.Dtos.RequestDtos
{
    public class UserRegisterDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime RegistationDate { get; set; }


        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Usertype userType { get; set; }

    }
}
