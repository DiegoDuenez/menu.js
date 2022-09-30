# menu.js
💛🖤 Make menus with Javascript for your web page.

## GET STARTED 🚀

#### Menu Class

* @Json
* The menu class receives a parameter of type json called options.

```javascript
    Menu = new Menu({options: {...}})
```

#### Options

element

* @String
* In this property you will define which element with a certain class (.class) or a certain id (#id) will be your menu

```javascript
    Menu = new Menu({options: {element: '.menu'}})
```

openAndCloseWith

* @String
* In this property you will define which element with a certain class (.class) or a certain id (#id) will close and open your menu.

```javascript
    Menu = new Menu({options: {openAndCloseWith: '.mybutton'}})
```

openWith

* @String
* In this property you will define which element with a certain class (.class) or a certain id (#id) will open your menu.

```javascript
    Menu = new Menu({options: {openWith: '.mybutton'}})
```

closeWith

* @String
* In this property you will define which element with a certain class (.class) or a certain id (#id) will close your menu.

```javascript
    Menu = new Menu({options: {openWith: '.openButton', closeWith: '#closeButton'}})
```

size

* @String
* In this property you will define the size (width) of your menu.
    * sm -> Small 30%
    * md -> Medium 50%
    * lg -> Large 100%

```javascript
    Menu = new Menu({options: {size: 'sm'}})
```

direction

* @String
* In this property you will define in which direction you want the menu to open.
    * top
    * right
    * bottom
    * left


```javascript
    Menu = new Menu({options: {direction: 'bottom'}})
```

speed

* @String
* In this property you will define with what speed you want the menu to open.
    * slow -> 2s
    * normal -> .5s
    * fast -> .2s
    * custom -> You can add a custom speed like: 0.8s, 10s, 400ms or whatever

```javascript
    Menu = new Menu({options: {speed: '0.8s'}})
```

delay

* @String
* In this property you will define with what delay you want the menu to open.
    * custom -> You can add a custom speed like: 0.8s, 10s, 400ms or whatever

```javascript
    Menu = new Menu({options: {delay: '2s'}})
```

timing

* @String
* In this property you will define with what delay you want the menu to open.
    * custom -> You can add a default css values like: ease, ease-in, linear, etc...

```javascript
    Menu = new Menu({options: {timing: 'ease-in'}})
```

eventOnOpen

* @String
* In this property you will define which event will be used to open the menu. By default the event is click and you don't need to call in options.

```javascript
    Menu = new Menu({options: {eventOnOpen: 'mouseenter'}})
```

eventOnClose

* @String
* In this property you will define which event will be used to close the menu. By default the event is click and you don't need to call in options.

```javascript
    Menu = new Menu({options: {eventOnClose: 'mouseover'}})
```

callbackOnOpen

* @Function
* In this property you will define which function run when open the menu.

```javascript
    Menu = new Menu({options: {
        callbackOnOpen: function(){
            alert('Callback on open')
        }
    }})

```

callbackOnClose

* @Function
* In this property you will define which function run when close the menu.

```javascript
    Menu = new Menu({options: {
        callbackOnOpen: function(){
            alert('Callback on close')
        }
    }})
```


warns

* @Boolean
* In this property you will define if you want console warning message or not. By default the value is true and you don't need to call in options.

```javascript
    Menu = new Menu({options: {warns: false}})
```

#### Methods

init()

* @Non
* Once the options are ready in the class constructor, the init function will be used to run and make the menu work with the configuration.

```javascript
    Menu = new Menu({options: {element: '#menu', openAndCloseWith: '#mybutton', size:'lg', direction: 'left'}})
    Menu.init();
```


