// Function to load data from the API
const loadData = async (status) => {
 
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
        const data = await response.json();

        if(status){
            displayData(data.categories)

        }
        else{
            displayData(data.categories.slice(0,6));
        }
       
    
};


// Function to fetch and display data based on the search term
const searchingData = async (search) => {
  
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
        const data = await response.json();

        
            displaySearchData(data.meals)
           
       
   
};
// Function to load and display all items when "itemall" is clicked
const itemall = async () => {
    loadData(true); // Show loading indicator
    
  
};




// Event listener for the search input
document.getElementById('searchdata').addEventListener('keyup', function (e) {
    const search = e.target.value; // Get the trimmed search value
    console.log(search); // Log the search value

   
    if (search) {
        searchingData(search);
    } else {
        // If the input is empty, clear the displayed data
        clearData();
    }
});

// Function to clear displayed data
const clearData = () => {
    const categoryItem = document.getElementById('category');
    categoryItem.innerHTML = ''; // Clear the displayed data
};

// Function to display data on the page (update if needed)
const displaySearchData = (meals) => {
    console.log(meals); // Log meals for debugging
    const categoryItem = document.getElementById('category');

    // Clear existing content before displaying new results
    categoryItem.innerHTML = '';

    if(meals){
        meals.forEach(element => {
            categoryItem.classList.add('grid')
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="shadow-xl rounded-xl border border-1">
                    <div class="flex items-center">
                        <div class="flex-1 h-[200px]">
                            <img class="w-full rounded-xl h-full object-cover" src="${element.strMealThumb}" alt="${element.strMeal}">
                        </div>
                        <div class="space-y-2 flex-1 p-3">
                            <h3 class="font-bold text-2xl">${element.strMeal}</h3>
                            <p>${element.strInstructions.split(' ').slice(0, 10).join(' ') + '...'}</p>
                            <button onclick="fullDescription('${encodeURIComponent(element.strInstructions)}')" class="btn text-yellow-400">Show Details</button>
                        </div>
                    </div>
                </div>`;
            
            categoryItem.appendChild(div);
        });
        
    }
    else{
        displayNoResults()
    }
};


// Function to display a message when no results are found
const displayNoResults = () => {
    const categoryItem = document.getElementById('category');
    categoryItem.classList.remove('grid')
categoryItem.innerHTML = `
  <div class="flex justify-center items-center h-full">
    <p class="text-red-500 font-bold animate-bounce">No results found. Please try another ingredient.</p>
  </div>
`;
 // Show no results message
};









// Function to display categories on the page
const displayData = (categories) => {
    const categoryItem = document.getElementById('category');
    categoryItem.innerHTML = " "
    
    categories.forEach(element => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="shadow-xl rounded-xl border border-1">
                <div class="lg:flex  items-center">
                    <div class="flex-1 h-[200px]">
                        <img class="w-full rounded-xl h-full object-cover" src="${element.strCategoryThumb}" alt="${element.strCategory}">
                    </div>
                    <div class="space-y-2 flex-1 p-3">
                        <h3 class="font-bold text-2xl">${element.strCategory}</h3>
                        <p>${element.strCategoryDescription.split(' ').slice(0, 20).join(' ') + '...'}</p>
                        <button onclick="fullDescription('${encodeURIComponent(element.strCategoryDescription)}')" class="btn text-yellow-400">Show Details</button>
                    </div>
                </div>
            </div>`;
        
        categoryItem.appendChild(div);
    });
};

// Function to display the full description in a modal
const fullDescription = (description) => {
    // Decode the encoded description using decodeURIComponent
    const cleanedDescription = cleanAndFilterDescription(decodeURIComponent(description));

    // Show the modal
    const customModal = document.getElementById('customModal');
    customModal.showModal();

    // Get the modal box element
    const modalBox = document.getElementById('modalbox');
    modalBox.innerHTML = ''; // Clear any existing content

    // Create a new div for the modal content
    const div = document.createElement('div');
    div.innerHTML = `
        <h3 class="text-lg font-bold">Details</h3>
        <p class="py-4">${cleanedDescription}</p>
        <div class="modal-action">
            <form method="dialog">
                <button class="btn">Close</button>
            </form>
        </div>
    `;

    // Append the new div to the modal box
    modalBox.appendChild(div);
};

// Function to clean and filter the description
const cleanAndFilterDescription = (description) => {
    // Step 1: Remove HTML tags
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = description;
    let cleanString = tempDiv.innerText; // Get the text content, which removes HTML tags


    return cleanString;
};

// Load data when the script runs
loadData();
