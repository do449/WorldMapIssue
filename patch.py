import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update CSS styles (replacing inside <style> ... </style>)
css_old = """    <style>
        body, html { margin: 0; padding: 0; height: 100%; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #000; overflow: hidden; }
        #map { width: 100%; height: 100vh; z-index: 1; }

        #ui-controls {
            position: absolute; top: 20px; right: 20px; z-index: 10;
            background: rgba(255, 255, 255, 0.95); padding: 10px 18px; backdrop-filter: blur(8px);
            border-radius: 12px; box-shadow: 0 8px 16px rgba(0,0,0,0.15); color: #333; font-weight: 600; font-size: 14px;
        }
        #ui-controls select { margin-left: 8px; padding: 6px; border-radius: 6px; font-weight: 600; border: 1px solid #ddd; background: #fff; cursor: pointer; outline: none; transition: border 0.3s; }
        #ui-controls select:focus { border-color: #1a73e8; }

        #hover-tooltip {
            position: absolute; display: none; background-color: rgba(32, 33, 36, 0.9); 
            color: #fff; padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; pointer-events: none; z-index: 10; box-shadow: 0 4px 12px rgba(0,0,0,0.2); 
        }

        /* 💡 모달 애니메이션 추가 (Fade-in / Scale-up) */
        #news-modal {
            display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.95); width: 92%; max-width: 640px; 
            background: #ffffff; padding: 30px; border-radius: 24px; box-shadow: 0 24px 50px rgba(0,0,0,0.25); z-index: 1000; max-height: 85vh; overflow-y: auto; 
            opacity: 0; transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        #news-modal.show { display: block; opacity: 1; transform: translate(-50%, -50%) scale(1); }

        .close-btn { float: right; cursor: pointer; font-size: 26px; color: #9aa0a6; font-weight: bold; transition: color 0.2s; margin-top: -10px; margin-right: -10px; width: 36px; height: 36px; text-align: center; line-height: 36px; border-radius: 50%; }
        .close-btn:hover { color: #202124; background: #f1f3f4; }
        
        #news-title { margin: 0 0 15px 0; color: #202124; font-size: 1.6em; font-weight: 800; letter-spacing: -0.5px; }
        
        .source-indicator { font-size: 13px; font-weight: 700; color: #1a73e8; margin-bottom: 8px; display: inline-block; background: #e8f0fe; padding: 4px 10px; border-radius: 12px; }
        .translation-badge { font-size: 0.8em; background-color: #f1f3f4; color: #5f6368; padding: 4px 10px; border-radius: 12px; margin-left: 10px; font-weight: 600; vertical-align: middle; }

        .video-container { position: relative; padding-bottom: 56.25%; height: 0; background: #000; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); margin-bottom: 12px; border: 1px solid #eee; }
        .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        
        .resource-section { margin-bottom: 25px; padding-bottom: 20px; border-bottom: 1px solid #f1f3f4; }
        .resource-title { font-size: 12px; color: #5f6368; font-weight: 700; margin-bottom: 8px; }
        .resource-list { display: flex; gap: 8px; flex-wrap: wrap; }
        .resource-btn { background: #ffffff; color: #3c4043; padding: 8px 14px; border-radius: 20px; font-size: 13px; font-weight: 600; text-decoration: none; transition: all 0.2s ease; border: 1px solid #dadce0; display: inline-flex; align-items: center; }
        .resource-btn:hover { background: #f8f9fa; color: #1a73e8; border-color: #1a73e8; transform: translateY(-1px); box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

        .article-box { background: #f8f9fa; padding: 20px; border-radius: 16px; border: 1px solid #e8eaed; margin-top: 10px; margin-bottom: 12px; }
        .article-title { font-weight: 800; color: #202124; font-size: 1.15em; margin-bottom: 10px; line-height: 1.4; }
        .article-desc { color: #5f6368; font-size: 0.95em; line-height: 1.6; margin-bottom: 15px; }
        .article-link { display: inline-flex; align-items: center; color: #fff; background-color: #1a73e8; padding: 8px 16px; text-decoration: none; font-size: 0.9em; font-weight: 600; border-radius: 20px; transition: background 0.3s; }
        .article-link:hover { background-color: #1557b0; }

        #loading-msg { display: none; color: #1a73e8; font-weight: 700; margin-bottom: 10px; text-align: center; padding: 40px 0; font-size: 1.1em;}
        #error-msg { display: none; color: #d93025; font-weight: 700; margin-bottom: 10px; text-align: center; background: #fce8e6; padding: 15px; border-radius: 8px; }
        
        /* 모달 배경 오버레이 추가 */
        #modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 999; opacity: 0; transition: opacity 0.3s ease; }"""

