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
      
        if(this.data.hasOwnProperty('options')){

            this.data.options.hasOwnProperty('warns') ? this.warns = this.data.options.warns  :  this.warns = true;
         
            if(this.data.options.hasOwnProperty('element')){
                this.menu = document.querySelector(this.data.options.element)
            }
            else{
                this.warn('* * *  WARNING * * * \nYou need add element property in the options')
            }

            
            if(this.data.options.hasOwnProperty('eventOnOpen')){
                this.eventOnOpen = this.data.options.eventOnOpen
            }
            else{
                this.eventOnOpen = 'click'
            }

            if(this.data.options.hasOwnProperty('eventOnClose')){
                this.eventOnClose = this.data.options.eventOnClose
            }
            else{
                this.eventOnClose = 'click'
            }

            if(this.data.options.hasOwnProperty('callbackOnOpen')){
                this.callbackOnOpen = this.data.options.callbackOnOpen
            }
            else{
                this.callbackOnOpen = undefined
            }

            if(this.data.options.hasOwnProperty('callbackOnClose')){
                this.callbackOnClose = this.data.options.callbackOnClose
            }
            else{
                this.callbackOnClose = undefined
            }
            
            if(this.data.options.hasOwnProperty('size')){

                var sizes = new Set(["sm", "md", "lg"]);

                if(sizes.has(this.data.options.size)){
                    this.menu.classList.add(`menu--${this.data.options.size}`)
                }
                else{
                    this.warn('* * *  WARNING * * * \nYou are using a measure that does not exist. By default, the size class will be large (lg)')
                    this.menu.classList.add('menu--lg')
                }
            }
            else{
                this.menu.classList.add('menu--lg')
            }
            
            if(this.data.options.hasOwnProperty('direction')){

                var positions = new Set(["top", "left", "right", "bottom"]);

                if(positions.has(this.data.options.direction)){
                    this.menu.classList.add(`menu--to-${this.data.options.direction}`)
                    this.opener= `open--${this.data.options.direction}`
                }
                else{
                    this.warn('* * *  WARNING * * * \nYou are using a direction that does not exist. By default, the direction class will be to left (left)')
                    this.menu.classList.add('menu--to-left')
                    this.opener= 'open--left'
                }

            }
            else{
                this.menu.classList.add('menu--to-left')
                this.opener= 'open--left'
            }

            if(this.data.options.hasOwnProperty('speed')){

                var speeds = new Set(["slow", "normal", "fast"]);

                if(speeds.has(this.data.options.speed)){
                    this.menu.classList.add(`menu--speed-${this.data.options.speed}`)
                }
                else{
                    this.menu.style.cssText += 'transition-duration:'+this.data.options.speed+' !important';
                }
            }
            else{
                this.menu.classList.add(`menu--speed-normal`)
            }

            if(this.data.options.hasOwnProperty('delay')){
                this.menu.style.cssText += 'transition-delay:'+this.data.options.delay+' !important';
            }
            else{
                this.menu.style.cssText += 'transition-delay:'+0+' !important';
            }

            if(this.data.options.hasOwnProperty('timing')){
                this.menu.style.cssText += 'transition-timing-function:'+this.data.options.timing+' !important';
            }
            else{
                this.menu.style.cssText += 'transition-timing-function: unset !important';
            }

            if(this.data.options.hasOwnProperty('openAndCloseWith')){
                this.elementOpener = this.data.options.openAndCloseWith;
                this.openAndCloseWith(this.elementOpener, this.opener, this.callbackOnOpen, this.callbackOnClose)
            }
            else if(this.data.options.hasOwnProperty('openWith') && this.data.options.hasOwnProperty('closeWith')){
                this.elementOpener = this.data.options.openWith
                this.elementCloser = this.data.options.closeWith
                this.openWith(this.elementOpener, this.opener, this.callbackOnOpen)
                this.closeWith(this.elementCloser, this.opener, this.callbackOnClose)
            }
            else if(this.data.options.hasOwnProperty('openWith')){
                this.elementOpener = this.data.options.openWith
                this.openWith(this.elementOpener, this.opener, this.callbackOnOpen)
                this.warn('* * *  WARNING * * * \nYou need add closeWith in the options')
            }
            else if(this.data.options.hasOwnProperty('closeWith')){
                this.elementCloser = this.data.options.closeWith
                this.closeWith(this.elementCloser, this.opener, this.callbackOnClose)
                this.warn('* * *  WARNING * * * \nYou need add openWith in the options')
            }
            

        }
    }

    openWith(element, opener, callback = undefined){

        if(element.startsWith('.')){

            const elements = Array.from(document.getElementsByClassName(element.substring(1)));

            if(elements.length > 0){
                elements.forEach(element => {

                    element.addEventListener(this.eventOnOpen, () => {
    
                        if(!this.menu.classList.contains(opener)){
                            this.menu.classList.add(opener)
                            if (typeof callback == "function")
                                callback()
                        }
                        
                    });
    
                })
            }
            else{
                this.warn(`* * *  WARNING * * * \nelement(s) ${element} not found`)
            }
           
        }
        else if(element.startsWith('#')){

            var elementID = document.getElementById(element.substring(1))

            if(elementID){
                elementID.addEventListener(this.eventOnOpen, () => {
                    if(!this.menu.classList.contains(opener)){
                        this.menu.classList.add(opener)
                        if (typeof callback == "function")
                            callback()
                    }
                });
            }
            else{
                this.warn(`* * *  WARNING * * * \nelement ${element} not found`)
            }
           

        }

    }


    closeWith(element, opener, callback=undefined){

        if(element.startsWith('.')){

            var elements =  Array.from(document.getElementsByClassName(element.substring(1)));

            if(elements.length > 0){
                elements.forEach(element => {

                    element.addEventListener(this.eventOnClose, () => {
                        if(this.menu.classList.contains(opener)){
                            this.menu.classList.remove(opener)
                            if (typeof callback == "function")
                                callback()
                        }
                        
                    });

                })
            }
            else{
                this.warn(`* * *  WARNING * * * \nelement(s) ${element} not found`)
            }
           
        }
        else if(element.startsWith('#')){

            var elementID = document.getElementById(element.substring(1))

            if(elementID){
                elementID.addEventListener(this.eventOnClose, () => {
                    if(this.menu.classList.contains(opener)){
                        this.menu.classList.remove(opener)
                        if (typeof callback == "function")
                            callback()
                    }
                });
            }
            else{
                this.warn(`* * *  WARNING * * * \nelement ${element} not found`)
            }

        }

    }

    openAndCloseWith(element, opener, callbackOnOpen = undefined, callbackOnClose = undefined){

        if(element.startsWith('.')){

            const elements = Array.from(document.getElementsByClassName(element.substring(1)));

            if(elements.length > 0){
                elements.forEach(element => {
                    element.addEventListener(this.eventOnOpen, () => {
                        if(!this.menu.classList.contains(opener)){
                            this.menu.classList.add(opener)
                            if (typeof callbackOnOpen == "function")
                                callbackOnOpen()
                        }
                        else{
                            this.menu.classList.remove(opener)
                            if (typeof callbackOnClose == "function")
                                callbackOnClose()
                        }
                    });
                });
            }
            else{
                this.warn(`* * *  WARNING * * * \nelement(s) ${element} not found`)
            }

        }
        else if(element.startsWith('#')){

            const elementID = document.getElementById(element.substring(1))

            if(elementID){
                elementID.addEventListener(this.eventOnOpen, () => {
                    if(!this.menu.classList.contains(opener)){
                        this.menu.classList.add(opener)
                        if (typeof callbackOnOpen == "function")
                                callbackOnOpen()
                    }
                    else{
                        this.menu.classList.remove(opener)
                        if (typeof callbackOnClose == "function")
                                callbackOnClose()
                    }
        
                });
            }
            else{
                this.warn(`* * *  WARNING * * * \nelement ${element} not found`)
            }

        }
    }

    warn(message){
        this.warns ? console.warn(message) : null
    }

   

}
