import jQuery from '../../src/componentsImports/import-jquery.js'

import {util} from '../../src/componentsImports/util01.js';
import {components} from '../../src/componentsImports/components01.js';

var controls;

;(function(ns,components,$){
    "use strict";
    
    ns.UXLink=(function(){
        return function(options){
            
            (function(options){
                options.id=options.id||undefined
                options.containerComponent=options.containerComponent||".box.content";
                //options.btnup=options.btnup||"#btn-slide-up";
                //options.btndown=options.btndown||"#btn-slide-down";
                //options.items=options.items||".items";
                //options.scroll=options.scroll||".container-menu-scroll";
                options.item=options.item||".list-element";
                options.onClickMenu=options.onClickMenu||undefined
                
            })(options)
            
            if (options.id.indexOf('#')<0){
                options.id='#'+options.id;
               
            }
            this.init(options)
            
            if (!this.options.textTemplate){
                this.initevent()
            }
            
        }
    })();

    ns.UXLink.prototype=new components.container();
    
    /*
    ns.UXLink..prototype.init=function(){
                       
    }
    */
   
   ns.UXLink.prototype.initevent=function(){
    var self=this;
    var container=self.options.id+" "+self.options.containerComponent;
       linkElement.apply(self,[container]);
   }
   ns.UXLink.prototype.destroy=function(){
       
   }
   var linkElement=function(containerMenu){
       var self=this
       //console.log(containerMenu);
       //console.dir($(containerMenu))
       $(containerMenu).on("click",self.options.item,function(event){
          console.log("estoy en UXLink click") 
          console.dir(event)

          if (self.options.onClickMenu){
            self.options.onClickMenu.apply(self,[event]);
          }
          
       }) 
        
    
   }
})(controls=controls||{},components,jQuery)
var UXLink=controls.UXLink
export {UXLink}

/*
if (!window.controls)
   window.controls={}
   
util.addNameSpace(window.controls,controls);
*/