css_new = """    <style>
        body, html { margin: 0; padding: 0; height: 100%; font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #000; overflow: hidden; font-size: 16px; }
        #map { width: 100%; height: 100vh; z-index: 1; }

        #ui-controls {
            position: absolute; top: 20px; right: 20px; z-index: 10;
            background: rgba(255, 255, 255, 0.95); padding: 12px 20px; backdrop-filter: blur(10px);
            border-radius: 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); color: #444; font-weight: 700; font-size: 15px;
        }
        #ui-controls select { margin-left: 10px; padding: 8px 12px; border-radius: 12px; font-weight: 700; border: 2px solid #e8eaed; background: #fff; cursor: pointer; outline: none; transition: all 0.3s; font-size: 14px; }
        #ui-controls select:focus { border-color: #4285f4; box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.2); }

        #hover-tooltip {
            position: absolute; display: none; background-color: #ffffff; 
            color: #202124; padding: 10px 20px; border-radius: 24px; font-size: 16px; font-weight: 800; pointer-events: none; z-index: 10; box-shadow: 0 8px 24px rgba(0,0,0,0.15); border: 2px solid #f1f3f4;
        }

        /* 💡 모달 애니메이션 추가 (Fade-in / Scale-up) */
        #news-modal {
            display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) scale(0.95); width: 92%; max-width: 640px; 
            background: #ffffff; padding: 35px; border-radius: 28px; box-shadow: 0 24px 50px rgba(0,0,0,0.25); z-index: 1000; max-height: 85vh; overflow-y: auto; 
            opacity: 0; transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        #news-modal.show { display: block; opacity: 1; transform: translate(-50%, -50%) scale(1); }

        .close-btn { float: right; cursor: pointer; font-size: 28px; color: #bdc1c6; font-weight: bold; transition: all 0.2s; margin-top: -15px; margin-right: -15px; width: 44px; height: 44px; text-align: center; line-height: 44px; border-radius: 50%; background: #f8f9fa; }
        .close-btn:hover { color: #5f6368; background: #e8eaed; transform: scale(1.05); }
        
        #news-title { margin: 0 0 18px 0; color: #202124; font-size: 1.8em; font-weight: 900; letter-spacing: -0.5px; }
        
        .source-indicator { font-size: 14px; font-weight: 800; color: #1a73e8; margin-bottom: 12px; display: inline-block; background: #e8f0fe; padding: 6px 14px; border-radius: 16px; }
        .translation-badge { font-size: 0.85em; background-color: #f1f3f4; color: #5f6368; padding: 6px 12px; border-radius: 16px; margin-left: 10px; font-weight: 700; vertical-align: middle; border: 1px solid #e8eaed; }

        .video-container { position: relative; padding-bottom: 56.25%; height: 0; background: #000; border-radius: 16px; overflow: hidden; box-shadow: 0 8px 16px rgba(0,0,0,0.1); margin-bottom: 15px; border: 2px solid #f1f3f4; }
        .video-container iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none; }
        
        .resource-section { margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px dashed #f1f3f4; }
        .resource-title { font-size: 14px; color: #80868b; font-weight: 800; margin-bottom: 12px; }
        .resource-list { display: flex; gap: 10px; flex-wrap: wrap; }
        .resource-btn { background: #ffffff; color: #3c4043; padding: 10px 18px; border-radius: 24px; font-size: 14px; font-weight: 700; text-decoration: none; transition: all 0.2s ease; border: 2px solid #e8eaed; display: inline-flex; align-items: center; box-shadow: 0 2px 6px rgba(0,0,0,0.03); }
        .resource-btn:hover { background: #f8f9fa; color: #1a73e8; border-color: #4285f4; transform: translateY(-2px); box-shadow: 0 6px 12px rgba(66,133,244,0.15); }

        .article-box { background: #ffffff; padding: 24px; border-radius: 20px; border: 2px solid #f1f3f4; margin-top: 15px; margin-bottom: 15px; box-shadow: 0 4px 12px rgba(0,0,0,0.03); }
        .article-title { font-weight: 900; color: #202124; font-size: 1.25em; margin-bottom: 12px; line-height: 1.4; }
        .article-desc { color: #5f6368; font-size: 1.05em; line-height: 1.6; margin-bottom: 18px; }
        .article-link { display: inline-flex; align-items: center; color: #fff; background-color: #4285f4; padding: 12px 20px; text-decoration: none; font-size: 1em; font-weight: 800; border-radius: 24px; transition: all 0.3s; box-shadow: 0 4px 10px rgba(66,133,244,0.3); }
        .article-link:hover { background-color: #2b6de3; transform: translateY(-2px); box-shadow: 0 6px 15px rgba(66,133,244,0.4); }

        #loading-msg { display: none; color: #4285f4; font-weight: 800; margin-bottom: 10px; text-align: center; padding: 50px 0; font-size: 1.3em;}
        #error-msg { display: none; color: #ea4335; font-weight: 800; margin-bottom: 10px; text-align: center; background: #fce8e6; padding: 18px; border-radius: 16px; border: 2px solid #fad2cf; }
        
        /* 💡 검색창 스타일 둥글고 넓게 수정 */
        .mapboxgl-ctrl-geocoder { min-width: 320px !important; border-radius: 24px !important; box-shadow: 0 8px 16px rgba(0,0,0,0.1) !important; border: 2px solid #e8eaed !important; font-family: 'Nunito', sans-serif !important; }
        .mapboxgl-ctrl-geocoder--input { font-weight: 700 !important; color: #444 !important; }

        /* 4. 카테고리 칩 버튼 */
        #category-filters { position: absolute; top: 80px; right: 20px; z-index: 10; display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; max-width: 300px; }
        .cat-chip { background: #fff; border: 2px solid #e8eaed; border-radius: 20px; padding: 6px 14px; font-size: 13px; font-weight: 700; color: #5f6368; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
        .cat-chip:hover { border-color: #4285f4; color: #4285f4; }
        .cat-chip.active { background: #4285f4; color: #fff; border-color: #4285f4; }

        /* 3. 핫이슈 마커 펄스 애니메이션 */
        .hotspot-marker { width: 24px; height: 24px; background: rgba(234, 67, 53, 0.8); border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 0 rgba(234, 67, 53, 0.4); animation: pulse 2s infinite; cursor: pointer; }
        @keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(234, 67, 53, 0.7); } 70% { box-shadow: 0 0 0 15px rgba(234, 67, 53, 0); } 100% { box-shadow: 0 0 0 0 rgba(234, 67, 53, 0); } }
        .hotspot-label { position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%); background: #fff; padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 800; color: #ea4335; white-space: nowrap; box-shadow: 0 4px 8px rgba(0,0,0,0.1); pointer-events: none; }

        /* 2. 깨알 상식 (Trivia Bar) */
        #trivia-bar { display: flex; gap: 12px; align-items: center; justify-content: flex-start; flex-wrap: wrap; margin-bottom: 20px; background: #f8f9fa; padding: 12px 18px; border-radius: 16px; border: 1px solid #e8eaed; font-size: 14px; font-weight: 700; color: #3c4043; }
        .trivia-item { display: flex; align-items: center; gap: 6px; }

        /* 5. 원문 나란히 보기 Flexbox */
        .article-split-view { display: flex; gap: 20px; flex-direction: column; }
        .article-column { flex: 1; }
        .article-original { display: none; background: #f1f3f4; padding: 15px; border-radius: 12px; border-left: 4px solid #bdc1c6; }
        .article-original.show { display: block; }
        @media (min-width: 600px) { .article-split-view.show-split { flex-direction: row; } }
        
        .toggle-btn { background: #e8eaed; color: #3c4043; border: none; padding: 6px 12px; border-radius: 12px; font-size: 12px; font-weight: 800; cursor: pointer; float: right; margin-top: -5px; transition: background 0.2s; }
        .toggle-btn:hover { background: #dadce0; }
        .toggle-btn.active { background: #34a853; color: white; }

        /* 모달 배경 오버레이 추가 */
        #modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 999; opacity: 0; transition: opacity 0.3s ease; }"""
