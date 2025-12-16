function UIDiv_Text(text)
{
	const div = document.createElement("div");
	div.innerHTML=text;
	return div;
}

function UIDiv_ClassText(className, text)
{
	const div = document.createElement("div");
	div.setAttribute("class", className);
	div.innerHTML=text;
	return div;
}

function UIDiv_ColorText(color, text)
{
	const div = document.createElement("div");
	div.innerHTML=text;
	div.style.color=color;
	return div;
}

function UIDiv_Space()
{
	const space = document.createElement("div");
	space.setAttribute("class", "space");
	return space;
}

function UIButton_Text(text)
{
	const newButton = document.createElement("button");
	newButton.textContent = text;
	return newButton;
}

function UIButton_ClassText(className, text)
{
	const newButton = document.createElement("button");
	newButton.setAttribute("class", className);
	newButton.textContent = text;
	return newButton;
}