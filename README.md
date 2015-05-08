# Protractor Page Object

> Protractor Page Object pattern for [Protractor](http://angular.github.io/protractor/).

## Features

* encapsulate your page or components interactions and selectors in classes
* allows to abstract elements and components in your tested page, which facilitate refactoring when changing the html structure.
* allows to easily set input fields


## Installation

```
# not published to npm yet...
npm install --save-dev protractor-pageobject
```

## Examples

check the [examples folder](./examples).

For more examples, you can also check the [pages and components created for integration tests](./tests/integration).


## API

### Base

This is the `Page` and `Component` parent class.


#### els

A map of element selectors, which defines the elements you want to interact with. Used to retrieve elements or components without having to specify a selector. Check base.element(elName), base.elements(elName) and base.component(elName).

```
els: {
  'searchBox': by.name('q')
}
```

#### comps

A map of component classes. Each key should have a corresponding key in `els` map.

```
comps: {
  searchBox: require('./path/to/component-subclass'),  // short version
  anotherComponent: {
    model: require('./path/to/another-component-subclass'),
    opts: {opt1: 'val1'}
  }
}
```

#### element(elName)

Returns a protractor `element`. `elName` should be key in the `els` map.

#### elements(elName)

Returns a protractor `elements` (array). `elName` should be a key in the `els` map.

#### components(elName)

Returns a `protractor-pageobject` `Component instance. `elName` should be a key in the `els` map.

#### isElementPresent(elName)

Returns a promise which resolves to a boolean value.

#### setFieldValue(elName, value)

Sets the value of a field. It will use the following rules (in the specified order):

* If `elName` is a key in `comps` and this component has a method `setValue`, then it will call that method. 
* If the Page or Component instance has a `setElName`. using camelCase. For example, if `elName = 'my-el-1', then the method should be called `setMyEl1`
* If none of the above works, then it will detect the field type and use the proper selenium command to set the value (`sendKeys()`, `click()` on dropdown or checkboxes...). Here is the list of supported fields for now:

    * input[type=email]
    * input[type=file]
    * input[type=number]
    * input[type=password]
    * input[type=search]
    * input[type=tel]
    * input[type=text]
    * input[type=textarea]
    * input[type=url]
    * input[type=checkbox]
    * input[type=radio]
    * select (regular or mutli)

#### setFields(opts)

Sets multiple fields at the same time, using `setFieldValue(elName, value)`. Each key should be present in `els` map.

```
myComponent.setFields({
  elName1: 'value1',
  elName2: 'value2',
  ...
});
```



### Page

`Page` inherits from Base so all `Base` methods and properties are inherited. Here is the list of additional methods.

#### url

A property or a method that is used to navigate using the `get()` method below.

#### get()

Navigate to the `url` property.

### title()

returns a promise that will resolve with the current page title (usually the `<title>` tag in `<head>`). Alias  of `browser.getTitle()`.

#### getCurrentUrl()

returns a promise that will resolve with the current page title. Alias of `browser.getCurrentUrl()


### Component

Like `Page`, `Component` inherits from Base so all `Base` methods and properties are inherited. 

### new Component(opts)

When creating a new instance of a component, you need to at least provide one property called `el` which should be a protractor `ElementFinder`.

### ItemList

TODO


## License

[MIT](./LICENSE).


