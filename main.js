let headerTechsContainer = document.querySelector(`.header-techs-container`),
  homeJobsContainer = document.querySelector(`.home-jobs-container`);

fetch(`./data.json`)
  .then((data) => data.json())
  .then((data) => {
    makeTheHomePage(data);
    makeTheFilteredCategories(document.querySelectorAll(`.category-btn`));
  });

// making the home page cards dynamically
function makeTheHomePage(data) {
  for (let i = 0; i < data.length; i++) {
    // making the home page cards elements
    let mainCardContainer = document.createElement(`div`);

    mainCardContainer.className = `relative flex flex-col items-start justify-between bg-white lg:px-8 px-4 pb-5 pt-10 drop-shadow-md md:flex-row md:items-center md:pt-5 md:gap-4`;

    let leftPart = document.createElement(`div`);
    leftPart.className = `flex flex-col items-start gap-4 pb-4 md:flex-row md:items-center md:pb-0`;

    let imgContainer = document.createElement(`div`);
    imgContainer.className = `absolute -top-[28px] w-14 md:static md:w-auto`;

    let img = document.createElement(`img`);
    img.src = data[i].logo;
    img.alt = data[i].company;

    let infoContainer = document.createElement(`div`);
    infoContainer.className = `flex flex-col gap-2`;

    let topInfo = document.createElement(`div`);
    topInfo.className = `flex items-center gap-3`;

    let companyName = document.createElement(`span`);
    companyName.className = `text-desaturated-dark-cyan`;

    companyName.innerHTML = data[i].company;

    let newEl = document.createElement(`span`);

    let featured = document.createElement(`span`);

    let job = document.createElement(`a`);
    job.className = `w-fit text-lg font-bold text-very-dark-grayish-cyan transition hover:text-desaturated-dark-cyan md:text-2xl cursor-pointer`;

    job.href = ``;

    job.innerHTML = `${data[i].position}`;

    let bottomInfo = document.createElement(`div`);
    bottomInfo.className = `flex gap-2`;

    bottomInfo.innerHTML = `
    <span class="text-dark-grayish-cyan">${data[i].postedAt}</span>
    <span class="text-dark-grayish-cyan">・</span>
    <span class="text-dark-grayish-cyan">${data[i].contract}</span>
    <span class="text-dark-grayish-cyan">・</span>
    <span class="text-dark-grayish-cyan">${data[i].location}</span>
    `;

    let hr = document.createElement(`hr`);
    hr.className = `mb-4 block h-0.5 w-full bg-dark-grayish-cyan md:hidden`;

    let rightPart = document.createElement(`div`);
    rightPart.className = `flex flex-wrap gap-3`;

    let roleBtn = document.createElement(`button`);
    roleBtn.className = `category-btn rounded-md bg-filter-light-grayish-cyan px-2 pt-1 font-bold text-desaturated-dark-cyan transition hover:bg-desaturated-dark-cyan hover:text-white`;

    roleBtn.innerHTML = `${data[i].role}`;

    let levelBtn = document.createElement(`button`);
    levelBtn.className = `category-btn rounded-md bg-filter-light-grayish-cyan px-2 pt-1 font-bold text-desaturated-dark-cyan transition hover:bg-desaturated-dark-cyan hover:text-white`;

    levelBtn.innerHTML = `${data[i].level}`;

    rightPart.appendChild(roleBtn);
    rightPart.appendChild(levelBtn);

    for (let j = 0; j < data[i].languages.length; j++) {
      let language = document.createElement(`button`);
      language.className = `category-btn rounded-md bg-filter-light-grayish-cyan px-2 pt-1 font-bold text-desaturated-dark-cyan transition hover:bg-desaturated-dark-cyan hover:text-white`;

      language.innerHTML = `${data[i].languages[j]}`;

      rightPart.appendChild(language);
    }

    for (let j = 0; j < data[i].tools.length; j++) {
      let tool = document.createElement(`button`);
      tool.className = `category-btn rounded-md bg-filter-light-grayish-cyan px-2 pt-1 font-bold text-desaturated-dark-cyan transition hover:bg-desaturated-dark-cyan hover:text-white`;

      tool.innerHTML = `${data[i].tools[j]}`;

      rightPart.appendChild(tool);
    }

    mainCardContainer.appendChild(leftPart);
    mainCardContainer.appendChild(hr);
    mainCardContainer.appendChild(rightPart);

    leftPart.appendChild(imgContainer);
    leftPart.appendChild(infoContainer);

    imgContainer.appendChild(img);

    infoContainer.appendChild(topInfo);
    infoContainer.appendChild(job);
    infoContainer.appendChild(bottomInfo);

    topInfo.appendChild(companyName);

    if (data[i].new) {
      newEl.className = `rounded-full bg-desaturated-dark-cyan px-2 pt-1 uppercase text-white`;

      newEl.innerHTML = `New!`;

      topInfo.appendChild(newEl);
    }

    if (data[i].featured) {
      mainCardContainer.classList.add(`rounded-l-md`);
      mainCardContainer.classList.add(`border-l-[6px]`);
      mainCardContainer.classList.add(`border-l-desaturated-dark-cyan`);

      featured.className = `rounded-full bg-very-dark-grayish-cyan px-2 pt-1 uppercase text-white`;

      featured.innerHTML = `Featured`;

      topInfo.appendChild(featured);
    }
    homeJobsContainer.appendChild(mainCardContainer);
  }
  //
}
//

