/*
|   menu.js 2022 @DiegoDuenez
|   ---------------------------------------------------------------------------------
|   @Menu
|   ---------------------------------------------------------------------------------
|
*/


class Menu{

    constructor(data){
        this.data = data
    }

    init(){

        this.opener= 'open--left'
        this.isOpen = false
        this.eventOnOpen = 'click'
        this.eventOnClose = 'click'
        this.callbackOnOpen = undefined
        this.callbackOnClose = undefined
        this.isFullscreen = false
      
        if(this.data.hasOwnProperty('options')){

            this.data.options.hasOwnProperty('warns') ? this.warns = this.data.options.warns  :  this.warns = true;
            this.data.options.hasOwnProperty('isFullscreen') ? this.isFullscreen = this.data.options.isFullscreen  :  this.isFullscreen = false;


            // if(this.data.options.hasOwnProperty('isFullscreen')){
            //     this.isFullscreen = this.data.options.isFullscreen
            // }
         
            if(this.data.options.hasOwnProperty('element')){
                this.menu = document.querySelector(this.data.options.element)
                this.menu.style.cssText += 'visibility: visible;'
            }
            else{
                this.warn('* * *  WARNING * * * \nYou need add element property in the options')
            }

            if(this.data.options.hasOwnProperty('eventOnOpen')){
                this.eventOnOpen = this.data.options.eventOnOpen
            }

            if(this.data.options.hasOwnProperty('eventOnClose')){
                this.eventOnClose = this.data.options.eventOnClose
            }
            
            if(this.data.options.hasOwnProperty('callbackOnOpen')){
                this.callbackOnOpen = this.data.options.callbackOnOpen
            }
            
            if(this.data.options.hasOwnProperty('callbackOnClose')){
                this.callbackOnClose = this.data.options.callbackOnClose
            }

           
           
            if(this.data.options.hasOwnProperty('size')){

                var sizes = new Set(["sm", "md", "lg"]);

                if(sizes.has(this.data.options.size)){
                    this.menu.classList.add(`menu--${this.data.options.size}`)
                }
                else{
                    
                    this.menu.style.cssText += 'width:'+this.data.options.size;
                }
            }
            else{
                this.menu.classList.add('menu--lg')
            }
            
            if(this.data.options.hasOwnProperty('from')){

                var positions = new Set(["top", "left", "right", "bottom"]);

                if(positions.has(this.data.options.from)){
                    this.menu.classList.add(`menu--from-${this.data.options.from}`)
                    
                    this.opener= `open--${this.data.options.from}`
                }
                else{
                    this.warn('* * *  WARNING * * * \nYou are using a direction that does not exist. By default, the direction class will be to left (left)')
                    this.menu.classList.add('menu--from-left')
                    this.opener= 'open--left'
                }

            }
            else{
                this.menu.classList.add('menu--from-left')
                this.opener= 'open--left'
            }

            if(this.data.options.hasOwnProperty('speed')){

                var speeds = new Set(["slow", "normal", "fast"]);

                if(speeds.has(this.data.options.speed)){
                    this.menu.classList.add(`menu--speed-${this.data.options.speed}`)
                }
                else{
                    this.menu.style.cssText += 'transition-duration:'+this.data.options.speed;
                }
            }
            else{
                this.menu.classList.add(`menu--speed-normal`)
            }

            if(this.data.options.hasOwnProperty('delay')){
                this.menu.style.cssText += 'transition-delay:'+this.data.options.delay;
            }
            else{
                this.menu.style.cssText += 'transition-delay:'+0;
            }

            if(this.data.options.hasOwnProperty('timing')){
                this.menu.style.cssText += 'transition-timing-function:'+this.data.options.timing;
            }
            else{
                this.menu.style.cssText += 'transition-timing-function: unset';
            }

            if(this.data.options.hasOwnProperty('openAndCloseWith')){
                this.elementOpener = this.data.options.openAndCloseWith;
                this.openAndCloseWith(this.elementOpener)
            }
            else if(this.data.options.hasOwnProperty('openWith') && this.data.options.hasOwnProperty('closeWith')){
                this.elementOpener = this.data.options.openWith
                this.elementCloser = this.data.options.closeWith
                this.openWith(this.elementOpener)
                this.closeWith(this.elementCloser)
            }
            else if(this.data.options.hasOwnProperty('openWith')){
                this.elementOpener = this.data.options.openWith
                this.openWith(this.elementOpener)
                this.warn('* * *  WARNING * * * \nYou need add closeWith in the options')
            }
            else if(this.data.options.hasOwnProperty('closeWith')){
                this.elementCloser = this.data.options.closeWith
                this.closeWith(this.elementCloser)
                this.warn('* * *  WARNING * * * \nYou need add openWith in the options')
            }

        }
    }

