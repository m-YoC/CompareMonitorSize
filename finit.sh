#!/bin/bash

REFRESH="--refresh"
VUE_JS="--vue.js"
REACT="--react"

function setup_essentials() {
    # Install TypeScript
    yarn add typescript @types/node --dev

    # Install Webpack
    yarn add webpack webpack-cli webpack-merge clean-webpack-plugin webpack-manifest-plugin --dev
    # for HTML Rule
    yarn add html-loader html-webpack-plugin --dev
    # for TypeScript Rule
    yarn add ts-loader --dev
    # for SASS Rule
    yarn add node-sass sass-loader css-loader mini-css-extract-plugin webpack-remove-empty-scripts --dev
    # for YAML Rule
    yarn add yaml-loader --dev
    # for Image Rule
    # no install packages. use Webpack asset.

    # Install webpack-dev-server
    yarn add webpack-dev-server --dev

    # Copy default config files
    cp --no-clobber ../default_files/config/tsconfig.json ../default_files/config/webpack.*.js ./
    # Copy default Makefile
    cp --no-clobber ../default_files/Makefile ./
}

function setup_basic() {
    # Copy sample files
    cp --no-clobber -r ../default_files/sample/src ./
    # Copy d.ts files
    cp --no-clobber ../default_files/d.ts/yaml.d.ts ./src/
}

function setup_vuejs() {
    # Install Vue.js ver3
    yarn add vue@next @types/vue vue-class-component @vue/compiler-sfc @vue/cli-service
    # for Webpack Vue.js Rules
    yarn add vue-loader@next vue-style-loader vue-template-compiler --dev

    # Copy vue.js config files
    cp --no-clobber ../default_files/config/vue.js/webpack.vue.js ./
    cp --no-clobber ../default_files/config/vue.js/vue.config.js ./
    # Copy sample files
    cp --no-clobber -r ../default_files/sample/vue.js/src ./
    # Copy d.ts files
    cp --no-clobber ../default_files/d.ts/yaml.d.ts ../default_files/d.ts/shims-vue.d.ts ./src/

    echo "Install vue.js!"
}

function get_random_words() {
    # max size is 76
    echo "$(cat /dev/urandom | base64 | fold -w $1 | head -n 1)"
}

function refresh() {
    if [ -n $DOCKER_WORKDIR -a "$(pwd)" = "${DOCKER_WORKDIR}/app" ]; then
        echo "refresh option was executed... [ $(pwd) ]"
        randstr=$(get_random_words 4)
        read -p "Please type \"delete-${randstr}\" > " STR

        if [ "${STR}" = "delete-${randstr}" ]; then
            rm -rf * && touch .keep
            echo "refreshed!"
        else
            echo "not refreshed"
        fi
    else
        echo 'Please set the "DOCKER_WORKDIR" environment and change $DOCKER_WORKDIR/app directory.'
    fi

    read -p "Please press Enter key..." buf
}

{
    cd app

    if [ ${1:-""} = "${REFRESH}" -o ${2:-""} = "${REFRESH}" ]; then
        refresh
    fi

    if [ ! -e "frontend.inited" ]; then
        npm init -y
        # Install yarn
        npm install yarn --save-dev

        setup_essentials
        
        if [ ${1:-""} = "${VUE_JS}" -o ${2:-""} = "${VUE_JS}" ]; then
            setup_vuejs
        else
            setup_basic
        fi

        # Create .inited file
        echo "Frontend environment is already initialized... Prease keep this file!" >> frontend.inited
    fi
}


