﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace SchoolManagement.WebAPI.Models;

public partial class Student
{
    public int StudentId { get; set; }

    public int UserId { get; set; }

    public int ClassId { get; set; }

    public DateTime? EnrollmentDate { get; set; }

    public virtual Class Class { get; set; }

    public virtual ICollection<Grade> Grades { get; set; } = new List<Grade>();

    public virtual User User { get; set; }
}