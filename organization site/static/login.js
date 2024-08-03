document.getElementById('signupBtn').addEventListener('click', function () {
    openDialog('signupDialog');
});

function openDialog(dialogId) {
    document.getElementById(dialogId).style.display = 'block';
}

function closeDialog(dialogId) {
    document.getElementById(dialogId).style.display = 'none';
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());

    closeDialog('loginDialog');
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}


document.getElementById('signupForm').addEventListener('submit', function (event) {
    let services = document.querySelectorAll('input[name="service"]');
    let serviceSelected = Array.from(services).some(checkbox => checkbox.checked);

    if (!serviceSelected) {
        event.preventDefault();
        alert('Please select at least one service.');
    } else if (!checkCaptcha()) {
        event.preventDefault();
    }
});

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const phoneInput = document.getElementById('phonelogin').value;
    if (!phoneInput) {
        alert('Please enter your phone number.');
    } else {
        console.log('Phone number submitted:', phoneInput);
        closeDialog('loginDialog');
    }
});


signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const ngoName = document.getElementById('ngoName').value;
    const checkboxs=[];
    const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
    for (const checkbox of checkboxes) {
        if (checkbox.checked) {
            checkboxs.push(checkbox.value);
        }
    }
    const phn_no = document.getElementById('phoneSignup').value;
    const password = document.getElementById('passwordsignup').value;
    const goal = document.getElementById('goal').value;
    const fundingSource = document.getElementById('fundingSource').value;
    const achievements = document.getElementById('achievements').value;
    console.log(ngoName, checkboxs, phn_no,password, goal, fundingSource, achievements)
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ngoName,
            checkboxs,
            phn_no,
            password,
            goal,
            fundingSource,
            achievements
        })
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) { 
                document.getElementById('error-message').style.display = 'block';
            } else {
                console.error(data.error); 
            }
        })
        .catch(error => console.error(error));
}
);

function openlogin(dialogId) {
    document.getElementById('signupDialog').style.display = 'none';
    document.getElementById(dialogId).style.display = 'block';
}







const loginDialog = document.getElementById('loginDialog');
const errorMessagee = document.getElementById('error-messagee');

loginDialog.addEventListener('submit', (event) => {
    event.preventDefault();
    document.getElementById('loginDialog').style.display = 'block';
    const phone = document.getElementById('phonelogin').value;
    const password = document.getElementById('passwordlogin').value;

    console.log(phone,password)

    // Basic form validation (optional)
    if (phone === '' || password === '') {
        errorMessagee.textContent = 'Please enter phone and password.';
        return;
    }

    // Send data to server using AJAX or Fetch API
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone,
            password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (!data.success) {
            errorMessagee.textContent = data.message;
        } else {
            console.log(phone,password,"trg")
            window.location.href = `/map/${phone}/${password}`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

