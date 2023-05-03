using WebApi.Models;
using WebApi.Models.Enums;

namespace WebApi.Services
{
    public class TowerAI
    {
        private readonly IConfiguration _configuration;

        private Aircraft[] _smallHanger = Array.Empty<Aircraft>();
        private Aircraft[] _largeHanger = Array.Empty<Aircraft>();
        private Aircraft[] _runWay = Array.Empty<Aircraft>();
        public TowerAI(IConfiguration configuration)
        {
            this._configuration = configuration;
        }


        public bool RunwayAccessible(Aircraft aircraft)
        {
            int runWays = this._configuration.GetValue<int>("AppSettings:NumberOfRunWay");
            return this._ResolveCapacity(runWays, this._runWay, aircraft);
        }

        public bool HangerAccessible(Aircraft aircraft)
        {
            var number = this._configuration.GetValue<int>("AppSettings:LargeHangerCapacity");
            if (aircraft.Type == AircraftType.AIRLINER)
            {
                return this._ResolveCapacity(number, this._largeHanger, aircraft);
            }

            number = this._configuration.GetValue<int>("AppSettings:SmallHangerCapacity");
            return this._ResolveCapacity(number, this._largeHanger, aircraft);

        }

        private bool _ResolveCapacity(int max, Aircraft[] volume, Aircraft aircraft)
        {
            if (max < volume.Length)
            {
                volume.Append(aircraft);
                return true;
            }

            return false;
        }
    }


}