class LightManager
{
	constructor(gl, programArray, ambientLight=new Vector(0.2, 0.3, 0.2))
	{
		this.gl = gl;
		this.programArray = programArray;

		this.directionalLightIndex = 0;
		this.pointLightIndex = 0;

		this.ambientLight = ambientLight.toArray();
		this.ambientLightLocationArray = [];

		for (let i = 0; i < programArray.length; i++)
		{
			const program = this.programArray[i];
			this.gl.useProgram(program);
			const ambientUniformLocation = this.gl.getUniformLocation(program, 'ambientLight');
			this.ambientLightLocationArray.push(ambientUniformLocation);
			this.gl.uniform3fv(ambientUniformLocation, this.ambientLight);
		}

		this.directionalLights = [];
		this.pointLights = [];
	}

	addDirectionalLight(direction, diffuse, specular, ambient = new Vector())
	{
		this.directionalLights.push(
			new DirectionalLight(
				this.gl,
				this.programArray,
				this.directionalLightIndex,
				direction,
				diffuse,
				specular,
				ambient
			)
		);
		this.directionalLightIndex += 1;
	}

	addPointLight(position, diffuse, specular, ambient = new Vector())
	{
		this.pointLights.push(
			new PointLight(
				this.gl,
				this.programArray,
				this.pointLightIndex,
				position,
				diffuse,
				specular,
				ambient
			)
		);
		this.pointLightIndex += 1;
	}

	setAmbientLight(vector)
	{
		this.ambientLight = vector.toArray();
		for (let i = 0; i < this.programArray.length; i++)
		{
			let program = this.programArray[i];
			this.gl.useProgram(program);
			this.gl.uniform3fv(ambientLightLocationArray[i], this.ambientLight);
		}
	}

	updateDirectionalLights()
	{
		for (let i = 0; i < this.directionalLights.length; i++)
		{
			this.directionalLights[i].update();
		}
	}

	updatePointLights()
	{
		for (let i = 0; i < this.pointLights.length; i++)
		{
			this.pointLights[i].update();
		}
	}

	update()
	{
		this.updateDirectionalLights();
		this.updatePointLights();
	}
}