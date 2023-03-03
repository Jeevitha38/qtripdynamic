import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const adventureUrl=new URLSearchParams(search);
  const adventureId=adventureUrl.get("adventure");
  return adventureId;

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let response=await fetch(config.backendEndpoint+'/adventures/detail/?adventure='+adventureId)
    let advent=await response.json()
    console.log(advent)
    return advent;
    }
  
    catch(err)
    {
      return null;
    }
  

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureName= document.getElementById('adventure-name')
  adventureName.innerHTML=adventure.name;
  let adventureSubtitle= document.getElementById('adventure-subtitle')
  adventureSubtitle.innerHTML=adventure.subtitle;
  let adventureImage= document.getElementById('photo-gallery')
  adventure.images.forEach(key=>{
    let row=document.createElement('div')
    let col=document.createElement('img')
    col.className='activity-card-image'
    col.src=key;
    row.appendChild(col)
    adventureImage.appendChild(row)
  })
  let adventureContent= document.getElementById('adventure-content')
  adventureContent.innerHTML=adventure.content;



  

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let carouselImg=document.getElementById('photo-gallery')
  carouselImg.innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id='get-image'>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
let container=document.getElementById('get-image')
let act="active"
images.forEach((key,id)=>{
  let row=document.createElement('div')
  let col=document.createElement('img')
  if(id==1){
    act="" 
    // 0th ele will be active after which it converts to inactive
  }
  row.className='carousel-item '+act;
  col.src=key;
  col.setAttribute("class","activity-card-image d-block w-100");
  row.append(col);
  container.append(row);
})
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    // block if it should be visible and none if it should be hidden
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else{
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }


}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let cost=adventure.costPerHead*persons;
  document.getElementById('reservation-cost').innerHTML=cost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form=document.getElementById('myForm')
  form.addEventListener("submit", async(event)=>{
    //the event parameter contains info about the submisssion
    event.preventDefault();
 // Inside the function, the first line calls the "preventDefault" method of the event object. This method prevents the default form submission behavior from occurring, which usually involves the browser navigating to a new page or refreshing the current page. By calling "preventDefault", we can keep the user on the current page and handle the form submission ourselves using JavaScript.

// After calling "preventDefault", you could add code to read the values of form fields, validate user input, and send the data to a server using AJAX or another technique. The asynchronous nature of the function allows you to perform these tasks without blocking the user interface, so that the page remains responsive and interactive during the submission process.
    let sendData = {
      name: form.elements["name"].value,
      date: form.elements["date"].value,
      person: form.elements["person"].value,
      adventure: adventure.id    }
      const options = { 
        //options obj is sent with POST as method as we are going to post some data
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        //meaning the content will be of json type
        },
        body: JSON.stringify(sendData),
        //json string representation is the type of the body which is the 'senddata' oject which gets the value of name, date, person
        };
        try{
          let post = fetch(config.backendEndpoint + "/reservations/new", options);
          //as usual fetch contains 2 values - the url and the value
          alert("Success!");
          location.reload(); //reloads the current page 
        }
        catch{
          alert("Failure!");
        }
    });
  }
  
  

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let banner = document.getElementById("reserved-banner");
  if(adventure.reserved){
    banner.style.display = "block";
  }
  else{
    banner.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
