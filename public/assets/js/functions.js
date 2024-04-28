function hashPassword(password) {
  return CryptoJS.SHA256(password).toString();
}
// Function to check screen size
function screenIsBig() {
    return window.innerWidth > 1047; // Change the value according to your requirement
}
//hide and show masking
function activateMasking(){
  document.querySelector("#mask").classList.add("active");
}

function deactivateMasking(){
  document.querySelector("#mask").classList.remove("active");
}
// Function to load file content
function loadMainHTMLContent() {
    return new Promise((resolve, reject) => {
        // Check if the screen size is greater than 759px
        if (screenIsBig()) {
            fetch('desktop_main_html.txt')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error loading file');
                    }
                    return response.text();
                })
                .then(data => {
                    document.getElementById('mainContent').insertAdjacentHTML("afterbegin", data);
                    resolve("Main HTML content loaded successfully");
                })
                .catch(error => {
                    console.error('Error loading file:', error);
                    reject("Main HTML content loaded failed");
                });
        } else {
            fetch('main_html.txt')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error loading file');
                    }
                    return response.text();
                })
                .then(data => {
                    document.getElementById('mainContent').insertAdjacentHTML("afterbegin", data);
                    resolve("Main HTML content loaded successfully");
                })
                .catch(error => {
                    console.error('Error loading file:', error);
                    reject("Main HTML content loaded failed");
                });
        }
    });
}
//removing blurred content
function removeBlurryContent() {
  const blurryContents = document.querySelectorAll(".blurred-content");
  blurryContents.forEach((element) => {
    element.remove();
  });
}
//function to create content HTML
function createDesktopAdviceHTML(title, video_url, bodytext, adviceId){
  let adviceDiv = document.createElement('div');
  adviceDiv.classList.add("box");
  adviceDiv.classList.add("has-background-black");
  adviceDiv.classList.add("has-text-white");
  adviceDiv.classList.add("searchable-content");
  let adviceTitle = document.createElement("h3");
  adviceTitle.classList.add("is-size-3");
  adviceTitle.classList.add("has-text-weight-semibold");
  adviceTitle.innerHTML = title;
  let flexDiv = document.createElement("div");
  flexDiv.classList.add("is-flex");
  flexDiv.classList.add("is-align-content-flex-start");
  flexDiv.classList.add("is-justify-content-flex-start");
  let youtubeVideoEmbed = document.createElement("div");
  let iframe = document.createElement("iframe");
  iframe.setAttribute("src", video_url);
  iframe.setAttribute("title", `${title} video`);
  iframe.setAttribute("frameborder", 0);
  iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
  iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
  iframe.setAttribute("allowfullscreen","")
  let feedbackWrapper = document.createElement("div");
  feedbackWrapper.classList.add("is-flex");
  feedbackWrapper.classList.add("is-align-items-center");
  feedbackWrapper.classList.add("mt-3");
  let likeBtn = document.createElement("button");
  likeBtn.classList.add("button");
  likeBtn.classList.add("is-normal");
  likeBtn.classList.add("is-success");
  likeBtn.classList.add("mr-2");
  likeBtn.setAttribute("onclick", `like_content('${adviceId}')`);
  likeBtn.innerHTML = "Helpful!"
  let dislikeBtn = document.createElement("button");
  dislikeBtn.classList.add("button");
  dislikeBtn.classList.add("is-normal");
  dislikeBtn.classList.add("is-danger");
  dislikeBtn.setAttribute("onclick", `dislike_content('${adviceId}')`);
  dislikeBtn.innerHTML = "Unhelpful!"
  let content = document.createElement("p");
  content.classList.add("pl-2");
  content.innerHTML = bodytext;
  //assemble them
  youtubeVideoEmbed.appendChild(iframe);
  flexDiv.appendChild(youtubeVideoEmbed);
  flexDiv.appendChild(content);
  feedbackWrapper.appendChild(likeBtn);
  feedbackWrapper.appendChild(dislikeBtn);
  adviceDiv.appendChild(adviceTitle);
  adviceDiv.appendChild(flexDiv);
  adviceDiv.appendChild(feedbackWrapper);
  return adviceDiv;
}
function createMobileAdviceHTML(title, video_url, bodytext, adviceId){
  let adviceDiv = document.createElement('div');
  adviceDiv.classList.add("box");
  adviceDiv.classList.add("has-background-black");
  adviceDiv.classList.add("has-text-white");
  adviceDiv.classList.add("searchable-content");
  let adviceTitle = document.createElement("h3");
  adviceTitle.classList.add("is-size-3");
  adviceTitle.classList.add("has-text-weight-semibold");
  adviceTitle.innerHTML = title;
  let flexDiv = document.createElement("div");
  let youtubeVideoEmbed = document.createElement("div");
  let iframe = document.createElement("iframe");
  iframe.setAttribute("src", video_url);
  iframe.setAttribute("title", `${title} video`);
  iframe.setAttribute("frameborder", 0);
  iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
  iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
  iframe.setAttribute("allowfullscreen","")
  let feedbackWrapper = document.createElement("div");
  feedbackWrapper.classList.add("is-flex");
  feedbackWrapper.classList.add("is-align-items-center");
  feedbackWrapper.classList.add("mt-3");
  let likeBtn = document.createElement("button");
  likeBtn.classList.add("button");
  likeBtn.classList.add("is-normal");
  likeBtn.classList.add("is-success");
  likeBtn.classList.add("mr-2");
  likeBtn.setAttribute("onclick", `like_content('${adviceId}')`);
  likeBtn.innerHTML = "Helpful!"
  let dislikeBtn = document.createElement("button");
  dislikeBtn.classList.add("button");
  dislikeBtn.classList.add("is-normal");
  dislikeBtn.classList.add("is-danger");
  dislikeBtn.setAttribute("onclick", `dislike_content('${adviceId}')`);
  dislikeBtn.innerHTML = "Unhelpful!"
  let content = document.createElement("p");
  content.classList.add("pl-2");
  content.innerHTML = bodytext;
  //assemble them
  youtubeVideoEmbed.appendChild(iframe);
  flexDiv.appendChild(youtubeVideoEmbed);
  flexDiv.appendChild(content);
  feedbackWrapper.appendChild(likeBtn);
  feedbackWrapper.appendChild(dislikeBtn);
  adviceDiv.appendChild(adviceTitle);
  adviceDiv.appendChild(flexDiv);
  adviceDiv.appendChild(feedbackWrapper);
  return adviceDiv;
}
//function to query from firestore for advices content
function loadAdvices(advicesRef, startAt, loadCapacity, deviceType = "mobile"){
  // Query Firestore for advices ordered by popularity
  advicesRef.where("everyone", "==", true).orderBy('popularity').startAt(startAt).limit(loadCapacity).get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let adviceData = doc.data();
        let adviceDiv;
        if(deviceType == "mobile"){
          adviceDiv = createMobileAdviceHTML(adviceData.title, adviceData.video_url, adviceData.body, doc.id);
        }else{
          adviceDiv = createDesktopAdviceHTML(adviceData.title, adviceData.video_url, adviceData.body, doc.id);
        }
        document.getElementById('advices').appendChild(adviceDiv);
      });
      return startAt+loadCapacity;
  })
  .catch((error) => {
    console.log(`Error getting more advices: ${error}`);
    return startAt;
  });
};
//Load advices for under 6 feet content
function loadUnder6Advices(advicesRef, startAt, loadCapacity, deviceType = "mobile"){
  // Query Firestore for advices ordered by popularity
  advicesRef.where("everyone", "==", false).orderBy('popularity').startAt(startAt).limit(loadCapacity).get()
  .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let adviceData = doc.data();
        let adviceDiv;
        if(deviceType == "mobile"){
          adviceDiv = createMobileAdviceHTML(adviceData.title, adviceData.video_url, adviceData.body, doc.id);
        }else{
          adviceDiv = createDesktopAdviceHTML(adviceData.title, adviceData.video_url, adviceData.body, doc.id);
        }
        document.getElementById('advicesUnder6').appendChild(adviceDiv);
      });
      return startAt+loadCapacity;
  }).catch((error) => {
      console.log(`Error getting more advices: ${error}`);
      return startAt;
  });
};

