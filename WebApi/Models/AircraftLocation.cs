using System.ComponentModel.DataAnnotations.Schema;

namespace WebApi.Models
{
    public class AircraftLocation
    {
        public int Id { get; set; }
        public Aircraft Aircraft { get; set; } = new Aircraft();
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public float Heading { get; set; }
        public DateTime Created { get; set; }=DateTime.Now;


    }

}