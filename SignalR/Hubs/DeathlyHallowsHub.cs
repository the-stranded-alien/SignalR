﻿using System;
using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs
{
	public class DeathlyHallowsHub : Hub
	{
		public Dictionary<string, int> GetRaceStatus()
		{
			return StaticDetails.DeathlyHallowRace;
		}
	}
}

