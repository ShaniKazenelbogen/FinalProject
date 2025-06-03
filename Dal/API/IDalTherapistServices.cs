using Dal.models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.API
{
    public interface IDalTherapistServices
    {
        /// Therapist Gets all appointments for a specific date
        List<Appointment> GetAppointmentsForDate(DateTime date);
        //
        List<object> GetUpcomingClients();
        //
    }
}
