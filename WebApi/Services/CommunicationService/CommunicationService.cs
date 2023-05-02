using AutoMapper;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Services.CommunicationService
{
    public class CommunicationService : ICommunicationService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public CommunicationService(IMapper mapper, DataContext context)
        {
            this._mapper = mapper;
            this._context = context;
        }
        public async Task<ServiceResponse<AircraftCommunication>> AddCommunication(AircraftCommunication model)
        {
            var response = new ServiceResponse<AircraftCommunication>();
            response.Data = await Task.FromResult(this._context.AircraftCommunications.Add(model).Entity);
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

        public async Task<ServiceResponse<List<AircraftCommunication>>> GetCommunicationsByAircraft(int aircraftId)
        {
            var response = new ServiceResponse<List<AircraftCommunication>>();
            response.Data = await Task.FromResult(this._context.AircraftCommunications.Where(c => c.Aircraft.Id == aircraftId).ToList());
            return response;
        }
    }
}