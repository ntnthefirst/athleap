window.addEventListener('DOMContentLoaded', function() {
    loadbanner()
    loadin()
});

function loadbanner() {
    var bannerElement = document.getElementById('banner'); 
    var today = new Date();
    var dayOfMonth = today.getDate();
    console.log(today.getMonth()+1);
    if (today.getMonth()+1 == 5) {
        bannerElement.innerHTML = `<h2>Mei challange</h2>
        <div id="outrcicle">
            <button onclick="loadworkout('meichallange/${dayOfMonth}')" id="innercircle"><strong>start dagelijkse sessie</strong><br><span id="subtekst">dag ${dayOfMonth}</span></button>
        </div>`;
    }
}
function loadworkout(workoutlocation) {
    const location = "../data/"+ workoutlocation
    console.log(location);
    
    var popupElement = popup()

    var h1Element = document.createElement("h1");
    h1Element.innerHTML = "data aan het laden";
    popupElement.appendChild((h1Element));

    function loaddata() {
        fetch(location + '.json')
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            dataloaded(data);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            h1Element.innerHTML = "OEPS.. ER GING IETS MIS"
            var closebutton = document.createElement('button');
            closebutton.innerHTML = "sluit";
            closebutton.onclick = function () {
                removepupup()
            }
            popupElement.appendChild(closebutton);

        });
    }
    loaddata()

    
    function dataloaded(data) {
        popupElement.innerHTML = "";
    
        const titel = document.createElement("h1");
        titel.innerText = data.info.title;
        popupElement.appendChild(titel);
    
        const niveauLabel = document.createElement("label")
        const niveauP = document.createElement("p")
        niveauLabel.innerText = "Niveau"
        niveauP.innerText = data.info.niveau
        popupElement.appendChild(niveauLabel)
        popupElement.appendChild(niveauP)

        const timeLabel = document.createElement("label");
        const timeP = document.createElement("p");
        var totaltime = 0;
        data.exercises.forEach(function (exercise) {
            totaltime += exercise.time;
        })
        timeLabel.innerText = "duurtijd"
        timeP.innerText = Math.round(totaltime/60) + " min"
        popupElement.appendChild(timeLabel)
        popupElement.appendChild(timeP)

        const descriptionLabel = document.createElement("label");
        const descriptionP = document.createElement("p")
        descriptionLabel.innerText = "Beschrijving";
        descriptionP.innerText = data.info.description
        popupElement.appendChild(descriptionLabel)
        popupElement.appendChild(descriptionP)
        
        const extradiv = document.createElement("div")


        const startButton = document.createElement("button");
        startButton.innerText = "Start";
        startButton.onclick = function () {
            sessionStorage.setItem('workoutlocation' , location)
            var Aelement = document.createElement("a")
            Aelement.href = "session.html"
            Aelement.click()
        }
        const closeButton = document.createElement("button");
        closeButton.innerText = "Sluit";
        closeButton.onclick = function () {
            removepupup()
        }

        extradiv.appendChild(closeButton)
        extradiv.appendChild(startButton)
        
        popupElement.appendChild(extradiv);
    }
    
}
function loadin() {
    var sectionElements = document.querySelector("main").querySelectorAll("section");
    sectionElements.forEach(function (sectionElement) {
        const location = sectionElement.getAttribute("data-location")
        if (location) {
            fetch("../data/" + location + '.json')
            .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                runme(data);
            })
            }else{
                console.error("fout bij het laden van attribuut")
            }
        function runme(data) {
            var totaltime = 0;
            data.exercises.forEach(function (exercise) {
                totaltime += exercise.time;
            })
            const figureElement = document.createElement("figure")
            figureElement.innerText = Math.round(totaltime/60) + " min | niveau " + data.info.niveau; 
            sectionElement.appendChild(figureElement)
            
            const pElement = document.createElement("p")
            pElement.innerText = data.info.description;
            sectionElement.appendChild(pElement);

            const buttonElement = document.createElement("button");
            buttonElement.innerText = "Check-it!"
            buttonElement.setAttribute("onclick", "loadworkout('" + location +"')")
            sectionElement.appendChild(buttonElement)
        }
    })
    
}
function popup() {
    const backdropElement = document.createElement('div');
    const popupElement = document.createElement('popup')

    backdropElement.id = "backdrop"
    popupElement.id = "popup"

    document.body.appendChild(backdropElement)
    document.body.appendChild(popupElement)

    backdropElement.onclick = function () {
        removepupup()
    }

    return popupElement
    
}
function removepupup() {
    document.getElementById("backdrop").remove()
    document.getElementById("popup").remove()
}
