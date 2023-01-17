const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f16a58fc9dmsh11fbd6bb9adabaap1f2a0djsnb98d54d3bbd4",
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
      .then((response) => recipeDisplay(response))
      .catch((err) => console.error(err));
  });
  
  function recipeDisplay(recipe) {
    console.log(recipe);
    const mainArticle = document.getElementById("main_article");
  
    recipe.results.forEach((element) => {
      const flipCard = document.createElement("div");
      flipCard.setAttribute("class", "flip-card");
  
      const flipCardInner = document.createElement("div");
      flipCardInner.setAttribute("class", "flip-card-inner");
  
      const flipCardFront = document.createElement("div");
      flipCardFront.setAttribute("class", "flip-card-front");
  
      const flipCardBack = document.createElement("div");
      flipCardBack.setAttribute("class", "flip-card-back");
      flipCardBack.setAttribute("src", element.original_video_url);
      // const imageBack = document.createElement("img");
      // imageBack.setAttribute("class", "back-card-image");
      // imageBack.setAttribute("src", element.original_video_url);
  
      flipCard.style.width = "35rem";
      flipCard.style.backgroundColor = "orange"
  
      const title = document.createElement("h2");
  
      title.textContent =
        element.slug.charAt(0).toUpperCase() +
        element.slug.slice(1).split("-").join(" ");
  
      const imageFront = document.createElement("img");
      imageFront.setAttribute("class", "front-card-image card-image");
      imageFront.setAttribute("src", element.thumbnail_url);
  
  
  
      const front = document.createElement("div");
      front.setAttribute("class", "card-front");
  
      const back = document.createElement("div");
      back.setAttribute("class", "card-back");
  
      const infoArea = document.createElement("section");
      infoArea.setAttribute("class", "card-info");
  
      const infoFront = document.createElement("p");
      infoArea.append(infoFront);
      // infoFront.innerText = `${element.     }`;
  
      
  
      element.instructions.forEach((el) => {
        const infoBack = document.createElement("p");
        infoArea.append(flipCardBack);
        infoBack.innerText = `${el.display_text}`;
      });
  
      // flipCard.append(front, back);
      // front.append(title, imageFront);
      // back.append(flipCardBack, infoArea);
      // mainArticle.append(flipCard);
    });
  }
  