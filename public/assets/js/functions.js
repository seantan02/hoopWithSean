/**
 * Hashes the given password using SHA256 algorithm.
 * @param {string} password The password to be hashed.
 * @returns {string} The hashed password.
 */
function hashPassword(password) {
  return CryptoJS.SHA256(password).toString();
}

/**
 * Checks if the screen size is big (greater than or equal to 1024 pixels).
 * @returns {boolean} True if the screen size is big, otherwise false.
 */
function screenIsBig() {
    return window.innerWidth >= 1024; // Change the value according to your requirement
}

/**
 * Activates masking by adding 'active' class to the mask element.
 */
function activateMasking(){
  document.querySelector("#mask").classList.add("active");
}

function openModal(modal){
  modal.classList.add('is-active');
};

function closeModal(modal){
  modal.classList.remove('is-active');
};

/**
 * Deactivates masking by removing 'active' class from the mask element.
 */
function deactivateMasking(){
  document.querySelector("#mask").classList.remove("active");
}

/**
 * Loads main HTML content based on the screen size.
 * @returns {Promise<string>} A promise that resolves to a status message indicating success or failure of loading main HTML content.
 */
function loadMainHTMLContent() {
    return new Promise((resolve, reject) => {
        // Check if the screen size is greater than 759px
        if (screenIsBig()) {
            // Load desktop main HTML content
            fetch('desktop_main_html.txt')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error loading file');
                    }
                    return response.text();
                })
                .then(data => {
                    document.getElementById('mainContent').innerHTML += data;
                    resolve("Main HTML content loaded successfully");
                })
                .catch(error => {
                    reject("Main HTML content loaded failed");
                });
        } else {
            // Load mobile main HTML content
            fetch('main_html.txt')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error loading file');
                    }
                    return response.text();
                })
                .then(data => {
                  document.getElementById('mainContent').innerHTML += data;
                    resolve("Main HTML content loaded successfully");
                })
                .catch(error => {
                    reject("Main HTML content loaded failed");
                });
        }
    });
}

/**
 * Removes blurred content from the document.
 */
function removeBlurryContent() {
  const blurryContents = document.querySelectorAll(".blurred-content");
  blurryContents.forEach((element) => {
    element.remove();
  });
}

/**
 * Creates HTML content for desktop view with the provided data.
 * @param {string} title The title of the advice.
 * @param {string} video_url The URL of the video associated with the advice.
 * @param {string} bodytext The body text of the advice.
 * @param {string} adviceId The ID of the advice.
 * @returns {HTMLElement} The HTML element representing the advice content.
 */
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
  likeBtn.classList.add("content-reaction-btn");
  likeBtn.classList.add("is-normal");
  likeBtn.classList.add("is-primary");
  likeBtn.classList.add("mr-2");
  likeBtn.setAttribute("data-adviceId", `${adviceId}`);
  likeBtn.setAttribute("data-type", `like`);
  likeBtn.innerHTML = "Helpful!"
  let dislikeBtn = document.createElement("button");
  dislikeBtn.classList.add("button");
  dislikeBtn.classList.add("content-reaction-btn");
  dislikeBtn.classList.add("is-normal");
  dislikeBtn.classList.add("is-danger");
  dislikeBtn.setAttribute("data-adviceId", `${adviceId}`);
  dislikeBtn.setAttribute("data-type", `dislike`);
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

/**
 * Creates HTML content for mobile view with the provided data.
 * @param {string} title The title of the advice.
 * @param {string} video_url The URL of the video associated with the advice.
 * @param {string} bodytext The body text of the advice.
 * @param {string} adviceId The ID of the advice.
 * @returns {HTMLElement} The HTML element representing the advice content.
 */
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
  likeBtn.classList.add("content-reaction-btn");
  likeBtn.classList.add("is-normal");
  likeBtn.classList.add("is-primary");
  likeBtn.classList.add("mr-2");
  likeBtn.setAttribute("data-adviceId", `${adviceId}`);
  likeBtn.setAttribute("data-type", `like`);
  likeBtn.innerHTML = "Helpful!"
  let dislikeBtn = document.createElement("button");
  dislikeBtn.classList.add("button");
  dislikeBtn.classList.add("content-reaction-btn");
  dislikeBtn.classList.add("is-normal");
  dislikeBtn.classList.add("is-danger");
  dislikeBtn.setAttribute("data-adviceId", `${adviceId}`);
  dislikeBtn.setAttribute("data-type", `dislike`);
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

/**
 * Loads advices from Firestore based on specified criteria.
 * @param {firebase.firestore.CollectionReference} advicesRef The reference to the Firestore collection containing advices.
 * @param {number} startAt The index from which to start loading advices.
 * @param {number} loadCapacity The maximum number of advices to load.
 * @param {string} deviceType The type of device (either "mobile" or "desktop").
 * @returns {Promise<number>} A promise that resolves with the index of the next batch of advices to load.
 */
