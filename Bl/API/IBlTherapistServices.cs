using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bl.API
{
    public interface IBlTherapistServices
    {
        /// Therapist Gets all appointments for a specific date
        List<Appointment> GetAllAppointmentsForTheSpecificDate(DateTime date);
        //
        List<object> GetClientsForTodayAndTomorrow();
        //
    }
}
