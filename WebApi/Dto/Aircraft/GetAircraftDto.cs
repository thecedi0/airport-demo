namespace WebApi.Dto.Aircraft
{
    public class GetAircraftDto
    {

        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string CallSign { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;

    }
}