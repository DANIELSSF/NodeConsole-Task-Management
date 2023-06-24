require('colors');

const menuConsole = async () => {
    console.clear();
    showMenu();

    const optionConsole = await readLineConsole();

    return optionConsole;

}

const showMenu = () => {
    console.log('==================================='.green);
    console.log('       Seleccione una opción'.green);
    console.log('===================================\n'.green);

    console.log(`${'1.'.green} Crear tareas`);
    console.log(`${'2.'.green} Listar tareas`);
    console.log(`${'3.'.green} Listar tareas completadas`);
    console.log(`${'4.'.green} Listar tareas pendientes`);
    console.log(`${'5.'.green} Completar tarea(s)`);
    console.log(`${'6.'.green} Borrar tarea(s)`);
    console.log(`${'0.'.green} Salir`);
}

const readLineConsole = () => {

    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });


        readline.question('\nSeleccione una opción:\n', (opt) => {
            readline.close();
            resolve(opt);
        });
    })

};

const pauseConsole = () => {

    return new Promise((resolve) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        readline.question(`\nPresione ${'enter'.green} para continuar.\n`, (opt) => {
            readline.close();
            resolve();
        });

    })

};

module.exports = {
    menuConsole,
    pauseConsole
}