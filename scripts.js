// ============================================================================
// 🌍 1. 전 세계 주요 국가별 실제 현지 공영/공식 언론사 데이터베이스
// ============================================================================
const localNewsData = {
  // --- 아시아 (Asia) ---
  "KR": {
    countryName: "대한민국",
    youtubeLinks: [
      { name: "KBS News", url: "https://www.youtube.com/c/kbsworldtv" },
      { name: "MBC News", url: "https://www.youtube.com/c/MBCnews" }
    ],
    textLinks: [{ name: "연합뉴스 (Yonhap)", url: "https://en.yna.co.kr/" }]
  },
  "JP": {
    countryName: "일본",
    youtubeLinks: [{ name: "NHK World", url: "https://www.youtube.com/c/NHKWORLDJAPAN" }],
    textLinks: [{ name: "Kyodo News", url: "https://english.kyodonews.net/" }]
  },
  "CN": {
    countryName: "중국",
    youtubeLinks: [
      { name: "CCTV", url: "https://www.youtube.com/c/CCTV" },
      { name: "CGTN", url: "https://www.youtube.com/c/cgtn" }
    ],
    textLinks: [{ name: "Xinhua", url: "https://english.news.cn/" }]
  },
  "IN": {
    countryName: "인도",
    youtubeLinks: [{ name: "DD News", url: "https://www.youtube.com/c/DDNewsOfficial" }],
    textLinks: [{ name: "PTI", url: "https://www.ptinews.com/" }]
  },
  "ID": {
    countryName: "인도네시아",
    youtubeLinks: [{ name: "TVRI", url: "https://www.youtube.com/c/TVRINasional" }],
    textLinks: [{ name: "Antara News", url: "https://en.antaranews.com/" }]
  },
  "SG": {
    countryName: "싱가포르",
    youtubeLinks: [{ name: "CNA", url: "https://www.youtube.com/c/channelnewsasia" }],
    textLinks: [{ name: "CNA", url: "https://www.channelnewsasia.com/" }]
  },

  // --- 아메리카 (Americas) ---
  "US": {
    countryName: "미국",
    youtubeLinks: [
      { name: "PBS NewsHour", url: "https://www.youtube.com/c/PBSNewsHour" },
      { name: "ABC News", url: "https://www.youtube.com/user/ABCNews" }
    ],
    textLinks: [
      { name: "AP News", url: "https://apnews.com/" },
      { name: "NPR", url: "https://www.npr.org/" }
    ]
  },
  "CA": {
    countryName: "캐나다",
    youtubeLinks: [{ name: "CBC News", url: "https://www.youtube.com/c/CBCNews" }],
    textLinks: [{ name: "CBC", url: "https://www.cbc.ca/news" }]
  },
  "BR": {
    countryName: "브라질",
    youtubeLinks: [{ name: "TV Brasil", url: "https://www.youtube.com/c/tvbrasil" }],
    textLinks: [{ name: "Agência Brasil", url: "https://agenciabrasil.ebc.com.br/en" }]
  },
  "MX": {
    countryName: "멕시코",
    youtubeLinks: [{ name: "Canal Once", url: "https://www.youtube.com/c/CanalOnceIPN" }],
    textLinks: [{ name: "El Universal", url: "https://www.eluniversal.com.mx/" }]
  },

  // --- 유럽 (Europe) ---
  "GB": {
    countryName: "영국",
    youtubeLinks: [{ name: "BBC News", url: "https://www.youtube.com/c/BBCNews" }],
    textLinks: [{ name: "BBC", url: "https://www.bbc.com/news" }]
  },
  "FR": {
    countryName: "프랑스",
    youtubeLinks: [{ name: "France 24", url: "https://www.youtube.com/c/FRANCE24English" }],
    textLinks: [{ name: "Le Monde", url: "https://www.lemonde.fr/en/" }]
  },
  "DE": {
    countryName: "독일",
    youtubeLinks: [{ name: "DW News", url: "https://www.youtube.com/c/dwnews" }],
    textLinks: [{ name: "DW", url: "https://www.dw.com/" }]
  },
  "IT": {
    countryName: "이탈리아",
    youtubeLinks: [{ name: "Rai News", url: "https://www.youtube.com/c/rainews" }],
    textLinks: [{ name: "ANSA", url: "https://www.ansa.it/english/" }]
  },
  "ES": {
    countryName: "스페인",
    youtubeLinks: [{ name: "RTVE", url: "https://www.youtube.com/c/rtvenoticias" }],
    textLinks: [{ name: "EFE", url: "https://efe.com/en/" }]
  },

  // --- 오세아니아 (Oceania) ---
  "AU": {
    countryName: "호주",
    youtubeLinks: [{ name: "ABC News", url: "https://www.youtube.com/c/NewsOnABC" }],
    textLinks: [{ name: "ABC", url: "https://www.abc.net.au/news" }]
  },
  "NZ": {
    countryName: "뉴질랜드",
    youtubeLinks: [{ name: "1News", url: "https://www.youtube.com/c/1NewsNZ" }],
    textLinks: [{ name: "RNZ", url: "https://www.rnz.co.nz/" }]
  },

  // --- 중동 & 아프리카 (Middle East & Africa) ---
  "ZA": {
    countryName: "남아프리카 공화국",
    youtubeLinks: [{ name: "SABC News", url: "https://www.youtube.com/c/SABCNews" }],
    textLinks: [{ name: "News24", url: "https://www.news24.com/" }]
  },
  "SA": {
    countryName: "사우디아라비아",
    youtubeLinks: [{ name: "Al Ekhbariya", url: "https://www.youtube.com/c/alekhbariyatv" }],
    textLinks: [{ name: "SPA", url: "https://www.spa.gov.sa/en" }]
  },
  "TR": {
    countryName: "튀르키예",
    youtubeLinks: [{ name: "TRT World", url: "https://www.youtube.com/c/trtworld" }],
    textLinks: [{ name: "Anadolu Agency", url: "https://www.aa.com.tr/en" }]
  },

  // ============================================================================
  // 🛡️ 2. 설정되지 않은 기타 국가를 위한 기본값 (안전장치 - 글로벌 통신사)
  // ============================================================================
  "DEFAULT": {
    countryName: "Global",
    youtubeLinks: [
      { name: "Reuters", url: "https://www.youtube.com/user/ReutersVideo" },
      { name: "AP", url: "https://www.youtube.com/user/AssociatedPress" }
    ],
    textLinks: [
      { name: "Reuters News", url: "https://www.reuters.com/" },
      { name: "AP News", url: "https://apnews.com/" }
    ]
  }
};