// make the header categories
function makeTheFilteredCategories(btn) {
  btn.forEach((el) => {
    el.addEventListener(`click`, () => {
      // appearing the header
      if (headerTechsContainer.classList.contains(`hidden`)) {
        headerTechsContainer.classList.remove(`hidden`);
      }
      //

      // making the header category without repeating
      if (!el.classList.contains(`active`)) {
        let span = document.createElement(`span`);
        span.className = `filtered flex items-center gap-2 rounded-md bg-filter-light-grayish-cyan pl-2 text-desaturated-dark-cyan`;

        span.innerHTML = `${el.innerText}`;

        img = document.createElement(`img`);
        img.src = `./images/icon-remove.svg`;
        img.alt = "remove-icon";
        img.className = `remove-icon cursor-pointer rounded-r-md bg-desaturated-dark-cyan p-2 transition hover:bg-very-dark-grayish-cyan`;

        span.appendChild(img);

        headerTechsContainer.children[0].appendChild(span);
      }
      //

      // increasing the home page padding when header getting bigger
      if (headerTechsContainer.clientHeight > 108) {
        homeJobsContainer.classList.add(`pt-40`);
      }
      //

      for (let i = 0; i < btn.length; i++) {
        if (el.innerText == btn[i].innerText) {
          btn[i].classList.add(`active`);
        }
      }

      // filter the home page cards after choosing a category
      for (let i = 0; i < homeJobsContainer.children.length; i++) {
        isSubset(
          homeJobsContainer.children[i].children[2].children,
          headerTechsContainer.children[0].children,
          homeJobsContainer.children[i].children[2].children.length,
          headerTechsContainer.children[0].children.length,
          homeJobsContainer.children[i],
        );
      }
      //

      // deleting the non-filtered cards
      for (let i = 0; i < homeJobsContainer.children.length; i++) {
        if (homeJobsContainer.children[i].classList.contains(`del`)) {
          homeJobsContainer.children[i].classList.add(`hidden`);
        }
      }
      //

      // remove icon script
      document.querySelectorAll(`.remove-icon`).forEach((ele) => {
        ele.addEventListener(`click`, () => {
          // appearing all home page cards first
          for (let i = 0; i < homeJobsContainer.children.length; i++) {
            homeJobsContainer.children[i].classList.remove(`hidden`);
            homeJobsContainer.children[i].classList.remove(`del`);
          }
          //

          // remove active class from any card button that contains the same text of the deleted category
          for (let i = 0; i < btn.length; i++) {
            if (el.innerText == btn[i].innerText) {
              btn[i].classList.remove(`active`);
            }
          }
          //

          // removing the clicked target
          ele.parentElement.remove();
          //

          // filter the home page cards after deleting a category
          for (let i = 0; i < homeJobsContainer.children.length; i++) {
            isSubset(
              homeJobsContainer.children[i].children[2].children,
              headerTechsContainer.children[0].children,
              homeJobsContainer.children[i].children[2].children.length,
              headerTechsContainer.children[0].children.length,
              homeJobsContainer.children[i],
            );
          }
          //

          // deleting the non-filtered cards
          for (let i = 0; i < homeJobsContainer.children.length; i++) {
            if (homeJobsContainer.children[i].classList.contains(`del`)) {
              homeJobsContainer.children[i].classList.add(`hidden`);
            }
          }
          //

          // decreasing the home page padding when header getting smaller
          if (headerTechsContainer.clientHeight <= 108) {
            homeJobsContainer.classList.remove(`pt-40`);
          }
          //

          // deleting the header when it's empty
          if (headerTechsContainer.children[0].children.length == 0) {
            headerTechsContainer.classList.add(`hidden`);
          }
          //
        });
      });
      //
    });
  });

  //
  document.querySelector(`.clear-btn`).onclick = () => {
    const length = headerTechsContainer.children[0].children.length;
    // removing all header children
    for (let i = 0; i < length; i++) {
      headerTechsContainer.children[0].children[0].remove();
    }
    // from active from all cards buttons
    for (let i = 0; i < btn.length; i++) {
      if (btn[i].classList.contains(`active`)) {
        btn[i].classList.remove(`active`);
      }
    }
    //

    // appear all home page cards again
    for (let i = 0; i < homeJobsContainer.children.length; i++) {
      homeJobsContainer.children[i].classList.remove(`del`);
      homeJobsContainer.children[i].classList.remove(`hidden`);
    }
    //

    headerTechsContainer.classList.add(`hidden`);

    homeJobsContainer.classList.remove(`pt-40`);
  };
}

// check if the whole header categories is subset of the card categories
function isSubset(cardCategories, headerCategories, m, n, mainCard) {
  let i = 0;
  let j = 0;
  for (i = 0; i < n; i++) {
    for (j = 0; j < m; j++)
      if (headerCategories[i].innerText == cardCategories[j].innerText) break;
    if (j == m) {
      mainCard.classList.add(`del`);
    }
  }
  return true;
}
//
