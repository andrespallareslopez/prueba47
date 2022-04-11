import jQuery from '../../src/componentsImports/import-jquery.js'

import {util} from '../../src/componentsImports/util01.js';
import {components} from '../../src/componentsImports/components01.js';

var controls;

;(function(ns,components,$){
    "use strict";
    
    ns.UXAccordeon=(function(){
        return function(options){
            
            (function(options){
                options.id=options.id||undefined
                options.containerComponent=options.containerComponent||".menu-vertical01";
                options.btnup=options.btnup||"#btn-slide-up";
                options.btndown=options.btndown||"#btn-slide-down";
                options.items=options.items||".items";
                options.scroll=options.scroll||".container-menu-scroll";
                options.item=options.item||".gr";
                options.onClickMenu=options.onClickMenu||undefined
                
            })(options)
            
            if (options.id.indexOf('#')<0){
                options.id='#'+options.id;
                //console.log(options.id)
            }
            this.init(options)
            
            if (!this.options.textTemplate){
                this.initevent()
            }
            
        }
    })();

    ns.UXAccordeon.prototype=new components.container();
    /*
    ns.UXAccordeon.prototype.init=function(){
                       
    }
    */
   ns.UXAccordeon.prototype.initevent=function(){
    var self=this;
    var container=self.options.id+" "+self.options.containerComponent;
       menuVerticalAccordion.apply(self,[container]);
   }

    var menuVerticalAccordion=function(containerMenu){
        var self=this
        //console.log(containerMenu);
        //console.dir($(containerMenu))
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
                       //console.dir(event.target);
                       $(containerMenu+" .pr .gr").removeClass("current-menu");
                       if ($(containerMenu+" .pr .gr").hasClass("expand")){
                         //console.log(event.target.innerText);
                         //console.dir( $("containerMenu .parent .element-link.expand")[0].innerText);    
                           if(event.target.innerText===$(containerMenu+" .pr .gr.expand")[0].innerText){
                               console.log("son iguales");
                               $(containerMenu+" .pr .gr").removeClass("expand"); 
                           }else{
                               console.log("no son iguales");
                               $(containerMenu+" .pr .gr").removeClass("expand"); 
                               var mytimer=setTimeout(function() {
                                   $(event.target).addClass("current-menu"); 
                                   $(event.target).addClass("expand");
                                   clearTimeout(mytimer);
                               }, 300);
                           }
                           
                       }else{
                             mytimer=setTimeout(function() {
                               $(event.target).addClass("current-menu");
                               $(event.target).addClass("expand");
                               clearTimeout(mytimer);
                           },200);
                       }
       });
    }
})(controls=controls||{},components,jQuery)
var UXAccordeon=controls.UXAccordeon
export {UXAccordeon}
/*
if (!window.controls)
   window.controls={}
   
util.addNameSpace(window.controls,controls);
*/
