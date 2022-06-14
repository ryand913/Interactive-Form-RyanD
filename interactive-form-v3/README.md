# Interactive-Form-RyanD
At least one required field validates user input in real time as the user interacts with the field.
 -I added an event listener for a keyup event to the CV field input. Each keyup event is tested against the regex defined in the cvRegex variable. When the keyup event value does not pass the regex test, the hint class is removed so the hint displays under the form. Only when the entry is 3 digits does the hidden class get re-added to that form field.
 
 At least one required form field provides validation error messages that differ depending on the reason the field is invalid.
  -I added this to the numberCheck() function. I access the length of the credit card number entry in the template literal. Based on the length of the credit card number, the error message changes.
