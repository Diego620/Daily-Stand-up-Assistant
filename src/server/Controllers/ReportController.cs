using Microsoft.AspNetCore.Mvc;
using server.Services;
using System.Threading.Tasks;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly OpenAIService _openAIService;

        public ReportController(OpenAIService openAIService)
        {
            _openAIService = openAIService;
        }

        [HttpPost]
        public async Task<IActionResult> Generate([FromBody] string userPrompt)
        {
            var response = await _openAIService.GenerateReportAsync(userPrompt);
            return Ok(new { text = response });
        }
    }
}
