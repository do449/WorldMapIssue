// ============================================================================
// 🌍 1. 전 세계 70+ 국가별 실제 현지 공영/공식 언론사 데이터베이스
// ============================================================================
const localNewsData = {
  // --- 아시아 & 오세아니아 (Asia & Oceania) ---
  "KR": { countryName: "대한민국", youtubeLinks: [{ name: "KBS News", url: "https://www.youtube.com/c/kbsworldtv" }, { name: "MBC News", url: "https://www.youtube.com/c/MBCnews" }], textLinks: [{ name: "연합뉴스", url: "https://en.yna.co.kr/" }] },
  "JP": { countryName: "일본", youtubeLinks: [{ name: "NHK World", url: "https://www.youtube.com/c/NHKWORLDJAPAN" }], textLinks: [{ name: "Kyodo News", url: "https://english.kyodonews.net/" }] },
  "CN": { countryName: "중국", youtubeLinks: [{ name: "CCTV", url: "https://www.youtube.com/c/CCTV" }, { name: "CGTN", url: "https://www.youtube.com/c/cgtn" }], textLinks: [{ name: "Xinhua", url: "https://english.news.cn/" }] },
  "TW": { countryName: "대만", youtubeLinks: [{ name: "PTS", url: "https://www.youtube.com/c/PTS" }], textLinks: [{ name: "Focus Taiwan", url: "https://focustaiwan.tw/" }] },
  "HK": { countryName: "홍콩", youtubeLinks: [{ name: "RTHK", url: "https://www.youtube.com/c/RTHK" }], textLinks: [{ name: "SCMP", url: "https://www.scmp.com/" }] },
  "IN": { countryName: "인도", youtubeLinks: [{ name: "DD News", url: "https://www.youtube.com/c/DDNewsOfficial" }], textLinks: [{ name: "PTI", url: "https://www.ptinews.com/" }] },
  "PK": { countryName: "파키스탄", youtubeLinks: [{ name: "PTV News", url: "https://www.youtube.com/c/PTVNews" }], textLinks: [{ name: "Dawn", url: "https://www.dawn.com/" }] },
  "BD": { countryName: "방글라데시", youtubeLinks: [{ name: "BTV", url: "https://www.youtube.com/c/btv" }], textLinks: [{ name: "The Daily Star", url: "https://www.thedailystar.net/" }] },
  "LK": { countryName: "스리랑카", youtubeLinks: [{ name: "News 1st", url: "https://www.youtube.com/c/News1st" }], textLinks: [{ name: "Daily Mirror", url: "https://www.dailymirror.lk/" }] },
  "ID": { countryName: "인도네시아", youtubeLinks: [{ name: "TVRI", url: "https://www.youtube.com/c/TVRINasional" }], textLinks: [{ name: "Antara News", url: "https://en.antaranews.com/" }] },
  "SG": { countryName: "싱가포르", youtubeLinks: [{ name: "CNA", url: "https://www.youtube.com/c/channelnewsasia" }], textLinks: [{ name: "CNA", url: "https://www.channelnewsasia.com/" }] },
  "VN": { countryName: "베트남", youtubeLinks: [{ name: "VTV24", url: "https://www.youtube.com/c/vtv24" }], textLinks: [{ name: "VNExpress", url: "https://e.vnexpress.net/" }] },
  "TH": { countryName: "태국", youtubeLinks: [{ name: "Thai PBS", url: "https://www.youtube.com/c/ThaiPBS" }], textLinks: [{ name: "Bangkok Post", url: "https://www.bangkokpost.com/" }] },
  "PH": { countryName: "필리핀", youtubeLinks: [{ name: "ABS-CBN News", url: "https://www.youtube.com/user/ABSCBNNews" }], textLinks: [{ name: "Inquirer", url: "https://www.inquirer.net/" }] },
  "MY": { countryName: "말레이시아", youtubeLinks: [{ name: "Astro AWANI", url: "https://www.youtube.com/c/astroawani" }], textLinks: [{ name: "The Star", url: "https://www.thestar.com.my/" }] },
  "AU": { countryName: "호주", youtubeLinks: [{ name: "ABC News", url: "https://www.youtube.com/c/NewsOnABC" }], textLinks: [{ name: "ABC", url: "https://www.abc.net.au/news" }] },
  "NZ": { countryName: "뉴질랜드", youtubeLinks: [{ name: "1News", url: "https://www.youtube.com/c/1NewsNZ" }], textLinks: [{ name: "RNZ", url: "https://www.rnz.co.nz/" }] },

  // --- 아메리카 (Americas) ---
  "US": { countryName: "미국", youtubeLinks: [{ name: "PBS NewsHour", url: "https://www.youtube.com/c/PBSNewsHour" }, { name: "ABC News", url: "https://www.youtube.com/user/ABCNews" }], textLinks: [{ name: "AP News", url: "https://apnews.com/" }] },
  "CA": { countryName: "캐나다", youtubeLinks: [{ name: "CBC News", url: "https://www.youtube.com/c/CBCNews" }], textLinks: [{ name: "CBC", url: "https://www.cbc.ca/news" }] },
  "MX": { countryName: "멕시코", youtubeLinks: [{ name: "Canal Once", url: "https://www.youtube.com/c/CanalOnceIPN" }], textLinks: [{ name: "El Universal", url: "https://www.eluniversal.com.mx/" }] },
  "CR": { countryName: "코스타리카", youtubeLinks: [{ name: "Teletica", url: "https://www.youtube.com/c/Teletica" }], textLinks: [{ name: "La Nación", url: "https://www.nacion.com/" }] },
  "CU": { countryName: "쿠바", youtubeLinks: [{ name: "Cubavisión", url: "https://www.youtube.com/c/Cubavisión" }], textLinks: [{ name: "Granma", url: "https://en.granma.cu/" }] },
  "BR": { countryName: "브라질", youtubeLinks: [{ name: "TV Brasil", url: "https://www.youtube.com/c/tvbrasil" }], textLinks: [{ name: "Agência Brasil", url: "https://agenciabrasil.ebc.com.br/en" }] },
  "AR": { countryName: "아르헨티나", youtubeLinks: [{ name: "Televisión Pública", url: "https://www.youtube.com/c/TVPublicaArgentina" }], textLinks: [{ name: "Télam", url: "https://www.telam.com.ar/" }] },
  "CL": { countryName: "칠레", youtubeLinks: [{ name: "TVN", url: "https://www.youtube.com/c/tvn" }], textLinks: [{ name: "La Tercera", url: "https://www.latercera.com/" }] },
  "CO": { countryName: "콜롬비아", youtubeLinks: [{ name: "Noticias Caracol", url: "https://www.youtube.com/c/NoticiasCaracol" }], textLinks: [{ name: "El Tiempo", url: "https://www.eltiempo.com/" }] },
  "PE": { countryName: "페루", youtubeLinks: [{ name: "TV Perú", url: "https://www.youtube.com/c/TVPerúOficial" }], textLinks: [{ name: "El Comercio", url: "https://elcomercio.pe/" }] },
  "UY": { countryName: "우루과이", youtubeLinks: [{ name: "Canal 10", url: "https://www.youtube.com/c/canal10uruguay" }], textLinks: [{ name: "El País", url: "https://www.elpais.com.uy/" }] },
  "PY": { countryName: "파라과이", youtubeLinks: [{ name: "Telefuturo", url: "https://www.youtube.com/c/Telefuturo" }], textLinks: [{ name: "ABC Color", url: "https://www.abc.com.py/" }] },
  "BO": { countryName: "볼리비아", youtubeLinks: [{ name: "Bolivia TV", url: "https://www.youtube.com/c/BoliviaTV" }], textLinks: [{ name: "La Razón", url: "https://www.la-razon.com/" }] },
  "EC": { countryName: "에콰도르", youtubeLinks: [{ name: "Ecuavisa", url: "https://www.youtube.com/c/ecuavisa" }], textLinks: [{ name: "El Universo", url: "https://www.eluniverso.com/" }] },
  "VE": { countryName: "베네수엘라", youtubeLinks: [{ name: "VTV", url: "https://www.youtube.com/c/VTV" }], textLinks: [{ name: "El Nacional", url: "https://www.elnacional.com/" }] },

  // --- 유럽 (Europe) ---
  "GB": { countryName: "영국", youtubeLinks: [{ name: "BBC News", url: "https://www.youtube.com/c/BBCNews" }], textLinks: [{ name: "BBC", url: "https://www.bbc.com/news" }] },
  "FR": { countryName: "프랑스", youtubeLinks: [{ name: "France 24", url: "https://www.youtube.com/c/FRANCE24English" }], textLinks: [{ name: "Le Monde", url: "https://www.lemonde.fr/en/" }] },
  "DE": { countryName: "독일", youtubeLinks: [{ name: "DW News", url: "https://www.youtube.com/c/dwnews" }], textLinks: [{ name: "DW", url: "https://www.dw.com/" }] },
  "IT": { countryName: "이탈리아", youtubeLinks: [{ name: "Rai News", url: "https://www.youtube.com/c/rainews" }], textLinks: [{ name: "ANSA", url: "https://www.ansa.it/english/" }] },
  "ES": { countryName: "스페인", youtubeLinks: [{ name: "RTVE", url: "https://www.youtube.com/c/rtvenoticias" }], textLinks: [{ name: "EFE", url: "https://efe.com/en/" }] },
  "SE": { countryName: "스웨덴", youtubeLinks: [{ name: "SVT Nyheter", url: "https://www.youtube.com/c/svtnyheter" }], textLinks: [{ name: "The Local SE", url: "https://www.thelocal.se/" }] },
  "NO": { countryName: "노르웨이", youtubeLinks: [{ name: "NRK", url: "https://www.youtube.com/c/NRK" }], textLinks: [{ name: "NRK News", url: "https://www.nrk.no/" }] },
  "DK": { countryName: "덴마크", youtubeLinks: [{ name: "DR Nyheder", url: "https://www.youtube.com/c/drnyheder" }], textLinks: [{ name: "The Local DK", url: "https://www.thelocal.dk/" }] },
  "FI": { countryName: "핀란드", youtubeLinks: [{ name: "Yle News", url: "https://www.youtube.com/c/yle" }], textLinks: [{ name: "Yle", url: "https://yle.fi/news" }] },
  "IE": { countryName: "아일랜드", youtubeLinks: [{ name: "RTÉ News", url: "https://www.youtube.com/c/rtenews" }], textLinks: [{ name: "RTÉ", url: "https://www.rte.ie/news/" }] },
  "NL": { countryName: "네덜란드", youtubeLinks: [{ name: "NOS", url: "https://www.youtube.com/c/NOS" }], textLinks: [{ name: "NOS News", url: "https://nos.nl/" }] },
  "BE": { countryName: "벨기에", youtubeLinks: [{ name: "VRT NWS", url: "https://www.youtube.com/c/vrtnws" }], textLinks: [{ name: "The Brussels Times", url: "https://www.brusselstimes.com/" }] },
  "CH": { countryName: "스위스", youtubeLinks: [{ name: "SRF News", url: "https://www.youtube.com/c/srfnews" }], textLinks: [{ name: "Swissinfo", url: "https://www.swissinfo.ch/eng" }] },
  "AT": { countryName: "오스트리아", youtubeLinks: [{ name: "ORF", url: "https://www.youtube.com/c/ORF" }], textLinks: [{ name: "The Local AT", url: "https://www.thelocal.at/" }] },
  "PT": { countryName: "포르투갈", youtubeLinks: [{ name: "RTP", url: "https://www.youtube.com/c/RTP" }], textLinks: [{ name: "The Portugal News", url: "https://www.theportugalnews.com/" }] },
  "GR": { countryName: "그리스", youtubeLinks: [{ name: "ERT", url: "https://www.youtube.com/c/ERTsocial" }], textLinks: [{ name: "Ekathimerini", url: "https://www.ekathimerini.com/" }] },
  "PL": { countryName: "폴란드", youtubeLinks: [{ name: "TVP Info", url: "https://www.youtube.com/c/tvpinfo" }], textLinks: [{ name: "Notes from Poland", url: "https://notesfrompoland.com/" }] },
  "CZ": { countryName: "체코", youtubeLinks: [{ name: "ČT24", url: "https://www.youtube.com/c/ct24" }], textLinks: [{ name: "Prague Morning", url: "https://www.praguemorning.cz/" }] },
  "HU": { countryName: "헝가리", youtubeLinks: [{ name: "M1", url: "https://www.youtube.com/c/m1" }], textLinks: [{ name: "Hungary Today", url: "https://hungarytoday.hu/" }] },
  "RO": { countryName: "루마니아", youtubeLinks: [{ name: "TVR", url: "https://www.youtube.com/c/tvr" }], textLinks: [{ name: "Romania Insider", url: "https://www.romania-insider.com/" }] },
  "UA": { countryName: "우크라이나", youtubeLinks: [{ name: "Suspilne", url: "https://www.youtube.com/c/suspilne" }], textLinks: [{ name: "Kyiv Independent", url: "https://kyivindependent.com/" }] },

  // --- 중동 & 아프리카 (Middle East & Africa) ---
  "TR": { countryName: "튀르키예", youtubeLinks: [{ name: "TRT World", url: "https://www.youtube.com/c/trtworld" }], textLinks: [{ name: "Anadolu Agency", url: "https://www.aa.com.tr/en" }] },
  "SA": { countryName: "사우디아라비아", youtubeLinks: [{ name: "Al Ekhbariya", url: "https://www.youtube.com/c/alekhbariyatv" }], textLinks: [{ name: "SPA", url: "https://www.spa.gov.sa/en" }] },
  "AE": { countryName: "아랍에미리트", youtubeLinks: [{ name: "Al Jazeera English", url: "https://www.youtube.com/c/aljazeeraenglish" }], textLinks: [{ name: "Khaleej Times", url: "https://www.khaleejtimes.com/" }] },
  "IL": { countryName: "이스라엘", youtubeLinks: [{ name: "KAN 11", url: "https://www.youtube.com/c/kan11" }], textLinks: [{ name: "The Times of Israel", url: "https://www.timesofisrael.com/" }] },
  "IR": { countryName: "이란", youtubeLinks: [{ name: "Press TV", url: "https://www.youtube.com/c/presstv" }], textLinks: [{ name: "Tehran Times", url: "https://www.tehrantimes.com/" }] },
  "IQ": { countryName: "이라크", youtubeLinks: [{ name: "Al Iraqiya", url: "https://www.youtube.com/c/aliraqiya" }], textLinks: [{ name: "Iraqi News", url: "https://www.iraqinews.com/" }] },
  "ZA": { countryName: "남아프리카 공화국", youtubeLinks: [{ name: "SABC News", url: "https://www.youtube.com/c/SABCNews" }], textLinks: [{ name: "News24", url: "https://www.news24.com/" }] },
  "EG": { countryName: "이집트", youtubeLinks: [{ name: "Nile TV", url: "https://www.youtube.com/user/NileTVInternational" }], textLinks: [{ name: "Ahram Online", url: "https://english.ahram.org.eg/" }] },
  "NG": { countryName: "나이지리아", youtubeLinks: [{ name: "Channels Television", url: "https://www.youtube.com/c/channelsweb" }], textLinks: [{ name: "Vanguard", url: "https://www.vanguardngr.com/" }] },
  "KE": { countryName: "케냐", youtubeLinks: [{ name: "Citizen TV", url: "https://www.youtube.com/c/citizentvkenya" }], textLinks: [{ name: "Daily Nation", url: "https://nation.africa/kenya" }] },
  "MA": { countryName: "모로코", youtubeLinks: [{ name: "2M", url: "https://www.youtube.com/c/2m" }], textLinks: [{ name: "Morocco World News", url: "https://www.moroccoworldnews.com/" }] },
  "DZ": { countryName: "알제리", youtubeLinks: [{ name: "Echorouk News", url: "https://www.youtube.com/c/EchorouknewsTV" }], textLinks: [{ name: "APS", url: "https://www.aps.dz/en/" }] },
  "GH": { countryName: "가나", youtubeLinks: [{ name: "JoyNews", url: "https://www.youtube.com/c/JoyNews" }], textLinks: [{ name: "Graphic Online", url: "https://www.graphic.com.gh/" }] },
  "ET": { countryName: "에티오피아", youtubeLinks: [{ name: "EBC", url: "https://www.youtube.com/c/ebc" }], textLinks: [{ name: "Fana BC", url: "https://www.fanabc.com/english/" }] },
  "TZ": { countryName: "탄자니아", 리youtubeLinks: [{ name: "TBC", url: "https://www.youtube.com/c/tbconline" }], textLinks: [{ name: "The Citizen", url: "https://www.thecitizen.co.tz/" }] },

  // ============================================================================
  // 🛡️ 2. 설정되지 않은 기타 국가를 위한 기본값 (안전장치)
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