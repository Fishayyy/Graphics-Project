const parseObjText = function(objText)
{
	const lines = objText.split("\n");

	const objPositions = [];
	const objTexCoords = [];
	const objNormals = [];

	const positions = [];
	const texcoords = [];
	const normals = [];
	const index = [];
	let i = 0;

	for (let l = 0; l < lines.length; l++)
	{
		line = lines[l].split(" ");

		if (line[0] == "v")
		{
			// position (3 space-separated float literals)
			objPositions.push([parseFloat(line[1]), parseFloat(line[2]), parseFloat(line[3])]);
		}
		else if (line[0] == "vt")
		{
			// texCoords (2 space-separated float literals)
			objTexCoords.push([parseFloat(line[1]), parseFloat(line[2])]);
		}
		else if (line[0] == "vn")
		{
			// normals (3 space-separated float literals)
			objNormals.push([parseFloat(line[1]), parseFloat(line[2]), parseFloat(line[3])]);
		}
		else if (line[0] == "f")
		{
			// indexes, 3-4 space separated triples
				// each triple is p/t/n
				// positions, texcoords, normals
			// if 4, quad, split into 2 tris
			for (let v = 1; v < line.length; v++)
			{
				const indices = line[v].split("/");
				let j;
				if (indices[0] != "")
				{
					j = parseInt(indices[0])-1;
					positions.push(objPositions[j][0]);
					positions.push(objPositions[j][1]);
					positions.push(objPositions[j][2]);
				}
				if (indices[1] != "")
				{
					j = parseInt(indices[1])-1;
					texcoords.push(objTexCoords[j][0]);
					texcoords.push(objTexCoords[j][1]);
				}
				if (indices[2] != "")
				{
					j = parseInt(indices[2])-1;
					normals.push(objNormals[j][0]);
					normals.push(objNormals[j][1]);
					normals.push(objNormals[j][2]);
				}
			}
			const numTri = line.length-3;
			for (let tri = 0; tri < numTri; tri++)
			{
				index.push(i);
				index.push(i+tri+1);
				index.push(i+tri+2);
			}
			i += numTri + 2;
		}
		// else some other info that we're going to ignore
	}
	return {
		positions: new Float32Array(positions),
		texcoords: new Float32Array(texcoords),
		normals: new Float32Array(normals),
		index: new Uint16Array(index)
	}
}