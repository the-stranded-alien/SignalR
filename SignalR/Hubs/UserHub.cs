using System;
using Microsoft.AspNetCore.SignalR;

// 1. Create SignalR Hub
// 2. Add Methods to Hub
// 3. Add Client-Side SignalR
// 4. Connect to SignalR Hub from Client JS
// 5. Call SignalR Hub Method
// 6. SignalR Hub Invokes Method in Client JS to Notify Clients
// 7. Client Receives Update From Server-Side and Performs Action

namespace SignalR.Hubs
{
	public class UserHub : Hub
	{
		public static int TotalViews { get; set; } = 0;

        public static int TotalUsers { get; set; } = 0;

        public override Task OnConnectedAsync()
        {
			TotalUsers++;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            Clients.All.SendAsync("updateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);
        }



        public async Task<string> NewWindowLoaded()
		{
			TotalViews++;
			// Send update to all clients that total views has been updated
			await Clients.All.SendAsync("updateTotalViews", TotalViews);
            return $"Total Views: {TotalViews}";
		}
	}
}

