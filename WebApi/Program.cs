using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Services.AircraftService;
using WebApi.Services.AirportService;
using WebApi.Services.CommunicationService;
using WebApi.Services.LocationService;
using WebApi.Services.WeatherService;

var builder = WebApplication.CreateBuilder(args);

// database connection
builder.Services.AddDbContext<DataContext>(opt =>
opt.UseNpgsql(builder.Configuration.GetConnectionString("PostgresConnection"))
);

// Add services to the container.

builder.Services.AddControllers();

// Add Auto Mapper for DTOs
builder.Services.AddAutoMapper(typeof(Program).Assembly);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IAircraftService, AircraftService>();
builder.Services.AddScoped<ILocationService, LocationService>();
builder.Services.AddScoped<ICommunicationService, CommunicationService>();
builder.Services.AddScoped<IAirportService, AirportService>();
builder.Services.AddScoped<IWeatherService, WeatherService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
