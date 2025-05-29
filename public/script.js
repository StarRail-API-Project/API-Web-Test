async function fetchAndSaveUserInfo() {
    const userId = document.getElementById('userIdInput').value;

    if (!userId) {
        alert("Please enter a User ID.");
        return;
    }

    const originalApiUrl = `https://api.mihomo.me/sr_info_parsed/${userId}?l=en`;
    const apiUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(originalApiUrl)}`;
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
        alert("Failed to fetch user data. Check the console for more details.");
    }
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
function chapre(){
    var x = document.getElementById("load");
    x.remove();
    js = getFromSessionStorage();
    portrait = js.portrait;
    let img = document.createElement('img');
    img.src = "lib\\StarRailRes\\"+portrait;
    document.getElementById('body').appendChild(img);
}


