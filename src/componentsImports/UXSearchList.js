import React from 'react'
import ReactDOM from 'react-dom'
import jQuery from '../../src/componentsImports/import-jquery.js'
import {util} from '../../src/componentsImports/util01.js';
import {components} from '../../src/componentsImports/components01.js';
import {UXDataList} from '../../src/componentsImports/UXDataList.js'
import {UXButtonScroll} from '../../src/componentsImports/UXButtonScroll.js'
import loadable from '@loadable/component'
var controls;

;(function(ns,UXDataList,$){
    "use strict";
     ns.UXSearchList=(function(){
        return function(options){
         //Si no estubiera definida la propiedad textTemplate entonces
         //no va a iniciar el initevent desde components01.js, por tanto
         //tenemos que lanzarlo nosotros manualmente.
           var params=[].slice.call(arguments);
           if (params.length>0){ 
             this.initControl.apply(this,params);
           }
        }
     })();
      
     ns.UXSearchList.prototype=new UXDataList();
     
     ns.UXSearchList.prototype.initControl=function(options){
        console.log("estoy en UXSearchList initControl")
        ;(function(options){
            options.id=options.id||undefined
            options.containerComponent=options.containerComponent||".panel-datalist"
            options.data=options.data||undefined
            options.nameblock=options.nameblock||'.group-block'
            options.namefield=options.namefield||'#busquedatxt'
            options.namedatalist=options.namedatalist||'.datalist'
            options.namebutton=options.namebutton||'#search'
            options.namebuttonclose=options.namebuttonclose||'#btn-slide-close01'
            options.inputText=options.inputText||'#busquedatxt' 
            options.onButtonClick=options.onButtonClick||undefined
            options.onClose=options.onClose||undefined
            options.onSearch=options.onSearch||undefined
        })(options)
        //renombramos el datalist
        var id=options.id;
        var namedatalist=id+"datalist";
        $("#"+id+" "+options.namedatalist).get(0).id=namedatalist;
        //******************************** */
        options.container="#"+namedatalist+" "+options.containerComponent;
        //********************************* */
        this.$inputText=undefined
        
        this.init(options)
        //this.initEventInputSearch(options)
         //Si no estubiera definida la propiedad textTemplate entonces
        //no va a iniciar el initevent desde components01.js, por tanto
        //tenemos que lanzarlo nosotros manualmente. 
        /*
        if (!this.options.textTemplate && this.initevent){
            this.initevent(options)
        }
        */   
     }
     ns.UXSearchList.prototype.renderTemplate=function(props){
         var self=this
         if (self.options.textTemplate){
            console.log("estoy dentro de textTemplate")
            var result = self.options.textTemplate(props)
          ReactDOM.render(result, $(self.options.container)[0]);
         }
     }
     ns.UXSearchList.prototype.render=function(){
         var self=this
         console.dir(self.options)
         self.renderTemplate(self.options.data);
         
         self.initevent()
     }
     ns.UXSearchList.prototype.initevent=function(){
        this.initEventInputSearch()
     }
     ns.UXSearchList.prototype.initEventInputSearch=function(){
        var self=this

        const KEY_UP = 38;
        const KEY_DOWN = 40;
        const KEY_ENTER = 13;
        const KEY_LEFT = 37;
        const KEY_RIGHT = 39;

        console.log('estoy dentro de UXSearchList initeventinputsearch')
        
        self.eventbuttons()
        var scroll
        let id=self.options.id
        let $inputText="#"+id+" "+self.options.inputText
        
        //console.dir( self.options.data)
        const datos = self.options.data
         
        /*
        const datospagina=Enumerable.from(datos.grupos)
                        //.take(index*pagerow)
                        .skip(pageindex*pagerow)
                        .take(pagerow)
                        .select("$").toArray();
        */
        
        $($inputText).on("keydown",function(e){

            if (e.keyCode===KEY_UP || e.keyCode===KEY_DOWN || e.keyCode===KEY_ENTER ){
                
                self.close();
                            
                 return true;
            }
                    
        })
        $($inputText).on("keyup", debounce(function (e) {
            let datoscombo
            console.dir(e);
            console.log(e.keyCode);
            if (scroll!=undefined){
                scroll.destroy();  //Esto es muy importante si hubiera alguno activo por el efecto debounce, destruirlo
            }
            
            if (e.keyCode===KEY_UP || e.keyCode===KEY_DOWN || e.keyCode===KEY_ENTER ){
                
                    self.close();
                                
                return true;
            }
            if (e.keyCode===KEY_RIGHT || e.keyCode===KEY_LEFT){

                return true;
            }

            //console.dir( self.options.data[id])
            console.log(self.$inputText.val())
            if ($($inputText).val().length>0){
                if (self.options.onSearch){
                    datoscombo = self.options.onSearch(datos,self.$inputText.val(),id)
                }
                if (datoscombo.length>0){
                    self.open()
                    self.openit=true;
                }else{
                    self.close()
                    self.openit=false;
                }
                
               
            }
            else{
                datoscombo= datos.data
                self.close()
                self.openit=false;
                
            }
            
            if (self.opened()){
                var props={data:datoscombo,nameField:self.options.data.nameField};
                console.dir(props)
                self.renderTemplate(props)

                 console.log("estoy dentro de opened")
                 //let timer1=setTimeout(() => {
                    scroll = new UXButtonScroll({
                        id:id+'datalist',
                        onItemClick:function(value,target){
                            console.dir(target)
                            //console.log("estoy dentro de onItemClick")
                            self.$inputText.val(value);
                            self.toggle();
                            scroll.destroy();
                        }
                      })
                      //clearTimeout(timer1) 
                 //}, 10);   
            }
            else{
                //console.log("Estoy dentro de scroll.destroy()")
                if (scroll!=undefined)
                  scroll.destroy()
            }
             
        },200))       
     }
     function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };
})(controls=controls||{},UXDataList,jQuery)

var UXSearchList=controls.UXSearchList
export {UXSearchList}
/*
if (!window.controls)
   window.controls={}
   
util.addNameSpace(window.controls,controls);
*/