function loadAdvices(advicesRef, startAt, loadCapacity, deviceType = "mobile"){
  // Query Firestore for advices ordered by popularity
  return new Promise((resolve, reject) => {
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
        resolve(startAt+loadCapacity);
    })
    .catch((error) => {
     reject(`Error getting more advices: ${error}`);
    });
  })
};

/**
 * Loads advices for users under 6 feet from Firestore based on specified criteria.
 * @param {firebase.firestore.CollectionReference} advicesRef The reference to the Firestore collection containing advices.
 * @param {number} startAt The index from which to start loading advices.
 * @param {number} loadCapacity The maximum number of advices to load.
 * @param {string} deviceType The type of device (either "mobile" or "desktop").
 * @returns {Promise<number>} A promise that resolves with the index of the next batch of advices to load.
 */
function loadUnder6Advices(advicesRef, startAt, loadCapacity, deviceType = "mobile"){
  // Query Firestore for advices ordered by popularity
  return new Promise((resolve, reject)=>{
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
        resolve(startAt+loadCapacity);
    }).catch((error) => {
        reject(`Error getting more advices: ${error}`);
    });
  })
};

/**
 * Creates a new user in Firebase authentication.
 * @param {firebase.app.App} firebase The Firebase app instance.
 * @param {string} email The email address of the user.
 * @param {string} password The password of the user.
 * @returns {Promise<firebase.auth.UserCredential>} A promise that resolves with the user credential if successful.
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
      reject({status : errorCode, message:errorMessage});
    });
  })
}


/**
 * Signs in a user using Firebase authentication.
 * @param {firebase.app.App} firebase The Firebase app instance.
 * @param {string} email The email address of the user.
 * @param {string} password The password of the user.
 * @returns {Promise<firebase.User>} A promise that resolves with the user object if authentication is successful.
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
      reject({status : errorCode, message:errorMessage});
    });
  });  
};

/**
 * Signs out the current user from Firebase authentication.
 * @param {firebase.app.App} firebase The Firebase app instance.
 * @returns {Promise<{status: number, message: string}>} A promise that resolves with a status message indicating the sign-out result.
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

/**
 * Updates the navbar UI for a signed-in user.
 * @param {string} userEmail The email address of the signed-in user.
 * @param {string} navbarId The ID of the navbar element.
 */
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
  dropdownItem.classList.add("sign-out-btn");
  dropdownItem.innerHTML = "Sign Out";
  //assemble
  dropdownWrapper.appendChild(dropdownItem);
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
  //show searcb bar
  document.querySelectorAll(".searchbar-wrapper").forEach(searchbarWrapper => {
    searchbarWrapper.classList.add("active");
  })
}

/**
 * Removes all elements with the specified class name from the document.
 * @param {string} className The class name of elements to be removed.
 */
function removeAllClasses(className){
  //1st replace the navbar UI
  document.querySelectorAll(`.${className}`).forEach( skeleton => {
    skeleton.remove();
  })
}

/**
 * Updates the UI for a signed-in user.
 * @param {string} userEmail The email address of the signed-in user.
 */
function updateUIForSignedInUser(userEmail){
  //1st replace the navbar UI
  updateNavbarForSignedInUser(userEmail, "navbar");
}


/**
 * Displays a success pop-up with the given title and body.
 * @param {string} title The title of the success pop-up.
 * @param {string} body The body text of the success pop-up.
 * @returns {Promise<{status: number, message: string}>} A promise that resolves with a status message indicating the result of displaying the pop-up.
 */
function showSuccessPopUp(title, body){
  return new Promise((resolve, reject)=>{
    try{
      let successPopUp = document.querySelector(`#successPopUp`);
      let successPopUpTitle = successPopUp.querySelector(".title");
      let successPopUpBody = successPopUp.querySelector("p");
      successPopUpTitle.innerHTML = title;
      successPopUpBody.innerHTML = body;
      openModal(successPopUp);
      resolve({status:1, message: "Successfully activate success pop-up"});
    }catch(error){
      reject({status:0, message: error});
    }
  })
}

/**
 * Create HTML content for search result
 * @param {string} title title of the search result
 * @param {string} body content/body of the search result
 * @param {string} video_url youtube video link
 * @returns {Promise<{status: number, message: string}>} A promise that resolves with a status message indicating the result of the search.
 */
