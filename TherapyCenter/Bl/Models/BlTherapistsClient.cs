using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class BlTherapistsClient
{
    public int Id { get; set; }

    public int ClientId { get; set; }

    public int TherapistId { get; set; }
}
