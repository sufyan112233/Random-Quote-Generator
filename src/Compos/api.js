async function appi () {
    const res = await fetch("https://zenquotes.io/api/random")
    const data = await res.json();
    console.log(data[0].q);
}
appi();