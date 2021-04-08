const mealsEle = document.getElementById("meals");
const favMeals = document.getElementById("fav-meals");
const searchTerm = document.getElementById("search-term");
const searchBtn = document.getElementById("search");
const mealPopup = document.getElementById("meal-popup");
const closePopup = document.getElementById("close-popup");
const mealInfoEle = document.getElementById("meal-info");


getRandomMeal();
fetchFavMeals();


async function getRandomMeal() {
    const resp = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    const respData = await resp.json();
    const randomMeal = respData.meals[0];

    loadRandomMeal(randomMeal, true);
}

async function getMealById(id) {
    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
    const respData = await resp.json();
    const meal = respData.meals[0];
    return meal;

}

async function getMealsBySearch(term) {

    if (/^\d+$/.test(term)) {
        const resp =  await getMealById(term);

        loadRandomMeal(resp,false);

    }

    const resp = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=" + term);
    const respData = await resp.json();
    const meal = respData.meals;
    return meal;
}

function loadRandomMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('meal');
    meal.innerHTML = `<div class="meal-header">
    ${random ? '<span class="random"> Random Recipe </span>' : ''}
    <img class="meal-img"
        src="${mealData.strMealThumb }"
        alt="${mealData.strMeal }"
    />
</div>
<div class="meal-body">
    <h3 class="meal-title">${mealData.strMeal }</h3>

        <h5>Id: ${mealData.idMeal}</h5>

    <button class="fav-btn" ><i class="fas fa-heart"></i></button>
</div>`;

    const btn = meal.querySelector(".meal-body .fav-btn");
    btn.addEventListener("click", () => {
        if (btn.classList.contains("active"))
        {
            removeMealLS(mealData.idMeal);
            btn.classList.remove("active");
        }
        else {
            addMealLS(mealData.idMeal);
            btn.classList.add("active");
        }

        fetchFavMeals();
    });
const btn2 = meal.querySelector(".meal-img  ");
    btn2.addEventListener("click", () => {

        showMealInfo(mealData);
    });
    const btn3 = meal.querySelector(".meal-title  ");
    btn3.addEventListener("click", () => {

        showMealInfo(mealData);
    });

     meals.appendChild(meal);
}

function addMealLS(mealId) {
    const mealIds = getMealLS();
    localStorage.setItem("mealIds",JSON.stringify([...mealIds,mealId]))

}
function removeMealLS(mealId) {
    const mealIds = getMealLS();
    localStorage.setItem("mealIds", JSON.stringify(mealIds.filter(id => id !== mealId)));
}
function getMealLS() {

    const mealIds = JSON.parse(localStorage.getItem("mealIds"));
    return mealIds=== null?[]:mealIds;

}
async function fetchFavMeals() {
favMeals.innerHTML = " ";
    const mealIds = getMealLS();

    for (let i = 0; i < mealIds.length;i++){
        const mealId = mealIds[i];
        meal = await getMealById(mealId);
        addMealToFav(meal);
}
}

function addMealToFav(mealData) {

    const favMeal = document.createElement('li');

    favMeal.innerHTML = `<img class="fav-image" src="${mealData.strMealThumb}" alt="${mealData.strMeal}"><span> ${mealData.strMeal}</span></li><button class="clear" ><i class="fas fa-window-close"></i></button>`;

    const btn = favMeal.querySelector(".clear");
    btn.addEventListener("click",() => {
        removeMealLS(mealData.idMeal);
        fetchFavMeals();
    });
    const btn3 = favMeal.querySelector(".fav-image ");
    btn3.addEventListener("click", () => {

        showMealInfo(mealData);
    });




     favMeals.appendChild(favMeal);
}

searchBtn.addEventListener("click", async () => {
    mealsEle.innerHTML = "";
    if (searchTerm.value !== "") {
        const search = searchTerm.value;

        const meals = await getMealsBySearch(search);

    if (meals) {
        meals.forEach(meal => {
        loadRandomMeal(meal);
    });
        }
    }
    if (meals == null) {

        getRandomMeal();
    }
    else {
        getRandomMeal();
    }

})

closePopup.addEventListener("click", () => {
    mealPopup.classList.add('hidden');
});

function showMealInfo(mealData) {
    //cleanup
    mealInfoEle.innerHTML = "";
    //update meal info
    const mealEl = document.createElement('div');


    const ingredients = [];
    for (let i = 1; i < 20; i++){
        if (mealData['strIngredient'+1]) {
            ingredients.push(`${ mealData['strIngredient'+i]}-${mealData['strMeasure' + i]}`);
        } else {
            break;
        }

    }

    mealEl.innerHTML = `<h1>${mealData.strMeal}</h1>


                <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">


                <h3>INSTRUCTIONS</h3>
                <p>${mealData.strInstructions}</p>
                <h3>INGREDIENTS</h3>
                <ul>
                    ${ingredients.map((ing)=>`<li>${ing}</li>`).join("")}

                </ul>`;

    mealInfoEle.appendChild(mealEl);

    //show popup
    mealPopup.classList.remove('hidden');

}