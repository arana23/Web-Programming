//I pledge my honor that I have abided by the Stevens Honor System - Aparajita Rana
let myForm = document.getElementById('myForm');
let number = document.getElementById('number');
let myUl = document.getElementById('list');
let errorDiv = document.getElementById('error');

function fib(n, x = 1, y = 0) {
  if (n <= 0) {
      return y;
  }
  else {
    return fib(n-1, y, x+y);
  }
}

function isPrime(n) {
  for(var i = 2; i < n; i++){
    if(n % i === 0) {
      return false;
    }
  }
  return n > 1;
}


if (myForm) {
  myForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log((number.value));
    if (number.value.trim() && !isNaN(number.value)) {
      //console.log("where we at");
      errorDiv.hidden = true;
      let li = document.createElement('li');
      li.innerHTML = 'The Fibonacci of '+number.value+' is '+fib(parseInt(number.value))+".";
      
      if(isPrime(fib(parseInt(number.value)))){
        li.classList.add("is-prime");
      }
      else{
        li.classList.add("not-prime");
      }

      myUl.appendChild(li);
      myForm.reset();
      number.focus();
    } else {
      number.value = '';
      errorDiv.hidden = false;
      errorDiv.innerHTML = 'You must enter a valid input (not blank)';
      number.focus();
      number.className = 'inputClass';
    }
  });
}