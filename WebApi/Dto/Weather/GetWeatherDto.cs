namespace WebApi.Dto.Weather
{
    public class GetWeatherDto
    {
        public string Description { get; set; } = string.Empty;
        public float Temperature { get; set; }
        public float Visibility { get; set; }
        public object Wind { get; set; } = new { Speed = 4.9f, Deg = 220.0f };
        public DateTime Last_Update { get; set; } = DateTime.Now;
    }



}