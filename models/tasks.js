import colors from "colors";

import Task from "./task.js";

class Tasks {

    _list = {};

    constructor() {
        this._list = {};
    }

    get listArr() {
        const list = [];

        for (const key in this._list) {
            list.push(this._list[key]);
        }
        return list;
    }

    loadTaskFromArrays = (tasks = []) => {
        for (const task of tasks) {
            this._list[task.id] = task;
        }
    }

    createTask(desc) {
        const task = new Task(desc);
        this._list[task.id] = task;
    }

    deleteTask(id = '') {
        if (this._list[id]) {
            delete this._list[id];
        }
    }

    listTasks = () => {
        let index = 1;
        console.log();

        for (const task of this.listArr) {
            const { completedIn, desc } = task;

            (completedIn === null)
                ? console.log(`${`${index}`.red}. ${desc} :: ${'Pendiente'.red}`)
                : console.log(`${`${index}`.green}. ${desc} :: ${'Completado'.green}`);

            index++
        }
    }

    listCompletedTasks(completed = true) {

        const tasks = this.listArr.filter((task) =>
            (completed && task.completedIn !== null) ||
            (!completed && task.completedIn === null)
        );

        tasks.forEach((task, index) => {
            const { completedIn, desc } = task;

            const status = completedIn === null ? 'Pendiente' : completedIn;
            const color = completedIn === null ? 'red' : 'green';

            console.log(`${`${index + 1}`[color]}. ${desc} :: ${status[color]}`);
        });
    }


    toggleTasksCompleted = (ids = []) => {
        this.listArr.forEach((task) => {
            const { id } = task;
            task.completedIn = ids.includes(id) ? (task.completedIn ?? new Date().toISOString()) : null;
        });
    }

}


export default Tasks;