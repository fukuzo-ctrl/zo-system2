// ==========================================
// ★1. 商品マスタ
// ==========================================
let itemMasterData = [
{ "品番": "00083-BBT", "商品名": "トムスTシャツ 4.0オンス ライトウェイトTシャツ", "サイズ(カンマ区切り)": "150,160,S,M,L,XL,XXL", "カラー(カンマ区切り)": "ホワイト,杢グレー,ブラック,レッド,ピンク,パープル,オレンジ,イエロー,グリーン,ネイビー,ロイヤルブルー,ターコイズ,バーガンディ,オリーブ,ライトブルー,ホットピンク,デイジー,ライトパープル,ピーチ,ブライトグリーン" },
{ "品番": "00085-CVT", "商品名": "トムスTシャツ 5.6オンス ヘビーウェイトTシャツ", "サイズ(カンマ区切り)": "100,110,120,130,140,150,160,XS,S,M,WM,L,WL,XL,XXL,XXXL,4XL,5XL", "カラー(カンマ区切り)": "ホワイト,杢グレー,ブラック,レッド,ピンク,パープル,オレンジ,イエロー,ライトグリーン,グリーン,ネイビー,ロイヤルブルー,ターコイズ,ガーネットレッド,アーミーグリーン,サンセットオレンジ,オートミール,アッシュ,アイボリー,ゴールドイエロー,アクア,インディゴ,ナチュラル,デニム,バーガンディ,オリーブ,チャコール,フォレスト,ライトピンク,ライトブルー,ライトイエロー,サファリ,アイビーグリーン,ソルト,ホットピンク,セメント,シルバーグレー,ライム,デイジー,メトロブルー,イタリアンレッド,ジャパンブルー,ライトパープル,ブライトグリーン,アイスグリーン,ミント,ミディアムブルー,シーブルー,スモークブラック,コヨーテ,ダスティピンク,ライトセージ,アシッドブルー,ラベンダーミスト,ダークブラウン,ライトベージュ,ダスティブルー,ホワイト×ブラック,ホワイト×レッド,ホワイト×ネイビー" },
{ "品番": "00300-ACT", "商品名": "glimmerTシャツ 4.4オンス ドライTシャツ", "サイズ(カンマ区切り)": "100,110,120,130,140,150,SS,S,M,WM,L,WL,LL,3L,4L,5L,6L,7L", "カラー(カンマ区切り)": "ホワイト,グレー,ブラック,レッド,ピンク,パープル,オレンジ,ラベンダー,イエロー,ライトグリーン,グリーン,ミントグリーン,メロン,ネイビー,ロイヤルブルー,サックス,ターコイズ,ガーネットレッド,アーミーグリーン,サンセットオレンジ,蛍光イエロー,蛍光オレンジ,蛍光ピンク,ミントブルー,インディゴ,バーガンディ,オリーブ,ライトピンク,ライトブルー,ライトイエロー,アイビーグリーン,ホットピンク,シルバーグレー,ライム,デイジー,メトロブルー,ジャパンブルー,ダークグレー,ブライトグリーン,ミディアムブルー,コヨーテ,ライトベージュ,イエロー×グリーン,ガーネットレッド×ブラック,ブラック×ターコイズ,ホワイト×ロイヤルブルー,ロイヤルブルー×ブラック,ミックスグレー,ミックスブルー,ミックスレッド,ミックスピンク,ミックスパープル" }
].map(item => {
    let cat = "その他";
    const name = item['商品名'];
    if (name.includes("Tシャツ")) cat = "Tシャツ";
    else if (name.includes("ポロ")) cat = "ポロシャツ";
    else if (name.includes("ビブス")) cat = "ビブス";
    else if (name.includes("スウェット") || name.includes("トレーナー")) cat = "スウェット";
    else if (name.includes("パーカー")) cat = "パーカー";
    else if (name.includes("パンツ")) cat = "パンツ";
    else if (name.includes("コート") || name.includes("ジャケット") || name.includes("ブルゾン") || name.includes("ベスト")) cat = "アウター";
    else if (name.includes("バッグ") || name.includes("トート")) cat = "バッグ";
    else if (name.includes("キャップ")) cat = "CAP";
    item['カテゴリ'] = cat;
    return item;
});

// ==========================================
// ★2. 顧客・担当者マスタ
// ==========================================
let customerData = [
  { id: "1001", customer: "GOOスポーツ", manager: "大海", pdf: "https://drive.google.com/drive/folders/1rhnh-9jQbrj4KbrK-nSZlDU1_55ST4WT", pass: "pass1234" },
  { id: "1002", customer: "GOOスポーツ", manager: "二木", pdf: "https://drive.google.com/drive/folders/1rhnh-9jQbrj4KbrK-nSZlDU1_55ST4WT", pass: "pass1235" },
  { id: "admin", customer: "ZO SYSTEM", manager: "管理者", pdf: "", pass: "admin9999", isAdmin: true }
];

// --- グローバル変数 ---
let procList = [];    
let playerList = [];  
let productList = []; 

let selectedModalItem = null;
let dataFolderUrl = ""; 

const SIZE_LIST = ["130","140","150","S","M","L","O","XO","2XO","3XO"];
const SPORTS = ["野球", "サッカー", "バレー", "バスケ", "陸上", "ハンドボール", "ラグビー", "卓球", "その他"];
const STD_COLORS = ["ホワイト", "ブラック", "ネイビー", "レッド", "ロイヤルブルー", "イエロー", "グリーン", "ゴールド", "シルバー", "蛍光イエロー", "蛍光ピンク"];

