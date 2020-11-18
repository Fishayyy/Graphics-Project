class UVMaterial
{
	// unlike RGBMaterial, diffuse specular and ambient are all floats
	constructor(gl, program, imageID, flipTexture, diffuse=1.0, specular=1.0, ambient=1.0, shininess=1.0)
	{
		this.gl = gl;
		this.program = program;

		this.diffuse = diffuse;
		this.specular = specular;
		this.ambient = ambient;
		this.shininess = shininess;

		this.diffuseUniformLocation = gl.getUniformLocation(program, 'material.diffuse');
		this.specularUniformLocation = gl.getUniformLocation(program, 'material.specular');
		this.ambientUniformLocation = gl.getUniformLocation(program, 'material.ambient');
		this.shininessUniformLocation = gl.getUniformLocation(program, 'material.shininess');

		this.textureObject = gl.createTexture();
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureObject);
		this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, flipTexture);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
		this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
		this.gl.texImage2D(
			this.gl.TEXTURE_2D,
			0,
			this.gl.RGBA,
			this.gl.RGBA,
			this.gl.UNSIGNED_BYTE,
			document.getElementById(imageID)
		);
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
	}

	activate()
	{
		this.gl.uniform1f(this.diffuseUniformLocation, this.diffuse);
		this.gl.uniform1f(this.specularUniformLocation, this.specular);
		this.gl.uniform1f(this.ambientUniformLocation, this.ambient);
		this.gl.uniform1f(this.shininessUniformLocation, this.shininess);

		this.gl.bindTexture(this.gl.TEXTURE_2D, this.textureObject);
	}

	deactivate()
	{
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
	}
}