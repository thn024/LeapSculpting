var debugCylinder;

function Lathe(scene, shape)
{
	//this.length = length;
	//this.slices = slices;
	//this.height = height;


                                    //Cylinder is made using (radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded)
	//var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(80, 80, 500, 50, 100, false), new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0xFF3300, specular: 0x555555, shininess: 10 } ) );
      var cylinder = new THREE.Mesh(shape, new THREE.MeshPhongMaterial( { ambient: 0x050505, color: 0xFF3000, specular: 0x555555, shininess: 10 } ) );

      debugCylinder = cylinder;
      console.log("created the debugCylinder");
      debugCylinder.position.y = 100;
      debugCylinder.receiveShadow = true;
      debugCylinder.castShadow = true;
      //cylinder.overdraw = true;
      scene.add(cylinder);
      cylinder.translateY(100);
      cylinder.translateZ(-600);
      //cylinder.rotation.z = Math.PI/2;
      cylinder.material.wireframe = true;
      cylinder.material.vertexColors = THREE.FaceColors;

      this.mesh = cylinder;
      this.yscale = 1;
      this.xscale = 1;

}

Lathe.prototype.scale = function()
{
      this.mesh.scale = new THREE.Vector3(this.yscale, this.yscale, this.yscale);
}

Lathe.prototype.setWidth = function(xval)
{
      this.xscale = xval/80.0;
}


Lathe.prototype.setHeight = function(yval)
{
      this.yscale = yval/50.0;
}