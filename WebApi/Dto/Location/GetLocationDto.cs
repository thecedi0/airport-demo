using WebApi.Models.Enums;

namespace WebApi.Dto.Location
{
    public class GetLocationDto
    {
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public float Heading { get; set; }

    }
}