class PointLight
{
	constructor(gl, programArray, index, position, diffuse, specular, ambient=new Vector())
	{
		this.gl = gl;
		this.programArray = programArray;

		this.position = position;
		this.diffuse = diffuse.toArray();
		this.specular = specular.toArray();
		this.ambient = ambient.toArray();

		this.positionUniformLocations = [];
		this.diffuseUniformLocations = [];
		this.specularUniformLocations = [];
		this.ambientUniformLocations = [];

		for (let i = 0; i < programArray.length; i++)
		{
			const program = programArray[i];
			this.gl.useProgram(program);

			const positionUniformLocation = this.gl.getUniformLocation(program, 'pointLights['+index+'].position');
			this.positionUniformLocations.push(positionUniformLocation);

			const diffuseUniformLocation = this.gl.getUniformLocation(program, 'pointLights['+index+'].diffuse');
			this.diffuseUniformLocations.push(diffuseUniformLocation);

			const specularUniformLocation = this.gl.getUniformLocation(program, 'pointLights['+index+'].specular');
			this.specularUniformLocations.push(specularUniformLocation);

			const ambientUniformLocation = this.gl.getUniformLocation(program, 'pointLights['+index+'].ambient');
			this.ambientUniformLocations.push(ambientUniformLocation);

			this.gl.uniform3fv(positionUniformLocation, this.position.toArray());
			this.gl.uniform3fv(diffuseUniformLocation, this.diffuse);
			this.gl.uniform3fv(specularUniformLocation, this.specular);
			this.gl.uniform3fv(ambientUniformLocation, this.ambient);
		}
		this.hasChangedPosition = false;
		this.hasChangedDiffuse = false;
		this.hasChangedSpecular = false;
		this.hasChangedAmbient = false;
		this.hasChanged = false;
	}

	setPosition(vector)
	{
		this.position = vector;
		this.hasChangedPosition = true;
		this.hasChanged = true;
	}

	translate(vector)
	{
		this.position.add(vector);
		this.hasChangedPosition = true;
		this.hasChanged = true;
	}

	rotateAround(point, quat)
	{
		this.position.subtract(point);
		this.position.rotate(quat);
		this.position.add(point);
		this.hasChangedPosition = true;
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
		if (this.hasChangedPosition)
		{
			this.updatePositionUniforms();
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

	updatePositionUniforms()
	{
		for (let i = 0; i < this.programArray.length; i++)
		{
			this.gl.useProgram(this.programArray[i]);
			this.gl.uniform3fv(this.positionUniformLocations[i], this.position.toArray());
		}
		this.hasChangedPosition = false;
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