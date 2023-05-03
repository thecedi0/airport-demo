using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Models.Enums;

namespace WebApi.Models
{
    public class Aircraft
    {
        public int Id { get; set; }
        public string Name { get; set; } = "SpaceX 86";
        public AircraftStatus Status { get; set; } = AircraftStatus.PARKED;

        // [ForeignKey("Type")]
        // public int TypeId { get; set; }
        public AircraftType Type { get; set; } = AircraftType.AIRLINER;

        public DateTime Created { get; set; }

        public ICollection<AircraftCommunication>? Communications { get; set; }
        public ICollection<AircraftLocation>? Locations { get; set; }


    }

}