using GraphQLApi.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace GraphQLApi.Data
{
    public class Context : DbContext
    {
        public Context(DbContextOptions<Context> options) : base(options)
        {
        }
        
        public DbSet<Course> Courses { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Lecture> Lectures { get; set; }
        public DbSet<Rating> Ratings { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Lecture>()
                .HasDiscriminator<string>("Discriminator")
                .HasValue<Subject>("Subject")
                .HasValue<Assignment>("Assignment");

        }
    }
}