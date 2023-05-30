let details = document.querySelector("#details");
let id = new URLSearchParams(window.location.search).get("id");
const carddtUrl = "http://localhost:8080/card";
async function drawDetails() {
  let res = await axios(`${carddtUrl}/${id}`);
  let data = res.data;

  details.innerHTML = `
   <div class="col-lg-4 offset-lg-3" id="card">
   <div class="card">
     <img src="${data.photo}" alt="" />
     <div id="details">
       <a href="./details.html" class="btn btn-light">View Details</a>
     </div>
     <h6>${data.title} <i class="fa-regular fa-heart"></i></h6>
   
     <p> Price : $${data.price}</p>
   
   </div>
   </div>
   `;
}
drawDetails();
