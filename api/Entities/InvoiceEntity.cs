using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace api.Entites
{
    public enum InvoiceStatusEnum
    {
        DRAFT,
        PAID,
        UNPAID,
        PARTIAL,
        VOID
    }
    [Table("invoices")]
    public class Invoice
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string InvoiceNumber { get; set; } = string.Empty;

        [Required]
        public string CustomerName { get; set; } = string.Empty;

        [Column(TypeName = "decimal(10, 2)")]
        public decimal TotalAmount { get; set; }

        public InvoiceStatusEnum Status { get; set; } = InvoiceStatusEnum.Draft;

        [Column(TypeName = "jsonb")]
        public JsonDocument? SnapshotData { get; set; }

        public DateTime? IssuedAt { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime UpdatedAt { get; set; }

        public DateTime? DeletedAt { get; set; }



        // [Required]
        // public string BusinessId { get; set; } = string.Empty;
        // [ForeignKey(nameof(BusinessId))]
        // public Business? Business { get; set; }
        // public ICollection<Income> Payments { get; set; } = new List<Income>();
        // public ICollection<Expense> JobExpenses { get; set; } = new List<Expense>();
    }
}