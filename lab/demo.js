
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

	const horseModelData = parseObjText(filemap['horseOBJ']);
	const horseMaterial = new UVMaterial(
		gl,
		uvProgram,
		'horse-texture',
		true, // Flip texture
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
		horseModelData.texcoords, // uv data
		horseMaterial
	);

	const wagonModelData = parseObjText(filemap['wagonOBJ']);
	const wagonMaterial = new UVMaterial(
		gl,
		uvProgram,
		'wood-texture',
		true,
		objDiffuse,
		objSpecular,
		objAmbient,
		objShininess
	);

	const wagon = new UVMesh(
		gl,
		wagonModelData.positions,
		wagonModelData.normals,
		wagonModelData.index,
		wagonModelData.texcoords,
		wagonMaterial
	);

	const npc01poseData = parseObjText(filemap['npc01poseOBJ']);
	const npc01poseMaterial = new UVMaterial(
		gl,
		uvProgram,
		'npc02-texture',
		true,
		objDiffuse,
		objSpecular,
		objAmbient,
		objShininess
	);

	const npc01pose = new UVMesh(
		gl,
		npc01poseData.positions,
		npc01poseData.normals,
		npc01poseData.index,
		npc01poseData.texcoords,
		npc01poseMaterial
	);

	const npc02poseData = parseObjText(filemap['npc02poseOBJ']);
	const npc02poseMaterial = new UVMaterial(
		gl,
		uvProgram,
		'npc02-texture',
		true,
		objDiffuse,
		objSpecular,
		objAmbient,
		objShininess
	);

	const npc02pose = new UVMesh(
		gl,
		npc02poseData.positions,
		npc02poseData.normals,
		npc02poseData.index,
		npc02poseData.texcoords,
		npc02poseMaterial
	);

	const npc03poseData = parseObjText(filemap['npc03poseOBJ']);
	const npc03poseMaterial = new UVMaterial(
		gl,
		uvProgram,
		'npc02-texture',
		true,
		objDiffuse,
		objSpecular,
		objAmbient,
		objShininess
	);

	const npc03pose = new UVMesh(
		gl,
		npc03poseData.positions,
		npc03poseData.normals,
		npc03poseData.index,
		npc03poseData.texcoords,
		npc03poseMaterial
	);

	const mountainData = parseObjText(filemap['mountainOBJ']);
	const mountainMaterial = new UVMaterial(
		gl,
		uvProgram,
		'dirt-texture',
		true,
		objDiffuse,
		objSpecular,
		objAmbient,
		objShininess
	);

	const mountain = new UVMesh(
		gl,
		mountainData.positions,
		mountainData.normals,
		mountainData.index,
		mountainData.texcoords,
		mountainMaterial
	);

	const rocksData = parseObjText(filemap['rocksOBJ']);
	const rocksMaterial = new UVMaterial(
		gl,
		uvProgram,
		'rock-texture',
		true,
		objDiffuse,
		objSpecular,
		objAmbient,
		objShininess
	);

	const rocks = new UVMesh(
		gl,
		rocksData.positions,
		rocksData.normals,
		rocksData.index,
		rocksData.texcoords,
		rocksMaterial
	);

	const treesDeadData = parseObjText(filemap['treesDeadOBJ']);
	const treesDeadMaterial = new UVMaterial(
		gl,
		uvProgram,
		'tree_bark-texture',
		true,
		objDiffuse,
		objSpecular,
		objAmbient,
		objShininess
	);

	const treesDead = new UVMesh(
		gl,
		treesDeadData.positions,
		treesDeadData.normals,
		treesDeadData.index,
		treesDeadData.texcoords,
		treesDeadMaterial
	);

	const treesData = parseObjText(filemap['treesOBJ']);
	const treesMaterial = new UVMaterial(
		gl,
		uvProgram,
		'tree-texture',
		true,
		objDiffuse,
		objSpecular,
		objAmbient,
		objShininess
	);

	const trees = new UVMesh(
		gl,
		treesData.positions,
		treesData.normals,
		treesData.index,
		treesData.texcoords,
		treesMaterial
	);

	const skyboxData = parseObjText(filemap['skyboxOBJ']);
	const skyboxMaterial = new UVMaterial(
		gl,
		uvProgram,
		'skybox-texture',
		true,
		objDiffuse,
		objSpecular,
		objAmbient,
		objShininess
	);

	const skybox = new UVMesh(
		gl,
		skyboxData.positions,
		skyboxData.normals,
		skyboxData.index,
		skyboxData.texcoords,
		skyboxMaterial
	);

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

		wagon.draw();

		npc01pose.draw();
		npc02pose.draw();
		npc03pose.draw();
		mountain.draw();
		rocks.draw();
		treesDead.draw();
		trees.draw();
		skybox.draw();

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
		['horseOBJ', 'models/horse.obj'],
		['npc01poseOBJ', 'models/npc01pose.obj'],
		['npc02poseOBJ', 'models/npc02pose.obj'],
		['npc03poseOBJ', 'models/npc03pose.obj'],
		['mountainOBJ', 'models/terrain.obj'],
		['rocksOBJ', 'models/rocks_placed.obj'],
		['treesDeadOBJ', 'models/trees01_placed.obj'],
		['treesOBJ', 'models/trees02_placed.obj'],
		['skyboxOBJ', 'models/skybox.obj']
	];
	
	const importer = new resourceImporter(imports, RunDemo);
}