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
// double recursion

//to make recipe to display
function recipeDisplay(recipe) {
  console.log(recipe);
  const mainArticle = document.getElementById("main_article");

  //making recipe cards and styling it
  recipe.forEach((element) => {
    const card = document.createElement("div");
    card.setAttribute("class", "card");
    card.style.width = "35rem";
    card.style.backgroundColor = "orange";

    // creating title header and content"name of recipe"
    const title = document.createElement("h2");
    title.textContent =
      element.slug.charAt(0).toUpperCase() +
      element.slug.slice(1).split("-").join(" ");

    // making the image for the front
    const imageFront = document.createElement("img");
    imageFront.setAttribute("class", "front-card-image card-image");
    imageFront.setAttribute("src", element.thumbnail_url);

    const front = document.createElement("div");
    front.setAttribute("class", "card-front");

    const back = document.createElement("div");
    back.setAttribute("class", "card-back");

    const infoFrontArea = document.createElement("section");
    infoFrontArea.setAttribute("class", "card-info");

    const infoBackArea = document.createElement("section");
    infoBackArea.setAttribute("class", "card-info");

    //for the video
    if (
      element.original_video_url !== undefined &&
      element.original_video_url !== null
    ) {
      const videoBack = document.createElement("video");
      videoBack.setAttribute("class", "back-card-video");
      videoBack.src = `${element.original_video_url}`;
      // to play and pause on click
      videoBack.addEventListener("click", () => {
        if (videoBack.paused) videoBack.play();
        else videoBack.pause();
      });
      videoBack.style.height = "350px";
      videoBack.style.width = "350px";

      const videoBackTitle = document.createElement("h3");
      videoBackTitle.innerText = "Click Video to play/pause";

      videoBack.prepend(videoBackTitle);
      back.prepend(videoBack);
    }

//for getting ingredient and put it in a list
    if (element.instructions) {
      
      element.sections.forEach((el) => {
        const ul = document.createElement("ul");

        el.components.forEach((e) => {
          const li = document.createElement("li");
          li.innerText = `${e.raw_text}`;
          ul.append(li);
        });
        infoFrontArea.append(ul);
      });

// making instructions
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
    back.append(infoBackArea);
    mainArticle.append(card);
  });
}
