using Microsoft.AspNetCore.Mvc;
using server.model;      // Namespace where request/response models are defined
using server.services;   // Namespace where service interfaces/implementations live
using System.Threading.Tasks;

namespace server.Controllers
{
    // Marks this as a Web API controller so it can handle HTTP requests
    [ApiController]
    // Defines the route as "api/report" (controller name minus "Controller")
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        // Read-only field to store the injected report service
        private readonly IReportService _reportService;

        // Constructor uses dependency injection to receive an IReportService
        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        // Handles POST requests sent to "api/report"
        [HttpPost]
        public async Task<IActionResult> Generate([FromBody] GenerateReportRequest request)
        {
            // Call the service to generate the report asynchronously
            var generatedReport = await _reportService.GenerateReportAsync(request);

            // Return HTTP 200 OK with the generated report data
            return Ok(generatedReport);
        }
    }
}