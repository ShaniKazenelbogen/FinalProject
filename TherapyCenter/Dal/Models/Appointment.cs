
using Dal.models;
using System;
using System.Collections.Generic;

namespace Dal.models;
//namespace Dal.Models;

public partial class Appointment
{
    public int AppointmentId { get; set; }

    public string TherapistId { get; set; } = null!;

    public string ClientId { get; set; } = null!;

    public DateTime Date { get; set; }

    public bool Status { get; set; }

    public MeetingType MeetingType { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }


}

