using Azure.AI.OpenAI;
using server.services; 
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddScoped<IReportService, ReportService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Get the OpenAI API key from configuration
var openAiApiKey = builder.Configuration["OpenAI:ApiKey"];

if (string.IsNullOrEmpty(openAiApiKey))
{
    throw new ArgumentNullException("OpenAI:ApiKey is not configured.");
}

// Register the OpenAIClient as a singleton service
builder.Services.AddSingleton(new OpenAIClient(openAiApiKey));


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy
            .WithOrigins("http://localhost:3000") // React app URL
            .AllowAnyHeader()
            .AllowAnyMethod());
});


var app = builder.Build();

app.UseCors("AllowReact");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();