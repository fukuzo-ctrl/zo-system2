const fs = require('fs');
const html = fs.readFileSync('zo_system_private.html.html', 'utf8');
const { JSDOM } = require('jsdom');
const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;

window.bootstrap = {
    Offcanvas: class {
        constructor(el) { this.el = el; }
        show() {}
        static getInstance(el) { return null; } // simulate null
    }
};

try {
    window.procList = [];
    window.addProcFromSidebar = function addProcFromSidebar() {
        // dummy values
        window.document.getElementById('m_area').innerHTML = '<option value="A">A</option>';
        window.document.getElementById('m_area').value = 'A';
        window.document.getElementById('m_pos').innerHTML = '<option value="P">P</option>';
        window.document.getElementById('m_pos').value = 'P';
        window.document.getElementById('m_method').innerHTML = '<option value="M">M</option>';
        window.document.getElementById('m_method').value = 'M';
        
        const a = window.document.getElementById('m_area').value;
        const p = window.document.getElementById('m_pos').value;
        const m = window.document.getElementById('m_method').value;
        const c = window.document.getElementById('m_count').value;
        
        if (!a || !p || !m) { console.log("Missing"); return; }
        
        let cd = "";
        window.document.querySelectorAll('.m-color-input').forEach(i => {
            if (i.value) cd += (i.dataset.bodyColor ? i.dataset.bodyColor + '➜' : '') + i.value + " "
        });
        
        window.procList.push({ area: a, pos: p, method: m, count: c, color: cd });
        console.log("procList:", window.procList);
        
        window.bootstrap.Offcanvas.getInstance(window.document.getElementById('procOffcanvas')).hide();
    };
    
    window.updateRightPanel = () => { console.log("updateRightPanel called"); };
    
    window.addProcFromSidebar();
} catch (e) {
    console.error("Error executing addProcFromSidebar:", e);
}
