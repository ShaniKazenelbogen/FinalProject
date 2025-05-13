using System;
using System.Collections.Generic;
//using Dal.Models;
using Dal.models;
using Microsoft.EntityFrameworkCore;

namespace Dal.models;

public partial class dbClass : DbContext
{
    public dbClass()
    {
    }

    public dbClass(DbContextOptions<dbClass> options)
        : base(options)
    {
    }

    public virtual DbSet<Appointment> Appointments { get; set; }

    public virtual DbSet<AvailableSlot> AvailableSlots { get; set; }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<Therapist> Therapists { get; set; }

    public virtual DbSet<TherapistsClient> TherapistsClients { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename='H:\\FinalProject\\TherapyCenter\\Dal\\Data\\database.mdf';Integrated Security=True;Connect Timeout=30");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Appointment>(entity =>
        {
            entity.HasKey(e => e.AppointmentId).HasName("PK__tmp_ms_x__773D928C8BDF39CB");

            entity.Property(e => e.AppointmentId).ValueGeneratedNever();
            entity.Property(e => e.ClientId)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("ClientID");
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(50);
            entity.Property(e => e.TherapistId)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<AvailableSlot>(entity =>
        {
            entity.HasKey(e => e.SlotId).HasName("PK__Availabl__0A124AAF507490C1");

            entity.Property(e => e.SlotId).ValueGeneratedNever();
            entity.Property(e => e.ClientId)
                .HasMaxLength(10)
                .IsFixedLength();
        });

        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.ClientId).HasName("PK__Clients__E67E1A24DCC0791B");

            entity.Property(e => e.ClientId).ValueGeneratedNever();
            entity.Property(e => e.Adress).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
        });

        modelBuilder.Entity<Therapist>(entity =>
        {
            entity.HasKey(e => e.TherapistId).HasName("PK__Therapis__4D6219320B2D2925");

            entity.Property(e => e.TherapistId).ValueGeneratedNever();
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Spacialization).HasMaxLength(50);
        });

        modelBuilder.Entity<TherapistsClient>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Therapis__3214EC0743075248");

            entity.Property(e => e.Id).ValueGeneratedNever();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
