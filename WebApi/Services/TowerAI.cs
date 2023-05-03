using WebApi.Models;
using WebApi.Models.Enums;

namespace WebApi.Services
{
    public class TowerAI
    {
        public IConfiguration _configuration { get; }

        private Aircraft[] _smallHanger;
        private Aircraft[] _largeHanger;
        private Aircraft[] _runWay;
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
            if (aircraft.Type == AircraftType.AIRLINES)
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