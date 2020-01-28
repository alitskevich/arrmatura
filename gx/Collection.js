/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/**
 * @OnlyCurrentDoc
 */

function Collection(sheetName, opts) {
  opts = opts || {};
  var sheet =  typeof sheetName === 'string' ? SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName) : sheetName;  
  if (!sheet){
    sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetName);
    if (opts.fields){
      sheet.setFrozenRows(1);
      sheet.getRange(1,1,1,opts.fields.length).setValues([opts.fields]);
    }
  }
  
  var keys = opts.keys || sheet.getRange(1,1,1,sheet.getLastColumn()).getValues()[0];
  
  var appendum = []
  var updendum = {};
  
  var map = {};
  var list = [];
  
  this.get = function(key){ 
    return map[key]
  }
  
  this.all = function(){ 
    return list
  }
  
  this.size = function(){ 
    return list.length
  }
  
  this.load = function(sz){ 
    var iFrozen = sheet.getFrozenRows();
    var iLast = sheet.getLastRow();
    var iSize = Math.min(sz || 100000, iLast - iFrozen)
    if (iSize>0){
      sheet.getRange(iFrozen+1,1,iSize, keys.length).getValues().forEach(function(e,i){
        var r = keys.reduce(function (r,k,idx){ r[k] = e[idx]; return r },{ $row: 1+i+iFrozen },e)
        map[r.id] = r;
        list.push(r);
      })
    }
    return this;
  }
  
  this.forEach = function(fn){
    var T = this;
    list.forEach(function(e){ 
      var d = fn.call(T, e) 
      if (d) {
        T.upsert(d);
      }
    });
    return this.commit();
  }
  
  this.upsert = function (e) {
    if (!e || !e.id) {return}
    var me = map[e.id]
    if (me){
      if (me.$row && !updendum[me.$row]) {
        updendum[me.$row] = me; 
      }
    } else {
      me = {created_at: e.created_at || Date.now()};
      appendum.push(me);
      map[e.id] = me;
      list.push(me);
    }
    Object.assign(me, e)        
    me.touch = 1+(+me.touch||0)
    return me;
  } 
  
  this.commit = function(){
    var ts = Date.now();
    var offset = sheet.getFrozenRows();
    var appSize = appendum.length;
    
    Object.keys(updendum).forEach(function(row){ 
      var e = updendum[row];
      e.modified_at = ts;
      sheet.getRange(e.$row, 1, 1, keys.length).setValues([keys.reduce(function (item, key, index){ item[index] = Object.toString(e[key]); return item;},[])])
    });
    
    if (appSize){
      list.forEach(function(e){ 
        if (e.$row){
          e.$row += appSize;
        }
      });
      sheet.insertRowsAfter(offset, appSize)
      var values= appendum.map(function(e, index) {
        e.modified_at = ts
        e.$row = offset+1+index;
        return keys.reduce(function (item, key, index){ item[index] = Object.toString(e[key]); return item;},[]);
      })
      sheet.getRange(offset+1, 1, appSize, keys.length).setValues(values)
    }
    
    appendum = [];
    updendum = {};
    
    return this;
  }
  
  this.vacuum = function(){
    var rFrom = sheet.getFrozenRows()+1
    var rLast = sheet.getLastRow()
    if(rLast>rFrom){
      sheet.deleteRows(rFrom+1, rLast-rFrom)
    }
    map = {};
    list = [];
    appendum = [];
    updendum = {};
    return this.clear();
  }
  
  this.clear = function(){
    var rFrom = sheet.getFrozenRows()+1
    var rLast = sheet.getLastRow()
    if(rLast>rFrom){
      sheet.getRange(rFrom,1,sheet.rLast-rFrom, keys.length).clearContent()
    }
    return this;
  }
  
  this.load(opts.maxSize);
}



