using WebApi.Models;

namespace WebApi.Services.AircraftService
{
    public interface IAircraftService
    {
        Task<ServiceResponse<List<Aircraft>>> GetAllAircrafts();
        Task<ServiceResponse<Aircraft>> GetAircraftById(int id);
        Task<ServiceResponse<Aircraft>> AddAircraft(Aircraft model);

        Task<ServiceResponse<Aircraft>> UpdateAircraft(Aircraft model);
    }
}