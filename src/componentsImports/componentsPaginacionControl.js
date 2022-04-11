

;(function(ns,$,util){
    "use strict";
    ns.paginacionControl=(function(){
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
    ns.paginacionControl.prototype=new ns.container();
    
    ns.paginacionControl.prototype.initevent=function(){
        var self=this;
        //if (this.options.clickPageButton){
        //  $(this.options.nameid+".page-button").click(this.options.clickPageButton);
        //}else{
          //$(this.options.nameid+".page-button").off("click");  
          $(this.options.nameid+".page-button").on("click",function(e){
              console.log("estoy en click page button");
              console.log($(this).text());
              self.index=$(this).text();
              self.options.clickButton($(this).text());
          });
        //}
      
    };
    ns.paginacionControl.prototype.reload=function(){
       var self=this;
       //var index;
       //console.log("estoy dentro de paginacioncontrol reload");
         $(this.options.nameid+".page-button").on("click",function(e){
              console.log("estoy en click page button");
              console.log($(this).text());
              //index=$(this).text();
              self.index=$(this).text();              
              self.options.clickButton($(this).text());
              
         });
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
    };
    
})(this.components=this.components||{},jQuery,this.util);  //podriamos poner simplemente this, y no definir components