content = content.replace(css_old, css_new)

# 2. Add categories UI
cat_ui = """    </div>

    <!-- 4. 카테고리 필터링 칩 -->
    <div id="category-filters">
        <div class="cat-chip active" onclick="setCategory('general')">🌐 종합</div>
        <div class="cat-chip" onclick="setCategory('sports')">⚽ 스포츠</div>
        <div class="cat-chip" onclick="setCategory('entertainment')">🍿 문화</div>
        <div class="cat-chip" onclick="setCategory('technology')">🚀 과학/IT</div>
    </div>

    <div id="map"></div>"""
content = content.replace("""    </div>

    <div id="map"></div>""", cat_ui)

# 3. Update modal UI for trivia and loading text
modal_old = """    <div id="news-modal">
        <span class="close-btn" onclick="closeModal()">✖</span>
        <h3 id="news-title">지역 뉴스</h3>
        <p id="loading-msg">🌍 현지 데이터를 분석하고 번역 중입니다...</p>
        <p id="error-msg"></p>
        <div id="modal-content-area" style="display: none;">
            
            <div id="video-source-indicator" class="source-indicator"></div>"""
modal_new = """    <div id="news-modal">
        <span class="close-btn" onclick="closeModal()">✖</span>
        <h3 id="news-title">지역 뉴스</h3>
        
        <p id="loading-msg">🚀 뉴스 배달부가 현지 소식을 번역해서 가져오고 있어요! 조금만 기다려주세요...</p>
        <p id="error-msg"></p>
        
        <div id="modal-content-area" style="display: none;">
            <!-- 2. 깨알 상식 (Trivia Bar) -->
            <div id="trivia-bar" style="display: none;">
                <div class="trivia-item" id="trivia-flag">🏳️</div>
                <div class="trivia-item" id="trivia-capital">수도: -</div>
                <div class="trivia-item" id="trivia-weather">🌡️ -</div>
                <div class="trivia-item" id="trivia-time">⏰ -</div>
            </div>
            
            <div id="video-source-indicator" class="source-indicator"></div>"""
