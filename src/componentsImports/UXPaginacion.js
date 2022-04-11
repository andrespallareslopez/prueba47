import jQuery from '../../src/componentsImports/import-jquery.js'  
import {util} from '../../src/componentsImports/util01.js';
import {components} from '../../src/componentsImports/components01.js';

var controls
;(function(ns,components,$){

    "use strict";
    ns.UXPaginacion=(function(){ 
            
        return function(options){
            //var observer;
            //var allparams=[].slice.call(arguments);
            //console.log(allparams);
            //**********************
            //otra manera de comprobar el parametro
            // if (options){}else{}
     
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
    ns.UXPaginacion.prototype.init=function(options,config){
          
          (function(options){
             options.maxRecord=options.maxRecord || undefined;
             options.pageRow=options.pageRow|| undefined;
             
          })(options);
            
          this.options={};
          util.extend(options,this.options);
          this.pages=Math.ceil(this.options.maxRecord/this.options.pageRow);
          //console.dir(this.pages)   
          
    };
    
    ns.UXPaginacion.prototype.numPage=function(index){
       
       //return util.pagination(index,this.pages);
       //console.dir(this.pages)
       return util.pagelinks(index,this.pages);
    };
    ns.UXPaginacion.prototype.initevent=function(){
       
    };

})(controls=controls||{},components,jQuery);  //podriamos poner simplemente this, y no definir components



var UXPaginacion=controls.UXPaginacion;
export {UXPaginacion}

/*
if (!window.controls)
   window.controls={}
      
util.addNameSpace(window.controls,controls);
*/