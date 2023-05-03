using WebApi.Models.Enums;

namespace WebApi.Dto.Location
{
    public class PutLocationDto
    {
        public string Type { get; set; } = string.Empty;
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public float Heading { get; set; }

    }
}