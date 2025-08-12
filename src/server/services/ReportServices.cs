using Azure.AI.OpenAI;     // Azure SDK for calling the OpenAI service
using server.model;        // Request/response model definitions

namespace server.services
{
    // Implements the IReportService interface to generate reports using Azure OpenAI
    public class ReportService : IReportService
    {
        private readonly OpenAIClient _openAiClient; // Client for making API calls to Azure OpenAI

        // Constructor uses dependency injection to provide an OpenAIClient
        public ReportService(OpenAIClient openAiClient)
        {
            _openAiClient = openAiClient;
        }

        // Generates a report based on the user's notes and chosen template
        public async Task<string> GenerateReportAsync(GenerateReportRequest request)
        {
            // Get the current date in "day month year" format (e.g., 11 August 2025)
            string currentDate = DateTime.Now.ToString("dd MMMM yyyy");

            // Generate the system prompt based on the selected template and current date
            string systemPrompt = GetSystemPrompt(request.SelectedTemplate, currentDate);

            // Prepare chat completion request options for Azure OpenAI
            var chatCompletionsOptions = new ChatCompletionsOptions()
            {
                DeploymentName = "gpt-3.5-turbo", // Azure OpenAI deployment name
                Messages =
                {
                    new ChatRequestSystemMessage(systemPrompt), // System role: instructions for the AI
                    new ChatRequestUserMessage(request.Notes),  // User role: raw notes from the request
                },
                MaxTokens = 1000,  // Limit the output size
                Temperature = 0.7f // Controls creativity level
            };

            // Call Azure OpenAI to generate the report
            var response = await _openAiClient.GetChatCompletionsAsync(chatCompletionsOptions);

            // Return the AI's response text
            return response.Value.Choices[0].Message.Content;
        }

        // Returns the correct system prompt for the chosen template
        private string GetSystemPrompt(string? template, string currentDate)
        {
            switch (template)
            {
                case "Detailed Report":
                    return $"You are an assistant that creates exhaustive reports. " +
                           $"The report title must be '# Detailed Report - {currentDate}'. " +
                           $"It must have '## Summary', '## Key Accomplishments', '## Tasks in Progress', " +
                           $"'## Next Steps', and '## Potential Blockers' sections. " +
                           $"Use detailed, professional language.";

                case "Weekly Journals":
                    return $"You are an assistant that helps users write a reflective journal entry for the week. " +
                           $"The report title must be '# Reflective Journal - {currentDate}'. " +
                           $"The report must contain two main parts. " +
                           $"First, a section titled '## Weekly Reflection' where the user reflects on their experiences. " +
                           $"Second, a section titled '## Accomplishment Statement' that is broken down into three specific sub-sections: " +
                           $"'### 1. Problem:', '### 2. Action:', and '### 3. Result:'. " +
                           $"Analyze the user's notes to fill out each of these sections clearly and concisely.";

                case "Minimal Summary":
                    return $"You are an assistant that summarizes notes into a brief, concise summary. " +
                           $"The report must have a title '# Summary - {currentDate}' and should be a single paragraph " +
                           $"highlighting only the most critical points.";

                // Default template: Standard Standup format
                case "Standard Standup":
                default:
                    return $"You are an assistant that transforms messy daily notes into a professional, well-formatted standup report. " +
                           $"The report title must be '# Standup Report - {currentDate}'. " +
                           $"The report must have three sections: '## Yesterday's Accomplishments', '## Today's Plan', and '## Blockers'. " +
                           $"Use markdown for formatting.";
            }
        }
    }
}
