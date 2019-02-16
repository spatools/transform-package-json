import * as fs from "fs";

const isFileRegex = /\.(\w+){2,4}$/;

export function isFile(src: string): boolean {
    return isFileRegex.test(src);
}

export function readFile(path: string): string {
    return fs.readFileSync(path, { encoding: "utf8" });
}

export function readJSON<T = any>(path: string): T {
    const content = readFile(path);
    return JSON.parse(content);
}

export function writeFile(path: string, content: string): void {
    fs.writeFileSync(path, content, { encoding: "utf8" });
}

export function writeJSON(path: string, content: object): void {
    writeFile(path, JSON.stringify(content, null, 2));
}
