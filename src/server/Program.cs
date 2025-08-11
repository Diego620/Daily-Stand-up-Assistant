using Azure.AI.OpenAI;     // Azure SDK for OpenAI API
using server.services;    
using System;

var builder = WebApplication.CreateBuilder(args);

// ------------------ Service Registration ------------------

// Adds controller support (API endpoints)
builder.Services.AddControllers();

// Register IReportService -> ReportService with scoped lifetime
// Scoped = one instance per HTTP request
builder.Services.AddScoped<IReportService, ReportService>();

// Add API endpoint metadata for Swagger (API documentation)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ------------------ OpenAI API Configuration ------------------

// Read the OpenAI API key from appsettings.json or environment variables
var openAiApiKey = builder.Configuration["OpenAI:ApiKey"];

// Throw an error if the key is missing
if (string.IsNullOrEmpty(openAiApiKey))
{
    throw new ArgumentNullException("OpenAI:ApiKey is not configured.");
}

// Register OpenAIClient as a singleton (shared across the app’s lifetime)
builder.Services.AddSingleton(new OpenAIClient(openAiApiKey));

// ------------------ CORS Policy Configuration ------------------

// Allow requests from your React frontend (http://localhost:3000)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact",
        policy => policy
            .WithOrigins("http://localhost:3000") // React app URL
            .AllowAnyHeader()                     // Allow all headers
            .AllowAnyMethod());                   // Allow all HTTP methods (GET, POST, etc.)
});

// ------------------ Build the App ------------------
var app = builder.Build();

// Apply the "AllowReact" CORS policy globally
app.UseCors("AllowReact");

// ------------------ Middleware Pipeline ------------------

// Enable Swagger in development mode for API documentation/testing
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Redirect HTTP requests to HTTPS
app.UseHttpsRedirection();

// Enable authorization middleware (even if not used yet)
app.UseAuthorization();

// Map controller routes to endpoints
app.MapControllers();

// Start the application
app.Run();
