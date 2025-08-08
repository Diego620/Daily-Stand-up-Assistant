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

        [HttpPost]
        public async Task<IActionResult> Generate([FromBody] GenerateReportRequest request)
        {
            var generatedReport = await _reportService.GenerateReportAsync(request);
            return Ok(generatedReport);
        }
    }
}