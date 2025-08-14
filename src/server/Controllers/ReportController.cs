using Microsoft.AspNetCore.Mvc;
using server.model;
using server.services;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;

        public ReportController(IReportService reportService)
        {
            _reportService = reportService;
        }

        // Generate method is going to be used to generate a report based on the provided notes and selected template(request) from the frontend.
        [HttpPost]
        public async Task<IActionResult> Generate([FromBody] GenerateReportRequest request)
        {
            // report gets passed to the report service to generate the report
            var generatedReport = await _reportService.GenerateReportAsync(request);
            // wraps the string in an Ok result to return it as a response
            return Ok(generatedReport);
        }
    }
}