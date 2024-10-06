namespace Nobeless.api.Util
{
    public interface IEmailService
    {
        Task SendVerificationEmail(string email, string verificationLink);
    }
}
