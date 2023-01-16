const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "dce88789d3msh07833bd003538a6p1b9a31jsna4973f915751",
    "X-RapidAPI-Host": "tasty.p.rapidapi.com",
  },
};

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  fetch(
    `https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${
      document.querySelector("input").value
    }`,
    options
  )
    .then((response) => response.json())
    .then((response) => recipeDisplay(response.results))
    .catch((err) => console.error(err));
});

function recipeDisplay(recipe) {
  console.log(recipe);
  const mainArticle = document.getElementById("main_article");

  recipe.forEach((element) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.style.width = "35rem";
    card.style.backgroundColor = "orange";

    const title = document.createElement("h2");

    title.textContent =
      element.slug.charAt(0).toUpperCase() +
      element.slug.slice(1).split("-").join(" ");

    const imageFront = document.createElement("img");
    imageFront.setAttribute("class", "front-card-image card-image");

    imageFront.setAttribute("src", element.thumbnail_url);

    const imageBack = document.createElement("img");
    imageBack.setAttribute("class", "back-card-image");
    // imageBack.setAttribute("src", element.original_video_url);
    li.innerHTML = `<a id="${element.original_video_url}" href="#"`
    imageBack.append(li)
    //add href anchor tag

    const front = document.createElement("div");
    front.setAttribute("class", "card-front");

    const back = document.createElement("div");
    back.setAttribute("class", "card-back");

    const infoFrontArea = document.createElement("section");
    infoFrontArea.setAttribute("class", "card-info");

    const infoBackArea = document.createElement("section");
    infoBackArea.setAttribute("class", "card-info");

    if (element.instructions) {
      //write function for getting ingredient and
      element.sections.forEach((el) => {
        const ul = document.createElement("ul");

        el.components.forEach((e) => {
          const li = document.createElement("li");
          li.innerText = `${e.raw_text}`;
          ul.append(li);
        });
        infoFrontArea.append(ul);
      });

      element.instructions.forEach((el) => {
        const infoBack = document.createElement("p");
        infoBackArea.append(infoBack);
        infoBack.innerText = `${el.display_text}`;
      });
    } else if (element.recipes) {
      recipeDisplay(element.recipes);
    }

    card.append(front, back);
    front.append(title, imageFront, infoFrontArea);
    back.append(imageBack, infoBackArea);
    mainArticle.append(card);
  });
}
