import { ApiDetails, displayDetails } from './details.js';

let sideAll = document.querySelectorAll(".sideAll");
let detailsSection = document.getElementById('detailsGames');
let loading = document.querySelector(".loading");
let arrGames = [];

async function Api(game) {
    try {
        loading.classList.remove("d-none");
        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${game}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '78308a9a65msh77a2f2c7740d214p116973jsn8a98e3dc52d6',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        });

        arrGames = await response.json();
        console.log('Games array:', arrGames);
        displayGames();

        loading.classList.add("d-none");
    } catch (error) {
        console.error('Error fetching games:', error);
    }
}

function displayGames() {
    let boxGames = '';

    for (let i = 0; i < arrGames.length; i++) {
        boxGames += `
        <div class="col-md-6 col-lg-4 col-xl-3">
            <div class="card pt-3 px-4 h-100" data-id="${arrGames[i].id}">
                <img src="${arrGames[i].thumbnail}" class="card-img-top" alt="${arrGames[i].title}">
                <div class="card-body pb-0 d-flex justify-content-between align-items-center">
                    <p class="text-white text-header">${arrGames[i].title.split(" ", 3).join(" ")}</p>    
                    <p class="badge">Free</p>
                </div>
                <div class="card-content">
                    <p class="text-center opacity-75">${arrGames[i].short_description.split(" ", 10).join(" ")}</p>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <p class="badge">${arrGames[i].genre}</p>
                    <p class="badge">${arrGames[i].platform}</p>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById('rowGames').innerHTML = boxGames;

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const gameId = this.getAttribute('data-id');
            console.log(`Card clicked! Game ID: ${gameId}`);
            ApiDetails(gameId, loading, detailsSection, sideAll, displayDetails);
            sideAll.forEach(side => side.classList.add('d-none'));
            detailsSection.classList.remove('d-none');
        });
    });
}

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        navLinks.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');

        if (e.target.id === 'shooter') {
            Api('shooter');
        } else if (e.target.id === 'PERMADEATH') {
            Api('permadeath');
        } else if (e.target.id === 'SUPERHERO') {
            Api('superhero');
        } else if (e.target.id === 'PIXEL') {
            Api('pixel');
        } else {
            Api('mmorpg');
        }
    });
});

Api('mmorpg');
