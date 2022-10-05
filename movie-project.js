async function getUserLastCommitAsync(username) {
    try {
        let response = await fetch(`https://api.github.com/users/${username}`);
        let events = await response.json();
        console.log(events);
    }
    catch(err) {
        console.log(err);
    }
}