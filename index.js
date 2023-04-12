let eror;
let howmany = 0;
const start = document.getElementById("start");
const stop = document.getElementById("stop");
let mediarecorder = null;
let chunks = [];
navigator.mediaDevices.getDisplayMedia({video: true, DisplayCaptureSurfaceType: "browser"}).then(stream => {
    console.log("Permission");
    console.log("We have not a problem " + stream);
    howmany++;
    console.log("how: " + howmany);
    const videoElem = document.getElementById("dene");
    videoElem.srcObject = stream;
    strm = stream
    mediarecorder = new MediaRecorder(stream);
    mediarecorder.ondataavailable = function (e) {
        chunks.push(e.data)
    }
    mediarecorder.onstop = function (ev) {
        let blob = new Blob(chunks, {type: "video/mp4"});
        let videourl = window.URL.createObjectURL(blob);
        const a = document.getElementById("dow");
        a.href = videourl;
        a.download = "capture.mp4";
        console.log(videourl);
    }
})

    .catch(e => {
        console.log("ERROR: " + JSON.stringify(e));
        eror = e;
    });
start.onclick = function () {
    mediarecorder.start()
    document.getElementById("start").style.backgroundColor = 'black';
    document.getElementById("startIcon").style.color = '#F1F1F4';
    document.getElementById("stop").style.backgroundColor = '#F1F1F4';
    document.getElementById("stopIcon").style.color = 'black';
}
stop.onclick = function () {
    mediarecorder.stop();
    document.getElementById("start").style.backgroundColor = '#F1F1F4';
    document.getElementById("startIcon").style.color = 'black';
    document.getElementById("stop").style.backgroundColor = 'black';
    document.getElementById("stopIcon").style.color = '#F1F1F4';
}
