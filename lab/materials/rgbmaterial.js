class RGBMaterial
{
	constructor(gl, program, diffuse=new Vector(1,1,1), specular=new Vector(1,1,1), ambient=new Vector(1,1,1), shininess=0.3)
	{
		this.gl = gl;
		this.program = program;

		this.diffuse = diffuse.toArray();
		this.specular = specular.toArray();
		this.ambient = ambient.toArray();
		this.shininess = shininess;

		this.diffuseUniformLocation = gl.getUniformLocation(program, 'material.diffuse');
		this.specularUniformLocation = gl.getUniformLocation(program, 'material.specular');
		this.ambientUniformLocation = gl.getUniformLocation(program, 'material.ambient');
		this.shininessUniformLocation = gl.getUniformLocation(program, 'material.shininess');
	}

	activate()
	{
		this.gl.uniform3fv(this.diffuseUniformLocation, this.diffuse);
		this.gl.uniform3fv(this.specularUniformLocation, this.specular);
		this.gl.uniform3fv(this.ambientUniformLocation, this.ambient);
		this.gl.uniform1f(this.shininessUniformLocation, this.shininess);
	}

	deactivate()
	{
		
	}
}