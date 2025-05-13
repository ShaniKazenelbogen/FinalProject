using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class AvailableSlot
{
    public int SlotId { get; set; }

    public string ClientId { get; set; } = null!;
}
