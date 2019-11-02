console.log('%c HI', 'color: firebrick')

function getImgs (){
return fetch("https://dog.ceo/api/breeds/image/random/4")
  .then(resp => resp.json())
  .then(json => json)
  .then(json => renderImgs(json.message))
  ;

}

function renderImgs(imgAr){
    imgAr.forEach(img => {
        let element = document.createElement('IMG');
        element.src = img;
        document.body.appendChild(element)
    });

}

function getBreeds (){
    return fetch('https://dog.ceo/api/breeds/list/all')
      .then(resp => resp.json())
      .then(json => json)
      .then(json => renderBreeds(json.message))
    }

function breedsArray(breedObj){return (Object.keys(breedObj));}

function renderBreeds(breedObj){   
    (breedsArray(breedObj))
    .forEach(breed => {
            let element = document.createElement('li')
            element.innerText = breed
            const list = document.getElementById("dog-breeds")
            list.appendChild(element)
        });       
    }

function addFont(){
    const lis = document.querySelector("ul");
        lis.addEventListener("click", function(e){
        e.target.style.color= "red"
    })
}
    
function selectAlph(){
    const sl = document.getElementById("breed-dropdown")
    sl.addEventListener("change", function(){
        val = this.value;
        getBreedsSel()
        //function that lists the items with that letter
    }); 

}

function getBreedsSel (){
    return fetch('https://dog.ceo/api/breeds/list/all')
      .then(resp => resp.json())
      .then(json => json)
      .then(json => putn(json.message))
    }


//function that can get an array of breed names by the letter you give it
function putn(breedObj){
    
    //get the array of breed names
    const origin = (breedsArray(breedObj))
    
    //map the array so that each element is an array of char's
    
    const splitOrigin = origin.map(splitter)
    function splitter(i){return i.split("")}
    
    //delete the elements that dont start w that char

    const removeNon = splitOrigin.map(remover)
    function remover(i){
        if (i[0] != val) { return delete i;
        }
        else {return i}
    }
    
    //map thru the array so that you take the elements with that letter at index 0
    const chosenAR = removeNon.map(chooser)
    function chooser(i){
        if (i [0] === val) { return i}
    }
    console.log(chosenAR)
    //map the array so that u join each thing back to a string
    let joined = chosenAR.map(joiner)
    function joiner(i){if (i != undefined){return i.join("")}}
console.log(joined)
    //delete the uls children
    const lis = document.querySelector("ul");
    lis.remove()

    //give that to the ul
    let element = document.createElement('ul')
    element.id = "dog-breeds"
    document.body.appendChild(element)

    joined.forEach(breed => {
        if (breed != "undefined"){}
        let elemento = document.createElement('li')
        elemento.innerText = breed
        const list = document.getElementById("dog-breeds")
        list.appendChild(elemento)
    })

}
document.addEventListener('DOMContentLoaded', function() {
  getImgs();
  getBreeds();
  addFont();
  selectAlph();
})