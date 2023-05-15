//Navbar
let menu = document.getElementById("menu");
let navbar = document.querySelector(".navbar");

menu.addEventListener('click', () => {
    navbar.classList.toggle('open')

    if (menu.classList.contains("fa-bars")) {
        menu.classList.replace("fa-bars", "fa-times")
    }

    else {
        menu.classList.replace("fa-times", "fa-bars")
    }
})


//***  API ***//
let allRecipes = [];
let recipeDetails = {};
let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");


//get all recipes by search
async function getRecipes(type) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/search?&q=${type}`)
    allRecipes = await apiResponse.json();
    allRecipes = allRecipes.recipes;
    displayRecipes()
}



function displayRecipes() {
    let cartoona = '';
    allRecipes.forEach(recipe => {
        let myID = `'${recipe.recipe_id}'`
        cartoona += `   
            <div class="recipe" onclick="getRecipesDetails(${myID})">
              <img class="w-100" src="${recipe.image_url}" alt="">
                <h3 class="color-mine py-1">${recipe.title}</h3>
                <p>${recipe.publisher}</p>
            </div>
            ` ;

    });

    document.getElementById('recipesContent').innerHTML = cartoona;
}


searchBtn.addEventListener("click", function () {
    getRecipes(searchInput.value);
})


//get one recipe only by id
async function getRecipesDetails(id) {
    let apiResponse = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`)
    recipeDetails = await apiResponse.json();
    recipeDetails = recipeDetails.recipe
    displayRecipeDetails()
}


function displayRecipeDetails() {

    let cartoona2 = ``;

    for (let x of recipeDetails.ingredients) {
        cartoona2 += ` <li>🍴 ${x}</li>
        `;
    }

    let cartoona = ` <div class="recipeDetials ">
    <h2 >${recipeDetails.title}</h2>
    <img src="${recipeDetails.image_url}" class="w-100" alt="">
    <ul>${cartoona2}</ul>
  </div>`;

    document.getElementById('recipeDetails').innerHTML = cartoona;

}
