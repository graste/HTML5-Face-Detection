// Setup Video
var		video = document.querySelector('video'),
		time_dump = document.getElementById("elapsed_time"),
		glasses = new Image(),
		canvas = document.getElementById("output"),
		ctx = canvas.getContext("2d");
		glasses.src = "i/glasses.png";

if (navigator.getUserMedia) {
    navigator.getUserMedia('video', successCallback, errorCallback);
    function successCallback(stream) {
        alert('yeah! camera support!');
        video.src = stream;
        vidInterval = setInterval(html5glasses, 200);
    }
    function errorCallback(error) {
        alert('An error occurred while trying to get camera access: ' + error.code);
	return;
    }
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

/* Events */ 
/*
video.addEventListener('play', function() {
	vidInterval = setInterval(html5glasses,200); 
});

video.addEventListener('ended', function() {
	clearInterval(vidInterval);
	time_dump.innerHTML = "finished";
});
*/
