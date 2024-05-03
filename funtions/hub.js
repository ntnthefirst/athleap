window.addEventListener('DOMContentLoaded', function() {
    loadbanner()
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
        fetch(location + '/data.json')
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
    
        const labels = {
            "description": "Beschrijving",
            "excersizecount": "Aantal oefeningen"
        };
    
        Object.keys(data.info).forEach(key => {
            if (key !== "title") {
                const label = document.createElement("label");
                label.innerText = labels[key] ? labels[key] + ": " : key + ": ";
                popupElement.appendChild(label);
    
                const content = document.createElement("p");
                content.innerText = data.info[key];
                popupElement.appendChild(content);
    
            }
        });
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
