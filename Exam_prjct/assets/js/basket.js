let basket = document.querySelector(".basket");
const basketsUrl = "http://localhost:8080/basket";

async function drewBasket() {
  basket.innerHTML = "";

  const res = await axios(basketsUrl);
  const data = res.data;

  data.forEach((element) => {
    basket.innerHTML += `
    <div class="col-lg-3" id="card">
    <div class="card">
      <img src="${element.photo}" alt="" />
      <div id="details">
        <a href="details.html?id=${element.id}" class="btn btn-light">View Details</a>
      </div>
      <h6>${element.title} <i class="fa-regular fa-heart"></i></h6>

      <p> Price : $${element.price}</p>

      
    </div>
  </div>

`;
  });
}
drewBasket();
