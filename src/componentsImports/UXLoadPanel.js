import React from 'react'
import ReactDOM from 'react-dom'
import jQuery from '../../src/componentsImports/import-jquery.js'
import {util} from '../../src/componentsImports/util01.js';
import {components} from '../../src/componentsImports/components01.js';
//import {BindComponent} from './bindComponent.js'

import { appendToContainer,recreateNode,removeContainer } from "../../src/componentsImports/utilContainer.js";

var controls;


;(function(ns,components,$){
    "use strict";
    ns.UXLoadPanel = (function(){
    
        return function(options){   
           var params=[].slice.call(arguments);
           if (params.length>0){  
              this.initControl.apply(this,params);
           }
        }
    })();
    
    ns.UXLoadPanel.prototype = new components.container();
    
    ns.UXLoadPanel.prototype.initControl=function(options){
        ;(function(options){
            
            options.id=options.id||undefined
            options.containerComponent=options.containerComponent||".wrapper.page.child";
            options.containerView = options.containerView || ".main-body .childLayout"
            options.textTemplate = options.textTemplate||undefined   
        })(options)
        
        this.init(options)
        this.initEventLoadPanel(options)
          
    }
    /*
    ns.UXLoadPanel.prototype.initevent=function(options){
       this.initEventLoadPanel(options)
    }
    ns.UXLoadPanel.prototype.renderTemplate=function(props){
        var self=this
        if (self.options.textTemplate){
           console.log("estoy dentro de textTemplate")
           var result = self.options.textTemplate(props)
         ReactDOM.render(result, $(self.options.container)[0]);
        }
    }
    ns.UXLoadPanel.prototype.render=function(){
        var self=this
        console.dir(self.options)
        self.renderTemplate(self.options.data);
        
        self.initevent() 
    }
    */
    ns.UXLoadPanel.prototype.initEventLoadPanel = function(options){
       var self=this
       var optionsLoadPanel=options
       console.log('estoy en initeventloadpantel')
       console.log(options.id)
       //var containerView=".main-body .childLayout"
       var containerView= self.options.containerView
       var id=options.id
       var $template=$('#'+id+self.options.containerComponent);
       /*
         puede ser que el id no este al misno nivel que .wrapper.page.child
         por tanto tenemos que tratar de buscar por id+' .wrapper.page.....
       */
       if (!$template[0]){
        //$template=$('#'+id+' .wrapper.page.child');
        $template=$('#'+id+' '+self.options.containerComponent);
       }
       var $buttonBack
        console.log($template.length)
        //$('.childLayout').removeClass("animation");
        $(self.options.containerView).removeClass("animation");
        //ReactDOM.unmountComponentAtNode($('.main-body .childLayout')[0]);
        ReactDOM.unmountComponentAtNode($(self.options.containerView)[0]);
        if ($template.length==0 && id){
          
        var panelControl=new components.container({
           ReactDOM:ReactDOM, 
           container:containerView,
           templateReact: options.textTemplate,
           data:{id:id}
        })
        panelControl.initevent=function(options){
            console.log('estoy dentro de initeent de panelControl')
            var timer=setTimeout(function(){
               changeAnimation.apply(self,[optionsLoadPanel,false])
               clearTimeout(timer)
               onClick()  
            },350)
             
              
          
            
            
            function onClick(){
               console.log("estoy en onClick")
               $buttonBack=$('#'+id+' '+'#btn-toggle-back-3')
               console.dir($buttonBack)
               //console.dir($buttonBack)
               $buttonBack.on("click",function(e){
                 console.log("estoy dentro de click")
                 changeAnimation.apply(self,[optionsLoadPanel,true]) 
                 
               })
            }
        }
       }

    }
    
    var changeAnimation = function(options,remove){
        var self = this
        console.log("estoy dentro de changeAnimation")
        //console.dir($template)
        var id=options.id
        console.log(id)
        var $template=$(self.options.containerView);
        //var reftemplate='#'+id+'.wrapper.page.child'
        var reftemplate='#'+id + self.options.containerComponent
         
        if ($(reftemplate).length==0){
          //$template=$('.childLayout');
          $template=$(self.options.containerView);

          //reftemplate='#'+id+'.wrapper.page.child'
          reftemplate='#'+id+self.options.containerComponent
        }
        console.dir($template)
        console.log(reftemplate)
        if ($template.hasClass("animation")){
         $template.removeClass("animation")
         //$('#'+id+'.wrapper.page.child').removeClass('animation');
         $('#'+id+self.options.containerComponent).removeClass('animation');
         if (remove){
             var timer=setTimeout(function(){
                 //removeContainer('#'+id+'.wrapper.page.child')
                 //removeContainer(reftemplate)
                 //ReactDOM.unmountComponentAtNode($('.main-body .childLayout')[0]);
                 ReactDOM.unmountComponentAtNode($(self.options.containerView)[0]);
                 clearTimeout(timer)
             },400) 
         }
        }else{
         $template.addClass("animation")
         $('#'+id+self.options.containerComponent).addClass('animation');
        }
    }
    
})(controls=controls||{},components,jQuery)


var UXLoadPanel=controls.UXLoadPanel

export {UXLoadPanel}
/*
if (!window.controls)
   window.controls={}
   
util.addNameSpace(window.controls,controls);
*/