// Numbers API 

// 1. Single number fact
fetch("http://numbersapi.com/7?json")
  .then(function(res) { return res.json(); })
  .then(function(data) {
    console.log("Fact about 7:", data.text); // just grabbing one fact here
  });

// 2. Facts about multiple numbers
fetch("http://numbersapi.com/3,9,13?json")
  .then(function(res) { return res.json(); })
  .then(function(data) {
    // loop through the data and print each fact
    Object.entries(data).forEach(function([num, fact]) {
      console.log(num + ": " + fact);
    });
  });

// 3. Four facts about the same number
let facts = [];
for (let i = 0; i < 4; i++) {
  facts.push(fetch("http://numbersapi.com/7?json"));
}
Promise.all(facts)
  .then(function(results) {
    return Promise.all(results.map(function(r) { return r.json(); }));
  })
  .then(function(data) {
    data.forEach(function(f) {
      console.log("Multi-fact:", f.text);
    });
  });


// deck cards API ---

// 1. Draw a single card
fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
  .then(function(res) { return res.json(); })
  .then(function(data) {
    let card = data.cards[0];
    console.log(card.value.toLowerCase() + " of " + card.suit.toLowerCase());
  });

// 2. Draw two cards from the same deck
let deckId;
fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then(function(res) { return res.json(); })
  .then(function(data) {
    deckId = data.deck_id;
    return fetch("https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1");
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    let card1 = data.cards[0];
    console.log("Card 1:", card1.value + " of " + card1.suit);
    return fetch("https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=1");
  })
  .then(function(res) { return res.json(); })
  .then(function(data) {
    let card2 = data.cards[0];
    console.log("Card 2:", card2.value + " of " + card2.suit);
  });

// 3. Draw cards via button
let currentDeckId;
fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
  .then(function(res) { return res.json(); })
  .then(function(data) {
    currentDeckId = data.deck_id;
    document.querySelector("#draw-btn").disabled = false;
  });

document.querySelector("#draw-btn").addEventListener("click", function() {
  fetch("https://deckofcardsapi.com/api/deck/" + currentDeckId + "/draw/?count=1")
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (data.remaining === 0) document.querySelector("#draw-btn").disabled = true;
      const card = data.cards[0];
      const img = document.createElement("img");
      img.src = card.image;
      img.alt = card.value + " of " + card.suit;
      document.querySelector("#cards").appendChild(img);
    });
});


// Poke API

// get all names and pick 3 random
fetch("https://pokeapi.co/api/v2/pokemon?limit=100000")
  .then(function(res) { return res.json(); })
  .then(function(data) {
    const allPokemon = data.results;
    const random = [];

    // pick 3 random pokemon
    while (random.length < 3) {
      const idx = Math.floor(Math.random() * allPokemon.length);
      if (!random.includes(allPokemon[idx])) random.push(allPokemon[idx]);
    }

    // fetch each Pokemon details
    return Promise.all(random.map(function(p) {
      return fetch(p.url).then(function(r) { return r.json(); });
    }));
  })
  .then(function(pokemonData) {
    // fetch their species info for flavor text
    return Promise.all(pokemonData.map(function(p) {
      return fetch(p.species.url)
        .then(function(r) { return r.json(); })
        .then(function(species) {
          const entry = species.flavor_text_entries.find(function(e) {
            return e.language.name === "en";
          });
          const flavor = entry ? entry.flavor_text.replace(/\f|\n/g, ' ') : "No description.";
          console.log(p.name + ": " + flavor);
        });
    }));
  });
