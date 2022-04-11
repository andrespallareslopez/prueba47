
;(function(ns,$,util){

    "use strict";
    ns.paginacion=(function(){ 
            
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
    ns.paginacion.prototype.init=function(options,config){
          
          (function(options){
             options.maxRecord=options.maxRecord || undefined;
             options.pageRow=options.pageRow|| undefined;
             
          })(options);
            
          this.options={};
          util.extend(options,this.options);
          this.pages=Math.floor(this.options.maxRecord/this.options.pageRow);   
          
    };
    ns.paginacion.prototype.numPage=function(index){
       
       //return util.pagination(index,this.pages);
       return util.pagelinks(index,this.pages);
    };
    ns.paginacion.prototype.initevent=function(){
       
    };

})(this.components=this.components||{},jQuery,this.util);  //podriamos poner simplemente this, y no definir components
