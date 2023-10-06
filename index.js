/* creating a responsive grid and changing the color*/
const wrapper = document.getElementById("tiles");
const colors = ["#f8c7cc", "#6b818c", "#cc2936", "#08415c", "#ffca3a"];
let count = -1;

const handleOnClick = (index) => {
  count = (count + 1) % colors.length;

  anime({
    targets: ".body",
    backgroundColor: colors[count],
    delay: 1500,
  });
  anime({
    targets: ".tile",
    backgroundColor: colors[count],
    delay: anime.stagger(50, {
      grid: [
        Math.floor(document.body.clientWidth / 50),
        Math.floor(document.body.clientHeight / 50),
      ],
      from: index,
    }),
  });
};

const createTile = (index) => {
  const click = document.getElementById("click");
  click.onclick = (e) => handleOnClick(Math.floor(Math.random() * (index + 1)));
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.onclick = (e) => handleOnClick(index);
  return tile;
};

const createTiles = (quantity) => {
  Array.from(Array(quantity)).forEach((_, index) => {
    wrapper.appendChild(createTile(index));
  });
};

const createGrid = () => {
  let columns = Math.floor(document.body.clientWidth / 50);
  let rows = Math.floor(document.body.clientHeight / 50);

  wrapper.innerHTML = "";
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);

  createTiles(columns * rows);
};

createGrid();
window.onresize = createGrid;

/* the effect on the ? button*/

const enhance = (id) => {
  const element = document.getElementById(id);
  const text = element.innerText.split("");

  element.innerHTML = "";

  text.forEach((value, index) => {
    const outer = document.createElement("span");
    outer.className = "outer";

    const inner = document.createElement("span");
    inner.className = "inner";
    inner.style.animationDelay = `${Math.floor(Math.random() * -5000)}ms`;

    const letter = document.createElement("span");
    letter.className = "letter";
    letter.innerText = value;
    letter.style.animationDelay = `${index * 1000}ms`;

    inner.appendChild(letter);
    outer.appendChild(inner);
    element.appendChild(outer);
    const handleClick = (element) => {
      if (element.classList.contains("rotate")) {
        element.classList.remove("rotate");
      } else {
        element.classList.add("rotate");
      }
    };
    letter.onclick = () => handleClick(letter);
  });
};

enhance("click");

enhance("click");

/* img list following cursor */

const div = document.querySelector(".mouse-pos-list-image");
const links = document.querySelectorAll(".row");
const carroussel = document.querySelector(".float-image-wrap");
const slide = 100 / links.length;
const wrap = document.getElementById("list-wrap");

document.addEventListener("mousemove", (e) => {
  div.style.left = e.pageX + "px";
  div.style.top = e.pageY + "px";
});

links.forEach((link, index) => {
  link.addEventListener("mouseover", () => {
    const translation = slide * index;
    carroussel.style.transform = `translateY(-${translation}%)`;
  });
});

wrap.addEventListener("mouseover", () => {
  div.classList.add("active");
});

wrap.addEventListener("mouseout", () => {
  div.classList.remove("active");
});

//presentation text slide in
document.addEventListener("DOMContentLoaded", function () {
  function wrapWordsWithSpan(element) {
    if (!element || element.nodeType !== 1) {
      return;
    }

    const textContent = element.textContent;
    const words = textContent.split(/\s+/); // Divise le texte en utilisant les espaces comme séparateurs

    const wrappedWords = words.map((word) => {
      if (word.trim() === "") {
        // Laisse les espaces vides, les retours à la ligne, etc., intacts
        return word;
      } else {
        const span = document.createElement("span");
        span.className = "words";
        span.textContent = word;
        return span.outerHTML;
      }
    });

    element.innerHTML = wrappedWords.join(" ");
  }

  // Utilisation de la fonction sur votre paragraphe
  const paragraph = document.querySelector(".presentation");
  wrapWordsWithSpan(paragraph);

  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  const words = document.querySelectorAll(".words");
  let animationPlayed = false; // Variable pour suivre si l'animation a déjà été jouée

  // Fonction pour ajouter la classe 'visible' lorsque les mots sont dans la vue
  function handleScroll() {
    if (!animationPlayed) {
      words.forEach((word) => {
        if (isElementInViewport(word)) {
          word.classList.add("visible");
        }
      });

      // Anime les éléments qui ont la classe 'visible'
      anime({
        targets: ".words",
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 400, // Durée de l'animation en millisecondes
        easing: "easeOutSine", // Fonction d'accélération
        delay: anime.stagger(100), // Délai entre chaque mot
      });

      animationPlayed = true; // Marque l'animation comme jouée
    }
  }

  // Écoutez l'événement de défilement de la page
  window.addEventListener("scroll", handleScroll);

  // Assurez-vous également de déclencher la vérification lorsque la page se charge initialement
  handleScroll();
});