const PRODUCTS_BASEBALL = ["ユニフォームシャツ", "ユニフォームパンツ", "キャップ", "アンダーシャツ", "ベルト", "ソックス", "ストッキング", "ヘルメット", "Vジャン", "グランドコート", "その他"];
const PRODUCTS_COMMON = ["Tシャツ", "ポロシャツ", "パーカー", "スウェット", "ジャージ", "ピステ", "ビブス", "バッグ", "タオル", "ハーフパンツ", "ロングパンツ", "アウター", "キャップ", "その他"];

const PROC_AREAS = {"シャツ前面": ["全胸", "左胸", "右胸","胸番号", "ポケット内", "前裾下_右", "前裾下_左"],"シャツ後面": ["全背", "背番号","背中_襟下", "背中_裾下", "背中_襟下_右", "背中_襟下_左", "背中_腰下"], "袖": ["左袖", "右袖","左袖番", "右袖番"], "ハーフパンツ": ["左前", "右前","左前番", "右前番", "左後ろ", "右後ろ", "左サイド", "右サイド", "左腰", "右腰"],"ロングパンツ": ["左前", "右前","左前番", "右前番", "左後ろ", "右後ろ", "左サイド", "右サイド", "左腰", "右腰"],"CAP": ["前面", "左サイド", "右サイド", "後","左サイド番", "右サイド番", "後番号"],"ヘルメット": ["前面", "左サイド", "右サイド", "後"],"その他": []};
const PROC_CATS = {"圧着加工": ["A転写", "ラバー", "D昇華", "CAM", "切りマーク", "昇華ワッペン", "シール"],"シルクプリント": ["プリント", "水性プリント"],"刺繍": ["直刺繍", "2重直刺繍", "3重直刺繍", "ウレタン入刺繍", "フチドリ刺繍", "Wフチドリ刺繍", "個人名刺繍"]};

// ★GAS URL
const GAS_URL = "https://script.google.com/macros/s/AKfycbwmsQZX1FriGFDQ7808H2y3YdatLLws5G50lEU0gUXw-du2SOdEexahwHBE35wdl8aMKw/exec";

// --- Firebase ---
const firebaseConfig = { apiKey: "AIzaSyALhaQtGangXuyhBI97aUttdO0lLscWMgQ", authDomain: "order-system-ddd6c.firebaseapp.com", projectId: "order-system-ddd6c", storageBucket: "order-system-ddd6c.firebasestorage.app", messagingSenderId: "668688430410", appId: "1:668688430410:web:b51d6c2fe31680cb46bdb3" };
try { firebase.initializeApp(firebaseConfig); } catch(e){}
const db = firebase.firestore();

function generateId() {
  const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let r = ""; for(let i=0; i<8; i++) r += c[Math.floor(Math.random()*c.length)];
  return r;
}

function setText(id, val) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') el.value = val;
    else el.innerText = val;
}
function getText(id) {
    const el = document.getElementById(id);
    if (!el) return "";
    if (el.tagName === 'INPUT' || el.tagName === 'SELECT' || el.tagName === 'TEXTAREA') return el.value;
    else return el.innerText;
}

// ==========================================
// ★ログイン処理（修正：背景色変更ロジック）
// ==========================================
function handleLogin() {
  const i = document.getElementById('loginId').value;
  const p = document.getElementById('loginPass').value;
  const u = customerData.find(x => x.id === i && x.pass === p);
  
  if (u) {
    document.getElementById('loginModal').style.display = 'none';
    window.currentUser = u;

    const mainTitle = document.getElementById('mainTitle');
    const subTitle = document.getElementById('systemSubtitle');
    const sidebarEl = document.getElementById('sidebarContainer');
    const custInput = document.getElementById('customerName');
    const mgrInput = document.getElementById('managerName');
    const backBtn = document.getElementById('adminReturnBtn');

    if (u.isAdmin) {
        // ★管理者用の背景色（青）
        document.body.classList.add('admin-mode');
        document.body.style.setProperty('background-color', '#dbeafe', 'important'); // 強制的に青

        if(mainTitle) mainTitle.style.color = "#0d6efd";
        if(subTitle) { subTitle.innerText = "管理者モード"; subTitle.style.color = "#0d6efd"; }
        if(sidebarEl) sidebarEl.style.backgroundColor = "#0d6efd";
        if(custInput) { custInput.readOnly = false; custInput.value = ""; custInput.placeholder = "顧客名を入力"; custInput.style.backgroundColor = "#fff"; custInput.style.border = "1px solid #ccc"; }
        if(mgrInput) { mgrInput.readOnly = false; mgrInput.value = ""; mgrInput.placeholder = "担当者を入力"; mgrInput.style.backgroundColor = "#fff"; mgrInput.style.border = "1px solid #ccc"; }
        
        showScreen('dashboardScreen');
        loadDashboard();
        return;
    }

    // ★顧客用の背景色（標準）
    document.body.classList.remove('admin-mode');
    document.body.style.setProperty('background-color', '#ebf0f5', 'important'); // 強制的にグレー

    if(mainTitle) mainTitle.style.color = "#333";
    if(subTitle) { subTitle.innerText = "Order Management System"; subTitle.style.color = "#6c757d"; }
    if(sidebarEl) sidebarEl.style.backgroundColor = "#2c3e50";
    if(custInput) { custInput.readOnly = true; custInput.value = u.customer; custInput.style.backgroundColor = "transparent"; custInput.style.border = "none"; }
    if(mgrInput) { mgrInput.readOnly = true; mgrInput.value = u.manager; mgrInput.style.backgroundColor = "transparent"; mgrInput.style.border = "none"; }
    if(backBtn) backBtn.style.display = 'none';

    dataFolderUrl = u.pdf;
    setText('orderId', generateId());
    document.getElementById('orderDate').valueAsDate = new Date();
    updateDeliveryDate(); 
    showScreen('menuScreen');

  } else { 
      document.getElementById('loginMsg').innerText = "ID/PWが違います"; 
  }
}

