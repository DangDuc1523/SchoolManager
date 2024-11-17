using Microsoft.EntityFrameworkCore;
using SchoolManagement.Data;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Models.Models;

namespace SchoolManagement.Business.SubjectService
{
    public class SubjectService : ISubjectService
    {
    private readonly IBaseRepository<Subject> _subjectRepository;
    private readonly IBaseRepository<ClassSubject> _classSubjectRepository;
    private readonly SchoolDbContext _context;

    public SubjectService(
            IBaseRepository<Subject> subjectRepository,
            IBaseRepository<ClassSubject> classSubjectRepository,
            SchoolDbContext context)
    {
      _subjectRepository = subjectRepository ;
      _classSubjectRepository = classSubjectRepository ;
      _context = context ;
    }

    public async Task<IEnumerable<Subject>> GetAllSubjectAsync()
        {
            return await _subjectRepository.GetAllAsync();
        }

        public async Task<Subject> GetSubjectByIdAsync(int id)
        {
            return await _subjectRepository.GetByIdAsync(id);
        }

        public async Task<Subject> AddSubjectAsync(Subject Subject)
        {
            await _subjectRepository.AddAsync(Subject);
            return Subject;
        }

        public async Task<Subject> UpdateSubjectAsync(Subject Subject)
        {
            await _subjectRepository.UpdateAsync(Subject);
            return Subject;
        }

        public async Task<Subject> DeleteSubjectAsync(int id)
        {
            var Subject = await _subjectRepository.GetByIdAsync(id);
            if (Subject != null)
            {
                await _subjectRepository.DeleteAsync(id);
            }
            return Subject;
        }
        public async Task<IEnumerable<Subject>> GetSubjectsByClassIdAsync(int classId)
        { 
            var classSubjects = await _classSubjectRepository.GetWhereAsync(cs => cs.ClassId == classId);

            var subjectIds = classSubjects.Select(cs => cs.SubjectId).Distinct().ToList();

            var subjects = await _subjectRepository.GetWhereAsync(s => subjectIds.Contains(s.SubjectId));

            return subjects;
        }
        public async Task<IEnumerable<Subject>> GetSubjectsByClassAndTeacherAsync(int classId, int teacherId)
        {
            var classSubjects = await _classSubjectRepository.GetWhereAsync(cs => cs.ClassId == classId && cs.TeacherId == teacherId);
            var subjectIds = classSubjects.Select(cs => cs.SubjectId).Distinct().ToList();
            var subjects = await _subjectRepository.GetWhereAsync(s => subjectIds.Contains(s.SubjectId));

            return subjects;
        }

    }
}
