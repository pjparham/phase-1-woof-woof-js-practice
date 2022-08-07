
const dogBar = document.getElementById('dog-bar')
let dogInfo = document.getElementById('dog-info')

function loadDogs(){
    fetch('http://localhost:3000/pups')
    .then((response) => response.json())
    // .then((response) => console.log(response))
    .then((dogs) => dogs.forEach((dog) => renderDog(dog)))
}

loadDogs()

function renderDog(dog){
    let newSpan = document.createElement("span")
    newSpan.innerText = `${dog.name}`
    dogBar.appendChild(newSpan)
    newSpan.addEventListener('click', () => showDogInfo(dog))
}


function showDogInfo(dog){
    clearPage()
    let img = document.createElement('img')
    img.src = `${dog.image}`
    let pupName = document.createElement('h2')
    pupName.innerText = `${dog.name}`
    let dogButton = document.createElement('button')
    dogButton.setAttribute("id", "dog-button")
    if (dog.isGoodDog == true){
        dogButton.innerText = `Good Dog!`
    }
    else{
        dogButton.innerText = `Bad Dog!`
    }
    dogButton.addEventListener('click', () => goodOrBadDog(dog))
    dogInfo.append(img, pupName, dogButton)
}

function clearPage(){
    while (dogInfo.lastElementChild){
        dogInfo.removeChild(dogInfo.firstChild)
    }    
}

function goodOrBadDog(dog){
    let dogButton = document.getElementById('dog-button')
    if (dog.isGoodDog == true){
        dog.isGoodDog = false
        dogButton.innerText = `Bad Dog!`
        fetch(`http://localhost:3000/pups/${dog.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dog)
        })
        .then(res => res.json())
    }
    else{
        dog.isGoodDog = true
        dogButton.innerText = `Good Dog!`
        fetch(`http://localhost:3000/pups/${dog.id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dog)
        })
        .then(res => res.json())
    }
}

function toggleSwitch(){
    let filterButton = document.getElementById("good-dog-filter")
    console.log(filterButton)
    filterButton.addEventListener("click", () => {
        if (filterButton.innerText == "Filter good dogs: OFF"){
            console.log('filter was just turned on')
            filterButton.innerText = "Filter good dogs: ON"
            clearDogBar()
            loadGoodDogs()

        }
        else{
            console.log('filter was just turned off')
            filterButton.innerText = "Filter good dogs: OFF"
            clearDogBar()
            loadDogs()
        }
    })
}
toggleSwitch()

function clearDogBar(){
    while (dogBar.lastElementChild){
        dogBar.removeChild(dogBar.firstChild)
    }    
}


function loadGoodDogs(){
    fetch('http://localhost:3000/pups')
    .then((response) => response.json())
    // .then((response) => console.log(response))
    .then((dogs) => dogs.forEach((dog) => renderGoodDog(dog)))
}



function renderGoodDog(dog){
    if (dog.isGoodDog == true){
        let newSpan = document.createElement("span")
        newSpan.innerText = `${dog.name}`
        dogBar.appendChild(newSpan)
        newSpan.addEventListener('click', () => showDogInfo(dog))
    }
}
