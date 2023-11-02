import { getPosts } from "./richieste";

// setInterval(() => {
//     console.clear();
//     console.log(new Date().toLocaleTimeString());
// }, 1000);

console.log(4 + 7);

// then
const getPostsSync = () => {
    getPosts().then(res => {
        console.log(res.status);
        res.json().then(dati => {
            console.log(dati[0]);
        })
    });
    console.log("FINITO");
}
// getPostsSync();


// async/await
const getPostsAsync = async () => {
    let res: Response = await getPosts();
    console.log(res.status);
    let dati = await res.json();
    console.log(dati[0]);
    console.log("FINITO");
}
getPostsAsync();

