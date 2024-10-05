using System.Net;
using System.Net.Mail;

namespace Nobeless.api.Util
{
    public class EmailService
    {

        public async Task SendVerificationEmail(string email, string verificationLink)
        {
            using (var smtpClient = new SmtpClient("smtp.gmail.com"))
            {

                smtpClient.Port = 587;
                smtpClient.Credentials = new NetworkCredential("dineshhashan001@gmail.com", "dineshzitao001");
                smtpClient.EnableSsl = true;

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("dineshhashan001@gmail.com"),
                    Subject = "Email Verification",
                    Body = $"Click the link to verify your account: {verificationLink}",
                    IsBodyHtml = true,
                };

                mailMessage.To.Add(email);

                await smtpClient.SendMailAsync(mailMessage);

            }
        }


    }
}
