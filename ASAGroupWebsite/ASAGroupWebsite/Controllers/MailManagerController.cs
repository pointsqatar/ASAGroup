using ASAGroupWebsite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using System.Web.Mvc;

namespace ASAGroupWebsite.Controllers
{
    public class MailManagerController : Controller
    {
        [System.Web.Http.HttpPost]
        public string SendMail(EmailModel userDetails)
        {
            string result = string.Empty;
            try
            {
                string smtpHost = System.Configuration.ConfigurationManager.AppSettings["smtpHost"];
                string smtpPort = System.Configuration.ConfigurationManager.AppSettings["smtpPort"];
                SmtpClient smtpClient = new SmtpClient(smtpHost, Convert.ToInt32(smtpPort));

                string smtpFromMailId = System.Configuration.ConfigurationManager.AppSettings["smtpFromMailId"];
                string smtpFromPassword = System.Configuration.ConfigurationManager.AppSettings["smtpFromPassword"];

                smtpClient.Credentials = new System.Net.NetworkCredential(smtpFromMailId, smtpFromPassword);
                smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtpClient.EnableSsl = true;
                MailMessage mail = new MailMessage();

                //Setting From , To and CC
                string smtpFromDisplayName = System.Configuration.ConfigurationManager.AppSettings["smtpFromDisplayName"];
                string smtpToMailId = System.Configuration.ConfigurationManager.AppSettings["smtpToMailId"];
                mail.From = new MailAddress(smtpFromMailId, smtpFromDisplayName);
                mail.To.Add(new MailAddress(smtpToMailId));
                mail.Subject = userDetails.UserSubject;
                mail.Body = string.Format(GetMailTemplate(), userDetails.UserName, userDetails.UserMailId, userDetails.UserPhoneNo, userDetails.UserSubject, userDetails.UserMessage);
                mail.IsBodyHtml = true;
                smtpClient.Send(mail);
                result = "success";
            }
            catch (Exception exception)
            {
                var ex = exception.Message;
                result = "failed";
            }
            return result;
        }

        private string GetMailTemplate()
        {
            string mailTemplate = System.IO.File.ReadAllText(Server.MapPath(@"~/MailTemplate.html"));

            return mailTemplate;
        }
    }
}