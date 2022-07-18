function displayModal(name) {
    const modal = document.getElementById('contact_modal');
    const title = document.querySelector('.title-contact')
    title.innerHTML = 'Contactez-moi'
    title.innerHTML += `<br> ${name}`
    modal.style.display = 'block';
    const main = document.querySelector('#main');
    main.style.opacity = 0.2;
    main.style.pointerEvents = 'none';
    checkInputModal()
}

function closeModal() {
    const modal = document.getElementById('contact_modal');
    modal.style.display = 'none';
    const main = document.querySelector('#main');
    main.style.opacity = 1;
    main.style.pointerEvents = 'auto';
}


// Test valid name and last name
function regexText(value) {
    const regex = /^[a-zA-Z_.+-]*(?:[a-zA-Z][a-zA-Z_.+-]*){2,}$/g;
    return regex.test(value);
  }
  // Test valid email
function regexEmail(value) {
    const regex =
      /^([a-z0-9]+(?:[._-][a-z0-9]+)*)@([a-z0-9]+(?:[.-][a-z0-9]+)*\.[a-z]{2,})$/gm;
    return regex.test(value);
  }
// Test valid textarea
function regexTextarea(value) {
    const regex = /^[a-zA-Z0-9?$@#()'!,+\-=_:.&€£*%\s]+$/
    return regex.test(value);   
}

function checkInputModal () {
    // Get DOM element input
    const firstName = document.querySelector('#firstname')
    const lastName = document.querySelector('#lastname')
    const email = document.querySelector('#email')
    const textarea = document.querySelector('#message')
    const submit = document.querySelector('#submit-button')

    textarea.style.border = 'none'

    // count number of error input
    let countError = 0

    // Check if name is valid
    function checkName() {
        let Name = firstName.value
        if (regexText(Name) === true) {
            firstName.classList.remove('error-input')
            if (countError > 0) countError--
            return
        } else {
            alert('Invalid First Name')
            firstName.classList.add('error-input')
            countError++
        }
    }

    // Check if lastname is valid
    function checkLastName() {
        let LastName = lastName.value
        if (regexText(LastName) === true) {
            firstName.classList.remove('error-input')
            if (countError > 0) countError--
            return
        } else {
            alert('Invalid Last Name')
            lastName.classList.add('error-input')
            countError++
        }
    }

    // check if email is valid
    function checkEmail() {
        let Email = email.value
        if (regexEmail(Email) === true) {
            email.classList.remove('error-input')
            if (countError > 0) countError--
            return
        } else {
            countError++
            email.classList.add('error-input')
            alert('Invalid Email')
        }
    }

    // check if message is valid
    function checkTextarea() {
        let Message = textarea.value
        if (regexTextarea(Message) === true) {
            textarea.style.border = 'none'
            textarea.classList.remove('error-input')
            if (countError > 0) countError--
            return
        } else {
            alert('Invalid Message')
            textarea.style.border = '2px solid red'
            textarea.classList.add('error-input')
            countError++
        }
    }

    // Check all input for save value in localStorage
    submit.addEventListener('click', (e) => {
        countError = 0
        checkName()
        checkLastName()
        checkEmail()
        checkTextarea()

        e.preventDefault()

        // push all value in localStorage & close modal
        if (countError === 0) {
            checkItemsInLocalStorage("firstname", firstName.value)
            checkItemsInLocalStorage("lastname", lastName.value)
            checkItemsInLocalStorage("email", email.value)
            checkItemsInLocalStorage("message", textarea.value)

            closeModal()
        } else {
            alert('Invalid input')
        }
    })
}

// Check if value was stock in local storage
function checkItemsInLocalStorage(key, value) {
    if (localStorage.getItem(key) === null) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
      localStorage.setItem(key, value);
    }
  }