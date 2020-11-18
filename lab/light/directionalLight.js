class DirectionalLight
{
	constructor(gl, programArray, index, direction, diffuse, specular, ambient)
	{
		this.gl = gl;
		this.programArray = programArray;

		this.direction = direction.normalize(false).toArray();
		this.diffuse = diffuse.toArray();
		this.specular = specular.toArray();
		this.ambient = ambient.toArray();

		this.directionUniformLocations = [];
		this.diffuseUniformLocations = [];
		this.specularUniformLocations = [];
		this.ambientUniformLocations = [];

		for (let i = 0; i < programArray.length; i++)
		{
			const program = programArray[i];
			this.gl.useProgram(program);

			const directionUniformLocation = this.gl.getUniformLocation(program, 'directionalLights['+index+'].direction');
			this.directionUniformLocations.push(directionUniformLocation);

			const diffuseUniformLocation = this.gl.getUniformLocation(program, 'directionalLights['+index+'].diffuse');
			this.diffuseUniformLocations.push(diffuseUniformLocation);

			const specularUniformLocation = this.gl.getUniformLocation(program, 'directionalLights['+index+'].specular');
			this.specularUniformLocations.push(specularUniformLocation);

			const ambientUniformLocation = this.gl.getUniformLocation(program, 'directionalLights['+index+'].ambient');
			this.ambientUniformLocations.push(ambientUniformLocation);

			this.gl.uniform3fv(directionUniformLocation, this.direction);
			this.gl.uniform3fv(diffuseUniformLocation, this.diffuse);
			this.gl.uniform3fv(specularUniformLocation, this.specular);
			this.gl.uniform3fv(ambientUniformLocation, this.ambient);
		}
		this.hasChanged = false;
		this.hasChangedDirection = false;
		this.hasChangedDiffuse = false;
		this.hasChangedSpecular = false;
		this.hasChangedAmbient = false;
	}

	setDirection(vector)
	{
		this.direction = vector.normalize(false).toArray();
		this.hasChangedDirection = true;
		this.hasChanged = true;
	}

	setDiffuse(vector)
	{
		this.diffuse = vector.toArray();
		this.hasChangedIntensity = true;
		this.hasChanged = true;
	}

	setSpecular(vector)
	{
		this.specular = vector.toArray();
		this.hasChangedSpecular = true;
		this.hasChanged = true;
	}

	setAmbient(vector)
	{
		this.ambient = vector.toArray();
		this.hasChangedAmbient = true;
		this.hasChanged = true;
	}

	update()
	{
		if (this.hasChanged)
		{
			this.updatePrograms();
			this.hasChanged = false;
		}
	}

	updatePrograms()
	{
		if (this.hasChangedDirection)
		{
			this.updateDirectionUniforms();
		}
		if (this.hasChangedDiffuse)
		{
			this.updateDiffuseUniforms();
		}
		if (this.hasChangedSpecular)
		{
			this.updateSpecularUniforms();
		}
		if (this.hasChangedAmbient)
		{
			this.updateAmbientUniforms();
		}
	}

	updateDirectionUniforms()
	{
		for (let i = 0; i < programArray.length; i++)
		{
			this.gl.useProgram(this.programArray[i]);
			this.gl.uniform3fv(this.directionUniformLocations[i], this.direction);
		}
		this.hasChangedDirection = false;
	}

	updateDiffuseUniforms()
	{
		for (let i = 0; i < programArray.length; i++)
		{
			this.gl.useProgram(this.programArray[i]);
			this.gl.uniform3fv(this.diffuseUniformLocations[i], this.diffuse);
		}
		this.hasChangedDiffuse = false;
	}

	updateSpecularUniforms()
	{
		for (let i = 0; i < programArray.length; i++)
		{
			this.gl.useProgram(this.programArray[i]);
			this.gl.uniform3fv(this.specularUniformLocations[i], this.specular);
		}
		this.hasChangedSpecular = false;
	}

	updateAmbientUniforms()
	{
		for (let i = 0; i < programArray.length; i++)
		{
			this.gl.useProgram(this.programArray[i]);
			this.gl.uniform3fv(this.ambientUniformLocations[i], this.ambient);
		}
		this.hasChangedambient = false;
	}
}