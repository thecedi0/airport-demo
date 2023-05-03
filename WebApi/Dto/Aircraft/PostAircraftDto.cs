using WebApi.Models.Enums;

namespace WebApi.Dto.Aircraft
{
    public class PostAircraftDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public AircraftType Type { get; set; }
    }
}