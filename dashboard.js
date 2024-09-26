`use strict`;

import {
	users as expObj,
	emailRegex,
	limitEmail,
	limitInput,
} from './users.js';
const getLoggedUser = JSON.parse(localStorage.getItem('loggedIn'));
document
	.querySelector('head')
	.querySelector('title').innerHTML = `DashBoard | ${getLoggedUser.username}`;
const btnList = document.querySelectorAll('.item');
const btnUser = document.querySelector('.btn-add');
const addUserModal = document.querySelector('.add-popup');
const overlayModal = document.querySelector('.overlay');
const closeBtn = document.querySelector('.closeBtn');
const usernameInput = document.querySelector('.input-username');
const emailInput = document.querySelector('.input-email');
const passwordInput = document.querySelector('.input-password');
const addUser = document.querySelector('.add-user');
const tbody = document.querySelector('tbody');
const messageDiv = document.querySelector('.message_div');
const errorText = document.querySelector('.error_text');
const closeDiv = document.querySelector('.close');
const editBtn = document.querySelector('.btn-edit');
const editPopup = document.querySelector('.editPopup');
const editUser = document.querySelector('.edit-user');
const newName = document.querySelector('.new-username');
const newEmail = document.querySelector('.new-email');
const headErr = document.querySelector('.headErr');
const emailInputs = document.querySelectorAll('input[type = "email"]');
const textInputs = document.querySelectorAll("input[type = 'text']");
let editId;
let email;
let username;
let password;
let id;
let date;
let month;
let users = [];
let obj;
const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
emailInputs.forEach((item) => {
	item.addEventListener('input', function () {
		limitEmail(this);
	});
});
textInputs.forEach((item) => {
	item.addEventListener('input', function () {
		limitInput(this);
	});
});
passwordInput.addEventListener('input', function () {
	limitInput(this);
});
messageDiv.style.zIndex = 1000;

btnList.forEach((list) => {
	list.addEventListener('click', function (e) {
		const targetItem = e.target;
		btnList.forEach((item) => {
			item.classList.remove('active-class');
		});
		if (targetItem.classList.contains('item')) {
			targetItem.classList.add('active-class');
		}
	});
});
function addHide() {
	addUserModal.classList.add('hidden');
	overlayModal.classList.add('hidden');
	closeBtn.classList.add('hidden');
	editPopup.classList.add('hidden');
	usernameInput.value = emailInput.value = passwordInput.value = '';
}
function removeHide() {
	addUserModal.classList.remove('hidden');
	overlayModal.classList.remove('hidden');
	closeBtn.classList.remove('hidden');
}
function removeHidden() {
	if (!document.querySelector('.message_div').classList.contains('hidden')) {
		setTimeout(() => {
			document.querySelector('.message_div').classList.add('hidden');
		}, 2500);
		clearTimeout();
	}
}
function emptyArray() {
	newName.value = newEmail.value = '';
}
function displayMessage(isSuccess, message) {
	messageDiv.classList.remove('hidden');
	headErr.textContent = isSuccess ? 'SUCCESS' : 'ERROR';
	messageDiv.classList.toggle('success_div', isSuccess);
	messageDiv.classList.toggle('failed_div', !isSuccess);
	errorText.innerHTML = message;
	removeHidden();
}
function renderUsers(id, username, email, password, date, month) {
	const html = `<tr class="user" data-id= "${id}">
                            <td>${id}</td>
                            <td class="cl-username">${username}</td>
                            <td class="cl-email">${email}</td>
                            <td class="cl-password">${password}</td>
                            <td>${date} ${month}</td>
                            <td><button class="btn-edit"><img class="editImg" src="edit.png" alt=""></button></td>
                            <td>
                                <button class="deleteBtn"><img class="deleteImg" src="delete.png" alt=""></button>
                            </td>
                        </tr>`;

	tbody.insertAdjacentHTML('afterbegin', html);
}
btnUser.addEventListener('click', function () {
	removeHide();
});
closeBtn.addEventListener('click', function () {
	addHide();
});
overlayModal.addEventListener('click', function () {
	addHide();
});
addUser.addEventListener('click', function (e) {
	e.preventDefault();
	setLocalStorage();
});
tbody.addEventListener('click', function (e) {
	const targetImg = e.target;
	if (targetImg.classList.contains('deleteImg')) {
		const userId = targetImg.closest('.user').getAttribute('data-id');
		targetImg.closest('tr').remove();
		users = users.filter((user) => {
			return user.idUser !== userId;
		});
		localStorage.setItem(`users${getLoggedUser.id}`, JSON.stringify(users));
	}
});
function setLocalStorage() {
	email = emailInput.value;
	username = usernameInput.value;
	password = passwordInput.value;
	const time = new Date();
	date = time.getDate();
	month = months[time.getMonth()];
	id = Math.floor(100000 + Math.random() * 900000).toString();
	emailInput.value = passwordInput.value = usernameInput.value = '';
	const userExists = users.some((user) => user.usernameUser === username);
	if (userExists) {
		messageDiv.classList.remove('hidden');
		messageDiv.classList.remove('success_div');
		messageDiv.classList.add('failed_div');
		headErr.innerHTML = "Can't Add User";
		errorText.innerHTML = `Username already exists. Choose a different username.`;
		removeHidden();
		return;
	}
	if (emailRegex.test(email) && username && password) {
		renderUsers(id, username, email, password, date, month);
		addHide();
		obj = {
			emailUser: email,
			usernameUser: username,
			passwordUser: password,
			dateUser: date,
			monthUser: month,
			idUser: id,
		};
		users.push(obj);
		messageDiv.classList.remove('hidden');
		messageDiv.classList.remove('failed_div');
		messageDiv.classList.add('success_div');
		headErr.innerHTML = 'USER ADDED';
		errorText.innerHTML = `UserName: ${username}`;
		removeHidden();
		localStorage.setItem(`users${getLoggedUser.id}`, JSON.stringify(users));
	} else {
		messageDiv.classList.remove('hidden');
		messageDiv.classList.remove('success_div');
		messageDiv.classList.add('failed_div');
		headErr.innerHTML = "Can't Add User";
		errorText.innerHTML = `Add Proper Email`;
		removeHidden();
	}
}
function getLocalStorage() {
	const storedUsers = JSON.parse(
		localStorage.getItem(`users${getLoggedUser.id}`)
	);
	if (storedUsers) {
		users = storedUsers;
		users.forEach((user) => {
			renderUsers(
				user.idUser,
				user.usernameUser,
				user.emailUser,
				user.passwordUser,
				user.dateUser,
				user.monthUser
			);
		});
	}
}
closeDiv.addEventListener('click', function () {
	messageDiv.classList.add('hidden');
});

