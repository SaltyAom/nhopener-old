import Dexie from 'dexie'

const openerIDB = new Dexie("opener");

Dexie.exists("opener").then(async (exists:boolean) => {
    await openerIDB.version(1).stores({
        history: 'id++, title, link, timestamp',
        settings: 'title, value',
    });
    await openerIDB.version(2).stores({
        history: 'id++, title, link, timestamp, ref',
        settings: 'title, value',
    });
    if(!exists){
        openerIDB.table("settings").put({
            title: "blurDashboard",
            value: false
        });
        openerIDB.table("settings").put({
            title: "blurPreview",
            value: false
        });
        openerIDB.table("settings").put({
            title: "blurSearchResult",
            value: false
        });
        openerIDB.table("settings").put({
            title: "dontSaveHistory",
            value: false
        });
        openerIDB.table("settings").put({
            title: "visitState",
            value: Date.now()
        });
        openerIDB.table("settings").put({
            title: "suggestedStoriesID",
            value: Math.floor(Math.random() * (229345 - 1)) + 1
        });
        openerIDB.table("settings").put({
            title: "suggestedStories",
            value: []
        });
    }
});


export default openerIDB