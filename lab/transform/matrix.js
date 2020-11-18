class Matrix
{
	static identity(target=null)
	{
		if (target === null)
		{
			return new Float32Array([
				1, 0, 0, 0,
				0, 1, 0, 0,
				0, 0, 1, 0,
				0, 0, 0, 1
			]);
		}

		// is this even faster than loops or am I wasting time hard-coding this? /shrug
		target[0]=target[5]=target[10]=target[15] = 1;
		target[1]=target[2]=target[3]=target[4]=
			target[5]=target[6]=target[7]=target[8]=target[9]=
			target[11]=target[12]=target[13]=target[14]=0;
		return target;
	}

	static mul(mat1, mat2, target=null)
	{
		if (target === null)
		{
			return new Float32Array([
				mat1[0]*mat2[0]  + mat1[4]*mat2[1]  + mat1[8]*mat2[2]   + mat1[12]*mat2[3],
                mat1[1]*mat2[0]  + mat1[5]*mat2[1]  + mat1[9]*mat2[2]   + mat1[13]*mat2[3],
                mat1[2]*mat2[0]  + mat1[6]*mat2[1]  + mat1[10]*mat2[2]  + mat1[14]*mat2[3],
                mat1[3]*mat2[0]  + mat1[7]*mat2[1]  + mat1[11]*mat2[2]  + mat1[15]*mat2[3],
                mat1[0]*mat2[4]  + mat1[4]*mat2[5]  + mat1[8]*mat2[6]   + mat1[12]*mat2[7],
                mat1[1]*mat2[4]  + mat1[5]*mat2[5]  + mat1[9]*mat2[6]   + mat1[13]*mat2[7],
                mat1[2]*mat2[4]  + mat1[6]*mat2[5]  + mat1[10]*mat2[6]  + mat1[14]*mat2[7],
                mat1[3]*mat2[4]  + mat1[7]*mat2[5]  + mat1[11]*mat2[6]  + mat1[15]*mat2[7],
                mat1[0]*mat2[8]  + mat1[4]*mat2[9]  + mat1[8]*mat2[10]  + mat1[12]*mat2[11],
                mat1[1]*mat2[8]  + mat1[5]*mat2[9]  + mat1[9]*mat2[10]  + mat1[13]*mat2[11],
                mat1[2]*mat2[8]  + mat1[6]*mat2[9]  + mat1[10]*mat2[10] + mat1[14]*mat2[11],
                mat1[3]*mat2[8]  + mat1[7]*mat2[9]  + mat1[11]*mat2[10] + mat1[15]*mat2[11],
                mat1[0]*mat2[12] + mat1[4]*mat2[13] + mat1[8]*mat2[14]  + mat1[12]*mat2[15],
                mat1[1]*mat2[12] + mat1[5]*mat2[13] + mat1[9]*mat2[14]  + mat1[13]*mat2[15],
                mat1[2]*mat2[12] + mat1[6]*mat2[13] + mat1[10]*mat2[14] + mat1[14]*mat2[15],
                mat1[3]*mat2[12] + mat1[7]*mat2[13] + mat1[11]*mat2[14] + mat1[15]*mat2[15]
            ]);
		}

		target[0]  = mat1[0]*mat2[0]  + mat1[4]*mat2[1]  + mat1[8]*mat2[2]   + mat1[12]*mat2[3];
		target[1]  = mat1[1]*mat2[0]  + mat1[5]*mat2[1]  + mat1[9]*mat2[2]   + mat1[13]*mat2[3];
		target[2]  = mat1[2]*mat2[0]  + mat1[6]*mat2[1]  + mat1[10]*mat2[2]  + mat1[14]*mat2[3];
		target[3]  = mat1[3]*mat2[0]  + mat1[7]*mat2[1]  + mat1[11]*mat2[2]  + mat1[15]*mat2[3];
		target[4]  = mat1[0]*mat2[4]  + mat1[4]*mat2[5]  + mat1[8]*mat2[6]   + mat1[12]*mat2[7];
        target[5]  = mat1[1]*mat2[4]  + mat1[5]*mat2[5]  + mat1[9]*mat2[6]   + mat1[13]*mat2[7];
        target[6]  = mat1[2]*mat2[4]  + mat1[6]*mat2[5]  + mat1[10]*mat2[6]  + mat1[14]*mat2[7];
        target[7]  = mat1[3]*mat2[4]  + mat1[7]*mat2[5]  + mat1[11]*mat2[6]  + mat1[15]*mat2[7];
        target[8]  = mat1[0]*mat2[8]  + mat1[4]*mat2[9]  + mat1[8]*mat2[10]  + mat1[12]*mat2[11];
        target[9]  = mat1[1]*mat2[8]  + mat1[5]*mat2[9]  + mat1[9]*mat2[10]  + mat1[13]*mat2[11];
        target[10] = mat1[2]*mat2[8]  + mat1[6]*mat2[9]  + mat1[10]*mat2[10] + mat1[14]*mat2[11];
        target[11] = mat1[3]*mat2[8]  + mat1[7]*mat2[9]  + mat1[11]*mat2[10] + mat1[15]*mat2[11];
        target[12] = mat1[0]*mat2[12] + mat1[4]*mat2[13] + mat1[8]*mat2[14]  + mat1[12]*mat2[15];
        target[13] = mat1[1]*mat2[12] + mat1[5]*mat2[13] + mat1[9]*mat2[14]  + mat1[13]*mat2[15];
        target[14] = mat1[2]*mat2[12] + mat1[6]*mat2[13] + mat1[10]*mat2[14] + mat1[14]*mat2[15];
        target[15] = mat1[3]*mat2[12] + mat1[7]*mat2[13] + mat1[11]*mat2[14] + mat1[15]*mat2[15];
        return target;
	}

	static prod(mats, target=null)
	{
		let mat = mats[0];
		for (let i = 1; i < mats.length; i++)
		{
			mat = Matrix.mul(mat, mats[i], target);
		}
		return mat;
	}

	static translation(vector, target=null)
	{
		if (target === null)
		{
			return new Float32Array([
				1,        0,        0,        0,
				0,        1,        0,        0,
				0,        0,        1,        0, 
				vector.x, vector.y, vector.z, 1
			]);
		}

		target[0]=target[5]=target[10]=target[15] = 1;
		target[1]=target[2]=target[3]=target[4]=target[6]=target[7]=target[8]=target[9]=target[11]=0;
		target[12] = vector.x;
		target[13] = vector.y;
		target[14] = vector.z;
		return target;
	}

	static rotation(quat, target=null)
	{
		const v1 = new Vector(1, 0, 0);
		const v2 = new Vector(0, 1, 0);
		const v3 = new Vector(0, 0, 1);

		v1.rotate(quat);
		v2.rotate(quat);
		v3.rotate(quat);

		if (target === null)
		{
			return new Float32Array([
				v1.x, v1.y, v1.z, 0,
				v2.x, v2.y, v2.z, 0,
				v3.x, v3.y, v3.z, 0,
				0,    0,    0,    1
			]);
		}

		target[0]  = v1.x;
		target[1]  = v1.y;
		target[2]  = v1.z;
		target[4]  = v2.x;
		target[5]  = v2.y;
		target[6]  = v2.z;
		target[8]  = v3.x;
		target[9]  = v3.y;
		target[10] = v3.z;
		target[15] = 1;
		target[3]=target[7]=target[11]=target[12]=target[13]=target[14] = 0;
		return target;
	}

	static scale(vector, target=null)
	{
		if (target === null)
		{
			return new Float32Array([
				vector.x, 0,        0,        0,
				0,        vector.y, 0,        0,
				0,        0,        vector.z, 0,
				0,        0,        0,        1
			]);
		}

		target[0]=vector.x;
		target[5]=vector.y;
		target[10]=vector.z;
		target[15] = 1;
		target[1]=target[2]=target[3]=target[4]=
			target[6]=target[7]=target[8]=target[9]=
			target[11]=target[12]=target[13]=target[14]=0;
		return target;
	}

	// R is 4x4 padded rotation, scale is 3D vector, target/return is 3x3 normal transform.
	// if scale components are 0, /shrug guess they're 1 now. You call it lazy, I call it robust ;)
	static normal(R, scale, target=null)
	{
		const x = (scale.x == 0 ? 1 : 1/scale.x);
		const y = (scale.y == 0 ? 1 : 1/scale.y);
		const z = (scale.z == 0 ? 1 : 1/scale.z);
		if (target === null)
		{
			return new Float32Array([
				R[0]*x, R[1]*x, R[2]*x,
				R[4]*y, R[5]*y, R[6]*y,
				R[8]*z, R[9]*z, R[10]*z
			]);
		}

		target[0] = R[0]*x;
		target[1] = R[1]*x;
		target[2] = R[2]*x;
		target[3] = R[4]*y;
		target[4] = R[5]*y;
		target[5] = R[6]*y;
		target[6] = R[8]*z;
		target[7] = R[9]*z;
		target[8] = R[10]*z;
		return target;
	}

	static view(eye, target, up)
	{
		// TODO
	}

	static perspective(viewRadians=Math.PI/4, aspect=1, near=0.01, far=1000.0)
	{
		// TODO
	}

	static orthographic(left=-2, right=2, bottom=-2, top=2, near=0.1, far=1000.0)
	{
		// TODO (optional)
	}

	static equals(mat1, mat2)
	{
		if (! mat1 instanceof Float32Array || ! mat2 instanceof Float32Array 
			|| mat1.length != 16 || mat2.length != 16)
		{
			console.log("%cInvalid inputs for Matrix.equals.","color:red");
			return false;
		}

		let threshold = 0.001;
		for (let i = 0; i < 16; i++)
		{
			if (Math.abs(mat1[i]-mat2[i]) > threshold)
			{
				return false;
			}
		}
		return true;
	}
}