const msTick = 50;

var lastTick = Date.now();

function tickWebWorker() 
{
	//Try to maintain 50 ms tick
	while(true)
	{
		let currentTime = Date.now();
		if(currentTime >= lastTick + msTick)
		{
			postMessage(currentTime - lastTick);
			lastTick = currentTime;
		}
	}
}
tickWebWorker();
