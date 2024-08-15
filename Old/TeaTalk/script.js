var pass = false;


function passcheck() {
    var pass = document.getElementById('password');
    if (pass.value == "" || pass.value == null || pass.value == "undefined" || pass.value == "null" || pass.value == "false") {
        alert("undefined");

    } else if (pass.value.length < 8) {
        alert("password must be at least 8 characters long");
    } else {
        // Te@T@1k2022
        alert(pass.value);
        var encrypted = CryptoJS.AES.encrypt("Correct", pass.value);
        var decrypted = CryptoJS.AES.decrypt(encrypted, pass.value);
        var toCheck = decrypted

        alert(String(toCheck))
        if (String(toCheck) == String("436f7272656374")) {
            pass = true;

        } else {
            pass = false;

        }
    }
}















document.getElementById("passSubmit").onclick = function() {
    passcheck();
    alert(pass)
}