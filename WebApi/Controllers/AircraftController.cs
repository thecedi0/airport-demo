using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Dto.Aircraft;
using WebApi.Models;
using WebApi.Services.AircraftService;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AircraftController : ControllerBase
    {
        private readonly IAircraftService _service;
        public AircraftController(IAircraftService service)
        {
            this._service = service;
        }

        [HttpGet()]
        public async Task<ActionResult<List<GetAircraftDto>>> GetAll()
        {
            var r = await this._service.GetAllAircrafts();
            return Ok(r.Data);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Aircraft>> GetSingle(int id)
        {
            var data = await this._service.GetAircraftById(id);

            if (data.Data is null)
                return NotFound();


            return Ok(data.Data);

        }


        [HttpPost]
        public async Task<ActionResult<Aircraft>> AddAircraft(PostAircraftDto model)
        {
            var r = await this._service.AddAircraft(model);
            return Ok(r.Data);
        }


        [HttpPut("{id:int}")]
        public async Task<ActionResult<Aircraft>> UpdateAircraft(PostAircraftDto model)
        {
            var r = await this._service.UpdateAircraft(model);
            if (!r.Success)
            {
                return NotFound();
            }

            return Ok(r.Data);
        }

    }
}