
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddSingleton<IMongoClient>(sp =>
{
    var connectionString = builder.Configuration.GetConnectionString("MongoDb");
    return new MongoClient(connectionString);
});

builder.Services.AddControllers();
var app = builder.Build();

app.UseCors("MyCorsPolicy");

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();



