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




const TaskNameElem = document.getElementById('taskname')
const AddButElem = document.getElementById('addBut')
const TaskListElem = document.getElementById('tasklist')

const array = [{name: "Рассказать про объекты", status: true}, {name: "Рассказать про массивы",status: false}]

const render = function() {
    TaskListElem.innerHTML = ""

    array.forEach(function (el, i) {
        TaskListElem.insertAdjacentHTML('beforeend', getTemplate(el, i))
    })

}
const getTemplate = function (task, index) {
    return (
        `<il>
            <p class="${task.status ? "completed" : ""}">${task.name}</p>
            <button data-index="${index}", data-type="status">Статус</button>
            <button data-index="${index}", data-type="delete">Удалить</button>
        </il>`
    )
}


AddButElem.onclick = function () {
    const taskName = TaskNameElem.value

    if (taskName === "") return
    array.push({name: taskName, status: false})

    render()
}


TaskListElem.onclick = function (e) {
    const index = e.target.dataset.index
    const type = e.target.dataset.type

    if (!index || !type) return

    if (type === "status") {
        array[index].status = !array[index].status
    }

    if (type === "delete") {
        array.splice(index, 1)
    }

    render()


}

render()



