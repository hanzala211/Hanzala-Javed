`use strict`;
import { user0, user1, limitCode } from './users.js';

const templateId = `template_vh4r1zc`;
const serviceId = `service_9r0iq8f`;

const container = document.querySelector('.container');
const email = document.querySelector('.email_input');
const password = document.querySelector('.password_input');
const code = document.querySelector('.code_input');
const sendBtn = document.querySelector('.code_btn');
const signBtn = document.querySelector('.signin_btn');
const errorText = document.querySelector('.error_text');
const headErr = document.querySelector('.headErr');
const messageDiv = document.querySelector('.message_div');
let users = [];
let verificationCode;
let templateParams;
let foundUser;
function setLocalStorage(key, arr) {
	users.push(user0);
	users.push(user1);
	localStorage.setItem(key, JSON.stringify(arr));
}
setLocalStorage('usersLogin', users);
function getLocalStorage() {
	const result = JSON.parse(localStorage.getItem(`usersLogin`));
	return result;
}
getLocalStorage();

function removeHidden() {
	if (!document.querySelector('.message_div').classList.contains('hidden')) {
		setTimeout(() => {
			document.querySelector('.message_div').classList.add('hidden');
		}, 2500);
		clearTimeout();
	}
}
function generateVerificationCode() {
	return Math.floor(100000 + Math.random() * 900000).toString(); // it generates random number of 6 digits
}
function accountNotFound() {
	failedDiv();
	errorText.textContent = 'Account Not Found';
	headErr.textContent = 'ERROR';
	removeHidden();
}
function failedDiv() {
	messageDiv.classList.remove('hidden');
	messageDiv.classList.add('failed_div');
}
async function sendMessage() {
	try {
		sendBtn.disabled = true;
		const response = await emailjs.send(serviceId, templateId, templateParams); // have to write it inside the try
		verificationCode = generateVerificationCode();
		console.log(verificationCode);
		errorText.textContent = 'Please Verify Your Email';
		messageDiv.classList.remove('hidden');
		messageDiv.classList.remove('failed_div');
		messageDiv.classList.add('success_div');
		headErr.textContent = 'Email Sent';
		console.log(`Success ${response.status} ${response.text}`);
		removeHidden();
	} catch (error) {
		failedDiv();
		errorText.textContent = `Code Can't be sent: ${error.message}`;
		headErr.textContent = 'ERROR';
		console.error("Can't Send");
		removeHidden();
	} finally {
		sendBtn.disabled = false;
	}
}

sendBtn.addEventListener('click', function (e) {
	e.preventDefault();
	let foundUser = users.find((user) => user.email === email.value);
	if (typeof foundUser === 'undefined') {
		accountNotFound();
	} else {
		templateParams = {
			to_email: email.value,
			code: verificationCode,
		};
		// emailjs.send(serviceId, templateId, templateParams).then((response) =>{
		//     verificationCode = generateVerificationCode();
		//     console.log(verificationCode)
		//     document.querySelector(".error_text").textContent = "Please Verify Your Email";
		//     document.querySelector(".message_div").classList.add("success_div");
		//     document.querySelector(".message_div").classList.remove("hidden");
		//     document.querySelector(".headErr").textContent = "Email Sent";
		//     console.log(`Success ${response.status} ${response.text}`);
		//     sendBtn.disabled = true;
		// }).catch((err)=> {
		//     document.querySelector(".message_div").classList.remove("hidden");
		//     document.querySelector(".message_div").classList.add("failed_div");
		//     document.querySelector(".error_text").textContent = `Code Can't be sent: ${err.message}`;
		//     document.querySelector(".headErr").textContent = "ERROR";
		// }); i used the async await method to make it work
		sendMessage();
	}
	removeHidden();
});
document.querySelector('.close').addEventListener('click', function (e) {
	e.preventDefault();
	document.querySelector('.message_div').classList.add('hidden');
});
signBtn.addEventListener('click', function (e) {
	foundUser = users.find((user) => user.email === email.value);
	if (typeof foundUser === 'undefined') {
		accountNotFound();
	} else if (!email.value || !password.value || !code.value) {
		failedDiv();
		error.textContent = 'Please Input the Values';
		headErr.textContent = 'ERROR';
	} else if (code.value !== verificationCode) {
		failedDiv();
		errorText.textContent = 'Wrong Code';
		headErr.textContent = 'ERROR';
		code.value = '';
	} else if (password.value !== foundUser.password) {
		failedDiv();
		errorText.textContent = 'Wrong Password';
		headErr.textContent = 'ERROR';
		password.value = '';
	} else {
		console.log('Success'); // the succesfull part of the code
		localStorage.setItem('loggedIn', JSON.stringify(foundUser));
		setTimeout(() => {
			email.value = password.value = code.value = '';
			window.location.href = 'dashboard.html';
		}, 3000);
	}
	removeHidden();
});
code.addEventListener('input', function () {
	limitCode(this);
});
