// loader function ----------------------------

function showloader() {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("Vocabulary-Container").classList.add("hidden");
}
function hideloader() {
  setTimeout(() => {
    document.getElementById("loader").classList.add("hidden");
    document.getElementById("Vocabulary-Container").classList.remove("hidden");
  }, 500);
}

// smooth scroll function------------------------------------

function smoothScroll(id) {
  const section = document.getElementById(id);
  const offset = 80;
  const sectionTop = section.offsetTop - offset;
  window.scrollTo({ top: sectionTop, behavior: "smooth" });
}

// Voice Function start-------------------------------

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// Modal section--------------------------------------------

function loadModal(id) {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => seeModal(data.data));
}

function seeModal(details) {
  console.log(details);
  document.getElementById("cardDetails").showModal();

  const cardModal = document.getElementById("cardModal");

  cardModal.innerHTML = `

          <div class="card card-border">
  <div class="card-body">
    <h2 class="card-title font-bold text-2xl">${
      details.word
    } ( <i class="fa-solid fa-microphone"></i> : ${
    details.pronunciation ?? "খুজে পাওয়া যায়নি"
  } )</h2>
    <p class="font-bold text-xl">Meaning</p>
    <p class="font-bold"> ${details.meaning ?? "খুজে পাওয়া যায়নি"} </p>
    <p class="font-bold text-xl" > Example </p>
    <p class="font-bold "> ${details.sentence ?? "খুজে পাওয়া যায়নি"}</p>
    <p class="font-bold text-xl"> সমার্থক শব্দ গুলো </p>

  <div> 

      <div class="">
          ${
            details.synonyms && details.synonyms.length > 0
              ? details.synonyms
                  .map(
                    (synonym) =>
                      `<button class="btn btn-sm bg-slate-200 font-bold">${synonym}</button>`
                  )
                  .join("  ")
              : ""
          }
        </div>
  
 
  
  </div>
</div>
      `;
}

//hidden & show function---------------------------------------

function hiddenSection() {
  document.getElementById("navbar-section").style.display = "none";
  document.getElementById("main-section").style.display = "none";
  document.getElementById("hero-container").style.display = "block";
}
function showSection() {
  document.getElementById("navbar-section").style.display = "block";
  document.getElementById("main-section").style.display = "block";
  document.getElementById("hero-container").style.display = "none";
}

// show active button

function removeActiveClass() {
  let activeButtons = document.getElementsByClassName("active");

  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
}

document.getElementById("login-btn").addEventListener("click", () => {
  const checkPass = document.getElementById("password").value;
  const checkUser = document.getElementById("username").value;
  if (checkUser !== "") {
    if (checkPass === "123456") {
      Swal.fire({
        title: "অভিনন্দন &#128525;",
        icon: "success",
        draggable: true,
      });
      showSection();
    } else {
      Swal.fire({
        title: "মুরুব্বি মুরুব্বি উহু,হু,হু",
        icon: "error",
        draggable: true,
      });
    }
  } else {
    Swal.fire({
      title: "মুরুব্বি মুরুব্বি উহু,হু,হু",
      icon: "error",
      draggable: true,
    });
  }
});
document.getElementById("btn-logout").addEventListener("click", () => {
  Swal.fire({
    title: "ধন্যবাদ &#128530;",
    icon: "success",
    draggable: true,
  });

  hiddenSection();
});

// Data load section--------------------------------------------
function loadbtn() {
  showloader();
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => displayShowBtn(data.data));
}

function loadCards(id) {
  showloader();
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);

      clickedButton.classList.add("active");

      displayCards(data.data);
    });
}

// Showing Display section------------------------------------------

function displayShowBtn(showBtn) {
  const displayBtn = document.getElementById("lesson-catagoy");
  for (let btn of showBtn) {
    const div = document.createElement("div");

    div.innerHTML = `
        
         <button id="btn-${btn.level_no}" onclick="loadCards(${btn.level_no});" class="  btn btn-sm text-[#422AD5] border-[#422AD5] hover:bg-[#422AD5] hover:text-white"> <i class="fa-brands fa-leanpub"></i>${btn.lessonName}</button>
        
        `;
    displayBtn.append(div);
  }
  hideloader();
}

function displayCards(cards) {
  const showCards = document.getElementById("lesson-card");
  showCards.innerHTML = "";

  if (cards.length === 0) {
    showCards.innerHTML = `
    
          <div
        class="bg-base-200 text-center py-[20px] col-span-full flex flex-col justify-center items-center"
      >
        <img src="assets/alert-error.png" alt="" />
        <p class="text-[#79716B] mb-[12px]">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h1 class="text-[40px]">নেক্সট Lesson এ যান</h1>
      </div>
    
    `;
    hideloader();
    return;
  }

  for (let card of cards) {
    const div = document.createElement("div");
    div.innerHTML = `
    
    <section>  
    
      <div class="card bg-base-100 w-96 shadow-sm">
        <div class="card-body text-center">
          <h2 class="card-title justify-center font-bold text-2xl"> ${
            card.word ?? "খুজে পাওয়া যায়নি"
          }</h2>
          <p class="font-bold">Meaning / pronunciation</p>
          <h2 class="font-bold text-2xl">"${
            card.meaning ?? "খুজে পাওয়া যায়নি"
          }"</h2>
          <div class="flex justify-between">
          <a onclick="loadModal(${card.id})" class="btn">   
          <i  class="fa-solid fa-circle-info"></i>   
          
          </a>

            <a onclick="pronounceWord('${
              card.word
            }')"   class="btn"> <i  class="fa-solid fa-volume-high"></i> </a>
          </div>
        </div>
      </div>
    
    
    
    
    </section>
    
    `;

    showCards.append(div);
  }
  hideloader();
}

hiddenSection();
loadbtn();
