song = ""
score_l = ""
score_r = ""
right_x = ""
right_y = ""
left_y = ""
left_x = ""

function preload() {
  song = loadSound("music.mp3")
}

function setup() {
  canvas = createCanvas(600, 500)
  canvas.center()
  video = createCapture(VIDEO)
  video.hide()
  posenet = ml5.poseNet(video, modelloaded)
  posenet.on('pose', gotresults)
}

//got results is an function that will help us get all the body parts
//results is an array that hold all the body parts
//result.length-number of elements in the array
function gotresults(results) {
  if (results.length > 0) {
    console.log(results)
    score_l = results[0].pose.keypoints[9].score
    score_r = results[0].pose.keypoints[10].score
    right_x = results[0].pose.rightWrist.x
    right_y = results[0].pose.rightWrist.y
    left_x = results[0].pose.leftWrist.x
    left_y = results[0].pose.leftWrist.x
  }
}

function modelloaded() {
  console.log("model loaded successfully")
}

function draw() {
  image(video, 0, 0, 600, 500)
  stroke("red")
  fill("red")
  if (score_r > 0.2) {
    circle(right_x, right_y, 20)
    if (right_y > 0 && right_y <= 100) {
      song.rate(0.5)
      document.getElementById("speed").innerHTML = "Speed= 0.5x"
    }
    if (right_y > 100 && right_y <= 200) {
      song.rate(1)
      document.getElementById("speed").innerHTML = "Speed= 1x"
    }
    if (right_y > 200 && right_y <= 300) {
      song.rate(1.5)
      document.getElementById("speed").innerHTML = "Speed= 1.5x"
    }
    if (right_y > 300 && right_y <= 400) {
      song.rate(2)
      document.getElementById("speed").innerHTML = "Speed= 2x"
    }
    if (right_y > 400 && right_y <= 500) {
      song.rate(2.5)
      document.getElementById("speed").innerHTML = "Speed= 2.5x"
    }
  }
  if (score_l > 0.2) {
    circle(left_x, left_y, 20)
    //fetching the Y position in number format
    left_y_number = Number(left_y)
    remove_decimal=floor(left_y_number)
    volume=(remove_decimal/500)
    song.setVolume(volume)
    console.log((volume))
    document.getElementById("volume").innerHTML="Volume= "+volume
  }
}

function playsong() {
  song.play()
  //volume can have values like 0.3,0.4 etc between 0 to 1
  song.setVolume(1)
  //rate can have values like 0.5, 1, 1.5, 2 and 2.5
  song.rate(1)
}

function stopsong() {
  song.stop()
}