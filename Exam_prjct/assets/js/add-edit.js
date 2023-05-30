let text = document.querySelector("#text");
let btn = document.querySelector("#btn");
let exampleInputTitle = document.querySelector("#exampleInputTitle");
let exampleInputPrice = document.querySelector("#exampleInputPrice");
let exampleInputPhoto = document.querySelector("#exampleInputPhoto");
let myForm = document.querySelector("#myForm");
let id = new URLSearchParams(window.location.search).get("id");
const cardsUrl = "http://localhost:8080/card";

async function editCard() {
  const res = await axios(`${cardsUrl}/${id}`);
  const obj = res.data;
  console.log(obj);
  text.innerHTML = "Edit Card";
  btn.innerHTML = "Edit ";
  exampleInputTitle.value = obj.title;
  exampleInputPrice.value = obj.price;
}

if (id) {
  editCard();
}

myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let obj = {
    photo: `./assets/image/${exampleInputPhoto.value.split("\\")[2]}`,
    title: exampleInputTitle.value,
    price: exampleInputPrice.value,
  };

  if (id) {
    axios.put(`${cardsUrl}/${id}`, obj);
    window.location.href = "index.html";
  } else {
    axios.post(cardsUrl, obj);
  }
});
