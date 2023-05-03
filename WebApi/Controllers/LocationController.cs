using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Dto.Location;
using WebApi.Models;
using WebApi.Services.LocationService;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/{call_sign}/[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _service;
        public LocationController(ILocationService service)
        {
            this._service = service;
        }

        [HttpGet()]
        public async Task<ActionResult<List<GetLocationDto>>> GetAll()
        {
            var r = await this._service.GetLocationsByAircraft(1);
            return Ok(r.Data);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<AircraftLocation>> GetSingle(int id)
        {
            var r = await this._service.GetLocationById(id);

            if (r is null)
            {
                return NotFound();
            }

            return Ok(r.Data);
        }


        [HttpPost]
        public async Task<ActionResult<AircraftLocation>> AddAircraftLocation(AircraftLocation model)
        {
            var r = await this._service.AddLocation(model);
            return Ok(r.Data);
        }
    }
}