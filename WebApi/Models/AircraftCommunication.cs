using System.ComponentModel.DataAnnotations.Schema;
using WebApi.Models.Enums;

namespace WebApi.Models
{
    public class AircraftCommunication
    {
        public int Id { get; set; }

        public Aircraft Aircraft { get; set; } = new Aircraft();

        public CommunicationIntent Intent { get; set; } = CommunicationIntent.TAKEOFF;

        public bool Response { get; set; } = false;
        public DateTime Created { get; set; } =DateTime.Now;
    }
}