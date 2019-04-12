import Dexie from 'dexie'

const openerIDB = new Dexie("opener");

Dexie.exists("opener").then(async (exists:boolean) => {
    await openerIDB.version(1).stores({
        history: 'id++, title, timestamp',
        settings: 'title, value'
    });
    if(!exists){
        openerIDB.table("settings").put({
            title: "blurDashboard",
            vale: false
        })
    }
});


export default openerIDB