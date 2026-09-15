with open("index.html", "r") as f:
    text = f.read()

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
                                const offsetMin = sign * (parseInt(match[2]) * 60 + parseInt(match[3]));
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
        }
"""
text = text.replace("        async function fetchAndShowNews(lat, lng, preFetchedLocation = null) {", fetch_trivia_js + "\n        async function fetchAndShowNews(lat, lng, preFetchedLocation = null) {")

with open("index.html", "w") as f:
    f.write(text)
