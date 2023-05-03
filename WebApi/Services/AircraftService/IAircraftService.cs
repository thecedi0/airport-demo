using WebApi.Dto.Aircraft;
using WebApi.Models;

namespace WebApi.Services.AircraftService
{
    public interface IAircraftService
    {
        Task<ServiceResponse<List<GetAircraftDto>>> GetAllAircrafts();
        Task<ServiceResponse<Aircraft>> GetAircraftById(int id);
        Task<ServiceResponse<Aircraft>> AddAircraft(PostAircraftDto model);

        Task<ServiceResponse<Aircraft>> UpdateAircraft(PostAircraftDto model);
    }
}