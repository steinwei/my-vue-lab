import fs from 'fs'
import path from 'path'
// import deepMerge from 'deepmerge'
const pwd = process.cwd()

export function makeBundleConfig(options = {}) {
    const {
        entry, jsVersion, mode
    } = options

    const cjsBundle = {}

    const esmBundle = {}

    const sharedBundle = {
        entry,
        output: {
            name: '',
            mode: 'iife',
        },
        plugins: [
            
        ]
    }

    return {

    }
 }
export function makeBundleVariable(configs = {}) {
    return {

    }
}