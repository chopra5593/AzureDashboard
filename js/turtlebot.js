var canvas, turtle;

var canvasHeight = 600;
var canvasWidth = 600;

var turtleLeft, turtleTop, prevTurtleLeft, prevTurtleTop, turtleAngle, line;

window.onload = function() {
	
  resetVars();

  canvas = new fabric.Canvas('turtlebot');
  canvas.setDimensions({ height: canvasHeight, width: canvasWidth });
  
  turtle = new fabric.Triangle({ 
  
  width: 20, 
  height: 30, 
  fill: 'blue', 
  left: 50, 
  top: 50,
  selectable: false
  
  });
  
  canvas.add(turtle);
  canvas.centerObject(turtle);
  
  window.addEventListener("keydown", window.onkeypress, true);

};

window.onkeypress = function(e) {
	  
	// e = key code of key press
	e = e || window.event;
	
	e.preventDefault();
	
	correctAngle();
	
	switch(e.keyCode)
	{
	// up
	case 38:
	
	  calcNewPosition(38);
	  break;
	  
	// down
	case 40:
	  
	  calcNewPosition(40);
	  break;
	  
	// left
    case 37:
	  
	  turtleAngle -= 5;
	  turtle.set('angle', turtleAngle);
	  
	  break;
	
	//right
    case 39:
	  
	  turtleAngle += 5;
	  turtle.set('angle', turtleAngle);
	  
	  break;
	  
	case 32:
	
	  resetVars();
	  canvas.clear();
	  turtle.set('angle', turtleAngle);
	  canvas.add(turtle);
      canvas.centerObject(turtle);
  
	  break;
	
  }
  
  if(e.keyCode != 32) {
	  
	  canvas.add(line);
	  line.sendToBack();
	  
	  turtle.bringToFront();
	  canvas.renderAll();
  }	  
}

function calcNewPosition(upOrDown) {
	
	prevTurtleLeft = turtleLeft;
	prevTurtleTop = turtleTop;
	    
	switch(upOrDown){
	
	case 38:
	
	turtleLeft += 5*(Math.sin(turtleAngle * (Math.PI/180)));
	turtleTop -= 5*(Math.cos(turtleAngle * (Math.PI/180)));
	
	break;
	
	case 40:
	
	turtleLeft -= 5*(Math.sin(turtleAngle * (Math.PI/180)));
	turtleTop += 5*(Math.cos(turtleAngle * (Math.PI/180)));
	
	break;
	
	}
	
	line = new fabric.Line([prevTurtleLeft, prevTurtleTop, turtleLeft,turtleTop], {
		
	  fill: 'red',
      stroke: 'red',
      strokeWidth: 5,
      selectable: false
		
	});
	
	turtle.set('top', turtleTop);
	turtle.set('left', turtleLeft);
	
}

function correctAngle() {
	
	switch(turtleAngle){
	    
	case -185:
		turtleAngle = 175;
		break;	
	
	case 185:
		turtleAngle = -175;
		break;	
	
	case -180:
		turtleAngle = 180;
		break;
		
	}
}

function resetVars() {
	
    turtleLeft = canvasWidth/2;
	turtleTop = canvasHeight/2;
	prevTurtleLeft = 0;
	prevTurtleTop = 0;
	turtleAngle = 0;	
	
}