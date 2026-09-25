import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, doc, updateDoc, increment, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVBLZUmVLjIZP6s10hvol8EKjj3JKxyIw",
  authDomain: "worldmapissue.firebaseapp.com",
  projectId: "worldmapissue",
  storageBucket: "worldmapissue.firebasestorage.app",
  messagingSenderId: "784474143459",
  appId: "1:784474143459:web:043bc47c903042668d63d6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Global State
let currentCountryCode = null;
let unsubscribeCountryComments = null;
let unsubscribeGlobalComments = null;

function sanitize(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}

export function initCommunity() {
    setupGlobalLounge();
    setupCountryCommunityUI();
}

export function openCountryCommunity(countryCode, countryName) {
    currentCountryCode = countryCode;
    
    // 1. Reset UI
    document.getElementById('react-hot-count').innerText = "0";
    document.getElementById('react-sad-count').innerText = "0";
    document.getElementById('react-hmm-count').innerText = "0";
    document.getElementById('country-comment-list').innerHTML = `<div class="comm-loading">데이터를 불러오는 중...</div>`;
    
    if (unsubscribeCountryComments) {
        unsubscribeCountryComments();
    }

    // 2. Fetch Reactions
    const reactionsRef = doc(db, 'country_reactions', countryCode);
    getDoc(reactionsRef).then((docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById('react-hot-count').innerText = data.hot || 0;
            document.getElementById('react-sad-count').innerText = data.sad || 0;
            document.getElementById('react-hmm-count').innerText = data.hmm || 0;
        }
    }).catch(e => console.error("Error fetching reactions", e));

    // 3. Subscribe to Real-time Comments
    const commentsRef = collection(db, `countries/${countryCode}/comments`);
    const q = query(commentsRef, orderBy("createdAt", "desc"));
    
    unsubscribeCountryComments = onSnapshot(q, (snapshot) => {
        const listEl = document.getElementById('country-comment-list');
        listEl.innerHTML = '';
        if (snapshot.empty) {
            listEl.innerHTML = `<div class="comm-empty">첫 번째 한줄톡을 남겨보세요!</div>`;
            return;
        }
        
        snapshot.forEach((doc) => {
            const data = doc.data();
            const dateStr = data.createdAt ? data.createdAt.toDate().toLocaleString() : '방금 전';
            listEl.innerHTML += `
                <div class="comm-item">
                    <span class="comm-nick">${sanitize(data.nick)}</span>
                    <span class="comm-text">${sanitize(data.text)}</span>
                    <span class="comm-time">${dateStr}</span>
                </div>
            `;
        });
    }, (error) => {
        console.error("Error fetching comments", error);
        document.getElementById('country-comment-list').innerHTML = `<div class="comm-error">데이터를 불러올 수 없습니다.</div>`;
    });
}

// -----------------------------------------------------
// Country Reactions and Comments
// -----------------------------------------------------
function setupCountryCommunityUI() {
    const modalContent = document.getElementById('modal-content-area');
    
    const commSection = document.createElement('div');
    commSection.className = 'community-section';
    commSection.innerHTML = `
        <div class="comm-header">
            <h4 class="comm-title">지금 이 나라의 분위기는?</h4>
            <div class="comm-reactions">
                <button class="react-btn" data-type="hot">🔥 <span id="react-hot-count">0</span></button>
                <button class="react-btn" data-type="sad">😢 <span id="react-sad-count">0</span></button>
                <button class="react-btn" data-type="hmm">🤔 <span id="react-hmm-count">0</span></button>
            </div>
        </div>
        <div class="comm-chat-area">
            <h4 class="comm-title" style="margin-top: 15px;">실시간 한줄톡</h4>
            <div id="country-comment-list" class="comm-list"></div>
            <div class="comm-input-group">
                <input type="text" id="country-nick" class="comm-input-nick" placeholder="닉네임" maxlength="10">
                <input type="text" id="country-text" class="comm-input-text" placeholder="이 나라에 대한 생각을 남겨주세요!" maxlength="60">
                <button id="country-submit" class="comm-submit-btn">전송</button>
            </div>
        </div>
    `;
    modalContent.appendChild(commSection);

    // Event Listeners for Reactions
    document.querySelectorAll('.react-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            if (!currentCountryCode) return;
            const type = btn.getAttribute('data-type');
            
            // Add slight animation
            btn.style.transform = "scale(1.2)";
            setTimeout(() => btn.style.transform = "scale(1)", 200);

            const docRef = doc(db, 'country_reactions', currentCountryCode);
            try {
                await setDoc(docRef, { [type]: increment(1) }, { merge: true });
                const countSpan = document.getElementById(`react-${type}-count`);
                countSpan.innerText = parseInt(countSpan.innerText) + 1;
            } catch (e) {
                console.error("Reaction error", e);
            }
        });
    });

    // Event Listener for Comments
    const submitBtn = document.getElementById('country-submit');
    const nickInput = document.getElementById('country-nick');
    const textInput = document.getElementById('country-text');

    let isSubmittingComment = false;
    const submitComment = async () => {
        if (isSubmittingComment) return;
        
        // Get text immediately, but delay clearing to avoid IME leftover bug
        const text = textInput.value.trim();
        if (!text) return;
        
        isSubmittingComment = true;
        setTimeout(() => { textInput.value = ''; }, 10);
        
        const nick = nickInput.value.trim() || (COMM_UI_DICT[window.currentCommunityLang]?.anon || '익명');
        try {
            await addDoc(collection(db, `countries/${currentCountryCode}/comments`), {
                nick: nick,
                text: text,
                createdAt: serverTimestamp()
            });
            localStorage.setItem('wmi_nick', nick);
        } catch (e) {
            console.error("Comment error", e);
            alert("댓글 등록에 실패했습니다.");
        } finally {
            isSubmittingComment = false;
        }
    };

    submitBtn.addEventListener('click', submitComment);
    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (e.isComposing) return;
            e.preventDefault();
            submitComment();
        }
    });

    // Load saved nick
    const savedNick = localStorage.getItem('wmi_nick');
    if (savedNick) nickInput.value = savedNick;
}

