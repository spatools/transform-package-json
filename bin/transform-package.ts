#!/usr/bin/env node

import * as path from "path";

import nopt from "nopt";
import omit from "lodash.omit";

import { transform, TransformOptions } from "../index";

const
    knownOpts = {
        "help": Boolean,
        "remove": Array,
        "replace": Boolean,
        "basePath": path,

        "name": String,
        "version": String,
        "description": String,
        "author": String,
        "license": String,
        "main": String,
        "private": Boolean
    },
    shortHands = {
        "h": ["--help"],
        "r": ["--remove"],
        "i": ["--replace"],
        "b": ["--basePath"],

        "in-place": ["--replace"],
        "base-path": ["--basePath"]
    };

main();

function main() {
    const
        parsed = nopt(knownOpts, shortHands, process.argv, 2),
        [src, dest] = parsed.argv.remain;

    if (!src || parsed.help) {
        return help();
    }

    transform(src, dest, omit(parsed, "argv") as TransformOptions);
    console.log("> File " + src + " transformed !");
}

function help() {
    console.log("");
    console.log("$ package-transform [options] {input} [dest]");
    console.log("");
    console.log("Options:");
    console.log("  --remove {field}, -r     Removes specified properties from source package.json.");
    console.log("  --replace, -i            Transform package.json in-place.");
    console.log("  --basePath {path}, -b    Keep folder structre starting from `basePath`.");
    console.log("                           Sets to `\"\"` to keep entire folder structure.");
    console.log(" --help, -h                Print this message.");
    console.log("");
    console.log("Tranforms:");
    console.log("  --{key} {value}          Set package.json `key` to `value`.");
    console.log("");
}
