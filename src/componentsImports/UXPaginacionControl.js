import jQuery from '../../src/componentsImports/import-jquery.js'  
import {util} from '../../src/componentsImports/util01.js';
import {components} from '../../src/componentsImports/components01.js';

var controls
;(function(ns,components,$){
    "use strict";
    ns.UXPaginacionControl=(function(){
        return function(options){
            //var observer;
            //var allparams=[].slice.call(arguments);
            //console.log(allparams);
            //**********************
        
            //importante comprobar si options existe,y entonces lanzar el init
            //porque si no cuando instanciamos el objeto container en
            //en el prototype de menuvertical,panel,etc..., con el constructor vacio nos interesa que no
            //haga nada, y no hay errores cuando tratemos de hacer herencia
            var params=[].slice.call(arguments);
            if (params.length>0){
                this.init.apply(this,params);
            }
            
            //console.dir(params);
            //if (options){
            //    this.init(options);
            //}
        };
    })();
    
    ns.UXPaginacionControl.prototype.init=function(options){
        var self=this;

        (function(options){
            options.nameid=options.nameid || undefined;
            options.clickButton=options.clickButton|| undefined;
            
         })(options);
           
         this.options={};
         util.extend(options,this.options);

        
          //console.dir(self.options)
          $(self.options.nameid + " " + ".page-button").on("click",function(e){
              console.log("estoy en click page button");
              console.log($(this).text());
              self.index=$(this).text();
              
              /*
              var botones=$(".page-box").find(".page-button");
              
              $(".page-box").find(".page-button").removeClass("current")
              
              $.each(botones,function(key,value){
                 //console.dir($(value).text());
                 //console.log(self.index);
                 if ($(value).text()==self.index){
                     //console.dir(value);
                     $(value).addClass("current");
                     //$(value).toggleClass("current");
                     return false;
                 }
              });
              */
              
              if (!isNaN($(this).text())){
                self.options.clickButton($(this).text());
              }
              
              var timer=setTimeout(()=>{
                  console.log("estoy dentro del timeout")
                  self.reload()
                  clearTimeout(timer)
              },550)
             
          });
        //}
      
    };
    
    ns.UXPaginacionControl.prototype.reload=function(){
       var self=this;
       //var index;
       console.log("estoy dentro de paginacioncontrol reload");

      
       //$(self.options.nameid + " " + ".page-button").off("click","**")
       $(self.options.nameid + " " + ".page-button").off()
       self.init(self.options) 
       /*
        $(self.options.nameid + " " + ".page-button").on("click",function(e){
              console.log("estoy en click page button");
              console.log($(this).text());
              //index=$(this).text();
              self.index=$(this).text();              
              self.options.clickButton($(this).text());
              
         });
        */
         /*
         self.promise.then(function(m){
            //console.log("estoy dentro");
            //console.dir($(".page-box").find(".page-button"));
            var botones=$(".page-box").find(".page-button");
            $.each(botones,function(key,value){
               //console.dir($(value).text());
               //console.log(self.index);
               if ($(value).text()==self.index){
                   //console.dir(value);
                   $(value).addClass("current");
                  
                   return false;
               }
            });

            if (self.options.fnReload){
                self.options.fnReload();
            }
         });
         */
    };
    
})(controls=controls||{},components,jQuery);  //podriamos poner simplemente this, y no definir components


var UXPaginacionControl=controls.UXPaginacionControl;
export {UXPaginacionControl}
/*
if (!window.controls)
   window.controls={}
      
util.addNameSpace(window.controls,controls);
*/
