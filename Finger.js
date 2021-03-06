function Finger(scene)
{
	this.mesh = new THREE.Mesh(	new THREE.SphereGeometry(10,10,10),
								new THREE.MeshBasicMaterial({ 	color : new THREE.Color(0xFFFFFF)}));
	this.boundMesh = new THREE.Mesh(	new THREE.SphereGeometry(30,10,10),
								new THREE.MeshBasicMaterial({ 	color : new THREE.Color(0xFFFFFF),
																transparent: true, opacity: 0.5 }));
	//this.mesh.add(this.boundMesh);
	this.mesh.material.color.setRGB(Math.random(), Math.random(), Math.random());
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;
	this.direction = new THREE.Vector3(0,0,0);
	this.position = new THREE.Vector3(0,0,0);

	
	var material = new THREE.LineBasicMaterial({ color: 0xFFFFFF });
    var geometry = new THREE.Geometry();
	geometry.vertices.push(this.position);
	geometry.vertices.push(new THREE.Vector3(0,1000,0));
	this.ray = new THREE.Line(geometry, material);

    
}

Finger.prototype.update = function()
{
	//console.log(this.position.clone());
	
	this.ray.geometry.vertices[0] = this.mesh.position.clone();
	this.ray.geometry.vertices[1] = this.position.clone().addSelf(this.direction.clone().multiplyScalar(30));
	this.ray.geometry.verticesNeedUpdate = true;
}