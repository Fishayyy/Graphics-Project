class Transform
{
	constructor (position=new Vector(), rotation=new Quaternion(), scale=new Vector(1, 1, 1))
	{
		this.position = Vector.copy(position);
		this.rotation = Quaternion.copy(rotation);
		this.scale = Vector.copy(scale);

		this.mTranslate = Matrix.translation(position);
		this.mRotate = Matrix.rotation(rotation);
		this.mScale = Matrix.scale(scale);

		this.mWorld = Matrix.prod([this.mTranslate, this.mRotate, this.mScale]);
		this.mNormal = Matrix.normal(this.mRotate, this.scale);

		this.hasMoved = false;
		this.hasRotated = false;
		this.hasScaled = false;
		this.needsUpdate = false;
	}

	setPosition(v)
	{
		this.position.set(v.x, v.y, v.z);
		this.hasMoved = true;
		this.needsUpdate = true;
	}

	setRotation(q)
	{
		this.rotation.set(q.w, q.x, q.y, q.z);
		this.hasRotated = true;
		this.needsUpdate = true;
	}

	setScale(v)
	{
		this.scale.set(v.x, v.y, v.z);
		this.hasScaled = true;
		this.needsUpdate = true;
	}

	translate(v)
	{
		this.position.add(v);
		this.hasMoved = true;
		this.needsUpdate = true;
	}

	rotate(q)
	{
		this.rotation.compose(q);
		this.hasRotated = true;
		this.needsUpdate = true;
	}

	localRotate(q)
	{
		this.rotation.localCompose(q);
		this.hasRotated = true;
		this.needsUpdate = true;
	}

	rotateAround(point, rot, lockOrientation=false)
	{
		this.position.subtract(point);
		this.position.rotate(rot);
		this.position.add(point);
		this.hasMoved = true;

		if (!lockOrientation)
		{
			this.rotate(rot);
		}
		this.needsUpdate = true;
	}

	scaleBy(v)
	{
		this.scale.scale(v);
		this.hasScaled = true;
		this.needsUpdate = true;
	}

	updateTranslationMatrix()
	{
		Matrix.translation(this.position, this.mTranslate);
		this.hasMoved = false;
	}

	updateRotationMatrix()
	{
		Matrix.rotation(this.rotation, this.mRotate);
		this.hasRotated = false;
	}

	updateScaleMatrix()
	{
		Matrix.scale(this.scale, this.mScale);
		this.hasScaled = false;
	}

	updateWorldMatrix()
	{
		this.mWorld = Matrix.prod([this.mTranslate, this.mRotate, this.mScale], this.mWorld);
		this.needsUpdate = false;
	}

	updateNormalMatrix()
	{
		Matrix.normal(this.mRotate, this.scale, this.mNormal);
	}

	update()
	{
		if (this.needsUpdate)
		{
			const needsNormalUpdate = this.hasRotated || this.hasScaled;
			if (this.hasMoved)
			{
				this.updateTranslationMatrix();
			}
			if (this.hasRotated)
			{
				this.updateRotationMatrix();
			}
			if (this.hasScaled)
			{
				this.updateScaleMatrix();
			}
			if (needsNormalUpdate)
			{
				this.updateNormalMatrix();
			}
			this.updateWorldMatrix();
		}
	}
}