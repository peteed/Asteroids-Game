state: {
	initial: 'booting',
	events: [
	{ name: 'ready', from: 'booting', to: 'menu'},
	{ name: 'start', from: 'menu', to: 'starting'},
	{ name: 'load', from: 'starting', to: 'loading'},
	{ name: 'play', from: 'loading', to: 'playing'},
	{ name: 'lose', from: 'playing', to: 'lost'},
	{ name: 'quit', from: 'playing', to: 'lost'},
	{ name: 'win', from: 'playing', to: 'won'},
	{ name: 'finish', from: ['won', 'lost'], to: 'menu'},
		]
},