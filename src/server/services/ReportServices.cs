using Azure.AI.OpenAI;
using server.model;
using System;
using System.Threading.Tasks;

namespace server.services
{
    public class ReportService : IReportService
    {
        // defining the OpenAI client
        private readonly OpenAIClient _openAiClient;

        public ReportService(OpenAIClient openAiClient)
        {
            _openAiClient = openAiClient;
        }

        // Method that defines the logic for generating a report based on the provided notes and selected template.
        public async Task<string> GenerateReportAsync(GenerateReportRequest request)
        {
            // getting the current date
            string currentDate = DateTime.Now.ToString("dd MMMM yyyy");
            
            // ensuring that the prompt takes in the selected template and current date
            string systemPrompt = GetSystemPrompt(request.SelectedTemplate, currentDate);

            // defining the ai feature -> chatCompletionsOptions
            var chatCompletionsOptions = new ChatCompletionsOptions()
            {
                DeploymentName = "gpt-3.5-turbo",
                Messages =
                {
                    // setting the instructions for the AI model based on whatever template is selected
                    new ChatRequestSystemMessage(systemPrompt),
                    // prmpting the AI model to generate a report based on the user's notes
                    new ChatRequestUserMessage(request.Notes),
                },
                MaxTokens = 1000,
                Temperature = 0.7f,
            };
            // sending the request to the OpenAI API and getting the response
            var response = await _openAiClient.GetChatCompletionsAsync(chatCompletionsOptions);
            return response.Value.Choices[0].Message.Content;
        }

        private string GetSystemPrompt(string? template, string currentDate)
        {
            switch (template)
            {
                case "Detailed Report":
                    return $"You are an assistant that creates exhaustive reports. The report title must be '# Detailed Report - {currentDate}'. It must have '## Summary', '## Key Accomplishments', '## Tasks in Progress', '## Next Steps', and '## Potential Blockers' sections. Use detailed, professional language.";

                case "Weekly Journals": 
                    return $"You are an assistant that helps users write a reflective journal entry for the week. The report title must be '# Reflective Journal - {currentDate}'. The report must contain two main parts. First, a section titled '## Weekly Reflection' where the user reflects on their experiences. Second, a section titled '## Accomplishment Statement' that is broken down into three specific sub-sections: '### 1. Problem:', '### 2. Action:', and '### 3. Result:'. Analyze the user's notes to fill out each of these sections clearly and concisely.";
                
                case "Minimal Summary":
                    return $"You are an assistant that summarizes notes into a brief, concise summary. The report must have a title '# Summary - {currentDate}' and should be a single paragraph highlighting only the most critical points.";
                
                case "Standard Standup":
                default:
                    return $"You are an assistant that transforms messy daily notes into a professional, well-formatted standup report. The report title must be '# Standup Report - {currentDate}'. The report must have three sections: '## Yesterday's Accomplishments', '## Today's Plan', and '## Blockers'. Use markdown for formatting.";
            }
        }
    }
}