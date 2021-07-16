song = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreLeftWrist = 0;

function preload() {
    song = loadSound("music.mp3");
    console.log("Preload function called");
}
function setup() {
    canvas = createCanvas(600,400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    console.log("Setup function called");
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on("pose",gotPoses);
}

function modelLoaded() {
    console.log("poseNet is inialized");
}

function gotPoses(results) {
    if(results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
    }
}

function draw() {
    image(video,0,0,600,400);
    console.log("draw function called");
    fill("#FF0000");
    stroke("#FF0000");
    circle(rightWristx,rightWristy,20);

    if (rightWristy>0 && rightWristy<=100) {
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }
    else if (rightWristy>100 && rightWristy<=200) {
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1);
    }
    else if (rightWristy>200 && rightWristy<=300) {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }
    else if (rightWristy>300 && rightWristy<=400) {
        document.getElementById("speed").innerHTML = "speed = 2x";
        song.rate(2);
    }
    else if (rightWristy>400 && rightWristy<=500) {
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }

    if (scoreLeftWrist>0.2){
    circle(leftWristx,leftWristy,20);
    inNumberleftWristy = Number(leftWristy);
    remove_decimal = floor(inNumberleftWristy);
    volume = remove_decimal/500;
    document.getElementById("Volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function play() {
    song.play();
    console.log("play function called");
    song.setVolume(1);
    song.rate(1);
}