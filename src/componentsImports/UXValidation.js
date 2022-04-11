import jQuery from '../../src/componentsImports/import-jquery.js';
import {util} from '../../src/componentsImports/util01.js';
import {components} from '../../src/componentsImports/components01.js';

import {is} from './is.js'
import moment from 'moment'

var controls;
;(function(ns,components,$){
    "use strict";
    ns.UXValidation=(function(){
        return function(options,fn,callback){
                       
          var params=[].slice.call(arguments);
          if (params.length>0){    
             this.initControl.apply(this,params,fn,callback);
          }

        }
    })();
    
    //ns.UXValidation.prototype=new components.container();
    
    ns.UXValidation.prototype.initControl=function(options,fn,callback){
        /*
        ;(function(options){
            console.dir(options);
            
        })(options)
        */
       
       
        if ( this.initevent){
            this.initevent(options,fn,callback)
        } 
          
        
     }
     ns.UXValidation.prototype.initevent = function(options,fn,callback){
        this.initValidation(options,fn,callback)
     }
     ns.UXValidation.prototype.initValidation = function(options,fn,callback){
         var self=this;
         var selectorWarnings=[];
         const {
            id,
            name,
            msgText,
            msgWarning,
            msgPlaceHolder,
            constraints,
            required,
            date,
            email,
            number,

         } = options;
         console.dir(fn);
         //console.dir(options)
         let selectorInput=document.querySelector('#'+id+' .input');
    
         let selectorWarning = document.querySelectorAll('#'+id+' .label-warning');
         //console.dir(selectorWarning);
        if (selectorInput) {
            selectorInput.addEventListener('focus',function(e){
                //console.dir(e);
            })
            selectorInput.addEventListener('blur',function(e){
                selectorWarnings=[];
                //console.dir(e);
                //if (msgWarning){
                    
                    //if (selectorInput.value){
                        
                    //    selectorWarning.forEach(function(item){
                    //        item.style.display='none';
                    //    });  
                        //selectorWarning.style.display='none';
                        if (callback){
                            callback();
                        }

                    //}else{
                        if (required){
                            if (is.empty(selectorInput.value)){
                                selectorWarnings.push({msgWarning:'Campo Obligatorio'})
                                /*
                                selectorWarning.forEach(function(item){
                                    item.style.display='block';
                                });
                                */
                            }else{
                                /*
                                selectorWarning.forEach(function(item){
                                    item.style.display='none';
                                });
                                */  
                            }
                        }
                        
                        if (date){
                            var fecha=moment(selectorInput.value,'DD/MM/YYYY',true);
                            console.dir(fecha);
                            console.dir(fecha.isValid())
                            console.dir(toString.call(selectorInput.value.toString()));
                            console.dir(selectorInput.value);
                            console.dir(is.date(selectorInput.value));
                            console.dir(fecha._d.getFullYear());
                            console.dir(isDate(selectorInput.value));


                            if (!isDate(selectorInput.value)){
                                selectorWarnings.push({msgWarning:'Fecha Incorrecta'})
                                /*
                                selectorWarning.forEach(function(item){
                                    item.style.display='block';
                                });
                                */
                            }else{
                                /*
                                selectorWarning.forEach(function(item){
                                    item.style.display='none';
                                });
                                */  
                            } 
                        }
                        if (fn)
                          fn({selectorInput,selectorWarnings})
                        //selectorWarning.style.display='block';
                        
                    //}

                //}
            });            
        }
        if (selectorWarning){
            selectorWarning.forEach(function(item){
                item.style.display='none';
            });
            //selectorWarning.style.display='none';
        }
        if (fn)
          fn({selectorInput,selectorWarnings})
  }

  var isDate = function(value){
      const format='DD/MM/YYYY';
      var _isDate=false;
      var fecha=moment(value,format,true);
      if (fecha.isValid()){
          if (fecha._d.getFullYear()>1999 && fecha._d.getFullYear()<=9999){
            _isDate=true;
          }
      }
      return _isDate;
  }

  var check = function(constrains){
          
       
       
  }

})(controls=controls||{},components,jQuery)

var UXValidation = controls.UXValidation
export {UXValidation}

/*
if (!window.controls)
   window.controls={}
   
util.addNameSpace(window.controls,controls);
*/