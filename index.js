#!/usr/bin/env node
const script = process.argv[2] || 'start'
require(`./scripts/${script}.js`)