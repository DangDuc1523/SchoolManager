// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SchoolManagement.Models.Models;


public partial class User
{
  public int UserId { get; set; }
  public string Username { get; set; }
  public string PasswordHash { get; set; }
  public string Role { get; set; }
  public string FullName { get; set; }
  public DateTime? DateOfBirth { get; set; }
  public string Address { get; set; }
  public string ContactInfo { get; set; }
  public string Specialty { get; set; }

  [NotMapped]
  [JsonIgnore]
  public bool EmailConfirmed { get; set; } = false;
  [NotMapped]
  [JsonIgnore]
  public string OtpCode { get; set; }
}


