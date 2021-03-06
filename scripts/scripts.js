// Setup Video
var		video = document.querySelector('video'),
		time_dump = document.getElementById("elapsed_time"),
		glasses = new Image(),
		canvas = document.getElementById("output"),
		ctx = canvas.getContext("2d");
		glasses.src = "i/glasses.png";

// open canvas images as data URI in new window
canvas.addEventListener('click', function() {
    var datauri = this.toDataURL("image/png");
    window.open(datauri);
}, true);

// enable camera support for video element
if (navigator.getUserMedia) {
    navigator.getUserMedia('video', function(stream) {
        alert('yeah! camera support!');
        video.src = stream;
        vidInterval = setInterval(html5glasses, 200);
    }, function(error) {
        alert('An error occurred while trying to get camera access: ' + error.code);
    });
}
else {
    alert('This demo is a quick and dirty try to get camera support with an HTML5 video element working. You are unfortunately using a browser that does not support getUserMedia method.');
}

function html5glasses() {
	// Start the clock 
	var elapsed_time = (new Date()).getTime();
	
	// Draw the video to canvas
	ctx.drawImage(video, 0, 0, video.width, video.height, 0, 0, canvas.width, canvas.height);

        if (video.paused) {
	    time_dump.innerHTML = "no processing as video is paused. " + ((new Date()).getTime() - elapsed_time).toString() + "ms";
            return;
        }

	// use the face detection library to find the face
	var comp = ccv.detect_objects({ "canvas" : (ccv.pre(canvas)),
									"cascade" : cascade,
									"interval" : 5,
									"min_neighbors" : 1 });

	// Stop the clock
	time_dump.innerHTML = "Process time : " + ((new Date()).getTime() - elapsed_time).toString() + "ms";

	// Draw glasses on everyone!
	for (var i = 0; i < comp.length; i++) {
		ctx.drawImage(glasses, comp[i].x, comp[i].y,comp[i].width, comp[i].height);
	}
}
