using Bl.API;
using Dal.API;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.Services
{
    public class BlPaymentServices : IBlPaymentServices
    {
        private readonly IDalPaymentServices _dalPaymentServices;

        public BlPaymentServices(IDalPaymentServices dalPaymentServices)
        {
            _dalPaymentServices = dalPaymentServices;
        }

        public string GetPaymentStatus(string clientId)
        {
            var payment = _dalPaymentServices.GetPaymentById(clientId);
            if (payment.AmountOwed == 0)
            {
                return "You have paid up all sessions.";
            }
            return $"You owe {payment.AmountOwed:C}.";
        }
    }
}