content = content.replace(modal_old, modal_new)

# 4. Update UI_DICT
uidict_old = """        const UI_DICT = {
            'ko': {
                langLabel: '🌐 언어:', loading: '🌍 현지 채널을 분석하고 번역 중입니다...', error: '데이터를 가져오는 중 오류가 발생했습니다.',
                videoTitle: '📺 해당 국가 주요 공영/공식 방송국 유튜브 채널', textTitle: '📰 해당 국가 주요 공영/공식 언론사 홈페이지',
                currentVideo: '📺 현재 시청 중: ', blockedVideo: '⚠️ 정책 차단으로 인한 대체 제공 ➔ 현재 시청 중: ', noVideo: '⚠️ 현재 이 지역의 영상을 불러올 수 없습니다.',
                currentText: '📰 현재 기사 출처: ', noText: '현재 이 지역의 주요 텍스트 기사를 불러올 수 없습니다.',
                readMore: '기사 원문 읽기 ➔', defaultDesc: '자세한 뉴스 내용은 원문 링크를 통해 확인해 주세요.', translated: '자동 번역됨'
            },"""
uidict_new = """        const UI_DICT = {
            'ko': {
                langLabel: '🌐 언어:', loading: '🚀 뉴스 배달부가 현지 소식을 번역해서 가져오고 있어요! 조금만 기다려주세요...', error: '앗! 데이터를 가져오다가 넘어졌어요. 다시 시도해 주세요.',
                videoTitle: '📺 해당 국가 주요 공영/공식 방송국 유튜브 채널', textTitle: '📰 해당 국가 주요 공영/공식 언론사 홈페이지',
                currentVideo: '📺 지금 보고 있는 뉴스: ', blockedVideo: '⚠️ 차단된 영상 대신 가져왔어요! ➔ 현재 시청 중: ', noVideo: '⚠️ 지금은 이 나라의 영상 뉴스를 찾지 못했어요.',
                currentText: '📰 지금 읽고 있는 기사: ', noText: '지금은 이 나라의 글 뉴스를 찾지 못했어요.',
                readMore: '기사 원문 읽기 ➔', defaultDesc: '기사 원문 링크를 눌러서 자세한 내용을 확인해 보세요!', translated: '자동 번역됨'
            },"""
