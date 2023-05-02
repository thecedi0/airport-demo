using AutoMapper;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Services.LocationService
{
    public class LocationService : ILocationService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public LocationService(IMapper mapper, DataContext context)
        {
            this._mapper = mapper;
            this._context = context;
        }

        public async Task<ServiceResponse<AircraftLocation>> AddLocation(AircraftLocation model)
        {
            var response = new ServiceResponse<AircraftLocation>();
            response.Data = await Task.FromResult(this._context.AircraftLocations.Add(model).Entity);
            return response;
        }

        public async Task<ServiceResponse<List<AircraftLocation>>> GetAllLocations()
        {
            var response = new ServiceResponse<List<AircraftLocation>>();
            response.Data = await Task.FromResult(this._context.AircraftLocations.ToList());
            return response;
        }

        public async Task<ServiceResponse<AircraftLocation>> GetLocationById(int id)
        {
            var response = new ServiceResponse<AircraftLocation>();
            response.Data = await Task.FromResult(this._context.AircraftLocations.Find(id));
            return response;
        }

        public async Task<ServiceResponse<List<AircraftLocation>>> GetLocationsByAircraft(int aircraftId)
        {
            var response = new ServiceResponse<List<AircraftLocation>>();
            response.Data = await Task.FromResult(this._context.AircraftLocations.Where(c => c.Aircraft.Id == aircraftId).ToList());
            return response;
        }
    }
}