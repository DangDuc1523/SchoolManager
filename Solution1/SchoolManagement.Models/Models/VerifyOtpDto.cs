using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagement.Models.Models
{
  public class VerifyOtpDto
  {
    public string Username { get; set; }
    public string OtpCode { get; set; }
  }
}
