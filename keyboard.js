document.addEventListener('keydown',function(e){
    var key = e.keyCode || e.which; // some browsers using keyCode,some which
    //1 button
    if(key == 49){
         if(sculptingMode == MODES.PULL)
         {
         	console.log("PUSH MODE");
         	sculptingMode = MODES.PUSH;
         }
         else if(sculptingMode == MODES.PUSH)
         {
         	console.log("PULL MODE");
         	sculptingMode = MODES.PULL;
         }
    }
    else
    {
    	console.log("key :: " + key);
    }
});