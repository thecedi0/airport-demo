using AutoMapper;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Services.AirportService
{
    public class AirportService : IAirportService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public AirportService(IMapper mapper, DataContext context)
        {
            this._mapper = mapper;
            this._context = context;
        }
        public async Task<ServiceResponse<Airport>> AddAirport(Airport model)
        {
            var response = new ServiceResponse<Airport>();
            response.Data = await Task.FromResult(this._context.Airports.Add(model).Entity);
            return response;
        }

        public async Task<ServiceResponse<Airport>> GetAirportById(int id)
        {
            var response = new ServiceResponse<Airport>();
            response.Data = await Task.FromResult(this._context.Airports.Find(id));
            return response;
        }

        public async Task<ServiceResponse<List<Airport>>> GetAllAirports()
        {
            var response = new ServiceResponse<List<Airport>>();
            // var dbAirports = await _context.Airports.ToLis
            response.Data = await Task.FromResult(this._context.Airports.ToList());
            return response;
        }


        public async Task<ServiceResponse<Airport>> UpdateAirport(Airport model)
        {
            var response = new ServiceResponse<Airport>();

            try
            {

                var airport = this._context.Airports.FirstOrDefault(c => c.Id == model.Id);
                if (airport is null)
                    throw new Exception($"Airport with Id '{model.Id}' not found.");

                airport.Name = model.Name;
                airport.RunwayCount = model.RunwayCount;
                airport.HangerLarge = model.HangerLarge;
                airport.HangerSmall = model.RunwayCount;



                response.Data = await Task.FromResult(this._context.Airports.Update(airport).Entity);
            }
            catch (Exception ex)
            {

                response.Success = false;
                response.Message = ex.Message;
            }


            return response;
        }
    }
}