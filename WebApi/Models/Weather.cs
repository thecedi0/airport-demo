using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    public class Weather
    {
        public int Id { get; set; }
        // public Airport Airport { get; set; } = new Airport();
        public string Description { get; set; } = string.Empty;
        public float Temperature { get; set; }
        public float Visibility { get; set; }
        public float WindSpeed { get; set; }
        public float WindDeg { get; set; }
        public DateTime Created { get; set; } = DateTime.Now.ToUniversalTime();

    }

}