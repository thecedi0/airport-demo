using AutoMapper;
using WebApi.Dto.Location;
using WebApi.Models;

namespace WebApi
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<AircraftLocation, GetLocationDto>();
        }

    }
}