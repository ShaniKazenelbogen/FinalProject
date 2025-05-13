using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Services
{
    public class DalTherapistServices
    {
        private bool IsTherapistLoggedIn()
        {
            if (Therapist.FirstName != null && therapist.HasValidSession)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
