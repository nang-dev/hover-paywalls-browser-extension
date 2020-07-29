#!/bin/bash

build() {
    echo 'deleting dist'
    rm -rf dist/*
    echo 'exporting env variables'
    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false
    echo 'building react'

    react-scripts build
    echo 'file cleanup'
    mkdir -p dist
    cp -r build/* dist
    mkdir dist/bg_scripts
    cp -r src/bg_scripts/* dist/bg_scripts
    cp src/hover_logo.jpg dist/

    mv dist/index.html dist/popup.html
    
}

build