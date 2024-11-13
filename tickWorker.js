const msTick = 50;

function tickWebWorker() 
{
	postMessage(msTick);
	setTimeout("tickWebWorker()", 50);
}
tickWebWorker();
