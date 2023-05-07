using api.Dto.Intent;
using WebApi.Dto.Intent;
using WebApi.Models;

namespace WebApi.Services.CommunicationService
{
    public interface ICommunicationService
    {
        Task<ServiceResponse<List<AircraftCommunication>>> GetAllCommunications();
        Task<ServiceResponse<List<GetLogsDto>>> GetCommunicationsByAircraft(int aircraftId);
        Task<ServiceResponse<AircraftCommunication>> GetCommunicationById(int id);
        Task<ServiceResponse<GetLogsDto>> AircraftRequest(PostIntentDto model, string callSign);
    }
}