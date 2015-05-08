# Examples

## [Google search](./google/google.spec.js)

It illustrate the pageobject and the component class. Note that using a component in this example for the search-box is probably overkill.

Note that the examples use mocha (and chai-as-promised) but protactor-pageobect does not depend those packages.

## How to run the examples

You will need Chrome. Change protractor.config.js if you want to use another browser.

```
git clone https://github.com/saadtazi/protractor-pageobject
cd protractor-pageobject
npm install
./node_modules/.bin/gulp webdriver-manager-update
./node_modules/.bin/gulp webdriver-manager-start
# in another terminal
./node_modules/.bin/protractor --suite example ./protractor.config.js
```
