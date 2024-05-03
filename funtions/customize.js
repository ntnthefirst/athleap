var muscles = {
    "front":["Abs","Quadriceps","Chest","Biceps"],
    "back" : ["Glutes","Calves","Back", "Shoulders", "Triceps"]
}

var exercises = [
    {
        "name": "Push-ups",
        "muscle": [
            {"name":"Chest","intensity":3},
            {"name":"Triceps","intensity":2}
        ], 
        "tempo_bpm": 60,
        "min_time": 1,
        "max_time": 5
    },
    {
        "name": "Squats",
        "muscle": [{"name":"Quadriceps","intensity":3}], 
        "tempo_bpm": 70,
        "min_time": 1,
        "max_time": 10
    },
    {
        "name": "Hip Thrusts",
        "muscle": [{"name":"Glutes","intensity":3}], 
        "tempo_bpm": 80,
        "min_time": 1,
        "max_time": 8
    },
    {
        "name": "Planken",
        "muscle": [{"name":"Abs","intensity":3}], 
        "tempo_bpm": 0,
        "min_time": 1,
        "max_time": 3
    },
    {
        "name": "Lunges",
        "muscle": [
            {"name":"Quadriceps","intensity":3},
            {"name":"Glutes","intensity":2}
        ], 
        "tempo_bpm": 70,
        "min_time": 1,
        "max_time": 10
    },
    {
        "name": "Tricep Dips",
        "muscle": [
            {"name":"Triceps","intensity":3},
            {"name":"Chest","intensity":2}
        ], 
        "tempo_bpm": 80,
        "min_time": 1,
        "max_time": 5
    },
    {
        "name": "Sit-ups",
        "muscle": [
            {"name":"Abs","intensity":3}
        ], 
        "tempo_bpm": 60,
        "min_time": 1,
        "max_time": 5
    },
    {
        "name": "Jumping Jacks",
        "muscle": [
            {"name":"Quadriceps","intensity":2},
            {"name":"Calves","intensity":2},
            {"name":"Shoulders","intensity":1},
            {"name":"Abs","intensity":1}
        ], 
        "tempo_bpm": 120,
        "min_time": 2,
        "max_time": 15
    },
    {
        "name": "Russian Twists",
        "muscle": [
            {"name":"Abs","intensity":3},
            {"name":"Obliques","intensity":3}
        ], 
        "tempo_bpm": 112, 
        "min_time": 1,
        "max_time": 5
    },
    {
        "name": "Calf Raises",
        "muscle": [
            {"name":"Calves","intensity":3}
        ], 
        "tempo_bpm": 40, 
        "min_time": 1,
        "max_time": 8
    },
    {
        "name": "High Knees",
        "muscle": [
            {"name":"Quadriceps","intensity":2},
            {"name":"Calves","intensity":2},
            {"name":"Abs","intensity":1}
        ], 
        "tempo_bpm": 120,
        "min_time": 2,
        "max_time": 15
    },
    {
        "name": "Mountain Climbers",
        "muscle": [
            {"name":"Abs","intensity":5},
            {"name":"Chest","intensity":2}
        ], 
        "tempo_bpm": 120,
        "min_time": 2,
        "max_time": 12
    },
    {
        "name": "Burpees",
        "muscle": [
            {"name":"Abs","intensity":3},
            {"name":"Quadriceps","intensity":5},
            {"name":"Chest","intensity":5},
            {"name":"Biceps","intensity":3},
            {"name":"Glutes","intensity":4},
            {"name":"Calves","intensity":5},
            {"name":"Back","intensity":1},
            {"name":"Shoulders","intensity":2},
            {"name":"Triceps","intensity":4}
        ], 
        "tempo_bpm": 100,
        "min_time": 2,
        "max_time": 20
    },
    {
        "name": "Side Plank",
        "muscle": [
            {"name":"Abs","intensity":3},
            {"name":"Obliques","intensity":3}
        ], 
        "tempo_bpm": 0, 
        "min_time": 1,
        "max_time": 3
    },
    {
        "name": "Wall Sit",
        "muscle": [
            {"name":"Quadriceps","intensity":3},
            {"name":"Glutes","intensity":2},
            {"name":"Calves","intensity":2}
        ], 
        "tempo_bpm": 0, // statische oefening
        "min_time": 1,
        "max_time": 5
    },
    {
        "name": "Arm Circles",
        "muscle": [
            {"name":"Shoulders","intensity":4},
            {"name":"Triceps","intensity":1}
        ], 
        "tempo_bpm": 90, 
        "min_time": 1,
        "max_time": 5
    }
];




