﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

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

    public virtual ICollection<ClassSubject> ClassSubjects { get; set; } = new List<ClassSubject>();

    public virtual ICollection<Student> Students { get; set; } = new List<Student>();
}