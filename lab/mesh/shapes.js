class Cube
{
	static positionArray()
	{
		return new Float32Array([
			// top (+y)
			-0.5, 0.5, -0.5,
			-0.5, 0.5, 0.5,
			0.5,  0.5, 0.5,
			0.5,  0.5, -0.5,

			// bottom (-y)
			-0.5, -0.5, 0.5,
			-0.5, -0.5, -0.5,
			0.5,  -0.5, -0.5,
			0.5,  -0.5, 0.5,

			// left (-x)
			-0.5, 0.5,  -0.5,
			-0.5, -0.5, -0.5,
			-0.5, -0.5, 0.5,
			-0.5, 0.5,  0.5,

			// right (+x)
			0.5, 0.5,  0.5,
			0.5, -0.5, 0.5,
			0.5, -0.5, -0.5,
			0.5, 0.5,  -0.5,

			// back (-z)
			0.5,  0.5,  -0.5,
			0.5,  -0.5, -0.5,
			-0.5, -0.5, -0.5,
			-0.5, 0.5,  -0.5,

			// front (+z)
			-0.5, 0.5,  0.5,
			-0.5, -0.5, 0.5,
			0.5,  -0.5, 0.5,
			0.5,  0.5,  0.5
		]);
	}

	static normalArray()
	{
		return new Float32Array([	
			// top
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,

			// bottom
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,

			// left
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,

			// right
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,

			// back
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,

			// front
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1
		]);
	}

	static defaultColorArray()
	{
		return new Float32Array([
			// top / bottom is green
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,
			0.0, 1.0, 0.0,

			// left / right is red
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
	 		1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
			
			1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,
	 		1.0, 0.0, 0.0,
			1.0, 0.0, 0.0,

			// front / back is blue
			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
	 		0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,

			0.0, 0.0, 1.0,
			0.0, 0.0, 1.0,
	 		0.0, 0.0, 1.0,
			0.0, 0.0, 1.0
		]);
	}

	static uvRepeatArray()
	{
		return new Float32Array([
			// top
			0, 0,
			0, 1,
			1, 1,
			1, 0,
			// bottom
			0, 0,
			0, 1,
			1, 1,
			1, 0,
			// left
			0, 0,
			0, 1,
			1, 1,
			1, 0,
			// right
			0, 0,
			0, 1,
			1, 1,
			1, 0,
			// back
			0, 0,
			0, 1,
			1, 1,
			1, 0,
			// front
			0, 0,
			0, 1,
			1, 1,
			1, 0,
		]);
	}

	static uvUnwrappedArray()
	{
		return new Float32Array([
			// top
			1/4, 0,
			1/4, 1/3,
			1/2, 1/3,
			1/2, 0,
			// bottom
			1/4, 2/3,
			1/4, 1,
			1/2, 1,
			1/2, 2/3,
			// left
			0,   1/3,
			0,   2/3,
			1/4, 2/3,
			1/4, 1/3,
			// right
			1/2, 1/3,
			1/2, 2/3,
			3/4, 2/3,
			3/4, 1/3,
			// back
			3/4, 1/3,
			3/4, 2/3,
			1,   2/3,
			1,   1/3,
			// front
			1/4, 1/3,
			1/4, 2/3,
			1/2, 2/3,
			1/2, 1/3,
		]);
	}

	static indexArray()
	{
		return new Uint16Array([
			// top
			0, 1, 2,
			0, 2, 3,
			// bottom
			4, 5, 6,
			4, 6, 7,
			// right
			8, 9, 10,
			8, 10, 11,
			// left
			12, 13, 14,
			12, 14, 15,
			// back
			16, 17, 18,
			16, 18, 19,
			// front
			20, 21, 22,
			20, 22, 23
		]);
	}
}

class Sphere
{
	static positionArray(latBands, longBands)
	{
		const pos = [];
		for (let lat = 0; lat <= latBands; lat++)
		{
			const theta = lat * Math.PI / latBands;
			const sinTheta = Math.sin(theta);
			const cosTheta = Math.cos(theta);

			for (let long = 0; long <= longBands; long++)
			{
				const phi = long * 2 * Math.PI / longBands;
				const sinPhi = Math.sin(phi);
				const cosPhi = Math.cos(phi);

				const x = sinTheta * sinPhi;
				const y = cosTheta;
				const z = sinTheta * cosPhi; 

				pos.push(x);
				pos.push(y);
				pos.push(z);
			}
		}
		return new Float32Array(pos);
	}

	static normalArray(latBands, longBands)
	{
		return Sphere.positionArray(latBands, longBands);
	}

	static uvArray(latBands, longBands)
	{
		const uvArray = [];
		let u;
		let v;
		for (let lat = 0; lat <= latBands; lat++)
		{
			v = lat / latBands;
			for (let long = 0; long <= longBands; long++)
			{
				u = long / longBands;
				uvArray.push(u);
				uvArray.push(v);
			}
		}
		return new Float32Array(uvArray);
	}

	static indexArray(latBands, longBands)
	{
		const ind = [];
		for (let lat = 0; lat < latBands; lat++)
		{
			for (let long = 0; long < longBands; long++)
			{
				const topLeftIndex = lat * (longBands + 1) + long;
				const topRightIndex = topLeftIndex + 1;
				const bottomLeftIndex = topLeftIndex + longBands + 1;
				const bottomRightIndex = bottomLeftIndex + 1;

				// top left triangle
				ind.push(topLeftIndex);
				ind.push(bottomLeftIndex);
				ind.push(topRightIndex);

				// bottom right triangle
				ind.push(bottomLeftIndex);
				ind.push(bottomRightIndex);
				ind.push(topRightIndex);
			}
		}
		return new Uint16Array(ind);
	}
}