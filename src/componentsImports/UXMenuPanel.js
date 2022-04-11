import jQuery from '../../src/componentsImports/import-jquery.js'
import {util} from '../../src/componentsImports/util01.js';
import {components} from '../../src/componentsImports/components01.js';

var controls;

;(function(ns,components,$){
    "use strict";
    ns.UXMenuPanel = (function(){

        return function(options){
                       
           
           var params=[].slice.call(arguments);
           if (params.length>0){  
              this.initControl.apply(this,params);
           }
           
        }
    })();
     
    ns.UXMenuPanel.prototype = new components.container();
    
    ns.UXMenuPanel.prototype.initControl=function(options){
        ;(function(options){
            
            options.id=options.id||undefined
            options.containerComponent=options.containerComponent||".menu-vertical-04";
            options.btnup=options.btnup||"#btn-slide-up";
            options.btndown=options.btndown||"#btn-slide-down";
            options.items=options.items||".items";
            options.scroll=options.scroll||".container-menu-scroll";
            options.item=options.item||".gr";
            options.onClickMenu=options.onClickMenu||undefined
            
        })(options)
        
        this.init(options)
        this.initEventMenuPanel(options)
         
         
        if (!this.options.textTemplate && this.initevent){
            this.initevent(options)
        }

    }
    
    ns.UXMenuPanel.prototype.initEventMenuPanel = function(options){
        var self=this
        var containerMenu = options.containerComponent
        //console.log(containerMenu);
        $(containerMenu).on("click",".sb .el,.itm .el",function(event){
             //event.preventDefault();
             console.log("Estoy en sub-element");
                                           //".current-element"
             $(containerMenu+" .sb .el,"+containerMenu+" .itm .el").removeClass("current-element");
             $(event.target).addClass("current-element");
             
             if (self.options.onClickMenu){
                self.options.onClickMenu.apply(self,[event]);
             }
             
        });
        
        $(containerMenu).on("click",".pr>.gr,.sb .bk",function(event){
                   event.preventDefault();
                   
                       console.log("estoy en menu");
                       //console.dir($(this).text());
                       //$().toggleClass("expand");
                       console.dir(event.target);
                      
                       $(containerMenu+" .pr .gr").removeClass("current-menu");
                       if ($(containerMenu+" .pr").hasClass("expand")){
                         //console.log(event.target.innerText);
                         //console.dir( $("containerMenu .parent .element-link.expand")[0].innerText);    
                           if(event.target.innerText===$(containerMenu+" .pr.expand")[0].innerText){
                               console.log("son iguales");
                               $(containerMenu+" .pr").removeClass("expand"); 
                           }else{
                               console.log("no son iguales");
                               $(containerMenu+" .pr").removeClass("expand"); 
                               mytimer=setTimeout(function() {
                                   $(event.target).addClass("current-menu"); 
                                   $(event.target.parentNode).addClass("expand");
                                   clearTimeout(mytimer);
                               }, 300);
                           }
                           
                       }else{
                        $(containerMenu).addClass('open-panel')
                             var mytimer=setTimeout(function() {
                               $(event.target).addClass("current-menu");
                               console.dir(event.target.parentNode)
                               $(event.target.parentNode).addClass("expand");
                             
                               clearTimeout(mytimer);
                           },50);
                       }
       })
       $(containerMenu).on("click",".sub-menu .back-element",function(e){
           console.log("estoy en back")
         
           $(containerMenu+" .pr").removeClass("expand");
           $(containerMenu+" .pr .gr").removeClass("current-menu");
          
           var mytimer=setTimeout(function() {
            
            $(containerMenu).removeClass('open-panel')
             clearTimeout(mytimer);
           },50);
       })
    }
})(controls=controls||{},components,jQuery)

var UXMenuPanel=controls.UXMenuPanel;

export {UXMenuPanel}

/*
if (!window.controls)
   window.controls={}
   
util.addNameSpace(window.controls,controls);
*/