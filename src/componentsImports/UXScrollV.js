import jQuery from '../../src/componentsImports/import-jquery.js'

import {util} from '../../src/componentsImports/util01.js';
import {components} from '../../src/componentsImports/components01.js';
import {UXScroll} from '../../src/componentsImports/UXScroll.js'


var controls;

;(function(ns,UXScroll,$){
   "use strict";
   ns.UXScrollV=(function(){
     return function(options){
         
         (function(options){
            options.id=options.id||undefined
            options.containerComponent=options.containerComponent||".menu-vertical01"    
            options.btnup=options.btnup||"#btn-slide-up"
            options.btndown=options.btndown||"#btn-slide-down"  
            options.items=options.items||".items"
            options.scroll=options.scroll||".container-menu-scroll"
            options.item=options.item||".gr"
            options. onClickMenu=options.onClickMenu||undefined
            //options. onClickMenu=options.onClickMenu||clickElementAccordion
         })(options)
         
         this.initControl(options);
         
     }
   })();
   
   ns.UXScrollV.prototype=new UXScroll();
       
   ns.UXScrollV.prototype.initevent=function(){
    var self=this
    //console.log("Estoy dentro de UXScrollV")
     $(self.options.id+" "+self.options.containerComponent+" "+self.options.item).on("click",function(e){
        console.log("estoy en item click en componente con id:"+self.options.id)
        //console.dir(e.target)
        //console.dir(this)
        clickElementAccordion.apply(self,[])
         
        if (self.options.onClickMenu){
          self.options.onClickMenu.apply(self,[]);
        }
        
     })                  
   }
   var clickElementAccordion=function(){
     var self=this;
     console.log("estoy dentro de click list-acordion");
   
     //console.log("estoy dentro de click element");
     //console.log(self.options.containerComponent);
     //console.log(self.options.nameid+self.options.item);
     //$(self.options.id+self.options.item).click(function(event){
        //hay que poner un retardo porque en el mismo momento del click
        //la altura aun no esta establecida ,importante darle mas de 100ms
        var mytimer=setTimeout(function(){
             console.log("estoy dentro de click list-acordion");
             
             
             self.CalcularAltura();
             //self.menuHeightScroll=$(self.options.nameid+self.config.containerComponent+" "+self.config.scroll).height();
             //self.menuHeightItems=$(self.options.nameid+self.config.containerComponent+" "+self.config.items).height();
             //self.menuHeight=self.menuHeightItems-self.menuHeightScroll;
             
             self.doclick=true
             //console.log(self.menuHeightScroll);
             //console.log(self.menuHeightItems);
             //console.log(self.menuHeight);
             //console.log(self.$holder);
             self.scrolltop=self.$holder[0].scrollTop;
             self.movesum=-(self.$holder[0].scrollTop);
             //console.log(self.movesum);
             self.DeactivateButtons();
             self.ActivateButtons();
           
             clearTimeout(mytimer);
           if (self.doclick){
              self.$holder[0].scrollTop=self.scrolltop;
              self.doclick=false;
           }
           
        },350);
      //});
   }
   

})(controls=controls||{},UXScroll,jQuery)

var UXScrollV=controls.UXScrollV;
export {UXScrollV}
/*
if (!window.controls)
   window.controls={}

util.addNameSpace(window.controls,controls);
*/
