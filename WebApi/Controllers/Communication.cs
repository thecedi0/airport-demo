namespace WebApi.Controllers
{

    using Microsoft.AspNetCore.Mvc;
    using WebApi.Dto.Intent;
    using WebApi.Models;
    using WebApi.Services.CommunicationService;

    [Route("api/public/[controller]")]
    [ApiController]
    public class CommunicationController : ControllerBase
    {
        private readonly ICommunicationService _service;

        public CommunicationController(ICommunicationService service)
        {
            this._service = service;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<List<api.Dto.Intent.GetLogsDto>>> GetAircraftLogs(int id)
        {

            var r = await this._service.GetCommunicationsByAircraft(id);
            return Ok(r.Data);
        }

        [HttpPost("/api/{call_sign}/intent")]
        public async Task<ActionResult<api.Dto.Intent.GetLogsDto>> AddAircraftLocation(PostIntentDto model, [FromRoute] string call_sign)
        {
            var r = await this._service.AircraftRequest(model, call_sign);
            return Ok(r.Data);
        }
    }
}