window.addEventListener('DOMContentLoaded', function() {
    selection.loadselectionpage()
});





var muscle_selection= {};
var time_selection = 0;
var selection = {
    loadselectionpage : function() {
        var startElement = document.createElement('button')
    
        for (var group in muscles) {
            muscle_selection[group] = muscles[group].map(function(muscle) {
                return {"name": muscle.toLowerCase(), "intensity": 0};
            });
        }
    
        var bodyElement = document.body
        var titelElement = document.createElement('h1')
        var mainElement = document.createElement('div')
        var formElement = document.createElement('form')
        var selectElement = document.createElement('select')
        var musclesElement = document.createElement('div')
        var timebox = document.createElement('div')
        var timeElement = document.createElement('input')
        var timePelement = document.createElement('p')
        var timement = document.createElement('p')
    
        
        titelElement.innerHTML = 'Construct your session'
    
        timeElement.type = 'number'
        timeElement.min = 5
        timeElement.max = 90
        
        for (var key in muscles) {
            var optionElement = document.createElement('option');
            optionElement.textContent = key;
            optionElement.value = key
            selectElement.appendChild(optionElement);
        }
        
        selection.updateform(selectElement.value,musclesElement,timeElement)
        selectElement.addEventListener('change', function() {
            selection.updateform(selectElement.value,musclesElement,timeElement)
        });
        
        formElement.appendChild(selectElement)
        formElement.appendChild(musclesElement)
        mainElement.appendChild(formElement)
    
    
        startElement.textContent = "start session"
        startElement.id = 'startsession'
        startElement.onclick = function() {
            session.prepsession();
        };
    
        musclesElement.id = "listingBox"
        mainElement.id = 'main_selection'
    
        bodyElement.appendChild(titelElement)
        bodyElement.appendChild(timeElement)
        bodyElement.appendChild(mainElement)
        bodyElement.appendChild(startElement)
    },
    updateform : function(selected_item, musclesElement,timeElement) {
        var muscles = muscle_selection[selected_item];
        musclesElement.innerHTML = '';
        muscles.forEach(function(muscle) {
            var muscleElement = document.createElement('div');
            var nameElement = document.createElement('p');
    
            nameElement.textContent = muscle['name'];
    
            muscleElement.classList = 'listingItem';
    
            var scoregroupElement = document.createElement('div');
            scoregroupElement.classList = 'scorebox';
    
            for (let index = 0; index < 6; index++) {
                var scoreElement = document.createElement('div');
                scoreElement.classList = 'scoreElement';
                scoreElement.id = muscle['name']+index
                scoregroupElement.appendChild(scoreElement);
                
    
            };
            updateintensety()
            function updateintensety() {
    
                Array.from(scoregroupElement.children).forEach(function(element, trimmer) {
                    var children = scoregroupElement.querySelectorAll('*');
                    children.forEach(function(child) {
                        child.style.backgroundColor = ''; 
                    });
                    var colorsceme = ['#B0E0E6', '#6B8E23', '#CEDF5E', '#FFCC66', '#FF7F50', '#FF5555'];
                    var foundElement = false;
                    children.forEach(function(child , trim) {
                        if (!foundElement) {
                            child.style.backgroundColor = colorsceme[trim];
                        }
                        if (muscle.intensity === trim) {
                            foundElement = true;
                        }
                    });
                    
                    
                });
                
            };
            Array.from(scoregroupElement.children).forEach(function(element, trimmer) {
                element.addEventListener('click', clickHandler);
                function clickHandler(event) {
                    muscle.intensity = trimmer;
                    updatetime();
                    updateintensety();
                }
            });
            updatetime();            
            muscleElement.appendChild(nameElement);
            muscleElement.appendChild(scoregroupElement);
            musclesElement.appendChild(muscleElement);
        });
        function updatetime() {
            var gem = 0
            var time = 0
            var flatMuscles = [].concat.apply([], Object.values(muscle_selection));
            flatMuscles.forEach(function (muscl) {
                gem += muscl.intensity;
            });
            gem = gem/flatMuscles.length
            console.log(gem)
            if (gem < 6) {
                time = gem*5 +30
            }
            if (gem < 3.5) {
                time = gem*11 +5
            }
            if (gem < 3) {
                time = gem*9 +10
            }
            if (gem < 1.5) {
                time = gem*6 +10

            }
            if (gem < 1.4) {
                time = gem*5 +10
            }
            if (gem < 1) {
                time = gem*5 +5
            }
            if (gem == 0) {
                time = 0
            }
            if (timeElement.value !== time_selection) {
                if (timeElement.value < Math.round(time)) {
                    timeElement.value = Math.round(time)
                    time_selection = timeElement.value
                }else{
                    time_selection = timeElement.value
                }
            }else{
                timeElement.value = Math.round(time)
                time_selection = timeElement.value
            }
            
        }
    }

}


