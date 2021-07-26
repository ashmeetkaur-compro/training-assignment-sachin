
console.log("hi")

let str = "";
let restOfTabs = "";
let d;

function speakerDetails() {
  console.log("Started getData")
  link = "../assets/speaker-details.json";
  fetch(link).then((response1) => {
    console.log("speaker details");
    return response1.json();

  }).then((details) => {
    d = details;
    getData(defaultTab);
  })

}



function getData(callback) {
  console.log("Started getData")
  url = "../assets/index.json";
  fetch(url).then((response) => {
    console.log("Inside first then")
    return response.json();
  }).then((data) => {

    data.forEach((tabData) => {
      str += `<button class="tablinks" onclick="openTab(event, '${tabData.tabsId}')" id="${tabData.id}">
                    <div class=schedule>Day ${tabData.tabId}</div>
                    <div class=schedule_date>${tabData.date}
                    </div>
                    </button>`;
      let tabId = `<div id="${tabData.tabsId}" class="tabcontent">`;
      let slots = tabData.slots;
      let sstr = "";
      let timeVenue = "";
      let part = "";

      slots.forEach((slot, index) => {
        let speakerPart2 = "";
        let speakers = slot.speakers;
        timeVenue = `<div class=row${index + 1}>
                        <div class=left>
                          <div class=time_schedules>
                            <span> <i class="fa fa-clock-o" aria-hidden="true"></i> </span>
                            <div> ${slot.time}</div>
                          </div>
                          <div class=location_schedules>
                            <span> <i class="fa fa-map-marker"></i> </span>
                            <div> ${slot.venue}</div>
                          </div>`;

        if ((speakers) && speakers.length > 0) {

          timeVenue += `<div class=speaker-details>
      <span> <i class='fa fa-microphone'></i> </span>
      <div class="speakers">
        <span>By </span>`



          speakers.forEach((speaker) => {
            let p = `${speaker}`;


            //addition here
            speakerPart2 += `<a class=speaker_link href="${d[p].infoLink}">${speaker},</a>`

          })
          timeVenue += speakerPart2;

          timeVenue += `</div>
                          </div>`
        }
        timeVenue += `</div>`;
        if (index == 0 || index == 3) {
          timeVenue += `<div class=right>
                          <h3 class=title_schedule>
                          ${slot.title}
                          </h3>`

        }
        else {
          timeVenue += `<div class=right>
                          <h3 class=day_events>
                          ${slot.title}
                          </h3>`}
        let ros4 = "";
        if ((speakers) && speakers.length > 0) {

          timeVenue = timeVenue + `<div class=small_speaker_images>`

          speakers.forEach((speaker) => {
            let p = `${speaker}`;


            ros4 += `<div class=image1>
          <a href="${d[p].infoLink}">
            <img class=small_image
              src="${d[p].imageLink}">
          </a>
          </div>`
          })
          timeVenue += ros4 + '</div>';

        }


        let ros6 = "";
        if (slot.descreption && slot.descreption !== "") {
          ros6 = `<button class="accordion"><i class="fa fa-plus" style="color:black"> </i></button>
                          <div class="panel">
                            <p>${slot.descreption}</p>
                          </div>`}
        timeVenue += ros6;
        timeVenue += `</div>
                      </div>`;


        part += timeVenue;


      })

      restOfTabs += tabId + part + `</div>`;




    });
    console.log(restOfTabs);




    document.getElementById('tab').innerHTML = str;
    document.getElementById('populate').innerHTML = restOfTabs;

    console.log("completed");
    callback();





  })
}

function openTab(evt, day) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(day).style.display = "block";
  evt.currentTarget.className += " active";
}
function defaultTab() {
  document.getElementById("defaultOpen").click();
}

console.log("executing function");


function execution(callback){
  var acc = document.getElementsByClassName("accordion");
      var i;

      for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
          this.classList.toggle("active");
          var panel = this.nextElementSibling;
          if (panel.style.display === "block") {
            panel.style.display = "none";
          } else {
            panel.style.display = "block";
          }
        });
      }
      callback();
  


}
execution(speakerDetails)