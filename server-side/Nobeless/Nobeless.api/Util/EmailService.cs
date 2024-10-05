using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;
using System.Net;
using System.Net.Mail;
using static System.Net.Mime.MediaTypeNames;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace Nobeless.api.Util
{

    
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendVerificationEmail(string email, string verificationLink)
        {
            string link = $"Click the link to verify your account: {verificationLink}";
            var emails = new MimeMessage();
            emails.From.Add(MailboxAddress.Parse(_configuration.GetSection("EmailUserName").Value));
            emails.To.Add(MailboxAddress.Parse(email));
            emails.Subject = "verify your account";
            emails.Body = new TextPart(TextFormat.Html) { Text = link };


            using var smtp = new SmtpClient();
            smtp.Connect(_configuration.GetSection("EmailHost").Value,587,SecureSocketOptions.StartTls);
            smtp.Authenticate(_configuration.GetSection("EmailUserName").Value, _configuration.GetSection("EmailPassword").Value);
            smtp.Send(emails);
            smtp.Disconnect(true);



        }


    }
}