var workout = [];
function createworkout() {
    var userpreferences = [].concat.apply([], Object.values(muscle_selection));
    
    var preferences = []
    userpreferences.forEach(function (preference) {
        var glut = {"name" : (preference.name),"intensity" : preference.intensity * 4, "amount": preference.intensity}
        preferences.push(glut)
    })
    console.log("pref:")
    console.log(preferences);

    var sum_preferences;
    var allhappy = false
    
    while (!allhappy) {
        preferences.forEach(function (prefgroup) {
            function assignexcercize() {
                if (prefgroup.intensity == 0) {
                    return;
                }
                selits = []
                exercises.forEach(function (oefening) {
                    var names = []
                    oefening.muscle.forEach(function (part) {
                        names.push(part.name.toLowerCase())
                    })
                    
                    if (names.includes(prefgroup.name)) {
                        selits.push(oefening)
                    }
                })
                addinglist = [];
                for (let index = 0; index < prefgroup.amount; index++) {
                    console.log
                    var sor = null;
                    selits.forEach(function (oefening) {
                        if (!addinglist.includes(oefening)) {
                            if (sor == null) {
                                sor = oefening
                            }else{
                                var chan1;
                                sor.muscle.forEach(function (musl) {
                                    if (musl.name.toLowerCase() == prefgroup.name) {
                                        chan1 = Math.abs(musl.intensity - prefgroup.intensity)                               
                                    }
                                });
                                oefening.muscle.forEach(function (musl) {
                                    var chan2;
                                    if (musl.name.toLowerCase() == prefgroup.name) {
                                        chan2 = Math.abs(musl.intensity - prefgroup.intensity)                               
                                    }
                                    
                                    if (chan1 == chan2) {
                                        if (oefening.muscle.length < sor.muscle.length) {
                                            sor = oefening
                                        }
                                    }else{
                                        if (chan1 > chan2) {
                                            sor = oefening
                                        }
                                    }
                                });
                            }
                        }
                    })
                    sor.muscle.forEach(function (mucle) {
                        let exprif = preferences.find(exercise => exercise.name === (mucle.name.toLowerCase()));
                        exprif.intensity -= mucle.intensity                        
                    });
                    addinglist.push(sor)
                    workout.push(sor)
                }
                console.log(workout)

                
            }
            assignexcercize()
            	
        })
        allhappy = true
        
    }
}


