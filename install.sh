#!/bin/bash
equo install nodejs #usa emerge para gentoo, la que uso es para Sabayon
curl https://npmjs.org/install.sh | sh 
npm install -g jshint watchr less
