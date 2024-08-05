//global vars
let embeddedViews = []

// mobile navbar
function main(){
    var menuIconOpen = document.getElementsByClassName("open")[0];
    var menuIconClose = document.getElementsByClassName("close")[0];
    var menuItems = document.getElementsByClassName("menu");

    menuIconClose.style.display = "none";

    menuIconOpen.onclick = function() {
      this.style.display = "none";
      menuIconClose.style.display = "block";
      menuDisplay("show", menuItems);
    };

    menuIconClose.onclick = function() {
      this.style.display = "none";
      menuIconOpen.style.display = "block";
      menuDisplay("hide", menuItems);
    };
  }

  function menuDisplay(state, items){
    if(state=="show"){
      for(var i=0; i<items.length; i++){
        items[i].classList.add("show");
      }
    } else {
      for(var i=0; i<items.length; i++){
        items[i].classList.remove("show");
      }
    }
  }
  async function trackScreen(){
    const sdk = await UA 
    await sdk.analytics.trackScreen("MainScreen")
    console.log("tracked screen")
  }
  function toggleProperties(){
    const toggleState = document.querySelector('#propertyToggle').checked
    const target = document.querySelector(".propertyList")
    const form = document.querySelector("#propertyForm")
    if(toggleState == true){
        target.style.display = 'block'
    } else {
        form.reset()
        target.style.display = 'none'
    }
  }

  async function determinePlatform() {
    const userAgent = window.navigator.userAgent
    if(userAgent.toLowerCase().includes("safari") && !userAgent.toLowerCase().includes("chrome")){
        if(window.navigator.standalone == true){
            console.log("standalone")
            await promptWebPush()
        } else {
            console.log("not standalone")
        }
    } else {
        window.matchMedia('(display-mode: standalone)').matches ? console.log("Saved to home screen") : console.log("non safari browser")
    }
  }

  async function registerEmbeddedContainers() {
    const sdk = await UA
    const targets = Array.from(document.querySelectorAll('.airship-embedded'))
    for(let target of targets){
        const containerId = target.id
        const view = sdk.components.embeddedViews.create(target, target.id)
        embeddedViews.push(view)
    }
  }

  window.addEventListener("load", (event) => {
    main();
    trackScreen()
    determinePlatform()
    smsEmbeddedForm();
    emailEmbeddedForm();
    registerEmbeddedContainers()
    console.log('Have you registered or declined notifications from this site yet? \n \nYou may need to update your browser settings to retrigger the prompt');
  })