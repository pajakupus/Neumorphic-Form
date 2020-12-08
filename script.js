const form = document.getElementById('form-register');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('confirmation');


// input error message
function showError(input, message) {
    const formControl = input.parentElement;  // uzima element iznad inputa sto je form control div
    formControl.className ='form-control error'; // override class

    const small = formControl.querySelector('small');  //query selector moze da vraca klasu, tag, id
    small.innerText = message; // menja tekst koji pise u tagu
}

//input success
function showSuccess (input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function validateEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function checkRequiered(inputArray) {
    inputArray.forEach(function(input) {
        if(input.value.trim() === '') {    // trim se samo otarasi belog viska prostora ako ima
           showError(input, `${getFieldName(input)} is requiered`); // pokazuje odgovarajuci id u error boxu
        } else {
            showSuccess(input);
        }
    });
}



//Get fieldName zbog velikog slova
//U JavaScript mora prvo slovo da se odsece pa da se Poveca pa tek onda da se vrati u rec

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1); // pravi prvo slovo veliko i sece ostalo i dodaje ostalo bez prvog slova
}



//check input length
function checkLenght(input, min, max) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be atleast ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} can't be over ${max} characters`);
    } else {
        showSuccess(input);
    }
}


//check password match
function checkPasswordMatch (input1, input2) {
    if(input1.value !== input2.value) {
        showError(input2, `Passwords don't match`);
    }
}

// slusa kada se pretisne element sa submit
form.addEventListener('submit', function(e) { 
    
    //da ne flesira consola na sekund
    e.preventDefault();

    checkRequiered([email,password,password2]);
    checkLenght(password, 6, 25);
    validateEmail(email);
    checkPasswordMatch(password, password2);

    
});
