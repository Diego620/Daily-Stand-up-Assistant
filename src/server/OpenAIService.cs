using OpenAI;
using OpenAI.Chat;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace server.Services
{
	public class OpenAIService
	{
		private readonly ChatClient _chatClient;

		public OpenAIService(IConfiguration config)
		{
			string apiKey = config["OpenAI:ApiKey"] ?? "";
			var client = new OpenAIClient(apiKey);
			_chatClient = client.GetChatClient("gpt-4o-mini");
		}

		public async Task<string> GenerateReportAsync(string prompt)
		{
			var chatResult = await _chatClient.CompleteChatAsync(
				new ChatMessage[]
				{
					ChatMessage.CreateUserMessage(prompt)
				}
			);

			return chatResult.Value.Content[0].Text;
		}
	}
}
