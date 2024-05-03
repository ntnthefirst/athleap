window.addEventListener('DOMContentLoaded', function() {
    loaddata();
});
var timing ;
var data;
let datalocation;
const excersize = [];

function loaddata() {
    var xdatalocation = sessionStorage.getItem("workoutlocation");
    if (xdatalocation == null) {
        var Alement = document.createElement("a");
        Alement.href = "hub.html"
        Alement.click()
    }
    datalocation = xdatalocation;
    var xtiming = sessionStorage.getItem("timing")
    if (xtiming == null) {
        timing = 0;
        sessionStorage.setItem("timing", 0)
    }else{
        timing = xtiming
    }
    fetch(datalocation + '/data.json')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(xdata => {
            data = xdata;
            console.log(data);
            ready();
        })
}

var totaltime = 0;
var totalexsersizecount = 0;
function ready() {

    function prep() {
        data.exercises.forEach(function (exercise) {
            totaltime += parseInt(exercise.time);
            totalexsersizecount += 1
        });
    }
    prep()

    var overlayElement = overlay.make();
    overlayElement.innerHTML = "<h1>START!</h1>";
    overlayElement.onclick = function () {
        overlay.delete();
        exsersize_handler()
        mainclock()
    };
}


var localcount = 0;
var maincount = 0;
var currentExcerice = null;
var excersizeIndex = 0;
var paused = false;

function exsersize_handler() {
    if (!paused) {
        localcount ++;
        maincount ++;
    }
    if (currentExcerice == null) {
        currentExcerice = data.exercises[0]
        newexcersize()
    }
    if (localcount > currentExcerice.time) {
        if (excersizeIndex+1 != totalexsersizecount) {
            if (data.properties.autoscroll) {
                excersizeIndex ++;
                newexcersize()
            }else{
                localcount = currentExcerice.time;
                maincount --;
                var overlayElementexcist = document.getElementById("overlay")
                if (overlayElementexcist == null) {
                    var overlayElement = overlay.make();
                    overlayElement.innerHTML = "<h1>Goed gedaan!</h1><button>Volgende</button>"
                    overlayElement.querySelector("button").onclick = function () {
                        excersizeIndex ++;
                        overlay.delete()
                        newexcersize()
                    }
                }
            }
        }else{
            ending()
        }
    }
    if (localcount + 5 > currentExcerice.time) {
        var nextbox = document.getElementById("nextbox")
        nextbox.removeAttribute("style")
    }else{
        var nextbox = document.getElementById("nextbox")
        nextbox.style.transform = "translateY(100%)";
    }

    refresh()
}
function newexcersize() {
    particle.pulse_green()
    localcount = 0;
    refresh()
    currentExcerice = data.exercises[excersizeIndex]

    settempo()

    var titleElement = document.getElementById("title")
    titleElement.innerHTML = currentExcerice.tag
    
    var nextbox = document.getElementById("nextbox")
    console.log(totalexsersizecount);
    console.log(excersizeIndex);
    if (excersizeIndex+1 != totalexsersizecount) {
        nextbox.querySelector("h1").innerHTML = data.exercises[excersizeIndex+1].tag
    }else{
        nextbox.querySelector("h1").innerHTML = "EINDE!!"

    }
}
var generalTimer;
function mainclock() {
    generalTimer = setInterval(function() {
        exsersize_handler()
    }, 1000); 
}
function ending() {
    clearInterval(generalTimer)
    var overlayElement = overlay.make();
    overlayElement.innerHTML = "<h1>Topprestatie!</h1><p>klick om terug te gaan naar het dashboard</p>"
    overlayElement.onclick = function () {
        var AElement = document.createElement("a");
        AElement.href = "hub.html";
        AElement.click();
    }
}

var tempoId; 

function settempo() {
    temprelay = (60/currentExcerice.tempo) * 1000
    var tempotext = document.getElementById("tempo").querySelector("p")
    tempotext.innerHTML = currentExcerice.tempo + "BPM"
    var box = document.getElementById("tempobox")
    var items = box.querySelectorAll("div")

    if (tempoId) {
        clearInterval(tempoId);
    }

    var beatindex = 0;
    tempoId = setInterval(() => {
        if (!paused) {
            beatindex ++;
        }
        if (beatindex == 4) {
            beatindex = 0;
        }
        items.forEach(function (item) {
            item.removeAttribute("class")
        })
        items[beatindex].className = "actif"
        
    }, (temprelay/4));
}

function refresh() {
    var localTimeLineELement = document.getElementById("localprogress")
    var localTimeElement = document.getElementById("localtime")
    var mainTimeLineElement = document.getElementById("totalprogress")
    
    localTimeElement.innerText = currentExcerice.time - localcount

    localTimeLineELement.style.width = ((localcount/currentExcerice.time)*100) + "%"
    mainTimeLineElement.style.width = ((maincount/totaltime)*100) + "%"


}

function skip() {
    if (localcount + 3 > currentExcerice.time) {
        null
    }else{
        maincount += (currentExcerice.time - localcount)-3;
        localcount = currentExcerice.time - 3;
    }
    refresh()
}
function pause() {
    var pausebutton = document.getElementById("pause");
    if (paused) {
        paused = false;
        pausebutton.removeAttribute("style")
    }else{
        paused = true;
        pausebutton.style.boxShadow = "inset 0 2px 8px 0 #333333"
    }   
}

overlay = {
    make : function () {
        var Element = document.createElement("div")
        Element.id = "overlay"
        document.getElementById('innercicle').appendChild(Element)
        return Element;
    },
    delete : function () {
        var Element = document.getElementById("overlay");
        Element.remove();
    }
}
particle = {
    pulse_green: function() {
        var outercicle = document.getElementById("outercicle");
        var innercicle = document.getElementById("innercicle");
        innercicle.style.boxShadow = "0 0 50px 0 #20ff10";
        setTimeout(function() {
            outercicle.style.boxShadow = "0 0 70px 15px #20ff10";
        }, 200);
        setTimeout(function() {
            innercicle.removeAttribute("style");
        }, 500);
        setTimeout(function() {
            outercicle.removeAttribute("style");
        }, 600);
    },
    
};
