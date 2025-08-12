using Microsoft.AspNetCore.Mvc;
using Moq;  
using server.Controllers;
using server.model;
using server.services;

namespace server.tests;


[TestFixture]
public class ReportControllerTests
{
    
    private Mock<IReportService> _reportServiceMock;
    private ReportController _controller;
    
    
    
    
    [SetUp]
    public void Setup()
    {
        _reportServiceMock = new Mock<IReportService>();
        
        _controller = new ReportController(_reportServiceMock.Object);
    }

    [Test]
    public async Task Generate_ValidRequest_ReturnsOkResultWithReport()
    {
        var request = new GenerateReportRequest
        {
            Notes = "These are some test notes",
            SelectedTemplate = "Standard Standup"
        };
        
        var expectedReport = "This is a generated standup report.";
        
        _reportServiceMock.Setup(service => service.GenerateReportAsync(request)).ReturnsAsync(expectedReport);

        var result = await _controller.Generate(request);
        
        // NEW, RECOMMENDED WAY
        Assert.That(result, Is.InstanceOf<OkObjectResult>());
        
        var okResult = result as OkObjectResult;
        
        // NEW, RECOMMENDED WAY
        Assert.That(okResult?.Value, Is.EqualTo(expectedReport));
    }
}