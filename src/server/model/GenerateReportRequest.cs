namespace server.model
{
    // This class defines the structure of the data sent to the report generation endpoint.
    // It acts as a Data Transfer Object (DTO) for incoming requests.
    public class GenerateReportRequest
    {
        // The raw notes that will be used to generate the report.
        // Nullable string (?) means it can be null if not provided in the request.
        public string? Notes { get; set; }

        // The name or ID of the template the user wants to use for report formatting.
        // Nullable string (?) means it can also be omitted or null.
        public string? SelectedTemplate { get; set; }
    }
}