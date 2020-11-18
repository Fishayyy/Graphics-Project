class RGBMesh extends Mesh
{
	constructor(gl, positionArray, normalArray, indexArray, material, position=new Vector(), rotation=new Quaternion(), scale=new Vector(1,1,1))
	{
		super(gl, positionArray, normalArray, indexArray, material, position, rotation, scale);
	}
}