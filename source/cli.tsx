#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
//import meow from 'meow';
import App from './app.js';
/*
const cli = meow(
	`
	Usage
	  $ inkubus

	Options
		--name  Your name

	Examples
	  $ inkubus --name=Jane
	  Hello, Jane
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
		},
	},
);*/

render(<App />);
