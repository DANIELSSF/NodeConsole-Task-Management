import fs from 'fs';

const path = './db/database.json';

export const saveFiles = (data) => {
    fs.writeFileSync(path, JSON.stringify(data));
}


export const readDB = () => {

    if (!fs.existsSync) return;

    const info = fs.readFileSync(path, { encoding: 'utf-8' });
    const data = JSON.parse(info);

    return data;

}