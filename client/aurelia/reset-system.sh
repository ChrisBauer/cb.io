#!/bin/bash

cd jspm_packages
curl -O https://raw.githubusercontent.com/systemjs/systemjs/0.19.17/dist/system.js
curl -O https://raw.githubusercontent.com/systemjs/systemjs/0.19.17/dist/system.js.map
curl -O https://raw.githubusercontent.com/systemjs/systemjs/0.19.17/dist/system.src.js
curl -O https://raw.githubusercontent.com/systemjs/systemjs/0.19.17/dist/system-polyfills.js
curl -O https://raw.githubusercontent.com/systemjs/systemjs/0.19.17/dist/system-polyfills.js.map
curl -O https://raw.githubusercontent.com/systemjs/systemjs/0.19.17/dist/system-polyfills.src.js
curl -O https://raw.githubusercontent.com/systemjs/systemjs/0.19.17/dist/system-csp-production.js
curl -O https://raw.githubusercontent.com/systemjs/systemjs/0.19.17/dist/system-csp-production.js.map
curl -O https://raw.githubusercontent.com/systemjs/systemjs/0.19.17/dist/system-csp-production.src.js