function goToAdminMenu() {
    showScreen('menuScreen');
    const btn = document.getElementById('adminReturnBtn');
    if(btn) btn.style.display = 'block';
}

function openNewForm() {
    showScreen('formScreen');
    const u = window.currentUser;
    if (u && u.isAdmin) {
        document.getElementById('customerName').value = "";
        document.getElementById('managerName').value = "";
    } else if (u) {
        document.getElementById('customerName').value = u.customer;
        document.getElementById('managerName').value = u.manager;
    }
    document.getElementById('teamName').value = "";
    setText('orderId', generateId());
    document.getElementById('orderDate').valueAsDate = new Date();
    updateDeliveryDate();
    productList = [];
    renderProductList();
    
    // ★追加: プレビューボタンのリセット
    const pb = document.getElementById('previewBtn');
    if(pb) { pb.disabled = false; pb.innerHTML = '<i class="fas fa-file-pdf me-2"></i>PDF作成・確認'; }
}

document.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('orderDate')) {
      document.getElementById('orderDate').valueAsDate = new Date();
      updateDeliveryDate();
  }
  const s = document.getElementById('sportType');
  if(s) { s.innerHTML='<option value="">選択</option>'; SPORTS.forEach(x=>s.appendChild(new Option(x,x))); }
  
  updateProductList();
  initProcModalDropdowns();
  handleProductChange();
  initCalendar(); // カレンダー初期化
});

// ==========================================
// ★日付・納期チェック
// ==========================================
function calculateWorkday(s, d) {
    let dt = new Date(s);
    let c = 0;
    while(c < d) {
        dt.setDate(dt.getDate()+1);
        if(dt.getDay()!==0 && dt.getDay()!==6) c++;
    }
    return dt;
}

function updateDeliveryDate() {
    const el = document.getElementById('orderDate');
    if(!el || !el.value) return;
    const ld = calculateWorkday(el.value, 11);
    const de = document.getElementById('deliveryDate');
    const y = ld.getFullYear();
    const m = ("0" + (ld.getMonth() + 1)).slice(-2);
    const d = ("0" + ld.getDate()).slice(-2);
    if(de) {
        de.value = `${y}-${m}-${d}`;
        checkDeliveryDate(); 
    }
}

function checkDeliveryDate() {
    const oVal = document.getElementById('orderDate').value;
    const dVal = document.getElementById('deliveryDate').value;
    const dEl = document.getElementById('deliveryDate'); 
    const wEl = document.getElementById('deliveryWarning'); 

    if(!oVal || !dVal || !dEl) return;

    const minDate = calculateWorkday(oVal, 11);
    const selDate = new Date(dVal);
    minDate.setHours(0,0,0,0);
    selDate.setHours(0,0,0,0);

    if (selDate < minDate) {
        dEl.style.backgroundColor = '#dc3545';
        dEl.style.color = '#ffffff';
        dEl.style.fontWeight = 'bold';
        if(wEl) {
            wEl.style.display = 'block';
            wEl.innerHTML = 'UPチャージ　担当者に確認';
            wEl.style.color = '#dc3545'; 
            wEl.className = "fw-bold small text-end mt-1";
        }
    } else {
        dEl.style.backgroundColor = '#fff';
        dEl.style.color = '#495057';
        dEl.style.fontWeight = 'normal';
        if(wEl) wEl.style.display = 'none';
    }
}

function updateProductList() { 
    const v = document.getElementById('sportType') ? document.getElementById('sportType').value : "";
    const p = document.getElementById('productCategory');
    if(!p) return;
    p.innerHTML = '<option value="">選択</option>';
    let l = (v==="野球") ? PRODUCTS_BASEBALL : (v && v!=="選択" ? PRODUCTS_COMMON : [...new Set(itemMasterData.map(i=>i['カテゴリ']))].sort());
    l.forEach(x => { if(x) p.appendChild(new Option(x, x)); });
}

function handleProductChange() {
    const v = document.getElementById('productContent').value;
    const det = document.getElementById('productContentDetail');
    if(det) det.value = v;
    const zoArea = document.getElementById('zoAddArea');
    const biArea = document.getElementById('bringInInputArea');
    if (v === "持ち込み") {
        if(zoArea) zoArea.style.display = "none";
        if(biArea) biArea.style.display = "block";
    } else {
        if(zoArea) zoArea.style.display = "inline";
        if(biArea) biArea.style.display = "none";
    }
}

// ==========================================
// ★持ち込み商品
// ==========================================
function addBringInProduct() {
    const name = document.getElementById('bi_name').value;
    const color = document.getElementById('bi_color').value;
    if (!name || !color) { alert("品番・商品名とカラーを入力してください"); return; }
    const sizeSelects = document.querySelectorAll('.bi-size-sel');
    const qtyInputs = document.querySelectorAll('.bi-qty-in');
    const quantities = {};
    let hasQty = false;
    sizeSelects.forEach((sel, i) => {
        const size = sel.value;
        const qty = parseInt(qtyInputs[i].value);
        if (size && size !== "" && size !== "選択" && qty > 0) {
            if (quantities[size]) quantities[size] += qty;
            else quantities[size] = qty;
            hasQty = true;
        }
    });
    if (!hasQty) { alert("少なくとも1つのサイズと数量を入力してください"); return; }
    productList.push({ no: name, name: "(持ち込み)", color: color, quantities: quantities });
    renderProductList();
    clearBringInInputs();
}

function clearBringInInputs() {
    document.getElementById('bi_name').value = "";
    document.getElementById('bi_color').value = "";
    document.querySelectorAll('.bi-size-sel').forEach(el => el.value = "");
    document.querySelectorAll('.bi-qty-in').forEach(el => el.value = "");
}

