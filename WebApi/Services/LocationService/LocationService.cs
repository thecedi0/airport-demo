using AutoMapper;
using WebApi.Data;
using WebApi.Dto.Location;
using WebApi.Models;
using WebApi.Services.AircraftService;

namespace WebApi.Services.LocationService
{
    public class LocationService : ILocationService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IAircraftService _aircraftService;

        public LocationService(IMapper mapper, DataContext context, IAircraftService aircraftService)
        {
            this._mapper = mapper;
            this._context = context;
            this._aircraftService = aircraftService;
        }

        public async Task<ServiceResponse<AircraftLocation>> AddLocation(PutLocationDto model, string callSign)
        {
            var response = new ServiceResponse<AircraftLocation>();
            var data = this._mapper.Map<AircraftLocation>(model);

            // ... get id from callSign
            int aircraftId = Int32.Parse(callSign.Split('.')[0]);


            try
            {
                var getAircraftRes = await this._aircraftService.GetAircraftById(aircraftId);
                if (getAircraftRes.Data is null)
                {
                    throw new Exception("Aircraft not found!");
                }

                data.Aircraft = getAircraftRes.Data;
                var dbRequest = await Task.FromResult(this._context.AircraftLocations.Add(data));
                this._context.SaveChanges();

                response.Data = dbRequest.Entity;

                // throw;

            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }

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

        public async Task<ServiceResponse<List<GetLocationDto>>> GetLocationsByAircraft(int aircraftId)
        {
            var response = new ServiceResponse<List<GetLocationDto>>();
            response.Data = await Task.FromResult(
                this._context.AircraftLocations
                .Where(c => c.Aircraft.Id == aircraftId)
                .Select(c => this._mapper.Map<GetLocationDto>(c))
                .ToList()
                );
            return response;
        }
    }
}