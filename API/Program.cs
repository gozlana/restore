using System.Text.Json.Serialization;
using API.Data;
using API.Entities;
using API.Middleware;
using API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services
    .AddControllers()
    .AddJsonOptions(x =>
    {
      x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddDbContext<StoreContext>(opt =>
{
  opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddScoped<PaymentsService>();
builder.Services.AddIdentityApiEndpoints<User>(opt =>
{
  opt.User.RequireUniqueEmail = true;
})
  .AddRoles<IdentityRole>()
  .AddEntityFrameworkStores<StoreContext>();

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();
//Configure HTTP request pipeline
app.UseCors(opt =>
{
  opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3000");
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>(); //api/login

await DbInitializer.InitDb(app);

app.Run();