function createSearchResultHTML(title, body, video_url){
  if(title == ""){
    let emptyResult = document.createElement("div");
    let emptyMsg = document.createElement("h3");
    emptyMsg.innerHTML = "No matching result";
    emptyResult.appendChild(emptyMsg);
    return emptyResult;
  }
  let searchResult = document.createElement("div");
  searchResult.classList.add("search-result");
  searchResult.setAttribute("title", title);
  searchResult.setAttribute("body", body);
  searchResult.setAttribute("video_url", video_url);
  let titleWrapper = document.createElement("div");
  titleWrapper.classList.add("search-result-info");
  titleWrapper.classList.add("info");
  let titleText = document.createElement("h3");
  titleText.classList.add("search-result-title");
  titleText.innerHTML = title;
  //assemble
  titleWrapper.appendChild(titleText);
  searchResult.appendChild(titleWrapper);
  return searchResult;
}


/**
 * Searches Firestore for content matching the given search key.
 * @param {firebase.firestore.Firestore} firestore The Firestore instance.
 * @param {string} collection The name of the Firestore collection to search.
 * @param {string} searchKey The search key.
 * @returns {Promise<{status: number, message: string}>} A promise that resolves with a status message indicating the result of the search.
 */
function searchFromFireStore(firestore, collection, searchKey) {
  // Fetch data from Firestore and insert into trie
  return new Promise((resolve, reject) => {
    let results = [];
    let searchResultWrapper = document.querySelector("#searchResultsDisplayBox");
    firestore.collection(collection).get()
    .then((querySnapshot) => {
      let count = 0;
      querySnapshot.forEach((doc) => {
        if(doc.data().title.toLowerCase().includes(searchKey) || doc.data().body.toLowerCase().includes(searchKey)){
          searchResultWrapper.appendChild(createSearchResultHTML(doc.data().title, doc.data().body, doc.data().video_url));
          count += 1;
        }
      });
      if(count == 0) alert("No matching result found. Please try with different key word.")
      else searchResultWrapper.classList.add("active");
      resolve({status:1, message: "Trie built successfully", results: results});
    }).catch((error) => {
      reject({status:0, message: error});
    });
  })
}

/**
 * Handles a reaction request (like/dislike) for a specific content.
 * @param {firebase.app.App} firebase The Firebase app instance.
 * @param {string} advice_id The ID of the advice content.
 * @param {string} type The type of reaction ("like" or "dislike").
 * @returns {Promise<{status: number, message: string}>} A promise that resolves with a status message indicating the result of the reaction request.
 */
function handleReactionRequest(firebase, advice_id, type) {
  // Get the current user's ID from Firebase Auth
  return new Promise((resolve, reject) => {
    var user = firebase.auth().currentUser;
    if (user) {
        var uid = user.uid;

        // Get a Firestore reference to the reactions collection
        var reactionsRef = firebase.firestore().collection("reactions");

        // Check if the user has already liked the content
        reactionsRef.where("user_id", "==", uid).where("advice_id", "==", advice_id).get()
        .then(function(querySnapshot) {
            if (querySnapshot.empty) {
                // If the user hasn't already liked the content, add a new like reaction
                reactionsRef.add({
                    user_id: uid,
                    advice_id: advice_id,
                    type: type
                })
                .then(function(docRef) {
                    resolve({status:1, message: `Reaction added with id ${docRef.id}`});
                })
                .catch(function(error) {
                  reject({status:0, message: error});
                });
            } else {
              //update it if it's another type, else delete it
              querySnapshot.forEach(doc => {
                if(doc.data().type == type){
                  reactionsRef.doc(doc.id).delete()
                  .then(()=>{
                    resolve({status:1, message: "Reaction deleted"});
                  })
                  .catch(error => {
                    reject({status:0, message: error});
                  })
                }else{
                  reactionsRef.doc(doc.id).update({
                    type:type
                  })
                  .then(()=>{
                    resolve({status:1, message: "Reaction updated"});
                  })
                  .catch(error => {
                    reject({status:0, message: error});
                  })
                }
              })
            }
        })
        .catch(function(error) {
            reject({status:0, message: error});
        });
    } else {
      reject({status:0, message: "No user is currently signed in."});
    }
  })
}

/**
 * Adds event handlers to all reaction buttons for handling user reactions.
 * @param {firebase.app.App} firebase The Firebase app instance.
 * @param {HTMLButtonElement[]} btns An array of HTML button elements representing reaction buttons.
 */
function addEventHandlerToAllReactionBtn(firebase, btns){
  btns.forEach(contentReactionBtn => {
    let type = contentReactionBtn.getAttribute("data-type");
    let adviceId = contentReactionBtn.getAttribute("data-adviceId");
    contentReactionBtn.addEventListener("click", ()=>{
      handleReactionRequest(firebase, adviceId, type)
      .then(() => {
        activateMasking();
        showSuccessPopUp("Thank you for your feedback!", "Your feedback will help us produce better work.");
      })
      .catch(error => {
        alert(error.message);
      })
    })
  })
}