function showMessage() {
    let message = "Hello, I'm JavaScript"; // local variable

    console.log(message);
}

showMessage(); // Hello, I'm JavaScript

console.log(message); // error


let userName = 'John';

function showMessage() {
    let message = "Hello " + userName;

    console.log(message);
}

showMessage(); // Hello John

console.log(userName);