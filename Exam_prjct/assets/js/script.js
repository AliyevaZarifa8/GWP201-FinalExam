const cardUrl = "http://localhost:8080/card";
const basketUrl = "http://localhost:8080/basket";
let dmncCard = document.querySelector("#dmnc-card");
let searchInp = document.querySelector("#search");
let sortBtn = document.querySelector("#sort");
let showMore = document.querySelector("#showMore");
let navbar = document.querySelector("#navbar");

function scrollFun() {
  let x =
    document.body.scrollTop > 900 || document.documentElement.scrollTop > 900;
  if (x) {
    navbar.style.background = "";
  } else {
    navbar.style.background = "white";
  }
}

window.addEventListener("scroll", function () {
  scrollFun();
});

let filterData = [];
let getallData = [];
let sortData = [];
let evrData = [];
let sort = "asc";
let maxLen = 4;

async function drawCard() {
  const res = await axios(cardUrl);
  const data = res.data;
  getallData = data;

  filterData =
    filterData.length || searchInp.value
      ? filterData.slice(0, maxLen)
      : getallData.slice(0, maxLen);
  dmncCard.innerHTML = "";

  filterData.forEach((element) => {
    dmncCard.innerHTML += `
        <div class="col-lg-3  col-md-6 col-sm-12" id="card">
            <div class="card">
              <img src="${element.photo}" alt="" />
              <div id="details">
                <a href="details.html?id=${element.id}" class="btn btn-light">View Details</a>
              </div>
              <h6>${element.title} <i class="fa-regular fa-heart"></i></h6>

              <p> Price : $${element.price}</p>

              <div class="dnmc-icon">
                <a href="add-edit.html?id=${element.id}"
                  ><i class="fa-regular fa-pen-to-square" id="edit"></i
                ></a>
                <i class="fa-solid fa-trash" id="delete" onclick=deleteCard("${element.id}")></i>
                <i class="fa-solid fa-cart-plus" id="basket" onclick=addBasket("${element.id}")></i>
              </div>
            </div>
          </div>
        
        `;
  });
}
drawCard();

async function deleteCard(id) {
  axios.delete(`${cardUrl}/${id}`);
}
async function addBasket(id) {
  console.log(id);
  const res = await axios(`${cardUrl}/${id}`);
  const obj = await res.data;
  console.log(obj);
   axios.post(basketUrl, obj);
}

showMore.addEventListener("click", function () {
  getallData.length > maxLen + 3
    ? maxLen + 4
    : (maxLen = maxLen - (maxLen - getallData.length));
  drawCard();
  filterData = getallData.slice(0, maxLen);
});

searchInp.addEventListener("input", function (e) {
  filterData = getallData.filter((item) => {
    return item.title.toLowerCase().includes(e.target.value.toLowerCase());
  });

  drawCard();
  getallData = filterData;
  evrData = filterData;
});

sortBtn.addEventListener("click", function () {
  sortData = filterData;
  if (sort == "asc") {
    sortBtn.innerHTML = "Sort By Asc";
    sort = "dcs";
    sortData.sort((a, b) => a.price - b.price);

    drawCard();
  } else if (sort == "dcs") {
    sortBtn.innerHTML = "Sort By Dcs";
    sort = "def";
    sortData.sort((a, b) => b.price - a.price);

    drawCard();
  } else {
    filterData = searchInp.value ? evrData : getallData;
    sortBtn.innerHTML = "Sort By";
    sort = "asc";
    drawCard();
  }
});
