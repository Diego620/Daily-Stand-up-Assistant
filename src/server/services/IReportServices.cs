using server.model;
using System.Threading.Tasks;

namespace server.services
{
    public interface IReportService
    {
        Task<string> GenerateReportAsync(GenerateReportRequest request);
    }
}