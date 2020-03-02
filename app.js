// Форма
// Список задач
const tasks = [{
        _id: "5d2ca9e2e03d40b326596aa7",
        completed: true,
        body: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
        title: "Eu ea incididunt sunt consectetur fugiat non."
    },
    {
        _id: "5d2ca9e29c8a94095c1288e0",
        completed: false,
        body: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
        title: "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
    },
    {
        _id: "5d2ca9e2e03d40b3232496aa7",
        completed: true,
        body: "Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n",
        title: "Eu ea incididunt sunt consectetur fugiat non."
    },
    {
        _id: "5d2ca9e29c8a94095564788e0",
        completed: false,
        body: "Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n",
        title: "Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum."
    }
];

(function(arrOfTasks) {
    const objOfTasks = arrOfTasks.reduce((acc, task) => {
        acc[task._id] = task;
        return acc;
    }, {});
    const themes = {
        default: {
            "--base-text-color": "#212529",
            "--header-bg": "#007bff",
            "--header-text-color": "#fff",
            "--default-btn-bg": "#007bff",
            "--default-btn-text-color": "#fff",
            "--default-btn-hover-bg": "#0069d9",
            "--default-btn-border-color": "#0069d9",
            "--danger-btn-bg": "#dc3545",
            "--danger-btn-text-color": "#fff",
            "--danger-btn-hover-bg": "#bd2130",
            "--danger-btn-border-color": "#dc3545",
            "--input-border-color": "#ced4da",
            "--input-bg-color": "#fff",
            "--input-text-color": "#495057",
            "--input-focus-bg-color": "#fff",
            "--input-focus-text-color": "#495057",
            "--input-focus-border-color": "#80bdff",
            "--input-focus-box-shadow": "0 0 0 0.2rem rgba(0, 123, 255, 0.25)"
        },
        dark: {
            "--base-text-color": "#212529",
            "--header-bg": "#343a40",
            "--header-text-color": "#fff",
            "--default-btn-bg": "#58616b",
            "--default-btn-text-color": "#fff",
            "--default-btn-hover-bg": "#292d31",
            "--default-btn-border-color": "#343a40",
            "--default-btn-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
            "--danger-btn-bg": "#b52d3a",
            "--danger-btn-text-color": "#fff",
            "--danger-btn-hover-bg": "#88222c",
            "--danger-btn-border-color": "#88222c",
            "--input-border-color": "#ced4da",
            "--input-bg-color": "#fff",
            "--input-text-color": "#495057",
            "--input-focus-bg-color": "#fff",
            "--input-focus-text-color": "#495057",
            "--input-focus-border-color": "#78818a",
            "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)"
        },
        light: {
            "--base-text-color": "#212529",
            "--header-bg": "#fff",
            "--header-text-color": "#212529",
            "--default-btn-bg": "#fff",
            "--default-btn-text-color": "#212529",
            "--default-btn-hover-bg": "#e8e7e7",
            "--default-btn-border-color": "#343a40",
            "--default-btn-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
            "--danger-btn-bg": "#f1b5bb",
            "--danger-btn-text-color": "#212529",
            "--danger-btn-hover-bg": "#ef808a",
            "--danger-btn-border-color": "#e2818a",
            "--input-border-color": "#ced4da",
            "--input-bg-color": "#fff",
            "--input-text-color": "#495057",
            "--input-focus-bg-color": "#fff",
            "--input-focus-text-color": "#495057",
            "--input-focus-border-color": "#78818a",
            "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)"
        }
    };

    // Elemnts UI
    const listContainer = document.querySelector(
        ".tasks-list-section .list-group"
    );
    const form = document.forms["addTask"]; // нашли DOM-элементы формы
    const inputTitle = form.elements["title"];
    const inputBody = form.elements["body"];

    // Events
    renderAllTasks(objOfTasks); //функция которая на вход получает объкт тасков
    form.addEventListener("submit", onFormSubmitHandler); // на форму повесили обработчик событий
    listContainer.addEventListener("click", onDeletehandler); // повесили обработчик события на весь список в котором геерируется наши задачи

    function renderAllTasks(tasksList) {
        if (!tasksList) {
            console.error("Передайте список задач!"); // проверяет что передан task или нет
            return;
        }

        const fragment = document.createDocumentFragment(); // фрагмент будущего списка с задачами, для того чтобы не добавлять задачи по одной, не вызывая перересовку DOM-a
        Object.values(tasksList).forEach(task => {
            const li = listItemTemplate(task);
            fragment.appendChild(li); //перебераем список тасков, такс передаем в функцию listItemTemplate
        });
        listContainer.appendChild(fragment);
    }

    function listItemTemplate({ _id, title, body } = {}) {
        const li = document.createElement("li");
        li.classList.add(
            "list-group-item",
            "d-flex",
            "align-items-center",
            "flex-wrap",
            "mt-2"
        ); // функция, которая занимается генерацией одного элемента списка, основываясь на нашей задаче которую сюда передали
        li.setAttribute("data-task-id", _id); //мы добавили атрибут при генерации на каждый элемент чтобы потом определить какой конкретный элемент хотим удалить из ДОМа и какой элемент из списка со всеми тасками

        const span = document.createElement("span");
        span.textContent = title;
        span.style.fontWeight = "bold";

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete task";
        deleteBtn.classList.add("btn", "btn-danger", "ml-auto", "delete-btn");

        const article = document.createElement("p");
        article.textContent = body;
        article.classList.add("mt-2", "w-100");

        li.appendChild(span);
        li.appendChild(deleteBtn);
        li.appendChild(article);

        return li;
    } // эту функцию будем вызывать на каждой итерации внутри функции renderAllTasks

    function onFormSubmitHandler(e) {
        e.preventDefault();
        const titleValue = inputTitle.value; // забрали значение title и body
        const bodyValue = inputBody.value;

        if (!titleValue || !bodyValue) {
            alert("Пожалуйста введите title и body"); // проверки есть ли эти значения
            return;
        }

        const task = createNewTask(titleValue, bodyValue); // копию этойо новой задачи мы получаем в task
        const listItem = listItemTemplate(task); // на следующем шаге создаем DOM-объект, шаблон нашего элемента списка на основе вновь созданнйо таски
        listContainer.insertAdjacentElement("afterbegin", listItem); // добавляем с помощью метода insertAdjacentElement в самое начало списка задач
        form.reset(); // сбрасываем форму
    } //функция добавления одной таски в список задач

    function createNewTask(title, body) {
        //функция создает один объект задачи с title,body,_id
        const newTask = {
            title,
            body,
            completed: false,
            _id: `task-${Math.random()}`
        };

        objOfTasks[newTask._id] = newTask; //добавляем задачу в список всех тасков

        return {...newTask }; // возвращаем копию этой новой задачи
    }

    function deleteTask(id) {
        const { title } = objOfTasks[id]; // функция принимает id, вытягивает title для будущего вывода в окне confirm
        const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}`);
        if (!isConfirm) return isConfirm; // если ответили отменой, то возвращаем статус isConfirm-false
        delete objOfTasks[id]; // если ответили да, то возвращаем статус isConfirm-true
        return isConfirm;
    }

    function deleteTaskFromHtml(confirmed, el) {
        if (!confirmed) return;
        el.remove();
    }

    function onDeletehandler({ target }) {
        if (target.classList.contains("delete-btn")) {
            // при клике на весь список мы определяем на кого произошел клик и это кнопка delete-btn
            const parent = target.closest("[data-task-id]"); // то тогда мы находим родителя по атрибиуту data-task-id
            const id = parent.dataset.taskId; // забираем id
            const confirmed = deleteTask(id); // передаем id в deleteTask
            deleteTaskFromHtml(confirmed, parent); // передаем сам элемент который хотим удалить и подветрждение удаления
        }
    }
})(tasks);