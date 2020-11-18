class UVMesh extends Mesh
{

	constructor(gl, positionArray, normalArray, indexArray, uvArray, material, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(gl, positionArray, normalArray, indexArray, material, position, rotation, scale);

		this.texCoordAttribLocation = gl.getAttribLocation(this.program, 'vertTexCoord');

		this.texCoordBuffer = gl.createBuffer();
		this.gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
		this.gl.bufferData(gl.ARRAY_BUFFER, uvArray, gl.STATIC_DRAW);
		this.gl.bindBuffer(gl.ARRAY_BUFFER, null);
	}

	activate()
	{
		super.activate();

		this.gl.enableVertexAttribArray(this.texCoordAttribLocation);
		this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
		this.gl.vertexAttribPointer(
			this.texCoordAttribLocation,
			2,
			this.gl.FLOAT,
			this.gl.FALSE,
			2 * Float32Array.BYTES_PER_ELEMENT,
			0
		);
	}

	deactivate()
	{
		super.deactivate();
		this.gl.disableVertexAttribArray(this.texCoordAttribLocation);
	}
}