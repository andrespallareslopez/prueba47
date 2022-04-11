import jQuery from '../../src/componentsImports/import-jquery.js'
import React from 'react'
import ReactDOM from 'react-dom'

import {util} from '../../src/componentsImports/util01.js';
import {components} from '../../src/componentsImports/components01.js';

import { appendToContainer,recreateNode,removeContainer } from "../../src/componentsImports/utilContainer.js";

import Tether from 'tether'

var controls;

;(function(ns,components,$){
    "use strict";
    ns.UXDataList=(function(){
       return function(options){
                      
       
        var params=[].slice.call(arguments);
        if (params.length>0){
            
            this.initControl.apply(this,params);
        }
        
       }
    })();

    
    ns.UXDataList.prototype=new components.container();
    
   
   
    ns.UXDataList.prototype.initControl=function(options){
        
        
        ;(function(options){
            options.id=options.id||undefined
            options.containerComponent=options.containerComponent||".panel-datalist"
            options.data=options.data||undefined
            options.nameblock=options.nameblock||'.group-block'
            options.namefield=options.namefield||'#'+options.id+'combotxt'
            options.namedatalist=options.namedatalist||'#'+options.id+'datalist'
            options.namebutton=options.namebutton||'#'+options.id+'search'
            options.namebuttonclose=options.namebuttonclose||'#'+options.id+'btn-slide-close01'
            options.inputText=options.inputText||'#'+options.id+'combotxt' 
            options.onButtonClick=options.onButtonClick||undefined
            options.onClose=options.onClose||undefined
        })(options)
        //renombramos el datalist
        var id=options.id;
        var namedatalist=id+"datalist";
        $("#"+id+' '+options.namedatalist).get(0).id=namedatalist;
        //******************************** */
        options.container="#"+namedatalist+" "+options.containerComponent;
        //********************************* */
        this.$inputText=undefined

        this.init(options)
        
        //this.eventbuttons()
        
        //Si no estubiera definida la propiedad textTemplate entonces
        //no va a iniciar el initevent desde components01.js, por tanto
        //tenemos que lanzarlo nosotros manualmente.
        /*
        if (!this.options.textTemplate && this.initevent){
            this.initevent(options)
         }
         */   
    }
    ns.UXDataList.prototype.initevent=function(){
        this.eventbuttons()
    }
    ns.UXDataList.prototype.renderTemplate=function(props){
        var self=this
        if (self.options.textTemplate){
           //console.log("estoy dentro de textTemplate")
           var result = self.options.textTemplate(props)
         ReactDOM.render(result, $(self.options.container)[0]);
        }
    }
    ns.UXDataList.prototype.render=function(){
        var self=this
        console.dir(self.options)
        self.renderTemplate(self.options.data);
        
        self.initevent()
    }
    ns.UXDataList.prototype.eventbuttons=function(){
        var self=this
        console.log('estoy en UXDATAlist event buttons con id:'+self.options.id)

        var id=self.options.id;
        var namedatalist=id+"datalist";
        //console.log("UXDataList "+id)
        //console.dir( $("#"+id+" "+".datalist").get(0).id)
        $("#"+id+' '+self.options.namedatalist).get(0).id=namedatalist;
        //console.dir($("#"+namedatalist))
        $("#"+id+" "+self.options.namebutton).on("click", function (e) {
            console.log('estoy dentro de:'+"#"+id+" "+self.options.namebutton)
            e.preventDefault();
            //console.log("estoy dentro")
            //console.dir(e)
            $(getnamedatalist.apply(self,[])).toggleClass("tether-open");
            telist.position();
            //telist.position();
             
            if (self.options.onButtonClick  && $("#"+namedatalist).hasClass("tether-open")){
                console.log("estoy dentro de onButtonClick")
                self.options.onButtonClick(self.options)
            }else if ((self.options.fncreate ) && $("#"+namedatalist).hasClass("tether-open")){
                console.log("estoy dentro de fncreate")
                self.options.fncreate()
            }
        });

        $("#"+namedatalist+" "+self.options.namebuttonclose).on("click",function(e){
           e.preventDefault()
           
           //console.log("estoy dentro")
           $(getnamedatalist.apply(self,[])).toggleClass("tether-open");
           telist.position();
           //telist.position();
           
           if (self.options.onClose){
               self.options.onClose()
           }
           
        })
        
        $("#"+id+" "+self.options.nameblock).on("click",function(e){
            console.log("estoy dentro"+"#"+id+" "+self.options.nameblock)
            //console.dir(e)
            e.preventDefault()
            if ($(getnamedatalist.apply(self,[])).hasClass("tether-open") && ((e.target.className!='fa fa-sort-desc' && e.target.className!='fa fa-search' ) && e.target.id!=self.options.namebutton.replace('#',''))){
               //cerramos el panel del combo si pinchamos en cualquier lugar del control
               $(getnamedatalist.apply(self,[])).toggleClass("tether-open");
               telist.position();
               //telist.position();
               if (self.options.onClose){
                self.options.onClose()
               }
            }
        })
         //Este componente si tiene que tener el setTimeout
      var telist;
      //let timer=setTimeout( () => {
        telist = new Tether({
            element: "#"+namedatalist,
           target: "#"+id+" "+self.options.namebutton,
            /*target: "#"+id,*/
            attachment: "top right",
            targetAttachment: 'bottom left',
            
            constraints: [
                {
                    to: 'scrollParent',
                    //to: document.querySelector('.childLayout'),
                    pin: true
                }]
                
        });
        telist.position();
        
        self.$telist=telist;
        self.$inputText=$("#"+id+" "+self.options.inputText);

      //}, 950);
      
        
       
        //console.dir(self.$inputText)
    }
    ns.UXDataList.prototype.toggle=function(){
       var self=this
       
       $(getnamedatalist.apply(self,[])).toggleClass("tether-open");
       self.$telist.position();
       
    }
    ns.UXDataList.prototype.open=function(){
        var self=this
        
        if  (!$(getnamedatalist.apply(self,[])).hasClass("tether-open")){
            toggleclass.apply(self,[true])
            //$("#"+namedatalist).toggleClass("tether-open");
            //self.$telist.position();
            //self.openit=true;
        }
        
     }
     ns.UXDataList.prototype.opened=function(){
        return this.openit
     }
     ns.UXDataList.prototype.close=function(){
        var self=this
        
        if  (  $(getnamedatalist.apply(self,[])).hasClass("tether-open")){
             
            toggleclass.apply(self,[false])
            //$("#"+namedatalist).toggleClass("tether-open");
            //self.$telist.position();
            //self.openit=false;
        }
     }
     ns.UXDataList.prototype.destroy=function(){
         var self=this;
        //ReactDOM.unmountComponentAtNode($(getnamedatalist.apply(self,[]))[0]);
        removeContainer(getnamedatalist.apply(self,[]))
     }
     var toggleclass = function(openit){
        var self=this
            
            $(getnamedatalist.apply(self,[])).toggleClass("tether-open");
            self.$telist.position();
            self.openit=openit;
     }
     var getnamedatalist = function(){
        var self=this
        var id=self.options.id;
        return "#"+id+"datalist";
     }
    
})(controls=controls||{},components,jQuery)

var UXDataList=controls.UXDataList
export {UXDataList}
/*
if (!window.controls)
   window.controls={}
   
util.addNameSpace(window.controls,controls);

*/