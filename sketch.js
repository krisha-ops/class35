var ball;
var position;
var database;


function setup(){
    createCanvas(500,500);
    database = firebase.database();
    var locOfNode = database.ref("ball,position");
    locOfNode.on("value",readOp,showError);

    ball = createSprite(100,100,10,10);
    ball.shapeColor = "red";

    var ballposition = database.ref("ball/position");
    ballposition.on("value",readOp,showError);
}

function draw(){
    background("grey");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function writePosition(x,y){
 database.ref('ball/position').set({
     'x': position.x + x , 
     'y': position.y + y
 })
}

function readOp(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
     console.log("error");
}

