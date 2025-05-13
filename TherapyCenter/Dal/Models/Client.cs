using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class Client
{
    public int ClientId { get; set; }

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string? Email { get; set; }

    public int CelNumber { get; set; }

    public string? Adress { get; set; }
}
