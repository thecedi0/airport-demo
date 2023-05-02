using WebApi.Models;

namespace WebApi.Services.AirportService
{
    public interface IAirportService
    {
        Task<ServiceResponse<List<Airport>>> GetAllAirports();
        Task<ServiceResponse<Airport>> GetAirportById(int id);
        Task<ServiceResponse<Airport>> AddAirport(Airport model);
    }
}