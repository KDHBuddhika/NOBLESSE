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

        public DbSet<Auction> auctions { get; set; }

        public DbSet<Bid> Bids { get; set; }

        public DbSet<Contact> contacts { get; set; }

        public DbSet<QuestionAnswer> QuestionAnswers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Categories>()
                 .HasMany(c => c.Products)
                 .WithOne(p => p.Category)
                 .HasForeignKey(p => p.CategoryId);

           
            modelBuilder.Entity<User>()
                .HasMany(u => u.Products)
                .WithOne(p => p.User)
                .HasForeignKey(p => p.UserId);

            modelBuilder.Entity<Products>()
                .HasOne(e => e.Auctions)
                .WithOne(e => e.Product)
                .HasForeignKey<Auction>(e => e.ProductId)
                .IsRequired();


            modelBuilder.Entity<Auction>()
                .HasMany(e => e.Users)
                .WithMany(e => e.Auctions)
                .UsingEntity<Bid>(
                   l => l.HasOne<User>(e => e.User).WithMany(e=> e.Bids).HasForeignKey(e => e.UserId).OnDelete(DeleteBehavior.Restrict),
                   l => l.HasOne<Auction>(e =>e.Auction).WithMany(e => e.Bids).HasForeignKey(e => e.AuctionId).OnDelete(DeleteBehavior.Restrict)
                );

        }




    }
}
