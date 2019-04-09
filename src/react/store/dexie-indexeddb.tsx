import Dexie from 'dexie'

const opener = new Dexie("opener");

opener.version(1).stores({
    history: 'id++, title, timestamp' 
});

export default opener