var session = { 
    prepsession : function() {
        createworkout();
        document.body.innerHTML = '';
    
        var stopButton = document.createElement('button');
        stopButton.innerText = 'Stop';
        document.body.appendChild(stopButton);
    
        var focusCircle = document.createElement('div');
        focusCircle.id = 'focuscircle';
        document.body.appendChild(focusCircle);
    
        var startElement = document.createElement('button')
        var oefingElement = document.createElement('h1')
        var row1 = document.createElement('div')
        var totaletijdElemnt = document.createElement('p')
        var tussentijdElement = document.createElement('p')
        var tempoElement = document.createElement('p')
    
        startElement.id = 'startbutton';
        startElement.textContent = 'click here to start';
    
        oefingElement.id = 'titel';
        totaletijdElemnt.id = 'totaltime';
        tussentijdElement.id = 'miditime';
        tempoElement.id = 'tempo';
        
        row1.className = 'row';
    
        row1.appendChild(tussentijdElement)
        row1.appendChild(tempoElement)
    
        tussentijdElement.style.display = 'none'
        tempoElement.style.display = 'none'
        totaletijdElemnt.style.display = 'none'
        oefingElement.style.display = 'none'    
    
        focusCircle.appendChild(totaletijdElemnt)
        focusCircle.appendChild(oefingElement)
        focusCircle.appendChild(row1)
    
        focusCircle.appendChild(startElement)
        startElement.onclick = function() {
            session.startSession();
        };
    },
    startSession : function() {
    
        // countdown(8,'session start')
        
        var closebuttonELement = document.getElementById('startbutton')
        closebuttonELement.remove()
    
        var oefingElement = document.getElementById('titel')
        var totaaltijdElement = document.getElementById('totaltime')
        var tempoElement = document.getElementById('tempo')
        var oefentijdElement = document.getElementById('miditime')
    
    
        oefingElement.style = ''
        totaaltijdElement.style = ''
        oefentijdElement.style = ''
        tempoElement.style = ''
    
        oefingElement.innerHTML = 'oefening'
        totaaltijdElement.innerHTML = '9:34'
        oefentijdElement.innerHTML = "0:20"
        tempoElement.innerHTML = "80pbm"
    
        session.changelights(100)
    },
    countdown : function (time, subtitel) {
        var mainElement = document.getElementById('focuscircle');
    var backdropElement = document.createElement('div');
    var numberElement = document.createElement('p');
    var subtitelElement = document.createElement('p');

    numberElement.id = 'number';
    backdropElement.id = 'countdown';
    mainElement.appendChild(backdropElement);
    backdropElement.appendChild(numberElement);
    backdropElement.appendChild(subtitelElement);
    subtitelElement.textContent = subtitel;
    var currenttime = time;

    function updateCountdown() {
        numberElement.textContent = currenttime;
        currenttime--;

        if (currenttime >= 0) {
            setTimeout(updateCountdown, 900); // Vertraging van 0.9 seconden
        } else {
            backdropElement.remove(); // Verwijder het element als currenttime 0 is
        }
    }

    updateCountdown();
    },
    changelights : function (tempo) {
        var cirlce = document.getElementById('focuscircle');
    
        var maxex = 100;
        var minex = 30;
        var liveex = 0;
        var pulseInterval = (60 / tempo) * 1000;
        var red = Math.floor(Math.random() * 226);
        var green = Math.floor(Math.random() * 226);
        var blue = Math.floor(Math.random() * 226);
    
        function pulse() {
            liveex = maxex;
        }
        function updatepulse() {
            if (liveex > minex) {
                liveex  -= 1; 
            }
            cirlce.style.boxShadow = '0 0 ' + liveex + 'px 0 rgba(' + red + ', ' + green + ', ' + blue + ', 1)';
        }
    
        var pulse = setInterval(pulse, pulseInterval);
        var propulse = setInterval(updatepulse, (pulseInterval/90));
    
        // Return the interval ID so it can be cleared if needed
        return pulse;
    },
}

var outergradient = "radial-gradient(circle, rgba(0,0,0,1) 85%, rgba(16,124,153,1) 100%)";
