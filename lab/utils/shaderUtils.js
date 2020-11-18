const createVertexShader = function (gl, inputText)
{
	const shader = gl.createShader(gl.VERTEX_SHADER);
	gl.shaderSource(shader, inputText);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
	{
		console.error('Cannot compile vertex shader.', gl.getShaderInfoLog(shader));
		return;
	}
	return shader;
}

const createFragmentShader = function(gl, inputText)
{
	const shader = gl.createShader(gl.FRAGMENT_SHADER);
	gl.shaderSource(shader, inputText);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
	{
		console.error('Cannot compile fragment shader.', gl.getShaderInfoLog(shader));
		return;
	}
	return shader;
}

const createProgram = function(gl, vertexShaderText, fragmentShaderText)
{
	const vertexShader = createVertexShader(gl, vertexShaderText);
	const fragmentShader = createFragmentShader(gl, fragmentShaderText);
	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS))
	{
		console.error('Cannot link GL program.', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('Cannot validate GL program.', gl.getProgramInfoLog(program));
		return;
	}
	return program;
}