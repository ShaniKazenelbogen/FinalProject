using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API
{
    public interface IBlPaymentServices
    {


        string GetPaymentStatus(string clientId);
    }
}
