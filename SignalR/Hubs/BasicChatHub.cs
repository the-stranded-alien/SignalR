using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SignalR.Data;

// Steps to Run Migration in VS Mac
// dotnet tool install --global dotnet-ef
// dotnet ef database update --project SignalR.csproj


namespace SignalR.Hubs
{
	public class BasicChatHub : Hub
	{
		private readonly ApplicationDbContext _db;

		public BasicChatHub(ApplicationDbContext dbContext)
		{
			_db = dbContext;
		}

		public async Task SendMessageToAll(string user, string message)
		{
			await Clients.All.SendAsync("MessageReceived", user, message);
		}

		[Authorize]
		public async Task SendMessageToReceiver(string sender, string receiver, string message)
		{
			var userId = _db.Users.FirstOrDefault(user => user.Email.ToLower() == receiver.ToLower()).Id;
			if (!string.IsNullOrEmpty(userId))
			{
				await Clients.User(userId).SendAsync("MessageReceived", sender, message);
			}
		}
	}
}