// -----------------------------------------------------
// Global Lounge
// -----------------------------------------------------
function setupGlobalLounge() {
    // 1. Add floating button
    const floatBtn = document.createElement('div');
    floatBtn.id = 'global-lounge-btn';
    floatBtn.innerHTML = '🌐 라운지';
    document.body.appendChild(floatBtn);

    // 2. Add Panel
    const panel = document.createElement('div');
    panel.id = 'global-lounge-panel';
    panel.innerHTML = `
        <div class="gl-header">
            <h4 id="gl-title">🌐 글로벌 라운지</h4>
            <button id="gl-close-btn">✖</button>
        </div>
        <div class="gl-body" id="global-chat-list">
            <div class="comm-loading" id="gl-loading">데이터를 불러오는 중...</div>
        </div>
        <div class="gl-footer comm-input-group">
            <input type="text" id="gl-nick" class="comm-input-nick" placeholder="닉네임" maxlength="10">
            <input type="text" id="gl-text" class="comm-input-text" placeholder="채팅을 입력하세요..." maxlength="60">
            <button id="gl-submit" class="comm-submit-btn">전송</button>
        </div>
    `;
    document.body.appendChild(panel);

    // 3. Events
    floatBtn.addEventListener('click', () => {
        panel.classList.add('show');
        floatBtn.style.display = 'none';
        
        // Load Nick
        const savedNick = localStorage.getItem('wmi_nick');
        if (savedNick) document.getElementById('gl-nick').value = savedNick;

        // Subscribe if not already
        if (!unsubscribeGlobalComments) {
            const commentsRef = collection(db, `global_lounge`);
            // limit to 50 latest
            const q = query(commentsRef, orderBy("createdAt", "desc"));
            unsubscribeGlobalComments = onSnapshot(q, (snapshot) => {
                const listEl = document.getElementById('global-chat-list');
                listEl.innerHTML = '';
                if (snapshot.empty) {
                    listEl.innerHTML = `<div class="comm-empty" id="gl-empty">첫 번째 메시지를 남겨보세요!</div>`;
                    return;
                }
                
                snapshot.forEach((doc) => {
                    const data = doc.data();
                    const dateStr = data.createdAt ? data.createdAt.toDate().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : '';
                    listEl.innerHTML += `
                        <div class="gl-msg">
                            <span class="gl-msg-nick">${sanitize(data.nick)}</span>
                            <span class="gl-msg-text">${sanitize(data.text)}</span>
                            <span class="gl-msg-time">${dateStr}</span>
                        </div>
                    `;
                });
            });
        }
    });

    document.getElementById('gl-close-btn').addEventListener('click', () => {
        panel.classList.remove('show');
        floatBtn.style.display = 'block';
    });

    // 4. Submit logic
    const submitBtn = document.getElementById('gl-submit');
    const nickInput = document.getElementById('gl-nick');
    const textInput = document.getElementById('gl-text');

    let isSubmittingGl = false;
    const submitMsg = async () => {
        if (isSubmittingGl) return;
        
        const text = textInput.value.trim();
        if (!text) return;
        
        isSubmittingGl = true;
        setTimeout(() => { textInput.value = ''; }, 10);
        
        const nick = nickInput.value.trim() || (COMM_UI_DICT[window.currentCommunityLang]?.anon || '익명');
        try {
            await addDoc(collection(db, `global_lounge`), {
                nick: nick,
                text: text,
                createdAt: serverTimestamp()
            });
            localStorage.setItem('wmi_nick', nick);
        } catch (e) {
            console.error("Global Chat error", e);
        } finally {
            isSubmittingGl = false;
        }
    };

    submitBtn.addEventListener('click', submitMsg);
    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (e.isComposing) return;
            e.preventDefault();
            submitMsg();
        }
    });
}

