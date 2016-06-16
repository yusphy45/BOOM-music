copy:    
	@cp -r media dist
	@cp src/sw.js dist

dev: copy
	@npm run server
