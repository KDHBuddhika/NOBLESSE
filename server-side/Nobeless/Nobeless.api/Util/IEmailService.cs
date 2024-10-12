namespace Nobeless.api.Util
{
    public interface IEmailService
    {
        Task SendVerificationEmail(string email, string verificationLink);
        Task SendBidStateMassage(string email, string bidState);
    }
}
