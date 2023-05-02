using WebApi.Models;

namespace WebApi.Services.CommunicationService
{
    public interface ICommunicationService
    {
        Task<ServiceResponse<List<AircraftCommunication>>> GetAllCommunications();
        Task<ServiceResponse<List<AircraftCommunication>>> GetCommunicationsByAircraft(int aircraftId);
        Task<ServiceResponse<AircraftCommunication>> GetCommunicationById(int id);
        Task<ServiceResponse<AircraftCommunication>> AddCommunication(AircraftCommunication model);
    }
}