// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/alt-setup fixed mimi type error thing
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";


import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

localStorage.account;

// with will set ther server to the server they are in no matter that page is
try {
    server = setserver(document.URL.split("?server=")[1])
} catch {
    var server = null;
}


// if loged in then make sigh in button say that you are
try {
    // document.getElementById("img").src = JSON.parse(localStorage.account).img;

    document.getElementById("account").innerHTML = JSON.parse(localStorage.account).user;
    document.getElementById("Username").innerHTML = "Username: " + JSON.parse(localStorage.account).user;
    document.getElementById("name").innerHTML = "Name: " + JSON.parse(localStorage.account).name;
    document.getElementById("email").innerHTML = "Email: " + JSON.parse(localStorage.account).email;
    var loggedin = true;
} catch {
    try {
        console.log(JSON.parse(localStorage.account).user);

        document.getElementById("account").innerHTML = "Sign/Log in";
        var loggedin = false;
    } catch {

    }
}

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO make it do key is hidden and anyone can change it
const firebaseConfig = {

    apiKey: "AIzaSyA271Df-tIENFDdLDMpIWe9Mf5xrMqNdQs",

    authDomain: "chatserver-f1e72.firebaseapp.com",

    databaseURL: "https://chatserver-f1e72-default-rtdb.firebaseio.com",

    projectId: "chatserver-f1e72",

    storageBucket: "chatserver-f1e72.appspot.com",

    messagingSenderId: "383480029882",

    appId: "1:383480029882:web:4b3ab17f74440aac8a9883",

    measurementId: "G-GRDQ5EJB9B"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

function makeServer() {
    // num go to servers postcount
    const db = getDatabase(app);
    const num = ref(db, "servers/" + server + "/");

    try {
        var server = document.getElementById("serverName").value
        if (document.getElementById("img").value == "") {
            var img = "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1410400/rubber-duck-clipart-xl.png"
        } else {
            var img = document.getElementById("img").value
        }
        if (document.getElementById("color").value == "") {
            var color = "#dd7d53"
        } else {
            var color = document.getElementById("color").value
        }
    } catch { console.log("Error color"); }

    try {
        get((db, num)).then((snapshot) => {
            // gets value of post counts
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                console.log("No data available");
                set(ref(db, "servers/" + server + "/postcount/"), {
                    // add name and message to it
                    nums: 1,
                    server: server,
                    img: img,
                    creator: JSON.parse(localStorage.account).user,
                    color: color
                });
            }
            // location.href = 'index.html'
            loadservers()
        })
    } catch (e) {
        console.log(e);
    }
}


// function to write a chat to a server
function writeUserData(name, message) {
    // num go to servers postcount
    const db = getDatabase(app);
    const num = ref(db, "servers/" + server + "/postcount/");

    if(loggedin){

    if (message.length <=200){
    get((db, num)).then((snapshot) => {
        // gets value of post counts
        console.log(snapshot.val());
        const nums = snapshot.val();
        set(num, {
            // sets it to itself +1
            nums: nums.nums += 1,
            server: server,
            img: nums.img,
            creator: nums.creator,
            color: nums.color

        });
        // go to the server then the postcount file
        // console.log("name: ", name)
        // console.log("message: ", message)
        set(ref(db, "servers/" + server + "/" + "message" + nums.nums + "/"), {
            // add name and message to it
            name: name,
            message: message,
            img: JSON.parse(localStorage.account).img,
            color: JSON.parse(localStorage.account).color

        });
        location.href = 'chat.html' + "?server=" + server
    })}
    else {
        alert("Message too long");
        }}else{
            alert("You are not logged in");
        }
}
function updateScroll(){
    var element = document.getElementById("toSend");
    element.scrollTop = element.scrollHeight;
}

function loadservers() {
    const db = getDatabase(app);
    const serv = ref(db, "servers/");

    get((db, serv)).then((snapshot) => {
        snapshot.forEach(snap => {
            // loops through all servers
            const servs = snap.val();
            // makes a div to add to the server list that gos to the server name in the file and sets it to it htlm
            var d = document.createElement('div');
            d.id = "servers";
            d.className = "item";
            var i = document.createElement('img');
            //  this make it so that when you click on it it will set you server to the name of that you clicked on
            i.src = servs.postcount.img
                // adds the server name to the div
            try {
                document.getElementById("serverName").appendChild(d);
            } catch {}
            d.addEventListener("click", function() {
                server = servs.postcount.server
                    // console.log(server)
                location.href = 'chat.html' + "?server=" + server
                    // loadchat(server)
            })

            i.id = "server";
            i.className = "images";
            d.appendChild(i);
            var chat = document.createElement("div")
            chat.innerHTML = servs.postcount.server;
            chat.setAttribute("style", "color:" + servs.postcount.color);
            var by = document.createElement("div")
            by.innerHTML = "Created by: " + servs.postcount.creator;
            by.className = "by"
            d.appendChild(chat)
            d.appendChild(by)


            try {

                document.getElementById('main').appendChild(d);
            } catch (error) {

            }
        });


    })

}

