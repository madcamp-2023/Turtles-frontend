//WebCam.js

import * as faceapi from "face-api.js";
import React from "react";

const WebCam = React.forwardRef((props, ref) => {
  const [modelsLoaded, setModelsLoaded] = React.useState(false);
  const [captureVideo, setCaptureVideo] = React.useState(false);

  const videoRef = React.useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = React.useRef();

  React.useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(setModelsLoaded(true));
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const handleVideoOnPlay = () => {
    setInterval(async () => {
      if (videoRef.current && videoRef.current.readyState === 4) {
        if (canvasRef && canvasRef.current) {
          canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
            videoRef.current
          );
          const displaySize = {
            width: videoWidth,
            height: videoHeight,
          };

          faceapi.matchDimensions(canvasRef.current, displaySize);

          const detections = await faceapi
            .detectAllFaces(
              videoRef.current,
              new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceExpressions();

          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          resizedDetections.forEach((detection) => {
            const faceWidth = detection.detection.box.width;
            const distance = estimateDistance(faceWidth);
            console.log(`Estimated distance: ${distance} cm`);

            const notificationOptions = {
              icon: "https://github.com/madcamp-2023/w3-essh-frontend/assets/79096116/64bf7473-c399-40a1-8ec9-c479b931c973",
            };

            if (distance < 50) {
              if (Notification.permission === "granted") {
                new Notification("화면 거리", notificationOptions);
              } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then((permission) => {
                  if (permission === "granted") {
                    new Notification("화면 거리", notificationOptions);
                  }
                });
              }
            }

            //기준: 50cm로
          });
          canvasRef &&
            canvasRef.current &&
            canvasRef.current
              .getContext("2d")
              .clearRect(0, 0, videoWidth, videoHeight);
          canvasRef &&
            canvasRef.current &&
            faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
          canvasRef &&
            canvasRef.current &&
            faceapi.draw.drawFaceLandmarks(
              canvasRef.current,
              resizedDetections
            );
          canvasRef &&
            canvasRef.current &&
            faceapi.draw.drawFaceExpressions(
              canvasRef.current,
              resizedDetections
            );
        }
      }
    }, 10000); //10000밀리초에 한번씩 얼굴 인식
  };

  const estimateDistance = (faceWidth) => {
    const referenceWidth = 150;
    const referenceDistance = 100;

    const distance = referenceDistance * (referenceWidth / faceWidth);

    return distance;
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  React.useImperativeHandle(ref, () => ({
    startVideo: () => startVideo(),
    closeWebcam: () => closeWebcam(),
  }));

  return (
    <div>
      {captureVideo ? (
        modelsLoaded ? (
          <div>
            <div
              style={{
                display: "none",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <video
                ref={videoRef}
                height={videoHeight}
                width={videoWidth}
                onPlay={handleVideoOnPlay}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute" }} />
            </div>
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}
    </div>
  );
});

export default WebCam;
