export async function ApiDetails(gameId, loading, detailsSection, sideAll, displayDetails) {
    try {
        loading.classList.remove("d-none");

        const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '62aec8b447msh019dc2bc1391b3cp1cd632jsn10d91e065b3e',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        });

        const gameDetails = await response.json();
        console.log('Game details:', gameDetails);
        displayDetails(gameDetails, detailsSection, sideAll, loading);
    } catch (error) {
        console.error('Error fetching game details:', error);
    }
}

export function displayDetails(game, detailsSection, sideAll, loading) {
    const boxDetails = `
        <div class="container">
            <header class="hstack justify-content-between">
                <h1 class="text-center h3 py-4">Details Game</h1>
                <button class="btn-close btn-close-white" id="btnClose"></button>
            </header>
            <div class="row g-4" id="detailsContent">
                <div class="col-md-4">
                    <img src="${game.thumbnail}" class="w-100" alt="image details" />
                </div>
                <div class="col-md-8 pb-4">
                    <h3>Title: ${game.title}</h3>
                    <p>Category: <span class="badge text-bg-info">${game.genre}</span></p>
                    <p>Platform: <span class="badge text-bg-info">${game.platform}</span></p>
                    <p>Status: <span class="badge text-bg-info">${game.status}</span></p>
                    <p class="small">${game.description}</p>
                    <a class="btn btn-outline-warning" target="_blank" href="${game.game_url}">Show Game</a>
                </div>
            </div>
        </div>
    `;

    detailsSection.innerHTML = boxDetails;
    detailsSection.classList.remove('d-none');
    console.log('Details section shown');

    document.getElementById('btnClose').addEventListener('click', () => {
        detailsSection.classList.add('d-none');
        sideAll.forEach(side => side.classList.remove('d-none'));
    });

    loading.classList.add("d-none");
}
