using AutoMapper;
using WebApi.Dto.Aircraft;
using WebApi.Dto.Location;
using WebApi.Dto.Weather;
using WebApi.Models;

namespace WebApi
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {

            // from model to dto
            CreateMap<Aircraft, GetAircraftDto>()
            .ForMember(
                dest => dest.Type,
                opt => opt.MapFrom(src => src.Type.ToString())
            )
            .ForMember(
                dest => dest.Status,
                opt => opt.MapFrom(src => src.Status.ToString())
            );


            // from model to dto
            CreateMap<AircraftLocation, GetLocationDto>()
            .ForMember(
                dest => dest.Type,
                opt => opt.MapFrom(src => src.Aircraft.Type.ToString())
            );

            // from model to dto
            CreateMap<Weather, GetWeatherDto>()
            .ForMember(
                dest => dest.Last_Update,
                 opt => opt.MapFrom(src => src.Created)
                 )
            .ForMember(
                dest => dest.Wind,
                opt => opt.MapFrom(src => new { Speed = src.WindSpeed, Deg = src.WindDeg })
                );
            // .ForMember(
            //     dest => dest.Wind.speed,
            //     opt => opt.MapFrom(src => src.WindSpeed)
            //     );


            // from dto to model
            CreateMap<PostAircraftDto, Aircraft>();
        }

    }
}