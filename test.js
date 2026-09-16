const text = "οκλήσεις που επηρεάζουν τη διαθεσιμότητα και την ανάπτυξη του ανθρώπινου δυναμικού. (από αριστερά προς τα δεξιά) Η Φαίη Μακαντάση, Διευθύντρια Ερευνών της διαΝΕΟσις, η Μαρίνα Σπυριδάκη, Γενική Διευθύντρια Public Affairs της Παπαστράτος".substring(0, 250);
const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ko&dt=t&q=${encodeURIComponent(text)}`;
fetch(url).then(res => res.json()).then(data => console.log(data[0].map(item => item[0]).join(""))).catch(console.error);
