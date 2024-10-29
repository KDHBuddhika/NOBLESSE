namespace Nobeless.api.Model.Dtos.ResponseDtos.Dashboard
{
    public class UserDetailsDto
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateTime RegistrationDate { get; set; }
        public bool IsVerified { get; set; }
        public string UserType { get; set; }
    }
}
