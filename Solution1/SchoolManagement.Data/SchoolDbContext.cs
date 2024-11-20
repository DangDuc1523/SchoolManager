// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Data
{
    public partial class SchoolDbContext : DbContext
    {
        public SchoolDbContext()
        {
        }

        public SchoolDbContext(DbContextOptions<SchoolDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Class> Classes { get; set; }
        public virtual DbSet<ClassSubject> ClassSubjects { get; set; }
        public virtual DbSet<Grade> Grades { get; set; }
        public virtual DbSet<Student> Students { get; set; }
        public virtual DbSet<Subject> Subjects { get; set; }
        public virtual DbSet<Timetable> Timetables { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Class>(entity =>
            {
                entity.Property(e => e.ClassId).HasColumnName("ClassID");

                entity.Property(e => e.ClassName)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(e => e.Room).HasMaxLength(50);

                entity.Property(e => e.Schedule).HasMaxLength(255);

                entity.Property(e => e.StudentCount).HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<ClassSubject>(entity =>
            {
                entity.Property(e => e.ClassSubjectId).HasColumnName("ClassSubjectID");

                entity.Property(e => e.ClassId).HasColumnName("ClassID");

                entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

                entity.Property(e => e.TeacherId).HasColumnName("TeacherID");

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.ClassSubjects)
                    .HasForeignKey(d => d.ClassId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__ClassSubj__Class__32E0915F");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.ClassSubjects)
                    .HasForeignKey(d => d.SubjectId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__ClassSubj__Subje__33D4B598");

                entity.HasOne(d => d.Teacher)
                    .WithMany(p => p.ClassSubjects)
                    .HasForeignKey(d => d.TeacherId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__ClassSubj__Teach__34C8D9D1");
            });

            modelBuilder.Entity<Grade>(entity =>
            {
                entity.Property(e => e.GradeId).HasColumnName("GradeID");

                entity.Property(e => e.ClassId).HasColumnName("ClassID");

                entity.Property(e => e.StudentId).HasColumnName("StudentID");

                entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.Grades)
                    .HasForeignKey(d => d.ClassId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Grades__ClassID__3A81B327");

                entity.HasOne(d => d.Student)
                    .WithMany(p => p.Grades)
                    .HasForeignKey(d => d.StudentId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Grades__StudentI__38996AB5");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.Grades)
                    .HasForeignKey(d => d.SubjectId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Grades__SubjectI__398D8EEE");
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.Property(e => e.StudentId).HasColumnName("StudentID");

                entity.Property(e => e.ClassId).HasColumnName("ClassID");

                entity.Property(e => e.EnrollmentDate)
                    .HasColumnType("date")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.Students)
                    .HasForeignKey(d => d.ClassId)
                    .OnDelete(DeleteBehavior.SetNull)
                    .HasConstraintName("FK__Students__ClassI__2E1BDC42");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Students)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Students__UserID__2D27B809");
            });

            modelBuilder.Entity<Subject>(entity =>
            {
                entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

                entity.Property(e => e.Description).HasMaxLength(255);

                entity.Property(e => e.SubjectName)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Timetable>(entity =>
            {
                entity.Property(e => e.TimetableId).HasColumnName("TimetableID");

                entity.Property(e => e.ClassId).HasColumnName("ClassID");

                entity.Property(e => e.DateLearn).HasMaxLength(10);

                entity.Property(e => e.Room).HasMaxLength(50);

                entity.Property(e => e.SubjectId).HasColumnName("SubjectID");

                entity.HasOne(d => d.Class)
                    .WithMany(p => p.Timetables)
                    .HasForeignKey(d => d.ClassId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Timetable__Class__3D5E1FD2");

                entity.HasOne(d => d.Subject)
                    .WithMany(p => p.Timetables)
                    .HasForeignKey(d => d.SubjectId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Timetable__Subje__3E52440B");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Username, "UQ__Users__536C85E438EBC1CD")
                    .IsUnique();

                entity.Property(e => e.UserId).HasColumnName("UserID");

                entity.Property(e => e.Address).HasMaxLength(255);

                entity.Property(e => e.ContactInfo).HasMaxLength(100);

                entity.Property(e => e.DateOfBirth).HasColumnType("date");

                entity.Property(e => e.EmailConfirmed).HasDefaultValueSql("((0))");

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasMaxLength(100);

                entity.Property(e => e.OtpCode)
                    .HasMaxLength(6)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(255);

                entity.Property(e => e.Role).HasMaxLength(20);

                entity.Property(e => e.Specialty).HasMaxLength(50);

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
