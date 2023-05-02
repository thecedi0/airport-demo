using AutoMapper;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Services.WeatherService
{
    public class WeatherService : IWeatherService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public WeatherService(IMapper mapper, DataContext context)
        {
            this._mapper = mapper;
            this._context = context;
        }

        public async Task<ServiceResponse<Weather>> AddWeather(Weather model)
        {
            var response = new ServiceResponse<Weather>();
            response.Data = await Task.FromResult(this._context.Weathers.Add(model).Entity);
            return response;
        }

        public async Task<ServiceResponse<List<Weather>>> GetAllWeather()
        {
            var response = new ServiceResponse<List<Weather>>();
            response.Data = await Task.FromResult(this._context.Weathers.ToList());
            return response;
        }

        public async Task<ServiceResponse<Weather>> GetWeatherById(int id)
        {
            var response = new ServiceResponse<Weather>();
            response.Data = await Task.FromResult(this._context.Weathers.Find(id));
            return response;
        }

        public async Task<ServiceResponse<Weather>> GetCurrentWeather()
        {
            var response = new ServiceResponse<Weather>();
            response.Data = await Task.FromResult(this._context.Weathers.Last());
            return response;
        }
    }
}