content = content.replace(uidict_old, uidict_new)

# 5. Update Geocoder placeholder
content = content.replace("placeholder: '국가, 도시 검색...'", "placeholder: '어느 나라의 뉴스가 궁금한가요? (예: 파리, 영국)'")

# 6. Add JS variables
jsvars_old = """        let currentTargetLang = 'ko'; 
        let newsCache = {};"""
jsvars_new = """        let currentTargetLang = 'ko'; 
        let currentCategory = 'general';
        let newsCache = {};
        
        function setCategory(cat) {
            currentCategory = cat;
            document.querySelectorAll('.cat-chip').forEach(el => el.classList.remove('active'));
            event.target.classList.add('active');
            newsCache = {};
        }"""
content = content.replace(jsvars_old, jsvars_new)

# 7. Add Hotspots
hotspots_old = """        map.on('load', () => {
            map.addSource('countries-source', { 'type': 'geojson', 'data': 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json' });
            map.addLayer({ 'id': 'country-fills', 'type': 'fill', 'source': 'countries-source', 'paint': { 'fill-color': 'transparent' } });
            map.addLayer({ 'id': 'country-fills-hover', 'type': 'fill', 'source': 'countries-source', 'paint': { 'fill-color': 'rgba(255, 255, 255, 0.2)' }, 'filter': ['==', 'name', ''] });
        });"""
hotspots_new = """        map.on('load', () => {
            map.addSource('countries-source', { 'type': 'geojson', 'data': 'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json' });
            map.addLayer({ 'id': 'country-fills', 'type': 'fill', 'source': 'countries-source', 'paint': { 'fill-color': 'transparent' } });
            map.addLayer({ 'id': 'country-fills-hover', 'type': 'fill', 'source': 'countries-source', 'paint': { 'fill-color': 'rgba(255, 255, 255, 0.2)' }, 'filter': ['==', 'name', ''] });

            // 💡 핫이슈 국가 (샘플 3곳: 한국, 미국, 프랑스)
            const hotspots = [
                { lng: 127.7669, lat: 35.9078, name: '한국' },
                { lng: -95.7129, lat: 37.0902, name: '미국' },
                { lng: 2.2137, lat: 46.2276, name: '프랑스' }
            ];
            
            hotspots.forEach(hs => {
                const el = document.createElement('div');
                el.className = 'hotspot-marker';
                const label = document.createElement('div');
                label.className = 'hotspot-label';
                label.innerText = '🔥 오늘의 핫이슈';
                el.appendChild(label);
                
                new mapboxgl.Marker(el)
                    .setLngLat([hs.lng, hs.lat])
                    .addTo(map);
                    
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const isTouch = window.matchMedia("(pointer: coarse)").matches;
                    if (isTouch) {
                        document.getElementById('touch-confirm-msg').innerText = `${hs.name} 지역이 맞나요?`;
                        document.getElementById('touch-confirm-toast').classList.add('show');
                        pendingNewsRequest = { lat: hs.lat, lng: hs.lng, locationInfo: { code: 'N/A', name: hs.name } };
                    }
                    map.flyTo({ center: [hs.lng, hs.lat], zoom: 4, speed: 1.2, curve: 1.4, essential: true });
                    fetchAndShowNews(hs.lat, hs.lng);
                });
            });
        });"""
content = content.replace(hotspots_old, hotspots_new)

