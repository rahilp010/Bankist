
const account1 = {
    owner: 'Rahil Patel',
    movements: [200, 450, -300, 390, -650, 130, 70, 1300, -4500, -100, 309, -610, 70, 1300, 4500, -100, 309, -610],
    interestRate: 1.2,
    pin: 1111
}
const account2 = {
    owner: 'Harsh Patel',
    movements: [500, 150, -300, -390, -650, -30, -90, 100],
    interestRate: 1.5,
    pin: 2222
}
const account3 = {
    owner: 'Jaimin Prajapati',
    movements: [20, -4500, -100, 309, -610, 110, 10, -1300],
    interestRate: 2,
    pin: 3333
}
const account4 = {
    owner: 'Manav Mistry',
    movements: [-90, 950, 300, -390, -6500, 710, 90, 1],
    interestRate: 4,
    pin: 4444
}

const account = [account1, account2, account3, account4]
const button = document.querySelector('.button')
const analytics = document.querySelector('#analytics')
const balance = document.querySelector('#balance')
const logCount = document.querySelector('#logCount')
const amount = document.querySelector('.amount')
const logTime = document.querySelector('#logTime')
const currentBalance = document.querySelector('.currentBalance')
const closeAccount = document.querySelector('#closeAccount')
const countDown = document.querySelector('#countDown')
const loan = document.querySelector('.loan')
const backGround = document.querySelector('.backGround')
const In = document.querySelector('.In')
const out = document.querySelector('.out')
const interest = document.querySelector('.interest')
const sort = document.querySelector('.sort')
const timerSection = document.querySelector('.timerSection')

