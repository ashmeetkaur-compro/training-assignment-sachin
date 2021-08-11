let tabString = "";
let restOfTabs = "";
let speakerData;

function speakerDetails() {
  const link = "../assets/speaker-details.json";
  fetch(link).then((response1) => {
    return response1.json();
  }).then((details) => {
    speakerData = details;
    getData();
  })
}

function getData() {
 const url = "../assets/index.json";
  fetch(url).then((response) => {
    return response.json();
  }).then((data) => {
    data.forEach((tabData) => {
      tabString += `<button class="tablinks" onclick="openTab(event, '${tabData.tabsId}')" id="${tabData.id}">
                    <div class=schedule>Day ${tabData.tabId}</div>
                    <div class=schedule_date>${tabData.date}
                    </div>
                    </button>`;
      let tabId = `<div id="${tabData.tabsId}" class="tabcontent">`;
      let slots = tabData.slots;
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
            let speakerName = `${speaker}`;
            speakerPart2 += `<a class=speaker_link href="${speakerData[speakerName].infoLink}">${speaker},</a>`
          })
          timeVenue += speakerPart2;

          timeVenue += `</div>
                          </div>`
        }
        timeVenue += `</div>`;
        if (!speakers||speakers.length==0) {
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
        let speakerString = "";
        if ((speakers) && speakers.length > 0) {
          timeVenue = timeVenue + `<div class=small_speaker_images>`
          speakers.forEach((speaker) => {
            let speakerName = `${speaker}`;
            speakerString += `<div class=image1>
          <a href="${speakerData[speakerName].infoLink}">
            <img class=small_image
              src="${speakerData[speakerName].imageLink}">
          </a>
          </div>`
          })
          timeVenue += speakerString + '</div>';
        }
        let accord = "";
        if (slot.descreption && slot.descreption !== "") {
          accord = `<button class="accordion"><i class="fa fa-plus" style="color:black"> </i></button>
                          <div class="panel">
                            <speakerName class=mb-0>${slot.descreption}</speakerName>
                          </div>`}
        timeVenue += accord;
        timeVenue += `</div>
                      </div>`;
        part += timeVenue;
      })
      restOfTabs += tabId + part + `</div>`;
    });
    document.getElementById('tab').innerHTML = tabString;
    document.getElementById('populate').innerHTML = restOfTabs;
    document.getElementById("defaultOpen").click();
    execution();
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

function execution(){
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
}

speakerDetails();