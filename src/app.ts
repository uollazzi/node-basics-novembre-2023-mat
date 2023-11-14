import { getPosts, getPostsGestioneErrore } from "./richieste";
// import { somma, sottrazione, moltiplicazione, numeroOperazioniEseguite } from "./matematica";
// import * as mate from "./matematica";
import operazione, { somma, sottrazione, numeroOperazioniEseguite } from "./matematica";
import path from "node:path";
import process from "node:process";

// setInterval(() => {
//     console.log(new Date().toLocaleTimeString());
// }, 1000);

// console.log(4 + 7);

// then
const getPostsSync = () => {
    getPosts()
        .then(res => {
            console.log(res.status);
            res.json()
                .then(dati => {
                    console.log(dati[0]);
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    console.log("FINITO");
}

const getPostsSync2 = () => {
    getPosts()
        .then(res => {
            console.log(res.status);
            return res.json();
        })
        .then(dati => {
            console.log(dati[0]);
        })
        .catch(err => console.log(err));
    console.log("FINITO");
}
// getPostsSync();


// async/await
const getPostsAsync = async () => {
    try {
        let res: Response = await getPosts();
        console.log(res.status);
        let dati = await res.json();
        console.log(dati[0]);
    } catch (err) {
        console.log(err);
    } finally {
        console.log("FINITO");
    }
}
// getPostsAsync();

async function getPostsAsyncGestioneErrore() {
    let dati = await getPostsGestioneErrore();

    if (dati) {
        console.log(dati[0]);
    }

    console.log("FINITO");
}
// getPostsAsyncGestioneErrore();

// import/export moduli custom
// console.log(somma(4, 9));
// console.log(somma(4, 3));
// console.log(somma(4, 5));
// console.log(sottrazione(4, 5));
// console.log(numeroOperazioniEseguite);
// console.log(operazione(4, 5));

// globals
import * as myOs from "./es-os";
myOs.logUserName();
myOs.logUserHomeDir();
myOs.logHostName();

console.log("==========");
import myPath from "./es-path";
myPath();

console.log("==========");
import myUrl from "./es-url";
myUrl();

console.log("==========");
import myProcess from "./es-process";
myProcess();

console.log("==========");
import runFsExamples from "./es-fs";
runFsExamples();

console.log("==========");
import { salvaJson } from "./json-manager";
let dataDir = path.join(process.cwd(), "data");

let promises = [];

promises.push(salvaJson(path.join(dataDir, "users.json"), "https://jsonplaceholder.typicode.com/users"));
promises.push(salvaJson(path.join(dataDir, "posts.json"), "https://jsonplaceholder.typicode.com/posts"));
promises.push(salvaJson(path.join(dataDir, "albums.json"), "https://jsonplaceholder.typicode.com/albums"));
promises.push(salvaJson(path.join(dataDir, "prodotti.json"), "https://dummyjson.com/products"));

Promise.all(promises).then((risultati) => {
    console.log("FINITO TUTTO")
    console.log("ALBUMS");
    console.log(risultati[2]);
});



