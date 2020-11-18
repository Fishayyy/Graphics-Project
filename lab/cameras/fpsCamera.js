class FPSCamera extends PerspectiveCamera
{
	constructor(gl, programArray=[], aspect=1, viewRadians=Math.PI/4, near=0.01, far=1000.0, moveSpeed=0.1, turnSpeed=0.015, position=new Vector(), rotation=new Quaternion())
	{
		super(gl, programArray, aspect, viewRadians, near, far, position, rotation);

		this.moveSpeed = moveSpeed;
		this.turnSpeed = turnSpeed;

		// bind event handlers for user input
		window.addEventListener("keydown", event => this.onKeyDown(event));
		window.addEventListener("keyup", event => this.onKeyUp(event));

		// trackers for 2d rotation (no "roll" ==> no z rotation)
		this.rotX = 0;
		this.rotY = 0;
		this.rotLimitX = Math.PI / 2;
		this.rotLimitY = Math.PI;
		this.setRots();

		// wasd qe "is pressed down"
		this.W = false;
		this.A = false;
		this.S = false;
		this.D = false;
		this.Q = false;
		this.E = false;

		// arrow keys "is pressed down"
		this.L = false;
		this.U = false;
		this.R = false;
		this.Do = false;

		// keycodes wasd qe
		this.keycodeW = 87;
		this.keycodeA = 65;
		this.keycodeS = 83;
		this.keycodeD = 68;
		this.keycodeQ = 81;
		this.keycodeE = 69;

		// keycodes arrow keys
		this.keycodeL = 37;
		this.keycodeU = 38;
		this.keycodeR = 39;
		this.keycodeDo = 40;
	}

	onKeyDown(event)
	{
		switch (event.keyCode)
		{
			case this.keycodeW:
				this.W = true;
				break;
			case this.keycodeA:
				this.A = true;
				break;
			case this.keycodeS:
				this.S = true;
				break;
			case this.keycodeD:
				this.D = true;
				break;
			case this.keycodeQ:
				this.Q = true;
				break;
			case this.keycodeE:
				this.E = true;
				break;
			case this.keycodeL:
				this.L = true;
				break;
			case this.keycodeU:
				this.U = true;
				break;
			case this.keycodeR:
				this.R = true;
				break;
			case this.keycodeDo:
				this.Do = true;
				break;
			default:
				break;
		}
	}

	onKeyUp(event)
	{
		switch (event.keyCode)
		{
			case this.keycodeW:
				this.W = false;
				break;
			case this.keycodeA:
				this.A = false;
				break;
			case this.keycodeS:
				this.S = false;
				break;
			case this.keycodeD:
				this.D = false;
				break;
			case this.keycodeQ:
				this.Q = false;
				break;
			case this.keycodeE:
				this.E = false;
				break;
			case this.keycodeL:
				this.L = false;
				break;
			case this.keycodeU:
				this.U = false;
				break;
			case this.keycodeR:
				this.R = false;
				break;
			case this.keycodeDo:
				this.Do = false;
				break;
			default:
				break;
		}
	}

	move()
	{
		// left/right
		let dx = 0;
		if (this.A)
		{
			dx -= 1;
		}
		if (this.D)
		{
			dx += 1;
		}

		dx *= this.moveSpeed;
		dx = this.localRight.scale(new Vector(dx, dx, dx), false);

		// up/down
		let dy = 0;
		if (this.Q)
		{
			dy -= 1;
		}
		if (this.E)
		{
			dy += 1;
		}

		dy *= this.moveSpeed;
		dy = this.localUp.scale(new Vector (dy, dy, dy), false);

		// forward/back
		let dz = 0;
		if (this.W)
		{
			dz += 1;
		}
		if (this.S)
		{
			dz -= 1;
		}

		dz *= this.moveSpeed;
		dz = this.forward.scale(new Vector(dz, dz, dz), false);

		dx.add(dy);
		dx.add(dz);
		this.translate(dx);
	}

	turn()
	{
		let dy = 0;
		if (this.L)
		{
			dy += 1;
		}
		if (this.R)
		{
			dy -= 1;
		}

		dy *= this.turnSpeed;

		let dx = 0;
		if (this.U)
		{
			dx += 1;
		}
		if (this.Do)
		{
			dx -= 1;
		}

		dx *= this.turnSpeed;

		if (dx != 0 || dy != 0)
		{
			this.rotX += dx;
			if (this.rotX > this.rotLimitX)
			{
				this.rotX = this.rotLimitX;
			}
			else if (this.rotX < -this.rotLimitX)
			{
				this.rotX = -this.rotLimitX;
			}

			this.rotY += dy;
			if (this.rotY > this.rotLimitY)
			{
				this.rotY -= 2*this.rotLimitY
			}
			else if(this.rotY < -this.rotLimitY)
			{
				this.rotY += 2*this.rotLimitY;
			}

			const rot = new Quaternion(this.rotX, 1, 0, 0);
			rot.compose(new Quaternion(this.rotY, 0, 1, 0));

			this.setRotation(rot);
		}
	}

	update()
	{
		this.move();
		this.turn();
		super.update();
	}

	lookAt(target, up=this.localUp)
	{
		super.lookAt(target, up);
		this.setRots();
	}

	setRots() // assumes no roll has been applied; deletes any roll that has been applied
	{
		const sinX = -this.forward.y;
		this.rotX = -Math.asin(sinX);
		const cosX = Math.sqrt(1 - sinX * sinX);
		if (Math.abs(cosX) < 0.01)
		{
			this.rotY = -Math.asin(this.localUp.x / sinX);
			if (this.localUp.z < 0)
			{
				if (-this.forward.y < 0)
				{
					this.rotY = Math.PI - this.rotY;
				}
			}
			else
			{
				if (-this.forward.y > 0)
				{
					this.rotY = Math.PI - this.rotY;
				}
			}
		}
		else
		{
			this.rotY = Math.asin(-this.forward.x / cosX);
			if (-this.forward.z < 0)
			{
				this.rotY = Math.PI - this.rotY;
			}
		}
	}
}


