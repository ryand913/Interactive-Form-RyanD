// access the first input text element on the page

let firstField = document.querySelector("input[type=text]");

// add focus method 
firstField.focus();
// get the text entry field for job role
let jobRoleText = document.querySelector("input[name=other-job-role]");
// remove the element on page load
jobRoleText.remove();
//select jobtitle element 
let jobRoleSelect = document.querySelector("select[id=title]");
//add an event listener to the jobtitle
jobRoleSelect.addEventListener("change", (e) => {
let options = document.querySelector("select[id=title]").children;
//loop through each option
for (let i = 0; i <= options.length; i++) {
//if the selection equals other, show the job role text entry field
 if (e.target.value === "other"){
    document.querySelector("fieldset[class=basic-info]").appendChild(jobRoleText);
   }
//remove it if anything else is selected
else {
    jobRoleText.remove();
}

} 
});
//access elements of DOM needed targeted by the conditional logic
let colorDropdown = document.querySelector("select[id=color]");
let designDropdown = document.querySelector("select[id=design]");
let colorOptions = colorDropdown.children;
//disable the color dropdown
colorDropdown.disabled = true;

designDropdown.addEventListener("change", (e) => {
    //enable the color dropdown once an option has been selected
    colorDropdown.disabled = false;
    for (let i = 0; i <= colorOptions.length; i++) {
    let selection = e.target.value;
    let theme = colorOptions[i].getAttribute("data-theme");
        if (selection === theme){
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute("selected", "true");
        }
        else {
            colorOptions[i].hidden = true;
            colorOptions[i].removeAttribute("selected");
        }
}
});

//access all elements of DOM needed to create a calculated field on webpage
let activitiesList = document.querySelector("fieldset[id=activities]");
let total = document.querySelector("p[id=activities-cost]");
let initialTotal = 0;

activitiesList.addEventListener("change", (e) =>
{
 let clickedCost = parseInt(e.target.getAttribute("data-cost"));
    if (e.target.checked){
        //if something is checked, add the cost to the initialTotal
    initialTotal = initialTotal + clickedCost;
 }  else {
     //if something is unchecked, subtract the cost
    initialTotal = initialTotal - clickedCost;
 }
 total.innerHTML = `Total: $ ${initialTotal}`;

});

activitiesList.addEventListener("change", (e) =>
{
    let allOptions = document.querySelectorAll("input[type=checkbox]");
    for (let i = 0; i <= allOptions.length; i++){
        if (e.target.getAttribute("data-day-and-time") === allOptions[i].getAttribute("data-day-and-time")
        && e.target.checked === true){
            allOptions[i].disabled = true;
            e.target.disabled = false;
        }
        else if (e.target.getAttribute("data-day-and-time") !== allOptions[i].getAttribute("data-day-and-time")
        && allOptions[i].disabled === false){
            allOptions[i].disabled = false;
            e.target.enabled = true;
        }
        else if (e.target.getAttribute("data-day-and-time") === allOptions[i].getAttribute("data-day-and-time")
        && e.target.checked === false){
            allOptions[i].disabled = false;
            e.target.enabled = false;
        }
    }
});
document.querySelector("option[value='credit-card']").setAttribute("selected",true);
let bitcoinOption = document.querySelector("div[id=bitcoin]");
let paypalOption = document.querySelector("div[id=paypal]");
let creditCardOption = document.querySelector("div.credit-card,div.year-box,div.credit-card-box,div.zip-box,div.cvv-box");
let paymentDropdown = document.querySelector("select[id=payment]");
function removeOptions() {
bitcoinOption.hidden = true;
   paypalOption.hidden = true;
 }
removeOptions();

 paymentDropdown.addEventListener("change", (e) => {
     let options = paymentDropdown.children;
 for (let i = 0; i <= options.length; i++) {
    //hide & display fields conditionally based on the selected option
  if (e.target.value === "paypal"){
    creditCardOption.hidden = true
    bitcoinOption.hidden = true
    paypalOption.hidden = false
    
 }
 else if (e.target.value === "bitcoin"){
    creditCardOption.hidden = true
    bitcoinOption.hidden = false
    paypalOption.hidden = true
}
else if (e.target.value === "credit-card"){ 
    creditCardOption.hidden = false
    bitcoinOption.hidden = true
    paypalOption.hidden = true
} 
}
});

