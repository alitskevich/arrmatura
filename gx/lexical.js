function wordsAndStems(sheet, opts) {
  opts=opts||{};
  var wording = new Collection('wording',{fields:["id","tags","touch"]});
  var stemming = new Collection('stemming',{fields:["id","weight","touch","forms"]});
  
  var doWording = function(e, ctx){
    var tags = (''+e.tags).split(',').reduce(function(r,e){r[e]=1; return r;},{});
    var s = e[opts.fieldName||'text'].toLowerCase()
    .replace(/\b\d+\b/gi,'num')
    .replace(/\b\s?(и|или|не|эт[а-я]{1,4}|также|для|до|что|num)\b/gi,'|')
    .replace(/\b\[a-zа-я0-9]{1,3}\b/gi,'|')
    .replace(/\b(are|at|by|be|of|and|or|is|it|its|on|to|two|there|with)\b/g,'|');
    function signalsFn(id) {
      var w = wording.upsert({id: id});
      return ''
    }
    //    s.replace(/\w\w+\s\w\w+\s\w\w+/g, signalsFn);
    //    s.replace(/\w\w+\s\w\w+/g, signalsFn);
    s.replace(/\w\w+/g, signalsFn);
  }
  
  var doStemming = function(e){
    var id = String.stemm(e.id).id;
    var existing = stemming.get(id);
    var w = stemming.upsert({
      id: id, 
      forms: e.id+(existing ? ','+existing.forms : ''),
      weight: e.touch+(existing ? existing.weight : 0)
    });
  }

  if (wording.size()===0) {
    sheet.forEach(function(e){ 
      doWording(e);
    });
    wording.commit();
  }
  
  if (stemming.size()===0) {
    wording.forEach(function(e){ 
      doStemming(e);
    });
    stemming.commit();
  }
  
}

RegExp.fromList = function(list){
  var tree = {}
  function rdcr(a,e,i){ 
    if ('.-'.indexOf(e)+1){
      e = '\\'+e
    }
    if (e==='?'){
      return a[a[i-1]+e]
    }
    if (e==='_'){
      e = '[^a-z0-9а-я]+'
    }
    if (a[i+1]==='?'){
      e += '?'
    }
    return a[e] || (a[e]={}); 
  }
  list.filter(Boolean).forEach(function(v) {
    v.split('').reduce(rdcr, tree).$$$=true;
  });
  
  function collect(n) {
    
    function cmapper(k){ 
      var inner = collect(n[k]); 
      return (inner.length>1 ? k+"(?:"+inner.join('|')+")"+(inner.$$$?'?':'') : k+(inner.length && inner.$$$?'('+inner+')?':inner)); 
    }
    var r = Object.keys(n).filter(function(k){return k!=='$$$'}).map(cmapper);
    r.$$$ = n.$$$
    return r 
  }
  var r= "("+collect(tree).join('|')+")"
  // Logger.log('index='+r)
  return r
}
var enSuffixes='abl,acabl,icabl,idabl,eabl,iceabl,uishabl,umabl,inabl,ionabl,erabl,orabl,urabl,atabl,itabl,entabl,izabl,ionabl,ulabl,ibl,igibl,ac,ic,ific,entific,onic,ipic,eric,atic,etic,antic,entic,iotic,estic,istic,anc,ificanc,aganc,ianc,urianc,ilanc,ulanc,enanc,eranc,isanc,ivanc,enc,ificenc,igenc,inenc,id,ud,itud,icitud,if,ag,iag,ledg,log,ish,al,ical,ifical,logical,ial,icial,ificial,onical,atical,etical,estical,onial,orial,antial,ential,idential,nal,inal,ional,ational,itional,utional,ipal,eral,oral,ural,ital,ental,mental,amental,imental,ual,ectual,itual,ival,ul,ful,eful,iful,some,esome,elsome,ism,icism,aticism,ialism,ualism,etism,iotism,um,ium,imum,ican,ian,ician,inian,arian,man,eman,erman,men,emen,ermen,inessmen,aign,in,ain,inin,antin,on,ion,alion,ilion,sion,asion,ision,ulsion,ension,ersion,ation,ication,ification,idation,igation,iation,ilation,ulation,ipulation,ination,eration,oration,isation,itation,entation,estation,uation,ivation,ization,ition,estion,ution,inution,ison,eton,iton,ern,ar,iar,iliar,ilar,ular,abular,acular,icular,enar,inar,ionar,orar,etar,itar,entar,mentar,utar,er,icer,ager,enger,isher,ier,alier,elier,eler,somer,ener,iner,ioner,itioner,utioner,erner,erer,urer,eter,anter,enter,ester,ister,izer,or,ator,igator,iator,ulator,etor,itor,icitor,mentor,utor,ivor,ur,our,asur,atur,icatur,iatur,itur,is,eris,less,eless,ureless,ingless,ionless,ness,edness,idness,iveness,itiveness,ingness,ishness,iness,eliness,alness,fulness,enness,erness,lessness,usness,ousness,iousness,estness,us,inus,ous,ious,acious,idious,ilious,onious,arious,erious,urious,etious,itious,entious,alous,ulous,inous,ainous,erous,orous,urous,itous,entous,at,icat,ificat,isticat,idat,igat,iat,ilat,ulat,iculat,ipulat,inat,ionat,unat,erat,orat,itat,ilitat,entat,ivat,ect,itect,et,iet,elet,ulet,enet,inet,it,acit,icit,idit,alit,ialit,inalit,ionalit,imentalit,ualit,ilit,abilit,ibilit,ulit,ianit,init,unit,arit,iarit,ilarit,ularit,erit,orit,ivit,ant,icant,ificant,agant,ilant,itant,ent,ificent,igent,ient,icient,ulent,inent,ment,ament,erament,ement,agement,urement,isement,ledgment,ishment,iment,iliment,onment,ionment,ipment,erment,iot,ert,ist,alist,ialist,italist,entist,est,iest,ett,ut,iq,iv,asiv,ativ,icativ,iativ,ulativ,inativ,itiv,utiv,inutiv,iz,iciz,ializ,iniz,eriz,oriz,';
RegExp.SuffexesEn = new RegExp('^([a-z]{2,12}?[bcdfghklmnprstvxvwz])'+RegExp.fromList(enSuffixes.split(','))+'?(s|es|ers|er|ed|(i|l|en)ed|en|e|y|ing|ings|(i|u|l)es|ry)?$');
RegExp.FlexiesEn = /$/;
String.stemm = function(s, r){
  s = (''+s);
  var l = s.length;
  r = r || {id: s, sourse: s, len: l}
  if (l<4){ return r; }
  Object.assign(r, {id: s, last: s[l-1], last2: s[l-2]+s[l-1], last3: s[l-3]+s[l-2]+s[l-1] });
  if (r.last2 === 'ly') {
    return String.stemm(s.substring(0, l-2), Object.assign(r,{ly: 'ly', type:'adv' }));
  }
  var rest = s.replace(RegExp.SuffexesEn,function(s,s1){var l=s1.length; return s1[l-1]===s1[l-2]? s1.slice(0,-1):s1});
  r.id = rest;
  return r;
}
