const searchInput = document.getElementById("word-input");
const wordDefinitionsEl = document.querySelector(".output");
const wordEl = document.querySelector(".word");
const soundEl = document.querySelector(".sound");
const playBtn = document.querySelector(".play-btn");
const header = document.querySelector(".header");


document.addEventListener("keydown", (e) => {
    if (e.keyCode === 13 && searchInput.value !== "") {
        handleSearch();
    }
});

header.addEventListener("click", handleSearch);

playBtn.addEventListener("click", () => {
    soundEl.play();
});

async function handleSearch() {
    wordDefinitionsEl.innerHTML = "";
    const searchInputWord = searchInput.value;
    let url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInputWord}`;
    let response = await fetch(url);
    let data = await response.json();
    renderDicData(data);
}

function renderDicData(data) {
    console.log(data);
    const firstData = data[0].meanings;
    const audioPath = getAudio(data[0].phonetics);
    soundEl.src = audioPath;

    wordEl.textContent = data[0].word;
    firstData.forEach(word => {
        let div = document.createElement("div");
        let ul = document.createElement("ul");
        div.className = "mt-4";
        ul.className = "meanings";
        div.innerHTML += `<h4 class="speech">${word.partOfSpeech}</h4>`;
        word.definitions.forEach((wordDefinition, index) => {
            if (index < 2) {
                ul.innerHTML += `
                <li class="mt-3"><p>${wordDefinition.definition}</p></li>`
            }
        })
        div.appendChild(ul);
        wordDefinitionsEl.appendChild(div);
    });
}

function getAudio(phonetics) {
    console.log(phonetics);
    let audioMp3 = null;
    phonetics.forEach(phonetic => {
        if(phonetic.audio.includes("mp3")) {
            audioMp3 = phonetic.audio
        } 
    })
    return audioMp3;
}


