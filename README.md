# Computer Graphics - The Camera

In this lab, you will implement view and projection matrices to be used by a user-controlled camera.

Your goal is to complete [matrix.js](./lab/transform/matrix.js) (search for `TODO`).

When you're done, you should be able to run the project (navigate into the lab repository and run `node server.js`) and see this:

![](./figures/complete.gif)

Moreover, you should be able to control the camera with the following control scheme:

* W : move forward
* A : move left
* S : move backward
* D : move right
* Q : move in the camera's local upward direction
* E : move in the camera's local downward direction
* Up : turn up
* Down : turn down
* Right : turn right
* Left : turn left

You do not need to implement the control scheme (check out the [cameras/fpsCamera.js](./lab/cameras/fpsCamera.js) if you want to edit it). You should move around a bit and ensure that the camera keeps working as you change position and orientation.

When you're done, you can optionally complete the orthographic projection in [matrix.js](./lab/transform/matrix.js) and modify (and rename) [cameras/perspectiveCamera.js](./lab/cameras/perspectiveCamera.js) to allow users to change the projection transform.