function loadchat() {
    const db = getDatabase(app);
    const num = ref(db, "servers/" + server);
    console.log("server:", server);

    try {

        document.getElementById('toSend').innerHTML = " "
    } catch (error) {
        console.log(error);
    }

    get((db, num)).then((snapshot) => {

        snapshot.forEach(snap => {
            // loops through all servers
            // console.log(snap.val())
            const chat = snap.val();
            var imgs = document.createElement("img")
            imgs.src = chat.img;
            imgs.className = "images";
            // console.log("the chat",chat)
            // makes a div to add to the cant list that gos to the chay name in the file and sets it to it htlm
            var main = document.createElement("div")
            main.setAttribute("style", "display:flex")
            main.id = "server";
            main.className = "chat";
            // user div
            var user = document.createElement('div');
            user.innerHTML = chat.name;
            user.setAttribute("style", "color:yellow");
            // thier chat div
            var userChat = document.createElement('div');
            userChat.innerHTML = chat.message;
            userChat.setAttribute("style", "color:" + chat.color);
            
            // user.appendChild(imgs)
            user.appendChild(userChat);
            console.log(user)
            main.appendChild(imgs)
            main.appendChild(user)
                // console.log(main)

            try {

                if (chat.name != null || chat.message != null) {
                    // add the change div to the main text box
                    document.getElementById("toSend").appendChild(main);
                }
            } catch {
                console.log("error", chat.name + ": " + chat.message)

            }
        });
        // make so whenver server loads it will go down to the bottom
        updateScroll();
    })

}
// https://www.w3resource.com/javascript/form/email-validation.php
// this is the same function that form type email uses but the way i have it it wont with if i just change the type 
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}
// i loked into how they did the valEmail function and useing regex you can accualy make a passcheck realy simply with it 
// (?=.*[A-Z])an uppercase letters.,(?=.*[!@#$&*])  has one special case letter.,(?=.*[0-9])has one digits.
// (?=.*[a-z]  has am lowercase letters.,.{8} length 8.
// (?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])
function passcheck(pass) {
    if (/^.{8,}$/.test(pass)) {
        return (true)
    }
    return (false)
}

// checks to see if thiere are 6 valuse 1-9A-f and i makes so doseend matter the case 
function hexCheck(hex) {
    if (/^#[0-9A-F]{6}$/i.test(hex)) {
        return (true)
    }
    return (false)
}
// https://stackoverflow.com/questions/18837735/check-if-image-exists-on-server-using-javascript
function imageCheck(image_url) {

    var http = new XMLHttpRequest();
    // trys to open image url works with most images but still breaks on some
    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}