# 8. Add Trivia
fetch_trivia_js = """        async function fetchTrivia(countryCode, lat, lng) {
            try {
                const restRes = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
                let flag = '🏳️', capital = '-', timeStr = '-';
                if (restRes.ok) {
                    const countryData = (await restRes.json())[0];
                    if (countryData.flag) flag = countryData.flag;
                    if (countryData.capital && countryData.capital.length > 0) capital = `수도: ${countryData.capital[0]}`;
                    if (countryData.timezones && countryData.timezones.length > 0) {
                        const tz = countryData.timezones[0]; 
                        if (tz === 'UTC') {
                            timeStr = new Date().toLocaleTimeString([], {timeZone: 'UTC', hour: '2-digit', minute:'2-digit'});
                        } else {
                            const match = tz.match(/UTC([+-])(\\d{2}):(\\d{2})/);
                            if (match) {
                                const sign = match[1] === '+' ? 1 : -1;
                                const offsetMin = sign * (int(match[2]) * 60 + int(match[3]));
                                const localDate = new Date(new Date().getTime() + (new Date().getTimezoneOffset() + offsetMin) * 60000);
                                timeStr = localDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                            }
                        }
                    }
                }
                
                let weather = '🌡️ -';
                const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`);
                if (weatherRes.ok) {
                    const wData = await weatherRes.json();
                    if (wData.current_weather) weather = `🌡️ ${wData.current_weather.temperature}°C`;
                }
                
                document.getElementById('trivia-flag').innerText = flag;
                document.getElementById('trivia-capital').innerText = capital;
                document.getElementById('trivia-weather').innerText = weather;
                document.getElementById('trivia-time').innerText = `⏰ ${timeStr}`;
                document.getElementById('trivia-bar').style.display = 'flex';
            } catch(e) {
                document.getElementById('trivia-bar').style.display = 'none';
            }
        }"""
content = content.replace("async function fetchAndShowNews(lat, lng) {", fetch_trivia_js + "\n\n        async function fetchAndShowNews(lat, lng, preFetchedLocation = null) {")
content = content.replace("const locationInfo = await getLocationInfo(lat, lng);", "const locationInfo = preFetchedLocation || await getLocationInfo(lat, lng);")

fetch_old = """                const cacheKey = `${locationInfo.code}_${currentTargetLang}`;
                if (newsCache[cacheKey]) {
                    updateModal(locationInfo, newsCache[cacheKey].videoData, newsCache[cacheKey].textNews);
                    return;
                }

                let searchKeyword = PUBLIC_BROADCASTERS[locationInfo.code] || "Official News";
                const translatedCountry = await translateText(locationInfo.name, localLangCode);
                
                let [videoData, textNews] = await Promise.all([
                    getNewsVideoData(locationInfo.code, searchKeyword, translatedCountry),
                    getTextNews(locationInfo.code, translatedCountry)
                ]);
                
                if (textNews) {
                    const translationPromises = [translateText(textNews.title, currentTargetLang)];
                    if (textNews.description) translationPromises.push(translateText(textNews.description, currentTargetLang));
                    const translatedResults = await Promise.all(translationPromises);
                    textNews.title = translatedResults[0]; 
                    if (textNews.description) textNews.description = translatedResults[1]; 
                }"""
fetch_new = """                fetchTrivia(locationInfo.code, lat, lng);
                
                const cacheKey = `${locationInfo.code}_${currentCategory}_${currentTargetLang}`;
                if (newsCache[cacheKey]) {
                    updateModal(locationInfo, newsCache[cacheKey].videoData, newsCache[cacheKey].textNews);
                    return;
                }

                let searchKeyword = PUBLIC_BROADCASTERS[locationInfo.code] || "Official News";
                const translatedCountry = await translateText(locationInfo.name, localLangCode);
                
                let [videoData, textNews] = await Promise.all([
                    getNewsVideoData(locationInfo.code, searchKeyword, translatedCountry),
                    getTextNews(locationInfo.code, translatedCountry)
                ]);
                
                if (textNews) {
                    textNews.originalTitle = textNews.title;
                    textNews.originalDescription = textNews.description;
                    const translationPromises = [translateText(textNews.title, currentTargetLang)];
                    if (textNews.description) translationPromises.push(translateText(textNews.description, currentTargetLang));
                    const translatedResults = await Promise.all(translationPromises);
                    textNews.title = translatedResults[0]; 
                    if (textNews.description) textNews.description = translatedResults[1]; 
                }"""
content = content.replace(fetch_old, fetch_new)

# 9. Update APIs for categories
yt_old = """        async function getNewsVideoData(countryCode, searchKeyword, countryName) {
            let result = { type: 'none', videoId: '', officialLinks: [], channelName: PUBLIC_BROADCASTERS[countryCode] || '공식 채널' };
            if (!countryCode) return result;

            try {
                const localLang = getCountryLangCode(countryCode);
                const strictQuery = CUSTOM_QUERIES[countryCode] || `${searchKeyword} ${countryName} official news -vlog -music`;
                const regionParam = `&regionCode=${countryCode}`;
                const langParam = `&relevanceLanguage=${localLang}`;

                if (OFFICIAL_CHANNELS[countryCode]) {"""
