﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SchoolManagement.Models.Models
{
    [Table("Class_Subjects")]
    public partial class ClassSubject
    {
        [Key]
        [Column("ClassSubjectID")]
        public int ClassSubjectId { get; set; }
        [Column("ClassID")]
        public int ClassId { get; set; }
        [Column("SubjectID")]
        public int SubjectId { get; set; }
        [Column("TeacherID")]
        public int TeacherId { get; set; }
    }
}