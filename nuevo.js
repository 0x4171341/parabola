var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');
var graph_in_progress = 'no';
var slope;
var color; 
var drawLineIntervalId;drawGrid();
var y_equals_x_button= document.getElementById('y_equals_x');y_equals_x_button.addEventListener('click',y_equals_xPressed,false);
var parabola_button = document.getElementById('parabola');parabola_button.addEventListener('click',parabolaPressed,false);
var circle_button = document.getElementById('circle');circle_button.addEventListener('click',circlePressed,false);
function drawGrid(){
  var i=0;
  axis_pos = 1;
  can_width = canvas.width;
  for(var i=0;i<=can_width;i+=can_width/8){
    if(i==(can_width)/2){
      ctx.lineWidth=3;
      ctx.strokeStyle = 'red';
    }else{
      ctx.lineWidth=1;
      ctx.strokeStyle= 'black';
    }
    ctx.beginPath();
    ctx.moveTo(i,0);
    ctx.lineTo(i,can_width);
    ctx.stroke();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.moveTo(0,i);
    ctx.lineTo(can_width,i);
    ctx.stroke();
    ctx.closePath();
       
  }
  ctx.font = '20px _sans';
  ctx.textBaseline = 'top';
  ctx.translate((can_width)/2,(can_width)/2);
  for(i=-3;i<=3;i++){
    if(i!=0){
      //hr 
      ctx.fillText(i,i*(can_width/8)+5,5);
      //vertical 
      ctx.fillText(i,5,-i*(can_width/8));        
    }
  }
  ctx.font = 'italic bold 20px _sans';
  ctx.fillText("x",(can_width/2)-12,1);
  ctx.fillText("y",4,-(can_width/2));
  
}

function draw_grid_line(slope,color){
  
  if(graph_in_progress == 'yes'){
    //una linea de tiempo
    alert('Another line is being drawn please wait');
  }else{
    //start with x left edge of the grid
    init_x = -(canvas.width)/2;
    init_y = -(init_x)*slope;
    new_x = init_x;
    new_y = init_y;
    graph_in_progress = "yes";
    drawLineIntervalId = setInterval(do_animation,33);
   }


function do_animation(){
  ctx.lineWidth = 6;
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(init_x,init_y);
  ctx.lineTo(new_x,new_y);
  ctx.stroke();
  ctx.closePath();
  new_x = new_x+5;
  new_y = -(new_x)*slope;
  ctx.lineTo(new_x,new_y);
  if(new_x == canvas.width+5){
    clearInterval(drawLineIntervalId);
    graph_in_progress = "no";
  }
}
}

function y_equals_xPressed(e){
  draw_grid_line(1,"green");
}

function parabolaPressed(e){
  parabola(0.01,0.2,0,"red");
}

function circlePressed(e){
  draw_circle(150,"blue");
}

function draw_circle(radius,color){
  var radius = radius;
  if(graph_in_progress == 'yes'){
    alert('Espere por favor');
  }else{
    init_x = -radius;
    init_y = -Math.sqrt(Math.pow(radius,2)-Math.pow(init_x,2));
    new_x = init_x;
    new_y = init_y;
    graph_in_progress = "yes";
    drawLineIntervalId = setInterval(do_animation_3,33);
  }
  function do_animation_3(){
    ctx.lineWidth = 6;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(init_x,init_y);
  //ctx.lineTo(new_x,new_y);
  ctx.fillRect(init_x,init_y,1,1);
  ctx.fillRect(init_x,-init_y,1,1);
  ctx.stroke();
  ctx.closePath();
  new_x =  new_x+1;
    new_y = -Math.sqrt(Math.pow(radius,2)-Math.pow(new_x,2));
  ctx.fillRect(new_x,new_y,1,1);
  ctx.fillRect(new_x,-new_y,1,1);
  if(new_x == radius+1){
    clearInterval(drawLineIntervalId);
    graph_in_progress = "no";
  }
  }
  
}



function parabola(a,b,c,color){
   if(graph_in_progress == 'yes'){
    //only one line at a time
    alert('Espere por favor');
  }else{
    //start with x left edge of the grid
    init_x = -(canvas.width)/2;
    init_y = -(a*(Math.pow(init_x,2))+b*init_x+c);
    new_x = init_x;
    new_y = init_y;
    graph_in_progress = "yes";
    drawLineIntervalId = setInterval(do_animation_2,33);
   }
  
  function do_animation_2(){
  ctx.lineWidth = 6;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(init_x,init_y);
  //ctx.lineTo(new_x,new_y);
  ctx.fillRect(init_x,init_y,1,1);
  ctx.stroke();
  ctx.closePath();
  new_x =  new_x+1;
  new_y = -(a*(Math.pow(new_x,2))+b*new_x+c);
  //ctx.moveTo(new_x,new_y);
  //ctx.lineTo(new_x,new_y);
  ctx.fillRect(new_x,new_y,1,1);
  if(new_x == canvas.width+5){
    clearInterval(drawLineIntervalId);
    graph_in_progress = "no";
  }
    
  }
}
