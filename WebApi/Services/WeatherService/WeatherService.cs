using AutoMapper;
using WebApi.Data;
using WebApi.Dto.Weather;
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

        public async Task<ServiceResponse<Weather>> AddWeather(PostWeatherDto model)
        {
            var response = new ServiceResponse<Weather>();
            var data = await Task.FromResult(this._context.Weathers.Add(this._mapper.Map<Weather>(model)));
            this._context.SaveChanges();

            response.Data = data.Entity;
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

        public async Task<ServiceResponse<GetWeatherDto>> GetCurrentWeather()
        {
            var response = new ServiceResponse<GetWeatherDto>();
            var c = this._context.Weathers.Count();
            if (c > 0)
            {
                response.Data = await Task.FromResult(this._mapper.Map<GetWeatherDto>(this._context.Weathers.OrderByDescending(x => x.Id).FirstOrDefault()));
            }
            return response;
        }
    }
}