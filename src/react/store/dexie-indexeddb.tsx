import Dexie from 'dexie'

const openerIDB = new Dexie("opener");

openerIDB.version(1).stores({
    history: 'id++, title, timestamp',
    settings: 'title, value'
});

export default openerIDB