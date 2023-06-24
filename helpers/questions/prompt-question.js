
export const promptQuestion = (message) => {

    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) return 'Por favor ingrese una descripción';
            return true;
        }
    }];

    return question;
}