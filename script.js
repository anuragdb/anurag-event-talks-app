function renderTalks(talksToRender) {
    const talksContainer = document.getElementById('talksContainer');
    talksContainer.innerHTML = ''; // Clear previous talks

    talksToRender.forEach(talk => {
        const talkCard = document.createElement('div');
        talkCard.classList.add('talk-card');
        if (talk.isBreak) {
            talkCard.classList.add('break');
            talkCard.innerHTML = `
                <div class="time">${talk.startTime} - ${talk.endTime}</div>
                <h2>${talk.title}</h2>
                <p>${talk.description}</p>
            `;
        } else {
            const categoriesHtml = talk.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('');
            talkCard.innerHTML = `
                <div class="time">${talk.startTime} - ${talk.endTime}</div>
                <h2>${talk.title}</h2>
                <div class="speakers">Speaker(s): ${talk.speakers.join(', ')}</div>
                <div class="categories">${categoriesHtml}</div>
                <p>${talk.description}</p>
            `;
        }
        talksContainer.appendChild(talkCard);
    });
}

function setupSearch(allTalks) {
    const searchInput = document.getElementById('categorySearch');
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredTalks = allTalks.filter(talk => {
            if (talk.isBreak) return true; // Always show breaks
            return talk.categories.some(category => category.toLowerCase().includes(searchTerm));
        });
        renderTalks(filteredTalks);
    });
}

// Global variable to hold scheduled talks, will be populated by Node.js build script
let scheduledTalksData = [];

// Initial render
window.onload = () => {
    // scheduledTalksData will be populated by the build script
    renderTalks(scheduledTalksData);
    setupSearch(scheduledTalksData);
};