// sets the server into the querry tag so i can access what server im in whenever
function setserver(search) {
    var search = search
    if (search != undefined) {
        search = decodeURI(search)
            // console.log(search)
        return search

    }
}
// opens create server form
function openForm() {
    document.getElementById("myForm").style.display = "block";
}
// close server form
function closeForm() {
    document.getElementById("myForm").style.display = "none";
}
// sign up
function makeAccount() {
    // num go to servers postcount
    console.log("makeing accout")
    const db = getDatabase(app);

    const users = ref(db, "users/" + document.getElementById("sName").value + "/");
    // checks image and color and sets them to a default value
    try {
        if (document.getElementById("userimg").value == "") {
            var img = "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1410400/rubber-duck-clipart-xl.png"
        } else {
            var img = document.getElementById("userimg").value;
        }
    } catch { console.log("No data available2"); }
    try {
        if (document.getElementById("userColor").value == "") {
            var userColor = "#dd7d53"
        } else {
            var userColor = document.getElementById("userColor").value;
        }
    } catch { console.log("No data available2"); }
    try {
        // alot of checks to make sure its dosent brake the whole thing
        if (document.getElementById("sName").value == "" || document.getElementById("sUName").value == "" || document.getElementById("sEmail").value == "" || document.getElementById("sPassword").value == "" || document.getElementById("sPassword2").value == "") {
            alert("fill in all felds please.")
        } else if (document.getElementById("sPassword").value != document.getElementById("sPassword2").value) {
            alert("Passwords do not match.")
        } else if (document.getElementById("sUName").value.length <= 5 || document.getElementById("sUName").value.length >= 21) {
            alert("Username too short or long.")
        } else if (!ValidateEmail(document.getElementById("sEmail").value)) {
            alert("invalid email.")
        } else if (document.getElementById("sName").value.length <= 5 || document.getElementById("sName").value.length >= 21) {
            alert("name too short or long.")
        } else if (!passcheck(document.getElementById("sPassword").value)) {
            alert("Password is to weak")
        } else if (!hexCheck(document.getElementById("userColor").value) && !document.getElementById("userColor").value == "") {
            alert("invalid hex code")
        } else if (!imageCheck(document.getElementById("userimg").value) && (document.getElementById("userimg").value.length<50)) {
            alert("invalid image")
        } else {
            // if it passes validation checks then it will set pass to password box 
            var pass = document.getElementById("sPassword").value
            // goes and gets a snapshot of the data base 
            get((db, users)).then((snapshot) => {
                // gets value of post counts
                const nums = snapshot.val();
                set(users, {
                    // sets it to itself +1
                    name: document.getElementById("sName").value,
                    user: document.getElementById("sUName").value,
                    email: document.getElementById("sEmail").value,
                    password: pass,
                    img: img,
                    color: userColor


                });

            });

            alert("Account made")
                location.href = 'account.html'
        }
    } catch (err) {}
}
// login
function login() {
    const db = getDatabase(app);
    const users = ref(db, "users/");
    // check if fealds are full befor even checking through all accounts
    if (document.getElementById("lName").value == "" || document.getElementById("lPass").value == "") {
        alert("fill in all felds please.")
    } else {
        var logged=false;
        get((db, users)).then((snapshot) => {
            snapshot.forEach(snap => {
                // loops through all servers
                const user = snap.val();
                // makes a div to add to the server list that gos to the server name in the file and sets it to it htlm\
                // check if user name and password are same or email nad password
                if (user.user == document.getElementById("lName").value && user.password == document.getElementById("lPass").value || user.email == document.getElementById("lName").value && user.password == document.getElementById("lPass").value) {
                    localStorage.account = JSON.stringify(user)
                    logged = true;
                    location.href = "index.html"
                } else {

                }
            });
            // calls an error if no accout is matches the info
            if (!logged){
            alert("invalid username or password")}


        })
    }


}

// function that waits for update to the firebase and updates file if there is one 
// basicly constly looking for update so that if someone else type something it will update on are website
const db = getDatabase(app);
const data = ref(db, "servers/" + server + "/");
onValue(data, (snapshot) => {
    const data = snapshot.val();
    if (server == null) {
        loadservers()
    } else {
        loadchat()

    }
});


// all the buttons that need onclick listenrs try is cause it wants to error if buttons on on said page 
try {

    document.getElementById("send").onclick = function() {
        writeUserData(JSON.parse(localStorage.account).user, document.getElementById("chat").value)
    };
} catch (error) {

}
try {
    // writeUserData(prompt("name"), prompt("message"));
    document.getElementById("test").onclick = function() { console.log(JSON.parse(localStorage.account).user) };
} catch (error) {

}
try {
    document.getElementById("createServer").onclick = function() {
            if (loggedin) {

                try {
                    if (document.getElementById("serverName").value.length <= 8) {
                        alert("Server name must be atleast 8 characters long");
                    } else if (document.getElementById("serverName").value.length >= 100) {
                        alert("Server name must be least then 100 characters long");
                    } else if (!imageCheck(document.getElementById("img").value)) {
                        alert("invalid image")
                    } else if (!hexCheck(document.getElementById("color").value) && !document.getElementById("color").value == "") {
                        alert("invalit hex")
                    } else {
                        makeServer()
                    }

                } catch {

                }
            } else {

                alert("please login first");

            }
        }
        // document.getElementById("createServer").onclick = function() { makeServer() };

} catch (error) {

}
try {
    // writeUserData(prompt("name"), prompt("message"));
    document.getElementById("signUp").onclick = function() { makeAccount() };
} catch (error) {}
try {
    // writeUserData(prompt("name"), prompt("message"));
    document.getElementById("login").onclick = function() { login() };
} catch (error) {}
try {
    // writeUserData(prompt("name"), prompt("message"));
    document.getElementById("create").onclick = function() {
        if (loggedin) { openForm() } else {

            alert("please login first");

        }
    };
} catch (error) {}
try {
    // writeUserData(prompt("name"), prompt("message"));
    document.getElementById("close").onclick = function() { closeForm() };
} catch (error) {}
try {
    document.onkeydown = function(e) {
        e = e || window.event;
        switch (e.which || e.keyCode) {
            case 13:
                {
                    if (!document.getElementById("chat").value == "") {
                        writeUserData(JSON.parse(localStorage.account).user, document.getElementById("chat").value)
                    }
                }
                break;
        }
    }
} catch {}