// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SchoolManagement.Models.Models;

public partial class Student
{
  public int StudentId { get; set; }

  public int UserId { get; set; }

  public int ClassId { get; set; }

  public DateTime? EnrollmentDate { get; set; }
  [JsonIgnore]
  public virtual Class Class { get; set; }
  [NotMapped]
  [JsonIgnore]
  public virtual ICollection<Grade> Grades { get; set; } = new List<Grade>();

  public virtual User User { get; set; }
}
