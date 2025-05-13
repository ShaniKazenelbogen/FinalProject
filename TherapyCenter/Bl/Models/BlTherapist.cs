using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class BlTherapist
{
    public int TherapistId { get; set; }

    public string Spacialization { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public int CelNumber { get; set; }

    public string? Email { get; set; }
}
