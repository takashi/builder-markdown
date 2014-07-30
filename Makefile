BIN = ./node_modules/.bin/

test:
	@$(NODE) $(BIN)mocha \
		--require should \
		--reporter spec \
		--harmony \
		--bail

.PHONY: test
