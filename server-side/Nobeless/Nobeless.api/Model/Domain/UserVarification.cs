namespace Nobeless.api.Model.Domain
{
    public class UserVarification
    {
        public Guid Id { get; set; }
        public Guid VarificationToken { get; set; }
        public DateTime ExpirationDate { get; set; }

        public Guid UserId { get; set; }

        //navigation

        public User user { get; set; }
    }
}
