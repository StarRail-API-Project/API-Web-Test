async function fetchAndSaveUserInfo() {
    const userId = document.getElementById('userIdInput').value;

    if (!userId) {
        alert("Please enter a User ID.");
        return;
    }

    const originalApiUrl = `https://api.mihomo.me/sr_info_parsed/${userId}?l=en`;
    //const apiUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalApiUrl)}`;
    const apiUrl = `https://corsproxy.io/?url=${originalApiUrl}`
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();

        sessionStorage.setItem(`apiData`, JSON.stringify(jsonData));
        alert(`User info for ID ${userId} has been fetched and saved to session storage.`);
        console.log("Data saved:", jsonData);

    } catch (error) {
        console.error("Error fetching or saving user data:", error);
        alert("Failed to fetch user data");
    }
    chapre();
}
function getFromSessionStorage() {
    try {
    const jsonString = sessionStorage.getItem('apiData');
    if (jsonString) {
    const jsonData = JSON.parse(jsonString);
    console.log('Data retrieved from session storage:', jsonData);
    return jsonData;
    } else {
        console.log('No data found in session storage.');
    return null;
    }
    } catch (error) {
    console.error('Error retrieving data from session storage:', error);
    return null;
    }
}
function chapre() {
    const basePath = "lib/StarRailRes/"; 
    const jsonData = getFromSessionStorage();
    if (!jsonData || typeof jsonData.characters[0].portrait === 'undefined') {
        console.error("Could not find portrait data in session storage");
        const errorMsg = document.createElement('p');
        errorMsg.textContent = "Error: Could not load character portrait";
        errorMsg.style.color = "red";
        (document.getElementById('tg-0pky') || document.body).appendChild(errorMsg);
        return; 
    }
    const portraitFileName = jsonData.characters[0].portrait; 
    const imagePath = basePath + portraitFileName;
    // 'contain' will fit the entire image within the bounds, possibly leaving empty space.
    // 'cover' will fill the bounds, possibly cropping some of the image.
    // 'fill' will stretch the image to fit, possibly distorting it.
    // 'scale-down' will display the image at its natural size if smaller than bounds, or scale down like 'contain'.
    let img = document.createElement('img');
    img.src = imagePath;
    img.style.width = "480px";
    img.style.height = "480px";
    img.style.objectFit = "contain"; 
    img.onerror = function() {
        console.error("Error loading image. Path: " + imagePath );
        const errorText = document.createElement('p');
        errorText.textContent = `Failed to load image: ${imagePath}`;
        errorText.style.color = "orange";
        if (img.parentNode) {
            img.parentNode.replaceChild(errorText, img);
        } else {
            (document.getElementById('tg-0pky') || document.body).appendChild(errorText);
        }
    };
    img.alt = portraitFileName; 
    document.getElementById('tg-0pky').appendChild(img);
    // name handling 
    const name = document.getElementById('username');
    name.innerHTML += jsonData.player.nickname;

    const nameElement = document.getElementById('cha1name');
    nameElement.innerHTML += jsonData.characters[0].name;
    
    const lvlElement = document.getElementById('cha1lvl');
    lvlElement.innerHTML += jsonData.characters[0].level;

    let eru = document.createElement("img")
    erupath = basePath + jsonData.characters[0].path.icon;
    eru.src = erupath;
    eru.style.width = "26px";
    eru.style.height = "26px";
    eru.style.objectFit = "contain";
    document.getElementById('cha1type').appendChild(eru);

    let typ = document.createElement("img")
    typpath = basePath + jsonData.characters[0].element.icon;
    typ.src = typpath;
    typ.style.width = "26px";
    typ.style.height = "26px";
    typ.style.objectFit = "contain";
    document.getElementById('cha1type').appendChild(typ);
    charank();

}
function charank() {
    const basePath = "lib/StarRailRes/";
    const jsonData = getFromSessionStorage();

    let rank1 = document.createElement("img")
    rank1path = basePath + jsonData.characters[0].rank_icons[0];
    rank1.src = rank1path;
    rank1.style.width = "26px";
    rank1.style.height = "26px";
    rank1.style.objectFit = "contain";
    document.getElementById('tg-0pky').appendChild(rank1);

    let rank2 = document.createElement("img")
    rank2path = basePath + jsonData.characters[0].rank_icons[1];
    rank2.src = rank2path;
    rank2.style.width = "26px";
    rank2.style.height = "26px";
    rank2.style.objectFit = "contain";
    document.getElementById('tg-0pky').appendChild(rank2);

    let skill = document.createElement("img")
    skillpath = basePath + jsonData.characters[0].rank_icons[2];
    skill.src = skillpath;
    skill.style.width = "26px";
    skill.style.height = "26px";
    skill.style.objectFit = "contain";
    document.getElementById('tg-0pky').appendChild(skill);

    let rank4 = document.createElement("img")
    rank4path = basePath + jsonData.characters[0].rank_icons[3];
    rank4.src = rank4path;
    rank4.style.width = "26px";
    rank4.style.height = "26px";
    rank4.style.objectFit = "contain";
    document.getElementById('tg-0pky').appendChild(rank4);

    let ult = document.createElement("img")
    ultpath = basePath + jsonData.characters[0].rank_icons[4];
    ult.src = ultpath;
    ult.style.width = "26px";
    ult.style.height = "26px";
    ult.style.objectFit = "contain";
    document.getElementById('tg-0pky').appendChild(ult);

    let rank6 = document.createElement("img")
    rank6path = basePath + jsonData.characters[0].rank_icons[4];
    rank6.src = rank6path;
    rank6.style.width = "26px";
    rank6.style.height = "26px";
    rank6.style.objectFit = "contain";
    document.getElementById('tg-0pky').appendChild(rank6);
    chardata();
}
function chardata() {
    const basePath = "lib/StarRailRes/";
    const jsonData = getFromSessionStorage();
    let hp = document.createElement("img");
    let hppath = basePath + jsonData.characters[0].attributes[0].icon;
    hp.src = hppath;
    hp.style.width = "26px";
    hp.style.height = "26px";
    hp.style.objectFit = "contain";
    const targetElement = document.getElementById('pkychardata');
    targetElement.appendChild(hp);
    const whitespace = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"); // This is 7 non-breaking spaces
    targetElement.appendChild(whitespace);
    const HP = Math.floor(jsonData.characters[0].attributes[0].value + jsonData.characters[0].additions[4].value);
    targetElement.appendChild(document.createTextNode(HP));

    let atk = document.createElement("img");
    let atkpath = basePath + jsonData.characters[0].attributes[1].icon;
    atk.src = atkpath;
    atk.style.width = "26px";
    atk.style.height = "26px";
    atk.style.objectFit = "contain";
    const atkElement = document.getElementById('pkychardata');
    atkElement.appendChild(atk);
    const atkwhitespace = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"); // This is 7 non-breaking spaces
    atkElement.appendChild(atkwhitespace);
    const ATK = Math.floor(jsonData.characters[0].attributes[1].value + jsonData.characters[0].additions[1].value);
    atkElement.appendChild(document.createTextNode(ATK));


    let def = document.createElement("img");
    let defpath = basePath + jsonData.characters[0].attributes[2].icon;
    def.src = defpath;
    def.style.width = "26px";
    def.style.height = "26px";
    def.style.objectFit = "contain";
    const defElement = document.getElementById('pkychardata');
    defElement.appendChild(def);
    const defwhitespace = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"); // This is 7 non-breaking spaces
    defElement.appendChild(defwhitespace);
    const DEF = Math.floor(jsonData.characters[0].attributes[2].value + jsonData.characters[0].additions[5].value);
    defElement.appendChild(document.createTextNode(DEF));

    var br = document.createElement("br");
    defElement.appendChild(br);

    let spd = document.createElement("img");
    let spdpath = basePath + jsonData.characters[0].attributes[3].icon;
    spd.src = spdpath;
    spd.style.width = "26px";
    spd.style.height = "26px";
    spd.style.objectFit = "contain"; 
    const spdElement = document.getElementById('pkychardata');
    spdElement.appendChild(spd);
    const spdwhitespace = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"); // This is 7 non-breaking spaces
    spdElement.appendChild(spdwhitespace);
    const SPD = Math.floor(jsonData.characters[0].attributes[3].value + jsonData.characters[0].additions[2].value);
    defElement.appendChild(document.createTextNode(SPD));

    let critrate = document.createElement("img");
    let critratepath = basePath + jsonData.characters[0].attributes[4].icon;
    critrate.src = critratepath;
    critrate.style.width = "26px";
    critrate.style.height = "26px";
    critrate.style.objectFit = "contain";
    const critrateElement = document.getElementById('pkychardata');
    critrateElement.appendChild(critrate);
    const critratewhitespace = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"); // This is 7 non-breaking spaces
    critrateElement.appendChild(critratewhitespace);
    let CRITR = (jsonData.characters[0].attributes[4].value + jsonData.characters[0].additions[3].value) * 100;
    CRITR = Math.floor(CRITR)
    CRITR = CRITR.toString();
    defElement.appendChild(document.createTextNode(CRITR+"%"));

    let critdmg = document.createElement("img");
    let critdmgpath = basePath + jsonData.characters[0].attributes[5].icon;
    critdmg.src = critdmgpath;
    critdmg.style.width = "26px";
    critdmg.style.height = "26px";
    critdmg.style.objectFit = "contain";
    const critdmgElement = document.getElementById('pkychardata');
    critdmgElement.appendChild(critdmg);
    const critdmgwhitespace = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"); // This is 7 non-breaking spaces
    critdmgElement.appendChild(critdmgwhitespace);
    let CRITD = (jsonData.characters[0].attributes[5].value + jsonData.characters[0].additions[6].value) * 100;
    CRITD = Math.floor(CRITD)
    CRITD = CRITD.toString();
    defElement.appendChild(document.createTextNode(CRITD + "%"));
}
function relicdata() {
    // not yet finished 
    const basePath = "lib/StarRailRes/";
    const jsonData = getFromSessionStorage();

    let spd = document.createElement("img");
    let spdpath = basePath + jsonData.characters[0].attributes[3].icon;
    spd.src = spdpath;
    spd.style.width = "26px";
    spd.style.height = "26px";
    spd.style.objectFit = "contain";
    const spdElement = document.getElementById('pkychardata');
    spdElement.appendChild(spd);
    const type1 = document.createTextNode("Head"); // This is 7 non-breaking spaces
    spdElement.appendChild(type1);
    const spdwhitespace = document.createTextNode("\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"); // This is 7 non-breaking spaces
    spdElement.appendChild(spdwhitespace);
    const SPD = Math.floor(jsonData.characters[0].attributes[3].value + jsonData.characters[0].additions[2].value);
    defElement.appendChild(document.createTextNode(SPD));
}