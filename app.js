import colors from 'colors';

import {
    inquirerMenu,
    messageConfirm,
    pauseConsole,
    showCheckList,
    showMessagePrompt,
    tasksListToDelete
} from './helpers/inquirer.js';

import Tasks from './models/tasks.js';
import { readDB, saveFiles } from './helpers/save-files.js';

console.clear();

const main = async () => {

    let opt = '';
    const tasks = new Tasks();
    const tasksDB = readDB();

    if (tasksDB) {
        tasks.loadTaskFromArrays(tasksDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await showMessagePrompt('Descripción');
                tasks.createTask(desc);
                break;
            case '2':
                tasks.listTasks();
                break;
            case '3':
                tasks.listCompletedTasks(true);
                break;
            case '4':
                tasks.listCompletedTasks(false);
                break;
            case '5':
                const ids = await showCheckList(tasks.listArr);
                tasks.toggleTasksCompleted(ids);
                break;

            case '6':
                const id = await tasksListToDelete(tasks.listArr);
                if (id !== '0') {
                    const confirmDelete = await messageConfirm('¿Estás Seguro?');
                    if (confirmDelete) {
                        tasks.deleteTask(id);
                        console.log('Tarea Borrada');
                    }
                }
                break;
        }

        saveFiles(tasks.listArr);

        await pauseConsole();

    } while (opt !== '0');

}

main();