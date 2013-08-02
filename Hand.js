
/**
*@constructor
**/
function Hand(scene)
{
	this.palm = new THREE.Mesh(new THREE.CubeGeometry(30,30,30),
		new THREE.MeshBasicMaterial({ color : new THREE.Color(0xFFFFFF) }));
	this.palm.material.color.setRGB(Math.random(), Math.random(), Math.random());
	this.palmNormal = new THREE.Vector3();
	this.side = null;
	this.fingers = {};
	this.fingerDirections = {};
	this.palmRay = null;
	this.scene = scene;
	this.rotationProgress = 0.0;
	this.currentDirection = null;
	this.rayCaster = new THREE.Raycaster();
	this.openPalm = false;
	this.selectionCounter = 0;
	this.noFingers = false;

}

Hand.prototype.update = function(camera, frame)
{

	
	


};

Hand.prototype.setSide = function(side)
{
	this.side = side;
	//set to right side
	if(side == 1)
	{
		this.palm.material.color.setRGB(0, 0, 1);
	}
	if(side == 0)
	{
		this.palm.material.color.setRGB(0, 1, 0);
	}
};
/**
* Things to do when hand is removed from scene
**/
Hand.prototype.onRemove = function()
{

	//remove your fingers
	for(fingers in this.fingers)
	{
		this.scene.remove(this.fingers[fingers].mesh);
		this.scene.remove(this.fingers[fingers].ray);
		delete this.fingers[fingers];
	}

	//remove your hand
	this.scene.remove(this.palm);
	this.scene.remove(this.palmRay);
};

var fingerD;

Hand.prototype.updateFingers = function(fingerArray)
{
	var currentLongestMagntitude = -1;
	this.currentDirection = null;
	var currentFinger = null;

	var leftMax = 9999;
	var rightMax = -9999;

	dg = this.fingers;


	/*
	set some simple flags:
	theres more than 3 fingers: set openPalm flag
	less than 2 fingers: set noFingers flag	
	*/
	if(fingerArray.length >= 3)
	{
		this.openPalm = true;
		this.noFingers = false;
	}
	else if(fingerArray.length <= 1)
	{

		this.noFingers = true;
	}
	else
	{
		this.openPalm = false;
		this.noFingers = false;
	}

	for(fingerId in fingerArray)
	{


		//console.log("something in here");
		//If the current finger is not in our data structure, we should add it into that index of the data structure
		if(this.fingers[fingerId] == undefined)
		{
			//console.log("undefined finger");
			//console.log(fingerId);
			this.fingers[fingerId] = new Finger();
			scene.add(this.fingers[fingerId].mesh);
			scene.add(this.fingers[fingerId].ray);
		}
		var pointable = fingerArray[fingerId];
		var posX = (pointable.tipPosition[0]*1.5);
		var posY = (pointable.tipPosition[2]*1)-600;//-200;
		var posZ = (pointable.tipPosition[1]*1)-200;//-400;
		var dirX = (pointable.direction[0]);
		var dirY = (pointable.direction[1]);
		var dirZ = (pointable.direction[2]);
		//console.log(pointable.direction);

		var tempMag = Math.sqrt(Math.pow(this.palm.position.x - posX, 2) + Math.pow(this.palm.position.y - posY, 2) + Math.pow(this.palm.position.z - posZ, 2));
		
		

		if(tempMag > currentLongestMagntitude)
		{
			currentFinger = this.fingers[fingerId];
			//this.currentDirection = new THREE.Vector3(dirX, dirY, dirZ);
			this.currentDirection = new THREE.Vector3(posX, posZ, posY);
			currentLongestMagntitude = tempMag;
			//console.log(this.fingerDirections[fingerId]);
		}
		//console.log(posX, posY, posZ);

		this.fingers[fingerId].position = new THREE.Vector3(posX, posZ, posY);
		this.fingers[fingerId].direction = new THREE.Vector3(dirX, dirY, dirZ);
		
		this.fingers[fingerId].mesh.position = this.fingers[fingerId].position;


		//this.fingers[fingerId].position = camera.matrix.multiplyVector3(this.fingers[fingerId].position);
		//console.log("id :: " + fingerId + " :: " + this.fingers[fingerId].position.x + " "  + this.fingers[fingerId].position.y + " " + this.fingers[fingerId].position.z);




	}

	for(fingerId in this.fingers)
	{
		if(fingerArray[fingerId] == undefined)
		{
			scene.remove(this.fingers[fingerId].mesh);
			scene.remove(this.fingers[fingerId].ray)
			delete this.fingers[fingerId];
		}

		
	}


	//apply the matrix rotations and stuff to the positions and rotations afterwards!


	var matrix = new THREE.Matrix4();
	matrix.identity();
	matrix.makeRotationY(camera.rotation.y);
	var matrix2 = new THREE.Matrix4();
	matrix2.identity();
	matrix2.makeTranslation(camera.position);

	matrix = camera.matrix;
	matrix3 = new THREE.Matrix4();

	camera.matrix.extractRotation(matrix3);
	//multiplies palm position by camera rotation matrix

	this.palm.position = matrix.multiplyVector3(this.palm.position);
	//this.updateFingers(this.fingers);
	//this.palm.position = matrix.multiplyVector3(this.palm.position);
	


	for(finger in this.fingers)
	{
		this.fingers[finger].position = matrix.multiplyVector3(this.fingers[finger].position);
		//this.fingers[finger].direction = matrix3.multiplyVector3(this.fingers[finger].direction);
		this.fingers[finger].update();
	//this.fingers[finger].position = matrix.multiplyVector3(this.fingers[finger].position);
	}

};