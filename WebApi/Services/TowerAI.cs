using WebApi.Models;
using WebApi.Models.Enums;

namespace WebApi.Services
{
    public class TowerAI
    {
        private readonly IConfiguration _configuration;

        private readonly List<Aircraft> _smallHanger = new List<Aircraft>();
        private readonly List<Aircraft> _largeHanger = new List<Aircraft>();
        private readonly List<Aircraft> _runWay = new List<Aircraft>();
        public TowerAI(IConfiguration configuration)
        {
            this._configuration = configuration;
        }


        public bool RunwayAccessible(Aircraft aircraft)
        {
            int runWays = this._configuration.GetValue<int>("AppSettings:NumberOfRunWay");
            var r = this._ResolveCapacity(runWays, this._runWay, aircraft);

            if (r)
            {
                this._autoRemoveAircraft(aircraft.Type == AircraftType.AIRLINER ? this._largeHanger : this._smallHanger, aircraft);
            }

            return r;
        }

        public bool HangerAccessible(Aircraft aircraft)
        {
            var number = this._configuration.GetValue<int>("AppSettings:LargeHangerCapacity");
            if (aircraft.Type == AircraftType.AIRLINER)
            {
                var l = this._ResolveCapacity(number, this._largeHanger, aircraft);
                if (l)
                {
                    this._autoRemoveAircraft(this._runWay, aircraft);
                }
                return l;
            }

            number = this._configuration.GetValue<int>("AppSettings:SmallHangerCapacity");
            var r = this._ResolveCapacity(number, this._smallHanger, aircraft);
            if (r)
            {
                this._autoRemoveAircraft(this._runWay, aircraft);
            }
            return r;

        }

        public void ReleaseRunway(Aircraft aircraft)
        {
            var ar = this._runWay.FirstOrDefault(x => x.Id == aircraft.Id);
            if (ar != null)
            {
                this._runWay.Remove(ar);
            }
        }


        private void _autoRemoveAircraft(List<Aircraft> vol, Aircraft aircraft)
        {
            var ar = vol.FirstOrDefault(x => x == aircraft);

            if (ar != null)
            {
                // remove ar from runway
                vol.Remove(ar);
            }
        }


        private bool _ResolveCapacity(int max, List<Aircraft> volume, Aircraft aircraft)
        {
            if (volume.Count < max)
            {
                volume.Add(aircraft);
                return true;
            }

            return false;
        }
    }


}