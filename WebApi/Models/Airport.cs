namespace WebApi.Models
{
    public class Airport
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int RunwayCount { get; set; }
        public int HangerLarge { get; set; } // this number should be configurable in config file
        public int HangerSmall { get; set; } // this number should be configurable in config file
     
    }

}