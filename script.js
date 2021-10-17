let centers = [];
const cards = document.querySelector(".row");
const searchBtn = document.querySelector(".search-butt-box").querySelector("button");
const searchBtnMd = document.querySelector(".search-butt-md")

let today_date, d, m, y;
today_date = new Date();
d = today_date.getDate();
m = today_date.getMonth() + 1;
y = today_date.getFullYear();
today_date = `${y}-${m}-${d}`;

// var date_box = document.getElementsByClassName("today-date")[0]
document.getElementsByClassName('today-date')[0].valueAsDate = new Date();

function cowinData(pincode,date) {
  let url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${date}`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      
      if(data.sessions !== []){
        data.sessions.map((e, i) => {
          let centerInfo = [
            e.name,
            e.address,
            e.vaccine,
            e.fee_type,
            e.min_age_limit,
            e.available_capacity_dose1,
            e.available_capacity_dose2,
            e.block_name,
            e.district_name,
            e.slots,

          ];
          centers.push(centerInfo);
          let code = `
          <div class="col-sm-11 col-md-11 col-lg-6">
        <div class="card">
        <div class="card-header">
              Centre Name:
            <h3 class="card-title">${centers[i][0]}</h3>
          </div>
          <div class="card-body">
            <p class="card-text">Centre Address: ${centers[i][1]}</p>

            <p class="card-text">Vaccine Name: ${centers[i][2]}</p>

            <p class="card-text">Fee: ${centers[i][3]}</p>

            <p class="card-text">Minimum Age Limit: ${centers[i][4]}</p>

            <p class="card-text">Available Capacity Dose 1: ${centers[i][5]}</p>

            <p class="card-text slot-time">Available Capacity Dose 2: ${centers[i][6]}</p>

            <p class="card-text slot-time">Block Name: ${centers[i][7]}</p>

            <p class="card-text slot-time">District Name: ${centers[i][8]}</p>

            <p class="card-text">Available Slots:</p>
            <p class="card-text slot-time">${centers[i][9].join(" | ")}</p>
          </div>
        </div>
      </div>
          `;
          cards.innerHTML += code;
        });
        // console.log(data.sessions.length);
        if(data.sessions.length === 0){
          alert("No Vaccinations Available")
        }
        centers = []
      } 


    } else{
        alert("Some error occured")
    }
  };

  xhr.send();
}

const input = document.querySelector(".search-input")
const date_input = document.querySelector(".today-date")
input.addEventListener("keypress", (e) => {
    if (e.which === 13) {
        let pincode = input.value;
        let date = date_input.value;
        console.log(date,typeof(date))
        cards.innerHTML = "";
        if (pincode === "") {
            alert("Enter pincode in the search box")
        } else if (pincode !== "") {
            cowinData(pincode, date)
        }
}})

searchBtn.addEventListener("click",() => {
        let pincode = input.value;
        let date = date_input.value;
        console.log(date,typeof(date))
        cards.innerHTML = "";
        if (pincode === "") {
            alert("Enter pincode in the search box")
        } else if (pincode !== "") {
            cowinData(pincode, dateFormatChanger(date))
        }
})

searchBtnMd.addEventListener("click",() => {
        let pincode = input.value;
        let date = date_input.value;
        console.log(date,typeof(date))
        cards.innerHTML = "";
        if (pincode === "") {
            alert("Enter pincode in the search box")
        } else if (pincode !== "") {
            cowinData(pincode, dateFormatChanger(date))
        }
})

function dateFormatChanger(date){
  var Date_date = new Date(date);
  let d, m, y;
  d = Date_date.getDate();
  m = Date_date.getMonth() + 1;
  y = Date_date.getFullYear();
  Date_date = `${d}-${m}-${y}`;
  return Date_date;
}
// var down_or_up=0;
// function dateDropDown(){
//   console.log("works")
//   var down_arrow = document.querySelector(".fa-chevron-left");
//   if(down_or_up==0){
//   down_arrow.style.transform="rotate(-90deg)";
//   down_or_up = 1;
//   } else {
//   down_arrow.style.transform="rotate(0deg)";
//   down_or_up = 0;
//   const date_input = document.querySelector(".today-date")
//   date_input.slideU
//   }
// }
// date_input.addEventListener('click',dateDropDown);