'use strict';

var lightmode = false;
var cookiesAccepted = false;

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

document.getElementById("simple-cookie-consent").style.display = "none";

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// blog filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}


// blog content displayer

function displayContent(contentPath){
  for (let i = 0; i < pages.length; i++) {
      pages[i].classList.remove("active");
      navigationLinks[i].classList.remove("active");
  }
  let loadedcontent = document.getElementById("loadedContent");
  console.log(loadedcontent.innerHTML.length)
  if  (loadedcontent.innerHTML.length!=0)
  {
    loadedcontent.innerHTML="";
  }
  $('#loadedContent').load(contentPath);
  loadedcontent.classList.add("active");

  //if (loadedcontent.classList.contains("active"))
  //{
  //  loadedcontent.classList.remove("active");
  //}
}

const contentTiles = document.querySelectorAll("[data-filter-item]");

const themeIcon = document.getElementById("themeToggleIcon")

$(document).ready(function(){

  // add event to all nav link
  for (let i = 0; i < contentTiles.length; i++) {
    contentTiles[i].addEventListener("click", function () {
      let contentPath = this.getAttribute('content-path')
      displayContent(contentPath)
    });
  }

  //const body = document.querySelector('body');
  if (lightmode)
  {
    themeIcon.setAttribute("name","moon-outline")
  }
  else
  {
    themeIcon.setAttribute("name","sunny-outline")
  }
  themeIcon.addEventListener("click", function () {
    toggleTheme
  });

  if (getCookie("theme")=="light"){
    LightModeOrDefault(true);
    themeIcon.setAttribute("name","moon-outline")
  }
  else if (getCookie("theme")=="dark"){
    LightModeOrDefault(false);
    themeIcon.setAttribute("name","sunny-outline")
  }

});


function acceptCookieConsent(Accepted){
  deleteCookie('user_cookie_consent');
  if(Accepted)
  {
    setCookie('user_cookie_consent', 1, 30);
    cookiesAccepted=true;
  }
  else
  {
    cookiesAccepted=false;
  }
  document.getElementById("simple-cookie-consent").style.display = "none";
}

function toggleTheme()
{

  var cookie_consent = getCookie("user_cookie_consent");
  if(cookie_consent != ""){
      document.getElementById("simple-cookie-consent").style.display = "none";
      cookiesAccepted=true;
  }else{
      document.getElementById("simple-cookie-consent").style.display = "block";
      cookiesAccepted=false;
  }
  if(cookiesAccepted)
  {
    if (themeIcon.getAttribute("name") == "moon-outline")
    {
      LightModeOrDefault(false);
      deleteCookie("theme");
      setCookie("theme", 'dark', "30");
      themeIcon.setAttribute("name","sunny-outline")
      console.log("set dark mode")
    }
    else if (themeIcon.getAttribute("name") == "sunny-outline")
    {
      LightModeOrDefault(true);
      deleteCookie("theme");
      setCookie("theme", 'light', "30");
      themeIcon.setAttribute("name","moon-outline")
      console.log("set light mode")
    }
  }
}


//$('selected_element').remove();


// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    let loadedcontent = document.getElementById("loadedContent");
    if  (loadedcontent.innerHTML.length!=0)
    {
      loadedcontent.innerHTML="";
    }
    if (loadedcontent.classList.contains("active"))
    {
      loadedcontent.classList.remove("active");
    }
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// Create cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Delete cookie - set expiration in past so cookie is removed immediately when this session ends
function deleteCookie(cname) {
  if (getCookie("user_cookie_consent")!="")
  {
    document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
  }
}

// Read cookie
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}

function LightModeOrDefault(lightmode){
  if (lightmode)
  {
    document.documentElement.className = 'light-theme';
    lightmode=true
  }
  else
  {
    document.documentElement.className = '';
    lightmode=false
  }
}

