﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace SchoolManagement.Models.Models
{
    public partial class Class
    {
        [Key]
        [Column("ClassID")]
        public int ClassId { get; set; }
        [Required]
        [StringLength(50)]
        public string ClassName { get; set; }
        [StringLength(255)]
        public string Schedule { get; set; }
        [StringLength(50)]
        public string Room { get; set; }
        public int? StudentCount { get; set; }
    }
}