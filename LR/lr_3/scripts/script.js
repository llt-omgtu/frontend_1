// const testElem = document.getElementById("test")
//
//
// const user = {
//     name: "Ivan",
//     surname: "Ivanov",
//     age: 25,
//     isAdmin: true,
//     sayHello: function () {
//         console.log("Hello")
//     }
// }
//
//
// testElem.innerText = JSON.stringify(user)


//
//
// const TaskNameElem = document.getElementById('taskname')
// const AddButElem = document.getElementById('addBut')
// const TaskListElem = document.getElementById('tasklist')
//
// const array = [{name: "Рассказать про объекты", status: true}, {name: "Рассказать про массивы",status: false}]
//
// const render = function() {
//     TaskListElem.innerHTML = ""
//
//     array.forEach(function (el, i) {
//         TaskListElem.insertAdjacentHTML('beforeend', getTemplate(el, i))
//     })
//
// }
// const getTemplate = function (task, index) {
//     return (
//         `<il>
//             <p class="${task.status ? "completed" : ""}">${task.name}</p>
//             <button data-index="${index}", data-type="status">Статус</button>
//             <button data-index="${index}", data-type="delete">Удалить</button>
//         </il>`
//     )
// }
//
//
// AddButElem.onclick = function () {
//     const taskName = TaskNameElem.value
//
//     if (taskName === "") return
//     array.push({name: taskName, status: false})
//
//     render()
// }
//
//
// TaskListElem.onclick = function (e) {
//     const index = e.target.dataset.index
//     const type = e.target.dataset.type
//
//     if (!index || !type) return
//
//     if (type === "status") {
//         array[index].status = !array[index].status
//     }
//
//     if (type === "delete") {
//         array.splice(index, 1)
//     }
//
//     render()
//
//
// }
//
// render()
//
//
//


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('dataForm');
    const table = document.getElementById('dataTable').querySelector('tbody');
    const errorDiv = document.getElementById('error');
    const slides = document.querySelector('.slides');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const slidesCount = document.querySelectorAll('.slide').length;

    let currentSlide = 0;
    let slideInterval;

    function saveToLocalStorage() {
        const rows = [];
        table.querySelectorAll('tr').forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length >= 3) {
                rows.push({
                    name: cells[0].textContent,
                    email: cells[1].textContent,
                    phone: cells[2].textContent
                });
            }
        });
        localStorage.setItem('tableData', JSON.stringify(rows));
    }

    function loadFromLocalStorage() {
        const saved = localStorage.getItem('tableData');
        if (saved) {
            const data = JSON.parse(saved);
            data.forEach(item => addTableRow(item.name, item.email, item.phone));
        }
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function addTableRow(name, email, phone) {
        const row = table.insertRow();

        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);

        cell1.textContent = name;
        cell2.textContent = email;
        cell3.textContent = phone;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Удалить';
        deleteBtn.addEventListener('click', function() {
            row.remove();
            saveToLocalStorage();
        });

        cell4.appendChild(deleteBtn);
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();

        let hasError = false;

        [nameInput, emailInput, phoneInput].forEach(input => {
            input.classList.remove('error-input');
        });
        errorDiv.textContent = '';

        if (!name) {
            nameInput.classList.add('error-input');
            hasError = true;
        }

        if (!email || !validateEmail(email)) {
            emailInput.classList.add('error-input');
            hasError = true;
        }

        if (!phone) {
            phoneInput.classList.add('error-input');
            hasError = true;
        }

        if (hasError) {
            errorDiv.textContent = 'Заполните все поля корректно';
            return;
        }

        addTableRow(name, email, phone);
        saveToLocalStorage();

        form.reset();
    });

    function updateSlider() {
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slidesCount;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slidesCount) % slidesCount;
        updateSlider();
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    prevBtn.addEventListener('click', function() {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', function() {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });

    loadFromLocalStorage();
    startAutoSlide();
});