// ==========================================
// ★リスト描画
// ==========================================
function renderProductList() {
    const area = document.getElementById('productListDisplay');
    const totalEl = document.getElementById('totalQty');
    if(!area) return;
    if(productList.length === 0) { area.innerHTML = ''; if(totalEl) totalEl.innerText = 0; return; }
    let html = '';
    let grandTotal = 0;
    productList.forEach((prod, idx) => {
        let details = [];
        let subTotal = 0;
        Object.keys(prod.quantities).forEach(sz => { const q = prod.quantities[sz]; details.push(`${sz}/${q}`); subTotal += q; });
        grandTotal += subTotal;
        html += `
        <div class="product-item" style="padding: 10px 15px; position: relative; border: 1px solid #ddd; background: #fff; border-radius: 4px; box-shadow: 0 2px 5px rgba(0,0,0,0.05);">
            <div style="font-weight: bold; font-size: 0.95rem; margin-bottom: 5px; color: #333;">
                <span style="background:#2c3e50; color:#fff; padding:2px 8px; font-size:0.75rem; border-radius:3px; margin-right:5px;">${idx+1}</span>
                <span style="margin-right:10px;">品番 <span style="color:#000;">${prod.no}</span></span>
                <span style="font-size: 0.9rem; color: #555;">${prod.name}</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px dashed #eee; padding-top: 5px; font-size: 0.9rem;">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="font-weight:bold; color:#dc3545;"><i class="fas fa-palette me-1 text-muted" style="font-size:0.8rem;"></i>${prod.color}</span>
                    <span style="color:#333; font-family: monospace; font-weight:bold;">${details.join('　')}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="font-weight:bold; font-size:0.9rem;">小計 <span style="font-size:1.1rem;">${subTotal}</span></span>
                    <i class="fas fa-trash-alt text-danger" style="cursor:pointer;" onclick="removeProduct(${idx})" title="削除"></i>
                </div>
            </div>
        </div>`;
    });
    area.innerHTML = html;
    if(totalEl) totalEl.innerText = grandTotal;
}

function removeProduct(idx) {
    if(confirm("この商品をリストから削除しますか？")) {
        productList.splice(idx, 1);
        renderProductList();
    }
}

