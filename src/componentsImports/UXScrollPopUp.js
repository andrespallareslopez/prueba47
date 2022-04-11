import jQuery from '../../src/componentsImports/import-jquery.js'
import {util} from '../../src/componentsImports/util01.js';
import {components} from '../../src/componentsImports/components01.js';
import {UXScroll} from '../../src/componentsImports/UXScroll.js'


var controls;

;(function(ns,UXScroll,$){
    "use strict";
    ns.UXScrollPopUp=(function(){
        return function(options){
            
            (function(options){
               options.id=options.id||undefined
               options.containerComponent=options.containerComponent||".footer-menu"    
               options.btnup=options.btnup||"#btn-slide-up"
               options.btndown=options.btndown||"#btn-slide-down"  
               options.items=options.items||".menu-popup01"
               options.scroll=options.scroll||".panel-scroll-content"
               options.item=options.item||".element-link"
               options. onClickMenu=options.onClickMenu||undefined
               //options. onClickMenu=options.onClickMenu||clickElementAccordion
            })(options)
            
            this.initControl(options);
            
        }
      })();
      
      ns.UXScrollPopUp.prototype=new UXScroll();
      
      ns.UXScrollPopUp.prototype.initevent=function(){
        console.log('Estoy dentro de scrollpopup')
        var self=this
        $(self.options.id+" "+self.options.containerComponent+" "+self.options.item).on("click",function(e){
            console.log("estoy en item click en componente con id:"+self.options.id)
            //console.dir(e.target)
            //console.dir(this)
            //clickElementPopUp.apply(self,[])
             
            if (self.options.onClickMenu){
              //self.options.onClickMenu.apply(self,[]);
            }
            
         })
         $(self.options.id+" #btn-footer-menu01").click(function(event){
            console.log("estoy en boton footer");
            event.preventDefault();
            if ($(self.options.id+" .footer-menu").hasClass("expand-footer")){
                $(self.options.id+" .footer-menu").removeClass("expand-footer");
            }else{
                $(self.options.id+" .footer-menu").addClass("expand-footer");
            }
         });         
        
      }
      var clickElementPopUp=function(){
        var self=this;

      }
      
})(controls=controls||{},UXScroll,jQuery)
     
var UXScrollPopUp=controls.UXScrollPopUp
export {UXScrollPopUp}
/*
if (!window.controls)
   window.controls={}    
    
util.addNameSpace(window.controls,controls);
*/