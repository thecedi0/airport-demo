using AutoMapper;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Services.AircraftService
{
    public class AircraftService : IAircraftService
    {

        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public AircraftService(IMapper mapper, DataContext context)
        {   
            this._mapper = mapper;
            this._context = context;
        }
        public async Task<ServiceResponse<Aircraft>> AddAircraft(Aircraft model)
        {
            var response = new ServiceResponse<Aircraft>();
            var data = await Task.FromResult(this._context.Aircrafts.Add(model));
            this._context.SaveChanges();

            response.Data = data.Entity;
            return response;
        }

        public async Task<ServiceResponse<Aircraft>> GetAircraftById(int id)
        {
            var response = new ServiceResponse<Aircraft>();
            response.Data = await Task.FromResult(this._context.Aircrafts.Find(id));
            return response;
        }

        public async Task<ServiceResponse<List<Aircraft>>> GetAllAircrafts()
        {
            var response = new ServiceResponse<List<Aircraft>>();
            response.Data = await Task.FromResult(this._context.Aircrafts.ToList());
            return response;
        }

        public async Task<ServiceResponse<Aircraft>> UpdateAircraft(Aircraft model)
        {
            var response = new ServiceResponse<Aircraft>();

            try
            {

                var aircraft = await Task.FromResult(this._context.Aircrafts.FirstOrDefault(c => c.Id == model.Id));
                if (aircraft is null)
                    throw new Exception($"Aircraft with Id '{model.Id}' not found.");

                aircraft.Name = model.Name;
                aircraft.Type = model.Type;



                response.Data = await Task.FromResult(this._context.Aircrafts.Update(aircraft).Entity);
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