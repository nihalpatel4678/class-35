var ball;
var position;
var database;

function setup(){
    createCanvas(500,500);
    database = firebase.database()
    //that here we are creating a database from firebase console and storing inside a variable
var location = database.ref('ball/position')
//.ref is used to refer to the location inside the database
location.on("value",readop,showError)
//.on is a listener which is reading the values from database continously
//"value" is a predefined string which we need to give everytime when we write .on function
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
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
    //here we are updating the ball's position in database 
    //.set function is used to write into the database
    database.ref('ball/position').set({
        x : ball.x + x,
        y :ball.y + y , 
        
    })
    
}
function readop(data){
    // data is a parameter which means we can store some value inside it since we are reading the values so we need to
    // update the position of the ball according to it
position = data.val()
//data.val()is a predefined function which extracts the value from database
ball.x = position.x
ball.y = position.y
}
function showError(){
    console.log("error")
}