﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace SchoolManagement.Models.Models
{
    public partial class Grade
    {
        public int GradeId { get; set; }
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
        public int ClassId { get; set; }
        public double? Score { get; set; }
    }
}