tbody.addEventListener('click', function (e) {
	if (e.target.classList.contains('editImg')) {
		editPopup.classList.remove('hidden');
		overlayModal.classList.remove('hidden');
		closeBtn.classList.remove('hidden');
		editId = e.target.closest('tr').getAttribute('data-id');
		newName.value = e.target
			.closest('tr')
			.querySelector('.cl-username').textContent;
		newEmail.value = e.target
			.closest('tr')
			.querySelector('.cl-email').textContent;
	}
});

// editUser.addEventListener('click', function () {
// 	const findIndex = users.findIndex((user) => {
// 		return user.usernameUser === oldName.value;
// 	});
// 	if (
// 		newName.value === '' ||
// 		newEmail.value === '' ||
// 		newPassword.value === ''
// 	) {
// 		displayMessage(false, `Add Values`);
// 		emptyArray();
// 	} else if (findIndex === -1) {
// 		displayMessage(false, `Can't Find User With Username: ${oldName.value}`);
// 		emptyArray();
// 	} else {
// 		addHide();
// 		displayMessage(true, `User Edited With Username: ${newName.value}`);
// 		users[findIndex].usernameUser = newName.value;
// 		users[findIndex].emailUser = newEmail.value;
// 		users[findIndex].passwordUser = newPassword.value;
// 		localStorage.setItem('users', JSON.stringify(users));
// 		tbody.innerHTML = '';
// 		users.forEach((user) => {
// 			renderUsers(
// 				user.idUser,
// 				user.usernameUser,
// 				user.emailUser,
// 				user.passwordUser,
// 				user.dateUser,
// 				user.monthUser
// 			);
// 		});
// 		emptyArray();
// 	}
// });
editUser.addEventListener('click', function () {
	const findId = users.findIndex((user) => {
		return user.idUser === editId;
	});
	if (
		newName.value === '' ||
		newEmail.value === '' ||
		!emailRegex.test(newEmail.value)
	) {
		displayMessage(false, `Add Proper Values`);
	} else if (emailRegex.test(newEmail.value)) {
		addHide();
		displayMessage(true, `User Edited With Username: ${newName.value}`);
		users[findId].usernameUser = newName.value;
		users[findId].emailUser = newEmail.value;
		localStorage.setItem(`users${getLoggedUser.id}`, JSON.stringify(users));
		tbody.innerHTML = '';
		users.forEach((user) => {
			renderUsers(
				user.idUser,
				user.usernameUser,
				user.emailUser,
				user.passwordUser,
				user.dateUser,
				user.monthUser
			);
		});
		emptyArray();
	}
});
const htmlList = `<li class="itemLog">UserName <span class= "nameSpan">${
	getLoggedUser.username
}</span> <span class="spanImg">${getLoggedUser.username.slice(
	0,
	1
)}</span></li>`;
document.querySelector('.list-items').insertAdjacentHTML('beforeend', htmlList);
document.addEventListener('DOMContentLoaded', getLocalStorage);
