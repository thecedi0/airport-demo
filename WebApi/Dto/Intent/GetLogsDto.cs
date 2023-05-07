using WebApi.Models.Enums;
using WebApi.Models;
using WebApi.Dto.Aircraft;

namespace api.Dto.Intent
{
    public class GetLogsDto
    {
        public int Id { get; set; }

        public GetAircraftDto Aircraft { get; set; } = new GetAircraftDto();

        public string Intent { get; set; } = string.Empty;

        public bool Response { get; set; } = false;
        public bool hasResponsed { get; set; } = false;
        public DateTime Created { get; set; }
    }
}
