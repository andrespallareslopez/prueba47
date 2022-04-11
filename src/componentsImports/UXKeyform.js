import jQuery from '../../src/componentsImports/import-jquery.js';
import {util} from '../../src/componentsImports/util01.js';
import {components} from '../../src/componentsImports/components01.js';

import Mousetrap from 'mousetrap'
//console.dir(mousetrap)

var controls;
;(function(ns,components,$){
    "use strict";
    ns.UXKeyForm=(function(){
       return function(options){
                       
         var params=[].slice.call(arguments);
         if (params.length>0){
             this.initControl.apply(this,params);
         }

       }
    })();
    
    ns.UXKeyForm.prototype=new components.container();
    
    ns.UXKeyForm.prototype.initControl=function(options){
        ;(function(options){
            options.id=options.id||undefined
           
        })(options)
        
        //var id=options.id;
         
        this.init(options)
         
        if (!this.options.textTemplate && this.initevent){
            this.initevent(options)
        } 
        
     }
     ns.UXKeyForm.prototype.initEventInputSearch = function(){
         var self=this;
         self.currentInput = undefined;
         //console.dir(Mousetrap);
         var keyForm = document.getElementById(self.options.id);
         //console.dir(keyForm);
         findFirstElement.apply(self,[]);
         
         document.querySelectorAll('#'+self.options.id + ' input').forEach((el,i)=>{
             //console.dir(el.id);
             //obtener el foco en el formulario
             document.getElementById(el.id).addEventListener('focus',function(e){
                //console.dir(e.target.id);
                //self.currentInputId=e.target.id;
                $('#' + self.options.id).find('.current-element').first().removeClass('current-element');
                $('#' + e.target.id).parent().parent().addClass('current-element');
                //console.dir(self.currentInput);
                
             }) 
         })
         
         Mousetrap(keyForm).bind("enter",function(e){
           //console.log("enter")
           //console.dir(e)
           var currentElement= document.activeElement;
            //console.dir(currentElement)
            var nextObjeto = $('#'+self.options.id).find('.current-element').first().parent().next();
            //console.dir(nextObjeto)
            if (nextObjeto.length>0){
                $('#'+self.options.id).find('.current-element').first().removeClass('current-element');
                nextObjeto.find('.group.group-block').first().addClass('current-element');
                nextObjeto.find('.group.group-block').first().find('input').first().focus();
            }    
           e.cancelBubble=true;
           
           return false; //for preventing strange effects with calendar control with key enter
         });
         Mousetrap(keyForm).bind("down",function(e){
            //console.log("down")
            //console.log(self.currentImputId);
            var currentElement=  document.activeElement;
            console.dir(currentElement)
            var nextObjeto = $('#'+self.options.id).find('.current-element').first().parent().next();
            //console.dir(nextObjeto)
            if (nextObjeto.length>0){
                $('#'+self.options.id).find('.current-element').first().removeClass('current-element');
                nextObjeto.find('.group.group-block').first().addClass('current-element');
                nextObjeto.find('.group.group-block').first().find('input').first().focus();
            }
            

         });
         Mousetrap(keyForm).bind("up",function(e){
            //console.log("up")
            var currentElement=document.activeElement;
            //console.dir(currentElement)
            var prevObjeto = $('#'+self.options.id).find('.current-element').first().parent().prev();
            //console.dir(prevObjeto)
            if (prevObjeto.length>0){
                $('#'+self.options.id).find('.current-element').first().removeClass('current-element');
                prevObjeto.find('.group.group-block').first().addClass('current-element');
                prevObjeto.find('.group.group-block').first().find('input').first().focus();
            }
         });
     }
     ns.UXKeyForm.prototype.initevent = function(options){
        this.initEventInputSearch()
     }
     var findFirstElement=function(){
         var self=this;
         $('#' + self.options.id).find('.group.group-block').first().addClass('current-element');
         var objeto=$('#' + self.options.id).find('.group.group-block').first().find('input').first();
         
         //console.dir(objeto);

         //objeto.focus();
     }
     var setFocus=function(that){
         var objeto=$(that).find("input");
         objeto.focus(function(){
             var self=this;
              
             objeto=null;
         })
     }
})(controls=controls||{},components,jQuery)


var UXKeyForm=controls.UXKeyForm
export {UXKeyForm}

/*
if (!window.controls)
   window.controls={}
   
util.addNameSpace(window.controls,controls);
*/