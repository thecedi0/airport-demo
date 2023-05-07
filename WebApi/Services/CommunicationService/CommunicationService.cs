using api.Dto.Intent;
using AutoMapper;
using WebApi.Controllers;
using WebApi.Data;
using WebApi.Dto.Aircraft;
using WebApi.Dto.Intent;
using WebApi.Models;
using WebApi.Models.Enums;
using WebApi.Services.AircraftService;

namespace WebApi.Services.CommunicationService
{
    public class CommunicationService : ICommunicationService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IAircraftService _aircraftService;
        private readonly TowerAI _towerAI;

        public CommunicationService(
            IMapper mapper,
            DataContext context,
            IAircraftService aircraftService,
            TowerAI towerAI
            )
        {
            this._mapper = mapper;
            this._context = context;
            this._aircraftService = aircraftService;
            this._towerAI = towerAI;

        }
        public async Task<ServiceResponse<GetLogsDto>> AircraftRequest(PostIntentDto model, string callSign)
        {
            var response = new ServiceResponse<GetLogsDto>();
            var data = new AircraftCommunication();

            data.Intent = model.State == "LAND" ? CommunicationIntent.LAND : CommunicationIntent.TAKEOFF;

            // Console.WriteLine("spy callSign --> " + callSign);


            // ... get id from callSign
            int aircraftId = Int32.Parse(callSign.Split('.')[0]);
            Console.WriteLine(aircraftId);


            try
            {
                var getAircraftRes = await this._aircraftService.GetAircraftById(aircraftId);
                if (getAircraftRes.Data is null)
                {
                    throw new Exception("Aircraft not found!");
                }

                data.Aircraft = getAircraftRes.Data;
                data.Response = this._towerAI.RunwayAccessible(data.Aircraft);
                data.hasResponsed = true;
                data.Created = DateTime.Now.ToUniversalTime();

                // udapte state of craft
                if (data.Response)
                {
                    data.Aircraft.Status = model.State == "LAND" ? AircraftStatus.LANDED : AircraftStatus.AIRBORNE;
                    _ = await this._aircraftService.UpdateAircraftState(data.Aircraft);

                }

                if (data.Aircraft.Status == AircraftStatus.AIRBORNE)
                {
                    this._towerAI.ReleaseRunway(data.Aircraft);
                }

                var dbRequest = await Task.FromResult(this._context.AircraftCommunications.Add(data));
                this._context.SaveChanges();
                var com = dbRequest.Entity;
                com.Aircraft.Communications = null;
                com.Aircraft.Locations = null;
                response.Data = _mapper.Map<GetLogsDto>(dbRequest.Entity);
                //Console.Write(response.Data);
                // throw;

            }
            catch (Exception ex)
            {
                response.Success = false;
                response.Message = ex.Message;
            }



            return response;
        }

        public async Task<ServiceResponse<List<AircraftCommunication>>> GetAllCommunications()
        {
            var response = new ServiceResponse<List<AircraftCommunication>>();
            response.Data = await Task.FromResult(this._context.AircraftCommunications.ToList());
            return response;
        }

        public async Task<ServiceResponse<AircraftCommunication>> GetCommunicationById(int id)
        {
            var response = new ServiceResponse<AircraftCommunication>();
            response.Data = await Task.FromResult(this._context.AircraftCommunications.Find(id));
            return response;
        }

        public async Task<ServiceResponse<List<GetLogsDto>>> GetCommunicationsByAircraft(int aircraftId)
        {
            var response = new ServiceResponse<List<GetLogsDto>>();
            response.Data = await Task.FromResult(
                this._context.AircraftCommunications
                .Where(c => c.Aircraft.Id == aircraftId)
                .OrderByDescending(c => c.Id)
                .Select(c => _mapper.Map<GetLogsDto>(c))
                .ToList()
                );
            return response;
        }
    }
}