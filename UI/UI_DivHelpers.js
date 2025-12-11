function UIDiv_TextGenerator(text)
{
	const div = document.createElement("div");
	div.innerHTML=text;
	return div;
}

function UIDiv_ClassTextGenerator(className, text)
{
	const div = document.createElement("div");
	div.setAttribute("class", className);
	div.innerHTML=text;
	return div;
}

function UIDiv_SpaceGenerator()
{
	const space = document.createElement("div");
	space.setAttribute("class", "space");
	return space;
}
