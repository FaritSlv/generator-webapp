const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('Sass feature', () => {
  describe('on', () => {
    before(done => {
      helpers
        .run(path.join(__dirname, '../app'))
        .withPrompts({ features: ['includeSass'] })
        .on('end', done);
    });

    it('should add dependencies', () => {
      assert.fileContent('package.json', '"gulp-sass"');
      assert.fileContent('package.json', '"gulp-plumber"');
      assert.fileContent('package.json', '"gulp-filter"');
    });

    it('should create an SCSS file', () => {
      assert.file('app/styles/main.scss');
    });

    it('should use Sass in gulpfile', () => {
      assert.fileContent('gulpfile.js', '.scss');
    });
  });

  describe('off', () => {
    before(done => {
      helpers
        .run(path.join(__dirname, '../app'))
        .withPrompts({ features: [] })
        .on('end', done);
    });

    it("shouldn't add dependencies", () => {
      assert.noFileContent('package.json', '"gulp-sass"');
      assert.noFileContent('package.json', '"gulp-filter"');
    });

    it('should create a CSS file', () => {
      assert.file('app/styles/main.css');
    });
  });
});
