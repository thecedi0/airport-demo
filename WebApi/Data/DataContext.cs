using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            // Database.EnsureDeleted();
            // Database.EnsureCreated();
            // Database.Migrate();
        }
        public DbSet<Aircraft> Aircrafts => Set<Aircraft>();
        public DbSet<Airport> Airports => Set<Airport>();
        public DbSet<AircraftLocation> AircraftLocations => Set<AircraftLocation>();
        public DbSet<AircraftCommunication> AircraftCommunications => Set<AircraftCommunication>();
        public DbSet<Weather> Weathers => Set<Weather>();
        public DbSet<Group> Groups => Set<Group>();
        public DbSet<GroupType> GroupTypes => Set<GroupType>();
    }
}