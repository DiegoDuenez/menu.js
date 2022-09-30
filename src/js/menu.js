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

        var opener = 'open--left'
        var elementOpener;
        var elementCloser;

        if(this.data.hasOwnProperty('options')){

            if(this.data.options.hasOwnProperty('element')){
                this.menu = document.querySelector(this.data.options.element)
            }
            else{
                console.warn('* * *  WARNING * * * \nYou need add element property in options')
            }

          
            if(this.data.options.hasOwnProperty('size')){

                var sizes = new Set(["sm", "md", "lg"]);

                if(sizes.has(this.data.options.size)){
                    this.menu.classList.add(`menu--${this.data.options.size}`)
                }
                else{
                    console.warn('* * *  WARNING * * * \nYou are using a measure that does not exist. By default, the size class will be large (lg)')
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
                    opener = `open--${this.data.options.direction}`
                }
                else{
                    console.warn('* * *  WARNING * * * \nYou are using a direction that does not exist. By default, the direction class will be to left (left)')
                    this.menu.classList.add('menu--to-left')
                    opener = 'open--left'
                }

            }
            else{
                this.menu.classList.add('menu--to-left')
                opener = 'open--left'
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


            if(this.data.options.hasOwnProperty('openAndCloseWith')){
                elementOpener = this.data.options.openAndCloseWith;
                this.openAndCloseWith(elementOpener, opener)
            }
            else if(this.data.options.hasOwnProperty('openWith') && this.data.options.hasOwnProperty('closeWith')){
                elementOpener = this.data.options.openWith
                elementCloser = this.data.options.closeWith
                this.openWith(elementOpener, opener)
                this.closeWith(elementCloser, opener)
            }
            else if(this.data.options.hasOwnProperty('openWith')){
                elementOpener = this.data.options.openWith
                this.openWith(elementOpener, opener)
                console.warn('* * *  WARNING * * * \nYou need add closeWith in the options')
            }
            else if(this.data.options.hasOwnProperty('closeWith')){
                elementCloser = this.data.options.closeWith
                this.closeWith(elementCloser, opener)
                console.warn('* * *  WARNING * * * \nYou need add openWith in the options')
            }


        }
    }

    openWith(element, opener){

        if(element.startsWith('.')){

            const elements = Array.from(document.getElementsByClassName(element.substring(1)));

            if(elements.length > 0){
                elements.forEach(element => {

                    element.addEventListener('click', () => {
    
                        if(!this.menu.classList.contains(opener)){
                            this.menu.classList.add(opener)
                        }
                        
                    });
    
                })
            }
            else{
                console.warn(`* * *  WARNING * * * \nelement(s) ${element} not found`)
            }

            
           
        }
        else if(element.startsWith('#')){

            var elementID = document.getElementById(element.substring(1))

            if(elementID){
                elementID.addEventListener('click', () => {
                    if(!this.menu.classList.contains(opener)){
                        this.menu.classList.add(opener)
                    }
                });
            }
            else{
                console.warn(`* * *  WARNING * * * \nelement ${element} not found`)
            }
           

        }

    }


    closeWith(element, opener){

        if(element.startsWith('.')){

            var elements =  Array.from(document.getElementsByClassName(element.substring(1)));

            if(elements.length > 0){
                elements.forEach(element => {

                    element.addEventListener('click', () => {
                        if(this.menu.classList.contains(opener)){
                            this.menu.classList.remove(opener)
                        }
                        
                    });

                })
            }
            else{
                console.warn(`* * *  WARNING * * * \nelement(s) ${element} not found`)
            }
           
        }
        else if(element.startsWith('#')){

            var elementID = document.getElementById(element.substring(1))

            if(elementID){
                elementID.addEventListener('click', () => {
                    if(this.menu.classList.contains(opener)){
                        this.menu.classList.remove(opener)
                    }
                });
            }
            else{
                console.warn(`* * *  WARNING * * * \nelement ${element} not found`)
            }

        }

    }

    openAndCloseWith(element, opener){

        if(element.startsWith('.')){

            const elements = Array.from(document.getElementsByClassName(element.substring(1)));

            if(elements.length > 0){
                elements.forEach(element => {
                    element.addEventListener('click', () => {
                        if(!this.menu.classList.contains(opener)){
                            this.menu.classList.add(opener)
                        }
                        else{
                            this.menu.classList.remove(opener)
                        }
                    });
                });
            }
            else{
                console.warn(`* * *  WARNING * * * \nelement(s) ${element} not found`)
            }

        }
        else if(element.startsWith('#')){

            const elementID = document.getElementById(element.substring(1))

            if(elementID){
                elementID.addEventListener('click', () => {
                    if(!this.menu.classList.contains(opener)){
                        this.menu.classList.add(opener)
                    }
                    else{
                        this.menu.classList.remove(opener)
                    }
        
                });
            }
            else{
                console.warn(`* * *  WARNING * * * \nelement ${element} not found`)
            }

        }
    }


   

}
