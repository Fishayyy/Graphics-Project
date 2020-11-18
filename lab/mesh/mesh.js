class Mesh extends Transform
{
	constructor(gl, positionArray, normalArray, indexArray, material, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(position, rotation, scale);

		// WebGL references / locations
		this.gl = gl;
		this.program = material.program;
		this.mWorldUniformLocation = this.gl.getUniformLocation(this.program, 'mWorld');
		this.mNormalUniformLocation = this.gl.getUniformLocation(this.program, 'mNormal');
		this.material = material;

		this.positionAttribLocation = this.gl.getAttribLocation(this.program, "vertPosition");
		this.positionBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, positionArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

		this.normalAttribLocation = this.gl.getAttribLocation(this.program, "vertNormal");
		this.normalBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
		this.gl.bufferData(this.gl.ARRAY_BUFFER, normalArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);

		this.indexLength = indexArray.length;
		this.indexBuffer = this.gl.createBuffer();
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, indexArray, this.gl.STATIC_DRAW);
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
	}

	activate()
	{
		this.update();

		this.gl.useProgram(this.program);

		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		
		this.material.activate();

		this.gl.enableVertexAttribArray(this.positionAttribLocation);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
		this.gl.vertexAttribPointer(
			this.positionAttribLocation,
			3,
			this.gl.FLOAT,
			this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT,
			0
		);

		this.gl.enableVertexAttribArray(this.normalAttribLocation);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.normalBuffer);
		this.gl.vertexAttribPointer(
			this.normalAttribLocation,
			3,
			this.gl.FLOAT,
			this.gl.FALSE,
			3 * Float32Array.BYTES_PER_ELEMENT,
			0
		);

		this.gl.uniformMatrix3fv(this.mNormalUniformLocation, this.gl.FALSE, this.mNormal);

		this.gl.uniformMatrix4fv(this.mWorldUniformLocation, this.gl.FALSE, this.mWorld);
	}

	draw()
	{
		this.activate();
		this.gl.drawElements(
			this.gl.TRIANGLES,
			this.indexLength,
			this.gl.UNSIGNED_SHORT,
			0
		);
		this.deactivate();
	}

	deactivate()
	{
		this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
		this.gl.disableVertexAttribArray(this.positionAttribLocation);
		this.gl.disableVertexAttribArray(this.normalAttribLocation);
		this.material.deactivate();
	}
}