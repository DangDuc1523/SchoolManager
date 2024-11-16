using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagement.Business
{
  public class EmailService
  {
    private readonly IConfiguration _config;

    public EmailService(IConfiguration config)
    {
      _config = config;
    }

    public async Task SendEmailAsync(string toEmail, string subject, string message)
    {
      var smtpClient = new SmtpClient(_config["EmailSettings:Host"])
      {
        Port = int.Parse(_config["EmailSettings:Port"]),
        Credentials = new NetworkCredential(_config["EmailSettings:Username"], _config["EmailSettings:Password"]),
        EnableSsl = true,
      };

      var mailMessage = new MailMessage
      {
        From = new MailAddress(_config["EmailSettings:FromEmail"]),
        Subject = subject,
        Body = message,
        IsBodyHtml = true,
      };

      mailMessage.To.Add(toEmail);

      await smtpClient.SendMailAsync(mailMessage);
    }
  }
}
