using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.models
{
    public class BlPayment
    {
        public int PaymentId { get; set; }
        public string ClientId { get; set; } = null!;
        public decimal TotalCostOfSessions { get; set; }
        public decimal AmountPaid { get; set; }
        public DateTime LastPaymentDate { get; set; }
        public PaymentMethod PaymentMethod { get; set; } 
        public decimal AmountOwed => TotalCostOfSessions - AmountPaid;
        public string GetPaymentStatus()
        {
            if (AmountOwed == 0 && AmountPaid == 0)
            {
                return "You've never been yet.";//never started yet.
            }
            else if (AmountOwed<= 0)
            {
                return "Fully paid.";
                
            }
            else
            {
                return $"Outstanding balance: {AmountOwed:C}.";
            }
        }

    }
}
