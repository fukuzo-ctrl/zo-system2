                // --- 初期設定 ---
                const firebaseConfig = { apiKey: "AIzaSyBz92RqFbXG9a-qtlkVkE1hWtc5OHrHcyc", authDomain: "msk579-3d7a9.firebaseapp.com", projectId: "msk579-3d7a9", storageBucket: "msk579-3d7a9.firebasestorage.app", messagingSenderId: "526065053874", appId: "1:526065053874:web:9f6bf22ab69313a83b19ab" };
                let db = null;
                try {
                    firebase.initializeApp(firebaseConfig);
                    db = firebase.firestore();
                } catch (e) {
                    console.warn("Firebase init error", e);
                }
                const YOUR_GAS_URL = "https://script.google.com/macros/s/AKfycbwmsQZX1FriGFDQ7808H2y3YdatLLws5G50lEU0gUXw-du2SOdEexahwHBE35wdl8aMKw/exec";
                const ORDER_PDF_FOLDER_ID = "1hfMtlxaD6M5N5cEmfKMGIhIkw_3_ZahA";

                // --- マスタデータ ---
                const SPORTS = ["野球", "サッカー", "バレー", "バスケ", "陸上", "ハンドボール", "ラグビー", "卓球", "その他"];
                const PRODUCTS_BASEBALL = ["ユニフォーム", "ユニフォームパンツ", "プラシャツ", "Tシャツ", "ポロシャツ", "CAP", "ジャージ", "ハーフパンツ", "アンダーシャツ", "グラコン", "ジャンバー", "ウィンドブレーカー", "フリース", "スウェット", "バッグ", "ヘルメット", "その他"];
                const PRODUCTS_SOCCER = ["サッカーユニフォーム", "サッカーパンツ", "プラシャツ", "Tシャツ", "ジャージ", "ハーフパンツ", "ウィンドブレーカー", "ストッキング", "ピステ", "ジャージパンツ", "その他"];
                const PRODUCTS_BASKET = ["バスケユニフォーム", "バスケパンツ", "リバーシブル", "Tシャツ", "ロングTシャツ", "スウェット", "ジャージ", "ウィンドブレーカー", "その他"];
                const PRODUCTS_VOLLEY = ["バレーユニフォーム", "バレーパンツ", "プラシャツ", "Tシャツ", "ハーフパンツ", "ジャージ", "スウェット", "その他"];
                const PRODUCTS_COMMON = ["ユニフォーム", "ユニフォームパンツ", "プラシャツ", "Tシャツ", "ロングTシャツ", "ポロシャツ", "ジャージ", "ハーフパンツ", "アンダーシャツ", "ジャンバー", "ウィンドブレーカー", "フリース", "スウェット", "リバーシブル", "その他"];

                let PROC_AREAS = { "シャツ前面": ["全胸", "左胸", "右胸", "胸番号", "ポケット内", "前裾下_右", "前裾下_左", "襟タグ"], "シャツ後面": ["全背", "背番号", "背中_襟下", "背中_裾下", "背中_襟下_右", "背中_襟下_左", "背中_腰下"], "袖": ["左袖", "右袖", "左袖番", "右袖番"], "ハーフパンツ": ["左前", "右前", "左前番", "右前番", "左後ろ", "右後ろ", "左サイド", "右サイド", "左腰", "右腰"], "ロングパンツ": ["左前", "右前", "左前番", "右前番", "左後ろ", "右後ろ", "左サイド", "右サイド", "左腰", "右腰"], "CAP": ["前面", "左サイド", "右サイド", "後", "左サイド番", "右サイド番", "後番号"], "ヘルメット": ["前面", "左サイド", "右サイド", "後"], "その他": [] };
                let PROC_CATS = { "圧着加工": ["A転写", "ラバー", "D昇華", "CAM", "切りマーク", "昇華ワッペン", "シール"], "シルクプリント": ["プリント", "水性プリント"], "刺繍": ["直刺繍", "2重直刺繍", "3重直刺繍", "ウレタン入刺繍", "フチドリ刺繍", "Wフチドリ刺繍", "個人名刺繍"] };
                let PROC_LINKS = {}; // { Area: { Pos: [Methods] } }

                const COLOR_MASTERS = {
                    "刺繍": ["白糸", "紫 1127", "橙 1331", "金茶 1711", "エンジ 9227", "ピンク 1005", "赤 9022", "紺 1039", "青 1233", "水色 1505", "黄色 1095", "緑 1406", "黄緑 1059", "濃紺 1189", "グレー 1142", "Yゴールド 2034", "銀糸 Ms1", "金糸 Mg2"],
                    "プリント": ["ブラック", "ホワイト", "レモンイエロー", "Gイエロー", "オレンジ", "Sレッド", "Cレッド", "マゼンタ", "ネイビー", "ロイヤルブルー", "モノブルー", "Bブルー", "Pブルー", "Aqua Marine", "ターコイズブルー", "ライムグリーン", "Bグリーン", "Kグリーン", "Dグリーン", "Sブラウン", "Bグレー", "ピンク", "ネオンマゼンタ", "Orbit Yellow(蛍光)", "Tグリーン(蛍光)", "Inferno Orange(蛍光)", "Aurora Pink(蛍光)", "MRゴールド", "Mシルバー"],
                    "ラバー": ["ゴールド", "ホワイト", "ブラック", "シルバー", "ライトブルー", "蛍光イエロー", "グリーン", "蛍光グリーン", "ネイビー", "蛍光オレンジ", "ロイヤルブルー", "蛍光マゼンタ", "蛍光ブルー", "フォレストグリーン", "レッド", "キャメル", "ワイン", "ベビーピンク", "イエロー", "ローズピンク", "チャコール", "サファイア", "グレー", "スカイブルー", "パープル", "アップルグリーン", "オレンジ", "アクアグリーン", "ミリタリーグリーン", "ブラウン", "ベージュ", "カーディナルレッド", "ミディアムイエロー", "フレームレッド", "レモンイエロー", "バイオレット"],
                    "A転写": ["フルカラー", "Mオレンジ", "エンジ", "Dエンジ", "レッド", "Dパープル", "パープル", "Rブルー", "ブルー", "ホットピンク", "Yゴールド", "イエロー", "ピンク", "Mグリーン", "Dグリーン", "グリーン", "ライム", "Aネイビー", "Lネイビー", "サックス", "Aブルー", "Lパープル", "Pネイビー", "Lオレンジ", "オレンジ", "Dブラウン", "ブラウン", "Dグレー", "グレー", "Dアイボリー", "アイボリー", "イエローG", "ゴールド", "ブラック", "ホワイト"],
                    "D昇華": ["フルカラー", "Mオレンジ", "エンジ", "Dエンジ", "レッド", "Dパープル", "パープル", "Rブルー", "ブルー", "ホットピンク", "Yゴールド", "イエロー", "ピンク", "Mグリーン", "Dグリーン", "グリーン", "ライム", "Aネイビー", "Lネイビー", "サックス", "Aブルー", "Lパープル", "Pネイビー", "Lオレンジ", "オレンジ", "Dブラウン", "ブラウン", "Dグレー", "グレー", "Dアイボリー", "アイボリー", "イエローG", "ゴールド", "ブラック", "ホワイト"]
                };

                const SOUTHERN_LAGER_MASTER = {
                    "JPN_TBU": { no: "JPN_TBU", name: "Tシャツ_ボックス袖丸首", price: 2650 },
                    "JPN_TRU": { no: "JPN_TRU", name: "Tシャツ_ボックス袖丸首", price: 2650 },
                    "JPN_TBV": { no: "JPN_TBV", name: "Tシャツ_ボックス袖V首", price: 2750 },
                    "JPN_TRV": { no: "JPN_TRV", name: "Tシャツ_ラグラン袖V首", price: 2750 },
                    "JPN_TBU_N": { no: "JPN_TBU_N", name: "Tシャツ_ボックス袖丸首_ネーム有", price: 2750 },
                    "JPN_TRU_N": { no: "JPN_TRU_N", name: "Tシャツ_ボックス袖丸首_ネーム有", price: 2750 },
                    "JPN_TBV_N": { no: "JPN_TBV_N", name: "Tシャツ_ボックス袖V首_ネーム有", price: 2850 },
                    "JPN_TRV_N": { no: "JPN_TRV_N", name: "Tシャツ_ラグラン袖V首_ネーム有", price: 2850 },
                    "JPN_TBU_B": { no: "JPN_TBU_B", name: "Tシャツ_ボックス袖丸首_番号有", price: 2850 },
                    "JPN_TRU_B": { no: "JPN_TRU_B", name: "Tシャツ_ボックス袖丸首_番号有", price: 2850 },
                    "JPN_TBV_B": { no: "JPN_TBV_B", name: "Tシャツ_ボックス袖V首_番号有", price: 2950 },
                    "JPN_TRV_B": { no: "JPN_TRV_B", name: "Tシャツ_ラグラン袖V首_番号有", price: 2950 },
                    "JPN_TBU_NB": { no: "JPN_TBU_NB", name: "Tシャツ_ボックス袖丸首_ネーム番号有", price: 2950 },
                    "JPN_TRU_NB": { no: "JPN_TRU_NB", name: "Tシャツ_ボックス袖丸首_ネーム番号有", price: 2950 },
                    "JPN_TBV_NB": { no: "JPN_TBV_NB", name: "Tシャツ_ボックス袖V首_ネーム番号有", price: 3050 },
                    "JPN_TRV_NB": { no: "JPN_TRV_NB", name: "Tシャツ_ラグラン袖V首_ネーム番号有", price: 3050 },
                    "JPN_RG_Pr_BU": { no: "JPN_RG_Pr_BU", name: "プラシャツ　ボックスFIT丸首", price: 2700 },
                    "JPN_RG_Pr_BU2": { no: "JPN_RG_Pr_BU2", name: "プラシャツ　ボックスFIT丸2首", price: 2800 },
                    "JPN_RG_Pr_RU": { no: "JPN_RG_Pr_RU", name: "プラシャツ　ラグランFIT丸首", price: 2700 },
                    "JPN_RG_Pr_RU2": { no: "JPN_RG_Pr_RU2", name: "プラシャツ　ラグランFIT丸2首", price: 2800 },
                    "JPN_RG_Pr_BU_N": { no: "JPN_RG_Pr_BU_N", name: "プラシャツ　ボックスFIT丸首_ネーム有", price: 2800 },
                    "JPN_RG_Pr_BU2_N": { no: "JPN_RG_Pr_BU2_N", name: "プラシャツ　ボックスFIT丸2首_ネーム有", price: 2900 },
                    "JPN_RG_Pr_RU_N": { no: "JPN_RG_Pr_RU_N", name: "プラシャツ　ラグランFIT丸首_ネーム有", price: 2800 },
                    "JPN_RG_Pr_RU2_N": { no: "JPN_RG_Pr_RU2_N", name: "プラシャツ　ラグランFIT丸2首_ネーム有", price: 2900 },
                    "JPN_RG_Pr_BU_B": { no: "JPN_RG_Pr_BU_B", name: "プラシャツ　ボックスFIT丸首_番号有", price: 2900 },
                    "JPN_RG_Pr_BU2_B": { no: "JPN_RG_Pr_BU2_B", name: "プラシャツ　ボックスFIT丸2首_番号有", price: 3000 },
                    "JPN_RG_Pr_RU_B": { no: "JPN_RG_Pr_RU_B", name: "プラシャツ　ラグランFIT丸首_番号有", price: 2900 },
                    "JPN_RG_Pr_RU2_B": { no: "JPN_RG_Pr_RU2_B", name: "プラシャツ　ラグランFIT丸2首_番号有", price: 3000 },
                    "JPN_RG_Pr_BU_NB": { no: "JPN_RG_Pr_BU_NB", name: "プラシャツ　ボックスFIT丸首_ネーム番号有", price: 3000 },
                    "JPN_RG_Pr_BU2_NB": { no: "JPN_RG_Pr_BU2_NB", name: "プラシャツ　ボックスFIT丸2首_ネーム番号有", price: 3100 },
                    "JPN_RG_Pr_RU_NB": { no: "JPN_RG_Pr_RU_NB", name: "プラシャツ　ラグランFIT丸首_ネーム番号有", price: 3000 },
                    "JPN_RG_Pr_RU2_NB": { no: "JPN_RG_Pr_RU2_NB", name: "プラシャツ　ラグランFIT丸2首_ネーム番号有", price: 3100 },
                    "JPN_RG_J_BU": { no: "JPN_RG_J_BU", name: "Uジャージ　ボックス丸首_番号有", price: 3300 },
                    "JPN_RG_J_BU2": { no: "JPN_RG_J_BU2", name: "Uジャージ　ボックス丸2首_番号有", price: 3400 },
                    "JPN_RG_J_BRUP": { no: "JPN_RG_J_BRUP", name: "Uジャージ　ラップネックボックス_番号有", price: 3850 },
                    "JPN_RG_J_RU": { no: "JPN_RG_J_RU", name: "Uジャージ　ラグラン丸首_番号有", price: 3300 },
                    "JPN_RG_J_RU2": { no: "JPN_RG_J_RU2", name: "Uジャージ　ラグラン丸2首_番号有", price: 3400 },
                    "JPN_RG_J_RRUP": { no: "JPN_RG_J_RRUP", name: "Uジャージ　ラップネックラグラン_番号有", price: 3850 },
                    "JPN_RG_J_BU_NB": { no: "JPN_RG_J_BU_NB", name: "Uジャージ　ボックス丸首_ネーム番号有", price: 3400 },
                    "JPN_RG_J_BU2_NB": { no: "JPN_RG_J_BU2_NB", name: "Uジャージ　ボックス丸2首_ネーム番号有", price: 3500 },
                    "JPN_RG_J_BRUP_NB": { no: "JPN_RG_J_BRUP_NB", name: "Uジャージ　ラップネックボックス_ネーム番号有", price: 3950 },
                    "JPN_RG_J_RU_NB": { no: "JPN_RG_J_RU_NB", name: "Uジャージ　ラグラン丸首_ネーム番号有", price: 3400 },
                    "JPN_RG_J_RU2_NB": { no: "JPN_RG_J_RU2_NB", name: "Uジャージ　ラグラン丸2首_ネーム番号有", price: 3500 },
                    "JPN_RG_J_RRUP_NB": { no: "JPN_RG_J_RRUP_NB", name: "Uジャージ　ラップネックラグラン_ネーム番号有", price: 3950 },
                    "JPN_RUNS": { no: "JPN_RUNS", name: "ランシャツ型_丸首", price: 2600 },
                    "JPN_RUNS_N": { no: "JPN_RUNS_N", name: "ランシャツ型_丸首_ネーム有", price: 2700 },
                    "JPN_RUNS_B": { no: "JPN_RUNS_B", name: "ランシャツ型_丸首_番号有", price: 2800 },
                    "JPN_RUNS_NB": { no: "JPN_RUNS_NB", name: "ランシャツ型_丸首_ネーム番号有", price: 2900 },
                    "JPN_TANK 001": { no: "JPN_TANK 001", name: "タンク型_丸首", price: 2600 },
                    "JPN_TANK 001_N": { no: "JPN_TANK 001_N", name: "タンク型_丸首_ネーム有", price: 2700 },
                    "JPN_TANK 001_B": { no: "JPN_TANK 001_B", name: "タンク型_丸首_番号有", price: 2800 },
                    "JPN_TANK 001_NB": { no: "JPN_TANK 001_NB", name: "タンク型_丸首_ネーム番号有", price: 2900 },
                    "JPN_TBLU001": { no: "JPN_TBLU001", name: "ロングTシャツ ボックス 丸首", price: 2950 },
                    "JPN_TBLU001_N": { no: "JPN_TBLU001_N", name: "ロングTシャツ　ボックス　丸首_ネーム有", price: 3050 },
                    "JPN_TBLU001_B": { no: "JPN_TBLU001_B", name: "ロングTシャツ　ボックス　丸首_番号有", price: 3150 },
                    "JPN_TBLU001_NB": { no: "JPN_TBLU001_NB", name: "ロングTシャツ　ボックス　丸首_ネーム番号有", price: 3250 },
                    "JPN_HP_203": { no: "JPN_HP_203", name: "ハーフパンツ　ポケット付", price: 3300 },
                    "JPN_HP_203_N": { no: "JPN_HP_203_N", name: "ハーフパンツ　ポケット付_ネーム有", price: 3400 },
                    "JPN_HP_203_B": { no: "JPN_HP_203_B", name: "ハーフパンツ　ポケット付_番号有", price: 3500 },
                    "JPN_HP_203_NB": { no: "JPN_HP_203_NB", name: "ハーフパンツ　ポケット付_ネーム番号有", price: 3600 }
                };

                const FABRIC_MASTER = [
                    "ZO-SC001　刺洞布（薄）",
                    "ZO-SC004　亞瑟士",
                    "ZO-BK003　六角",
                    "ZO-BS001　吊目布",
                    "ZO-BS002　雪花布",
                    "ZO-RG006　KIHSOKAN布",
                    "ZO-SC011　刺洞布（厚）",
                    "YU0004 蜘蛛網布（リバーシブル）"
                ];
                const SOUTHERN_LAGER_FABRICS = [
                    // ご指摘に基づき、存在しない生地名を削除しました。正しい生地名をここに追加できます。
                ];

                // --- リードタイム（営業日数） ---
                let LEAD_DAYS_STANDARD = 11;
                let LEAD_DAYS_FULLSUB = 18;

                // --- 休日カレンダー (2026年度 / 令和8年) ---
                // 黄色＝休日の日付を YYYY-MM-DD 形式で登録
                const COMPANY_HOLIDAYS_2026 = {
                    "2026-01": [1, 2, 3, 4, 10, 11, 12, 17, 18, 24, 25, 31],
                    "2026-02": [1, 8, 11, 14, 15, 22, 23, 28],
                    "2026-03": [1, 8, 14, 15, 22, 29],
                    "2026-04": [5, 11, 12, 19, 25, 26, 29],
                    "2026-05": [2, 3, 4, 5, 6, 9, 10, 17, 23, 24, 31],
                    "2026-06": [7, 13, 14, 21, 27, 28],
                    "2026-07": [5, 11, 12, 19, 20, 25, 26],
                    "2026-08": [2, 8, 9, 11, 12, 13, 14, 15, 16, 22, 23, 30],
                    "2026-09": [6, 12, 13, 20, 21, 22, 23, 26, 27],
                    "2026-10": [4, 10, 11, 12, 18, 24, 25],
                    "2026-11": [1, 3, 8, 14, 15, 22, 23, 28, 29],
                    "2026-12": [6, 12, 13, 20, 26, 27, 28, 29, 30, 31]
                };

                function isHoliday(date) {
                    const hYear = date.getFullYear();
                    const hMonth = (date.getMonth() + 1).toString().padStart(2, '0');
                    const hDay = date.getDate();
                    const key = `${hYear}-${hMonth}`;
                    // 指定の日付リストに含まれているかのみを判定（「黄色い日だけ」というルールを厳守）
                    return !!(COMPANY_HOLIDAYS_2026[key] && COMPANY_HOLIDAYS_2026[key].includes(hDay));
                }

                // --- 変数 ---
                let itemMasterData = [], productList = [], procList = [], playerList = [];
                let adminOrdersCache = [], customerOrdersCache = [];
                let editingDocId = null, selectedModalItem = null, dataFolderUrl = "", currentImgData = null, currentGasUrl = "";
                let editingProductIndex = -1, currentBillingDocId = null;
                let currentAdminFilter = '全て';
                let currentTypeFilter = 'all'; // 'all', 'processing', 'fullsub'
                let currentViewMode = 'card'; // 'card', 'table'
                let calBaseDate = new Date();
                window.currentPdfBlob = null;
                let customerData = [{ id: "admin", customer: "ZO SYSTEM", manager: "管理者", email: "admin@zosystem.com", pass: "admin9999", isAdmin: true }];
                let isFullSubMode = false;
                async function applyModeUI(fullSub) {
                    isFullSubMode = fullSub;
                    const h5 = document.querySelector('#formScreen h5');
                    const btnProc = document.getElementById('btn-proc');
                    const cardProc = document.getElementById('card-proc');
                    const btnProd = document.getElementById('btn-prod');
                    const ss = document.getElementById('sportType');
                    const cs = document.getElementById('productCategory');
                    const pc = document.getElementById('productContent');
                    const u = window.currentUser || {};
                    const btnCarry = document.getElementById('btn-prod-carry');
                    if (fullSub) {
                        if (h5) h5.innerHTML = 'フル昇華指示書 No.<span id="orderId" class="text-primary"></span>';
                        if (btnProc) btnProc.style.display = 'none';
                        if (cardProc) cardProc.style.display = 'none';
                        if (btnProd) {
                            btnProd.innerHTML = '<i class="fas fa-tshirt me-1"></i> アイテム登録';
                            btnProd.setAttribute('onclick', 'openItemInputSidebar(false)');
                            btnProd.className = "btn btn-primary fw-bold flex-grow-1 py-2";
                        }
                        if (btnCarry) btnCarry.style.display = 'none';

                        if (ss) { ss.innerHTML = `<option value="">競技選択</option><option value="野球">野球</option><option value="サッカー">サッカー</option><option value="バスケ">バスケ</option><option value="バレー">バレー</option><option value="フル昇華その他">フル昇華その他</option>`; ss.onchange = null }
                        if (cs) { cs.innerHTML = `<option value="">カテゴリ選択</option><option value="昇華シャツ">昇華シャツ</option><option value="昇華パンツ">昇華パンツ</option><option value="昇華リバーシブル">昇華リバーシブル</option><option value="セットアップ">セットアップ</option>` }
                        if (pc) { pc.value = 'フル昇華'; pc.style.display = 'none' }
                        
                        // フル昇華用URLに切り替え
                        if (u.pdfFullSub) {
                            document.getElementById('pdfUrlInput').value = u.pdfFullSub;
                            dataFolderUrl = u.pdfFullSub;
                        } else {
                            document.getElementById('pdfUrlInput').value = "";
                            dataFolderUrl = "";
                        }
                        // フル昇華専用GAS(I列)があれば使用、なければ従来(H列/common)
                        currentGasUrl = u.gasUrlFullSub || u.gasUrlStandard || u.gasUrl || ""; 
                    } else {
                        if (h5) h5.innerHTML = '加工指示書 No.<span id="orderId" class="text-primary"></span>';
                        if (btnProc) btnProc.style.display = 'inline-block';
                        if (cardProc) cardProc.style.display = 'block';
                        if (btnProd) {
                            btnProd.innerHTML = '<i class="fas fa-store me-1"></i> ZO発注商品';
                            btnProd.setAttribute('onclick', 'openSearchModal()');
                            btnProd.className = "btn btn-primary fw-bold flex-grow-1 py-2";
                        }
                        if (btnCarry) {
                            btnCarry.style.display = 'inline-block';
                            btnCarry.setAttribute('onclick', 'openItemInputSidebar(true)');
                            btnCarry.classList.add('btn-pink');
                        }

                        if (typeof initSportDropdown === "function") initSportDropdown();
                        if (ss) ss.onchange = typeof updateProductList === "function" ? updateProductList : null;
                        if (pc) { pc.style.display = 'block'; pc.value = 'ZO商品' }

                        // 標準用URL(F列/legacy)に切り替え
                        if (u.folderUrlStandard || u.pdf) {
                            const val = u.folderUrlStandard || u.pdf;
                            document.getElementById('pdfUrlInput').value = val;
                            dataFolderUrl = val;
                        } else {
                            document.getElementById('pdfUrlInput').value = "";
                            dataFolderUrl = "";
                        }
                        currentGasUrl = u.gasUrlStandard || u.gasUrl || ""; // H列
                    }
                    // 管理者の場合は、現在の顧客名に基づいてURLを再同期させる
                    if (u.isAdmin) {
                        await syncCustomerUrls();
                    }
                }

                async function syncCustomerUrls() {
                    const customerNameInput = document.getElementById('customerName').value.trim();
                    if (!customerNameInput || !db) return;
                    const u = window.currentUser;
                    if (u && u.isAdmin) {
                        try {
                            const snap = await db.collection("customers").where("customer", "==", customerNameInput).limit(1).get();
                            if (!snap.empty) {
                                const c = snap.docs[0].data();
                                console.log("Customer found:", customerNameInput, c);
                                const pdfUrlField = document.getElementById('pdfUrlInput');
                                if (isFullSubMode) {
                                    const val = c.pdfFullSub || c.pdf;
                                    if (val) {
                                        if (pdfUrlField) pdfUrlField.value = val;
                                        dataFolderUrl = val;
                                    }
                                    // I列優先、なければH列
                                    currentGasUrl = c.gasUrlFullSub || c.gasUrlStandard || c.gasUrl || "";
                                } else {
                                    // F列優先
                                    const val = c.folderUrlStandard || c.pdf;
                                    if (val) {
                                        if (pdfUrlField) pdfUrlField.value = val;
                                        dataFolderUrl = val;
                                    }
                                    // H列優先
                                    currentGasUrl = c.gasUrlStandard || c.gasUrl || "";
                                }
                                console.log(`Mode: ${isFullSubMode ? 'FullSub' : 'Standard'} -> Folder: ${dataFolderUrl}, GAS: ${currentGasUrl}`);
                                if (typeof loadPdf === 'function') loadPdf();
                            } else {
                                console.log("Customer not found in DB:", customerNameInput);
                            }
                        } catch (err) { console.warn("Customer sync error:", err); }
                    }
                }

                function updateSizeGridLabels() {
                    const mode = document.querySelector('input[name="sizeMode"]:checked').value;
                    const boxes = document.querySelectorAll('.sz-box');

                    const mapping = {
                        'o': { 'XL': 'O', '2XL': 'XO', '3XL': '2XO', '4XL': '3XO', '5XL': '4XO' },
                        'll': { 'XL': 'LL', '2XL': '3L', '3XL': '4L', '4XL': '5L', '5XL': '6L' }
                    };

                    boxes.forEach(box => {
                        const baseSize = box.getAttribute('data-base');
                        const labelDiv = box.querySelector('.sz-label');
                        const hiddenInput = box.querySelector('.sb-size');

                        if (mode === 'manual') {
                            // 打ち込みモード：ラベルを input に変更し、初期値(100等)は空にする
                            if (!labelDiv.querySelector('input')) {
                                labelDiv.innerHTML = `<input type="text" class="form-control form-control-sm text-center p-0 m-0 border-0 fw-bold" 
                            style="font-size:0.6rem; background:transparent;" value="" oninput="this.closest('.sz-box').querySelector('.sb-size').value = this.value; syncDraftData()">`;
                            }
                            hiddenInput.value = "";
                        } else {
                            // 通常モード：ラベルをテキストに戻す
                            let val = baseSize;
                            if (mapping[mode] && mapping[mode][baseSize]) {
                                val = mapping[mode][baseSize];
                            }
                            labelDiv.innerHTML = val;
                            hiddenInput.value = val;
                        }
                    });
                    syncDraftData();
                }

                let dashLoadTime = new Date();
                let orderListener = null;

                // --- ユーティリティ ---
                function getLocalDateString(date) {
                    const y = date.getFullYear();
                    const m = (date.getMonth() + 1).toString().padStart(2, '0');
                    const d = date.getDate().toString().padStart(2, '0');
                    return `${y}-${m}-${d}`;
                }
                function generateId(prefix = 'O') { return prefix + Math.random().toString(36).substring(2, 12).toUpperCase(); }
                function setText(id, val) { const el = document.getElementById(id); if (el) el.innerText = val }
                function toggleSidebar() { document.getElementById('sidebarContainer').classList.toggle('active'); document.getElementById('sidebarOverlay').classList.toggle('active') }

                function showGlobalNotification(msg) {
                    const container = document.getElementById('notificationContainer');
                    if (!container) return;
                    const toast = document.createElement('div');
                    toast.className = 'bg-dark text-white p-3 rounded shadow-lg';
                    toast.style.cssText = 'min-width:250px; opacity:0; transition:all 0.5s ease; border-left:5px solid #0d6efd; pointer-events:auto;';
                    toast.innerHTML = `<i class="fas fa-bell me-2 text-primary"></i>${msg}`;
                    container.appendChild(toast);
                    setTimeout(() => toast.style.opacity = '1', 100);
                    setTimeout(() => {
                        toast.style.opacity = '0';
                        setTimeout(() => toast.remove(), 500);
                    }, 8000); // 8秒で消える
                }
                function showScreen(id) { document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active')); document.getElementById(id).classList.add('active'); window.scrollTo(0, 0) }
                function goToAdminMenu() {
                    showScreen('menuScreen');
                    const ids = ['adminReturnBtn', 'adminProductNav', 'adminProcNav', 'adminCustomerNav'];
                    ids.forEach(i => { const e = document.getElementById(i); if (e) e.style.display = (window.currentUser && window.currentUser.isAdmin) ? 'block' : 'none' });
                }

                function resolveProductInfo(inputSku) {
                    // 「品番 / 品名」の形式で送られてきた場合、品番のみを抽出
                    let cleanSku = (inputSku || "").toString();
                    if (cleanSku.includes(' / ')) {
                        cleanSku = cleanSku.split(' / ')[0].trim();
                    } else {
                        cleanSku = cleanSku.trim();
                    }

                    let res = { no: cleanSku, name: cleanSku, price: 0 };
                    const u = window.currentUser;
                    const isSL = u && (u.isAdmin || (u.customer && u.customer.includes("サザンラガー")));

                    // 品番（キー）で検索 (Southern Lager優先)
                    if (isSL && SOUTHERN_LAGER_MASTER[cleanSku]) {
                        res = JSON.parse(JSON.stringify(SOUTHERN_LAGER_MASTER[cleanSku]));
                    } else if (isSL) {
                        // 品名で検索
                        const foundKey = Object.keys(SOUTHERN_LAGER_MASTER).find(k => SOUTHERN_LAGER_MASTER[k].name === cleanSku);
                        if (foundKey) {
                            res = JSON.parse(JSON.stringify(SOUTHERN_LAGER_MASTER[foundKey]));
                        }
                    }

                    // 見つからない場合は一般マスタ(itemMasterData)を検索
                    if (res.price === 0 && itemMasterData && itemMasterData.length > 0) {
                        const found = itemMasterData.find(i => i.品番 === cleanSku || i.商品名 === cleanSku);
                        if (found) {
                            res = {
                                no: found.品番,
                                name: found.商品名,
                                price: parseInt(found.価格) || 0,
                                fabric: found.生地 || ""
                            };
                        }
                    }
                    return res;
                }

                // --- カレンダー ---
                function initCalendar(markStdDate = null, markFullDate = null) {
                    const el = document.getElementById('calendarArea');
                    if (!el) return;

                    // 引数がない場合、本日からの目安を表示
                    if (!markStdDate) {
                        let dStd = new Date();
                        dStd.setHours(0, 0, 0, 0); // 時刻をリセット
                        let aStd = 0;
                        while (aStd < LEAD_DAYS_STANDARD) {
                            dStd.setDate(dStd.getDate() + 1);
                            if (!isHoliday(dStd)) aStd++;
                        }
                        markStdDate = getLocalDateString(dStd);

                        let dFull = new Date();
                        dFull.setHours(0, 0, 0, 0); // 時刻をリセット
                        let aFull = 0;
                        while (aFull < LEAD_DAYS_FULLSUB) {
                            dFull.setDate(dFull.getDate() + 1);
                            if (!isHoliday(dFull)) aFull++;
                        }
                        markFullDate = getLocalDateString(dFull);
                    }

                    const y = calBaseDate.getFullYear();
                    const m = calBaseDate.getMonth();

                    let h = `<div class="cal-nav-header">
                <div class="cal-nav-btn" onclick="changeCalMonth(-1)"><i class="fas fa-chevron-left"></i></div>
                <div class="fw-bold text-secondary" style="font-size:0.9rem">${y}年 ${m + 1}月 〜</div>
                <div class="cal-nav-btn" onclick="changeCalMonth(1)"><i class="fas fa-chevron-right"></i></div>
            </div>`;

                    h += `<div class="cal-month-wrap">`
                        + createMonthHTML(y, m, markStdDate, markFullDate)
                        + createMonthHTML(y, m + 1, markStdDate, markFullDate)
                        + `</div>`;
                    h += `<div class="cal-legend">
                <div class="legend-item"><div class="box-yellow"></div><span>休日</span></div>
                <div class="legend-item"><div class="circle-red"></div><span>加工納期</span></div>
                <div class="legend-item"><div class="circle-blue"></div><span>フル昇華納期</span></div>
            </div>`;
                    el.innerHTML = h;
                }

                function changeCalMonth(offset) {
                    calBaseDate.setMonth(calBaseDate.getMonth() + offset);
                    initCalendar();
                }
                function createMonthHTML(y, m, markStd, markFull) {
                    if (m > 11) { y++; m -= 12; }
                    const dt = new Date(y, m, 1);
                    const monthName = `${y}年 ${m + 1}月`;
                    const lastDay = new Date(y, m + 1, 0).getDate();
                    const startDow = dt.getDay();
                    let html = `<div class="cal-month-box shadow-sm"><div class="cal-month-title" style="background: linear-gradient(90deg, #1e3a8a, #3b82f6);">${monthName}</div><table class="cal-table"><thead><tr><th style="color:#ef4444">日</th><th>月</th><th>火</th><th>水</th><th>木</th><th>金</th><th style="color:#3b82f6">土</th></tr></thead><tbody><tr>`;
                    for (let i = 0; i < startDow; i++) html += `<td></td>`;
                    for (let d = 1; d <= lastDay; d++) {
                        const dow = (startDow + d - 1) % 7;
                        if (dow === 0 && d !== 1) html += `</tr><tr>`;
                        const today = new Date();
                        const curDate = new Date(y, m, d);
                        const dateStr = getLocalDateString(curDate);

                        let cls = (y === today.getFullYear() && m === today.getMonth() && d === today.getDate()) ? "cal-today" : "";
                        if (isHoliday(curDate)) cls += " cal-holiday";
                        else if (dow === 6) cls += " cal-saturday";

                        // 納期マークの判定
                        if (markStd === dateStr) cls += " cal-mark-standard";
                        if (markFull === dateStr) cls += " cal-mark-fullsub";

                        html += `<td class="${cls.trim()}">${d}</td>`;
                    }
                    html += `</tr></tbody></table></div>`;
                    return html;
                }

                function setItemMasterData(items) {
                    if (items && items.length > 0) {
                        itemMasterData = items;
                    }
                }

                // --- ログイン ---
                async function handleLogin() {
                    const i = document.getElementById('loginId').value;
                    const p = document.getElementById('loginPass').value;
                    const msg = document.getElementById('loginMsg');
                    if (msg) msg.innerText = "";

                    // Firebaseから取得
                    if (db) {
                        try {
                            const s = await db.collection("customers").where("id", "==", i).where("pass", "==", p).get();
                            if (!s.empty) {
                                const d = s.docs[0].data();
                                window.currentUser = Object.assign({}, d, { id: d.id || s.docs[0].id });
                            }
                            const ps = await db.collection("products").get();
                            if (!ps.empty) {
                                setItemMasterData(ps.docs.map(doc => doc.data()));
                            }
                        } catch (e) {
                            console.error("Login fetch error:", e);
                        }
                    }

                    // 管理者等のフォールバック
                    if (!window.currentUser && i === "admin" && p === "admin9999") {
                        // global customerData[0] is admin
                        window.currentUser = JSON.parse(JSON.stringify(customerData[0]));
                    }

                    if (window.currentUser && i === "admin") {
                        window.currentUser.isAdmin = true;
                    }

                    if (window.currentUser) {
                        await loadProcessingMaster(); // 加工マスタを読み込み
                        document.getElementById('loginModal').style.display = 'none';
                        initProcModalDropdowns();
                        initSportDropdown();
                        initCalendar();
                        const u = window.currentUser;
                        if (u.isAdmin) {
                            document.body.classList.add('admin-mode');
                            showScreen('dashboardScreen');
                            loadDashboard();
                            document.getElementById('sidebarTitle').innerHTML = 'ZO MSK <span class="badge bg-danger ms-1" style="font-size:0.6em">管理者</span>';
                            document.getElementById('menuUserInfo').innerHTML = '<span class="badge bg-danger">管理者</span>';
                            document.getElementById('adminMenuTools').style.display = 'block';
                        } else {
                            document.body.classList.remove('admin-mode');
                            document.getElementById('sidebarTitle').innerText = 'ZO MSK';
                            document.getElementById('menuUserInfo').innerText = `${u.customer} 様`;
                            document.getElementById('adminMenuTools').style.display = 'none';
                            document.getElementById('customerName').value = u.customer;
                            document.getElementById('managerName').value = u.manager;
                            if (isFullSubMode && u.pdfFullSub) {
                                document.getElementById('pdfUrlInput').value = u.pdfFullSub;
                                dataFolderUrl = u.pdfFullSub;
                            } else if (u.folderUrlStandard || u.pdf) {
                                const val = u.folderUrlStandard || u.pdf;
                                document.getElementById('pdfUrlInput').value = val;
                                dataFolderUrl = val;
                            }
                            currentGasUrl = (isFullSubMode ? (u.gasUrlFullSub || u.gasUrlStandard || u.gasUrl) : (u.gasUrlStandard || u.gasUrl)) || "";
                            window.currentParentOrderId = null;
                            setText('orderId', generateId());
                            document.getElementById('orderDate').value = getLocalDateString(new Date());
                            updateDeliveryDate();
                            showScreen('menuScreen');
                        }
                    } else {
                        if (msg) msg.innerText = "ID/PWが違います";
                    }
                }
                

                // ★ copyOrderToFormをここに追加（関数欠落防止）★
                async function copyOrderToForm(id) {
                    const o = customerOrdersCache.find(x => x.docId === id) || adminOrdersCache.find(x => x.docId === id);
                    if (!o) return;
                    editingDocId = null;
                    showScreen('formScreen');
                    document.body.classList.add('add-mode');
                    const ts = document.getElementById('orderType');
                    ts.value = "追加";
                    ts.disabled = true;
                    const u = window.currentUser;
                    if (u && u.isAdmin) {
                        document.getElementById('customerName').value = o.customerName || "";
                        document.getElementById('managerName').value = o.managerName || "";
                    } else {
                        document.getElementById('customerName').value = u ? u.customer : "";
                        document.getElementById('managerName').value = u ? u.manager : "";
                    }
                    document.getElementById('teamName').value = o.team;
                    const f = !!(o.isFullSubMode || (o.productCategory && o.productCategory.includes("昇華")));
                    await applyModeUI(f);
                    if (o.sportType) document.getElementById('sportType').value = o.sportType;
                    if (o.productCategory) document.getElementById('productCategory').value = o.productCategory;
                    productList = (o.productList || []).map(p => ({ no: p.no, name: p.name, color: p.color, fabric: p.fabric || "", quantities: {} }));
                    playerList = [];
                    procList = JSON.parse(JSON.stringify(o.procList || []));

                    updateRightPanel();

                    document.getElementById('orderDate').value = getLocalDateString(new Date());
                    updateDeliveryDate();
                    setText('orderId', generateId());
                    // 親オーダーのIDを保存（ダッシュボード表示用）
                    window.currentParentOrderId = o.orderId;
                    if (o.designUrl) { document.getElementById('pdfUrlInput').value = o.designUrl; loadPdf() }
                }

                // --- マスタ初期化 ---
                function initProcModalDropdowns() {
                    const a = document.getElementById('m_area'), p = document.getElementById('m_pos'), c = document.getElementById('m_cat'), m = document.getElementById('m_method'), mc = document.getElementById('m_count');
                    if (!a || !PROC_AREAS || !PROC_CATS) return;

                    // 1. エリア初期化
                    a.innerHTML = '<option value="">選択</option>';
                    Object.keys(PROC_AREAS).forEach(k => a.appendChild(new Option(k, k)));

                    // エリア変更時 -> 位置を更新
                    a.onchange = function () {
                        const areaVal = this.value;
                        p.innerHTML = '<option value="">選択</option>';
                        m.innerHTML = '<option value="">選択</option>'; // 先に方法もクリア

                        let posList = [];
                        if (Object.keys(PROC_LINKS).length > 0 && PROC_LINKS[areaVal]) {
                            posList = Object.keys(PROC_LINKS[areaVal]);
                        } else if (PROC_AREAS[areaVal]) {
                            posList = PROC_AREAS[areaVal];
                        }
                        posList.forEach(x => p.appendChild(new Option(x, x)));
                    };

                    // 位置変更時 -> 方法を更新 (連動データがある場合)
                    p.onchange = function () {
                        const areaVal = a.value;
                        const posVal = this.value;
                        m.innerHTML = '<option value="">選択</option>';

                        if (Object.keys(PROC_LINKS).length > 0 && PROC_LINKS[areaVal] && PROC_LINKS[areaVal][posVal]) {
                            // 連動マスタに一致がある場合、その方法のみ表示
                            PROC_LINKS[areaVal][posVal].forEach(x => m.appendChild(new Option(x, x)));
                        } else {
                            // 連動データがない場合は従来の「分類」から全て表示
                            Object.values(PROC_CATS).flat().forEach(x => m.appendChild(new Option(x, x)));
                        }
                        updateColorInputs();
                    };

                    // 分類(カテゴリ)のフィルタリング用（補助的）
                    c.innerHTML = '<option value="">選択(フィルタ)</option>';
                    Object.keys(PROC_CATS).forEach(k => c.appendChild(new Option(k, k)));
                    c.onchange = function () {
                        const catVal = this.value;
                        m.innerHTML = '<option value="">選択</option>';
                        const areaVal = a.value, posVal = p.value;

                        let methods = [];
                        if (catVal && PROC_CATS[catVal]) {
                            methods = PROC_CATS[catVal];
                        } else {
                            methods = Object.values(PROC_CATS).flat();
                        }

                        // 位置連動データがある場合は、その積集合を表示
                        if (PROC_LINKS[areaVal] && PROC_LINKS[areaVal][posVal]) {
                            methods = methods.filter(x => PROC_LINKS[areaVal][posVal].includes(x));
                        }
                        methods.forEach(x => m.appendChild(new Option(x, x)));
                        updateColorInputs();
                    };

                    m.onchange = updateColorInputs;
                    let o = ''; for (let i = 1; i <= 10; i++)o += `<option value="${i}">${i}色</option>`; o += `<option value="pattern">柄パターン</option>`; mc.innerHTML = o;
                }
                function initSportDropdown() { const s = document.getElementById('sportType'); if (s) { s.innerHTML = '<option value="">競技選択</option>'; SPORTS.forEach(x => s.appendChild(new Option(x, x))); updateProductList() } }
                function updateProductList() {
                    const s = document.getElementById('sportType').value, c = document.getElementById('productCategory');
                    if (!c) return;
                    c.innerHTML = '<option value="">カテゴリ選択</option>';
                    let l = PRODUCTS_COMMON;
                    if (s === '野球') l = PRODUCTS_BASEBALL;
                    else if (s === 'サッカー') l = PRODUCTS_SOCCER;
                    else if (s === 'バスケ') l = PRODUCTS_BASKET;
                    else if (s === 'バレー') l = PRODUCTS_VOLLEY;
                    l.forEach(x => c.appendChild(new Option(x, x)))
                }

                // --- 管理者メニュー用関数 ---
                function openProductMasterModal() { new bootstrap.Modal(document.getElementById('productMasterModal')).show(); }
                function openProcMasterModal() { new bootstrap.Modal(document.getElementById('procMasterModal')).show(); }
                function openCustomerCsvModal() { new bootstrap.Modal(document.getElementById('customerCsvModal')).show(); }

                async function saveProductMaster() {
                    const text = document.getElementById('reg_item_csv').value;
                    if (!text.trim()) return alert("データを貼り付けてください");

                    const lines = text.split(/\r\n|\n/);
                    let count = 0;

                    if (db) {
                        try {
                            for (let line of lines) {
                                if (!line.trim()) continue;
                                const cols = line.split('\t').map(c => c.trim().replace(/^"|"$/g, ''));
                                // 列が6個以上あるか確認（メーカー, 商品, 品番, 商品名, サイズ, カラー）
                                if (cols.length >= 6) {
                                    const maker = cols[0];
                                    const categoryColumn = cols[1]; // 2列目 (商品/カテゴリ)
                                    const no = cols[2];
                                    const productNameColumn = cols[3]; // 4列目 (商品名)
                                    const size = cols[4];
                                    const color = cols[5];

                                    if (no && no !== "品番" && no !== "P-No" && maker !== "メーカー") {
                                        // ユーザー指定のフォーマットに厳格に従い、カテゴリと商品名を分離保存
                                        // [0]メーカー [1]カテゴリ [2]品番 [3]商品名 [4]サイズ [5]カラー
                                        await db.collection("products").doc(no).set({
                                            "メーカー": maker || "",
                                            "カテゴリ": categoryColumn || "", // 2列目 (カテゴリ)
                                            "商品名": productNameColumn || "", // 4列目 (製品名)
                                            "品番": no,
                                            // 互換性のため古いキー「商品」も更新 (カテゴリを重複保存)
                                            "商品": categoryColumn || "",
                                            "サイズ(カンマ区切り)": size || "",
                                            "カラー(カンマ区切り)": color || ""
                                        }, { merge: true });
                                        count++;
                                    }
                                }
                            }
                            alert(`${count}件の商品情報を登録・更新しました`);
                            document.getElementById('reg_item_csv').value = ""; // クリア
                            bootstrap.Modal.getInstance(document.getElementById('productMasterModal')).hide();

                            // マスタ再読み込み
                            const ps = await db.collection("products").get();
                            if (!ps.empty) setItemMasterData(ps.docs.map(d => d.data()));
                        } catch (e) { alert("エラー: " + e.message); }
                    } else {
                        alert("DB接続なし: デモモードでは登録できません");
                        bootstrap.Modal.getInstance(document.getElementById('productMasterModal')).hide();
                    }
                }

                async function saveProcMaster() {
                    const text = document.getElementById('reg_proc_csv').value;
                    if (!text.trim()) return alert("データを貼り付けてください");

                    const lines = text.split(/\r\n|\n/);
                    let count = 0;

                    if (db) {
                        try {
                            const batch = db.batch();
                            const pms = db.collection("processing_master");

                            for (let line of lines) {
                                if (!line.trim()) continue;
                                const cols = line.split('\t').map(c => c.trim().replace(/^"|"$/g, ''));

                                if (cols.length >= 3) {
                                    let type, parent, detail;
                                    // 判別：1列目が「エリア」「分類」「カラー」のいずれでもない場合、[エリア, 位置, 方法] と見なす
                                    if (!["エリア", "分類", "カラー"].includes(cols[0])) {
                                        type = "連動";
                                        const area = cols[0], pos = cols[1], method = cols[2];
                                        const docId = `LINK_${area}_${pos}_${method}`;
                                        batch.set(pms.doc(docId), {
                                            type: "連動", area: area, pos: pos, method: method,
                                            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                                        }, { merge: true });
                                    } else {
                                        type = cols[0];
                                        parent = cols[1];
                                        detail = cols[2];
                                        const listArr = detail.split(',').map(x => x.trim()).filter(x => x);
                                        const docId = `${type}_${parent}`;
                                        batch.set(pms.doc(docId), {
                                            type: type, parent: parent, list: listArr,
                                            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                                        }, { merge: true });
                                    }
                                    count++;
                                }
                            }
                            await batch.commit();
                            alert(`${count}件の加工マスタを登録・更新しました。`);
                            document.getElementById('reg_proc_csv').value = "";
                            bootstrap.Modal.getInstance(document.getElementById('procMasterModal')).hide();
                            loadProcessingMaster();
                        } catch (e) { alert("エラー: " + e.message); }
                    } else {
                        alert("DB接続なし");
                    }
                }

                async function loadProcessingMaster() {
                    if (!db) return;
                    try {
                        const snap = await db.collection("processing_master").get();
                        if (snap.empty) return;

                        let newAreas = {}, newCats = {}, newColors = {}, newLinks = {};

                        snap.forEach(doc => {
                            const d = doc.data();
                            if (d.type === "エリア") newAreas[d.parent] = d.list;
                            else if (d.type === "分類") newCats[d.parent] = d.list;
                            else if (d.type === "カラー") newColors[d.parent] = d.list;
                            else if (d.type === "連動") {
                                const { area, pos, method } = d;
                                if (!newLinks[area]) newLinks[area] = {};
                                if (!newLinks[area][pos]) newLinks[area][pos] = [];
                                if (!newLinks[area][pos].includes(method)) newLinks[area][pos].push(method);

                                // エリアリストや位置リストも自動補完
                                if (!newAreas[area]) newAreas[area] = [];
                                if (!newAreas[area].includes(pos)) newAreas[area].push(pos);
                            }
                        });

                        if (Object.keys(newAreas).length > 0) PROC_AREAS = newAreas;
                        if (Object.keys(newCats).length > 0) PROC_CATS = newCats;
                        if (Object.keys(newColors).length > 0) Object.assign(COLOR_MASTERS, newColors);
                        if (Object.keys(newLinks).length > 0) PROC_LINKS = newLinks;

                        if (typeof initProcModalDropdowns === "function") initProcModalDropdowns();
                    } catch (e) { console.error("loadProcessingMaster error:", e); }
                }


                async function saveCustomerCsv() {
                    const fileInput = document.getElementById('customerCsvFile');
                    const file = fileInput.files[0];
                    if (!file) return alert("CSVファイルを選択してください");
                    const reader = new FileReader();
                    reader.readAsText(file);
                    reader.onload = async (e) => {
                        const text = e.target.result;
                        const lines = text.split(/\r\n|\n/);
                        let count = 0;
                        for (let line of lines) {
                            const lineTrim = line.trim();
                            if (!lineTrim) continue;

                            // カンマまたはタブで分割
                            const cols = lineTrim.includes('\t') ? lineTrim.split('\t') : lineTrim.split(',');
                            const c = cols.map(raw => raw.trim().replace(/^"|"$/g, ''));

                            if (c.length >= 2) {
                                const id = c[0];
                                if (id && id !== "ID" && db) {
                                    try {
                                        const cData = {
                                            id: id,
                                            customer: c[1] || "",
                                            manager: c[2] || "",
                                            email: c[3] || "",
                                            pass: c[4] || "",
                                            folderUrlStandard: c[5] || "",    // F: 過去デザイン (加工指示書)
                                            pdfFullSub: c[6] || "",           // G: 昇華デザイン画 (フル昇華指示)
                                            gasUrlStandard: c[7] || "",       // H: 指示書PDF (ダウンロードURL)
                                            gasUrlFullSub: c[8] || "",        // I: フル昇華専用GASURL

                                            // 互換性維持
                                            pdfFullSubDesign: c[6] || "",     // G
                                            pdf: c[5] || "",                  // F (legacy folder)
                                            gasUrl: c[7] || "",               // H (legacy gas)
                                            isAdmin: id === "admin"
                                        };
                                        console.log("Saving row:", id, cData);
                                        await db.collection("customers").doc(id).set(cData);
                                        count++;
                                    } catch (err) {
                                        console.error("Save error for ID " + id, err);
                                    }
                                }
                            }
                        }
                        alert(count + "件の顧客データを登録しました");
                        bootstrap.Modal.getInstance(document.getElementById('customerCsvModal')).hide();
                        fileInput.value = "";
                    };
                }

                function downloadAllDataCsv() {
                    if (!adminOrdersCache || adminOrdersCache.length === 0) return alert("データがありません");
                    let csv = "ID,物件名,顧客名,発注日,納期,ステータス\n";
                    adminOrdersCache.forEach(o => {
                        csv += `${o.orderId},${o.team},${o.customerName},${o.orderDate},${o.deliveryDate},${o.status}\n`;
                    });
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'all_orders.csv';
                    a.click();
                }
                function exportToCsv() { downloadAllDataCsv(); }
                function openFullSubForm() {
                    showScreen('formScreen'); editingDocId = null; window.currentParentOrderId = null; document.body.classList.remove('add-mode');
                    applyModeUI(true);
                    const u = window.currentUser;
                    document.getElementById('customerName').value = (u && u.isAdmin) ? "" : (u ? u.customer : "");
                    document.getElementById('managerName').value = (u && u.isAdmin) ? "" : (u ? u.manager : "");
                    document.getElementById('rightPanelProductList').innerHTML = '<div class="text-center text-muted small py-3">アイテムが登録されていません</div>';
                    document.getElementById('rightPanelPlayerList').innerHTML = '<tr><td colspan="4" class="text-muted py-3">登録なし</td></tr>';
                    const ts = document.getElementById('orderType'); if (ts) { ts.value = "新規"; ts.disabled = false }
                    document.getElementById('teamName').value = "";
                    setText('orderId', generateId());
                    document.getElementById('orderDate').value = getLocalDateString(new Date());
                    updateDeliveryDate();
                    productList = []; procList = []; playerList = [];
                    updateRightPanel();
                    clearPdf();
                    if (dataFolderUrl) document.getElementById('pdfUrlInput').value = dataFolderUrl;
                }

                function openNewForm() {
                    showScreen('formScreen'); editingDocId = null; window.currentParentOrderId = null; document.body.classList.remove('add-mode');
                    applyModeUI(false);
                    const u = window.currentUser;
                    document.getElementById('rightPanelProductList').innerHTML = '<div class="text-center text-muted small py-3">商品が登録されていません</div>';
                    document.getElementById('rightPanelProcList').innerHTML = '<div class="text-center text-muted small py-3">加工なし</div>';
                    document.getElementById('rightPanelPlayerList').innerHTML = '<tr><td colspan="4" class="text-muted py-3">登録なし</td></tr>';
                    const pc = document.getElementById('productContent'); if (pc) { pc.style.display = 'block'; pc.value = 'ZO商品' }
                    const ts = document.getElementById('orderType'); if (ts) { ts.value = "新規"; ts.disabled = false }
                    if (typeof initSportDropdown === "function") initSportDropdown();
                    const ss = document.getElementById('sportType'); if (ss && typeof updateProductList === "function") ss.onchange = updateProductList;
                    document.getElementById('teamName').value = "";
                    setText('orderId', generateId());
                    document.getElementById('orderDate').value = getLocalDateString(new Date());
                    isFullSubMode = false;
                    updateDeliveryDate();
                    productList = []; procList = []; playerList = [];
                    updateRightPanel();
                    clearPdf();
                    if (dataFolderUrl) document.getElementById('pdfUrlInput').value = dataFolderUrl;
                }

                function updateDeliveryDate() {
                    const orderDateVal = document.getElementById('orderDate').value;
                    const startDate = new Date(orderDateVal);

                    // 標準納期(10日)の計算
                    let stdDate = new Date(startDate);
                    let addedStd = 0;
                    while (addedStd < LEAD_DAYS_STANDARD) {
                        stdDate.setDate(stdDate.getDate() + 1);
                        if (!isHoliday(stdDate)) addedStd++;
                    }
                    const stdStr = stdDate.toISOString().split('T')[0];

                    // フル昇華納期(18日)の計算
                    let fullDate = new Date(startDate);
                    let addedFull = 0;
                    while (addedFull < LEAD_DAYS_FULLSUB) {
                        fullDate.setDate(fullDate.getDate() + 1);
                        if (!isHoliday(fullDate)) addedFull++;
                    }
                    const fullStr = fullDate.toISOString().split('T')[0];

                    // 入力欄への反映
                    document.getElementById('deliveryDate').value = isFullSubMode ? fullStr : stdStr;

                    // カレンダーの再描画（マーク付き）
                    initCalendar(stdStr, fullStr);

                    checkDeliveryDate();
                }

                function checkDeliveryDate() { const o = new Date(document.getElementById('orderDate').value), d = new Date(document.getElementById('deliveryDate').value), diff = Math.ceil((d - o) / 86400000); document.getElementById('deliveryWarning').innerText = diff < 7 ? "※納期1週間未満：特急料金が発生します" : (diff < 14 ? "※通常納期より短くなっています" : "") }

                function updateColorInputs() {
                    const c = document.getElementById('dynamicColorContainer'); if (!c) return;
                    const cat = document.getElementById('m_cat').value, met = document.getElementById('m_method').value, cnt = document.getElementById('m_count').value, ind = document.getElementById('m_color_individual').checked;
                    let mk = met; if (met === "水性プリント") mk = "プリント"; const opts = COLOR_MASTERS[mk] || COLOR_MASTERS[cat] || COLOR_MASTERS["プリント"] || ["ホワイト", "ブラック"]; let h = "";
                    if (cnt === "pattern") {
                        h += `<div class="mb-3 p-3 bg-white border rounded shadow-sm"><label class="small fw-bold text-primary"><i class="fas fa-layer-group me-1"></i>柄パターンの総数</label><input type="number" id="m_pattern_num" class="form-control form-control-sm" value="1" min="1" oninput="updateColorInputs()"><small class="text-muted" style="font-size:0.7rem;">※全色合わせて何種類のデザインがあるか入力してください</small></div>`;
                        const pn = parseInt(document.getElementById('m_pattern_num')?.value || 1), sc = [...new Set(productList.map(p => p.color))];
                        if (ind && sc.length > 0) { sc.forEach(s => { h += `<div class="mb-3 p-2 border rounded bg-white shadow-sm"><div class="small fw-bold mb-1"><i class="fas fa-tshirt me-1"></i>本体：${s}</div><select class="form-select form-select-sm m-color-input" data-body-color="${s}"><option value="">デザインを選択</option>`; for (let i = 1; i <= pn; i++)h += `<option value="デザイン${i}">デザイン${i}</option>`; h += `</select></div>` }) } else h += `<div class="alert alert-info p-2 small">柄パターンの場合は「本体色ごとに指定」をONにしてください。</div>`;
                    } else {
                        const cn = parseInt(cnt) || 1, sc = [...new Set(productList.map(p => p.color))];
                        if (ind && sc.length > 0) { sc.forEach(s => { h += `<div class="mb-3 p-2 border rounded bg-white shadow-sm"><div class="small fw-bold mb-1"><i class="fas fa-tshirt me-1"></i>本体：${s}</div>`; for (let i = 1; i <= cn; i++) { h += `<select class="form-select form-select-sm m-color-input mb-1" data-body-color="${s}"><option value="">カラーを選択</option>${opts.map(o => `<option value="${o}">${o}</option>`).join('')}</select>` } h += `</div>` }) } else { for (let i = 1; i <= cn; i++)h += `<div class="mb-2"><select class="form-select form-select-sm m-color-input"><option value="">カラーを選択</option>${opts.map(o => `<option value="${o}">${o}</option>`).join('')}</select></div>` }
                    } c.innerHTML = h;
                }

                function openSearchModal() {
                    editingProductIndex = -1;
                    const modalEl = document.getElementById('itemSearchModal');
                    const modal = new bootstrap.Modal(modalEl);

                    // ヘッダータイトルの強制更新 (目印として更新時刻を追加)
                    const header = modalEl.querySelector('.modal-header h6');
                    if (header) header.innerText = "商品選択 (更新: " + new Date().toLocaleTimeString() + " - 品番優先版)";

                    // すべてのドロップダウンを初期化
                    updateAllModalSelects();

                    const sInput = document.getElementById('modalSearchInput');
                    if (sInput) sInput.value = "";
                    
                    const titleEl = document.getElementById('selectedItemTitle');
                    if (titleEl) titleEl.innerText = "未選択";
                    const area = document.getElementById('modalInputArea');
                    if (area) area.innerHTML = "";

                    renderModalList();
                    modal.show();
                }

                function filterModalItems() {
                    const makerEl = document.getElementById('modalMakerSelect');
                    const catEl = document.getElementById('modalCategorySelect');
                    const nameEl = document.getElementById('modalNameSelect');
                    const noEl = document.getElementById('modalNoSelect');
                    const searchEl = document.getElementById('modalSearchInput');

                    if (!makerEl || !catEl || !nameEl || !noEl || !searchEl) return;

                    const maker = makerEl.value;
                    const cat = catEl.value;
                    const name = nameEl.value;
                    const noValue = noEl.value;
                    const keyword = searchEl.value.toLowerCase();

                    // 現在の選択条件に一致する商品を抽出
                    const d = itemMasterData.filter(i => {
                        const matchMaker = !maker || i.メーカー === maker;
                        const matchCat = !cat || i.商品 === cat || i.カテゴリ === cat;
                        const matchName = !name || i.商品名 === name;
                        const matchNo = !noValue || i.品番 === noValue;
                        const kVal = ((i.メーカー || "") + " " + (i.商品 || "") + " " + (i.カテゴリ || "") + " " + (i.商品名 || "") + " " + (i.品番 || "")).toLowerCase();
                        const matchK = !keyword || kVal.includes(keyword);
                        return matchMaker && matchCat && matchName && matchNo && matchK;
                    });

                    // 選択肢の動的更新 (連動)
                    // 他の項目が選ばれている場合、残りのドロップダウンの選択肢を絞り込む
                    if (maker || cat || name || noValue) {
                        // 候補の中から再度リストを生成
                        if (!maker) {
                            const makers = [...new Set(d.map(i => i.メーカー).filter(Boolean))].sort();
                            makerEl.innerHTML = '<option value="">すべて</option>' + makers.map(m => `<option value="${m}">${m}</option>`).join('');
                        }
                        if (!cat) {
                            const cats = [...new Set(d.map(i => i.カテゴリ || i.商品).filter(Boolean))].sort();
                            catEl.innerHTML = '<option value="">すべて</option>' + cats.map(c => `<option value="${c}">${c}</option>`).join('');
                        }
                        if (!name) {
                            const names = [...new Set(d.map(i => i.商品名 || i.商品).filter(Boolean))].sort();
                            nameEl.innerHTML = '<option value="">すべて</option>' + names.map(n => `<option value="${n}">${n}</option>`).join('');
                        }
                        if (!noValue) {
                            const nos = [...new Set(d.map(i => i.品番).filter(Boolean))].sort();
                            noEl.innerHTML = '<option value="">すべて</option>' + nos.map(n => `<option value="${n}">${n}</option>`).join('');
                        }
                    } else if (!keyword) {
                        // 何も選択・入力されていない場合は全リストを復元
                        updateAllModalSelects();
                    }

                    renderModalList(d);
                }

                function updateAllModalSelects() {
                    const makers = [...new Set(itemMasterData.map(i => i.メーカー).filter(Boolean))].sort();
                    document.getElementById('modalMakerSelect').innerHTML = '<option value="">すべて</option>' + makers.map(m => `<option value="${m}">${m}</option>`).join('');
                    
                    // 固定リストではなく、常に最新のデータに含まれる「カテゴリ」を自動抽出
                    const catsFromData = [...new Set(itemMasterData.map(i => i.カテゴリ || i.商品).filter(Boolean))].sort();
                    document.getElementById('modalCategorySelect').innerHTML = '<option value="">すべて</option>' + catsFromData.map(c => `<option value="${c}">${c}</option>`).join('');

                    const nos = [...new Set(itemMasterData.map(i => i.品番).filter(Boolean))].sort();
                    document.getElementById('modalNoSelect').innerHTML = '<option value="">すべて</option>' + nos.map(n => `<option value="${n}">${n}</option>`).join('');

                    const names = [...new Set(itemMasterData.map(i => i.商品名).filter(Boolean))].sort();
                    document.getElementById('modalNameSelect').innerHTML = '<option value="">すべて</option>' + names.map(n => `<option value="${n}">${n}</option>`).join('');
                }

                function renderModalList(d = itemMasterData) {
                    const container = document.getElementById('modalItemListContainer');
                    if (d.length === 0) {
                        container.innerHTML = '<div class="p-3 text-center text-muted small">一致する商品がありません</div>';
                        return;
                    }
                    container.innerHTML = d.filter(i => i.品番 !== "品番" && i.品番 !== "P-No" && i.メーカー !== "メーカー").map(i => {
                        const no = i.品番 || '-';
                        const pName = i.商品名 || "";
                        const category = i.カテゴリ || i.商品 || "";
                        const maker = i.メーカー || '-';
                        
                        return `
                        <div class="p-2 border-bottom pointer modal-item-row" onclick="selectModalItem('${i.品番}')">
                            <div class="d-flex justify-content-between align-items-center mb-0">
                                 <div class="h6 fw-bold text-dark m-0" style="font-size:1.1rem;">${no}</div>
                            </div>
                            <div class="mt-1">
                                <div class="small fw-bold text-muted text-truncate" style="font-size:0.85rem;" title="${pName}">${pName || "名称未設定"}</div>
                                <div class="text-muted" style="font-size:0.7rem; opacity:0.8;">${maker} / ${category || '-'}</div>
                            </div>
                        </div>
                    `;
                    }).join('');
                }

                function selectModalItem(n) {
                    selectedModalItem = itemMasterData.find(i => i.品番 === n);
                    if (!selectedModalItem) return;

                    const titleEl = document.getElementById('selectedItemTitle') || document.querySelector('#selectedItemTitle');
                    if (titleEl) {
                        // 2列目(カテゴリ)と4列目(商品名)を厳密に区別
                        const prodName = selectedModalItem.商品名 || "";
                        const catTitle = selectedModalItem.カテゴリ || selectedModalItem.商品 || "";
                        const makerName = selectedModalItem.メーカー || '-';
                        const itemNo = selectedModalItem.品番;
                        
                        // リクエスト通り「品番_商品名」の形式で表示
                        const fullDisplayTitle = prodName ? `${itemNo}_${prodName}` : itemNo;
                        
                        titleEl.innerHTML = `
                            <div class="h5 m-0 fw-bold" style="color:#fff;">${fullDisplayTitle}</div>
                            <div style="font-size:0.75rem; opacity:0.9; color:#fff;" class="font-monospace">
                                ${catTitle ? `カテゴリ: ${catTitle} / ` : ''}メーカー: ${makerName}
                            </div>
                        `;
                    }

                    document.getElementById('modalInputArea').innerHTML = '';
                    addModalColorRow();
                }
                function addModalColorRow() { if (!selectedModalItem) return; const c = (selectedModalItem["カラー(カンマ区切り)"] || "白,黒").split(','), s = (selectedModalItem["サイズ(カンマ区切り)"] || "S,M,L").split(','); let th = s.map(z => `<div class="size-tile-item"><div class="size-tile-head">${z.trim()}</div><input type="number" class="size-tile-input modal-qty-in" data-size="${z.trim()}" value="" placeholder="0" min="0"></div>`).join(''); const d = document.createElement('div'); d.className = 'color-block'; d.innerHTML = `<div class="d-flex justify-content-between mb-2"><select class="form-select form-select-sm modal-color-select" style="width:70%">${c.map(k => `<option>${k.trim()}</option>`).join('')}</select><button class="btn btn-outline-danger btn-sm" onclick="this.closest('.color-block').remove()">削除</button></div><div class="d-flex flex-wrap">${th}</div>`; document.getElementById('modalInputArea').appendChild(d) }

                function addProductFromModal() {
                    if (!selectedModalItem) return alert("選択してください");
                    let ni = [];
                    document.querySelectorAll('.color-block').forEach(b => {
                        const c = b.querySelector('.modal-color-select').value, inp = b.querySelectorAll('.modal-qty-in');
                        let q = {}, hq = false;
                        inp.forEach(i => { const v = parseInt(i.value) || 0; if (v > 0) { q[i.dataset.size] = v; hq = true } });
                        if (hq) ni.push({ no: selectedModalItem.品番, name: selectedModalItem.商品名, color: c, quantities: q })
                    });
                    if (editingProductIndex >= 0) {
                        productList[editingProductIndex] = ni[0];
                        editingProductIndex = -1
                    } else {
                        ni.forEach(i => productList.push(i))
                    }
                    updateRightPanel();
                    bootstrap.Modal.getInstance(document.getElementById('itemSearchModal')).hide()
                }

                function updateRightPanel() {
                    const prodContainer = document.getElementById('rightPanelProductList');
                    if (productList.length === 0) {
                        prodContainer.innerHTML = '<div class="text-center text-muted small py-3">登録されていません</div>';
                    } else {
                        let html = "";
                        let total = 0;
                        productList.forEach((p, index) => {
                            let subTotal = 0;
                            let details = "";
                            Object.entries(p.quantities).forEach(([size, qty]) => {
                                subTotal += qty;
                                details += `<span class="me-2">${size}:${qty}</span>`;
                            });
                            total += subTotal;

                            html += `
                <div class="border-bottom pb-2 mb-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="badge bg-primary me-1">${index + 1}</span>
                            <span class="large-text">${p.no} / ${p.name} / ${p.color}</span>
                            ${p.fabric ? `<span class="ms-2 badge bg-light text-dark border">${p.fabric}</span>` : ''}
                            ${p.url ? `<a href="${p.url}" target="_blank" class="ms-1 btn btn-link btn-sm p-0" title="写真を確認"><i class="fas fa-image text-info"></i></a>` : ''}
                        </div>
                        <div class="text-end">
                            <button class="btn btn-link btn-sm p-0 text-primary me-2" onclick="editProduct(${index})"><i class="fas fa-edit"></i></button>
                            <button class="btn btn-link btn-sm p-0 text-danger" onclick="removeProduct(${index})"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                    <div class="mt-1" style="font-size:1rem; font-weight:bold; color:#555;">${details} <span class="ms-2 text-primary">小計:${subTotal}</span></div>
                </div>`;
                        });
                        prodContainer.innerHTML = html;
                        const totalBadge = document.getElementById('totalQty');
                        if (totalBadge) totalBadge.innerText = total + "枚";
                    }

                    const procContainer = document.getElementById('rightPanelProcList');
                    if (procList.length === 0) {
                        procContainer.innerHTML = '<div class="text-center text-muted small py-3">加工なし</div>';
                    } else {
                        let html = "";
                        procList.forEach((p, i) => {
                            html += `
                <div class="d-flex justify-content-between align-items-center border-bottom py-1">
                    <div>
                        <span class="badge bg-secondary me-1">${p.pos}</span>
                        <strong>${p.method}</strong>
                        <span class="ms-2 text-danger small">${p.color}</span>
                    </div>
                    <button class="btn btn-link btn-sm text-danger p-0" onclick="removeProc(${i})"><i class="fas fa-trash"></i></button>
                </div>`;
                        });
                        procContainer.innerHTML = html;
                    }

                    const playerContainer = document.getElementById('rightPanelPlayerList');
                    playerContainer.innerHTML = "";

                    let totalCount = productList.reduce((acc, p) => acc + Object.values(p.quantities).reduce((a, b) => a + b, 0), 0);
                    if (totalCount < 12) totalCount = 12; // 最低12行

                    for (let i = 0; i < totalCount; i++) {
                        const p = playerList[i] || { num: '', name: '', info: '' };
                        let size = "";
                        if (p.info) {
                            size = p.info.split('/')[1] ? p.info.split('/')[1].trim() : "";
                        }

                        const rowHtml = `
            <tr>
                <td class="align-middle">${i + 1}</td>
                <td class="p-0"><input type="text" class="table-input" value="${size}" placeholder="サイズ" onchange="updatePlayerInfo(${i}, 'size', this.value)"></td>
                <td class="p-0"><input type="text" class="table-input p-num" value="${p.num}" placeholder="番号" onchange="updatePlayerInfo(${i}, 'num', this.value)"></td>
                <td class="p-0"><input type="text" class="table-input p-name" value="${p.name}" placeholder="名前" onchange="updatePlayerInfo(${i}, 'name', this.value)"></td>
            </tr>`;
                        playerContainer.insertAdjacentHTML('beforeend', rowHtml);
                    }
                }

                function updatePlayerInfo(index, field, value) {
                    if (!playerList[index]) playerList[index] = { num: '', name: '', info: '' };

                    if (field === 'num') playerList[index].num = value;
                    if (field === 'name') playerList[index].name = value;
                    if (field === 'size') {
                        let currentInfo = playerList[index].info || "";
                        let parts = currentInfo.split('/');
                        let sku = parts[0] ? parts[0].trim() : "";
                        playerList[index].info = sku + " / " + value;
                    }
                }

                function removeProduct(index) {
                    productList.splice(index, 1);
                    updateRightPanel();
                }

                function applyPasteData() {
                    const txt = document.getElementById('unifiedPasteArea').value;
                    if (!txt) return;
                    const rows = txt.trim().split(/\r?\n/);

                    let importedCount = 0;
                    let targetIdx = 0;

                    rows.forEach((row, i) => {
                        const ln = row.trim();
                        if (!ln) return;
                        // ヘッダー判定 (品番, サイズ, 番号, 名前などの文字列が含まれる行はデータではない可能性が高い)
                        if (i <= 1 && (ln.includes("品番") || ln.includes("サイズ") || ln.includes("番号") || ln.includes("名前"))) return;

                        // 各種区切り文字に対応
                        let cols = ln.split(/\t|,|\s{2,}/);
                        if (cols.length < 2) cols = ln.split(/\s+/); // 1つ以上の半角/全角スペース

                        if (cols.length < 2) return;

                        if (!playerList[targetIdx]) {
                            playerList[targetIdx] = { num: '', name: '', info: '' };
                        }

                        // 列の割り当て判定 (品番が含まれているかどうかで分岐)
                        let skuInCol0 = cols[0].includes('_') || cols[0].match(/^[A-Z]{2,}/); // 品番っぽい文字列か判定

                        if (cols.length >= 4 || (cols.length === 3 && skuInCol0)) {
                            // [品番, サイズ, 番号, 名前] または [品番, サイズ, 番号]
                            let s_idx = 1, n_idx = 2, nm_idx = 3;
                            updatePlayerInfo(targetIdx, 'size', cols[s_idx].trim());
                            playerList[targetIdx].num = cols[n_idx]?.trim() || "";
                            playerList[targetIdx].name = cols[nm_idx]?.trim() || "";
                        } else if (cols.length === 3) {
                            // [サイズ, 番号, 名前]
                            updatePlayerInfo(targetIdx, 'size', cols[0].trim());
                            playerList[targetIdx].num = cols[1].trim();
                            playerList[targetIdx].name = cols[2].trim();
                        } else {
                            // [番号, 名前] または [サイズ, 番号]
                            // 番号が先かサイズが先か判定するのは難しいため、一旦従来通り 番号, 名前 とする
                            playerList[targetIdx].num = cols[0].trim();
                            playerList[targetIdx].name = cols[1].trim();
                        }
                        targetIdx++;
                        importedCount++;
                    });
                    updateRightPanel();
                    alert(`${importedCount}件、リストに反映しました。`);
                }

                function openProcSidebar() {
                    try {
                        const el = document.getElementById('procOffcanvas');
                        if (!el) return;

                        // アイテム入力が開いていれば閉じる (getInstanceを使って確実に止める)
                        const itemNode = document.getElementById('itemInputSidebar');
                        if (itemNode) {
                            const itemInst = bootstrap.Offcanvas.getInstance(itemNode);
                            if (itemInst) itemInst.hide();
                        }

                        el.classList.remove('sidebar-pink');
                        el.classList.add('sidebar-green');

                        let instance = bootstrap.Offcanvas.getInstance(el);
                        if (!instance) instance = new bootstrap.Offcanvas(el);

                        // フィルタの初期化
                        const af = document.getElementById('procAreaFilter');
                        if (af) {
                            af.innerHTML = '<option value="">すべて</option>';
                            Object.keys(PROC_AREAS).forEach(k => af.appendChild(new Option(k, k)));
                            af.value = "";
                        }
                        const pf = document.getElementById('procPosFilter');
                        if (pf) pf.innerHTML = '<option value="">すべて</option>';

                        ['m_area', 'm_cat', 'm_method'].forEach(i => { const d = document.getElementById(i); if (d) d.value = "" });
                        const pEl = document.getElementById('m_pos'); if (pEl) pEl.innerHTML = '<option value="">選択</option>';
                        const searchIn = document.getElementById('procSearchInput');
                        if (searchIn) searchIn.value = "";

                        renderQuickProcList();

                        instance.show();
                    } catch (e) { console.error("openProcSidebar error:", e); }
                }

                function onAreaFilterChange() {
                    const area = document.getElementById('procAreaFilter').value;
                    const pf = document.getElementById('procPosFilter');
                    if (pf) {
                        pf.innerHTML = '<option value="">すべて</option>';
                        if (area && PROC_AREAS[area]) {
                            PROC_AREAS[area].forEach(p => pf.appendChild(new Option(p, p)));
                        }
                    }
                    filterQuickProc();
                }

                function filterQuickProc() {
                    // renderQuickProcList を再呼出することで確実なフィルタリングを行う
                    renderQuickProcList();
                }

                function renderQuickProcList() {
                    const container = document.getElementById('quickProcContainer');
                    const areaFilter = document.getElementById('procAreaFilter').value;
                    const posFilter = document.getElementById('procPosFilter').value;
                    const keyword = document.getElementById('procSearchInput').value.toLowerCase();
                    if (!container) return;
                    container.innerHTML = "";

                    let matches = [];
                    Object.keys(PROC_LINKS).forEach(area => {
                        if (!areaFilter || area === areaFilter) {
                            Object.keys(PROC_LINKS[area]).forEach(pos => {
                                if (!posFilter || pos === posFilter) {
                                    PROC_LINKS[area][pos].forEach(method => {
                                        if (!keyword || pos.toLowerCase().includes(keyword) || method.toLowerCase().includes(keyword)) {
                                            matches.push({ area, pos, method });
                                        }
                                    });
                                }
                            });
                        }
                    });

                    if (matches.length === 0) {
                        container.innerHTML = '<div class="p-3 text-center text-muted small">一致する加工パターンがありません。</div>';
                        document.getElementById('quickProcCount').innerText = 0;
                        return;
                    }

                    document.getElementById('quickProcCount').innerText = matches.length;
                    matches.forEach(item => {
                        const btn = document.createElement('button');
                        btn.className = "list-group-item list-group-item-action p-3 d-flex justify-content-between align-items-center quick-item shadow-sm mb-1 rounded";
                        btn.style.fontSize = "1.1rem";
                        btn.innerHTML = `<div><span class="badge bg-primary me-2 area-badge" style="font-size:0.85rem;">${item.area}</span><span class="fw-bold">${item.pos}</span><br><span class="text-primary ms-4" style="font-size:1rem;">${item.method}</span></div><i class="fas fa-plus-circle text-muted fs-4"></i>`;
                        btn.onclick = () => quickAddProc(item);
                        container.appendChild(btn);
                    });
                }

                function filterQuickProc() {
                    // renderQuickProcList を再呼出することで確実なフィルタリングを行う
                    renderQuickProcList();
                }

                function quickAddProc(item) {
                    // デフォルト 1色、色替無で即時追加
                    procList.push({ area: item.area, pos: item.pos, method: item.method, count: '1', color: '' });
                    updateRightPanel();
                    // 完了フィードバック（一瞬背景を変えるなどの代わりにトーストもどき）
                    alert(`追加しました: ${item.pos} / ${item.method}`);
                }

                function addEriTag() {
                    const exists = procList.some(p => p.pos === '襟タグ'); if (exists) return; procList.push({ area: 'オプション', pos: '襟タグ', method: '有', count: '1', color: '' }); updateRightPanel();
                }
                function removeEriTag() {
                    const idx = procList.findIndex(p => p.pos === '襟タグ'); if (idx > -1) {
                        procList.splice(idx, 1); updateRightPanel();
                    }
                }
                function addProcFromSidebar() {
                    const a = document.getElementById('m_area').value, p = document.getElementById('m_pos').value, m = document.getElementById('m_method').value, c = document.getElementById('m_count').value;
                    if (!a || !p || !m) { alert("必須項目不足"); return }
                    let cd = ""; document.querySelectorAll('.m-color-input').forEach(i => { if (i.value) cd += (i.dataset.bodyColor ? i.dataset.bodyColor + '➜' : '') + i.value + " " });
                    procList.push({ area: a, pos: p, method: m, count: c, color: cd });
                    updateRightPanel();
                    bootstrap.Offcanvas.getInstance(document.getElementById('procOffcanvas'))?.hide();
                }

                function removeProc(i) { procList.splice(i, 1); updateRightPanel(); }

                function openItemInputSidebar(forCarryIn = false) {
                    const el = document.getElementById('itemInputSidebar');
                    if (!el) return;

                    // 加工内容が開いていれば閉じる
                    const procNode = document.getElementById('procOffcanvas');
                    if (procNode) {
                        const procInst = bootstrap.Offcanvas.getInstance(procNode);
                        if (procInst) procInst.hide();
                    }

                    if (forCarryIn) {
                        el.classList.remove('sidebar-blue');
                        el.classList.add('sidebar-pink');
                    } else {
                        el.classList.remove('sidebar-pink');
                        el.classList.add('sidebar-blue'); // Default blue
                    }

                    const u = window.currentUser || {};
                    const isSL = u.isAdmin || (u.customer && u.customer.includes("サザンラガー"));

                    document.getElementById('sb_name').value = "";
                    document.getElementById('sb_name').readOnly = forCarryIn ? true : false;
                    document.getElementById('sb_product_name').value = "";
                    document.getElementById('sb_product_name').readOnly = false;
                    document.getElementById('sb_pattern').value = "";
                    document.getElementById('sz_xl').checked = true;
                    updateSizeGridLabels();
                    document.getElementById('sb_draft_area').value = "品番\tサイズ\t番号\t名前";
                    document.getElementById('sb_edit_index').value = "";
                    document.querySelectorAll('.sb-qty').forEach(q => q.value = "");
                    document.getElementById('sb-total-display').innerText = "0";

                    let useFreeInput = forCarryIn;
                    const sbNameRow = document.getElementById('sbNameRow');
                    if (sbNameRow) sbNameRow.style.display = useFreeInput ? 'none' : 'block';
                    const sbProductNameRow = document.getElementById('sbProductNameRow');
                    if (sbProductNameRow) sbProductNameRow.style.display = useFreeInput ? 'block' : 'none';

                    const sbPattern = document.getElementById('sb_pattern');
                    const netSearchBtn = document.getElementById('sb_search_net_btn');
                    const sbUrlRow = document.getElementById('sbItemUrlRow');
                    if (sbPattern) {
                        const allowManualSku = forCarryIn || (isFullSubMode && !isSL);
                        if (allowManualSku) {
                            sbPattern.readOnly = false;
                            sbPattern.classList.remove('bg-light');
                            if (netSearchBtn) netSearchBtn.style.display = 'block';
                            if (sbUrlRow) sbUrlRow.style.display = 'block';
                        } else {
                            sbPattern.readOnly = true;
                            sbPattern.classList.add('bg-light');
                            if (netSearchBtn) netSearchBtn.style.display = 'none';
                            if (sbUrlRow) sbUrlRow.style.display = 'none';
                        }
                    }

                    const fabrics = isSL ? [...SOUTHERN_LAGER_FABRICS, ...FABRIC_MASTER] : FABRIC_MASTER;
                    const sbFabric = document.getElementById('sb_fabric');
                    if (sbFabric) sbFabric.innerHTML = '<option value="">選択してください</option>' + fabrics.map(f => `<option value="${f}">${f}</option>`).join('');

                    const sbFabricRow = document.getElementById('sbFabricRow');
                    if (sbFabricRow) sbFabricRow.style.display = (isFullSubMode || (forCarryIn === false && !isSL)) ? 'block' : 'none';

                    let instance = bootstrap.Offcanvas.getInstance(el);
                    if (!instance) instance = new bootstrap.Offcanvas(el);
                    instance.show();
                }

                function onSbPatternInput() {
                    const pattern = document.getElementById('sb_pattern').value.trim();
                    const nameInput = document.getElementById('sb_product_name'); // 持ち降ろし用
                    
                    // まず商品マスタを検索
                    const resolved = resolveProductInfo(pattern);
                    if (resolved && resolved.price > 0 && nameInput) {
                        nameInput.value = resolved.name;
                        nameInput.classList.add('bg-success-light');
                        setTimeout(() => nameInput.classList.remove('bg-success-light'), 1000);
                    }
                    syncDraftData();
                }

                function openNetSearch() {
                    const pattern = document.getElementById('sb_pattern').value.trim();
                    if (!pattern) return alert("品番を入力してください");
                    
                    const btn = document.getElementById('sb_search_net_btn');
                    const originalHtml = btn ? btn.innerHTML : "";
                    if (btn) {
                        btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span><span style="font-size:0.7rem">自動取得中</span>';
                        btn.disabled = true;
                    }
                    
                    searchNetProductName(pattern).then(found => {
                        if (btn) {
                            btn.innerHTML = originalHtml || '<i class="fas fa-search me-1"></i><span style="font-size:0.7rem">ネット検索</span>';
                            btn.disabled = false;
                        }
                        if (!found) {
                            // 見つからなかった場合はポップアップブロック対策としてダイアログを表示
                            const query = encodeURIComponent(pattern);
                            const searchUrl = `https://www.google.com/search?q=${query}+商品名`;
                            
                            const fallbackHtml = `
                                <div class="modal fade" id="fallbackSearchModal" tabindex="-1">
                                    <div class="modal-dialog">
                                        <div class="modal-content border-0 shadow-lg">
                                            <div class="modal-header bg-danger text-white p-2">
                                                <h6 class="modal-title mb-0 fw-bold"><i class="fas fa-exclamation-triangle me-2"></i>商品名が見つかりませんでした</h6>
                                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                                            </div>
                                            <div class="modal-body p-3 bg-light">
                                                <p class="small text-dark mb-3 fw-bold">自動取得できませんでした。以下の情報から手動で検索してください。</p>
                                                <div class="mb-2">
                                                    <label class="small text-muted mb-1">■ 品番</label>
                                                    <input type="text" class="form-control mb-2" value="${pattern}" readonly>
                                                </div>
                                                <div class="mb-3">
                                                    <label class="small text-muted mb-1">■ 検索用URL (Google)</label>
                                                    <div class="input-group">
                                                        <input type="text" class="form-control" value="${searchUrl}" readonly>
                                                        <a href="${searchUrl}" target="_blank" class="btn btn-primary fw-bold">検索を開く</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `;
                            const existing = document.getElementById('fallbackSearchModal');
                            if(existing) existing.remove();
                            document.body.insertAdjacentHTML('beforeend', fallbackHtml);
                            new bootstrap.Modal(document.getElementById('fallbackSearchModal')).show();
                        }
                    });
                }

                async function searchNetProductName(no) {
                    try {
                        // 1. まずはGASを使わずに、ブラウザから直接パブリック・プロキシを経由して検索を試みる
                        // これでGASの設定エラーなどに悩まされることなく、商品名と写真を取得できます。
                        const urlsToTry = [
                            `https://jpn.mizuno.com/ec/disp/item/${no}/`,
                            `https://toms-prod.com/item_detail?id=${no}`
                        ];

                        for (const url of urlsToTry) {
                            try {
                                const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
                                const res = await fetch(proxyUrl);
                                if (!res.ok) continue;
                                const data = await res.json();
                                const html = data.contents;
                                
                                const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
                                if (titleMatch && titleMatch[1]) {
                                    let title = titleMatch[1].trim()
                                        .replace(/\|\s*ミズノ公式オンライン/g, "").replace(/通販\s*\|\s*ミズノ公式オンライン/g, "")
                                        .replace(/【.+?】/g, "").replace(/Amazon\.co\.jp\s*:.+/g, "").replace(/楽天市場\s*:.+/g, "")
                                        .replace(/\|.+/g, "").replace(/\s*-.+/g, "").trim();

                                    if (title && title.length > 3) {
                                        // 画像URLもページ内から取得を試みる
                                        let imgUrl = url;
                                        const imgMatch = html.match(/<meta property="og:image"\s*content="([^"]+)"/i);
                                        if (imgMatch && imgMatch[1]) imgUrl = imgMatch[1]; // 写真が見つかればそれをURLとして採用

                                        const nameInput = document.getElementById('sb_product_name');
                                        const urlInput = document.getElementById('sb_item_url');
                                        
                                        if (nameInput) {
                                            nameInput.value = title;
                                            nameInput.classList.add('bg-success-light');
                                            setTimeout(() => nameInput.classList.remove('bg-success-light'), 1000);
                                        }
                                        if (urlInput) {
                                            urlInput.value = imgUrl;                                            
                                        }
                                        syncDraftData();
                                        return true; // 成功したらここで終了
                                    }
                                }
                            } catch(err) { }
                        }
                    } catch(e) { console.error(e); }

                    // 2. ブラウザ単体での検索がすべて失敗した場合のフォールバック (GAS)
                    const gasUrl = "https://script.google.com/macros/s/AKfycbyRPgUr5tbG8X2gF8A_pF1e2NhQhfx4XZKullFVOzDNCt2j24XQrgImGbkqthGpL3FqUQ/exec";
                    
                    try {
                        const res = await fetch(`${gasUrl}?no=${encodeURIComponent(no)}`);
                        if (!res.ok) return false;
                        
                        const data = await res.json();
                        if (data && data.name) {
                            const nameInput = document.getElementById('sb_product_name');
                            const urlInput = document.getElementById('sb_item_url');
                            
                            if (nameInput) {
                                nameInput.value = data.name;
                                nameInput.classList.add('bg-success-light');
                                setTimeout(() => nameInput.classList.remove('bg-success-light'), 1000);
                            }
                            if (urlInput && data.url) {
                                urlInput.value = data.url;
                            }
                            syncDraftData();
                            return true;
                        }
                    } catch(e) {
                        console.error("Net Search Error:", e);
                    }
                    return false;
                }

                // セレクトボックス変更時の連動ロジックを追加 (グローバルに配置)
                window.onItemNameSelectChange = function (textInputId) {
                    const selectEl = document.getElementById(textInputId + '_select');
                    const inputEl = document.getElementById(textInputId);
                    if (!selectEl || !inputEl) return;

                    if (selectEl.value === "手入力") {
                        inputEl.value = "";
                        inputEl.readOnly = false;
                        inputEl.focus();
                    } else {
                        inputEl.value = selectEl.value;
                        inputEl.readOnly = true;
                        if (textInputId === 'sb_name') autoFillPatternNo();
                    }
                }

                function syncDraftData() {
                    const sku = document.getElementById('sb_pattern').value.trim();
                    const sl = document.querySelectorAll('.sb-size'), qi = document.querySelectorAll('.sb-qty');
                    let rows = ["品番\tサイズ\t番号\t名前"];
                    qi.forEach((input, i) => {
                        const val = parseInt(input.value) || 0;
                        if (val > 0) {
                            const size = sl[i].tagName === 'SELECT' ? sl[i].value : sl[i].value;
                            // 指定枚数分、個別に行を生成する (スプシ貼り付け用)
                            for (let n = 0; n < val; n++) {
                                // フォーマット: 品番 [Tab] サイズ [Tab] 番号(空) [Tab] 名前(空)
                                rows.push(`${sku}\t${size}\t\t`);
                            }
                        }
                    });
                    document.getElementById('sb_draft_area').value = rows.join('\n');
                }

                function copyDraftAndOpenTemplate() {
                    const area = document.getElementById('sb_draft_area');
                    if (area.value) {
                        area.select();
                        document.execCommand('copy');
                        alert("下書きデータをコピーしました。テンプレートに貼り付けてください。");
                        area.value = "品番\tサイズ\t番号\t名前"; // ヘッダーのみ残す
                    }
                    openDraftTemplate();
                }

                function openBulkInputFromSidebar() {
                    const inst = bootstrap.Offcanvas.getInstance(document.getElementById('itemInputSidebar'));
                    if (inst) inst.hide();
                    new bootstrap.Offcanvas(document.getElementById('excelImportSidebar')).show();
                }

                function addItemFromSidebar() {
                    const inputVal = document.getElementById('sb_name').value.trim();
                    const patternVal = document.getElementById('sb_pattern').value.trim();
                    const fabricVal = document.getElementById('sb_fabric').value.trim();
                    const editIdx = document.getElementById('sb_edit_index').value;

                    const u = window.currentUser;
                    const isSL = u && (u.isAdmin || (u.customer && u.customer.includes("サザンラガー")));

                    // resolveProductInfoを呼び出す際、入力があればそれを、なければ品番を考慮
                    let resolved = resolveProductInfo(inputVal ? inputVal : patternVal);

                    // 品名で入力されている場合、resolveProductInfoを補完
                    if (isSL && resolved.name === inputVal && resolved.price === 0) {
                        const foundKey = Object.keys(SOUTHERN_LAGER_MASTER).find(k => SOUTHERN_LAGER_MASTER[k].name === inputVal);
                        if (foundKey) resolved = JSON.parse(JSON.stringify(SOUTHERN_LAGER_MASTER[foundKey]));
                    }

                    // サザンラガー以外は sb_product_name の入力値を商品名に使用
                    const productNameInput = document.getElementById('sb_product_name');
                    const directProductName = (!isSL && productNameInput) ? productNameInput.value.trim() : "";

                    const n = directProductName || resolved.name;
                    const skuNo = patternVal || resolved.no; // 型紙品番が手入力されていれば優先

                    if (!n) return alert("商品名を入力してください");
                    if (!skuNo) return alert("品番を入力してください");
                    const sbFabricRow = document.getElementById('sbFabricRow');
                    if (sbFabricRow && sbFabricRow.style.display !== 'none' && !fabricVal) {
                        return alert("生地を選択してください");
                    }
                    let qtys = {}, hasQty = false, sl = document.querySelectorAll('.sb-size'), qi = document.querySelectorAll('.sb-qty');
                    qi.forEach((input, i) => {
                        const val = parseInt(input.value) || 0;
                        if (val > 0) {
                            let sizeName = sl[i].tagName === 'SELECT' ? sl[i].value : sl[i].value;
                            qtys[sizeName] = val;
                            hasQty = true
                        }
                    });
                    if (!hasQty) return alert("数量を入力してください");

                    const urlVal = document.getElementById('sb_item_url').value.trim();
                    const itemData = { no: skuNo, name: n, color: "", fabric: fabricVal, quantities: qtys, price: resolved.price, url: urlVal };

                    if (editIdx !== "") {
                        productList[parseInt(editIdx)] = itemData;
                    } else {
                        productList.push(itemData);
                    }

                    updateRightPanel();
                    const e = document.getElementById('itemInputSidebar'), inst = bootstrap.Offcanvas.getInstance(e);
                    if (inst) inst.hide()
                }

                window.exportPartUrls = function() {
                    if (productList.length === 0) return alert("商品が登録されていません");
                    
                    let txt = "品番\t商品名\tURL\n";
                    productList.forEach(p => {
                        txt += `${p.no}\t${p.name}\t${p.url || ""}\n`;
                    });
                    
                    const exportHtml = `
                        <div class="modal fade" id="exportUrlModal" tabindex="-1">
                            <div class="modal-dialog">
                                <div class="modal-content border-0 shadow-lg">
                                    <div class="modal-header bg-dark text-white p-2">
                                        <h6 class="modal-title mb-0 fw-bold"><i class="fas fa-clipboard-list me-2"></i>品番・URLエクスポート</h6>
                                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div class="modal-body p-3 bg-light">
                                        <p class="small text-muted mb-2"><i class="fas fa-info-circle me-1"></i>以下のテキストをコピーして、エクセルなどに貼り付けてください。</p>
                                        <textarea id="exportUrlTextarea" class="form-control mb-2" rows="10" readonly style="font-family:monospace; font-size:0.85rem;">${txt}</textarea>
                                        <button class="btn btn-primary btn-sm w-100 fw-bold" onclick="navigator.clipboard.writeText(document.getElementById('exportUrlTextarea').value); this.innerText='コピーしました！'; this.classList.replace('btn-primary','btn-success'); setTimeout(()=>{this.innerText='クリップボードにコピー'; this.classList.replace('btn-success','btn-primary');}, 2000);">
                                            <i class="fas fa-copy me-1"></i> クリップボードにコピー
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    
                    const existing = document.getElementById('exportUrlModal');
                    if(existing) existing.remove();
                    document.body.insertAdjacentHTML('beforeend', exportHtml);
                    new bootstrap.Modal(document.getElementById('exportUrlModal')).show();
                };

                function editProduct(index) {
                    const p = productList[index];
                    openItemInputSidebar(); // クリアしてから設定

                    document.getElementById('sb_name').value = p.no; // 品番から検索用
                    document.getElementById('sb_pattern').value = p.no;
                    document.getElementById('sb_fabric').value = p.fabric;
                    document.getElementById('sb_item_url').value = p.url || "";
                    document.getElementById('sb_edit_index').value = index;

                    // 数量を戻す
                    const sl = document.querySelectorAll('.sb-size');
                    const qi = document.querySelectorAll('.sb-qty');
                    qi.forEach((input, i) => {
                        const sizeName = sl[i].tagName === 'SELECT' ? sl[i].value : sl[i].value;
                        if (p.quantities[sizeName]) {
                            input.value = p.quantities[sizeName];
                        }
                    });

                    // 合計計算
                    let t = 0;
                    qi.forEach(q => t += parseInt(q.value || 0));
                    document.getElementById('sb-total-display').innerText = t;
                    syncDraftData();

                    const e = document.getElementById('itemInputSidebar');
                    if (e) bootstrap.Offcanvas.getInstance(e).show();
                }
                document.querySelectorAll('.sb-qty').forEach(el => {
                    el.addEventListener('input', () => {
                        let t = 0;
                        document.querySelectorAll('.sb-qty').forEach(q => t += parseInt(q.value || 0));
                        document.getElementById('sb-total-display').innerText = t;
                        syncDraftData();
                    })
                });

                function openDataFolder() {
                    let inputName = document.getElementById('customerName').value;
                    if (!inputName) inputName = "";
                    inputName = inputName.trim();
                    const cleanName = inputName.replace(/\s+/g, "");

                    const customerLinks = {
                        "GOOスポーツ": "https://drive.google.com/drive/folders/1rhnh-9jQbrj4KbrK-nSZlDU1_55ST4WT",
                        "サザンラガー宮崎": "https://drive.google.com/drive/folders/161FYQ4KiVy4KxXUJQmtUJ4Yi5qydJJ_6"
                    };

                    let targetUrl = "";
                    const currentPdfInput = document.getElementById('pdfUrlInput').value;

                    if (currentPdfInput) {
                        targetUrl = currentPdfInput;
                    } else if (customerLinks[cleanName]) {
                        targetUrl = customerLinks[cleanName];
                    } else {
                        targetUrl = `https://drive.google.com/drive/folders/${ORDER_PDF_FOLDER_ID}`;
                    }

                    window.open(targetUrl, '_blank');
                }

                async function getPrice(customerId, productId) {
                    if (!db) return 0;
                    try {
                        // 1. まず顧客別価格があるか探す
                        const specialDoc = await db.collection('customer_prices')
                            .where('customerId', '==', customerId)
                            .where('productId', '==', productId)
                            .get();

                        if (!specialDoc.empty) {
                            return specialDoc.docs[0].data().specialPrice;
                        }

                        // 2. なければ通常の製品マスターから探す
                        const commonDoc = await db.collection('products').doc(productId).get();
                        return commonDoc.exists ? commonDoc.data().price : 0;
                    } catch (e) {
                        console.error("getPrice error:", e);
                        return 0;
                    }
                }

                function loadDashboard() {
                    const u = window.currentUser; if (!u) return;
                    const ie = document.getElementById('dashboardUserInfo'), hb = document.getElementById('dashboardHeaderButtons'), df = document.getElementById('adminDateFilter');
                    if (hb) {
                        const bb = document.getElementById('combinedBillingBtn'); if (bb) bb.style.display = u.isAdmin ? 'block' : 'none';
                        const as = document.getElementById('adminSortOrder'); if (as) as.style.display = u.isAdmin ? 'block' : 'none';
                        const ac = document.getElementById('adminCustomerFilter'); if (ac) ac.style.display = u.isAdmin ? 'block' : 'none';
                        const sxc = document.getElementById('adminSuffixContainer'); if (sxc) sxc.style.display = u.isAdmin ? 'block' : 'none';
                        const vmt = document.getElementById('adminViewModeToggle'); if (vmt) vmt.style.display = u.isAdmin ? 'flex' : 'none';
                        if (df) df.style.display = u.isAdmin ? 'flex' : 'none';
                    }
                    const adminNavs = ['adminProductNav', 'adminProcNav', 'adminCustomerNav', 'adminProcListNav', 'adminFullSubListNav'];
                    adminNavs.forEach(id => { const el = document.getElementById(id); if (el) el.style.display = u.isAdmin ? 'block' : 'none' });
                    if (ie) { if (u.isAdmin) ie.innerHTML = '<span class="badge bg-danger">管理者モード</span>'; else ie.innerText = `${u.customer || 'ゲスト'} / ${u.manager || '担当者'} 様` }
                    document.getElementById('dashboardFilterContainer').innerHTML = "";
                    let lc = document.getElementById('dashboardListContainer'); if (!lc) { lc = document.createElement('div'); lc.id = 'dashboardListContainer'; lc.className = 'pb-5'; const tp = document.querySelector('.table-responsive'); if (tp) tp.parentNode.insertBefore(lc, tp); if (tp) tp.style.display = 'none' }
                    lc.innerHTML = '<div class="text-center py-5"><div class="spinner-border text-primary" role="status"></div></div>';

                    if (u.isAdmin) {
                        if (db) {
                            if (orderListener) orderListener();
                            let isInitial = true;
                            orderListener = db.collection("orders").limit(2000).onSnapshot(s => {
                                if (s.empty) { lc.innerHTML = '<div class="text-center text-muted py-5">データなし</div>'; return }

                                if (!isInitial) {
                                    s.docChanges().forEach(change => {
                                        if (change.type === "added" || change.type === "modified") {
                                            const d = change.doc.data();
                                            const updateAt = (d.updateAt && d.updateAt.toDate) ? d.updateAt.toDate() : (d.updateAt instanceof Date ? d.updateAt : null);
                                            if (updateAt && updateAt > dashLoadTime && d.status === "受付済") {
                                                showGlobalNotification(`新着注文：${d.customerName} 様 / ${d.team}`);
                                            }
                                        }
                                    });
                                }
                                isInitial = false;

                                adminOrdersCache = s.docs.map(d => { const x = d.data(); x.docId = d.id; return x });
                                applyDashboardFilters();
                            }, e => {
                                console.error(e);
                                lc.innerHTML = `<div class="alert alert-danger">Firebase疎通エラー</div>`;
                            });
                        }
                    } else {
                        if (db) {
                            const idStr = String(u.id);
                            const idNum = parseInt(u.id);
                            const queryIds = [idStr];
                            if (!isNaN(idNum)) queryIds.push(idNum);

                            console.log("Searching orders for user:", u.id, "Name:", u.customer, "queryIds:", queryIds);

                            db.collection("orders").where("customerId", "in", queryIds).get().then(async s => {
                                let docs = s.docs;

                                // IDで見つからない場合、名前での検索を試行 (過去のデータ救済)
                                if (s.empty && u.customer) {
                                    console.log("No orders found by ID, trying by name:", u.customer);
                                    const sByName = await db.collection("orders").where("customerName", "==", u.customer).get();
                                    docs = sByName.docs;
                                }

                                if (!docs || docs.length === 0) {
                                    lc.innerHTML = '<div class="text-center text-muted py-5">履歴が見つかりません (ID:' + u.id + ')</div>';
                                    return;
                                }

                                customerOrdersCache = docs.map(d => { const x = d.data(); x.docId = d.id; return x });
                                customerOrdersCache.sort((a, b) => {
                                    const d1 = a.作成日 && a.作成日.toDate ? a.作成日.toDate() : (a.作成日 instanceof Date ? a.作成日 : new Date(0));
                                    const d2 = b.作成日 && b.作成日.toDate ? b.作成日.toDate() : (b.作成日 instanceof Date ? b.作成日 : new Date(0));
                                    return d2 - d1;
                                });
                                renderCustomerView('全て')
                            }).catch(e => {
                                console.error("Dashboard load error:", e);
                                lc.innerHTML = '<div class="alert alert-danger">読込エラー: ' + e.message + '</div>';
                            })
                        }
                    }
                }

                function applyDashboardFilters() {
                    const u = window.currentUser; if (!u) return;
                    const sv = document.getElementById('dashboardSearch').value.toLowerCase();
                    const od = document.getElementById('filterOrderDate').value;
                    const dd = document.getElementById('filterDeliveryDate').value;
                    const isAdmin = u.isAdmin;
                    const sort = (isAdmin && document.getElementById('adminSortOrder')) ? document.getElementById('adminSortOrder').value : "latest";
                    const cf = (isAdmin && document.getElementById('adminCustomerFilter')) ? document.getElementById('adminCustomerFilter').value : "";

                    const sourceData = isAdmin ? adminOrdersCache : customerOrdersCache;

                    let filtered = sourceData.filter(d => {
                        const textMatch = (d.team || "").toLowerCase().includes(sv) || (d.customerName || "").toLowerCase().includes(sv) || (d.orderId || "").toLowerCase().includes(sv);
                        const orderMatch = !od || (d.orderDate === od);
                        const deliveryMatch = !dd || (d.deliveryDate === dd);
                        const customerMatch = !cf || (d.customerName === cf);

                        // タイプ（加工 vs フル昇華）の絞り込み
                        let typeMatch = true;
                        if (currentTypeFilter === 'processing') typeMatch = !d.isFullSubMode;
                        else if (currentTypeFilter === 'fullsub') typeMatch = d.isFullSubMode;

                        return textMatch && orderMatch && deliveryMatch && customerMatch && typeMatch;
                    });

                    // ソート適用
                    filtered.sort((a, b) => {
                        if (sort === 'customer_asc') {
                            return (a.customerName || "").localeCompare(b.customerName || "", 'ja');
                        } else if (sort === 'customer_desc') {
                            return (b.customerName || "").localeCompare(a.customerName || "", 'ja');
                        } else {
                            // latest (既定)
                            const d1 = a.作成日 && a.作成日.toDate ? a.作成日.toDate() : (a.作成日 instanceof Date ? a.作成日 : new Date(0));
                            const d2 = b.作成日 && b.作成日.toDate ? b.作成日.toDate() : (b.作成日 instanceof Date ? b.作成日 : new Date(0));
                            return d2 - d1;
                        }
                    });

                    if (isAdmin) {
                        renderAdminView(currentAdminFilter, filtered);
                    } else {
                        renderCustomerView('全て', filtered);
                    }
                }
                function getThumb(u) { if (!u) return ""; const m = u.match(/[-\w]{25,}/); if (!m) return ""; return `https://drive.google.com/thumbnail?id=${m[0]}&sz=w200` }
                function renderAdminViewByType(type) {
                    currentTypeFilter = type;
                    // サイドバーのアクティブ表示切り替え
                    document.querySelectorAll('#sidebarContainer .nav-link').forEach(el => el.classList.remove('active', 'text-white'));
                    const links = document.querySelectorAll('#sidebarContainer .nav-link');
                    if (type === 'all') { if (links[0]) links[0].classList.add('active'); }
                    else if (type === 'processing') { if (links[1]) links[1].classList.add('active'); }
                    else if (type === 'fullsub') { if (links[2]) links[2].classList.add('active'); }

                    applyDashboardFilters();
                }

                function setViewMode(m) {
                    currentViewMode = m;
                    document.getElementById('btnViewCard').classList.toggle('active', m === 'card');
                    document.getElementById('btnViewTable').classList.toggle('active', m === 'table');
                    applyDashboardFilters();
                }

                function renderAdminView(k, dataOverride = null) {
                    currentAdminFilter = k;
                    const sourceData = adminOrdersCache; // カウント用は常に全データ
                    const displayData = dataOverride || adminOrdersCache;

                    // 顧客フィルタの動的生成
                    const ac = document.getElementById('adminCustomerFilter');
                    if (ac && ac.options.length <= 1 && adminOrdersCache.length > 0) {
                        const customers = [...new Set(adminOrdersCache.map(o => o.customerName).filter(n => n))].sort();
                        customers.forEach(name => { const opt = new Option(name, name); ac.add(opt); });
                    }

                    let c = { "全て": adminOrdersCache.length, "受付済": 0, "処理中": 0, "完了": 0, "保留": 0, "一時保存": 0 };
                    adminOrdersCache.forEach(d => { const s = d.status || "受付済"; if (c[s] !== undefined) c[s]++ });
                    let bh = ""; Object.keys(c).forEach(ky => { const a = (ky === k), cl = a ? "btn-dark" : "btn-outline-dark"; bh += `<button class="btn btn-sm ${cl} rounded-pill px-3 fw-bold" onclick="renderAdminView('${ky}')">${ky} <span class="badge bg-light text-dark ms-1 rounded-pill">${c[ky]}</span></button> ` });
                    document.getElementById('dashboardFilterContainer').innerHTML = bh;

                    const fd = displayData.filter(d => { if (k === '全て') return true; return (d.status || "受付済") === k });
                    renderList(fd, true);
                }
                function renderCustomerView(k, dataOverride = null) {
                    const displayData = dataOverride || customerOrdersCache;
                    let c = { "全て": customerOrdersCache.length, "受付済": 0, "処理中": 0, "完了": 0, "保留": 0, "一時保存": 0 };
                    customerOrdersCache.forEach(d => { const s = d.status || "受付済"; if (c[s] !== undefined) c[s]++ });
                    let bh = ""; Object.keys(c).forEach(ky => { const a = (ky === k), cl = a ? "btn-dark" : "btn-outline-dark"; bh += `<button class="btn btn-sm ${cl} rounded-pill px-3 fw-bold" onclick="renderCustomerView('${ky}')">${ky} <span class="badge bg-light text-dark ms-1 rounded-pill">${c[ky]}</span></button> ` });
                    document.getElementById('dashboardFilterContainer').innerHTML = bh;

                    const fd = displayData.filter(d => { if (k === '全て') return true; return (d.status || "受付済") === k });
                    renderList(fd, false);
                }
                function renderList(data, isFromAdminView) {
                    const isAdmin = isFromAdminView || (window.currentUser && window.currentUser.isAdmin === true);
                    const c = document.getElementById('dashboardListContainer'), sc = { "受付済": "bg-danger", "処理中": "bg-info", "完了": "bg-yellow-green", "保留": "bg-warning", "一時保存": "bg-warning text-dark" };
                    if (data.length === 0) { c.innerHTML = '<div class="text-center text-muted py-5">該当データなし</div>'; return }

                    if (isAdmin && currentViewMode === 'table') {
                        // テーブル表示
                        let h = `<div class="table-responsive bg-white rounded shadow-sm"><table class="table-dashboard"><thead><tr>
                    <th style="width:40px"><input type="checkbox" onclick="toggleAllCheckboxes(this)"></th>
                    <th style="width:100px">ステータス</th>
                    <th style="width:110px">管理番号</th>
                    <th>顧客名</th>
                    <th>チーム名 / 物件名</th>
                    <th style="width:90px">注文日</th>
                    <th style="width:90px">納期</th>
                    <th style="width:70px">過去ﾃﾞｻﾞｲﾝ</th>
                    <th>加工・商品概要</th>
                    <th style="width:60px">数量</th>
                    <th style="width:140px">アクション</th>
                </tr></thead><tbody>`;

                        h += data.map(d => {
                            let ds = "-", dl = "-", dst = "";
                            if (d.作成日 && d.作成日.toDate) { const t = d.作成日.toDate(); ds = `${t.getMonth() + 1}/${t.getDate()}` }
                            else if (d.作成日 instanceof Date) { ds = `${d.作成日.getMonth() + 1}/${d.作成日.getDate()}` }
                            if (d.deliveryDate) { const v = new Date(d.deliveryDate); dl = `${v.getMonth() + 1}/${v.getDate()}` }
                            if (d.orderDate && d.deliveryDate) { const df = Math.ceil((new Date(d.deliveryDate) - new Date(d.orderDate)) / 86400000); if (df < 11) dst = "color:red;font-weight:bold;" }

                            const st = d.status || "受付済", bc = sc[st] || "bg-secondary";
                            const displayOrderId = d.adminNoSuffix ? `${d.orderId}-${d.adminNoSuffix}` : d.orderId;
                            const procs = d.procList ? d.procList.map(m => `<span class="badge border text-dark me-1" style="background:#eee">${m.method}</span>`).join('') : "";
                            const prods = d.productList ? d.productList.map(p => p.no).join(", ") : "";
                            const totalQty = d.productList ? d.productList.reduce((s, p) => s + Object.values(p.quantities || {}).reduce((a, b) => a + b, 0), 0) : 0;

                            const trCls = d.orderType === "追加" ? "row-additional" : "";

                            const designLink = d.designUrl ? `<a href="${d.designUrl}" target="_blank" class="btn btn-sm btn-outline-primary p-0 px-1" title="フォルダ開く"><i class="fas fa-folder-open"></i></a>` : "-";

                            return `<tr class="${trCls}">
                        <td><input type="checkbox" class="order-checkbox" value="${d.docId}"></td>
                        <td><select class="form-select form-select-sm text-white ${bc} fw-bold p-1" onchange="updateStatus('${d.docId}', this)" style="font-size:.75rem">
                            <option value="受付済" ${st == '受付済' ? 'selected' : ''}>受付済</option>
                            <option value="処理中" ${st == '処理中' ? 'selected' : ''}>処理中</option>
                            <option value="完了" ${st == '完了' ? 'selected' : ''}>完了</option>
                            <option value="保留" ${st == '保留' ? 'selected' : ''}>保留</option>
                        </select></td>
                        <td class="small fw-bold">${displayOrderId}</td>
                        <td><div class="fw-bold">${d.customerName}</div><div class="small text-muted">${d.managerName || ""}</div></td>
                        <td><div class="fw-bold text-primary">${d.team}</div><div class="small">${d.orderType} ${d.isFullSubMode ? '(フル昇華)' : ''}</div></td>
                        <td class="small">${ds}</td>
                        <td class="small" style="${dst}">${dl}</td>
                        <td class="text-center">${designLink}</td>
                        <td><div class="small">${procs}</div><div class="small text-muted text-truncate" style="max-width:150px">${prods}</div></td>
                        <td class="fw-bold text-center">${totalQty}</td>
                        <td>
                            <div class="d-flex gap-1">
                                <button class="btn btn-sm btn-outline-dark p-1 px-2" onclick="editOrder('${d.docId}')" title="修正"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-sm btn-outline-success p-1 px-2" onclick="viewPdf('${d.docId}')" title="指示書"><i class="fas fa-file-pdf"></i></button>
                                <button class="btn btn-sm btn-outline-primary p-1 px-2" onclick="openBillingModal('${d.docId}')" title="請求"><i class="fas fa-yen-sign"></i></button>
                            </div>
                        </td>
                    </tr>`;
                        }).join('');
                        h += `</tbody></table></div>`;
                        c.innerHTML = h;
                    } else {
                        // カード表示 (従来通り)
                        c.innerHTML = data.map(d => {
                            let ds = "-", dl = "-", dst = "font-weight:bold;color:#333;";
                            if (d.作成日 && d.作成日.toDate) { const t = d.作成日.toDate(); ds = `${t.getFullYear()}/${t.getMonth() + 1}/${t.getDate()}` }
                            else if (d.作成日 instanceof Date) { ds = `${d.作成日.getFullYear()}/${d.作成日.getMonth() + 1}/${d.作成日.getDate()}` }
                            if (d.deliveryDate) { const v = new Date(d.deliveryDate); dl = `${v.getFullYear()}/${v.getMonth() + 1}/${v.getDate()}` }
                            if (d.orderDate && d.deliveryDate) { const df = Math.ceil((new Date(d.deliveryDate) - new Date(d.orderDate)) / 86400000); if (df < 11) dst = "font-weight:bold;color:#dc3545;" }
                            let ph = d.procList ? d.procList.map(m => `<span class="badge bg-secondary me-1">${m.method}</span>`).join('') : "-", pt = "-";
                            if (d.productList && d.productList.length > 0) { const tq = d.productList.reduce((s, p) => s + Object.values(p.quantities || {}).reduce((a, b) => a + b, 0), 0); pt = `${d.productList.map(p => p.no).join(", ")} (計${tq}枚)` }
                            const st = d.status || "受付済", bc = sc[st] || "bg-secondary";
                            const displayOrderId = isAdmin && d.adminNoSuffix ? `${d.orderId} - <span class="text-danger fw-bold">${d.adminNoSuffix}</span>` : d.orderId;
                            let ti = `<div class="dl-no-img">NO IMAGE</div>`; if (d.designUrl) { const tu = getThumb(d.designUrl); if (tu) ti = `<img src="${tu}" class="dl-img-thumb" onclick="window.open('${d.designUrl}', '_blank')">` }
                            let editBtn = `<button class="btn btn-sm btn-outline-secondary flex-grow-1 py-0" onclick="editOrder('${d.docId}')">修正</button>`;
                            let delBtn = isAdmin ? `<button class="btn btn-sm btn-outline-danger flex-grow-1 py-0" onclick="deleteOrder('${d.docId}')">削除</button>` : '';
                            let stDisp = "", billBtn = "", actionBtn = "";
                            if (isAdmin) {
                                stDisp = `<select class="form-select form-select-sm text-white ${bc} fw-bold mb-1" onchange="updateStatus('${d.docId}', this)" style="font-size:.8rem"><option value="受付済" ${st == '受付済' ? 'selected' : ''}>受付済</option><option value="処理中" ${st == '処理中' ? 'selected' : ''}>処理中</option><option value="完了" ${st == '完了' ? 'selected' : ''}>完了</option><option value="保留" ${st == '保留' ? 'selected' : ''}>保留</option></select>`;
                                billBtn = `<button class="btn btn-sm btn-primary w-100 fw-bold py-0" onclick="openBillingModal('${d.docId}')"><i class="fas fa-yen-sign"></i> 請求作成</button>`;
                            } else {
                                stDisp = `<span class="badge ${bc} d-block mb-1 py-2" style="font-size:0.8rem">${st}</span>`;
                                if (st !== "一時保存") editBtn = `<button class="btn btn-sm btn-light flex-grow-1 py-0 text-muted" disabled>修正不可</button>`;
                            }
                            if (st === "一時保存") { actionBtn = `<button class="btn btn-sm btn-warning text-dark w-100 fw-bold py-0 mb-1" onclick="editOrder('${d.docId}')"><i class="fas fa-pen me-1"></i> 編集再開</button>`; }
                            else { actionBtn = `<button class="btn btn-sm btn-success w-100 fw-bold py-0 mb-1" onclick="copyOrderToForm('${d.docId}')">追加発注</button>`; }
                            let pdfBtn = `<button class="btn btn-sm btn-outline-dark w-100 fw-bold py-0 mb-1" onclick="viewPdf('${d.docId}')"><i class="fas fa-file-pdf"></i> 指示書</button>`;
                            let billedMark = ""; if (isAdmin && d.billingData) { billedMark = `<span class="badge bg-success ms-2"><i class="fas fa-check-circle me-1"></i>請求済</span>` }
                            const isAdditional = d.orderType === "追加";
                            const cardClass = isAdditional ? "dashboard-list-card dashboard-list-card-additional" : "dashboard-list-card";
                            const parentRef = (isAdditional && d.parentOrderId) ? `<span class="badge bg-warning text-dark ms-1">追加元: ${d.parentOrderId}</span>` : "";
                            return `<div class="${cardClass}"><div class="dl-checkbox-area"><input type="checkbox" class="order-checkbox" value="${d.docId}"></div><div class="dl-img-area">${ti}</div><div class="dl-content-area"><div class="dl-row-1"><span class="dl-id">${displayOrderId}</span><span class="badge bg-white border text-dark">${d.orderType}</span>${parentRef}${billedMark}<div class="dl-title">${d.team}</div><span class="ms-auto" style="font-size:.8rem;color:#555;">${d.customerName} (${d.managerName})</span></div><div class="dl-row-2"><span>発注: ${ds}</span><span style="${dst}">納期: ${dl}</span></div><div class="dl-row-3">${ph}</div><div class="dl-row-4">${pt}</div></div><div class="dl-action-area">${stDisp}<div class="d-flex gap-1 mb-1">${editBtn}${delBtn}</div>${actionBtn}${pdfBtn}${billBtn}</div></div>`
                        }).join('');
                    }
                }
                function toggleAllCheckboxes(el) { document.querySelectorAll('.order-checkbox').forEach(c => c.checked = el.checked) }
                function updateStatus(id, el) { const s = el.value, sc = { "受付済": "bg-danger", "処理中": "bg-info", "完了": "bg-yellow-green", "保留": "bg-warning" }; el.className = `form-select form-select-sm text-white fw-bold mb-1 ${sc[s] || "bg-secondary"}`; if (db) db.collection("orders").doc(id).update({ status: s }).catch(e => { alert("Err:" + e); loadDashboard() }) }
                function deleteOrder(id) { if (!window.currentUser.isAdmin) { return alert("削除権限がありません") } if (!confirm("削除しますか？")) return; if (db) db.collection("orders").doc(id).delete().then(() => { alert("削除完了"); loadDashboard() }).catch(e => alert("Err:" + e)) }
                window.viewPdf = async (id) => {
                    const o = customerOrdersCache.find(x => x.docId === id) || adminOrdersCache.find(x => x.docId === id);
                    if (!o) return alert("データなし");
                    // 指示書をプレビュー表示
                    await editOrder(id);
                    openPreviewModal();
                }
                function filterDashboard() { applyDashboardFilters() }
                function clearPdf() { document.getElementById("pdfUrlInput").value = ""; document.getElementById("previewImg").style.display = "none"; document.getElementById("viewerMsg").style.display = "block"; currentImgData = null }
                function loadPdf() {
                    const u = document.getElementById("pdfUrlInput").value.trim();
                    if (!u) return;

                    // --- 以前のコードのID抽出ロジックを完全復元 ---
                    const getId = (url) => { 
                        const m = url.match(/folders\/([-\w]+)/) || url.match(/d\/([-\w]+)/) || url.match(/id=([-\w]+)/); 
                        return m ? (m[1] || m[2] || m[3]) : ""; 
                    };
                    const fid = getId(u);
                    if (!fid) return;

                    const msg = document.getElementById("viewerMsg");
                    if (msg) msg.style.display = "none";

                    // --- 以前のコードと全く同じ物件名の自動取得 (POST方式) ---
                    let gUrl = (typeof currentGasUrl !== "undefined" && currentGasUrl && currentGasUrl.indexOf("script") !== -1) ? currentGasUrl : YOUR_GAS_URL;
                    if (fid && gUrl) {
                        const tObj = document.getElementById("teamName");
                        if (tObj) tObj.placeholder = "取得中...";
                        fetch(gUrl, {
                            method: "POST",
                            body: JSON.stringify({ action: "getFileName", fileId: fid })
                        })
                        .then(r => r.json())
                        .then(d => {
                            if (d.status === "success" || d.fileName) {
                                let name = (d.fileName || d.name || "").replace(/\.pdf$/i, "");
                                if (tObj) tObj.value = name;
                            } else {
                                if (tObj) tObj.placeholder = "取得失敗";
                            }
                        })
                        .catch(e => {
                            console.error("GAS Fetch Error:", e);
                            if (tObj) tObj.placeholder = "通信エラー(CORS)";
                        });
                    }

                    // --- 画像表示 (Cloud Functions経由) ---
                    const i = document.getElementById("previewImg"), s = document.getElementById("loadingSpinner");
                    if (i && s) {
                        i.style.display = "none"; s.style.display = "block";
                        const ti = new Image(); ti.crossOrigin = "anonymous";
                        ti.src = "https://us-central1-msk579-3d7a9.cloudfunctions.net/getDriveFile?id=" + fid;
                        ti.onload = function() {
                            const canvas = document.createElement("canvas"); canvas.width = ti.width; canvas.height = ti.height;
                            canvas.getContext("2d").drawImage(ti, 0, 0);
                            currentImgData = canvas.toDataURL("image/png"); i.src = currentImgData; i.style.display = "block"; s.style.display = "none";
                        };
                        ti.onerror = function() {
                            const turl = "https://drive.google.com/thumbnail?id=" + fid + "&sz=w1000";
                            i.src = turl; i.onload = function() { i.style.display = "block"; s.style.display = "none"; currentImgData = turl; };
                            i.onerror = function() { s.style.display = "none"; if (msg) msg.style.display = "block"; };
                        };
                    }
                }
                function openCombinedBilling() { const c = document.querySelectorAll('.order-checkbox:checked'); if (c.length === 0) return alert("チェックしてください"); openBillingModal(Array.from(c).map(e => e.value)) }
                async function openBillingModal(arg) {
                    const ids = Array.isArray(arg) ? arg : [arg];
                    let t = [];
                    ids.forEach(id => {
                        const o = adminOrdersCache.find(x => x.docId === id);
                        if (o) t.push(o)
                    });
                    if (t.length === 0) return alert("なし");
                    const fc = t[0].customerName;
                    if (t.length > 1 && !t.every(x => x.customerName === fc)) {
                        if (!confirm("顧客が異なりますが合算しますか？")) return
                    }
                    currentBillingDocId = t[0].docId;
                    document.getElementById('bill_team').innerText = t.length === 1 ? t[0].team : `${t[0].team} 他 ${t.length - 1}件`;
                    document.getElementById('bill_customer').innerText = fc;
                    const b = document.getElementById('billingTableBody');
                    b.innerHTML = "";
                    if (t.length === 1 && t[0].billingData && t[0].billingData.items) {
                        t[0].billingData.items.forEach(i => addBillingRow(i.name, i.qty, i.price));
                    } else {
                        for (const o of t) {
                            if (t.length > 1) addBillingRow(`--- [${o.team}] ---`, 0, 0);
                            if (o.productList) {
                                for (const p of o.productList) {
                                    const q = Object.values(p.quantities || {}).reduce((a, b) => a + b, 0);
                                    if (q > 0) {
                                        let price = p.price || 0;
                                        if (price === 0) {
                                            const resolved = resolveProductInfo(p.no);
                                            price = resolved.price || await getPrice(o.customerId, p.no);
                                        }
                                        addBillingRow(`${p.no} ${p.name} ${p.color}`, q, price);
                                    }
                                }
                            }
                            if (o.procList) o.procList.forEach(p => addBillingRow(`加工: ${p.method} (${p.pos})`, 1, 0));
                        }
                        addBillingRow("送料・諸経費", 1, 0);
                    }
                    calcBillTotal();
                    new bootstrap.Modal(document.getElementById('billingModal')).show();
                }
                async function saveBillingData(pdf) { if (!currentBillingDocId) return; const it = []; let sub = 0; document.querySelectorAll('#billingTableBody tr').forEach(r => { const n = r.querySelector('input[type="text"]').value, q = parseInt(r.querySelector('.bill-qty').value) || 0, p = parseInt(r.querySelector('.bill-price').value) || 0; if (n && (q * p) > 0) { it.push({ name: n, qty: q, price: p }); sub += q * p } }); const tax = Math.floor(sub * 0.1), tot = sub + tax, bd = { items: it, subtotal: sub, tax: tax, total: tot, updateAt: new Date().toISOString() }; try { await db.collection("orders").doc(currentBillingDocId).update({ billingData: bd }); if (pdf) { document.getElementById('inv_date').innerText = new Date().toLocaleDateString(); document.getElementById('inv_customer').innerText = document.getElementById('bill_customer').innerText; document.getElementById('inv_team').innerText = document.getElementById('bill_team').innerText; document.getElementById('inv_manager').innerText = window.currentUser.manager || ""; document.getElementById('inv_grand_total').innerText = tot.toLocaleString(); document.getElementById('inv_sub').innerText = sub.toLocaleString(); document.getElementById('inv_tax').innerText = tax.toLocaleString(); document.getElementById('inv_tot').innerText = tot.toLocaleString(); document.getElementById('inv_tbody').innerHTML = it.map(i => `<tr><td style="border:1px solid #000;padding:8px">${i.name}</td><td style="border:1px solid #000;padding:8px;text-align:center">${i.qty}</td><td style="border:1px solid #000;padding:8px;text-align:right">${i.price.toLocaleString()}</td><td style="border:1px solid #000;padding:8px;text-align:right">${(i.qty * i.price).toLocaleString()}</td></tr>`).join(''); const c = await html2canvas(document.getElementById('invoiceExportArea'), { scale: 2 }); const p = new window.jspdf.jsPDF('p', 'mm', 'a4'); p.addImage(c.toDataURL('image/jpeg', 1.0), 'JPEG', 0, 0, 210, 297); p.save(`請求書_${document.getElementById('bill_team').innerText}.pdf`) } else { alert("保存完了") } bootstrap.Modal.getInstance(document.getElementById('billingModal')).hide(); loadDashboard() } catch (e) { alert("Error:" + e) } }
                function addBillingRow(n, q, p) { const b = document.getElementById('billingTableBody'), r = document.createElement('tr'); r.innerHTML = `<td><input type="text" class="form-control form-control-sm" value="${n}"></td><td><input type="number" class="form-control form-control-sm bill-qty" value="${q}" onchange="calcBillTotal()"></td><td><input type="number" class="form-control form-control-sm bill-price" value="${p}" onchange="calcBillTotal()"></td><td class="text-end bill-row-total">0</td>`; b.appendChild(r) }
                function calcBillTotal() { let s = 0; document.querySelectorAll('#billingTableBody tr').forEach(r => { const q = parseInt(r.querySelector('.bill-qty').value) || 0, p = parseInt(r.querySelector('.bill-price').value) || 0, sm = q * p; r.querySelector('.bill-row-total').innerText = sm.toLocaleString(); s += sm }); const t = Math.floor(s * 0.1); document.getElementById('bill_subtotal').innerText = s.toLocaleString(); document.getElementById('bill_tax').innerText = t.toLocaleString(); document.getElementById('bill_total').innerText = (s + t).toLocaleString() }

                function copyInputTemplateToClipboard() { let header = "品番\t本体色\tサイズ\t数量\t番号\t名前"; let rows = [header]; if (productList.length > 0) { productList.forEach(p => { Object.entries(p.quantities).forEach(([size, qty]) => { for (let i = 0; i < qty; i++) { rows.push(`${p.no}\t${p.color}\t${size}\t1\t\t`) } }) }) }; const copyText = rows.join("\n"); try { navigator.clipboard.writeText(copyText).then(() => alert("下書きをコピーしました！スプレッドシートへ貼り付けてください。")) } catch (err) { const textArea = document.createElement("textarea"); textArea.value = copyText; document.body.appendChild(textArea); textArea.select(); document.execCommand("copy"); document.body.removeChild(textArea); alert("コピーしました。") } }

                function applyUnifiedPaste() {
                    const txtEl = document.getElementById('unifiedPasteArea');
                    if (!txtEl) return;
                    const txt = txtEl.value;
                    if (!txt) return;
                    const rows = txt.trim().split(/\r?\n/);

                    let tempMap = {};
                    productList.forEach(p => {
                        const key = p.no + "_" + (p.color || "") + "_" + (p.fabric || "");
                        tempMap[key] = JSON.parse(JSON.stringify(p));
                    });

                    let newPlayers = []; // ★追加ではなく置換にするため空から開始

                    rows.forEach((line, index) => {
                        const ln = line.trim();
                        if (!ln) return;
                        // ヘッダー判定 (1行目付近のみ)
                        if (index <= 1 && (ln.includes("品番") || ln.includes("サイズ") || ln.includes("番号") || ln.includes("名前"))) return;

                        let cols = ln.split(/\t|,|\s{2,}/);
                        if (cols.length < 2) cols = ln.split(/\s+/);

                        let skuCode = "", col = "", size = "", qty = 0, pNum = "", pName = "";

                        if (cols.length >= 6) {
                            // 6列: 品番, 色, サイズ, 数量, 番号, 名前
                            skuCode = cols[0]?.trim() || "";
                            col = cols[1]?.trim() || "";
                            size = cols[2]?.trim() || "";
                            qty = parseInt(cols[3]) || 0;
                            pNum = cols[4]?.trim() || "";
                            pName = cols[5]?.trim() || "";
                        } else if (cols.length === 5) {
                            // 5列: 品番, 色, サイズ, 番号, 名前
                            skuCode = cols[0]?.trim() || "";
                            col = cols[1]?.trim() || "";
                            size = cols[2]?.trim() || "";
                            qty = 1;
                            pNum = cols[3]?.trim() || "";
                            pName = cols[4]?.trim() || "";
                        } else if (cols.length === 4) {
                            // 4列: 品番, サイズ, 番号, 名前
                            skuCode = cols[0]?.trim() || "";
                            size = cols[1]?.trim() || "";
                            qty = 1;
                            pNum = cols[2]?.trim() || "";
                            pName = cols[3]?.trim() || "";
                        } else if (cols.length === 3) {
                            // 3列: 品番っぽいのがあれば [品番, サイズ, 番号]
                            if (cols[0].includes('_') || cols[0].match(/^[A-Z]{2,}/)) {
                                skuCode = cols[0]?.trim() || "";
                                size = cols[1]?.trim() || "";
                                pNum = cols[2]?.trim() || "";
                                qty = 1;
                            } else {
                                // なければ [サイズ, 番号, 名前]
                                size = cols[0]?.trim() || "";
                                pNum = cols[1]?.trim() || "";
                                pName = cols[2]?.trim() || "";
                                qty = 1;
                                // skuCodeは既存の最初のものを使うか空に
                                skuCode = productList[0]?.no || "";
                            }
                        } else if (cols.length === 2) {
                            // 2列: 品番, 枚数
                            skuCode = cols[0]?.trim() || "";
                            qty = parseInt(cols[1]) || 1;
                        } else {
                            skuCode = cols[0]?.trim() || "";
                            qty = 1;
                        }

                        if (!skuCode && !pNum) return;

                        const resolved = resolveProductInfo(skuCode);
                        const sku = resolved.no;
                        const name = resolved.name;

                        if (sku && qty > 0) {
                            const key = sku + "_" + (col || "") + "_" + (resolved.fabric || "");
                            if (!tempMap[key]) {
                                tempMap[key] = { no: sku, name: name, color: col, fabric: resolved.fabric || "", quantities: {}, price: resolved.price }
                            }
                            const sRef = size || "不明";
                            tempMap[key].quantities[sRef] = (tempMap[key].quantities[sRef] || 0) + qty;
                        }
                        if (qty > 0 && (pNum || pName || size)) {
                            for (let i = 0; i < qty; i++) {
                                newPlayers.push({ num: pNum, name: pName, info: (sku || "") + " / " + (size || "不明") });
                            }
                        }
                    });

                    productList = Object.values(tempMap);
                    playerList = newPlayers;
                    updateRightPanel();
                    alert("一括反映しました。");
                    const countEl = document.getElementById('displayRegCount');
                    if (countEl) countEl.innerText = playerList.length;

                    const sidebar = document.getElementById('excelImportSidebar');
                    if (sidebar) bootstrap.Offcanvas.getInstance(sidebar).hide();
                    txtEl.value = "";
                    alert("反映しました");
                }

                function openDraftTemplate() {
                    const url = "https://docs.google.com/spreadsheets/d/1meNfAoyUIktVLzSNJfmzdDjZLDdm0WYCyaNpjdpe_Zc/edit?gid=0#gid=0";
                    window.open(url, '_blank');
                }

                function renderPortraitPdf() {
                    setText('pp-order-no', document.getElementById('orderId').innerText);
                    setText('pp-order-type', document.getElementById('orderType').value);
                    setText('pp-customer', document.getElementById('customerName').value);
                    setText('pp-team', document.getElementById('teamName').value);
                    setText('pp-order-date', document.getElementById('orderDate').value);
                    setText('pp-delivery', document.getElementById('deliveryDate').value);
                    setText('pp-admin-no-suffix', document.getElementById('m_admin_no_suffix').value);

                    // 要素の取得
                    const fEl = document.getElementById('sb_fabric');
                    const pEl = document.getElementById('sb_pattern');
                    const cEl = document.getElementById('m_color_setting');

                    // 商品情報（productListの最初のアイテムを基準にする）
                    const firstItem = productList.length > 0 ? productList[0] : null;

                    // 生地
                    const fabricVal = firstItem ? firstItem.fabric : (fEl ? fEl.value : "");
                    setText('pp-fabric', fabricVal);

                    // 型紙品番 (全アイテム結合)
                    const patternNoVal = productList.length > 0
                        ? productList.map(p => p.no || "").filter(x => x).join(" / ")
                        : (pEl ? pEl.value : "");
                    setText('pp-pattern-no', patternNoVal);

                    // COLOR設定
                    const colorInfoVal = cEl && cEl.value ? cEl.value : (firstItem && firstItem.color ? firstItem.color : "-");
                    setText('pp-color-info', colorInfoVal);

                    // 商品名 (全アイテム結合)
                    const pnEl = document.getElementById('sb_product_name');
                    const productNameVal = productList.length > 0
                        ? productList.map(p => p.name || "").filter(x => x).join(" / ")
                        : (pnEl ? pnEl.value.trim() : "");
                    setText('pp-product-name', productNameVal);

                    // 価格
                    let priceVal = "";
                    if (firstItem) {
                        priceVal = "\u00a5" + (firstItem.price || 0).toLocaleString();
                    }
                    setText('pp-price', priceVal);

                    const designArea = document.querySelector('#pdfExportArea_Portrait .pp-design-area');
                    if (designArea) {
                        const imgData = currentImgData || "";
                        if (imgData) {
                            designArea.innerHTML = `<img src="${imgData}" style="max-width:98%; max-height:98%; object-fit:contain;" crossorigin="anonymous">`;
                        } else {
                            designArea.innerHTML = "";
                        }
                    }

                    const st = document.querySelector('#pp-size-table tbody');
                    const stHead = document.querySelector('#pp-size-table thead');
                    st.innerHTML = ""; stHead.innerHTML = "";

                    let allSizes = new Set();
                    productList.forEach(p => Object.keys(p.quantities).forEach(s => allSizes.add(s)));
                    const sizeOrder = ["100", "110", "120", "130", "140", "150", "160", "XS", "S", "M", "L", "XL", "O", "2XL", "XO", "3XL", "2XO", "4XL", "3XO", "5XL", "4XO"];
                    let sortedSizes = Array.from(allSizes).sort((a, b) => {
                        let ia = sizeOrder.indexOf(a); if (ia === -1) ia = 999;
                        let ib = sizeOrder.indexOf(b); if (ib === -1) ib = 999;
                        return ia - ib;
                    });
                    while (sortedSizes.length < 7) { sortedSizes.push(""); }

                    let hRow = "<tr><th style='border:1px solid #000;background:#eee; padding:5px; font-size:14px;'>商品名</th>";
                    sortedSizes.forEach(s => {
                        hRow += `<th style='border:1px solid #000;background:#eee; min-width:30px; padding:5px; font-size:14px;'>${s}</th>`;
                    });
                    hRow += "<th style='border:1px solid #000;background:#eee; padding:5px; font-size:14px;'>合計</th></tr>";
                    stHead.innerHTML = hRow;

                    let grandTotal = 0;
                    productList.forEach(p => {
                        let rowTotal = 0;
                        let dRow = `<tr><td style='border:1px solid #000; font-weight:bold; color:red; padding:5px; font-size:16px;'>${p.name}</td>`;
                        sortedSizes.forEach(s => {
                            let qty = p.quantities[s] || "";
                            if (s === "") qty = "";
                            dRow += `<td style='border:1px solid #000; padding:5px;'>${qty}</td>`;
                            if (typeof qty === 'number') rowTotal += qty;
                        });
                        dRow += `<td style='border:1px solid #000; font-weight:bold; padding:5px;'>${rowTotal}</td></tr>`;
                        st.innerHTML += dRow;
                        grandTotal += rowTotal;
                    });
                    const gtEl = document.getElementById('pp-total-qty-display');
                    if (gtEl) gtEl.innerText = grandTotal;

                    const t1 = document.querySelector('#pp-list-table-1 tbody');
                    const t2 = document.querySelector('#pp-list-table-2 tbody');
                    const t3 = document.querySelector('#pp-list-table-3 tbody');
                    if (t1) t1.innerHTML = ""; if (t2) t2.innerHTML = ""; if (t3) t3.innerHTML = "";

                    // プレイヤーリストは固定 9行 x 3列 = 27名分
                    const rowsPerCol = 9;
                    for (let i = 0; i < 27; i++) {
                        const p = playerList[i];
                        const no = i + 1;
                        // p.info が undefined の場合に split で落ちるのを防ぐ
                        const size = (p && typeof p.info === 'string') ? p.info.split('/')[1] || "" : "";
                        const num = (p) ? p.num : "";
                        const name = (p) ? p.name : "";

                        const html = `<tr>
                <td style='border:1px solid #000; text-align:center; background-color:#add8e6; padding:4px;'>${no}</td>
                <td style='border:1px solid #000; text-align:center; padding:4px;'>${size}</td>
                <td style='border:1px solid #000; text-align:center; padding:4px;'>${num}</td>
                <td style='border:1px solid #000; text-align:center; padding:4px;'>${name}</td>
            </tr>`;

                        if (i < 9) {
                            if (t1) t1.innerHTML += html;
                        } else if (i < 18) {
                            if (t2) t2.innerHTML += html;
                        } else {
                            if (t3) t3.innerHTML += html;
                        }
                    }
                }

                function renderLandscapePdf() {
                    setText('p-customer', document.getElementById('customerName').value);
                    setText('p-manager', document.getElementById('managerName').value);
                    setText('p-order-id', document.getElementById('orderId').innerText);
                    setText('p-type', document.getElementById('orderType').value);
                    setText('p-team', document.getElementById('teamName').value);
                    setText('p-order-date', document.getElementById('orderDate').value);
                    setText('p-delivery', document.getElementById('deliveryDate').value);
                    setText('p-total-qty', document.getElementById('totalQty').innerText);

                    const u = window.currentUser;
                    const suffix = document.getElementById('m_admin_no_suffix').value;
                    const sc = document.getElementById('p-admin-no-suffix-container');
                    if (sc) {
                        sc.style.display = (u.isAdmin && suffix) ? 'inline-block' : 'none';
                        setText('p-admin-no-suffix', suffix);
                    }

                    const designSide = document.querySelector('.pdf-design-side');
                    const listSide = document.querySelector('.pdf-list-side');
                    if (!designSide || !listSide) return;

                    designSide.style.flex = '6.5';
                    designSide.style.borderRight = '2px solid #000';
                    designSide.style.padding = '0';
                    designSide.style.display = 'flex';
                    designSide.style.flexDirection = 'column';

                    listSide.style.flex = '3.5';
                    listSide.style.display = 'block';
                    listSide.style.padding = '5px 10px';

                    let imgSrc = "";
                    if (currentImgData) imgSrc = currentImgData;

                    let leftHTML = `
            <div class="pdf-img-frame" style="width:96%; height:500px; border:none; display:flex; align-items:center; justify-content:center; margin:10px auto 10px auto; background:#fff;">
                <img src="${imgSrc}" style="max-width:100%; max-height:100%; object-fit:contain;" crossorigin="anonymous">
            </div>
        `;

                    let allSizes = new Set();
                    productList.forEach(p => Object.keys(p.quantities).forEach(s => allSizes.add(s)));

                    const sizeOrder = ["100", "110", "120", "130", "140", "150", "160", "JS", "JM", "JL", "SS", "XS", "S", "M", "L", "LL", "XL", "O", "XO", "2XL", "3L", "2XO", "3XL", "4L", "3XO", "4XL", "5L", "4XO", "5XL"];
                    const sortedSizes = Array.from(allSizes).sort((a, b) => {
                        let ia = sizeOrder.indexOf(a);
                        let ib = sizeOrder.indexOf(b);
                        if (ia === -1) ia = 999;
                        if (ib === -1) ib = 999;
                        return ia - ib;
                    });

                    const headerHtml = `<tr><th style="background:#333; color:#fff;">品番</th><th style="background:#333; color:#fff;">カラー</th>${sortedSizes.map(s => `<th style="background:#ddd;">${s}</th>`).join('')}<th style="background:#ddd;">計</th></tr>`;

                    let table1Rows = "";
                    let table2Rows = "";
                    const halfIndex = Math.ceil(productList.length / 2);

                    productList.forEach((p, i) => {
                        let sizeCells = sortedSizes.map(s => `<td>${p.quantities[s] || ''}</td>`).join('');
                        let rowTotal = Object.values(p.quantities).reduce((a, b) => a + b, 0);
                        const rowHtml = `<tr><td style="font-weight:bold; font-size:10px;">${p.no}</td><td style="font-size:10px;">${p.color}</td>${sizeCells}<td style="font-weight:bold;">${rowTotal}</td></tr>`;

                        if (i < halfIndex) table1Rows += rowHtml;
                        else table2Rows += rowHtml;
                    });

                    leftHTML += `
            <div style="background:#000; color:#fff; font-weight:bold; padding:2px 10px; font-size:12px; margin:0 10px 5px 10px;">商品内容</div>
            <div style="display:flex; gap:10px; padding:0 10px;">
                <div style="flex:1;">
                    <table class="pdf-table" style="width:100%; margin-bottom:0;">
                        <thead>${headerHtml}</thead>
                        <tbody>${table1Rows}</tbody>
                    </table>
                </div>
                <div style="flex:1;">
                    ${table2Rows ? `<table class="pdf-table" style="width:100%; margin-bottom:0;"><thead>${headerHtml}</thead><tbody>${table2Rows}</tbody></table>` : ''}
                </div>
            </div>
        `;

                    designSide.innerHTML = leftHTML;

                    let rightHTML = "";
                    rightHTML += `<div class="pdf-sec-title">加工詳細</div>`;
                    rightHTML += `<div style="border:2px solid #000; margin-bottom:15px; display:grid; grid-template-columns: repeat(${Math.max(1, procList.length)}, 1fr); box-sizing: border-box;">`;

                    if (procList.length === 0) {
                        rightHTML += `<div class="proc-row-item" style="border-right:none; height:30px;"></div>`;
                    } else {
                        procList.forEach((p, index) => {
                            const borderStyle = (index === procList.length - 1) ? "border-right:none;" : "border-right:1px solid #000;";
                            const colors = (p.color || "").trim().split(/\s+/).filter(c => c);

                            let colorGridHTML = `<div style="display:grid; grid-template-columns: 1fr 1fr; width:100%; border-top:1px solid #ccc; background:#fff; box-sizing: border-box;">`;
                            colors.forEach((c, i) => {
                                const rightBorder = (i % 2 === 0 && i === colors.length - 1 && colors.length % 2 !== 0) || (i % 2 === 1) ? "border-right:none;" : "border-right:1px solid #ccc;";
                                colorGridHTML += `<div style="padding:4px; font-size:10px; font-weight:bold; color:#d00; border-bottom:1px solid #ccc; ${rightBorder} text-align:center; box-sizing: border-box;">${c}</div>`;
                            });
                            if (colors.length % 2 !== 0) {
                                colorGridHTML += `<div style="border-bottom:1px solid #ccc; border-right:none; box-sizing: border-box;"></div>`;
                            }
                            colorGridHTML += `</div>`;

                            rightHTML += `<div class="proc-row-item" style="${borderStyle} width:100%; display:flex; flex-direction:column; padding:0; box-sizing: border-box;">
                    <div style="padding:5px; border-bottom:1px solid #ccc; background:#f9f9f9; box-sizing: border-box; flex-shrink: 0;">
                        <span class="proc-badge" style="font-size:10px;">[${p.pos}]</span>
                        <span style="font-weight:bold; font-size:11px;">${p.method}</span>
                    </div>
                    <div style="flex-grow: 1; display: flex; flex-direction: column;">
                        ${colorGridHTML}
                    </div>
                </div>`;
                        });
                    }
                    rightHTML += `</div>`;

                    const LIST_LIMIT = 20;
                    if (playerList.length === 0) {
                    }
                    else if (playerList.length > LIST_LIMIT) {
                        rightHTML += `<div class="pdf-sec-title">リスト</div>`;
                        rightHTML += `
                <div style="border:2px solid #000; padding:20px; text-align:center; font-weight:bold; background:#fff3cd;">
                    <div>リスト登録数: ${playerList.length}名</div>
                    <div style="margin-top:10px; font-size:1.2rem; color:#d00;">※人数が多いため別紙参照</div>
                </div>
            `;
                    }
                    else {
                        rightHTML += `<div class="pdf-sec-title">リスト</div>`;
                        rightHTML += `<table class="pdf-table" style="width:100%;">
                <thead> 
                    <tr>
                        <th style="background:#bfbfbf; color:#000;">No</th>
                        <th style="background:#bfbfbf; color:#000;">サイズ/色</th>
                        <th style="background:#bfbfbf; color:#000;">番号</th>
                        <th style="background:#bfbfbf; color:#000;">個人名</th>
                    </tr>
                </thead>
                <tbody>`;

                        playerList.forEach((p, i) => {
                            rightHTML += `<tr>
                    <td style="text-align:center;">${i + 1}</td>
                    <td style="text-align:center;">-</td>
                    <td style="text-align:center; font-weight:bold;">${p.num}</td>
                    <td style="text-align:center;">${p.name}</td>
                </tr>`;
                        });
                        rightHTML += `</tbody></table>`;
                    }

                    listSide.innerHTML = rightHTML;
                }
                async function editOrder(id) {
                    const o = adminOrdersCache.find(x => x.docId === id) || customerOrdersCache.find(x => x.docId === id);
                    if (!o) return alert("データが見つかりません");
                    editingDocId = id;
                    window.currentParentOrderId = o.parentOrderId || null;
                    showScreen('formScreen');
                    document.body.classList.remove('add-mode');

                    isFullSubMode = !!(o.isFullSubMode || (o.productCategory && o.productCategory.includes("昇華")));
                    applyModeUI(isFullSubMode);

                    setText('orderId', o.orderId);
                    document.getElementById('customerName').value = o.customerName || "";
                    document.getElementById('managerName').value = o.managerName || "";
                    document.getElementById('teamName').value = o.team || "";
                    document.getElementById('orderType').value = o.orderType || "新規";
                    if (o.sportType) document.getElementById('sportType').value = o.sportType;
                    if (o.productCategory) document.getElementById('productCategory').value = o.productCategory;
                    document.getElementById('orderDate').value = o.orderDate || "";
                    document.getElementById('deliveryDate').value = o.deliveryDate || "";
                    document.getElementById('m_admin_no_suffix').value = o.adminNoSuffix || "";
                    const ccEl = document.getElementById('m_color_setting');
                    if (ccEl) ccEl.value = o.colorSetting || "";

                    productList = JSON.parse(JSON.stringify(o.productList || []));
                    procList = JSON.parse(JSON.stringify(o.procList || []));
                    playerList = JSON.parse(JSON.stringify(o.playerList || []));

                    if (o.designUrl) {
                        document.getElementById('pdfUrlInput').value = o.designUrl;
                        await loadPdf();
                    } else {
                        clearPdf();
                    }

                    updateRightPanel();
                }

                async function confirmAndSend() {
                    if (!confirm("注文を確定しますか？")) return;
                    const u = window.currentUser;
                    const isAdmin = u && u.isAdmin;

                    const status = isAdmin ? "処理中" : "受付済";
                    await saveDraft(status, true); // true = 確定フラグ

                    if (isAdmin) {
                        await downloadCurrentPdf();
                    }
                }

                async function syncWithSpreadsheet() {
                    const btn = document.getElementById('btnSyncSpreadsheet');
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
                    btn.disabled = true;

                    const id = document.getElementById('orderId').innerText;
                    const team = document.getElementById('teamName').value;
                    const customer = document.getElementById('customerName').value;
                    const sku = productList.length > 0 ? productList[0].no : "";
                    const fabric = document.getElementById('sb_fabric')?.value || (productList.length > 0 ? productList[0].fabric : "");
                    const totalQty = parseInt(document.getElementById('totalQty')?.innerText) || 0;
                    const oType = document.getElementById('orderType').value;
                    const oTypeMap = (oType === "新規") ? "NEW" : "追加";

                    try {
                        const payload = {
                            type: 'processConfirmation',
                            order: {
                                orderId: id,
                                prefix: "FZO",
                                today: new Date().toLocaleDateString('ja-JP'),
                                deliveryDate: document.getElementById('deliveryDate').value,
                                orderType: oTypeMap,
                                team: team,
                                sku: sku,
                                fabric: fabric,
                                totalQty: totalQty,
                                customerName: customer
                            }
                        };

                        const resp = await fetch(currentGasUrl || YOUR_GAS_URL, {
                            method: 'POST',
                            body: JSON.stringify(payload)
                        });

                        if (resp.ok) {
                            const resJson = await resp.json();
                            if (resJson.nextNo !== undefined) {
                                document.getElementById('m_admin_no_suffix').value = resJson.nextNo;
                                showGlobalNotification(`スプシ反映：管理番号 ${resJson.nextNo} を取得しました`);
                            } else {
                                console.error("GAS returned error or empty:", resJson);
                                alert("GAS側から番号を取得できませんでした。\n内容: " + JSON.stringify(resJson));
                            }
                        } else {
                            const errorText = await resp.text();
                            alert("サーバー通信エラーが発生しました。\nステータス: " + resp.status + "\n内容: " + errorText);
                        }
                    } catch (e) {
                        console.error("Spreadsheet sync error", e);
                        alert("スプレッドシート連携エラー: " + e.message);
                    } finally {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }
                }

                function copyForSpreadsheet() {
                    const team = document.getElementById('teamName').value;
                    const customer = document.getElementById('customerName').value;
                    const sku = productList.length > 0 ? productList[0].no : "";
                    const fabric = document.getElementById('sb_fabric')?.value || (productList.length > 0 ? productList[0].fabric : "");
                    const totalQty = parseInt(document.getElementById('totalQty')?.innerText) || 0;
                    const today = new Date().toLocaleDateString('ja-JP');
                    const deliveryDate = document.getElementById('deliveryDate').value;
                    const oType = document.getElementById('orderType').value;
                    const oTypeMap = (oType === "新規") ? "NEW" : "追加";

                    // シートの構成(B列から):
                    // B: FZO
                    // C: 本日(注文日)
                    // D: 納期
                    // E: (空欄-出荷日)
                    // F: (空欄-状況)
                    // G: NEW/追加(状態)
                    // H: チーム名
                    // I: (空欄-裁断日)
                    // J: 品番
                    // K: 生地
                    // L: 数量
                    // M: 顧客名
                    const designUrl = document.getElementById('pdfUrlInput').value.trim();
                    let colI = "";
                    if (!isFullSubMode && designUrl) {
                        colI = `=HYPERLINK("${designUrl}", "過去デザイン")`;
                    }

                    const dataRow = [
                        "FZO",         // B
                        today,         // C
                        deliveryDate,  // D
                        "",            // E
                        "",            // F
                        oTypeMap,      // G
                        team,          // H
                        colI,          // I
                        sku,           // J
                        fabric,        // K
                        totalQty,      // L
                        customer       // M
                    ];

                    const data = dataRow.join("\t");

                    if (navigator.clipboard) {
                        navigator.clipboard.writeText(data).then(() => {
                            showGlobalNotification("スプシ用(B〜M列)データをコピーしました。B列を選択して貼り付けてください。");
                        }).catch(err => {
                            alert("コピーに失敗しました: " + err);
                        });
                    } else {
                        alert("ブラウザがコピー機能に対応していません。");
                    }
                }

                async function saveDraft(st = "一時保存", isConfirm = false) {
                    const u = window.currentUser; if (!u) return;
                    const data = {
                        orderId: document.getElementById('orderId').innerText,
                        customerName: document.getElementById('customerName').value,
                        managerName: document.getElementById('managerName').value,
                        team: document.getElementById('teamName').value,
                        orderType: document.getElementById('orderType').value,
                        sportType: document.getElementById('sportType').value,
                        productCategory: document.getElementById('productCategory').value,
                        orderDate: document.getElementById('orderDate').value,
                        deliveryDate: document.getElementById('deliveryDate').value,
                        productList: productList,
                        procList: procList,
                        playerList: playerList,
                        status: st,
                        customerId: u.id,
                        isFullSubMode: isFullSubMode,
                        adminNoSuffix: document.getElementById('m_admin_no_suffix').value,
                        colorSetting: document.getElementById('m_color_setting')?.value || "",
                        parentOrderId: window.currentParentOrderId || null,
                        作成日: editingDocId ? ((adminOrdersCache.find(x => x.docId === editingDocId) || customerOrdersCache.find(x => x.docId === editingDocId))?.作成日 || new Date()) : new Date(),
                        updateAt: new Date(),
                        designUrl: document.getElementById('pdfUrlInput').value.trim()
                    };

                    try {
                        if (editingDocId) {
                            await db.collection("orders").doc(editingDocId).update(data);
                        } else {
                            const docRef = await db.collection("orders").add(data);
                            editingDocId = docRef.id;
                        }
                        if (!isConfirm) alert("保存しました");

                        const modalEl = document.getElementById('pdfPreviewModal');
                        if (modalEl && bootstrap.Modal.getInstance(modalEl)) {
                            bootstrap.Modal.getInstance(modalEl).hide();
                        }
                        showScreen('dashboardScreen');
                        loadDashboard();
                    } catch (e) {
                        alert("保存エラー: " + e);
                    }
                }


                async function openPreviewModal() {
                    // 現在アクティブな画面内のボタンを探す（複数ある場合への対応）
                    const previewBtns = document.querySelectorAll('button[onclick="openPreviewModal()"]');

                    try {
                        previewBtns.forEach(b => {
                            b.disabled = true;
                            b.dataset.originalHtml = b.innerHTML;
                            b.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>作成中...';
                        });

                        const u = window.currentUser;
                        const modalEl = document.getElementById('pdfPreviewModal');
                        if (!modalEl) throw new Error("モーダル要素(pdfPreviewModal)が見つかりません。");

                        const confirmBtn = modalEl.querySelector('.btn-primary');
                        if (confirmBtn) {
                            confirmBtn.innerText = (u && u.isAdmin) ? "最終確認して確定" : "注文確定";
                        }

                        if (isFullSubMode) {
                            renderPortraitPdf();
                        } else {
                            renderLandscapePdf();
                        }

                        const targetId = isFullSubMode ? 'pdfExportArea_Portrait' : 'pdfExportArea';
                        const target = document.getElementById(targetId);
                        if (!target) throw new Error("出力対象エリア(" + targetId + ")が見つかりません。");

                        const canvas = await html2canvas(target, {
                            scale: 2,
                            useCORS: true,
                            allowTaint: false,
                            logging: false
                        });
                        const imgData = canvas.toDataURL('image/jpeg', 0.9);
                        const jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : window.jsPDF;
                        if (!jsPDF) throw new Error("PDF生成ライブラリ(jsPDF)の読み込みに失敗しました。");

                        const doc = new jsPDF(isFullSubMode ? 'p' : 'l', 'mm', 'a4');
                        const w = doc.internal.pageSize.getWidth();
                        const h = doc.internal.pageSize.getHeight();
                        doc.addImage(imgData, 'JPEG', 0, 0, w, h);

                        window.currentPdfBlob = doc.output('blob');
                        const url = URL.createObjectURL(window.currentPdfBlob);
                        const frame = document.getElementById('pdfPreviewFrame');
                        if (frame) frame.src = url;

                        // モーダル表示 (Bootstrap 5.0.2 互換)
                        const modalInstance = new bootstrap.Modal(modalEl);
                        modalInstance.show();

                    } catch (e) {
                        console.error("PDF Preview Error:", e);
                        alert("プレビュー作成エラー: " + e.message);
                    } finally {
                        previewBtns.forEach(b => {
                            b.disabled = false;
                            if (b.dataset.originalHtml) b.innerHTML = b.dataset.originalHtml;
                        });
                    }
                }

                async function downloadCurrentPdf() {
                    const team = document.getElementById('teamName').value.trim() || "チーム名なし";
                    const suffix = document.getElementById('m_admin_no_suffix').value.trim();
                    const orderId = document.getElementById('orderId').innerText;
                    const adminNo = suffix ? `FKZ羽-${suffix}` : orderId;
                    const filename = `${adminNo}_${team}.pdf`;

                    // テキスト選択可能なPDFを生成するためにGASを呼び出す
                    await generateServerPdf(filename);
                }

                async function generateServerPdf(filename) {
                    const targetId = isFullSubMode ? 'pdfExportArea_Portrait' : 'pdfExportArea';
                    const target = document.getElementById(targetId);
                    if (!target) return;

                    // HTMLを取得し、スタイルを反映させるためにクローンを作成してインライン化するなどの処理が必要な場合があるが、
                    // まずはシンプルなHTML送信を試みる。
                    // GAS側でCSSをどの程度解釈できるかに依存する。

                    // ローディング表示
                    const btn = document.getElementById('modalDownloadBtn');
                    const originalText = btn ? btn.innerHTML : "";
                    if (btn) btn.innerHTML = '<span class="spinner-border spinner-border-sm me-1"></span>生成中...';

                    try {
                        // スタイルも含めて送信しないとGAS側で正しく表示されないため、styleタグを抽出
                        const styles = Array.from(document.querySelectorAll('style')).map(s => s.outerHTML).join('');
                        const html = `<html><head>${styles}</head><body>${target.outerHTML}</body></html>`;

                        const payload = {
                            type: 'generatePdf',
                            html: html,
                            filename: filename
                        };

                        const resp = await fetch(currentGasUrl || YOUR_GAS_URL, {
                            method: 'POST',
                            body: JSON.stringify(payload)
                        });

                        if (resp.ok) {
                            const result = await resp.json();
                            if (result.status === 'error') throw new Error(result.message || "GAS側エラー");
                            if (result.pdfBase64) {
                                const byteCharacters = atob(result.pdfBase64);
                                const byteNumbers = new Array(byteCharacters.length);
                                for (let i = 0; i < byteCharacters.length; i++) {
                                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                                }
                                const byteArray = new Uint8Array(byteNumbers);
                                const blob = new Blob([byteArray], { type: 'application/pdf' });

                                const a = document.createElement('a');
                                a.href = URL.createObjectURL(blob);
                                a.download = filename;
                                a.click();
                            } else {
                                throw new Error("PDF生成失敗");
                            }
                        } else {
                            throw new Error("サーバーエラー");
                        }
                    } catch (e) {
                        console.error("PDF generation failed:", e);
                        alert("テキストPDF生成に失敗しました。\n理由: " + e.message + "\n\n※従来形式（画像ベース）でダウンロードを開始します。");
                        // フォールバック: 従来型（画像ベース）
                        if (window.currentPdfBlob) {
                            const a = document.createElement('a');
                            a.href = URL.createObjectURL(window.currentPdfBlob);
                            a.download = filename;
                            a.click();
                        }
                    } finally {
                        if (btn) btn.innerHTML = originalText;
                    }
                }

                window.onload = function () { initCalendar() };
