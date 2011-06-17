/*
 * Ext JS Library 1.0.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */

Ext.UpdateManager.defaults.indicatorText="<div class=\"loading-indicator\">\xfcbertrage Daten ...</div>";if(Ext.View){Ext.View.prototype.emptyText="";}if(Ext.grid.Grid){Ext.grid.Grid.prototype.ddText="{0} Zeile(n) ausgew\xe4lt";}if(Ext.TabPanelItem){Ext.TabPanelItem.prototype.closeText="Diesen Tab schlie\xdfen";}if(Ext.form.Field){Ext.form.Field.prototype.invalidText="Der Wert des Feldes ist nicht korrekt";}Date.monthNames=["Januar","Februar","M\xe4rz","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];Date.dayNames=["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Fritag","Samstag"];if(Ext.MessageBox){Ext.MessageBox.buttonText={ok:"OK",cancel:"Abbrechen",yes:"Ja",no:"Nein"};}if(Ext.util.Format){Ext.util.Format.date=function(v,_2){if(!v){return "";}if(!(v instanceof Date)){v=new Date(Date.parse(v));}return v.dateFormat(_2||"d.m.Y");};}if(Ext.DatePicker){Ext.apply(Ext.DatePicker.prototype,{todayText:"Heute",minText:"Dieses Datum liegt von dem erstm\xf6glichen Datum",maxText:"Dieses Datum liegt nach dem letztm\xf6glichen Datum",disabledDaysText:"",disabledDatesText:"",monthNames:Date.monthNames,dayNames:Date.dayNames,nextText:"N\xe4chster Monat (Strg/Control + Rechts)",prevText:"Vorheriger Monat (Strg/Control + Links)",monthYearText:"Monat ausw\xe4hlen (Strg/Control + Hoch/Runter, um ein Jahr auszuw\xe4hlen)",todayTip:"Heute ({0}) (Leertaste)",format:"d.m.Y"});}if(Ext.PagingToolbar){Ext.apply(Ext.PagingToolbar.prototype,{beforePageText:"Seite",afterPageText:"von {0}",firstText:"Erste Seite",prevText:"vorherige Seite",nextText:"n\xe4chste Siete",lastText:"letzte Seite",refreshText:"Aktualisieren",displayMsg:"Anzeige Eintrag {0} - {1} von {2}",emptyMsg:"Keine Daten vorhanden"});}if(Ext.form.TextField){Ext.apply(Ext.form.TextField.prototype,{minLengthText:"Bitte geben Sie mindestens {0} Zeichen ein",maxLengthText:"Bitte geben Sie maximal {0} Zeichen ein",blankText:"Dieses Feld darf nich leer sein",regexText:"",emptyText:null});}if(Ext.form.NumberField){Ext.apply(Ext.form.NumberField.prototype,{minText:"Der Mindestwert f\xfcr dieses Feld ist {0}",maxText:"Der Maximalwert f\xfcr dieses Feld ist {0}",nanText:"{0} ist keine Zahl"});}if(Ext.form.DateField){Ext.apply(Ext.form.DateField.prototype,{disabledDaysText:"nicht erlaubt",disabledDatesText:"nicht erlaubt",minText:"Das Datum in diesem Feld mu\xdf nach dem {0} liegen",maxText:"Das Datum in diesem Feld mu\xdf vor dem {0} liegen",invalidText:"{0} ist kein valides Datum - es mu\xdf im Format {1} eingegeben werden",format:"Tag.Monat.Jahr"});}if(Ext.form.ComboBox){Ext.apply(Ext.form.ComboBox.prototype,{loadingText:"Lade Daten ...",valueNotFoundText:undefined});}if(Ext.form.VTypes){Ext.apply(Ext.form.VTypes,{emailText:"Dieses Feld sollte eine E-Mail-Adresse enthalten. Format: \"user@domain.com\"",urlText:"Dieses Feld sollte eine URL enthalten. Format \"http:/"+"/www.domain.com\"",alphaText:"Dieses Feld darf zur Buchstaben enthalten und _",alphanumText:"Dieses Feld darf zur Buchstaben und Zahlen enthalten und _"});}if(Ext.grid.GridView){Ext.apply(Ext.grid.GridView.prototype,{sortAscText:"Aufsteigend sortieren",sortDescText:"Absteigend sortieren",lockText:"Spalte sperren",unlockText:"Spalte freigeben (entsperren)",columnsText:"Spalten"});}if(Ext.grid.PropertyColumnModel){Ext.apply(Ext.grid.PropertyColumnModel.prototype,{nameText:"Name",valueText:"Wert",dateFormat:"d.m.Y"});}if(Ext.SplitLayoutRegion){Ext.apply(Ext.SplitLayoutRegion.prototype,{splitTip:"Ziehen, um Gr\xf6\xdfe zu \xe4ndern.",collapsibleSplitTip:"Ziehen, um Gr\xf6\xdfe zu \xe4ndern. Doppelklick um Panel auszublenden."});}