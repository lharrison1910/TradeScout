using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using api.Entities;

namespace api.Data
{
    public class TradeScoutContext : DbContext
    {
        public TradeScoutContext(DbContextOptions<TradeScoutContext> options) : base(options)
        {
        }

        // --- 1. Your Tables (DbSets) ---
        public DbSet<Invoice> Invoices { get; set; }

        // You will also need DbSets for your related entities
        public DbSet<Business> Businesses { get; set; }
        public DbSet<Income> Incomes { get; set; }
        public DbSet<Expense> Expenses { get; set; }

        // --- 2. Database Configuration (Fluent API) ---
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Save the Invoice Status enum as a string in PostgreSQL (e.g., "Draft") 
            // instead of an integer (0, 1, 2)
            modelBuilder.Entity<Invoice>()
                .Property(i => i.Status)
                .HasConversion<string>();

            // Global Query Filter: Automatically hide soft-deleted invoices from all queries
            modelBuilder.Entity<Invoice>()
                .HasQueryFilter(i => i.DeletedAt == null);
        }

        // --- 3. Auto-Updating Timestamps ---
        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            // Find all entities being tracked that are Invoices and are either newly Added or Modified
            var entries = ChangeTracker.Entries()
                .Where(e => e.Entity is Invoice &&
                           (e.State == EntityState.Added || e.State == EntityState.Modified));

            foreach (var entityEntry in entries)
            {
                var entity = (Invoice)entityEntry.Entity;

                // Always update the UpdatedAt timestamp when a change happens
                entity.UpdatedAt = DateTime.UtcNow;

                // Only set the CreatedAt timestamp if this is a brand new record
                if (entityEntry.State == EntityState.Added)
                {
                    entity.CreatedAt = DateTime.UtcNow;
                }
            }

            return base.SaveChangesAsync(cancellationToken);
        }
    }
}