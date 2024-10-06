using Microsoft.EntityFrameworkCore;
using Nobeless.api.Model.Domain;

namespace Nobeless.api.Data
{
    public class NobelessDbContext : DbContext
    {
        public NobelessDbContext(DbContextOptions dbContextOptions): base(dbContextOptions)
        {
            
        }

        public DbSet<User> users { get; set; }
        public DbSet<UserVarification> userVarifications { get; set; }

        public DbSet<Product> products { get; set; }

    }
}