// ==========================================
// ★ZO商品追加
// ==========================================
function openSearchModal(btn) { 
    new bootstrap.Modal(document.getElementById('itemSearchModal')).show(); 
    document.getElementById('modalInputArea').innerHTML = '<p class="text-muted text-center mt-5">← 左のリストから商品を選択してください</p>';
    document.getElementById('selectedItemTitle').innerText = "";
    selectedModalItem = null;
    rml(itemMasterData); 
}
function filterModalItems() {
  const val = document.getElementById('modalSearchInput').value.toLowerCase();
  const filtered = itemMasterData.filter(i => (i['品番'] && i['品番'].toLowerCase().includes(val)) || (i['商品名'] && i['商品名'].toLowerCase().includes(val)));
  rml(filtered);
}
function rml(data) { document.getElementById('modalItemListContainer').innerHTML = data.map(i => `<div class="p-2 border-bottom pointer modal-item-row" onclick='smi(${itemMasterData.indexOf(i)}, this)'><strong>${i['品番']}</strong> <span class="badge bg-secondary ms-1">${i['カテゴリ']||''}</span><br><small>${i['商品名']}</small></div>`).join(''); }
function smi(idx, el) { 
    selectedModalItem = itemMasterData[idx]; 
    if(!selectedModalItem) return;
    document.querySelectorAll('.modal-item-row').forEach(r => r.style.background = 'none');
    el.style.background = '#e9ecef';
    document.getElementById('selectedItemTitle').innerText = selectedModalItem['商品名']; 
    document.getElementById('modalInputArea').innerHTML = ''; 
    addModalColorRow();
}
function addModalColorRow() {
  if(!selectedModalItem) { alert("先に商品を選択してください"); return; }
  const cs = (selectedModalItem['カラー(カンマ区切り)'] || "").split(',');
  const ss = (selectedModalItem['サイズ(カンマ区切り)'] || "S,M,L,LL").split(',');
  
  let tiles = ss.map(s => `
    <div class="size-tile-item" style="width:60px; margin:2px; border:1px solid #ccc; border-radius:4px; overflow:hidden; background:#fff;">
        <div style="background:#34495e; color:white; font-size:10px; font-weight:bold; text-align:center; padding:1px;">${s.trim()}</div>
        <input type="number" class="modal-qty-in" data-size="${s.trim()}" value="0" min="0" onfocus="this.select()" style="width:100%; border:none; text-align:center; font-weight:bold; font-size:1.1rem; padding:5px 0; outline:none; color:#333;">
    </div>`).join('');
  
  const d = document.createElement('div'); d.className = "color-block border p-2 mb-3 bg-white shadow-sm rounded";
  d.innerHTML = `<div class="d-flex justify-content-between mb-2 align-items-center"><select class="form-select form-select-sm modal-color-select" style="width:70%; border:2px solid #1a4f8b;">${cs.map(c=>`<option>${c.trim()}</option>`).join('')}</select><button class="btn btn-outline-danger btn-sm" onclick="this.closest('.color-block').remove()"><i class="fas fa-trash"></i> 削除</button></div><div style="display:flex; flex-wrap:wrap;">${tiles}</div>`;
  document.getElementById('modalInputArea').appendChild(d);
  setTimeout(() => { d.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 100);
}
function addProductFromModal() {
  if(!selectedModalItem) { alert("商品が選択されていません"); return; }
  let added = false;
  document.querySelectorAll('.color-block').forEach(b => {
    const c = b.querySelector('.modal-color-select').value;
    const qtys = {};
    let hasQty = false;
    b.querySelectorAll('.modal-qty-in').forEach(inp => { const val = parseInt(inp.value); if(val > 0) { qtys[inp.dataset.size] = val; hasQty = true; } });
    if(hasQty) { productList.push({ no: selectedModalItem['品番'], name: selectedModalItem['商品名'], color: c, quantities: qtys }); added = true; }
  });
  if(added) { renderProductList(); bootstrap.Modal.getInstance(document.getElementById('itemSearchModal')).hide(); } 
  else { alert("数量が全て0です"); }
}

// ==========================================
// ★個人リスト表示・切り替え
// ==========================================
function openPlayerModal() {
    const totalQty = parseInt(document.getElementById('totalQty').innerText) || 0;
    if (totalQty === 0) { alert("⚠️ 先に商品を登録して、数量を入力してください。"); return; }
    document.getElementById('modalTotalQty').innerText = totalQty;
    refreshPlayerModalRows(); 
    new bootstrap.Modal(document.getElementById('playerModal')).show();
}

function refreshPlayerModalRows() {
    const modalRows = document.getElementById('modalPlayerRows');
    const isNumVisible = document.getElementById('showNumberField').checked; 
    const headerNum = document.getElementById('header-num'); 
    if(headerNum) headerNum.style.display = isNumVisible ? 'block' : 'none';
    
    modalRows.innerHTML = "";
    let currentIndex = 0;

    productList.forEach(prod => {
        Object.keys(prod.quantities).forEach(size => {
            const qty = prod.quantities[size];
            for(let k=0; k<qty; k++) {
                const saved = playerList[currentIndex] || {};
                const div = document.createElement('div');
                div.className = "d-flex border-bottom p-1 align-items-center bg-white";
                div.innerHTML = `
                    <div style="width:40px;" class="small text-center text-muted">${currentIndex + 1}</div>
                    <div style="width:120px;" class="small text-center fw-bold text-truncate">${size} / ${prod.color || "-"}</div>
                    <div class="p-num-cell" style="width:100px; display:${isNumVisible ? 'block' : 'none'};"><input type="text" class="form-control form-control-sm p-num" value="${saved.num || ''}" placeholder="番号"></div>
                    <div style="flex:1; margin-left:5px;"><input type="text" class="form-control form-control-sm p-name" value="${saved.name || ''}" placeholder="個人名"></div>
                    <div style="flex:1; margin-left:5px;"><input type="text" class="form-control form-control-sm p-note" value="${saved.note || ''}" placeholder="備考"></div>
                `;
                modalRows.appendChild(div);
                currentIndex++;
            }
        });
    });
}

function savePlayerList() {
    playerList = [];
    let count = 0;
    const rows = document.getElementById('modalPlayerRows').querySelectorAll('div.d-flex');
    rows.forEach(row => {
        const numInput = row.querySelector('.p-num');
        const nameInput = row.querySelector('.p-name');
        const noteInput = row.querySelector('.p-note');
        const num = numInput ? numInput.value : "";
        const name = nameInput ? nameInput.value : "";
        const note = noteInput ? noteInput.value : "";
        if(num || name || note) count++;
        playerList.push({ num, name, note });
    });
    const countEl = document.getElementById('displayRegCount');
    if(countEl) countEl.innerText = count;
    const modalEl = document.getElementById('playerModal');
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if(modalInstance) modalInstance.hide();
    alert("✅ リストを保存しました。");
}

// ==========================================
// ★加工詳細・PDF
// ==========================================
function openDataFolder() { 
    if(dataFolderUrl) { window.open(dataFolderUrl, '_blank'); } 
    else { alert("この顧客にはフォルダURLが登録されていません"); }
}
function clearPdf() { 
    document.getElementById('pdfUrlInput').value = ""; 
    document.getElementById('pdfViewer').innerHTML = "PDF"; 
}
function loadPdf() { 
    const u = document.getElementById('pdfUrlInput').value;
    if(!u) return;
    const getId = (url) => { const m = url.match(/folders\/([-\w]+)/)||url.match(/d\/([-\w]+)/)||url.match(/id=([-\w]+)/); return m?(m[1]||m[2]||m[3]):""; };
    const fid = getId(u);
    let src = u;
    if (u.includes('drive.google.com')) src = u.replace(/\/view.*/, '/preview').replace(/\/edit.*/, '/preview');
    document.getElementById('pdfViewer').innerHTML = `<iframe src="${src}" width="100%" height="100%" style="border:none;"></iframe>`;
    if(fid && GAS_URL) {
        document.getElementById('teamName').placeholder = "取得中...";
        fetch(GAS_URL, { method: "POST", body: JSON.stringify({action:"getFileName", fileId:fid}) }).then(r=>r.json()).then(d=>{ if(d.status==="success") document.getElementById('teamName').value=d.fileName; });
    }
    const mu = customerData.find(x => x.pdf && fid === getId(x.pdf));
    if(mu) { setText('customerName', mu.customer); setText('managerName', mu.manager); }
}

function initProcModalDropdowns() {
    const area = document.getElementById('m_area');
    const pos = document.getElementById('m_pos');
    const cat = document.getElementById('m_cat');
    const method = document.getElementById('m_method');
    const colorList = document.getElementById('colorOptions');
    if(!area) return;
    area.innerHTML = '<option value="">選択</option>';
    Object.keys(PROC_AREAS).forEach(k => area.appendChild(new Option(k, k)));
    area.onchange = function() { pos.innerHTML = '<option value="">選択</option>'; if(PROC_AREAS[this.value]) PROC_AREAS[this.value].forEach(x => pos.appendChild(new Option(x, x))); };
    cat.innerHTML = '<option value="">選択</option>';
    Object.keys(PROC_CATS).forEach(k => cat.appendChild(new Option(k, k)));
    cat.onchange = function() { method.innerHTML = '<option value="">選択</option>'; if(PROC_CATS[this.value]) PROC_CATS[this.value].forEach(x => method.appendChild(new Option(x, x))); };
    if(colorList) colorList.innerHTML = STD_COLORS.map(c => `<option value="${c}">`).join('');
}

function openProcSidebar() {
    ['m_area','m_cat','m_method'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.value = "";
    });
    const pos = document.getElementById('m_pos');
    if(pos) pos.innerHTML = "";
    const method = document.getElementById('m_method');
    if(method) method.innerHTML = "";
    const countEl = document.getElementById('m_count');
    if(countEl) countEl.value = "1";
    const changeEl = document.getElementById('m_change');
    if(changeEl) changeEl.value = "無";
    const colorContainer = document.getElementById('dynamicColorContainer');
    if(colorContainer) colorContainer.innerHTML = ""; 
    const sidebar = document.getElementById('procOffcanvas');
    if(sidebar) { new bootstrap.Offcanvas(sidebar).show(); } 
    else { console.error("サイドバーのID(procOffcanvas)が見つかりません"); }
}

