import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { DateTime } from "luxon";
import chalk from "chalk";

export default () => {
    const workDir = process.cwd();
    const dataDir = "data";
    const dataFullDir = path.join(workDir, dataDir);
    const libraryPath = process.argv[2] ?? "";

    // async
    // fs.readFile("./data/file.txt", "utf8", (err, data) => {
    //     if (err) {
    //         console.error("ERRORE NELLA LETTURA DEL FILE:", err);
    //     } else {
    //         console.log(data);
    //     }
    // });
    // console.log("FINITO");

    // sync
    // lettura di un file di testo
    try {
        const data = fs.readFileSync(path.join(dataFullDir, "file.txt"), "utf8");
        console.log(data);
    } catch (err) {
        console.error("ERRORE NELLA LETTURA DEL FILE:", err);
    }

    // scrittura di un file di testo
    const contenuto = "Questo è il testo da scrivere sul file.\n" + new Date().toLocaleTimeString();
    try {
        fs.writeFileSync(path.join(dataFullDir, "data.txt"), contenuto, "utf8");
        console.log("SCRITTURA ESEGUITA CON SUCCESSO");
    } catch (err) {
        console.error("ERRORE NELLA SCRITTURA DEL FILE:", err);
    }

    // rinominare un file
    try {
        fs.renameSync(path.join(dataFullDir, "data.txt"), path.join(dataFullDir, "data_rinominato.txt"));
        console.log("RINOMINA ESEGUITA CON SUCCESSO");
    } catch (err) {
        console.error("ERRORE NELLA RINOMINA DEL FILE:", err);
    }

    // eliminare un file
    try {
        fs.unlinkSync(path.join(dataFullDir, "data_rinominato.txt"));
        console.log("ELIMINAZIONE ESEGUITA CON SUCCESSO");
    } catch (err) {
        console.error("ERRORE NELL'ELIMINAZIONE DEL FILE:", err);
    }

    // lettura directory
    try {
        const entities = fs.readdirSync(path.join(workDir, "node_modules", libraryPath), { withFileTypes: true });
        console.log("Contenuto Cartella:", libraryPath != "" ? libraryPath : "node_modules");
        for (const entity of entities) {
            console.log(entity.isDirectory() ? "[D]" : "[F]", entity.name);
        }
    } catch (err) {
        console.error("ERRORE LETTURA DIR:", err);
    }

    // statistiche entità (cartella/file)
    try {
        const entity = fs.statSync(path.join(dataFullDir, "file.txt"));
        if (entity.isFile()) {
            console.log("Il percorso corrisponde ad un file");
        } else {
            console.log("Il percorso corrisponde ad una cartella");
        }

        const dataUltimaModifica = DateTime.fromMillis(entity.mtimeMs);

        console.log(chalk.yellow("Data ultima modifica:"), chalk.red(dataUltimaModifica.toLocaleString()), chalk.green(dataUltimaModifica.toISOTime()));
    } catch (err) {
        console.error("ERRORE NELLE STATS DEL FILE:", err);
    }

    // esistenza di entità
    console.log("Esiste file.txt?", fs.existsSync(path.join(dataFullDir, "file.txt")));
    console.log("Esiste pippo.json?", fs.existsSync(path.join(dataFullDir, "pippo")));

    // 1. creare un modulo con una funzione export default 
    // 2. fare richiesta http get a https://jsonplaceholder.typicode.com/users per recuperare il json
    // 3. salvare in data/users.json gli users di cui sopra
}