// ============================================================================
// ⚙️ 3. 지도 클릭 시 모달창에 언론사 버튼을 동적으로 렌더링하는 통합 함수
// ============================================================================
function updateNewsLinks(countryCode) {
  // 1) 클릭한 국가 코드가 데이터베이스에 있는지 확인 (없으면 DEFAULT 적용)
  const newsInfo = localNewsData[countryCode] || localNewsData["DEFAULT"];

  // 2) HTML에 있는 버튼 컨테이너를 찾아서 내용을 깨끗하게 지우기
  const youtubeContainer = document.getElementById('youtube-links-container');
  const textContainer = document.getElementById('text-links-container');
  
  if (youtubeContainer) youtubeContainer.innerHTML = '';
  if (textContainer) textContainer.innerHTML = '';

  // 3) 해당 국가의 유튜브 버튼 렌더링
  if (youtubeContainer) {
    newsInfo.youtubeLinks.forEach(link => {
      const btn = document.createElement('a');
      btn.href = link.url;
      btn.target = "_blank"; // 새 창에서 열기
      btn.className = "news-btn youtube-btn"; // 버튼 스타일 지정
      btn.innerText = `▶ ${link.name}`;
      youtubeContainer.appendChild(btn);
    });
  }

  // 4) 해당 국가의 텍스트 뉴스 버튼 렌더링
  if (textContainer) {
    newsInfo.textLinks.forEach(link => {
      const btn = document.createElement('a');
      btn.href = link.url;
      btn.target = "_blank";
      btn.className = "news-btn text-btn";
      btn.innerText = `📰 ${link.name}`;
      textContainer.appendChild(btn);
    });
  }
}