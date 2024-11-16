using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SchoolManagement.Business.AuthService;
using SchoolManagement.Business.BaseService;
using SchoolManagement.Business.ClassService;
using SchoolManagement.Business.ClassSubjectService;
using SchoolManagement.Business.GradeService;
using SchoolManagement.Business.StudentService;
using SchoolManagement.Business.SubjectService;
using SchoolManagement.Business.TimeTableService;
using SchoolManagement.Business.UserService;
using SchoolManagement.Data;
using SchoolManagement.Data.BaseRepository;
using SchoolManagement.Data.ClassRepository;
using SchoolManagement.Data.ClassSubjectRepository;
using SchoolManagement.Data.GradeRepository;
using SchoolManagement.Data.StudentRepository;
using SchoolManagement.Data.SubjectRepository;
using SchoolManagement.Data.TimeTableRepository;
using SchoolManagement.Data.UserRepository;
using SchoolManagement.Models.Data;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add DbContext:
builder.Services.AddDbContext<SchoolDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Repository
builder.Services.AddScoped(typeof(IBaseRepository<>), typeof(BaseRepository<>));
builder.Services.AddScoped<IClassRepository, ClassRepository>();
builder.Services.AddScoped<IClassSubjectRepository, ClassSubjectRepository>();
builder.Services.AddScoped<IGradeRepository, GradeRepository>();
builder.Services.AddScoped<IStudentRepository, StudentRepository>();
builder.Services.AddScoped<ITimeTableRepository, TimeTableRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ISubjectRepository, SubjectRepository>();

// Add Service
builder.Services.AddScoped(typeof(IBaseService<>), typeof(BaseService<>));
builder.Services.AddScoped<IClassService, ClassService>();
builder.Services.AddScoped<IClassSubjectService, ClassSubjectService>();
builder.Services.AddScoped<IGradeService, GradeService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<ITimetableService, TimeTableService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ISubjectService, SubjectService>();
builder.Services.AddScoped<AuthService>();

// Cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost4200", policy =>
    {
        policy.WithOrigins("http://localhost:4200")  // Địa chỉ frontend Angular
              .AllowAnyMethod()  // Cho phép bất kỳ phương thức HTTP
              .AllowAnyHeader(); // Cho phép bất kỳ header nào
    });
});

// Add services to the container.
builder.Services.AddControllers();

// Thêm Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Đọc JWT settings từ appsettings.json
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var key = Encoding.ASCII.GetBytes(jwtSettings["SecretKey"]);

// Cấu hình dịch vụ Authentication với JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(key)
    };
});

// Cấu hình Authorization
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("admin"));
});

var app = builder.Build();

// Sử dụng CORS trước khi xác thực
app.UseCors("AllowLocalhost4200");  // Thêm CORS vào pipeline của ứng dụng

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
