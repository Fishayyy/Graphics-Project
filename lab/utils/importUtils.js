const loadTextResource = function(url, callback, importer)
{
	const request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.onload = function()
	{
		if (request.status < 200 || request.status > 299) {
			callback('Error: HTTP Status ' + request.status + ' on resource ' + url);
		} else {
			callback(null, request.responseText, importer);
		}
	};
	request.send();
};

class resourceImporter
{
	constructor(imports, onLoad)
	{
		this.keys = [];
		this.urls = [];
		for (let i = 0; i < imports.length; i++)
		{
			this.keys.push(imports[i][0]);
			this.urls.push(imports[i][1]);
		}

		this.fileMap = {};
		this.index = 0;
		this.onLoad = onLoad;
		this.loadResources();
	}

	loadResources()
	{
		if (this.index < this.urls.length)
		{
			const url = this.urls[this.index];
			loadTextResource(url, this.callback, this);
		}
		else
		{
			this.onLoad(this.fileMap);
		}
	}

	callback(err, result, importer)
	{
		if (err)
		{
			console.error("Error importing resource:", err);
		}
		else
		{
			importer.fileMap[importer.keys[importer.index]] = result;
			console.log("finished importing", importer.keys[importer.index]);
			importer.index += 1;
			importer.loadResources();
		}
	}
}