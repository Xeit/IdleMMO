const msTick = 10;

function tickWebWorker() 
{
	postMessage(msTick);
	setTimeout("tickWebWorker()", 10);
}
tickWebWorker();
