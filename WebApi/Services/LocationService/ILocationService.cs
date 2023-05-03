using WebApi.Dto.Location;
using WebApi.Models;

namespace WebApi.Services.LocationService
{
    public interface ILocationService
    {
        Task<ServiceResponse<List<AircraftLocation>>> GetAllLocations();
        Task<ServiceResponse<List<GetLocationDto>>> GetLocationsByAircraft(int aircraftId);
        Task<ServiceResponse<AircraftLocation>> GetLocationById(int id);
        Task<ServiceResponse<AircraftLocation>> AddLocation(PutLocationDto model, string callSign);

    }
}