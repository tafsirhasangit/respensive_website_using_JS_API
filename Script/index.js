fetch("https://openapi.programming-hero.com/api/news/categories")
  .then((response) => response.json())
  .then((data) => navBar(data))
  .catch((error) => console.error(error));

const navBar = (data) => {
  const navBarTitle = document.getElementById("navBar-block");
  const createNavbar = document.createElement("ul");
  createNavbar.className = "nav justify-content-center"

  createNavbar.innerHTML = `
    
      <li class="nav-item list" data-category="01" id="01">
        <a class="nav-link fs-4 fw-semibold" href="#" >${data.data.news_category[0].category_name}</a>
      </li>
      <li class="nav-item list" data-category="02" id="02">
        <a class="nav-link fs-4 fw-semibold" href="#">${data.data.news_category[1].category_name}</a>
      </li>
      <li class="nav-item list" data-category="03" id="03">
        <a class="nav-link fs-4 fw-semibold" href="#">${data.data.news_category[3].category_name}</a>
      </li>
      <li class="nav-item list" data-category="04" id="04">
        <a class="nav-link active fs-4 fw-semibold" aria-current="page" href="#">${data.data.news_category[4].category_name}</a>
      </li>
      <li class="nav-item list" data-category="05" id="05">
        <a class="nav-link fs-4 fw-semibold" href="#">${data.data.news_category[5].category_name}</a>
      </li>
      <li class="nav-item list" data-category="06" id="06">
        <a class="nav-link fs-4 fw-semibold" href="#">${data.data.news_category[6].category_name}</a>
      </li>
      <li class="nav-item list" data-category="07" id="07">
        <a class="nav-link fs-4 fw-semibold" href="#">${data.data.news_category[7].category_name}</a>
      </li>
    
  `;
  navBarTitle.appendChild(createNavbar);
  
  const listEls = document.querySelectorAll('.list');

  listEls.forEach((el, index) => {
    const category = el.dataset.category;
    el.addEventListener("click", function () {
      const apiLink = `https://openapi.programming-hero.com/api/news/category/${category}`;
      fetch(apiLink)
        .then((response) => response.json())
        .then((data) => {
          
          displayNews1(data.data);
        })
        .catch((error) => {
          
          console.error(error);
        });
    });
  })
 
};



const displayNews1 = (news1) => {
  const news1container = document.getElementById("news1-container");
  news1container.innerHTML = "";
  for (let i = 0; i < news1.length; i++) {
    const key = news1[i];
    

    const newsDiv = document.createElement("div");
    newsDiv.classList.add("col");
    newsDiv.innerHTML = `
      <div class="row pt-5">
        <div class="col-md-4" class="card mb-5">
          <img src="${key.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title mb-2 card-title-css">${key.title}</h5>
            <p class="card-text mb-2">${key.details}</p>
          </div>
          <div class="container text-center">
            <div class="row">
              <div class="col-sm-4">
                <div class="row">
                  <div class="col-md-6">
                    <img class="rounded-img" src="${key.author.img}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-6">
                    <div class="row">
                      <div class="col-md-12">
                        ${key.author.name}
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        ${key.author.published_date}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-sm-3">${key.total_view}</div>
              <div class="col-sm-3">${key.rating.number}</div>
              <div class="col-sm-2">
                <button onClick="loadModal(${i})" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    news1container.appendChild(newsDiv);
  }
};

const loadModal = async (index) => {
  const url = 'https://openapi.programming-hero.com/api/news/category/01';
  const response = await fetch(url);
  const data = await response.json();
  displayModal(data.data[index]);
  
};

const displayModal = modal => {
  console.log(modal);
  const modalTitle = document.getElementById('modalTitle');
  modalTitle.innerText = modal.title;

  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = modal.details;


  const totalViewsModal = document.getElementById('total-views-modal');
if (modal.total_view) {
  totalViewsModal.innerText = modal.total_view;
} else {
  totalViewsModal.innerText = 'data is not available';
}


  const ratingModal = document.getElementById('rating-modal');
  ratingModal.innerText = modal.rating.number;
  
}


const navBar2 = document.querySelector("#navBar-block");


navBar2.addEventListener("click", () => {

  const footer = document.querySelector("#myFooter");
  
  
  footer.classList.remove("d-none");
});
