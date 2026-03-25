const fs = require('fs');
const html = fs.readFileSync('zo_system_private.html.html', 'utf8');

const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;

window.firebase = {
    initializeApp: () => ({}),
    firestore: () => ({
        collection: () => ({
            where: () => ({
                where: () => ({
                    get: () => Promise.resolve({ empty: true })
                })
            }),
            get: () => Promise.resolve({ empty: true })
        }),
        settings: () => {}
    })
};

// Mock bootstrap
window.bootstrap = {
    Offcanvas: class {
        constructor(el) { this.el = el; }
        show() { console.log("Offcanvas shown for", this.el.id); }
    },
    Modal: class {
        constructor(el) { this.el = el; }
        show() { console.log("Modal shown"); }
    }
};

try {
    window.procList = [];
    window.openProcSidebar();
    console.log("SUCCESS!");
} catch (e) {
    console.error("Error executing openProcSidebar:", e);
}
