using System;
using System.Collections.Generic;

namespace Dal.models;

public partial class BlAvailableSlot
{
    public int SlotId { get; set; }

    public string ClientId { get; set; } = null!;
}
