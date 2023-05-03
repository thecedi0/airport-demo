namespace WebApi.Dto.Weather
{
    public class PostWeatherDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = string.Empty;
        public float Temperature { get; set; }
        public float Visibility { get; set; }
        public float WindSpeed { get; set; }
        public float WindDeg { get; set; }
    }
}