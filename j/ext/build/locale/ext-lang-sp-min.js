/*
 * Ext JS Library 1.0.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */

Ext.UpdateManager.defaults.indicatorText="<div class=\"loading-indicator\">Cargando...</div>";if(Ext.View){Ext.View.prototype.emptyText="";}if(Ext.grid.Grid){Ext.grid.Grid.prototype.ddText="{0} fila(s) seleccionada(s)";}if(Ext.TabPanelItem){Ext.TabPanelItem.prototype.closeText="Cerrar esta pesta\xc3\xb1a";}if(Ext.form.Field){Ext.form.Field.prototype.invalidText="El valor en este campo es inv\xc3\xa1lido";}Date.monthNames=["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];Date.dayNames=["Domingo","Lunes","Martes","Mi\xc3\xa9rcoles","Jueves","Viernes","S\xc3\xa1bado"];if(Ext.MessageBox){Ext.MessageBox.buttonText={ok:"Aceptar",cancel:"Cancelar",yes:"S\xc3",no:"No"};}if(Ext.util.Format){Ext.util.Format.date=function(v,_2){if(!v){return "";}if(!(v instanceof Date)){v=new Date(Date.parse(v));}return v.dateFormat(_2||"d/m/Y");};}if(Ext.DatePicker){Ext.apply(Ext.DatePicker.prototype,{todayText:"Hoy",minText:"Esta fecha es anterior a la fecha m\xc3nima",maxText:"Esta fecha es posterior a la fecha m\xc3\xa1xima",disabledDaysText:"",disabledDatesText:"",monthNames:Date.monthNames,dayNames:Date.dayNames,nextText:"Mes Siguiente (Control+Right)",prevText:"Mes Anterior (Control+Left)",monthYearText:"Seleccione un mes (Control+Up/Down para desplazar el a\xc3\xb1o)",todayTip:"{0} (Barra espaciadora)",format:"d/m/Y"});}if(Ext.PagingToolbar){Ext.apply(Ext.PagingToolbar.prototype,{beforePageText:"P\xc3\xa1gina",afterPageText:"de {0}",firstText:"Primera p\xc3\xa1gina",prevText:"P\xc3\xa1gina anterior",nextText:"P\xc3\xa1gina siguiente",lastText:"\xc3\u0161ltima p\xc3\xa1gina",refreshText:"Actualizar",displayMsg:"Mostrando {0} - {1} de {2}",emptyMsg:"Sin datos para mostrar"});}if(Ext.form.TextField){Ext.apply(Ext.form.TextField.prototype,{minLengthText:"El tama\xc3\xb1o m\xc3nimo para este campo es de {0}",maxLengthText:"El tama\xc3\xb1o m\xc3\xa1ximo para este campo es de {0}",blankText:"Este campo es obligatorio",regexText:"",emptyText:null});}if(Ext.form.NumberField){Ext.apply(Ext.form.NumberField.prototype,{minText:"El valor m\xc3nimo para este campo es de {0}",maxText:"El valor m\xc3\xa1ximo para este campo es de {0}",nanText:"{0} no es un n\xc3\xbamero v\xc3\xa1lido"});}if(Ext.form.DateField){Ext.apply(Ext.form.DateField.prototype,{disabledDaysText:"Deshabilitado",disabledDatesText:"Deshabilitado",minText:"La fecha para este campo debe ser posterior a {0}",maxText:"La fecha para este campo debe ser anterior a {0}",invalidText:"{0} no es una fecha v\xc3\xa1lida - debe tener el formato {1}",format:"d/m/Y"});}if(Ext.form.ComboBox){Ext.apply(Ext.form.ComboBox.prototype,{loadingText:"Cargando...",valueNotFoundText:undefined});}if(Ext.form.VTypes){Ext.apply(Ext.form.VTypes,{emailText:"Este campo debe ser una direcci\xc3\xb3n de correo electr\xc3\xb3nico con el formato \"usuario@dominio.com\"",urlText:"Este campo debe ser una URL con el formato \"http:/"+"/www.dominio.com\"",alphaText:"Este campo solo debe contener letras y _",alphanumText:"Este campo solo debe contener letras, n\xc3\xbameros y _"});}if(Ext.grid.GridView){Ext.apply(Ext.grid.GridView.prototype,{sortAscText:"Ordenar en forma ascendente",sortDescText:"Ordenar en forma descendente",lockText:"Bloquear Columna",unlockText:"Desbloquear Columna",columnsText:"Columnas"});}if(Ext.grid.PropertyColumnModel){Ext.apply(Ext.grid.PropertyColumnModel.prototype,{nameText:"Nombre",valueText:"Valor",dateFormat:"j/m/Y"});}if(Ext.SplitLayoutRegion){Ext.apply(Ext.SplitLayoutRegion.prototype,{splitTip:"Arrastre para redimensionar.",collapsibleSplitTip:"Arrastre para redimensionar. Doble clic para ocultar."});}