function addProcFromSidebar() {
    const area = document.getElementById('m_area').value;
    const pos = document.getElementById('m_pos').value;
    const cat = document.getElementById('m_cat').value;
    const method = document.getElementById('m_method').value;
    const count = document.getElementById('m_count').value;
    if(!area || !pos || !method) { alert("必須項目が足りません"); return; }
    let colorDesc = "";
    const colorInputs = document.querySelectorAll('.m-color-input');
    const isChange = document.getElementById('m_change').value === "有";
    if(colorInputs.length > 0) {
        let tempColors = [];
        colorInputs.forEach(input => {
            if(input.value) {
                if(isChange) {
                    const bodyColor = input.getAttribute('data-body');
                    tempColors.push(`${bodyColor}→${input.value}`);
                } else {
                    tempColors.push(input.value);
                }
            }
        });
        colorDesc = tempColors.join(" / ");
    }
    procList.push({ area, pos, cat, method, count, color: colorDesc });
    renderProcList();
    const offcanvasEl = document.getElementById('procOffcanvas');
    const modalInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
    if(modalInstance) modalInstance.hide();
}

function renderProcList() {
    const disp = document.getElementById('procListDisplay');
    if(!disp) return;
    if(procList.length === 0) { disp.innerHTML = '<p class="text-muted text-center small mt-5">加工は登録されていません</p>'; return; }
    disp.innerHTML = procList.map((p, idx) => `
        <div class="d-flex justify-content-between align-items-center border-bottom py-2">
            <div><span class="badge bg-primary me-2">${idx+1}</span><strong>${p.pos}</strong> <small>(${p.area})</small><div class="ms-4 small"><strong>${p.method}</strong> ${p.color}</div></div>
            <button class="btn btn-sm text-danger" onclick="removeProc(${idx})"><i class="fas fa-trash"></i></button>
        </div>`).join('');
}
function removeProc(idx) { procList.splice(idx, 1); renderProcList(); }

// ==========================================
// ★ダッシュボード
// ==========================================
function loadDashboard() {
  if(!db) return;
  const tbody = document.getElementById('dashboardTableBody');
  tbody.innerHTML = '<tr><td colspan="6" class="text-center p-5"><div class="spinner-border text-primary" role="status"></div><p class="mt-2 text-muted">データを読み込んでいます...</p></td></tr>';

  db.collection("orders").orderBy("作成日","desc").limit(50).get().then(snap => {
    tbody.innerHTML = "";
    if (snap.empty) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center p-5 text-muted">データがありません</td></tr>';
        return;
    }
    snap.forEach(doc => {
      const d = doc.data();
      const docId = doc.id;
      const json = JSON.stringify(d).replace(/"/g, '&quot;');
      const isAdmin = window.currentUser && window.currentUser.isAdmin;
      const deleteBtn = isAdmin ? `<i class="fas fa-trash-alt text-danger pointer ms-3" onclick="deleteOrder('${docId}')" title="削除"></i>` : '';

      tbody.innerHTML += `
        <tr>
            <td class="text-center"><input type="checkbox" class="form-check-input"></td>
            <td>
                <i class="fas fa-check-circle icon-status"></i>
                <i class="fas fa-paper-plane icon-mail"></i>
                <i class="fas fa-bolt icon-flash" style="opacity:0.3;"></i>
                <i class="fas fa-lock icon-lock" style="opacity:0.3;"></i>
            </td>
            <td>
                <i class="far fa-edit me-1 text-muted"></i>
                <span class="doc-number">${d.orderId || '---'}</span>
                ${d.designUrl ? '<i class="fas fa-paperclip text-muted ms-2"></i>' : ''}
            </td>
            <td>
                <div class="table-subject" onclick='copyOrder(${json})'>${d.team || 'チーム名なし'}</div>
                <div class="table-subtext">${d.customer || ''} / 受注日: ${d.作成日 ? new Date(d.作成日.toDate()).toLocaleDateString() : '-'}</div>
            </td>
            <td class="text-muted small">${d.manager || '-'} Department</td>
            <td><button class="btn btn-sm btn-outline-primary py-0" onclick='copyOrder(${json})'>詳細</button>${deleteBtn}</td>
        </tr>`;
    });
  });
}
function filterDashboard() { const v = document.getElementById('dashboardSearch').value.toLowerCase(); document.querySelectorAll('#dashboardTableBody tr').forEach(r => r.style.display = r.innerText.toLowerCase().includes(v)?'':'none'); }
function copyOrder(d) {
    showScreen('formScreen');
    setText('customerName', d.customer||d.顧客名||"");
    setText('managerName', d.manager||"");
    document.getElementById('teamName').value = d.team||d.チーム名||"";
    document.getElementById('pdfUrlInput').value = d.designUrl || "";
    loadPdf(); 
    setText('orderId', generateId());
    alert("過去データを読み込みました");
}
function deleteOrder(docId) {
    if(!confirm("⚠️ 本当に削除しますか？")) return;
    db.collection("orders").doc(docId).delete().then(() => { alert("削除しました"); loadDashboard(); });
}