button.addEventListener('click', () => {
    const user = document.querySelector('#user').value
    const pin = document.querySelector('#pin').value

    if (!user || !pin) {
        button.disabled = true;
        return;
    }

    let isValid = false
    let emptyUser = document.querySelector('#user').value = ''
    let emptyPin = document.querySelector('#pin').value = ''
    const greet = new Date()

    for (let owner of account) {
        const [first, last] = owner.owner.split(' ');
        const userId = [first[0].toLowerCase(), last[0].toLowerCase()].join('');
        const pinId = owner.pin;
        const logData = owner.movements


        if (user == userId && pin == pinId) {
            backGround.classList.add('hidden')
            timerSection.classList.remove('hidden')
            emptyUser
            emptyPin
            analytics.style.display = 'block'
            balance.style.display = 'block'
            isValid = true

            let valueData = logData.reduce((a, b) => a + b, 0)

            currentBalance.textContent = `${valueData > 0 ? '' : '-'}₹${Math.abs(valueData)}`


            logData.forEach((value, index) => {

                const logEntry = document.createElement('p')
                logEntry.style.backgroundColor = value > 0 ? '#87ce19' : '#ee3651'
                logEntry.classList.add('px-3', 'p-1', 'text-white', 'text-sm', 'rounded-xl', 'text-center')
                logEntry.textContent = `${value > 0 ? 'Deposit' : 'Withdrawal'}`
                logCount.appendChild(logEntry)

                const amountEntry = document.createElement('p')
                amountEntry.textContent = `${value > 0 ? '' : '-'}₹${Math.abs(value)}`
                amountEntry.classList.add('px-3', 'p-1', 'text-gray-600', 'text-sm', 'rounded-xl', 'text-center', 'font-bold')
                amount.appendChild(amountEntry)

                const timeEntry = document.createElement('p')
                timeEntry.textContent = `${greet.toLocaleDateString()}`
                timeEntry.classList.add('px-3', 'p-1', 'text-gray-600', 'text-sm', 'rounded-xl', 'text-center', 'font-bold')
                logTime.appendChild(timeEntry)


            })


            let hours = greet.getHours()
            let greetingText = ''

            document.querySelector('#time').textContent = `As of ${greet.toLocaleString()}`

            // const greetings = ['Good night', 'Good morning', 'Good afternoon', 'Good evening', 'Good night'];
            // const greetingText = hours < 6 ? greetings[0] : hours < 12 ? greetings[1] : hours < 16 ? greetings[2] : hours < 22 ? greetings[3] : greetings[4];

            if (hours < 6) {
                greetingText = 'Good night';
            } else if (hours < 12) {
                greetingText = 'Good morning';
            } else if (hours < 16) {
                greetingText = 'Good afternoon';
            } else if (hours < 22) {
                greetingText = 'Good evening';
            } else {
                greetingText = 'Good night';
            }


            document.querySelector('#greeting').textContent = `${greetingText}, ${first}`

            closeAccount.addEventListener('click', () => {
                const cUser = document.querySelector('#cUser').value
                const cPin = document.querySelector('#cPin').value
                if (cUser == userId && cPin == pinId) {
                    document.querySelector('#cUser').value = ''
                    document.querySelector('#cPin').value = ''
                    timerSection.classList.add('hidden')
                    analytics.style.display = 'none'
                    balance.style.display = 'none'
                    document.querySelector('#greeting').textContent = 'Log in to Get started'
                    isValid = true
                }
            })

            loan.addEventListener('click', () => {
                const amountLoan = document.querySelector('.amountLoan').value
                console.log(amountLoan);
                logData.push(amountLoan)
            })

            const calcDisplaySummary = () => {

            }
            const IN = logData.filter(mov => mov >= 0).reduce((acc, mov) => acc + mov)
            const OUT = logData.filter(mov => mov < 0).reduce((acc, mov) => acc + mov)
            In.textContent = `₹${IN}`;
            out.textContent = `₹${Math.abs(OUT)}`;



            let isAscending = true;

            sort.addEventListener('click', () => {
                const sortedData = logData.sort((a, b) => isAscending ? a - b : b - a)

                isAscending = !isAscending

                logCount.innerHTML = '';
                amount.innerHTML = '';
                logTime.innerHTML = '';

                sortedData.forEach(value => {
                    const logEntry = document.createElement('p');
                    logEntry.style.backgroundColor = value > 0 ? '#87ce19' : '#ee3651';
                    logEntry.classList.add('px-3', 'p-1', 'text-white', 'text-sm', 'rounded-xl', 'text-center');
                    logEntry.textContent = value > 0 ? 'Deposit' : 'Withdrawal';
                    logCount.appendChild(logEntry);

                    const amountEntry = document.createElement('p');
                    amountEntry.textContent = `${value > 0 ? '' : '-'}₹${Math.abs(value)}`;
                    amountEntry.classList.add('px-3', 'p-1', 'text-gray-600', 'text-sm', 'rounded-xl', 'text-center', 'font-bold');
                    amount.appendChild(amountEntry);

                    const timeEntry = document.createElement('p');
                    timeEntry.textContent = `${greet.toLocaleDateString()}`;
                    timeEntry.classList.add('px-3', 'p-1', 'text-gray-600', 'text-sm', 'rounded-xl', 'text-center', 'font-bold');
                    logTime.appendChild(timeEntry);
                });
            })


            let countDownMinutes = 30;
            let countDownSeconds = 0;

            const updateCount = () => {

                const displayMinutes = String(countDownMinutes).padStart(2, '0')
                const displaySeconds = String(countDownSeconds).padStart(2, '0')

                countDown.textContent = `${displayMinutes} : ${displaySeconds}`

                if (countDownMinutes === 0 && countDownSeconds === 0) {
                    clearInterval(countdownInterval);
                    document.getElementById('countDown').textContent = "Session Expired!";
                    analytics.style.display = 'none'
                    balance.style.display = 'none'
                    backGround.classList.remove('hidden')
                    document.querySelector('#greeting').textContent = 'Log in to Get started'
                }

                if (countDownSeconds === 0) {
                    countDownMinutes--;
                    countDownSeconds = 59;
                } else {
                    countDownSeconds--;
                }
            }
            const countdownInterval = setInterval(updateCount, 1000);


            break;
        }

    }
    if (!isValid) {
        alert('Wrong')
        emptyUser
        emptyPin
    }

})
