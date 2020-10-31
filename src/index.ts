import p5 from 'p5';
import ml5 from 'ml5';

new p5((pFive) => {
  let video;
  let mobilenet;
  let label = '';

  function modelReady() {
    mobilenet.predict(gotResults);
  }
  function gotResults(error, results) {
    if (error) console.error(error);
    else {
      label = results[0].label;
    }
  }
  pFive.setup = () => {
    pFive.createCanvas(640, 540);
    video = pFive.createCapture();
    video.hide();
    pFive.background(0);
    mobilenet = ml5.imageClassifier('MobileNet', video, modelReady);
  };

  pFive.draw = () => {
    pFive.background(0);
    pFive.image(video, 0, 60);
    pFive.fill(255);
    pFive.textSize(32);
    mobilenet.predict(gotResults);
    pFive.text(label, 0, 50);
  };
});
