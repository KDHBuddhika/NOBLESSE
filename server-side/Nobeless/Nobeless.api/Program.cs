
using Microsoft.EntityFrameworkCore;
using Nobeless.api.Data;
using Nobeless.api.Service;
using Nobeless.api.Service.IMPL;
using Nobeless.api.Util;
using System.Text.Json.Serialization;


namespace Nobeless.api
{
    public class Program
    {
        public static void Main(string[] args)

        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddScoped<IEmailService, EmailService>();
            builder.Services.AddScoped<ProductService,ProductServiceIMPL>();
            builder.Services.AddScoped<AuctionService, AuctionServiceIMPL>();

            builder.Services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve;
                options.JsonSerializerOptions.WriteIndented = true; // Optional for readability
            });


            builder.Services.AddScoped<EmailService>();
            builder.Services.AddTransient<EmailService>();
            builder.Services.AddHostedService<AuctionStatusCheckerService>();


            //--------------------react enable-----------------
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder => builder
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });

            
     


            builder.Services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });

            builder.Services.AddDbContext<NobelessDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("NobelessConnectionString")
            ));

            builder.Services.AddTransient<UploadHandler>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseCors("AllowReactApp");

            app.MapControllers();

            app.UseStaticFiles();

            app.Run();
        }
    }
}
