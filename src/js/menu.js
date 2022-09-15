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

        var menu = document.querySelector('.menu')

        var opener = 'open--left'
        var elementOpener;
        var elementCloser;

        if(this.data.hasOwnProperty('options')){

          
            if(this.data.options.hasOwnProperty('size')){

                var sizes = new Set(["sm", "md", "lg"]);

                if(sizes.has(this.data.options.size)){
                    menu.classList.add(`menu--${this.data.options.size}`)
                }
                else{
                    console.log('* * *  WARNING * * *')
                    console.log('You are using a measure that does not exist. By default, the size class will be large (lg)')
                    menu.classList.add('menu--lg')
                }
            }
            else{
                menu.classList.add('menu--lg')
            }
            
            if(this.data.options.hasOwnProperty('direction')){

                var positions = new Set(["top", "left", "right", "bottom"]);

                if(positions.has(this.data.options.direction)){
                    menu.classList.add(`menu--to-${this.data.options.direction}`)
                    opener = `open--${this.data.options.direction}`
                }
                else{
                    console.log('* * *  WARNING * * *')
                    console.log('You are using a direction that does not exist. By default, the direction class will be to left (left)')
                    menu.classList.add('menu--to-left')
                    opener = 'open--left'
                }

            }
            else{
                menu.classList.add('menu--to-left')
                opener = 'open--left'
            }

            if(this.data.options.hasOwnProperty('speed')){

                var speeds = new Set(["slow", "normal", "fast"]);

                if(speeds.has(this.data.options.speed)){
                    menu.classList.add(`menu--speed-${this.data.options.speed}`)
                }
                else{
                    menu.style.cssText += 'transition-duration:'+this.data.options.speed+' !important';
                }
            }
            else{
                menu.classList.add(`menu--speed-normal`)
            }


            if(this.data.options.hasOwnProperty('openAndCloseWith')){
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
                console.log('* * *  WARNING * * *')
                console.log('You need add a closeButton in the options')
            }
            else if(this.data.options.hasOwnProperty('closeWith')){
                elementCloser = this.data.options.closeWith
                this.closeWith(elementCloser, opener)
                console.log('* * *  WARNING * * *')
                console.log('You need add a openButton in the options')
            }

            return this


        }
    }


    openWith(element, opener){

        var menu = document.querySelector('.menu')

        if(element.startsWith('.')){

            var element = document.getElementsByClassName(element.substring(1))[0];

            element.addEventListener('click', function handleClick(event) {
                if(!menu.classList.contains(opener)){
                    menu.classList.add(opener)
                }
                
            });
           
        }
        else if(element.startsWith('#')){

            var elementID = document.getElementById(element.substring(1))

            elementID.addEventListener('click', function handleClick(event) {
                if(!menu.classList.contains(opener)){
                    menu.classList.add(opener)
                }
            });

        }

    }

    closeWith(element, opener){

        var menu = document.querySelector('.menu')

        if(element.startsWith('.')){

            var element = document.getElementsByClassName(element.substring(1))[0];

            element.addEventListener('click', function handleClick(event) {
                if(menu.classList.contains(opener)){
                    menu.classList.remove(opener)
                }
                
            });
           
        }
        else if(element.startsWith('#')){

            var elementID = document.getElementById(element.substring(1))

            elementID.addEventListener('click', function handleClick(event) {
                if(menu.classList.contains(opener)){
                    menu.classList.remove(opener)
                }
            });

        }

    }


    openAndCloseWith(element, opener){

        var menu = document.querySelector('.menu')

        if(element.startsWith('.')){
            const elements = Array.from(document.getElementsByClassName(element.substring(1)));
            elements.forEach(element => {
                element.addEventListener('click', function handleClick(event) {
                    if(!menu.classList.contains(opener)){
                        menu.classList.add(opener)
                    }
                    else{
                        menu.classList.remove(opener)
                    }
                });
            });
        }
        else if(element.startsWith('#')){
            const elementID = document.getElementById(element.substring(1))
            elementID.addEventListener('click', function handleClick(event) {
                if(!menu.classList.contains(opener)){
                    menu.classList.add(opener)
    
                }
                else{
                    menu.classList.remove(opener)
                }
    
            });
        }
    }


   

}
