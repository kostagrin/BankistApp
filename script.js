'use strict';
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');
const euroSign = '€';
const dollaSign = '$';

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (account) {
  containerMovements.innerHTML = '';
  account.movements.forEach(function (move, i) {
    let moveType = move > 0 ? 'deposit' : 'withdrawal';
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${moveType}">${
      i + 1
    } ${moveType}</div>
          <div class="movements__value">${move}${euroSign}</div>
        </div> 
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = (account, value) => {
  let res = account.movements.reduce((acc, curr, i, arr) => (acc += curr), 0);
  value.textContent = `${res}${euroSign}`;
};

const calcDisplaySummary = account => {
  let incomes = account.movements
    .filter(movement => movement > 0)
    .reduce((acc, curr) => acc + curr, 0);
  let outcomes = account.movements
    .filter(movement => movement < 0)
    .reduce((acc, curr) => acc + curr, 0);
  let interest = account.movements
    .filter(value => value > 0)
    .map(value => value * account.interestRate * 0.01)
    .filter(value => value >= 1)
    .reduce((acc, curr) => acc + curr, 0);
  labelSumIn.textContent = `${incomes}${euroSign}`;
  labelSumOut.textContent = `${Math.abs(outcomes)}${euroSign}`;
  labelSumInterest.textContent = `${interest}${euroSign}`;
};

const account = accounts.find(account => account.owner === 'Steven Thomas Williams');

const createUserName = accounts => {
  accounts.forEach(account => {
    account.username = account.owner
      .toLocaleLowerCase()
      .split(' ')
      .map(name => name.at(0))
      .join('');
  });
};

let movements = [200, -200, 340, -300, -20, 50, 400, -460];
const deposits = movements.filter(el => el > 0);
const withdrawals = movements.filter(el => el < 0);

const balance = movements.reduce((acc, curr) => (acc += curr), 0);

calcDisplayBalance(account1, labelBalance);
displayMovements(account1);
createUserName(accounts);
calcDisplaySummary(account1);
