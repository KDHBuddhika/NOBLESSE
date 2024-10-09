using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Internal;
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

        public DbSet<Products> products { get; set; }

        public DbSet<Categories> categories { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Categories>()
                 .HasMany(c => c.Products)
                 .WithOne(p => p.Category)
                 .HasForeignKey(p => p.CategoryId);

            // Example: Configure one-to-many relationship between User and Product
            modelBuilder.Entity<User>()
                .HasMany(u => u.Products)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId);
        }




    }
}
