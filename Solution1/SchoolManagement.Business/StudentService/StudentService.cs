﻿using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.StudentService
{
    public class StudentService : IStudentService
    {
        private readonly IBaseRepository<Student> _studentRepository;

        public StudentService(IBaseRepository<Student> StudentRepository)
        {
            _studentRepository = StudentRepository;
        }

        public async Task<IEnumerable<Student>> GetAllStudentAsync()
        {
            return await _studentRepository.GetAllAsync();
        }

        public async Task<Student> GetStudentByIdAsync(int id)
        {
            return await _studentRepository.GetByIdAsync(id);
        }

        public async Task<Student> AddStudentAsync(Student Student)
        {
            await _studentRepository.AddAsync(Student);
            return Student;
        }

        public async Task<Student> UpdateStudentAsync(Student Student)
        {
            await _studentRepository.UpdateAsync(Student);
            return Student;
        }

        public async Task<Student> DeleteStudentAsync(int id)
        {
            var Student = await _studentRepository.GetByIdAsync(id);
            if (Student != null)
            {
                await _studentRepository.DeleteAsync(id);
            }
            return Student;
        }

        
    }
}