// -----------------------------------------------------
// I18N Support
// -----------------------------------------------------
window.currentCommunityLang = 'ko';
const COMM_UI_DICT = {
    'ko': {
        countryTitle: '지금 이 나라의 분위기는?',
        countryListTitle: '실시간 한줄톡',
        nickPlaceholder: '닉네임',
        countryTextPlaceholder: '이 나라에 대한 생각을 남겨주세요!',
        sendBtn: '전송',
        loungeBtn: '🌐 라운지',
        loungeTitle: '🌐 글로벌 라운지',
        loungeTextPlaceholder: '채팅을 입력하세요...',
        anon: '익명'
    },
    'en': {
        countryTitle: 'What is the mood here?',
        countryListTitle: 'Live One-liners',
        nickPlaceholder: 'Nick',
        countryTextPlaceholder: 'Leave a thought about this country!',
        sendBtn: 'Send',
        loungeBtn: '🌐 Lounge',
        loungeTitle: '🌐 Global Lounge',
        loungeTextPlaceholder: 'Type a message...',
        anon: 'Anon'
    },
    'ja': {
        countryTitle: 'この国の今の雰囲気は？',
        countryListTitle: 'リアルタイムの一言',
        nickPlaceholder: 'ニック',
        countryTextPlaceholder: 'この国についての考えを残してください！',
        sendBtn: '送信',
        loungeBtn: '🌐 ラウンジ',
        loungeTitle: '🌐 グローバルラウンジ',
        loungeTextPlaceholder: 'チャットを入力...',
        anon: '匿名'
    },
    'zh-CN': {
        countryTitle: '这个国家现在的气氛如何？',
        countryListTitle: '实时简评',
        nickPlaceholder: '昵称',
        countryTextPlaceholder: '留下你对这个国家的看法！',
        sendBtn: '发送',
        loungeBtn: '🌐 休息室',
        loungeTitle: '🌐 全球休息室',
        loungeTextPlaceholder: '输入聊天内容...',
        anon: '匿名'
    },
    'es': {
        countryTitle: '¿Cuál es el ambiente aquí?',
        countryListTitle: 'Comentarios en vivo',
        nickPlaceholder: 'Apodo',
        countryTextPlaceholder: '¡Deja un pensamiento sobre este país!',
        sendBtn: 'Enviar',
        loungeBtn: '🌐 Sala',
        loungeTitle: '🌐 Sala Global',
        loungeTextPlaceholder: 'Escribe un mensaje...',
        anon: 'Anónimo'
    }
};

export function updateCommunityLanguage(lang) {
    window.currentCommunityLang = lang;
    const ui = COMM_UI_DICT[lang] || COMM_UI_DICT['ko'];
    
    // Country UI
    const commTitle1 = document.querySelector('.comm-header .comm-title');
    if (commTitle1) commTitle1.innerText = ui.countryTitle;
    const commTitle2 = document.querySelector('.comm-chat-area .comm-title');
    if (commTitle2) commTitle2.innerText = ui.countryListTitle;
    const countryNick = document.getElementById('country-nick');
    if (countryNick) countryNick.placeholder = ui.nickPlaceholder;
    const countryText = document.getElementById('country-text');
    if (countryText) countryText.placeholder = ui.countryTextPlaceholder;
    const countrySubmit = document.getElementById('country-submit');
    if (countrySubmit) countrySubmit.innerText = ui.sendBtn;

    // Lounge UI
    const loungeBtn = document.getElementById('global-lounge-btn');
    if (loungeBtn) loungeBtn.innerHTML = ui.loungeBtn;
    const loungeTitle = document.getElementById('gl-title');
    if (loungeTitle) loungeTitle.innerHTML = ui.loungeTitle;
    const glNick = document.getElementById('gl-nick');
    if (glNick) glNick.placeholder = ui.nickPlaceholder;
    const glText = document.getElementById('gl-text');
    if (glText) glText.placeholder = ui.loungeTextPlaceholder;
    const glSubmit = document.getElementById('gl-submit');
    if (glSubmit) glSubmit.innerText = ui.sendBtn;
}

window.updateCommunityLanguage = updateCommunityLanguage;
