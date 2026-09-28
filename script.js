// CONTACTFORMULIER

const form = document.querySelector(".contact-form");

function showError(input, message) {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = message;
}

function clearError(input) {
  const error = document.querySelector(`#${input.id}-error`);
  error.textContent = "";
}

function validateName(input) {
  if (input.value.trim() === "") {
    showError(input, "Vul je naam in.");
    return false;
  }

  clearError(input);
  return true;
}

function validateEmail(input) {
  if (!input.validity.valid || input.value.trim() === "") {
    showError(input, "Vul een geldig e-mailadres in.");
    return false;
  }

  clearError(input);
  return true;
}

function validateMessage(input) {
  if (input.value.trim().length < 10) {
    showError(input, "Je bericht moet minimaal 10 tekens bevatten.");
    return false;
  }

  clearError(input);
  return true;
}

function validateForm(event) {
  event.preventDefault();

  const formMessage = document.querySelector("#form-message");
  formMessage.textContent = "";

  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const message = document.querySelector("#message");

  const nameValid = validateName(name);
  const emailValid = validateEmail(email);
  const messageValid = validateMessage(message);

  if (nameValid && emailValid && messageValid) {
    formMessage.textContent = "Bedankt! Je bericht is correct ingevuld.";
    form.reset();
  }
}

function clearFormMessage() {
  document.querySelector("#form-message").textContent = "";
}

if (form) {
  form.addEventListener("submit", validateForm);
  form.addEventListener("input", clearFormMessage);
}


// PROJECTEN

const projects = [
  {
    titel: "Hotel Simulation",
    category: "school",
    taal: "Java",

    description:
      "Hotel Simulation is een groepsproject dat ik tijdens mijn opleiding heb gemaakt. Het doel van het project was om met Java een simulatie van een hotel te ontwikkelen. In de simulatie bewegen gasten door het hotel en maken ze gebruik van verschillende faciliteiten, zoals hotelkamers, het restaurant, de fitness en de bioscoop.",

    simulation:
      "In de simulatie kunnen gasten inchecken, door het hotel bewegen, verschillende faciliteiten bezoeken en weer uitchecken. De simulatie kan gestart, gepauzeerd en gestopt worden. Ook kan de snelheid van de simulatie worden aangepast en kunnen verschillende scenario's worden gestart. Daarnaast bevat de simulatie schoonmakers die taken krijgen wanneer hotelkamers schoongemaakt moeten worden.",

    contribution:
      "Mijn belangrijkste bijdrage aan het project was het maken van de classes voor de schoonmakers. De schoonmakers kunnen schoonmaaktaken krijgen, naar de juiste kamer bewegen en de schoonmaaktaak uitvoeren. Daarnaast heb ik meegewerkt aan het UML-diagram van het project. Hiermee brachten we de verschillende classes en hun onderlinge relaties in kaart.",

    learned:
      "Tijdens dit project heb ik meer geleerd over programmeren met Java en het werken met verschillende classes binnen één applicatie. Ook heb ik ervaring opgedaan met samenwerken aan een groter programmeerproject en met het gebruiken van UML om de structuur van een programma weer te geven."
  },

  {
    titel: "Test Persoonlijk Project",
    category: "persoonlijk",
    taal: "JavaScript",

    description:
      "Dit is een tijdelijk testproject om te controleren of het filter voor persoonlijke projecten werkt.",

    simulation:
      "Dit project heeft geen echte functionaliteit en wordt alleen gebruikt om de filterfunctie te testen.",

    contribution:
      "Ik heb dit testproject toegevoegd aan de projecten-array.",

    learned:
      "Hiermee kan ik controleren of JavaScript projecten op basis van hun categorie kan filteren."
  }
];

function renderProjects(projectsToShow) {
  const projectList = document.querySelector("#project-list");

  if (!projectList) {
    return;
  }

  projectList.innerHTML = "";

  projectsToShow.forEach(function(project) {
    const article = document.createElement("article");

    article.classList.add("card", "project");

    article.innerHTML = `
      <h2>${project.titel}</h2>

      <p><strong>Taal:</strong> ${project.taal}</p>

      <h3>Over het project</h3>
      <p>${project.description}</p>

      <h3>De simulatie</h3>
      <p>${project.simulation}</p>

      <h3>Mijn bijdrage</h3>
      <p>${project.contribution}</p>

      <h3>Wat heb ik geleerd?</h3>
      <p>${project.learned}</p>
    `;

    projectList.appendChild(article);
  });
}

function filterProjects(filter) {
  if (filter === "alle") {
    renderProjects(projects);
    return;
  }

  const filteredProjects = projects.filter(function(project) {
    return project.category === filter;
  });

  renderProjects(filteredProjects);
}

const filterButtons = document.querySelectorAll(".project-filters button");

filterButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const filter = button.dataset.filter;
    filterProjects(filter);
  });
});

renderProjects(projects);

// BLOG

function toggleBlog(button) {
  const blogItem = button.closest(".blog-item");
  const extraInfo = blogItem.querySelector(".blog-extra");

  if (extraInfo.hidden) {
    extraInfo.hidden = false;
    button.textContent = "Minder informatie";
  } else {
    extraInfo.hidden = true;
    button.textContent = "Meer informatie";
  }
}

const blogButtons = document.querySelectorAll(".blog-toggle");

blogButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    toggleBlog(button);
  });
});

// WIKIPEDIA API

async function loadWikipedia(club) {
  const pageName = club.dataset.wikipedia;

  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${pageName}`
    );

    if (!response.ok) {
      throw new Error("Wikipedia kon niet worden geladen.");
    }

    const data = await response.json();

    const shortText = data.extract.substring(0, 250) + "...";

club.innerHTML = `
  <p class="api-label">Informatie opgehaald via Wikipedia API</p>
  <p>${shortText}</p>
  <a href="${data.content_urls.desktop.page}" target="_blank">
    Bekijk op Wikipedia
  </a>
`;
  } catch (error) {
    club.innerHTML = `
      <p class="api-error">
        De Wikipedia-gegevens konden niet worden geladen.
      </p>
    `;
  }
}

function loadClubs() {
  const clubs = document.querySelectorAll(".wiki-info");

  clubs.forEach(function(club) {
    loadWikipedia(club);
  });
}

loadClubs();