const form = document.querySelector(".input-container");
const output = document.querySelector(".output");

class Sites {
  sites;

  constructor() {
    this.getSites();
  }

  getSites() {
    this.sites = JSON.parse(localStorage.getItem("sites"));

    if (this.sites === null) {
      this.sites = [];
    }

    return this.sites;
  }

  displaySites(sites) {
    output.innerHTML = "";

    this.sites.forEach((site, index) => {
      const sitesCard = document.createElement("div");
      sitesCard.classList.add("sites-card");
      const nameCard = document.createElement("span");
      nameCard.classList.add("card-title");
      nameCard.textContent = site.name;
      const btnContainer = document.createElement("div");
      btnContainer.classList.add("btn-container");
      const buttonVisit = document.createElement("button");
      buttonVisit.classList.add("visit-btn");
      const visitTransfer = document.createElement("a");
      visitTransfer.setAttribute("target", "_blank");
      visitTransfer.style.width = "100%";
      visitTransfer.style.height = "100%";
      visitTransfer.textContent = "Visit";
      visitTransfer.setAttribute("href", site.url);
      const buttonDelete = document.createElement("button");
      buttonDelete.classList.add("delete-btn");
      buttonDelete.textContent = "Delete";

      buttonVisit.appendChild(visitTransfer);

      btnContainer.appendChild(buttonVisit);
      btnContainer.appendChild(buttonDelete);

      sitesCard.appendChild(nameCard);
      sitesCard.appendChild(btnContainer);

      buttonDelete.addEventListener("click", () => {
        this.sites.splice(index, 1);
        this.saveToStorage();
        buttonDelete.parentElement.parentElement.remove();
      });

      output.appendChild(sitesCard);
    });
  }

  addSite(site) {
    this.sites.push(site);
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem("sites", JSON.stringify(this.sites));
  }
}

const sites = new Sites();

sites.displaySites(sites.sites);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const siteName = document.querySelector("#name-site").value;
  const urlName = document.querySelector("#url-site").value;

  if (siteName === "" || urlName === "") {
    alert("Please Enter a valid text...");
  } else {
    const newSite = {
      name: siteName,
      url: urlName,
    };

    sites.addSite(newSite);
    sites.displaySites();

    document.querySelector("#name-site").value = "";
    document.querySelector("#url-site").value = "";
  }
});