// ==========================================
// ★カレンダー機能（修正済み）
// ==========================================
function getWorkdayDate(startDate, daysToAdd) {
    let dt = new Date(startDate);
    let count = 0;
    while(count < daysToAdd) {
        dt.setDate(dt.getDate() + 1);
        if(dt.getDay() !== 0 && dt.getDay() !== 6) { count++; }
    }
    return dt;
}

function initCalendar() {
    const el = document.getElementById('calendarGrid');
    if(!el) return;
    el.className = ''; 
    el.style.width = '100%';

    const now = new Date();
    const deadlineDate = getWorkdayDate(now, 11);
    const fmt = (d) => `${d.getMonth()+1}/${d.getDate()}`;
    const weekChars = ['日','月','火','水','木','金','土'];
    
    let html = `
    <div style="background:#fff; border-bottom:1px solid #ddd; padding:5px 10px; margin-bottom:10px; text-align:center; font-weight:bold; color:#333; font-size:0.95rem;">
        <span style="color:#0d6efd;">今日: ${fmt(now)} (${weekChars[now.getDay()]})</span>
        <span style="color:#ccc; margin:0 15px;">▶▶</span>
        <span style="color:#dc3545;">納期: ${fmt(deadlineDate)} (${weekChars[deadlineDate.getDay()]})</span>
    </div>
    <div id="cal-scroll-box" style="display:flex; flex-wrap:nowrap; overflow-x:auto; -webkit-overflow-scrolling:touch; padding-bottom:10px; gap:6px;">`;

    for (let i = 0; i < 2; i++) {
        let targetDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
        let y = targetDate.getFullYear();
        let m = targetDate.getMonth(); 
        let lastDate = new Date(y, m + 1, 0).getDate();
        
        // 月の表示
        html += `<div style="flex:0 0 auto; display:flex; flex-direction:column; justify-content:center; align-items:center; margin-right:5px; padding-right:10px; border-right:2px dashed #ccc;">
                    <div style="font-weight:bold; font-size:1.1rem; color:#0d6efd;">${m+1}<span style="font-size:0.7rem; color:#333;">月</span></div>
                 </div>`;
        
        for(let d=1; d<=lastDate; d++) {
            const dateObj = new Date(y, m, d);
            const day = dateObj.getDay();
            const w = weekChars[day];
            let color = '#333';
            let bgStyle = "background:#fff; border:1px solid #eee;";
            let cellId = "";
            
            if(day === 0) { color = '#dc3545'; bgStyle = "background:#fff0f0; border:1px solid #f8d7da;"; }
            else if(day === 6) { color = '#0d6efd'; bgStyle = "background:#f0f8ff; border:1px solid #cff4fc;"; }
            
            if(dateObj.toDateString() === deadlineDate.toDateString()) {
                bgStyle = "background:#dc3545; border:2px solid #b02a37; color:#fff; box-shadow:0 3px 6px rgba(220,53,69,0.4); transform:scale(1.05); z-index:1;";
                color = "#fff";
            } else if(dateObj.toDateString() === now.toDateString()) {
                bgStyle = "background:#0d6efd; border:2px solid #0a58ca; color:#fff;";
                color = "#fff";
                cellId = 'id="calendar-today-cell"'; 
            }
            
            // flex: 0 0 48px で幅を固定して潰れないようにする
            html += `<div ${cellId} style="flex:0 0 48px; text-align:center; padding:6px 0; border-radius:6px; ${bgStyle}">
                        <div style="font-size:0.7rem; color:${color}; opacity:0.9;">${w}</div>
                        <div style="font-size:1.15rem; line-height:1.1; font-weight:bold; color:${color};">${d}</div>
                     </div>`;
        }
    }
    html += `</div>`;
    el.innerHTML = html;
    
    setTimeout(() => {
        const today = document.getElementById('calendar-today-cell');
        if (today) {
            today.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }, 500);
}

const COLOR_MASTERS = {
    "刺繍": ["紫 1127", "橙 1331", "金茶 1711", "エンジ 9227", "ピンク 1005", "濃ピンク 1359", "赤 9022", "紺 1039", "青 1233", "水色 1505", "黄色 1095", "緑 1406", "黄緑 1059", "濃紺 1189", "グレー 1142", "Yゴールド 2034", "銀糸 Ms1", "金糸 Mg2"],
    "プリント": ["ブラック", "ホワイト", "レモンイエロー", "Gイエロー", "オレンジ", "Sレッド", "Cレッド", "マゼンタ", "ネイビー", "ロイヤルブルー", "モノブルー", "Bブルー", "Pブルー", "Aqua Marine", "ターコイズブルー", "ライムグリーン", "Bグリーン", "Kグリーン", "Dグリーン", "Sブラウン", "Bグレー", "ピンク", "ネオンマゼンタ", "Orbit Yellow(蛍光)", "Tグリーン(蛍光)", "Inferno Orange(蛍光)", "Aurora Pink(蛍光)", "MRゴールド", "Mシルバー"],
    "ラバー": ["ゴールド", "ホワイト", "ブラック", "シルバー", "ライトブルー", "蛍光イエロー", "グリーン", "蛍光グリーン", "ネイビー", "蛍光オレンジ", "ロイヤルブルー", "蛍光マゼンタ", "蛍光ブルー", "フォレストグリーン", "レッド", "キャメル", "ワイン", "ベビーピンク", "イエロー", "ローズピンク", "チャコール", "サファイア", "グレー", "スカイブルー", "パープル", "アップルグリーン", "オレンジ", "アクアグリーン", "ミリタリーグリーン", "ブラウン", "ベージュ", "カーディナルレッド", "ミディアムイエロー", "フレームレッド", "レモンイエロー", "バイオレット"],
    "A転写": ["Mオレンジ", "エンジ", "Dエンジ", "レッド", "Dパープル", "パープル", "Rブルー", "ブルー", "ホットピンク", "Yゴールド", "イエロー", "ピンク", "Mグリーン", "Dグリーン", "グリーン", "ライム", "Aネイビー", "Lネイビー", "サックス", "Aブルー", "Lパープル", "Pネイビー", "Lオレンジ", "オレンジ", "Dブラウン", "ブラウン", "Dグレー", "グレー", "Dアイボリー", "アイボリー", "イエローG", "ゴールド", "ブラック", "ホワイト"],
    "D昇華": ["Mオレンジ", "エンジ", "Dエンジ", "レッド", "Dパープル", "パープル", "Rブルー", "ブルー", "ホットピンク", "Yゴールド", "イエロー", "ピンク", "Mグリーン", "Dグリーン", "グリーン", "ライム", "Aネイビー", "Lネイビー", "サックス", "Aブルー", "Lパープル", "Pネイビー", "Lオレンジ", "オレンジ", "Dブラウン", "ブラウン", "Dグレー", "グレー", "Dアイボリー", "アイボリー", "イエローG", "ゴールド", "ブラック", "ホワイト"]
};

// ==========================================
// ★カラー入力スロット
// ==========================================
function updateColorInputs() {
    const container = document.getElementById('dynamicColorContainer');
    const elMethod = document.getElementById('m_method');
    const elCount = document.getElementById('m_count');
    const elChange = document.getElementById('m_change'); 

    if(!container || !elMethod || !elCount) return;

    const method = elMethod.value; 
    const count = parseInt(elCount.value) || 1;
    const isChange = (elChange && elChange.value === "有"); 
    
    const bodyColors = (isChange && productList.length > 0) ? [...new Set(productList.map(p => p.color))] : ["共通"];
    const options = COLOR_MASTERS[method] || ["ホワイト", "ブラック", "ネイビー"];

    let html = "";
    bodyColors.forEach(bColor => {
        html += `
        <div class="mb-3 p-2 border-start border-primary border-3 bg-white shadow-sm" style="border-radius:0 4px 4px 0;">
            <div class="small fw-bold mb-2 text-secondary">
                ボディカラー： <span class="text-dark" style="font-size:1rem;">${bColor || '未指定'}</span>
            </div>`;
        
        for (let i = 1; i <= count; i++) {
            html += `
            <div class="d-flex align-items-center mb-1 gap-2">
                <span class="small fw-bold text-muted" style="width:25px;">${i}:</span>
                <select class="form-select form-select-sm m-color-input" data-body="${bColor}" data-index="${i}">
                    <option value="">色を選択</option>
                    ${options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                </select>
            </div>`;
        }
        html += `</div>`;
    });
    
    container.innerHTML = html;
}

document.addEventListener('change', (e) => {
    if(['m_method', 'm_cat', 'm_count', 'm_change'].includes(e.target.id)) {
        updateColorInputs();
    }
});

// ==========================================
// ★追加：プレビュー＆保存機能 (モーダル使用)
// ==========================================
let currentPayload = null;

function previewPdf() {
    const team = document.getElementById('teamName').value;
    if(!team) { alert("チーム名が入力されていません"); return; }

    const modalEl = document.getElementById('pdfCheckModal');
    const modal = new bootstrap.Modal(modalEl);
    modal.show();

    const frame = document.getElementById('generatedPdfFrame');
    frame.innerHTML = '<div class="d-flex flex-column align-items-center justify-content-center h-100"><div class="spinner-border text-primary" style="width: 3rem; height: 3rem;"></div><div class="mt-3 fw-bold text-secondary">PDFを作成しています...</div></div>';
    
    const oid = getText('orderId');
    const items = productList.map(p => ({ no:p.no, color:p.color, quantities:p.quantities }));
    const procs = procList.map(p => ({ pos:`${p.area} ${p.pos}`, method:`${p.method}${p.count||""} ${p.color||""}` }));
    const userEmail = window.currentUser ? window.currentUser.email : "";

    currentPayload = {
        fileName: `指示書_${team}_${oid}.pdf`,
        team: team,
        customer: getText('customerName'),
        manager: getText('managerName'),
        orderId: oid,
        delivery: document.getElementById('deliveryDate').value,
        designUrl: document.getElementById('pdfUrlInput').value,
        items: items,
        procs: procs,
        players: playerList,
        email: userEmail,
        action: "preview"
    };

    fetch(GAS_URL, { method: "POST", body: JSON.stringify(currentPayload) })
        .then(r => r.json())
        .then(d => {
            if (d.status === "success") {
                frame.innerHTML = `<iframe src="${d.pdfData}" width="100%" height="100%" style="border:none;"></iframe>`;
            } else {
                alert("プレビュー作成失敗: " + d.message);
                modal.hide();
            }
        })
        .catch(e => {
            console.error(e);
            alert("通信エラーが発生しました");
            modal.hide();
        });
}

function executeSave() {
    if (!currentPayload) return;
    
    const btn = document.querySelector('#pdfCheckModal .btn-primary');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>送信中...';

    currentPayload.action = "save";

    fetch(GAS_URL, { method: "POST", body: JSON.stringify(currentPayload) })
        .then(r => r.json())
        .then(d => {
            if (d.status === "success") {
                alert("✅ 保存＆メール送信が完了しました！");
                if(db) db.collection("orders").add({ ...currentPayload, 作成日: firebase.firestore.FieldValue.serverTimestamp() });
                bootstrap.Modal.getInstance(document.getElementById('pdfCheckModal')).hide();
                showScreen('menuScreen');
            } else {
                alert("保存失敗: " + d.message);
            }
        })
        .catch(e => { alert("通信エラー: " + e); })
        .finally(() => {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-paper-plane me-2"></i>OK（保存・送信）';
        });
}