//functions to create user in firebase
/**
 * This function create a new user in firebase
 * @param {firebase object} firebase
 * @param {string} email 
 * @param {string} password 
 * @returns user object is created, otherwise null;
 */
function createNewUserInFirebase(firebase, email, password){
  let hashedPassword = hashPassword(password);
  return new Promise((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(email, hashedPassword)
    .then((userCredential) => {
      // User created successfully
      resolve(userCredential);
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      reject({errorCode, errorMessage});
    });
  })
}
//functions to sign user in firebase
/**
 * This function sign a user in firebase
 * @param {firebase object} firebase
 * @param {string} email 
 * @param {string} password 
 * @returns user object if is valid, otherwise null;
 */
function logInUser(firebase, email, password){
  let hashedPassword = hashPassword(password);
  return  new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, hashedPassword)
    .then((userCredential) => {
      // User signed in successfully
      resolve(userCredential.user);
    })
    .catch((error) => {
      // Handle errors
      const errorCode = error.code;
      const errorMessage = error.message;
      reject({errorCode, errorMessage});
    });
  });  
};
//functions to sign user OUT firebase
/**
 * This function sign a user out firebase
 * @param {firebase object} firebase
 * @returns user object if is valid, otherwise null;
 */
function logOutUser(firebase){
  return  new Promise((resolve, reject) => {
    firebase.auth().signOut().then(function() {
      resolve({status: 1, message: "User signed out successfully"});
    }).catch(function(error) {
      reject({status:0, message: error});
    });
  });  
};
function updateNavbarForSignedInUser(userEmail, navbarId){
  let navbarEnd = document.createElement("div");
  navbarEnd.classList.add("navbar-end");
  let navbarItemDropdownWrapper = document.createElement("div");
  navbarItemDropdownWrapper.classList.add("navbar-item");
  navbarItemDropdownWrapper.classList.add("has-dropdown");
  navbarItemDropdownWrapper.classList.add("is-hoverable");
  let userEmailAsDropdown = document.createElement("a");
  userEmailAsDropdown.classList.add("navbar-link");
  userEmailAsDropdown.innerHTML = userEmail;
  let dropdownWrapper = document.createElement("div");
  dropdownWrapper.classList.add("navbar-dropdown");
  let dropdownItem = document.createElement("a");
  dropdownItem.classList.add("navbar-item");
  dropdownItem.innerHTML = "Profile";
  let dropdownItem2 = document.createElement("a");
  dropdownItem2.classList.add("navbar-item");
  dropdownItem2.classList.add("sign-out-btn");
  dropdownItem2.innerHTML = "Sign Out";
  //assemble
  dropdownWrapper.appendChild(dropdownItem);
  dropdownWrapper.appendChild(dropdownItem2);
  navbarItemDropdownWrapper.appendChild(userEmailAsDropdown);
  navbarItemDropdownWrapper.appendChild(dropdownWrapper);
  navbarEnd.appendChild(navbarItemDropdownWrapper);
  //remove old navbar
  let navbar = document.querySelector(`#${navbarId}`);
  let navMenu = navbar.querySelector(".navbar-menu");
  let oldNavEnd = navMenu.querySelector(".navbar-end");
  oldNavEnd.remove();
  //add the new navbar-end
  navMenu.appendChild(navbarEnd);
}
function removeAllClasses(className){
  //1st replace the navbar UI
  document.querySelectorAll(`.${className}`).forEach( skeleton => {
    skeleton.remove();
  })
}
function updateUIForSignedInUser(userEmail){
  //1st replace the navbar UI
  updateNavbarForSignedInUser(userEmail, "navbar");
}
//showing success pop up
function showSuccessPopUp(title, body){
  return new Promise((resolve, reject)=>{
    try{
      let successPopUp = document.querySelector(`#successPopUp`);
      let successPopUpTitle = successPopUp.querySelector(".title");
      let successPopUpBody = successPopUp.querySelector("p");
      successPopUpTitle.innerHTML = title;
      successPopUpBody.innerHTML = body;
      successPopUp.style.display = 'block';
      resolve({status:1, message: "Successfully activate success pop-up"});
    }catch(error){
      reject({status:0, message: error});
    }
  })
}
/** Implementation of Searching from firestore */
function searchFromFireStore(firestore, collection, searchKey) {
  // Fetch data from Firestore and insert into trie
  return new Promise((resolve, reject) => {
    let results = [];
    let searchResultWrapper = document.querySelector("#searchResultsDisplayBox");
    firestore.collection(collection).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if(doc.data().title.toLowerCase().includes(searchKey) || doc.data().body.toLowerCase().includes(searchKey)){
          let searchResult = document.createElement("div");
          searchResult.classList.add("search-result");
          searchResult.setAttribute("title", doc.data().title);
          searchResult.setAttribute("body", doc.data().body);
          searchResult.setAttribute("video_url", doc.data().video_url);
          let titleWrapper = document.createElement("div");
          titleWrapper.classList.add("search-result-info");
          titleWrapper.classList.add("info");
          let title = document.createElement("h3");
          title.classList.add("search-result-title");
          title.innerHTML = doc.data().title;
          //assemble
          titleWrapper.appendChild(title);
          searchResult.appendChild(titleWrapper);
          searchResultWrapper.appendChild(searchResult);
        }
      });
      searchResultWrapper.classList.add("active");
      resolve({status:1, message: "Trie built successfully", results: results});
    }).catch((error) => {
      reject({status:0, message: error});
    });
  })
}