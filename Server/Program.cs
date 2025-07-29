using Bl;
using Dal;
using Bl.Services;
using Dal.Services;
using Dal.models;
using Microsoft.AspNetCore.Builder;
using Bl.API;
using Dal.API;






var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IBlManager, BlManager>();
builder.Services.AddScoped<Dal.models.dbClass>();
builder.Services.AddScoped<IDalClientServices, DalClientServices>();
builder.Services.AddScoped<IBlClientServices, BlClientServices>();

var app = builder.Build();



if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
