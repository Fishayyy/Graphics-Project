
const RunDemo = function (filemap)
{
	console.log("Initializing Demo");

	// get canvas, set dimensions to fill browser window
	const canvas = document.getElementById('the_canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	// get WebGL context, confirm...
	const gl = canvas.getContext('webgl');

	if (!gl)
	{
		console.log('Browser is using experimental webgl.');
		gl = canvas.getContext('experimental-webgl');
	}

	if (!gl) {
		alert('This requires a browser which supports WebGL; Yours does not.');
	}

	// set background color and clear
	gl.clearColor(0.5, 0.5, 0.5, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// set up culling via depth and back face, set front face to CCW
	gl.enable(gl.DEPTH_TEST);
	gl.enable(gl.CULL_FACE);
	gl.frontFace(gl.CCW);
	gl.cullFace(gl.BACK);

	// create shaders
	const uvProgram = createProgram(
		gl, 
		filemap['uvVertShaderText'],
		filemap['uvFragShaderText']
	);

	const rgbProgram = createProgram(
		gl, 
		filemap['rgbVertShaderText'],
		filemap['rgbFragShaderText']
	);

	const shaders = [
		uvProgram,
		rgbProgram
	];

	// set up camera
	const aspect = canvas.width / canvas.height;
	const fieldOfView = Math.PI / 4;
	const nearClip = 0.01;
	const farClip = 1000.0;
	const camera = new FPSCamera(
		gl,
		shaders,
		aspect,
		fieldOfView,
		nearClip,
		farClip
	);
	camera.translate(new Vector(5, 3, 7));
	camera.lookAt(new Vector(), new Vector(0, 1, 0));

	// set ambient light parameters
	const ambientLight = new Vector(0.4, 0.5, 0.4);

	// set up point lights' parameters
	const pointLightPosition = new Vector(0, 0, 0);
	const pointLightDiffuse = new Vector(1, 1, 4);
	const pointLightSpecular = new Vector(1, 4, 1);

	// use light manager to create lights
	const lightManager = new LightManager(gl, shaders, ambientLight);
	lightManager.addPointLight(pointLightPosition, pointLightDiffuse, pointLightSpecular);
	lightManager.addPointLight(pointLightPosition, pointLightDiffuse, pointLightSpecular);
	lightManager.update();

	// rgb emerald material properties
	const emeraldDiffuse = new Vector(0.07568, 0.61424, 0.07568);
	const emeraldSpecular = new Vector(0.633, 0.727811, 0.633);
	const emeraldAmbient = new Vector(0.0215, 0.1745, 0.0215);
	const emeraldShininess = 0.6;

	// create material with emerald properties
	const emeraldMaterial = new RGBMaterial(
		gl,
		rgbProgram,
		emeraldDiffuse,
		emeraldSpecular,
		emeraldAmbient,
		emeraldShininess
	);

	// create emerald monkey head
	const suzyModelData = parseObjText(filemap['suzyOBJ'])
	const emeraldSuzy = new RGBMesh(
		gl,
		suzyModelData.positions, suzyModelData.normals,
		suzyModelData.index,
		emeraldMaterial
	);

	emeraldSuzy.translate(new Vector(-2, 0, 0));


	// textured earth material properties
	const objDiffuse = 1.0;
	const objSpecular = 1.0;
	const objAmbient = 1.0;
	const objShininess = 1.0;

	const horseModelData = parseObjText(filemap['horseOBJ'])
	const horseMaterial = new UVMaterial(
		gl,
		uvProgram,
		'horse-texture',
		true,
		objDiffuse,
		objSpecular,
		objAmbient,
		objShininess
	);

	const horse = new UVMesh(
		gl,
		horseModelData.positions,
		horseModelData.normals,
		horseModelData.index,
		horseModelData.texcoords,
		horseMaterial
	);

	// // create material for earth
	// const earthMaterial = new UVMaterial(
	// 	gl,
	// 	uvProgram,
	// 	'earth-texture',
	// 	false,
	// 	earthDiffuse,
	// 	earthSpecular,
	// 	earthAmbient,
	// 	earthShininess
	// );

	// // create textured earth (sphere)
	// const uvEarth = new UVMesh(
	// 	gl,
	// 	Sphere.positionArray(30,30),
	// 	Sphere.positionArray(30,30),
	// 	Sphere.indexArray(30,30),
	// 	Sphere.uvArray(30,30),
	// 	earthMaterial
	// );

	// uvEarth.translate(new Vector(2, 0, 0));

	// set up models to follow point lights
	const lightSuzy1 = new RGBMesh(
		gl,
		suzyModelData.positions, suzyModelData.normals,
		suzyModelData.index,
		emeraldMaterial
	);

	lightSuzy1.setScale(new Vector(0.1, 0.1, 0.1));

	const lightSuzy2 = new RGBMesh(
		gl,
		suzyModelData.positions, suzyModelData.normals,
		suzyModelData.index,
		emeraldMaterial
	);

	lightSuzy2.setScale(new Vector(0.1, 0.1, 0.1));

	// set up some arbitrary constants for motion
	const startTime = Date.now();
	let time;
	let k_theta = 1/1000;
	let k_alpha = 1/3101;
	let hr = 5;
	let vr = 2;
	let theta;
	let alpha;
	let cosTheta;
	let lightPosition;

	var main = function()
	{
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

		time = Date.now() - startTime;
		theta = time * k_theta;
		alpha = time * k_alpha;
		cosTheta = Math.cos(theta);

		lightPosition = new Vector(
			hr*cosTheta*Math.sin(alpha),
			vr*Math.sin(2*theta),
			vr*cosTheta*Math.cos(alpha)
		);

		lightManager.pointLights[0].setPosition(lightPosition);
		lightManager.pointLights[1].setPosition(lightPosition.inverse());
		lightManager.update();

		camera.update();

		lightSuzy1.setPosition(lightPosition);
		lightSuzy1.draw();

		lightSuzy2.setPosition(lightPosition.inverse());
		lightSuzy2.draw();

		horse.draw();

		requestAnimationFrame(main);
	}
	requestAnimationFrame(main);
}

var InitDemo = function()
{
	const imports = [
		['uvVertShaderText', 'shaders/vert.uv.glsl'],
		['uvFragShaderText', 'shaders/frag.uv.glsl'],
		['rgbVertShaderText', 'shaders/vert.rgb.glsl'],
		['rgbFragShaderText', 'shaders/frag.rgb.glsl'],
		['suzyOBJ', 'models/suzy.obj'],
		['sceneOBJ', 'models/scene.obj'],
		['wagonOBJ', 'models/wagon.obj'],
		['horseOBJ', 'models/horse.obj']
	];
	
	const importer = new resourceImporter(imports, RunDemo);
}