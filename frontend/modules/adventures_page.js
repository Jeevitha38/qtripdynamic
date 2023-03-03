
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  const url=new URLSearchParams(search);
  const cityid=url.get("city")
  //console.log(cityid)
  return cityid;

  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it


}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const response=await fetch(config.backendEndpoint+'/adventures?city='+city)
    const cities=await response.json()
    return cities;
    }
  
    catch 
    {
      return null;
    }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  

  adventures.forEach((key) => {
    //addCityToDOM(key.id, key.category, key.image, key.name, key.costPerHead, key.duration);
    let rowDiv = document.getElementById("data");
    let colDiv = document.createElement("div");
    colDiv.className = "col-6 col-md-4 col-lg-3 mb-5";
    colDiv.innerHTML = `
    <a href = "./detail/?adventure=${key.id}" id = ${key.id}>        
    <div class = "position-relative">         
    <div class = "category-banner">            
     ${key.category}
    </div>      
    <div class = "card activity-card mx-3">       
     <img src = ${key.image} class="card-img-top" alt = ${key.image}> 
    <div class = "card-body col-md-12 mt-2">            
     <div class = "card-text d-flex justify-content-between">      
               <p>${key.name}</p>       
               <p>₹${key.costPerHead}</p>                    
     </div>
    <div class = "card-text d-flex justify-content-between">     
                  <p>Duration</p>                
                   <p>${key.duration} Hours</p>       
       </div> 
      </div>           
    </div>        
  </div>    
  </a>    `;
    rowDiv.append(colDiv);
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  list=list.filter(element=>{
    return element.duration>=low && element.duration<=high;
  })
  console.log(list);
  return list;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  list=list.filter(element=>{
    return categoryList.includes(element.category);
  })
  return list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  //totally 2 test cases one like 2-4 another one is like 12+, so in 2-4 low is 2 high is 4 whereas in 12+ choose 12 as low and 99 as high
  let filteredList = [];
  if(!filters["duration"] == "" && filters.category.length>0)
  {
    filteredList=filterByCategory(list,filters.category);
    let split=filters.duration.split('-')
    filteredList=filterByDuration(filteredList,Number(split[0]),Number(split[1])) //in cmnt

  }
  else if(!filters["duration"] == ""){
      //console.log("inside filter");
      let split=filters.duration.split('-')
      filteredList=filterByDuration(list,Number(split[0]),Number(split[1])) //in cmnt

  }
  else if(filters.category.length>0) //if not null the value of the category must go there for the category as key
  {
    filteredList=filterByCategory(list,filters.category)
  }
  else {
    return list;
  }

  // Place holder for functionality to work in the Stubs
  return filteredList;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  const savefilter = JSON.stringify(filters);
  localStorage.setItem('filters',savefilter)
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const localfilter = JSON.parse(localStorage.getItem('filters'));
  console.log(localfilter)
  //console.log(localfilter)
  // Place holder for functionality to work in the Stubs
  return localfilter;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let pillob=document.getElementById('category-list');
  if(filters["category"].length>0){
    filters["category"].forEach((ele) =>{
      let pills=document.createElement('div');
      pills.className='category-filter';
  pills.textContent=ele;
  pillob.appendChild(pills);
})
}
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
