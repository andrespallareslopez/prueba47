import jQuery from '../../src/componentsImports/import-jquery.js';
import {util} from '../../src/componentsImports/util01.js';

import Hammer from 'hammerjs'

var controls;

;(function(ns,$){
   "use strict";
    ns.UXButtonScroll=(function(){
      return function(options){
         ;(function(options){
            options.id=options.id||undefined
            options.containerComponent=options.containerComponent||".panel-scroll"
            options.scroll=options.scroll||".panel-scroll-content"
            options.items=options.items||'.panel-scroll-item'
            options.item=options.item||'.datalist-container .element-link'
            options.btnup=options.btnup||'#btn-slide-up'
            options.btndown=options.btndown||'#btn-slide-down'
            options.onItemClick=options.onItemClick||undefined
            options.onClickMenu=options.onClickMenu|| clickElementAccordion
         })(options)
         this.options={};
         util.extend(options,this.options);
         
         this.movesum=0;
         this.$holder=undefined;
         this.scrolltop=undefined;
         this.menuHeight=undefined;
         this.menuHeightScroll=undefined;
         this.menuHeightItems=undefined;
         this.menuHeightItem=undefined;
         this.doclick=undefined;
         
         //comprobar que el id tiene el # para jquery
         if (this.options.id.indexOf('#')<0){
           this.options.id='#'+this.options.id;
           //console.log(this.options.id)
         }
         
         this.init();
         
      }
    })();
    
    ns.UXButtonScroll.prototype.init=function(){
      var self=this
      initScroll.apply(self,[]);

    }
    ns.UXButtonScroll.prototype.destroy=function(){
      var self=this;
      removeEvents.apply(self,[]);
    }
    
    ns.UXButtonScroll.prototype.resize=function(){
        var self=this;
        console.log("estoy en UXButtonScroll resize");
        calcularAltura.apply(self,[]);
        self.menuHeightItem=$(self.options.id+" "+self.options.containerComponent+" "+self.options.item).height();
        deactivateButtons.apply(self,[]);
               
        activateButtons.apply(self,[]);
    }
    
    var initScroll=function(){
     
        var self=this
        console.log("Estoy en initscroll en id:"+self.options.id)

        self.$holder=$(self.options.id+" "+self.options.containerComponent+" "+self.options.scroll);
        
        console.dir(self.$holder)
        //console.dir(self.$holder)
        
        calcularAltura.apply(self,[]);
        
        self.menuHeightItem=$(self.options.id+" "+self.options.containerComponent+" "+self.options.item).height();
        //self.menuHeightItem=Math.abs(self.menuHeightItem)
        //console.dir($(self.options.id+" "+self.options.containerComponent+" "+self.options.item))
        //console.log(self.menuHeightItem)
        
        holdit($(self.options.id+" "+self.options.containerComponent+" "+self.options.btndown),buttonMove,-1,400,2,self);
        holdit($(self.options.id+" "+self.options.containerComponent+" "+self.options.btnup),buttonMove,1,400,2,self);
        
        $(self.options.id+" "+self.options.containerComponent+" "+self.options.btnup).addClass("disabled");
        
      
        
        
        deactivateButtons.apply(self,[]);

        self.$holder[0].addEventListener("scroll",handleScroll.bind(self));
        
         
        self.$holder[0].scrollTop=Math.abs(self.movesum);
        $(self.options.id+" "+self.options.containerComponent+" "+self.options.item).on("click",function(e){
            console.log("estoy en item click")
            //console.dir(e.target)
            //console.dir(this)
            if (self.options.onClickMenu){
              self.options.onClickMenu.apply(self,[]);
            }
            if (self.options.onItemClick){
              var itemText=this.textContent
              //console.log(itemText)
            
              self.options.onItemClick(itemText,e.target);
            }
        })

       debounceScroll.apply(self,[]);
        
    }
    var handleScroll=function(){
      var self=this
      //console.log("estoy en scroll");
        
      // console.log($holder[0].scrollTop);
      //console.log(delta);
      calcularAltura.apply(self,[]);
      
      //hemos puesto el doclick porque al cargar en otro panel de datos,al hacer click, con mas de un slide
      //por ejemplo hace un efecto raro en el scroll y no lo deja de en su sitio, cambia el scroll, y trato de 
      //dejarlo en la mmisma position
      if (self.doclick){
          self.$holder[0].scrollTop=self.scrolltop;
          self.doclick=false;
      }
      
      self.movesum=-self.$holder[0].scrollTop;
      
      activateButtons.apply(self,[]);
    };
    var removeEvents=function(){
      var self=this
      $(self.options.id+" "+self.options.containerComponent+" "+self.options.item).off("click")
      self.$holder[0].removeEventListener("click",handleScroll);

      $(self.options.id+self.options.containerComponent+" "+self.options.item).off("click");
      $(self.options.id+self.options.containerComponent+" "+self.options.btndown).off("click");
      $(self.options.id+self.options.containerComponent+" "+self.options.btnup).off("click");
    }
    var calcularAltura=function(){
        var self=this;
        self.menuHeightScroll=$(self.options.id+" "+self.options.containerComponent+" "+self.options.scroll).height();
        self.menuHeightItems=$(self.options.id+" "+self.options.containerComponent+" "+self.options.items).height();
        self.menuHeight=self.menuHeightItems - self.menuHeightScroll;
        console.log(self.menuHeightScroll)
        console.log(self.menuHeightItems)
        console.log(self.menuHeight)

    }
    var holdit=function(btn,action,cn,start,speedup,context){
        var self=context;
                 var t;
                 var startold=start;
                 var repeat=function(){
                    action.call(self,cn);
                    t=setTimeout(repeat,startold);
                    startold=startold/speedup;
                 };
                 
                 btn.on("click",function(event){
                      console.log("estoy en click");
                      action.call(self,cn);
                 });
                 
                 if (util.is_touch_device()){
                     if ("Hammer" in window){
                     
                     //console.log("hay Hammer");
                     
                     var mt=new Hammer(btn[0]);
                     mt.on("press",function(ev){
                         console.log("estoy en press");
                         repeat();
                     });
                     mt.on("pressup",function(ev){
                          console.log("estoy en pressup");
                          clearTimeout(t);
                          startold=start;
                     });
                     
                    }
                    
                 }else{
                   btn.on("mousedown",function(event){
                     console.log("estoy en mousedown");
                     repeat();
                   });
                   btn.on("mouseup",function(event){
                     console.log("estoy en mouseup");
                     clearTimeout(t);
                     startold=start;
                   }); 
                 }    
     };
     var buttonMove=function(cn){
         //importante que esto este aqui tambien
         var touchmovey;
         var movey; 
         var self=this;
          if (self.doclick){
                  self.$holder[0].scrollTop=self.scrolltop;
                  self.doclick=false;
          }
          // self=this;
          touchmovey=cn*self.menuHeightItem;
          movey=(touchmovey);
          self.movesum+=movey;
          //console.log(movesum);
          console.log(self.menuHeight);
          self.movesum=Math.max(-self.menuHeight,self.movesum);
          self.movesum=Math.min(0,self.movesum);
          //console.log(cn);
          //console.log(movey);
          console.log(touchmovey);
          //console.log(menuHeightItem);
          console.log(self.movesum);
              
          self.$holder[0].scrollTop=Math.abs(self.movesum);
          //$holder.css("transform","translate(0px,"+movesum+"px)");
          activateButtons.apply(self,[]);
          
     };
     var deactivateButtons=function(){
        var self=this;
          console.log(self.menuHeight+" "+self.options.id)
        //console.dir( $(self.options.id+" "+self.options.containerComponent+" "+self.options.btndown))
        if (self.menuHeight>0){
          $(self.options.id+" "+self.options.containerComponent+" "+self.options.btndown).removeClass("no-visible");
          $(self.options.id+" "+self.options.containerComponent+" "+self.options.btnup).removeClass("no-visible");      
        }else{
          $(self.options.id+" "+self.options.containerComponent+" "+self.options.btndown).addClass("no-visible");
          $(self.options.id+" "+self.options.containerComponent+" "+self.options.btnup).addClass("no-visible");  
        }
     }
     var activateButtons=function(){
        var self=this;
        if (self.movesum===0){
             $(self.options.id+" "+self.options.containerComponent+" "+self.options.btnup).addClass("disabled");
                    //$(container+" "+btnup).css({visibility:"hidden"})
             
        }else{
             $(self.options.id+" "+self.options.containerComponent+" "+self.options.btnup).removeClass("disabled");
                    //$(container+" "+btnup).css({visibility:"visible"})
        }
               //console.log("---------")
               //console.log(self.movesum);
               //console.log(self.menuHeight);
        if (Math.round(self.movesum)<=-self.menuHeight){
           $(self.options.id+" "+self.options.containerComponent+" "+self.options.btndown).addClass("disabled");
           if (self.options.endScroll){
              self.options.endScroll();
           }
           // $(container+" "+btndown).css({visibility:"hidden"})
        } else{
           $(self.options.id+" "+self.options.containerComponent+" "+self.options.btndown).removeClass("disabled");
           //$(container+" "+btndown).css({visibility:"visible"})
        }
   };
   var debounceScroll=function(){
    var self=this;
      var rtime;
      var timeout=false;
      var delta=300;
      var mytimer;
      function resizeEnd(){
        if (new Date()-rtime<delta){
          mytimer=setTimeout(resizeEnd,delta);
        } else {
          timeout=false;


          
          //$(".wrapper.root .content .slide-container .slide-items").empty();
          
          
       
          var mytimer1;
          mytimer1=setTimeout(function() {


             
               self.resize();
               clearTimeout(mytimer1);
          
        }, 100);
         
            clearTimeout(mytimer);
        }
      }
      $(window).on("resize",function(evt){
          //console.log("estoy dentro de resize");
          rtime=new Date();
          if (timeout===false){
              timeout=true;
              mytimer=setTimeout(resizeEnd,delta);
          }
          
      });
};
var clickElementAccordion=function(){
  var self=this;
   console.log("estoy dentro de click element");
  //console.log(self.options.containerComponent);
  //console.log(self.options.nameid+self.options.item);
  //$(self.options.id+self.options.item).click(function(event){
      //hay que poner un retardo porque en el mismo momento del click
      //la altura aun no esta establecida ,importante darle mas de 100ms
      var mytimer=setTimeout(function(){
           console.log("estoy dentro de click UXButtonScroll");
           
           
           calcularAltura.apply(self,[]);
           //self.menuHeightScroll=$(self.options.nameid+self.config.containerComponent+" "+self.config.scroll).height();
           //self.menuHeightItems=$(self.options.nameid+self.config.containerComponent+" "+self.config.items).height();
           //self.menuHeight=self.menuHeightItems-self.menuHeightScroll;
           
           self.doclick=true
           console.log(self.menuHeightScroll);
           console.log(self.menuHeightItems);
           console.log(self.menuHeight);
           //console.log(self.$holder);
           self.scrolltop=self.$holder[0].scrollTop;
           self.movesum=-(self.$holder[0].scrollTop);
           console.log(self.movesum);
           deactivateButtons.apply(self,[]);
           activateButtons.apply(self,[]);
         
           clearTimeout(mytimer);
         if (self.doclick){
            self.$holder[0].scrollTop=self.scrolltop;
            self.doclick=false;
         }
         
      },150);
    //});
}
})(controls=controls||{},jQuery)


var UXButtonScroll=controls.UXButtonScroll
export {UXButtonScroll}
/*
if (!window.controls)
   window.controls={}
   
util.addNameSpace(window.controls,controls);

*/