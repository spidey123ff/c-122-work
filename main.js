var previous_answer="";
var current_answer="";
function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(620,400);
  video = createCapture(VIDEO);
  video.hide();
  image_recognizer=ml5.imageClassifier("MobileNet",model_load);
  
}

function preload(){

}


function draw(){
  image(video,0,0,300,300);
  image_recognizer.classify(video,results);

}

function model_load(){
  console.log("Teachable Machine Loaded Successfully");
}

function results(error,answer){
  if (error){
    console.log(error);
  }
  else {
    if ((answer.length>0) && (answer[0].confidence>0.5) && (previous_answer!=answer[0].label )){
      //console.log(answer);  
      previous_answer=answer[0].label;
      document.getElementById("result").innerHTML=answer[0].label;
      document.getElementById("accuracy").innerHTML=answer[0].confidence;
      var speech=window.speechSynthesis;
      var message_text="object identified is " +answer[0].label;
      var message_audio=new SpeechSynthesisUtterance(message_text);
      speech.speak(message_audio);
    }
  }
}