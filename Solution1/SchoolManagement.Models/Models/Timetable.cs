﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace SchoolManagement.Models.Models
{
    public partial class Timetable
    {
        public int TimetableId { get; set; }
        public int ClassId { get; set; }
        public int SubjectId { get; set; }
        public string DateLearn { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Room { get; set; }
    }
}