const form = document.querySelector("form");
//each form required for validation has a function assigned
form.addEventListener("submit", (e) => {
    //this function checks that there is a name value. If there is a value, the valid class is assigned and hint is removed.
    //if name is null, then assign the not-valid class and show the hint
    function nameCheck(name) {
        let nameObject = document.querySelector("input[id=name]");
        let nameEntry = document.querySelector("input[id=name]").value;
            if(nameEntry){
                nameObject.parentElement.className = "valid";
                nameObject.parentElement.lastElementChild.classList.add('hint');
                return true
                
         }
        else{
            nameObject.parentElement.className = "not-valid";
            nameObject.parentElement.lastElementChild.classList.remove('hint');
            return false
            }
    }
        //assign true false value for later validation
        let nameValid = nameCheck();
    function emailCheck(email) {
        //uses a regex check to determine validity of email. If email regex test is true, the valid class is assigned and hint is removed.
    //If email regex test is false, then assign the not-valid class and show the hint
        let emailObject = document.querySelector("input[id=email]");
        let emailEntry = document.querySelector("input[id=email]").value;
        let regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com/;
            if(regex.test(emailEntry)){
                emailObject.parentElement.className = "valid";
                emailObject.parentElement.lastElementChild.classList.add('hint');
                return true
            }
            else{
                emailObject.parentElement.className = "not-valid";
                emailObject.parentElement.lastElementChild.classList.remove('hint');
                return false
            }
        }
        //assign true false value for later validation
     let emailValid = emailCheck();
    function activityCheck(activity) {
        //if there is a value greater than 0 in the total element, there is more than one activity selected and is therefore valid
        let activitiesObject = document.querySelector('fieldset#activities');
        let activitiesHint = document.querySelector("p#activities-hint");
        if (initialTotal > 0){
            activitiesObject.className = 'activities valid';
            activitiesHint.classList.add('hint');
            return true
        }
        else {
            activitiesObject.className = 'activities not-valid';
            activitiesHint.classList.remove('hint');
            return false
        }
    }
    //assign true false value for later validation
    let activityValid = activityCheck();


    function numberCheck(number) {
        let numberEntry = document.querySelector("input[id=cc-num]").value;
        let numberObject = document.querySelector("input[id=cc-num]");
        if (numberEntry.length === 1) {
            digit = 'digit';
        }
        else {
            digit = 'digits';
        }    
        let numberRegex = /^\d{13,16}$/;


        let dropDownValue = document.querySelector("select[id=payment]").value;
        let hint = document.querySelector("input[id=cc-num]").parentElement.lastElementChild;
            if (numberRegex.test(numberEntry) === true && dropDownValue === 'credit-card'){
                numberObject.parentElement.lastElementChild.classList.add('hint');
                numberObject.parentElement.className = 'valid';
                return true
            }
            else if (numberRegex.test(numberEntry) === false){
                    numberObject.parentElement.className = 'not-valid';
                    numberObject.parentElement.lastElementChild.classList.remove('hint');
                    hint.textContent = `The number you entered is ${numberEntry.length} ${digit}. Credit card number must be between 13 - 16 digits`
                    return false
                }
            else {
                return true
            }
            }      
            //assign true false value for later validation
        let numberValid = numberCheck();
    function cvCheck(cv) {
        let cvEntry = document.querySelector("input[id=cvv]").value;
        let cvObject = document.querySelector("input[id=cvv]");
        let cvRegex = /^\d{3}$/;
            if (cvRegex.test(cvEntry) === true){
                    cvObject.parentElement.lastElementChild.classList.add('hint');
                    cvObject.parentElement.className = 'valid';
                    return true
                }
                else if (cvRegex.test(cvEntry) === false){
                        cvObject.parentElement.className = 'not-valid';
                        cvObject.parentElement.lastElementChild.classList.remove('hint');
                        return false
                    }
                }
            //assign true false value for later validation
            let cvValid = cvCheck();
     function zipCheck(zip) {
        let zipEntry = document.querySelector("input[id=zip]").value;
        let zipObject = document.querySelector("input[id=zip]");
        let zipRegex = /^\d{5}$/;    
                    if (zipRegex.test(zipEntry) === true){
                        zipObject.parentElement.className = 'valid';
                        zipObject.parentElement.lastElementChild.classList.add('hint');
                        return true
                    }
                    else if (zipRegex.test(zipEntry) === false){
                            zipObject.parentElement.className = 'not-valid';
                            zipObject.parentElement.lastElementChild.classList.remove('hint');
                            return false
                        }
                    }
     //assign true false value for later validation           
    let zipValid = zipCheck();
 let paymentValue =   document.querySelector("select[id=payment]").value;
  if 
      (nameValid && emailValid && activityValid && numberValid && cvValid && zipValid  && paymentValue === 'credit-card') 
 {
form.submit();

  }
  else if ((paymentValue === 'bitcoin' || paymentValue === 'paypal')&& nameValid && emailValid && activityValid){
form.submit();
  }

  else {
    e.preventDefault();
 
  }

});
//Accessibility Tasks
let checkboxes = document.querySelectorAll("input[type=checkbox]");
checkboxes.forEach(item => {
    item.addEventListener('focus', e =>
    {
        item.parentElement.className = 'focus';
    })

});

checkboxes.forEach(item => {
    item.addEventListener('blur', e =>
    {
        let selected = document.querySelector("label[class=focus]");
        selected.className = '';
    })

});

// cvv realtime validation

let cv = document.querySelector("input[id=cvv]");
let cvEntry = document.querySelector("input[id=cvv]").value;

cv.addEventListener("keyup", (e) => {

    let cvRegex = /^\d{3}$/;
    if(cvRegex.test(e.target.value) === true){

        cv.parentElement.lastElementChild.classList.add('hint');
    }
    else if (cvRegex.test(e.target.value) === false){
        cv.parentElement.lastElementChild.classList.remove('hint');
    }
});
