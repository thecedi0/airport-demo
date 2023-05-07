using AutoMapper;
using WebApi.Data;
using WebApi.Dto.Aircraft;
using WebApi.Models;
using WebApi.Models.Enums;

namespace WebApi.Services.AircraftService
{
    public class AircraftService : IAircraftService
    {

        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly TowerAI _towerAi;

        public AircraftService(IMapper mapper, DataContext context, TowerAI towerAi)
        {
            this._mapper = mapper;
            this._context = context;
            this._towerAi = towerAi;
        }
        public async Task<ServiceResponse<Aircraft>> AddAircraft(PostAircraftDto model)
        {

            var response = new ServiceResponse<Aircraft>();
            var data = await Task.FromResult(this._context.Aircrafts.Add(this._mapper.Map<Aircraft>(model)));
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

        public async Task<ServiceResponse<List<GetAircraftDto>>> GetAllAircrafts()
        {
            var response = new ServiceResponse<List<GetAircraftDto>>();
            response.Data = await Task.FromResult(
                this._context.Aircrafts.Select(a => this._mapper.Map<GetAircraftDto>(a)).ToList()
                );
            return response;
        }

        public async Task<ServiceResponse<Aircraft>> UpdateAircraft(PostAircraftDto model)
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
        public async Task<ServiceResponse<Aircraft>> UpdateAircraftState(Aircraft model)
        {
            var response = new ServiceResponse<Aircraft>();

            try
            {

                var aircraft = await Task.FromResult(this._context.Aircrafts.FirstOrDefault(c => c.Id == model.Id));
                if (aircraft is null)
                    throw new Exception($"Aircraft with Id '{model.Id}' not found.");


                aircraft.Status = model.Status;


                var dd = await Task.FromResult(this._context.Aircrafts.Update(aircraft).Entity);
                response.Data = dd;
            }
            catch (Exception ex)
            {

                response.Success = false;
                response.Message = ex.Message;
            }


            return response;
        }

        public async Task<ServiceResponse<GetAircraftDto>> ParkAircraft(int id)
        {
            var response = new ServiceResponse<GetAircraftDto>();

            try
            {

                var aircraft = await Task.FromResult(this._context.Aircrafts.FirstOrDefault(c => c.Id == id));
                if (aircraft is null)
                    throw new Exception($"Aircraft with Id '{id}' not found.");


                aircraft.Status = AircraftStatus.PARKED;



                var dd = await Task.FromResult(this._mapper.Map<GetAircraftDto>(this._context.Aircrafts.Update(aircraft).Entity));
                this._context.SaveChanges();

                this._towerAi.ReleaseRunway(aircraft);


                response.Data = dd;

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