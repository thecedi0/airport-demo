using WebApi.Models;

namespace WebApi.Services.WeatherService
{
    public interface IWeatherService
    {
        Task<ServiceResponse<List<Weather>>> GetAllWeather();
        Task<ServiceResponse<Weather>> GetWeatherById(int id);
        Task<ServiceResponse<Weather>> GetCurrentWeather();
        Task<ServiceResponse<Weather>> AddWeather(Weather model);
    }
}