yt_new = """        async function getNewsVideoData(countryCode, searchKeyword, countryName) {
            let result = { type: 'none', videoId: '', officialLinks: [], channelName: PUBLIC_BROADCASTERS[countryCode] || '공식 채널' };
            if (!countryCode) return result;

            let videoCategoryId = '25';
            let extraQuery = '';
            if (currentCategory === 'sports') { videoCategoryId = '17'; extraQuery = ' sports'; }
            if (currentCategory === 'entertainment') { videoCategoryId = '24'; extraQuery = ' entertainment'; }
            if (currentCategory === 'technology') { videoCategoryId = '28'; extraQuery = ' technology'; }

            try {
                const localLang = getCountryLangCode(countryCode);
                const strictQuery = (CUSTOM_QUERIES[countryCode] || `${searchKeyword} ${countryName} official news`) + extraQuery + " -vlog -music";
                const regionParam = `&regionCode=${countryCode}`;
                const langParam = `&relevanceLanguage=${localLang}`;

                if (OFFICIAL_CHANNELS[countryCode] && currentCategory === 'general') {"""
content = content.replace(yt_old, yt_new)
content = content.replace("videoCategoryId=25", "videoCategoryId=${videoCategoryId}")

news_old = """        async function getTextNews(countryCode, localCountryName) {
            if (!countryCode) return null;
            try {
                let url = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&country=${countryCode.toLowerCase()}&q=${encodeURIComponent(localCountryName)}`;"""
news_new = """        async function getTextNews(countryCode, localCountryName) {
            if (!countryCode) return null;
            
            let categoryParam = '';
            if (currentCategory === 'sports') categoryParam = '&category=sports';
            if (currentCategory === 'entertainment') categoryParam = '&category=entertainment';
            if (currentCategory === 'technology') categoryParam = '&category=technology';

            try {
                let url = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&country=${countryCode.toLowerCase()}&q=${encodeURIComponent(localCountryName)}${categoryParam}`;"""
content = content.replace(news_old, news_new)

# 10. Update text UI in updateModal
text_ui_old = """                const description = textNews.description ? textNews.description.substring(0, 130) + '...' : ui.defaultDesc;
                textContainer.innerHTML = `<div class="article-box"><div class="article-title">${textNews.title}</div><div class="article-desc">${description}</div><a href="${textNews.link}" target="_blank" class="article-link">${ui.readMore}</a></div>`;"""
text_ui_new = """                const description = textNews.description ? textNews.description.substring(0, 130) + '...' : ui.defaultDesc;
                const origDescription = textNews.originalDescription ? textNews.originalDescription.substring(0, 130) + '...' : '';
                
                textContainer.innerHTML = `
                <div class="article-box">
                    <button class="toggle-btn" onclick="toggleOriginalText(this)">원문 보기 🔄</button>
                    <div id="article-split-container" class="article-split-view">
                        <div class="article-column">
                            <div class="article-title">${textNews.title}</div>
                            <div class="article-desc">${description}</div>
                        </div>
                        <div class="article-column article-original" id="article-orig-box">
                            <div class="article-title" style="color:#5f6368; font-size:1.1em;">${textNews.originalTitle}</div>
                            <div class="article-desc" style="color:#80868b;">${origDescription}</div>
                        </div>
                    </div>
                    <a href="${textNews.link}" target="_blank" class="article-link" style="margin-top:10px;">${ui.readMore}</a>
                </div>`;"""
content = content.replace(text_ui_old, text_ui_new)

# 11. Add toggle function safely before </script>
toggle_js = """        function toggleOriginalText(btn) {
            const splitContainer = document.getElementById("article-split-container");
            const origBox = document.getElementById("article-orig-box");
            if (origBox.classList.contains("show")) {
                origBox.classList.remove("show");
                splitContainer.classList.remove("show-split");
                btn.classList.remove("active");
            } else {
                origBox.classList.add("show");
                splitContainer.classList.add("show-split");
                btn.classList.add("active");
            }
        }
    </script>"""
content = content.replace("    </script>", toggle_js)

# Fix parseInt (python int() bug in string replaced)
content = content.replace("int(match[2])", "parseInt(match[2])")
content = content.replace("int(match[3])", "parseInt(match[3])")


with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)
