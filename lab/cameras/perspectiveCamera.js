class PerspectiveCamera extends Transform
{
	constructor(gl, programArray=[], aspect=1, viewRadians=Math.PI/4, near=0.01, far=1000.0, position=new Vector(), rotation=new Quaternion())
	{
		super(position, rotation);

		// WebGL references / locations
		this.gl = gl;
		this.programs = programArray;
		this.positionAttribLocations = [];
		this.mProjViewAttribLocations = [];

		for (let i = 0; i < programArray.length; i++)
		{
			this.gl.useProgram(this.programs[i]);
			this.mProjViewAttribLocations.push(this.gl.getUniformLocation(this.programs[i], 'cam.mProjView'));
			this.positionAttribLocations.push(this.gl.getUniformLocation(this.programs[i], 'cam.position'));
		}

		// Position
		this.updatePositions();

		// View matrix
		this.localRight = new Vector(1, 0, 0).rotate(rotation, false);
		this.localUp = new Vector(0,1,0).rotate(rotation, false);
		this.forward = new Vector(0,0,-1).rotate(rotation, false);
		this.mView = new Float32Array(16);
		this.updateViewMatrix();

		// Projection matrix
		this.fov = viewRadians;
		this.aspect = aspect;
		this.near = near;
		this.far = far;
		this.mProj = new Float32Array(16);
		this.needsProjectionUpdate = false;
		this.updateProjectionMatrix();

		// product of proj and view
		this.mProjView = new Float32Array(16);
		this.updateProjViewMatrix();
	}

	addProgram(program)
	{
		this.programs.push(program);
		this.needsUpdate = true;
		this.needsProjectionUpdate = true;
	}

	setFov(radians)
	{
		self.fov = radians;
		this.needsProjectionUpdate = true;
	}

	setAspect(ratio)
	{
		this.aspect = ratio;
		this.needsProjectionUpdate = true;
	}

	setNearClip(distance)
	{
		this.nearClip = distance;
		this.needsProjectionUpdate = true;
	}

	setFarClip(distance)
	{
		this.farClip = distance;
		this.needsProjectionUpdate = true;
	}

	setPerspective(fov, aspect, near, far)
	{
		this.fov = fov;
		this.aspect = aspect;
		this.near = near;
		this.far = far;
		this.needsProjectionUpdate = true;
	}

	lookAt(target, up=this.localUp)
	{
		this.forward = target.subtract(this.position, false);
		this.forward.normalize();

		this.localRight = Vector.cross(this.forward, up);
		this.localRight.normalize();

		this.localUp = Vector.cross(this.localRight, this.forward);
		this.localUp.normalize();

		let tr = this.localRight.x + this.localUp.y - this.forward.z;

		let S;
		let w;
		let x;
		let y;
		let z;

		if (tr > 0)
		{ 
			S = Math.sqrt(tr+1) * 2; // S=4*qw 
			w = S / 4;
			x = (this.localUp.z + this.forward.y) / S;
			y = (-this.forward.x - this.localRight.z) / S; 
			z = (this.localRight.y - this.localUp.x) / S; 
		}
		else if ((this.localRight.x > this.localUp.y)&(this.localRight.x > -this.forward.z))
		{ 
			S = Math.sqrt(1 + this.localRight.x - this.localUp.y + this.forward.z) * 2; // S=4*qx 
			w = (this.localUp.z + this.forward.y) / S;
			x = S / 4;
			y = (this.localUp.x + this.localRight.y) / S; 
			z = (-this.forward.x + this.localRight.z) / S; 
		}
		else if (this.localUp.y > -this.forward.z)
		{ 
			S = Math.sqrt(1 + this.localUp.y - this.localRight.x + this.forward.z) * 2; // S=4*qy
			w = (-this.forward.x - this.localRight.z) / S;
			x = (this.localUp.x + this.localRight.y) / S; 
			y = S / 4;
			z = (-this.forward.y + this.localUp.z) / S; 
		}
		else
		{ 
			S = Math.sqrt(1 - this.forward.z - this.localRight.x - this.localUp.y) * 2; // S=4*qz
			w = (this.localRight.y - this.localUp.x) / S;
			x = (-this.forward.x + this.localRight.z) / S;
			y = (-this.forward.y + this.localUp.z) / S;
			z = S / 4;
		}
		
		this.rotation.set(w, x, y, z);
		this.updateLocalDirections();

		this.updateViewMatrix();
		this.updateProjViewMatrix();
	}

	updateLocalDirections()
	{
		this.localRight = new Vector(1, 0, 0).rotate(this.rotation, false);
		this.localUp = new Vector(0,1,0).rotate(this.rotation, false);
		this.forward = new Vector(0,0,-1).rotate(this.rotation, false);
	}

	updateViewMatrix()
	{
		this.mView = Matrix.view(this.position, this.position.add(this.forward,false), this.localUp);
		this.needsUpdate = false;
	}

	updateProjectionMatrix()
	{
		this.mProj = Matrix.perspective(this.fov, this.aspect, this.near, this.far);
		this.needsProjectionUpdate = false;
	}

	updateProjViewMatrix()
	{
		this.mProjView = Matrix.mul(this.mProj, this.mView);

		for (let i = 0; i < this.programs.length; i++)
		{
			this.gl.useProgram(this.programs[i]);
			this.gl.uniformMatrix4fv(this.mProjViewAttribLocations[i], this.gl.FALSE, this.mProjView);
		}
	}

	updatePositions()
	{
		for (let i = 0; i < this.programs.length; i++)
		{
			this.gl.useProgram(this.programs[i]);
			this.gl.uniform3fv(this.positionAttribLocations[i], this.position.toArray());
		}
	}

	update()
	{
		const flag = this.needsUpdate || this.needsProjectionUpdate;
		if (this.needsUpdate)
		{
			if (this.hasRotated)
			{
				this.updateLocalDirections();
			}
			if (this.hasMoved)
			{
				this.updatePositions();
			}
			this.updateViewMatrix();
		}
		if (this.needsProjectionUpdate)
		{
			this.updateProjectionMatrix();
		}
		if (flag)
		{
			this.updateProjViewMatrix();
		}
	}
}