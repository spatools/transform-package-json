import * as path from "path";

import mkdirp from "mkdirp";
import omit from "lodash.omit";

import { readJSON, isFile, writeJSON } from "./util";

export interface TransformOptions {
    /** Set the `property` of the package with given value. (eg: `version: "1.0.0"` sets the package version to `1.0.0`). */
    [key: string]: any;
    /** Removes specified properties from source package.json. */
    remove?: string[];
    /** Transform package.json in-place. */
    replace?: boolean;
    /** Keep folder structre starting from `basePath`. Sets to `""` to keep entire folder structure. */
    basePath?: string;
}

export function transform(src: string, dest: string, options: TransformOptions = {}): void {
    const
        params = getParams(options),
        pkg = readJSON(src),
        res = transformPkg(pkg, params);

    writeDest(src, dest, res, params);
}

/******************
 * PRIVATE FIELDS *
 ******************/

function transformPkg(pkg: object, params: TransformParams): object {
    pkg = omit(pkg, ...params.remove);
    pkg = applyTransforms(pkg, params);

    return pkg;
}

function applyTransforms(pkg: object, params: TransformParams) {
    const transforms = omit(params, "remove");
    return Object.assign(pkg, transforms);
}

function writeDest(src: string, dest: string, pkg: object, params: TransformParams): void {
    const destPath = getDestPath(src, dest, params);
    mkdirp.sync(path.dirname(destPath));
    writeJSON(destPath, pkg);
}

function getDestPath(src: string, dest: string, params: TransformParams): string {
    // replace files in the same folder
    if (params.replace) {
        return src;
    }
    // copy original folder structure into dest folder and compile templates
    else if (params.basePath || params.basePath === "") {
        // new path = dest + (src path without basePath at the beginning)
        return dest + src.substring(params.basePath.length, src.length);
    }
    // Regex for path
    else if (isFile(dest)) {
        return dest;
    }
    // default: copy all files into destination
    else {
        return path.join(dest, path.basename(src));
    }
}

function getParams(options: TransformOptions): TransformParams {
    return Object.assign(
        { remove: ["scripts", "devDependencies"] },
        options
    );
}

interface TransformParams {
    [key: string]: any;
    remove: string[];
    replace?: boolean;
    basePath?: string;
}