    openWith(element){

        const elements = Array.from(document.querySelectorAll(element));

        if(elements.length > 0){
            elements.forEach(element => {

                element.addEventListener(this.eventOnOpen, () => {

                    if(!this.menu.classList.contains(this.opener)){
                        this.menu.classList.add(this.opener)
                        this.isOpen = true
                        if (typeof this.callbackOnOpen == "function")
                            this.callbackOnOpen()
                    }
                    
                });

            })
        }
        else{
            this.warn(`* * *  WARNING * * * \nelement(s) ${element} not found`)
        }

    }


    closeWith(element){

        const elements =  Array.from(document.querySelectorAll(element));

        if(elements.length > 0){
            elements.forEach(element => {

                element.addEventListener(this.eventOnClose, () => {
                    if(this.menu.classList.contains(this.opener)){
                        this.menu.classList.remove(this.opener)
                        this.isOpen = false
                        if(this.isFullscreen){
                            this.cancelFullScreen()
                        }
                        if (typeof this.callbackOnClose == "function")
                            this.callbackOnClose()
                    }
                    
                });

            })
        }
        else{
            this.warn(`* * *  WARNING * * * \nelement(s) ${element} not found`)
        }
       

    }

    openAndCloseWith(element){

        const elements = Array.from(document.querySelectorAll(element));

            if(elements.length > 0){
                elements.forEach(element => {

                    if(this.eventOnOpen == this.eventOnClose){
                        element.addEventListener(this.eventOnOpen, () => {
                            if(!this.menu.classList.contains(this.opener)){
                                this.menu.classList.add(this.opener)
                                this.isOpen = true
                                if(this.isFullscreen){
                                    this.requestFullScreen(document.body)
                                }
                                if (typeof this.callbackOnOpen == "function")
                                    this.callbackOnOpen()
                            }
                            else{
                                this.menu.classList.remove(this.opener)
                                this.isOpen = false
                                if(this.isFullscreen){
                                    this.cancelFullScreen()
                                }
                                if (typeof this.callbackOnClose == "function")
                                   this.callbackOnClose()
                            }
                           
                        });
                    }
                    else{
                        element.addEventListener(this.eventOnOpen, () => {
                            if(!this.menu.classList.contains(this.opener)){
                                this.menu.classList.add(this.opener)
                                this.isOpen = true
                                if(this.isFullscreen){
                                    this.requestFullScreen(document.body)
                                }
                                if (typeof this.callbackOnOpen == "function")
                                    this.callbackOnOpen()
                            }
                           
                        });
    
                        element.addEventListener(this.eventOnClose, () => {
                            if(this.menu.classList.contains(this.opener)){
                                this.menu.classList.remove(this.opener)
                                this.isOpen = false
                                if(this.isFullscreen){
                                    this.cancelFullScreen()
                                }
                                if (typeof this.callbackOnClose == "function")
                                    this.callbackOnClose()
                            }
                            
                        });
                    }
                    
                });
            }
            else{
                this.warn(`* * *  WARNING * * * \nelement(s) ${element} not found`)
            }
    }

    warn(message){
        this.warns ? console.warn(message) : null
    }

    cancelFullScreen() {
        var el = document;
        var requestMethod = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen||el.webkitExitFullscreen;
        if (requestMethod) { // cancel full screen.
            requestMethod.call(el);
        } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }

    requestFullScreen(element) {
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;
        if (requestMethod) {
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
        return false
    }


   

}