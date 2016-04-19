NODE_BIN=./node_modules/.bin

build:
	${NODE_BIN}/webpack --config webpack.config.js --progress --profile

watch:
	${NODE_BIN}/webpack-dev-server --config webpack.config.js --hot --inline --progress --devtool eval

export:
	${NODE_BIN}/webpack -p --config webpack.prod.config.js --progress --devtool source-map

test:
	${NODE_BIN}/karma start

.PHONY: build watch export test
