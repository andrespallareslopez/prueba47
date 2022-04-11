import jQuery from '../../src/componentsImports/import-jquery.js'
import {util} from '../../src/componentsImports/util01.js';

import { appendToContainer,recreateNode,removeContainer } from "../../src/componentsImports/utilContainer.js";


import Pikaday from 'pikaday'
import Tether from "tether"

var controls;
;(function(ns,$){
    "use strict";
    ns.UXDatePicker=(function(){
       return function(options){
           
          (function(options){
              options.id=options.id||undefined
              options.namefield=options.namefield||'#fecha'
              options.namepicker=options.namepicker||'calendar'
              options.namebutton=options.namebutton||'#btn-fecha'
              options.nameblock=options.nameblock||'.group-block'
              
          })(options); 
          this.options={};
            
          util.extend(options,this.options);  
          this.init();
       };
    })();
    
    ns.UXDatePicker.prototype.init=function(){
        var self=this
        var id=self.options.id;
        console.log("UXDatePicker "+id)
        var nameCalendar=self.options.id+self.options.namepicker;
        console.log(nameCalendar)
        var field = document.querySelector("#"+id+" "+self.options.namefield); 
        console.dir(field)
        var picker = new Pikaday({
            field: field,
            trigger: document.querySelector("#"+id+" "+self.options.namebutton),
            format: "DD/MM/YYYY",
            bound: false,
            onSelect: function () {
                //console.log(d);
                field.value = picker.toString();
                picker.hide();
                $("#"+nameCalendar).toggleClass("tether-open");
                tepicker.position();
            }
            
            //position: 'top left'
            //reposition:true,
            //container:document.querySelector(".main .content")
        });
        picker.el.id = nameCalendar;
        picker.hide();
        //console.dir(picker.el);
        console.dir(picker)
        $("#"+id+" #btn-fecha").on("click", function (e) {
            e.preventDefault();
            
            $("#"+nameCalendar).toggleClass("tether-open");
            //tepicker.position();
            console.log("estoy en click");
            
            if (picker.isVisible()) {
                //picker.show();
                picker.hide();
                //picker._o.bound=true;
            } else {
                picker.show();
                tepicker.position();
                tepicker.position();
                //picker._o.bound=false;
                //picker.adjustPosition()
                //picker.show();
                
            }
        }); 
        $("#"+id+" "+self.options.nameblock).on("click",function(e){
            console.log("estoy dentro"+"#"+id+" "+self.options.nameblock)
            //console.dir(e)
            e.preventDefault()
            if ($(getnamedatalist.apply(self,[])).hasClass("tether-open") && ((e.target.className !== 'fa fa-sort-desc' && e.target.className !== 'fa fa-search' && e.target.className !== 'fa fa-calendar' ) && e.target.id !== self.options.namebutton.replace('#',''))){
               //cerramos el panel del combo si pinchamos en cualquier lugar del control
               $(getnamedatalist.apply(self,[])).toggleClass("tether-open");
               if (picker.isVisible()) {
                //picker.show();
                picker.hide();
                //picker._o.bound=true;
            } else {
                picker.show();
                tepicker.position();
                tepicker.position();
               
                
            }

               //tepicker.position();
               //tepicker.position();

               if (self.options.onClose){
                self.options.onClose()
               }
            }
        })




        var tepicker = new Tether({
            element: "#"+nameCalendar,
            target: "#"+id+" "+self.options.namebutton,
            attachment: "top right",
            targetAttachment: 'bottom left',
            constraints: [
                {
                    to: 'scrollParent',
                    pin: true
                }]
        });
        tepicker.position()
        self.$tepicker= tepicker;
        picker.hide()
    };
    ns.UXDatePicker.prototype.toggle=function(){
        var self=this
        
        $(getnamedatalist.apply(self,[])).toggleClass("tether-open");
        self.$tepicker.position();
        
    };
    ns.UXDatePicker.prototype.destroy=function(){
        var self=this;
       //ReactDOM.unmountComponentAtNode($(getnamedatalist.apply(self,[]))[0]);
       removeContainer(getnamedatalist.apply(self,[]))
    }

    var getnamedatalist = function(){
        var self = this
        var id=self.options.id;
        return "#"+id + self.options.namepicker;
     }

})(controls=controls||{},jQuery)

var UXDatePicker = controls.UXDatePicker
export {UXDatePicker}

//console.dir(controls)
/*
if (window.controls==undefined){
   window.controls={}
}
util.addNameSpace(window.controls,controls);
*/