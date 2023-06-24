import inquirer from 'inquirer';
import colors from 'colors';

import { menuQuestions } from './questions/menu-question.js';
import { pauseMenu } from './questions/pause-menu-question.js';
import { promptQuestion } from './questions/prompt-question.js';

export const inquirerMenu = async () => {

    console.clear();
    titleConsoleMenu();

    const { optionMenu } = await inquirer.prompt(menuQuestions);

    return optionMenu;
}

export const pauseConsole = async () => {
    console.log('\n');
    await inquirer.prompt(pauseMenu);
}

const titleConsoleMenu = () => {
    console.log('==================================='.green);
    console.log('       Seleccione una opción');
    console.log('===================================\n'.green);
}

export const showMessagePrompt = async (message) => {

    const question = promptQuestion(message);

    const { desc } = await inquirer.prompt(question);

    return desc;
}


export const tasksListToDelete = async (tasks = []) => {

    const choices = tasks.map((task, index) => {
        return {
            value: task.id,
            name: `${`${index + 1}`['green']}. ${task.desc}`,
        }
    });

    choices.unshift({
        value: '0',
        name: `${'0'.green} Salir`,
    });

    const deleteTaskQuestion = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar Tarea:',
            choices,
        }
    ];

    const { id } = await inquirer.prompt(deleteTaskQuestion);
    return id;
}

export const messageConfirm = async (message = '') => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}


export const showCheckList = async (tasks = []) => {

    const choices = tasks.map((task, index) => {
        return {
            value: task.id,
            name: `${`${index + 1}`['green']}. ${task.desc}`,
            checked: (task.completedIn) ? true : false,
        }
    });


    const completeTaskQuestion = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Completar Tarea(s):',
            choices,
        }
    ];

    const { ids } = await inquirer.prompt(completeTaskQuestion);
    return ids;
}