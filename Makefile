all:
	npm run build
	rm -rf dipper-docs.zip
	node archive.js
