using Bl;
using Bl.API;
using Bl.Services;
using Dal.API;
using Dal.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddScoped<IDalClientServices, DalClientServices>();
builder.Services.AddScoped<IBlManager, BlManager>();
builder.Services.AddScoped<IBlClientServices, BlClientServices>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build(); // Configure middleware

app.UseHttpsRedirection();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();
app.Run();
