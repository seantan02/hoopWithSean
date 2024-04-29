const firebaseConfig = {
apiKey: "AIzaSyA-lLohj9oXOXhTVwQ4whsmN-R5BHO6ibc",
authDomain: "hoop-with-sean.firebaseapp.com",
projectId: "hoop-with-sean",
storageBucket: "hoop-with-sean.appspot.com",
messagingSenderId: "716318172760",
appId: "1:716318172760:web:5310d17731ebeb64100c2d",
measurementId: "G-Q4YWBKG1RF"
};
firebase.initializeApp(firebaseConfig);
let auth;
let db;
let ref;
let user;
document.addEventListener("DOMContentLoaded", function() {
    loadMainHTMLContent().then(response =>{
        var isDesktop = screenIsBig();

        let lazyloadImages = document.querySelectorAll(".lazyload");
    
        const lazyload = () => {
        lazyloadImages.forEach(image => {
            let src = image.getAttribute('data-src');
                if (isDesktop) {
                    src = "assets/images/desktop/" + src;
                }else{
                    src = "assets/images/" + src;
                }
                image.src = src;
                image.onload = () => {
                    image.style.opacity = 1;
            };
        });
        };
        lazyload();
        //Guidance Button script
        document.querySelectorAll(".guidanceBtn").forEach(btn => {
        btn.addEventListener("click", function() {
            var targetId = this.getAttribute("data-guideTarget"); // Remove the "#" from href
            console.log(targetId)
            var targetElement = document.getElementById(targetId);
            if (targetElement) {
                var targetOffset = targetElement.offsetTop;
                window.scrollTo({
                    top: targetOffset,
                    behavior: "smooth" // Smooth scroll behavior
                });
            }
        })
        });
        //all const should be defined here
        const signupButtons = document.querySelectorAll('.sign-up-btn');
        const loginButtons = document.querySelectorAll('.sign-in-btn');
        const signupModal = document.getElementById('signupModal');
        const loginModal = document.getElementById('loginModal');
        const closeModalButtons = document.querySelectorAll('.modal .delete, .modal .button');
        const signUpForm = document.querySelector("#signupModal");
        const logInForm = document.querySelector("#loginModal");

        signupButtons.forEach(signupButton => {
            signupButton.addEventListener('click', () => openModal(signupModal));
        });
        
        loginButtons.forEach(loginButton => {
        loginButton.addEventListener('click', () => openModal(loginModal));
        });
        
        closeModalButtons.forEach(button => {
            button.addEventListener('click', () => {
                closeModal(signupModal);
                closeModal(loginModal);
            });
        });
        //MOBILE's SCRIPT
        if(!isDesktop){
        //Script for toggling mobile menu
        const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {

            // Get the target from the "data-target" attribute
            const target = el.dataset.target;
            const $target = document.getElementById(target);

            // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');

            });
        });
        }
        //Sign up and Sign in modal
        signUpForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission

        let email = signUpForm.querySelector("input[name='email']").value;
        let password = signUpForm.querySelector("input[name='password']").value;
        let password2 = signUpForm.querySelector("input[name='password2']").value;
        if(password != password2){
            alert("Please make sure both your passwords matches.");
            return;
        }
        //this point onwards, user is authenticated and will be write into database
        createNewUserInFirebase(firebase, email, password)
        .then((createdUser)=>{
            logInUser(firebase, email, password)
            .then(userObject => {
            activateMasking();
            showSuccessPopUp("Welcome OnBoard!", "You can now browse the advices and content and provide feedback!");
            })
            .catch(error => {
            alert(error.message);
            });
        })
        .catch(error => {
            alert(error.message);
        })
        });
        //Log In Form submitted:
        logInForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent default form submission

            let email = logInForm.querySelector("input[name='email']").value;
            let password = logInForm.querySelector("input[name='password']").value;
            //this point onwards, user is authenticated and will be write into database
            logInUser(firebase, email, password)
            .then(userObject => {
                activateMasking();
                showSuccessPopUp("Welcome back!", "We miss you so much :(");
            })
            .catch(error => {
                alert(error.message);
            });
        });

        firebase.auth().onAuthStateChanged(userObject => {
        if (userObject) {
            userObject.getIdTokenResult()
            .then((userIdToken => {
            removeBlurryContent(); //remove the blurry content
            removeAllClasses("content-placeholder"); //remove all before login content placeholder
            user = userObject;
            auth = firebase.auth().currentUser;
            console.log(auth);
            db = firebase.firestore();
            ref = firebase.storage().ref();
            updateUIForSignedInUser(user.email);
            //sign out btn
            document.querySelectorAll(".sign-out-btn").forEach(signOutBtn => {
                signOutBtn.addEventListener("click", (event) => {
                logOutUser(firebase)
                .then(success => {
                    showSuccessPopUp("Logged Out", "You are logged out successfully.");
                    setTimeout(() => {
                    window.location.reload();
                    }, 3000);
                })
                .catch(error => {
                    alert(`Failed to log you out due to ${error.message} `);
                })
                });
            })
            //Load advices into the page
            const advicesRef = db.collection('advices');
            var startAt = 1;
            const loadCapacity = 3;
            // Function to load advices from Firestore
            if(!isDesktop){ //for mobile
                loadAdvices(advicesRef, startAt, loadCapacity, deviceType="mobile")
                .then(newStartAt => {
                startAt = newStartAt;
                addEventHandlerToAllReactionBtn(firebase, document.querySelectorAll("#advices .content-reaction-btn"));
                })
                .catch(error => {
                alert(error);
                })
            }else{
                loadAdvices(advicesRef, startAt, loadCapacity, deviceType="desktop")
                .then(newStartAt => {
                startAt = newStartAt;
                addEventHandlerToAllReactionBtn(firebase, document.querySelectorAll("#advices .content-reaction-btn"));
                })
                .catch(error => {
                alert(error);
                })
            }
            //Load advices for under 6 feet people
            var startAt2 = 1;
            const loadCapacity2 = 3;
            // Function to load advices from Firestore
            if(!isDesktop){ //for mobile
                loadUnder6Advices(advicesRef, startAt2, loadCapacity2, deviceType="mobile")
                .then(newStartAt => {
                startAt2 = newStartAt;
                addEventHandlerToAllReactionBtn(firebase, document.querySelectorAll("#advicesUnder6 .content-reaction-btn"));
                })
                .catch(error => {
                alert(error);
                });
            }else{
                loadUnder6Advices(advicesRef, startAt2, loadCapacity2, deviceType="desktop")
                .then(newStartAt => {
                startAt2 = newStartAt;
                addEventHandlerToAllReactionBtn(firebase, document.querySelectorAll("#advicesUnder6 .content-reaction-btn"));
                })
                .catch(error => {
                alert(error);
                });
            }
            //search bar
            const inputElement = document.querySelector("input[name='search']");
            inputElement.addEventListener('keydown', function(e1) {
                if (e1.code == 'Enter' || e1.keyCode == 13) {
                    let searchKey = e1.target.value;
                    searchFromFireStore(db, "advices", searchKey)
                    .then(success =>{
                    document.querySelectorAll(".search-result").forEach(searchResult => {
                        searchResult.addEventListener("click", function(e2){
                        activateMasking();
                        showSuccessPopUp(this.getAttribute("title"), this.getAttribute("body"));
                        let searchResultsDisplayBox = document.querySelector("#searchResultsDisplayBox");
                        searchResultsDisplayBox.innerHTML = "";
                        searchResultsDisplayBox.classList.remove("active");
                        })
                    })
                    })
                    .catch(error => {
                    console.log(error);
                    })
                }
            });
            }))
            .catch(error => {
            logOutUser(firebase)
            .then((success) => {
                showSuccessPopUp("Logged Out", "You are logged out successfully.");
            })
            .catch(error=>{
                alert(error.message);
            })
            })
        }
        });
    }).catch(response =>{
        console.log(response);
    });
});