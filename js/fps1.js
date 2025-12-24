if (window.localStorage.getItem("fpson") == undefined || window.localStorage.getItem("fpson") == "1") {
    var rAF = function () {
        return (
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    }();
    var frame = 0;
    var allFrameCount = 0;
    var lastTime = Date.now();
    var lastFameTime = Date.now();
    var loop = function () {
        var now = Date.now();
        var fs = (now - lastFameTime);
        var fps = Math.round(1000 / fs);

        lastFameTime = now;
        // 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
        allFrameCount++;
        frame++;

        if (now > 1000 + lastTime) {
            var fps = Math.round((frame * 1000) / (now - lastTime));
            // 境界与帧率映射
            if (fps <= 2) { 
                 var kd = `<span style="color:#600000">😵(未达电竞)</span>`
            } else if (fps <= 5) { 
                 var kd = `<span style="color:#dc2626">🤢(卡成PPT)</span>`
            } else if (fps <= 15) { 
                 var kd = `<span style="color:#ea580c">😖(电竞帧率)</span>`
            } else if (fps < 25) { 
                 var kd = `<span style="color:#ea580c">😌(有点难受)</span>`
            } else if (fps <= 35) { 
                 var kd = `<span style="color:#38bdf8">😐(不太流畅)</span>`
            } else if (fps <= 45) { 
                 var kd = `<span style="color:#22d3ee">😊(还不错哦)</span>`
            } else if (fps <= 59) { 
                 var kd = `<span style="color:#39c5bb">🤯(十分流畅)</span>`
            } else  { 
                 var kd = `<span style="color:#67e8f9">🥳(人机合一)</span>`
            }
            document.getElementById("fps").innerHTML = `FPS:${fps} ${kd}`;
            frame = 0;
            lastTime = now;
        };

        rAF(loop);
    }

    loop();
} else {
    document.getElementById("fps").style = "display:none!important"
}
