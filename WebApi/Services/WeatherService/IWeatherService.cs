using WebApi.Dto.Weather;
using WebApi.Models;

namespace WebApi.Services.WeatherService
{
    public interface IWeatherService
    {
        Task<ServiceResponse<List<Weather>>> GetAllWeather();
        Task<ServiceResponse<Weather>> GetWeatherById(int id);
        Task<ServiceResponse<GetWeatherDto>> GetCurrentWeather();
        Task<ServiceResponse<Weather>> AddWeather(PostWeatherDto model);
    }
}