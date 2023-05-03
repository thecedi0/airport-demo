namespace WebApi.Controllers
{

    using Microsoft.AspNetCore.Mvc;
    using WebApi.Data;
    using WebApi.Dto.Weather;
    using WebApi.Models;
    using WebApi.Services.WeatherService;

    [Area("public")]
    [Route("api/[area]/[controller]")]
    [ApiController]
    public class WeatherController : ControllerBase
    {

        private readonly IWeatherService _service;
        public WeatherController(IWeatherService service)
        {
            this._service = service;
        }

        [HttpGet()]
        public async Task<ActionResult<List<Weather>>> GetAll()
        {

            var r = await this._service.GetAllWeather();
            return Ok(r.Data);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Weather>> GetSingle(int id)
        {
            var r = await this._service.GetWeatherById(id);

            if (r.Data is null)
            {
                return NotFound();
            }

            return Ok(r.Data);

        }


        [HttpGet("/api/[area]/{call_sign}/[controller]")]
        public async Task<ActionResult<List<GetWeatherDto>>> GetCurrentWeather()
        {

            var r = await this._service.GetCurrentWeather();
            if (r.Data is null)
            {
                return NotFound();
            }

            return Ok(r.Data);
        }


        [HttpPost]
        public async Task<ActionResult<Weather>> AddWeather(Weather model)
        {
            var r = await this._service.AddWeather(model);

            return Ok(r.Data);
        }
    }
}