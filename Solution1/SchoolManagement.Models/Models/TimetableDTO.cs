using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolManagement.Models.Models
{
  public class TimetableDTO
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
