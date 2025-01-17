using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagement.Models.Models
{
  public class UserRegisterDto
  {
    public string Username { get; set; }
    public string Password { get; set; }
    public string FullName { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string Address { get; set; }
    public string ContactInfo { get; set; }
    public string Specialty { get; set; }
  }
}
