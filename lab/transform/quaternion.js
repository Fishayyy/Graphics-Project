class Quaternion
{
	constructor(theta=0, x=1, y=0, z=0, normalized=false)
	{
		const halfTheta = theta / 2;
		const sin = Math.sin(halfTheta);

		this.w = Math.cos(halfTheta);
		this.x = sin * x;
		this.y = sin * y;
		this.z = sin * z;

		if (!normalized)
		{
			const axisLength = Math.sqrt(x*x + y*y + z*z);
			this.x /= axisLength;
			this.y /= axisLength;
			this.z /= axisLength;
		}
	}

	set(w, x, y, z)
	{
		this.w = w;
		this.x = x;
		this.y = y;
		this.z = z;
	}

	inverse()
	{
		const inv = new Quaternion();
		inv.set(this.w, -this.x, -this.y, -this.z);
		return inv;
	}

	compose(q, inplace=true, renormalize=true) // multiply the input on the left (i.e. get q * this)
	{
		const w = q.w * this.w - q.x * this.x - q.y * this.y - q.z * this.z;
		const x = q.w * this.x + q.x * this.w + q.y * this.z - q.z * this.y;
		const y = q.w * this.y - q.x * this.z + q.y * this.w + q.z * this.x;
		const z = q.w * this.z + q.x * this.y - q.y * this.x + q.z * this.w;
		
		if (inplace)
		{
			this.w = w;
			this.x = x;
			this.y = y;
			this.z = z;
			if (renormalize)
			{
				this.renormalize();
			}
		}
		else
		{
			const result = new Quaternion();
			result.set(w, x, y, z);
			if (renormalize)
			{
				result.renormalize();
			}
			return result;
		}
	}

	applyRotation(q) // this * q * this.inverse(), i.e. apply this quaternion to another
	{
		return Quaternion.composition([this.inverse(), q, this]);
	}

	localCompose(q, inplace=true) // treat q as local, convert to global (by applying this rotation to it), then compose
	{
		let q2 = this.applyRotation(q);
		if (inplace)
		{
			this.compose(q2);
			this.renormalize();
		}
		else
		{
			q2 = this.compose(q2, false);
			q2.renormalize();
			return q2;
		}	
	}

	renormalize()
	{
		const w = this.w;
		const s = Math.sqrt(1 - this.w*this.w);
		const a = Vector.fromQuaternion(this).normalize(false);
		this.set(w, a.x*s, a.y*s, a.z*s);
	}

	toString()
	{
		return "Quaternion ("+this.w.toString()+", "+this.x.toString()+", "+this.y.toString()+", "+this.z.toString()+")";
	}

	static fromVector(v)
	{
		const pureQuat = new Quaternion();
		pureQuat.set(0, v.x, v.y, v.z);
		return pureQuat;
	}

	static composition(quats) // given q1, q2, q3 returns q3 * q2 * q1
	{
		const result = new Quaternion();
		for (let i = 0; i < quats.length; i++)
		{
			result.compose(quats[i], true, false);
		}
		return result;
	}

	static equals(q1, q2)
	{
		if (! q1 instanceof Quaternion || ! q2 instanceof Quaternion)
		{
			console.log("%cInvalid inputs for Quaternion.equals.","color:red");
			return false;
		}

		const threshold = 0.001;

		if (Math.abs(q1.w - q2.w) > threshold || isNaN(Math.abs(q1.w - q2.w)))
		{
			return false;
		}
		
		if (Math.abs(q1.x - q2.x) > threshold || isNaN(Math.abs(q1.x - q2.x)))
		{
			return false;
		}
		
		if (Math.abs(q1.y - q2.y) > threshold || isNaN(Math.abs(q1.y - q2.y)))
		{
			return false;
		}
		
		if (Math.abs(q1.z - q2.z) > threshold || isNaN(Math.abs(q1.z - q2.z)))
		{
			return false;
		}

		return true;
	}

	static copy (q)
	{
		const copy = new Quaternion();
		copy.set(q.w,q.x,q.y,q.z);
		return copy;
	}
}