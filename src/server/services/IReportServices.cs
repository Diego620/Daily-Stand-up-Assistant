using server.model;
using System.Threading.Tasks;

namespace server.services
{
    // Defines the contract for a report generation service
    public interface IReportService
    {
        // Asynchronously generates a report based on the provided request data
        // request: contains the user's notes and the selected template
        // Returns: a string containing the generated report content
        Task<string> GenerateReportAsync(GenerateReportRequest request);
    }
}