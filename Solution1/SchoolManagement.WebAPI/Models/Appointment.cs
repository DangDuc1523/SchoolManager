﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace SchoolManagement.WebAPI.Models;

public partial class Appointment
{
    public Guid Id { get; set; }

    public Guid PatientId { get; set; }

    public Guid DoctorId { get; set; }

    public DateTime Date { get; set; }

    public int Status { get; set; }

    public Guid? UserId { get; set; }

    public virtual User Doctor { get; set; }

    public virtual User Patient { get; set; }

    public virtual User User { get; set; }
}