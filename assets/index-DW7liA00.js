(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const $h=18e4;function Jh(s){const{offPlatform:t,sdkUrl:e,appFocus:n}=s,i=s.platformLang||function(){},r=s.bannerState||function(){},a=s.platformPause||function(){},o=s.platformMute||function(){},c=s.platformFlags||function(){};let l=null,h=!1,d=0;const u={};let p=null,g=!1;const b=()=>window.gdsdk||l;function m(v){const E=document.body;if(!v){E.classList.remove("has-banner"),E.style.removeProperty("--bnr");return}E.classList.add("has-banner"),E.style.setProperty("--bnr",Math.min(v,Math.round(innerHeight*.33))+"px")}function f(v){if(!v||v.layout_type!=="overlay")return m(0);const E=Math.round(innerHeight*.33);let w=+v.banner_height||0;w>E&&devicePixelRatio>1&&(w=Math.round(w/devicePixelRatio)),m(w)}function y(v){const E=document.getElementById(v);if(E)return E.style.display="",m(parseInt(E.style.height,10)||0),null;const w=innerHeight>560,L=w?90:50,B=w?728:320,W=document.createElement("div");return W.id=v,W.style.cssText="position:fixed;left:50%;transform:translateX(-50%);bottom:0;z-index:14;width:min("+B+"px,100vw);height:"+L+"px",document.body.appendChild(W),m(L),W}function A(v){const E=document.getElementById(v);E&&(E.style.display="none"),m(0)}function M(v){const E=document.getElementById(v);E&&E.remove(),m(0)}const C="vk.com";function T(){let v="";try{v=new URLSearchParams(location.search).get("vk_app_id")||""}catch{}v||(v=window.__VK_APP_ID||"");const E=String(v).replace(/\D/g,"");return E?"https://"+C+"/app"+E:location.origin+location.pathname}return{DRIVERS:{none:{banner:!1,init(){},ready(){},gameplay(){},interstitial(v){v(!1)},rewarded(v){v(!1)},showBanner(){}},yandex:{banner:!0,init(v){if(t())return;const E=window.__YA_SDK?window.__YA_SDK:new Promise((w,L)=>{const B=document.createElement("script");B.src=e(),B.onload=()=>{try{w(YaGames.init())}catch(W){L(W)}},B.onerror=L,document.head.appendChild(B)});Promise.resolve(E).then(w=>{l=w;try{const L=w.environment&&w.environment.i18n&&w.environment.i18n.lang;L&&i(String(L).slice(0,2).toLowerCase())}catch{}try{w.getFlags&&w.getFlags({defaultFlags:{}}).then(L=>{L&&typeof c=="function"&&c(L)}).catch(()=>{})}catch{}try{w.on&&w.on("game_api_pause",()=>a(!0)),w.on&&w.on("game_api_resume",()=>a(!1))}catch{}v(!!(w.adv&&w.adv.showBannerAdv))}).catch(()=>{})},ready(){try{l.features.LoadingAPI.ready()}catch{}},gameplay(v){try{v?l.features.GameplayAPI.start():l.features.GameplayAPI.stop()}catch{}},interstitial(v,E){try{l.adv.showFullscreenAdv({callbacks:{onOpen:E,onClose:w=>v(w!==!1),onError:()=>v(!1)}})}catch{v(!1)}},rewarded(v,E){let w=!1,L=!1;try{l.adv.showRewardedVideo({callbacks:{onOpen:()=>{L=!0,E&&E()},onRewarded:()=>{w=!0},onClose:()=>v(w,w?null:"closed"),onError:()=>v(w,L?"closed":"nofill")}})}catch{v(!1,"nofill")}},showBanner(v){try{v?Promise.resolve(l.adv.showBannerAdv()).then(E=>{E&&E.stickyAdvIsShowing===!1&&r(!1,E.reason||"fail")}).catch(()=>r(!1,"fail")):Promise.resolve(l.adv.hideBannerAdv()).catch(()=>{})}catch{r(!1,"fail")}},fullscreen(v){try{const E=l.screen&&l.screen.fullscreen;if(!E)return;v?E.request().catch(()=>{}):E.exit().catch(()=>{})}catch{}},askReview(){try{l.feedback.canReview().then(v=>{v&&v.value&&l.feedback.requestReview().catch(()=>{})}).catch(()=>{})}catch{}},addShortcut(){try{l.shortcut.canShowPrompt().then(v=>{v&&v.canShow&&l.shortcut.showPrompt().catch(()=>{})}).catch(()=>{})}catch{}},setScore(v,E){try{if(l.leaderboards&&l.leaderboards.setScore){l.leaderboards.setScore(v,E).catch(()=>{});return}l.getLeaderboards().then(w=>{w.setLeaderboardScore(v,E).catch(()=>{})}).catch(()=>{})}catch{}}},vkok:{banner:!0,waitShort:6e4,waitLong:1e5,init(v){const E=window.vkBridge;E&&E.send("VKWebAppInit").then(()=>{l=E;try{E.send("VKWebAppCheckNativeAds",{ad_format:"reward"}).then(w=>{h=!!(w&&w.result)}).catch(()=>{})}catch{}E.subscribe(w=>{const L=w&&w.detail&&w.detail.type;L==="VKWebAppViewHide"?n(!1):L==="VKWebAppViewRestore"?n(!0):L==="VKWebAppBannerAdClosedByUser"?(f(null),r(!1,"closed")):L==="VKWebAppBannerAdUpdated"&&f(w.detail.data)}),v(!0)}).catch(()=>{})},ready(){},gameplay(){},interstitial(v,E){try{l.send("VKWebAppCheckNativeAds",{ad_format:"interstitial"}).then(w=>!w||!w.result?v(!1):l.send("VKWebAppShowNativeAds",{ad_format:"interstitial"}).then(L=>{L&&L.result&&E(),v(!!(L&&L.result))})).catch(()=>v(!1))}catch{v(!1)}},rewarded(v){try{l.send("VKWebAppCheckNativeAds",{ad_format:"reward"}).then(E=>!E||!E.result?(h=!1,v(!1,"nofill")):l.send("VKWebAppShowNativeAds",{ad_format:"reward"}).then(w=>v(!!(w&&w.result),w&&w.result?null:"closed"))).catch(()=>v(!1,"nofill"))}catch{v(!1,"nofill")}},showBanner(v){try{v?l.send("VKWebAppShowBannerAd",{banner_location:"bottom",layout_type:"resize",height_type:"compact"}).then(E=>{if(!E||!E.result){r(!1,"fail");return}f(E)}).catch(()=>r(!1,"fail")):l.send("VKWebAppHideBannerAd").then(()=>{f(null)}).catch(()=>{})}catch{r(!1,"fail")}},share(v){return l.send("VKWebAppShowStoryBox",{background_type:"image",blob:v,attachment:{text:"play",type:"url",url:T()}}).then(()=>!0).catch(()=>!1)},recommend(){try{l.send("VKWebAppRecommend").catch(()=>{})}catch{}},invite(){try{l.send("VKWebAppShowInviteBox").catch(()=>{})}catch{}},haptic(v){try{v==="select"?l.send("VKWebAppTapticSelectionChanged").catch(()=>{}):l.send("VKWebAppTapticImpactOccurred",{style:v==="heavy"?"heavy":"light"}).catch(()=>{})}catch{}},addShortcut(){try{if(new URLSearchParams(location.search).get("vk_is_favorite")==="1")return;const E=(window.__SAVE_SCOPE||"")+"gk_vk_fav";if(sessionStorage.getItem(E))return;sessionStorage.setItem(E,"1"),l.send("VKWebAppAddToFavorites").catch(()=>{})}catch{}}},android:{banner:!1,init(v){if(window.AndroidAds){try{if(!window.AndroidAds.adsEnabled())return}catch{return}window.__adDone=(E,w)=>{const L=u[E];L&&(delete u[E],L.done(!!w,w?null:L.opened?"closed":"nofill"))},window.__adShown=E=>{const w=u[E];w&&(w.opened=!0,w.started&&w.started())},l=window.AndroidAds,v(!1)}},ready(){try{l.gameReady()}catch{}},gameplay(){},interstitial(v,E){try{const w=String(++d);u[w]={done:v,started:E,opened:!1},l.showInterstitial(w)}catch{v(!1)}},rewarded(v,E){try{const w=String(++d);u[w]={done:v,started:E,opened:!1},l.showRewarded(w)}catch{v(!1,"nofill")}},showBanner(){},askReview(){try{window.AndroidStore&&window.AndroidStore.askReview()}catch{}}},crazy:{banner:!0,mutesOnStart:!0,init(v){if(t())return;const E=document.createElement("script");E.src=e(),E.onload=()=>{try{window.CrazyGames.SDK.init().then(()=>{l=window.CrazyGames.SDK;try{const w=l.user&&l.user.systemInfo,L=w&&w.locale;L&&i(String(L).slice(0,2).toLowerCase())}catch{}try{const w=l.game&&l.game.settings;w&&(o(!!w.muteAudio),l.game.addSettingsChangeListener&&l.game.addSettingsChangeListener(L=>o(!!(L&&L.muteAudio))))}catch{}try{l.game.loadingStart()}catch{}v(!0)}).catch(()=>{})}catch{}},E.onerror=()=>{},document.head.appendChild(E)},ready(){try{l.game.loadingStop()}catch{}},gameplay(v){try{v?l.game.gameplayStart():l.game.gameplayStop()}catch{}},interstitial(v,E){let w=!1;const L=B=>{w||(w=!0,v(B))};try{l.ad.requestAd("midgame",{adStarted:E,adFinished:()=>L(!0),adError:()=>L(!1)})}catch{L(!1)}},rewarded(v,E){let w=!1,L=!1;const B=(W,N)=>{w||(w=!0,N==="nofill"?h=!1:W&&(h=!0),v(W,N))};try{l.ad.requestAd("rewarded",{adStarted:()=>{L=!0,E&&E()},adFinished:()=>B(!0),adError:()=>B(!1,L?"closed":"nofill")})}catch{B(!1,"nofill")}},showBanner(v){const E="cg-banner";if(!v)return A(E);try{if(!y(E))return;l.banner.requestResponsiveBanner([E]).catch(()=>{M(E),r(!1,"fail")})}catch{M(E),r(!1,"fail")}},delight(){try{l.game.happytime()}catch{}},reportProgress(v){try{l.game.reportGameCompletedPercentage(Math.max(0,Math.min(100,v|0)))}catch{}}},gamedist:{banner:!0,waitShort:45e3,waitLong:75e3,init(v){if(t())return;const E=window.GD_OPTIONS;if(!E||!E.gameId)return;let w=!1;const L=()=>{w||(w=!0,l=window.gdsdk||null,W(),v(!0))};E.onEvent=N=>{const X=N&&N.name;X==="SDK_READY"?L():X==="SDK_ERROR"?(h=!1,L()):X==="SDK_GAME_PAUSE"?(a(!0),n(!1),p&&p()):X==="SDK_GAME_START"?(a(!1),n(!0)):X==="SDK_REWARDED_WATCH_COMPLETE"&&(g=!0)};const B=document.createElement("script");B.src=e();const W=()=>{try{const N=b();if(!(N&&N.preloadAd))return;N.preloadAd("rewarded").then(()=>{h=!0}).catch(()=>{h=!1})}catch{}};B.onload=L,B.onerror=()=>{},document.head.appendChild(B)},ready(){},gameplay(){},interstitial(v,E){let w=!1;const L=B=>{w||(w=!0,p=null,v(B))};p=E;try{const B=b();if(!B)return L(!1);B.showAd().then(()=>L(!0)).catch(()=>L(!1))}catch{L(!1)}},rewarded(v,E){let w=!1,L=!1;const B=(W,N)=>{if(!w){w=!0,p=null,v(W,N);try{const X=b();X&&X.preloadAd&&X.preloadAd("rewarded").catch(()=>{})}catch{}}};p=()=>{L=!0,E&&E()},g=!1;try{const W=b();if(!W)return B(!1,"nofill");W.showAd("rewarded").then(()=>B(g,g?null:"closed")).catch(()=>B(!1,L?"closed":"nofill"))}catch{B(!1,"nofill")}},showBanner(v){const E="gd-banner";if(!v)return A(E);try{const w=b();if(!w||!w.showAd){r(!1,"fail");return}if(!y(E))return;Promise.resolve(w.showAd("display",{containerId:E})).catch(()=>{M(E),r(!1,"fail")})}catch{M(E),r(!1,"fail")}}}},state:{get sdk(){return l},get rewardWarm(){return h},reset(){l=null,h=!1,p=null,g=!1}}}}function Qh(){if(typeof window.__PLATFORM__=="string"&&window.__PLATFORM__)return window.__PLATFORM__;if(location.protocol==="file:")return"none";const s=location.hostname;return!s||/^(localhost|127\.0\.0\.1|\[::1\])$/i.test(s),"none"}function Qc(){return location.protocol==="file:"||!location.hostname||/^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname)||/(^|\.)github\.io$/i.test(location.hostname)}const Jo=s=>s+(typeof window<"u"&&window.__SAVE_SCOPE||""),jc=()=>{try{return typeof localStorage<"u"?localStorage:null}catch{return null}},jh=(s,t)=>{try{window.__cloudPut&&window.__cloudPut(s,t)}catch{}};function Os(s,t=null){const e=jc();if(!e)return t;try{const n=e.getItem(Jo(s));return n===null?t:JSON.parse(n)}catch{return t}}function Qo(s,t){const e=jc(),n=JSON.stringify(t);try{e&&e.setItem(Jo(s),n)}catch{}return jh(s,n),t}function tu(){try{if(typeof window<"u"&&window.__PLATFORM_READY)return window.__PLATFORM_READY}catch{}return Promise.resolve(!1)}let Oe={sourceLang:"ru",sourcePattern:/[А-Яа-яЁё]/,names:{ru:"Русский",en:"English"},dictUrl:s=>`assets/text/${s}.json`,defaultFor:(s,t)=>s==="crazy"||s==="gamedist"?t.en?"en":Oe.sourceLang:s?Oe.sourceLang:/^ru\b/i.test(navigator.language||"")?"ru":t.en?"en":Oe.sourceLang,title:null,onChange:null},cs={},an=null,hs=null;const ea={};function Tl(s){let t=2166136261;for(let e=0;e<s.length;e++)t^=s.charCodeAt(e),t=Math.imul(t,16777619);return(t>>>0).toString(36)}function gt(s){if(typeof s!="string"||!s||(window.__trCollect&&((window.__trSeen||(window.__trSeen={}))[Tl(s)]=s),!hs))return s;const t=hs[Tl(s)];return t===void 0?s:t}let Ur=0;async function Ya(s,t=Ur){if(s===Oe.sourceLang)return hs=null,!0;if(ea[s])return hs=ea[s],!0;if(location.protocol==="file:")return!1;try{const e=await fetch(Oe.dictUrl(s));if(!e.ok)throw new Error("HTTP "+e.status);const n=await e.json();return ea[s]=n,t!==Ur?null:(hs=n,!0)}catch(e){return t!==Ur?null:(console.warn(`[язык] словарь ${s} не загрузился, остаёмся на ${Oe.sourceLang}:`,e.message),hs=null,!1)}}function th(){document.documentElement.lang=an,Oe.title&&(document.title=Oe.title(gt))}function Ka(s=document.body){const t={SCRIPT:1,STYLE:1,TEXTAREA:1},e=document.createTreeWalker(s,NodeFilter.SHOW_TEXT,{acceptNode:r=>t[r.parentNode&&r.parentNode.nodeName]?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT}),n=[];for(;e.nextNode();)n.push(e.currentNode);for(const r of n){const a=r.nodeValue,o=a.trim(),c=r.__src!==void 0?r.__src:o;if(!c||!Oe.sourcePattern.test(c))continue;r.__src===void 0&&(r.__src=o);const l=gt(r.__src);l!==o&&(r.nodeValue=o?a.replace(o,l):l)}const i=["title","placeholder","aria-label"];s.querySelectorAll?.("[title],[placeholder],[aria-label]").forEach(r=>{const a=r.__srcAttr||(r.__srcAttr={});for(const o of i){const c=r.getAttribute(o);c!==null&&(a[o]===void 0&&(a[o]=c),Oe.sourcePattern.test(a[o])&&r.setAttribute(o,gt(a[o])))}}),s.querySelectorAll?.("[data-tr-value]").forEach(r=>{r.__trValue!==void 0&&r.value!==r.__trValue||(r.__srcValue===void 0&&(r.__srcValue=r.value),r.value=r.__trValue=gt(r.__srcValue))})}async function eh(s){if(!cs[s]||s===an)return an;const t=an;an=s;const e=++Ur,n=await Ya(s,e);return n===null?an:!n&&s!==Oe.sourceLang?(an=t,await Ya(t,e),an):(th(),Ka(),Oe.onChange?.(an),an)}const Bs=()=>an,eu=()=>({...cs});async function nu(s={}){Oe={...Oe,...s},cs={[Oe.sourceLang]:Oe.names[Oe.sourceLang]};for(const t of s.available||[])Oe.names[t]&&(cs[t]=Oe.names[t]);return an=s.saved&&cs[s.saved]?s.saved:Oe.defaultFor(s.platform||"",cs),await Ya(an),th(),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>Ka(),{once:!0}):Ka(),an}const Za="pz_lang";async function iu(s){const t=Array.isArray(window.__LANGS)?window.__LANGS:[];return window.__platformLang=e=>{const n=(e||"").slice(0,2);Os(Za,null)||n!==Bs()&&(n==="ru"||t.includes(n))&&eh(n)},nu({available:t,saved:Os(Za,null)??su(t),platform:s,sourceLang:"ru",names:{ru:"Русский",en:"English"},title:e=>e("Нулевой пациент"),onChange:null})}function su(s){const t=typeof window.__LANG_HINT=="string"?window.__LANG_HINT.slice(0,2):"";return t==="ru"?"ru":t&&s.includes(t)?t:null}async function nh(){const s=Object.keys(eu());if(s.length<2)return Bs()??"ru";const t=s.indexOf(Bs()??"ru"),e=await eh(s[(t+1)%s.length]);return Qo(Za,e),e}const ih=typeof window<"u"&&window.__PLATFORM__||"none",$a=new Set,ru=s=>($a.add(s),()=>$a.delete(s)),Ja=new Set,au=s=>(Ja.add(s),()=>Ja.delete(s)),{DRIVERS:Al}=Jh({offPlatform:Qc,sdkUrl:()=>window.__SDK_URL||"",appFocus:s=>{for(const t of $a)try{t(s)}catch{}},platformLang:s=>{window.__LANG_HINT=s;try{window.__platformLang&&window.__platformLang(s)}catch{}},bannerState:(s,t)=>{Qa=!!s,!s&&(t==="closed"||++ou>=3)&&(ja=!0)},platformPause:s=>{ei=!!s,eo(),Gr(!s&&!!tl())},platformMute:s=>{for(const t of Ja)try{t(!!s)}catch{}}});let We=Al[ih]||Al.none,Ln=!1,sh=!1,Qa=!1,ou=0,ja=!1,Cl=!1,rh=!1,Rl=null,ei=!1;const to=new Set,eo=()=>{for(const s of to)try{s(ei)}catch{}},lu=()=>ei,cu=s=>(to.add(s),()=>to.delete(s)),ah=()=>Ln,jo=()=>ih;let tl=()=>!0;function hu(s){typeof s=="function"&&(tl=s)}function oh(s,t,e){return new Promise(n=>{let i=!1,r=setTimeout(()=>a(!1),t);function a(c){i||(i=!0,clearTimeout(r),ei=!1,eo(),Gr(!!tl()),n(c))}const o=()=>{clearTimeout(r),r=setTimeout(()=>a(!!e),$h)};ei=!0,eo(),Gr(!1);try{s(a,o)}catch{a(!1)}})}function uu(){try{We.init(s=>{Ln=!0,sh=!!s,rh&&lh()})}catch{}}function lh(){if(rh=!0,!(!Ln||Cl)){Cl=!0;try{We.ready()}catch{}}}function Gr(s){if(ei&&(s=!1),s!==Rl){Rl=s;try{We.gameplay(s)}catch{}}}function ch(){return!Ln||ei?Promise.resolve(!1):oh((s,t)=>We.interstitial(s,t),We.waitShort||12e3,!0)}function du(){return Ln?ei?Promise.resolve(!1):oh((s,t)=>We.rewarded(s,t),We.waitLong||4e4,!1):Promise.resolve(!0)}function fu(){if(Ln)try{We.delight&&We.delight()}catch{}}function pu(){if(Ln)try{We.askReview&&We.askReview()}catch{}}function mu(){if(Ln)try{We.addShortcut&&We.addShortcut()}catch{}}function gu(s,t){if(Ln)try{We.setScore&&We.setScore(s,t)}catch{}}const no=()=>Ln&&typeof We.share=="function";function _u(s){if(!no())return Promise.resolve(!1);try{return Promise.resolve(We.share(s)).then(t=>t!==!1).catch(()=>!1)}catch{return Promise.resolve(!1)}}function hh(s){if(!(!Ln||!sh||s===Qa)&&!(s&&ja)&&!(ei&&s)){Qa=s;try{We.showBanner(s)}catch{}}}const xu=jo()==="crazy"?185e3:15e4,vu=1;let Vr=0;function Mu(s){Vr=Date.now(),hu(s),uu()}const yu=lh,uh=Gr;function Nr(){const s=jo();return s==="none"||Qc()||s==="android"?!0:ah()}function Su(){Vr=0}async function io(s){return s<vu||Date.now()-Vr<xu?!1:(Vr=Date.now(),await ch())}function os(){return Nr()?du():Promise.resolve(!1)}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const el="185",bu=0,Pl=1,Eu=2,Fr=1,wu=2,Ns=3,bi=0,on=1,Tn=2,Qn=0,jn=1,ni=2,Ll=3,Il=4,Tu=5,Ii=100,Au=101,Cu=102,Ru=103,Pu=104,Lu=200,Iu=201,Du=202,Uu=203,so=204,ro=205,Nu=206,Fu=207,Ou=208,Bu=209,zu=210,ku=211,Hu=212,Gu=213,Vu=214,ao=0,oo=1,lo=2,ps=3,co=4,ho=5,Wr=6,uo=7,nl=0,Wu=1,Xu=2,Hn=0,dh=1,fh=2,ph=3,mh=4,gh=5,_h=6,xh=7,vh=300,Fi=301,ms=302,na=303,ia=304,Qr=306,fo=1e3,Jn=1001,po=1002,Xe=1003,qu=1004,Xs=1005,$e=1006,sa=1007,Ui=1008,pn=1009,Mh=1010,yh=1011,zs=1012,il=1013,Vn=1014,Cn=1015,ii=1016,sl=1017,rl=1018,ks=1020,Sh=35902,bh=35899,Eh=1021,wh=1022,Rn=1023,si=1026,Ni=1027,al=1028,ol=1029,Oi=1030,ll=1031,cl=1033,Or=33776,Br=33777,zr=33778,kr=33779,mo=35840,go=35841,_o=35842,xo=35843,vo=36196,Mo=37492,yo=37496,So=37488,bo=37489,Xr=37490,Eo=37491,wo=37808,To=37809,Ao=37810,Co=37811,Ro=37812,Po=37813,Lo=37814,Io=37815,Do=37816,Uo=37817,No=37818,Fo=37819,Oo=37820,Bo=37821,zo=36492,ko=36494,Ho=36495,Go=36283,Vo=36284,qr=36285,Wo=36286,Yu=3200,Xo=0,Ku=1,yi="",Ze="srgb",Yr="srgb-linear",Kr="linear",ue="srgb",Vi=7680,Dl=519,Zu=512,$u=513,Ju=514,hl=515,Qu=516,ju=517,ul=518,td=519,Ul=35044,qs=35048,Nl="300 es",kn=2e3,Hs=2001;function ed(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function Zr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function nd(){const s=Zr("canvas");return s.style.display="block",s}const Fl={};function Ol(...s){const t="THREE."+s.shift();console.log(t,...s)}function Th(s){const t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ot(...s){s=Th(s);const t="THREE."+s.shift();{const e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function se(...s){s=Th(s);const t="THREE."+s.shift();{const e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function ds(...s){const t=s.join(" ");t in Fl||(Fl[t]=!0,Ot(...s))}function id(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const sd={[ao]:oo,[lo]:Wr,[co]:uo,[ps]:ho,[oo]:ao,[Wr]:lo,[uo]:co,[ho]:ps};class Bi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Ye=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ra=Math.PI/180,qo=180/Math.PI;function Vs(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ye[s&255]+Ye[s>>8&255]+Ye[s>>16&255]+Ye[s>>24&255]+"-"+Ye[t&255]+Ye[t>>8&255]+"-"+Ye[t>>16&15|64]+Ye[t>>24&255]+"-"+Ye[e&63|128]+Ye[e>>8&255]+"-"+Ye[e>>16&255]+Ye[e>>24&255]+Ye[n&255]+Ye[n>>8&255]+Ye[n>>16&255]+Ye[n>>24&255]).toLowerCase()}function Qt(s,t,e){return Math.max(t,Math.min(e,s))}function rd(s,t){return(s%t+t)%t}function aa(s,t,e){return(1-e)*s+e*t}function bs(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function sn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Ml=class Ml{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Ml.prototype.isVector2=!0;let Xt=Ml;class tn{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3],u=r[a+0],p=r[a+1],g=r[a+2],b=r[a+3];if(d!==b||c!==u||l!==p||h!==g){let m=c*u+l*p+h*g+d*b;m<0&&(u=-u,p=-p,g=-g,b=-b,m=-m);let f=1-o;if(m<.9995){const y=Math.acos(m),A=Math.sin(y);f=Math.sin(f*y)/A,o=Math.sin(o*y)/A,c=c*f+u*o,l=l*f+p*o,h=h*f+g*o,d=d*f+b*o}else{c=c*f+u*o,l=l*f+p*o,h=h*f+g*o,d=d*f+b*o;const y=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=y,l*=y,h*=y,d*=y}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*d+c*p-l*u,t[e+1]=c*g+h*u+l*d-o*p,t[e+2]=l*g+h*p+o*u-c*d,t[e+3]=h*g-o*d-c*u-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),d=o(r/2),u=c(n/2),p=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"YXZ":this._x=u*h*d+l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"ZXY":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d-u*p*g;break;case"ZYX":this._x=u*h*d-l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d+u*p*g;break;case"YZX":this._x=u*h*d+l*p*g,this._y=l*p*d+u*h*g,this._z=l*h*g-u*p*d,this._w=l*h*d-u*p*g;break;case"XZY":this._x=u*h*d-l*p*g,this._y=l*p*d-u*h*g,this._z=l*h*g+u*p*d,this._w=l*h*d+u*p*g;break;default:Ot("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(a-i)*p}else if(n>o&&n>d){const p=2*Math.sqrt(1+n-o-d);this._w=(h-c)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(r+l)/p}else if(o>d){const p=2*Math.sqrt(1+o-n-d);this._w=(r-l)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(c+h)/p}else{const p=2*Math.sqrt(1+d-n-o);this._w=(a-i)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Qt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+a*o+i*l-r*c,this._y=i*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let c=1-e;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,e=Math.sin(e*l)/h,this._x=this._x*c+n*e,this._y=this._y*c+i*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this._onChangeCallback()}else this._x=this._x*c+n*e,this._y=this._y*c+i*e,this._z=this._z*c+r*e,this._w=this._w*c+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const yl=class yl{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Bl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Bl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*i-o*n),h=2*(o*e-r*i),d=2*(r*n-a*e);return this.x=e+c*l+a*d-o*h,this.y=n+c*h+o*l-r*d,this.z=i+c*d+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return oa.copy(this).projectOnVector(t),this.sub(oa)}reflect(t){return this.sub(oa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Qt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};yl.prototype.isVector3=!0;let D=yl;const oa=new D,Bl=new tn,Sl=class Sl{constructor(t,e,n,i,r,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,c,l)}set(t,e,n,i,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],p=n[5],g=n[8],b=i[0],m=i[3],f=i[6],y=i[1],A=i[4],M=i[7],C=i[2],T=i[5],P=i[8];return r[0]=a*b+o*y+c*C,r[3]=a*m+o*A+c*T,r[6]=a*f+o*M+c*P,r[1]=l*b+h*y+d*C,r[4]=l*m+h*A+d*T,r[7]=l*f+h*M+d*P,r[2]=u*b+p*y+g*C,r[5]=u*m+p*A+g*T,r[8]=u*f+p*M+g*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return e*a*h-e*o*l-n*r*h+n*o*c+i*r*l-i*a*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=h*a-o*l,u=o*c-h*r,p=l*r-a*c,g=e*d+n*u+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/g;return t[0]=d*b,t[1]=(i*l-h*n)*b,t[2]=(o*n-i*a)*b,t[3]=u*b,t[4]=(h*e-i*c)*b,t[5]=(i*r-o*e)*b,t[6]=p*b,t[7]=(n*c-l*e)*b,t[8]=(a*e-n*r)*b,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-i*l,i*c,-i*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return ds("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(la.makeScale(t,e)),this}rotate(t){return ds("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(la.makeRotation(-t)),this}translate(t,e){return ds("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(la.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Sl.prototype.isMatrix3=!0;let kt=Sl;const la=new kt,zl=new kt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),kl=new kt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ad(){const s={enabled:!0,workingColorSpace:Yr,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ue&&(i.r=ti(i.r),i.g=ti(i.g),i.b=ti(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ue&&(i.r=fs(i.r),i.g=fs(i.g),i.b=fs(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===yi?Kr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return ds("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return ds("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Yr]:{primaries:t,whitePoint:n,transfer:Kr,toXYZ:zl,fromXYZ:kl,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Ze},outputColorSpaceConfig:{drawingBufferColorSpace:Ze}},[Ze]:{primaries:t,whitePoint:n,transfer:ue,toXYZ:zl,fromXYZ:kl,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Ze}}}),s}const Jt=ad();function ti(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function fs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Wi;class od{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{Wi===void 0&&(Wi=Zr("canvas")),Wi.width=t.width,Wi.height=t.height;const i=Wi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=Wi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=Zr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=ti(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ti(e[n]/255)*255):e[n]=ti(e[n]);return{data:e,width:t.width,height:t.height}}else return Ot("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ld=0;class dl{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=Vs(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(ca(i[a].image)):r.push(ca(i[a]))}else r=ca(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function ca(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?od.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ot("Texture: Unable to serialize Texture."),{})}let cd=0;const ha=new D;class Je extends Bi{constructor(t=Je.DEFAULT_IMAGE,e=Je.DEFAULT_MAPPING,n=Jn,i=Jn,r=$e,a=Ui,o=Rn,c=pn,l=Je.DEFAULT_ANISOTROPY,h=yi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cd++}),this.uuid=Vs(),this.name="",this.source=new dl(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Xt(0,0),this.repeat=new Xt(1,1),this.center=new Xt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(ha).x}get height(){return this.source.getSize(ha).y}get depth(){return this.source.getSize(ha).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Ot(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Ot(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==vh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case fo:t.x=t.x-Math.floor(t.x);break;case Jn:t.x=t.x<0?0:1;break;case po:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case fo:t.y=t.y-Math.floor(t.y);break;case Jn:t.y=t.y<0?0:1;break;case po:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Je.DEFAULT_IMAGE=null;Je.DEFAULT_MAPPING=vh;Je.DEFAULT_ANISOTROPY=1;const bl=class bl{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],p=c[5],g=c[9],b=c[2],m=c[6],f=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-b)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+b)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const A=(l+1)/2,M=(p+1)/2,C=(f+1)/2,T=(h+u)/4,P=(d+b)/4,x=(g+m)/4;return A>M&&A>C?A<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(A),i=T/n,r=P/n):M>C?M<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(M),n=T/i,r=x/i):C<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(C),n=P/r,i=x/r),this.set(n,i,r,e),this}let y=Math.sqrt((m-g)*(m-g)+(d-b)*(d-b)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-b)/y,this.z=(u-h)/y,this.w=Math.acos((l+p+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Qt(this.x,t.x,e.x),this.y=Qt(this.y,t.y,e.y),this.z=Qt(this.z,t.z,e.z),this.w=Qt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Qt(this.x,t,e),this.y=Qt(this.y,t,e),this.z=Qt(this.z,t,e),this.w=Qt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Qt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};bl.prototype.isVector4=!0;let we=bl;class hd extends Bi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$e,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new we(0,0,t,e),this.scissorTest=!1,this.viewport=new we(0,0,t,e),this.textures=[];const i={width:t,height:e,depth:n.depth},r=new Je(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:$e,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new dl(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Gn extends hd{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Ah extends Je{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class ud extends Je{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Xe,this.minFilter=Xe,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const $r=class $r{constructor(t,e,n,i,r,a,o,c,l,h,d,u,p,g,b,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,c,l,h,d,u,p,g,b,m)}set(t,e,n,i,r,a,o,c,l,h,d,u,p,g,b,m){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=i,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=h,f[10]=d,f[14]=u,f[3]=p,f[7]=g,f[11]=b,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $r().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,i=1/Xi.setFromMatrixColumn(t,0).length(),r=1/Xi.setFromMatrixColumn(t,1).length(),a=1/Xi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,p=a*d,g=o*h,b=o*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=p+g*l,e[5]=u-b*l,e[9]=-o*c,e[2]=b-u*l,e[6]=g+p*l,e[10]=a*c}else if(t.order==="YXZ"){const u=c*h,p=c*d,g=l*h,b=l*d;e[0]=u+b*o,e[4]=g*o-p,e[8]=a*l,e[1]=a*d,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=b+u*o,e[10]=a*c}else if(t.order==="ZXY"){const u=c*h,p=c*d,g=l*h,b=l*d;e[0]=u-b*o,e[4]=-a*d,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=b-u*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const u=a*h,p=a*d,g=o*h,b=o*d;e[0]=c*h,e[4]=g*l-p,e[8]=u*l+b,e[1]=c*d,e[5]=b*l+u,e[9]=p*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const u=a*c,p=a*l,g=o*c,b=o*l;e[0]=c*h,e[4]=b-u*d,e[8]=g*d+p,e[1]=d,e[5]=a*h,e[9]=-o*h,e[2]=-l*h,e[6]=p*d+g,e[10]=u-b*d}else if(t.order==="XZY"){const u=a*c,p=a*l,g=o*c,b=o*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+b,e[5]=a*h,e[9]=p*d-g,e[2]=g*d-p,e[6]=o*h,e[10]=b*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(dd,t,fd)}lookAt(t,e,n){const i=this.elements;return dn.subVectors(t,e),dn.lengthSq()===0&&(dn.z=1),dn.normalize(),hi.crossVectors(n,dn),hi.lengthSq()===0&&(Math.abs(n.z)===1?dn.x+=1e-4:dn.z+=1e-4,dn.normalize(),hi.crossVectors(n,dn)),hi.normalize(),Ys.crossVectors(dn,hi),i[0]=hi.x,i[4]=Ys.x,i[8]=dn.x,i[1]=hi.y,i[5]=Ys.y,i[9]=dn.y,i[2]=hi.z,i[6]=Ys.z,i[10]=dn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],p=n[13],g=n[2],b=n[6],m=n[10],f=n[14],y=n[3],A=n[7],M=n[11],C=n[15],T=i[0],P=i[4],x=i[8],v=i[12],E=i[1],w=i[5],L=i[9],B=i[13],W=i[2],N=i[6],X=i[10],G=i[14],J=i[3],j=i[7],lt=i[11],dt=i[15];return r[0]=a*T+o*E+c*W+l*J,r[4]=a*P+o*w+c*N+l*j,r[8]=a*x+o*L+c*X+l*lt,r[12]=a*v+o*B+c*G+l*dt,r[1]=h*T+d*E+u*W+p*J,r[5]=h*P+d*w+u*N+p*j,r[9]=h*x+d*L+u*X+p*lt,r[13]=h*v+d*B+u*G+p*dt,r[2]=g*T+b*E+m*W+f*J,r[6]=g*P+b*w+m*N+f*j,r[10]=g*x+b*L+m*X+f*lt,r[14]=g*v+b*B+m*G+f*dt,r[3]=y*T+A*E+M*W+C*J,r[7]=y*P+A*w+M*N+C*j,r[11]=y*x+A*L+M*X+C*lt,r[15]=y*v+A*B+M*G+C*dt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],p=t[14],g=t[3],b=t[7],m=t[11],f=t[15],y=c*p-l*u,A=o*p-l*d,M=o*u-c*d,C=a*p-l*h,T=a*u-c*h,P=a*d-o*h;return e*(b*y-m*A+f*M)-n*(g*y-m*C+f*T)+i*(g*A-b*C+f*P)-r*(g*M-b*T+m*P)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],a=t[5],o=t[9],c=t[2],l=t[6],h=t[10];return e*(a*h-o*l)-n*(r*h-o*c)+i*(r*l-a*c)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],p=t[11],g=t[12],b=t[13],m=t[14],f=t[15],y=e*o-n*a,A=e*c-i*a,M=e*l-r*a,C=n*c-i*o,T=n*l-r*o,P=i*l-r*c,x=h*b-d*g,v=h*m-u*g,E=h*f-p*g,w=d*m-u*b,L=d*f-p*b,B=u*f-p*m,W=y*B-A*L+M*w+C*E-T*v+P*x;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const N=1/W;return t[0]=(o*B-c*L+l*w)*N,t[1]=(i*L-n*B-r*w)*N,t[2]=(b*P-m*T+f*C)*N,t[3]=(u*T-d*P-p*C)*N,t[4]=(c*E-a*B-l*v)*N,t[5]=(e*B-i*E+r*v)*N,t[6]=(m*M-g*P-f*A)*N,t[7]=(h*P-u*M+p*A)*N,t[8]=(a*L-o*E+l*x)*N,t[9]=(n*E-e*L-r*x)*N,t[10]=(g*T-b*M+f*y)*N,t[11]=(d*M-h*T-p*y)*N,t[12]=(o*v-a*w-c*x)*N,t[13]=(e*w-n*v+i*x)*N,t[14]=(b*A-g*C-m*y)*N,t[15]=(h*C-d*A+u*y)*N,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,h=a+a,d=o+o,u=r*l,p=r*h,g=r*d,b=a*h,m=a*d,f=o*d,y=c*l,A=c*h,M=c*d,C=n.x,T=n.y,P=n.z;return i[0]=(1-(b+f))*C,i[1]=(p+M)*C,i[2]=(g-A)*C,i[3]=0,i[4]=(p-M)*T,i[5]=(1-(u+f))*T,i[6]=(m+y)*T,i[7]=0,i[8]=(g+A)*P,i[9]=(m-y)*P,i[10]=(1-(u+b))*P,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Xi.set(i[0],i[1],i[2]).length();const o=Xi.set(i[4],i[5],i[6]).length(),c=Xi.set(i[8],i[9],i[10]).length();r<0&&(a=-a),yn.copy(this);const l=1/a,h=1/o,d=1/c;return yn.elements[0]*=l,yn.elements[1]*=l,yn.elements[2]*=l,yn.elements[4]*=h,yn.elements[5]*=h,yn.elements[6]*=h,yn.elements[8]*=d,yn.elements[9]*=d,yn.elements[10]*=d,e.setFromRotationMatrix(yn),n.x=a,n.y=o,n.z=c,this}makePerspective(t,e,n,i,r,a,o=kn,c=!1){const l=this.elements,h=2*r/(e-t),d=2*r/(n-i),u=(e+t)/(e-t),p=(n+i)/(n-i);let g,b;if(c)g=r/(a-r),b=a*r/(a-r);else if(o===kn)g=-(a+r)/(a-r),b=-2*a*r/(a-r);else if(o===Hs)g=-a/(a-r),b=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=p,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=b,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=kn,c=!1){const l=this.elements,h=2/(e-t),d=2/(n-i),u=-(e+t)/(e-t),p=-(n+i)/(n-i);let g,b;if(c)g=1/(a-r),b=a/(a-r);else if(o===kn)g=-2/(a-r),b=-(a+r)/(a-r);else if(o===Hs)g=-1/(a-r),b=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=p,l[2]=0,l[6]=0,l[10]=g,l[14]=b,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};$r.prototype.isMatrix4=!0;let qt=$r;const Xi=new D,yn=new qt,dd=new D(0,0,0),fd=new D(1,1,1),hi=new D,Ys=new D,dn=new D,Hl=new qt,Gl=new tn;class Ei{constructor(t=0,e=0,n=0,i=Ei.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],d=i[2],u=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Qt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ot("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Hl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Hl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Gl.setFromEuler(this),this.setFromQuaternion(Gl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ei.DEFAULT_ORDER="XYZ";class Ch{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let pd=0;const Vl=new D,qi=new tn,Xn=new qt,Ks=new D,Es=new D,md=new D,gd=new tn,Wl=new D(1,0,0),Xl=new D(0,1,0),ql=new D(0,0,1),Yl={type:"added"},_d={type:"removed"},Yi={type:"childadded",child:null},ua={type:"childremoved",child:null};class Ve extends Bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:pd++}),this.uuid=Vs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ve.DEFAULT_UP.clone();const t=new D,e=new Ei,n=new tn,i=new D(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new qt},normalMatrix:{value:new kt}}),this.matrix=new qt,this.matrixWorld=new qt,this.matrixAutoUpdate=Ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ch,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.multiply(qi),this}rotateOnWorldAxis(t,e){return qi.setFromAxisAngle(t,e),this.quaternion.premultiply(qi),this}rotateX(t){return this.rotateOnAxis(Wl,t)}rotateY(t){return this.rotateOnAxis(Xl,t)}rotateZ(t){return this.rotateOnAxis(ql,t)}translateOnAxis(t,e){return Vl.copy(t).applyQuaternion(this.quaternion),this.position.add(Vl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Wl,t)}translateY(t){return this.translateOnAxis(Xl,t)}translateZ(t){return this.translateOnAxis(ql,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Xn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ks.copy(t):Ks.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Xn.lookAt(Es,Ks,this.up):Xn.lookAt(Ks,Es,this.up),this.quaternion.setFromRotationMatrix(Xn),i&&(Xn.extractRotation(i.matrixWorld),qi.setFromRotationMatrix(Xn),this.quaternion.premultiply(qi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(se("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Yl),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null):se("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(_d),ua.child=t,this.dispatchEvent(ua),ua.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Xn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Xn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Xn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Yl),Yi.child=t,this.dispatchEvent(Yi),Yi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Es,t,md),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Es,gd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),this.static!==!1&&(i.static=this.static),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ve.DEFAULT_UP=new D(0,1,0);Ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class vn extends Ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const xd={type:"move"};class da{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const b of t.hand.values()){const m=e.getJointPose(b,n),f=this._getHandJoint(l,b);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),p=.02,g=.005;l.inputState.pinching&&u>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(xd)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new vn;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Rh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},Zs={h:0,s:0,l:0};function fa(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class wt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Jt.workingColorSpace){if(t=rd(t,1),e=Qt(e,0,1),n=Qt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=fa(a,r,t+1/3),this.g=fa(a,r,t),this.b=fa(a,r,t-1/3)}return Jt.colorSpaceToWorking(this,i),this}setStyle(t,e=Ze){function n(r){r!==void 0&&parseFloat(r)<1&&Ot("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ot("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ot("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ze){const n=Rh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ot("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ti(t.r),this.g=ti(t.g),this.b=ti(t.b),this}copyLinearToSRGB(t){return this.r=fs(t.r),this.g=fs(t.g),this.b=fs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return Jt.workingToColorSpace(Ke.copy(this),t),Math.round(Qt(Ke.r*255,0,255))*65536+Math.round(Qt(Ke.g*255,0,255))*256+Math.round(Qt(Ke.b*255,0,255))}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace(Ke.copy(this),e);const n=Ke.r,i=Ke.g,r=Ke.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(i-r)/d+(i<r?6:0);break;case i:c=(r-n)/d+2;break;case r:c=(n-i)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace(Ke.copy(this),e),t.r=Ke.r,t.g=Ke.g,t.b=Ke.b,t}getStyle(t=Ze){Jt.workingToColorSpace(Ke.copy(this),t);const e=Ke.r,n=Ke.g,i=Ke.b;return t!==Ze?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(ui),this.setHSL(ui.h+t,ui.s+e,ui.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(ui),t.getHSL(Zs);const n=aa(ui.h,Zs.h,e),i=aa(ui.s,Zs.s,e),r=aa(ui.l,Zs.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ke=new wt;wt.NAMES=Rh;class fl{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new wt(t),this.density=e}clone(){return new fl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class vd extends Ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ei,this.environmentIntensity=1,this.environmentRotation=new Ei,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}const Sn=new D,qn=new D,pa=new D,Yn=new D,Ki=new D,Zi=new D,Kl=new D,ma=new D,ga=new D,_a=new D,xa=new we,va=new we,Ma=new we;class An{constructor(t=new D,e=new D,n=new D){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),Sn.subVectors(t,e),i.cross(Sn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){Sn.subVectors(i,e),qn.subVectors(n,e),pa.subVectors(t,e);const a=Sn.dot(Sn),o=Sn.dot(qn),c=Sn.dot(pa),l=qn.dot(qn),h=qn.dot(pa),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,p=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Yn)===null?!1:Yn.x>=0&&Yn.y>=0&&Yn.x+Yn.y<=1}static getInterpolation(t,e,n,i,r,a,o,c){return this.getBarycoord(t,e,n,i,Yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Yn.x),c.addScaledVector(a,Yn.y),c.addScaledVector(o,Yn.z),c)}static getInterpolatedAttribute(t,e,n,i,r,a){return xa.setScalar(0),va.setScalar(0),Ma.setScalar(0),xa.fromBufferAttribute(t,e),va.fromBufferAttribute(t,n),Ma.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(xa,r.x),a.addScaledVector(va,r.y),a.addScaledVector(Ma,r.z),a}static isFrontFacing(t,e,n,i){return Sn.subVectors(n,e),qn.subVectors(t,e),Sn.cross(qn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Sn.subVectors(this.c,this.b),qn.subVectors(this.a,this.b),Sn.cross(qn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return An.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return An.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return An.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return An.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return An.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;Ki.subVectors(i,n),Zi.subVectors(r,n),ma.subVectors(t,n);const c=Ki.dot(ma),l=Zi.dot(ma);if(c<=0&&l<=0)return e.copy(n);ga.subVectors(t,i);const h=Ki.dot(ga),d=Zi.dot(ga);if(h>=0&&d<=h)return e.copy(i);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),e.copy(n).addScaledVector(Ki,a);_a.subVectors(t,r);const p=Ki.dot(_a),g=Zi.dot(_a);if(g>=0&&p<=g)return e.copy(r);const b=p*l-c*g;if(b<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Zi,o);const m=h*g-p*d;if(m<=0&&d-h>=0&&p-g>=0)return Kl.subVectors(r,i),o=(d-h)/(d-h+(p-g)),e.copy(i).addScaledVector(Kl,o);const f=1/(m+b+u);return a=b*f,o=u*f,e.copy(n).addScaledVector(Ki,a).addScaledVector(Zi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class zi{constructor(t=new D(1/0,1/0,1/0),e=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(bn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(bn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=bn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,bn):bn.fromBufferAttribute(r,a),bn.applyMatrix4(t.matrixWorld),this.expandByPoint(bn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$s.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$s.copy(n.boundingBox)),$s.applyMatrix4(t.matrixWorld),this.union($s)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,bn),bn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ws),Js.subVectors(this.max,ws),$i.subVectors(t.a,ws),Ji.subVectors(t.b,ws),Qi.subVectors(t.c,ws),di.subVectors(Ji,$i),fi.subVectors(Qi,Ji),Ti.subVectors($i,Qi);let e=[0,-di.z,di.y,0,-fi.z,fi.y,0,-Ti.z,Ti.y,di.z,0,-di.x,fi.z,0,-fi.x,Ti.z,0,-Ti.x,-di.y,di.x,0,-fi.y,fi.x,0,-Ti.y,Ti.x,0];return!ya(e,$i,Ji,Qi,Js)||(e=[1,0,0,0,1,0,0,0,1],!ya(e,$i,Ji,Qi,Js))?!1:(Qs.crossVectors(di,fi),e=[Qs.x,Qs.y,Qs.z],ya(e,$i,Ji,Qi,Js))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,bn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(bn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Kn=[new D,new D,new D,new D,new D,new D,new D,new D],bn=new D,$s=new zi,$i=new D,Ji=new D,Qi=new D,di=new D,fi=new D,Ti=new D,ws=new D,Js=new D,Qs=new D,Ai=new D;function ya(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){Ai.fromArray(s,r);const o=i.x*Math.abs(Ai.x)+i.y*Math.abs(Ai.y)+i.z*Math.abs(Ai.z),c=t.dot(Ai),l=e.dot(Ai),h=n.dot(Ai);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Fe=new D,js=new Xt;let Md=0;class Mn extends Bi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Md++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ul,this.updateRanges=[],this.gpuType=Cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)js.fromBufferAttribute(this,e),js.applyMatrix3(t),this.setXY(e,js.x,js.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=bs(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=sn(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=bs(e,this.array)),e}setX(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=bs(e,this.array)),e}setY(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=bs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=bs(e,this.array)),e}setW(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),n=sn(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),n=sn(n,this.array),i=sn(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),n=sn(n,this.array),i=sn(i,this.array),r=sn(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ul&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class Ph extends Mn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Lh extends Mn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ne extends Mn{constructor(t,e,n){super(new Float32Array(t),e,n)}}const yd=new zi,Ts=new D,Sa=new D;class xs{constructor(t=new D,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):yd.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ts.subVectors(t,this.center);const e=Ts.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ts,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Sa.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ts.copy(t.center).add(Sa)),this.expandByPoint(Ts.copy(t.center).sub(Sa))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let Sd=0;const gn=new qt,ba=new Ve,ji=new D,fn=new zi,As=new zi,Ge=new D;class en extends Bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=Vs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(ed(t)?Lh:Ph)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return gn.makeRotationFromQuaternion(t),this.applyMatrix4(gn),this}rotateX(t){return gn.makeRotationX(t),this.applyMatrix4(gn),this}rotateY(t){return gn.makeRotationY(t),this.applyMatrix4(gn),this}rotateZ(t){return gn.makeRotationZ(t),this.applyMatrix4(gn),this}translate(t,e,n){return gn.makeTranslation(t,e,n),this.applyMatrix4(gn),this}scale(t,e,n){return gn.makeScale(t,e,n),this.applyMatrix4(gn),this}lookAt(t){return ba.lookAt(t),ba.updateMatrix(),this.applyMatrix4(ba.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ji).negate(),this.translate(ji.x,ji.y,ji.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ne(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Ot("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new zi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ge.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Ge),Ge.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Ge)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&se('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){se("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const n=this.boundingSphere.center;if(fn.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];As.setFromBufferAttribute(o),this.morphTargetsRelative?(Ge.addVectors(fn.min,As.min),fn.expandByPoint(Ge),Ge.addVectors(fn.max,As.max),fn.expandByPoint(Ge)):(fn.expandByPoint(As.min),fn.expandByPoint(As.max))}fn.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Ge.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ge));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ge.fromBufferAttribute(o,l),c&&(ji.fromBufferAttribute(t,l),Ge.add(ji)),i=Math.max(i,n.distanceToSquared(Ge))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&se('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){se("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Mn(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new D,c[x]=new D;const l=new D,h=new D,d=new D,u=new Xt,p=new Xt,g=new Xt,b=new D,m=new D;function f(x,v,E){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,v),d.fromBufferAttribute(n,E),u.fromBufferAttribute(r,x),p.fromBufferAttribute(r,v),g.fromBufferAttribute(r,E),h.sub(l),d.sub(l),p.sub(u),g.sub(u);const w=1/(p.x*g.y-g.x*p.y);isFinite(w)&&(b.copy(h).multiplyScalar(g.y).addScaledVector(d,-p.y).multiplyScalar(w),m.copy(d).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(w),o[x].add(b),o[v].add(b),o[E].add(b),c[x].add(m),c[v].add(m),c[E].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let x=0,v=y.length;x<v;++x){const E=y[x],w=E.start,L=E.count;for(let B=w,W=w+L;B<W;B+=3)f(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const A=new D,M=new D,C=new D,T=new D;function P(x){C.fromBufferAttribute(i,x),T.copy(C);const v=o[x];A.copy(v),A.sub(C.multiplyScalar(C.dot(v))).normalize(),M.crossVectors(T,v);const w=M.dot(c[x])<0?-1:1;a.setXYZW(x,A.x,A.y,A.z,w)}for(let x=0,v=y.length;x<v;++x){const E=y[x],w=E.start,L=E.count;for(let B=w,W=w+L;B<W;B+=3)P(t.getX(B+0)),P(t.getX(B+1)),P(t.getX(B+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Mn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const i=new D,r=new D,a=new D,o=new D,c=new D,l=new D,h=new D,d=new D;if(t)for(let u=0,p=t.count;u<p;u+=3){const g=t.getX(u+0),b=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,b),a.fromBufferAttribute(e,m),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,b),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(b,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,p=e.count;u<p;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ge.fromBufferAttribute(t,e),Ge.normalize(),t.setXYZ(e,Ge.x,Ge.y,Ge.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let p=0,g=0;for(let b=0,m=c.length;b<m;b++){o.isInterleavedBufferAttribute?p=c[b]*o.data.stride+o.offset:p=c[b]*h;for(let f=0;f<h;f++)u[g++]=l[p++]}return new Mn(u,h,d)}if(this.index===null)return Ot("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new en,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],p=t(u,n);c.push(p)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const p=l[d];h.push(p.toJSON(t.data))}h.length>0&&(i[c]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,p=d.length;u<p;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let bd=0;class vs extends Bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bd++}),this.uuid=Vs(),this.name="",this.type="Material",this.blending=jn,this.side=bi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=so,this.blendDst=ro,this.blendEquation=Ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new wt(0,0,0),this.blendAlpha=0,this.depthFunc=ps,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Vi,this.stencilZFail=Vi,this.stencilZPass=Vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Ot(`Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Ot(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==jn&&(n.blending=this.blending),this.side!==bi&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==so&&(n.blendSrc=this.blendSrc),this.blendDst!==ro&&(n.blendDst=this.blendDst),this.blendEquation!==Ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ps&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new wt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Xt().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Xt().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Zn=new D,Ea=new D,tr=new D,pi=new D,wa=new D,er=new D,Ta=new D;class Ih{constructor(t=new D,e=new D(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Zn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Zn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Zn.copy(this.origin).addScaledVector(this.direction,e),Zn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ea.copy(t).add(e).multiplyScalar(.5),tr.copy(e).sub(t).normalize(),pi.copy(this.origin).sub(Ea);const r=t.distanceTo(e)*.5,a=-this.direction.dot(tr),o=pi.dot(this.direction),c=-pi.dot(tr),l=pi.lengthSq(),h=Math.abs(1-a*a);let d,u,p,g;if(h>0)if(d=a*c-o,u=a*o-c,g=r*h,d>=0)if(u>=-g)if(u<=g){const b=1/h;d*=b,u*=b,p=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),p=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),p=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),p=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Ea).addScaledVector(tr,u),p}intersectSphere(t,e){Zn.subVectors(t.center,this.origin);const n=Zn.dot(this.direction),i=Zn.dot(Zn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),d>=0?(o=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Zn)!==null}intersectTriangle(t,e,n,i,r){wa.subVectors(e,t),er.subVectors(n,t),Ta.crossVectors(wa,er);let a=this.direction.dot(Ta),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;pi.subVectors(this.origin,t);const c=o*this.direction.dot(er.crossVectors(pi,er));if(c<0)return null;const l=o*this.direction.dot(wa.cross(pi));if(l<0||c+l>a)return null;const h=-o*pi.dot(Ta);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class _e extends vs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=nl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Zl=new qt,Ci=new Ih,nr=new xs,$l=new D,ir=new D,sr=new D,rr=new D,Aa=new D,ar=new D,Jl=new D,or=new D;class oe extends Ve{constructor(t=new en,e=new _e){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){ar.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(Aa.fromBufferAttribute(d,t),a?ar.addScaledVector(Aa,h):ar.addScaledVector(Aa.sub(e),h))}e.add(ar)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),nr.copy(n.boundingSphere),nr.applyMatrix4(r),Ci.copy(t.ray).recast(t.near),!(nr.containsPoint(Ci.origin)===!1&&(Ci.intersectSphere(nr,$l)===null||Ci.origin.distanceToSquared($l)>(t.far-t.near)**2))&&(Zl.copy(r).invert(),Ci.copy(t.ray).applyMatrix4(Zl),!(n.boundingBox!==null&&Ci.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Ci)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,b=u.length;g<b;g++){const m=u[g],f=a[m.materialIndex],y=Math.max(m.start,p.start),A=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,C=A;M<C;M+=3){const T=o.getX(M),P=o.getX(M+1),x=o.getX(M+2);i=lr(this,f,t,n,l,h,d,T,P,x),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),b=Math.min(o.count,p.start+p.count);for(let m=g,f=b;m<f;m+=3){const y=o.getX(m),A=o.getX(m+1),M=o.getX(m+2);i=lr(this,a,t,n,l,h,d,y,A,M),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,b=u.length;g<b;g++){const m=u[g],f=a[m.materialIndex],y=Math.max(m.start,p.start),A=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,C=A;M<C;M+=3){const T=M,P=M+1,x=M+2;i=lr(this,f,t,n,l,h,d,T,P,x),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),b=Math.min(c.count,p.start+p.count);for(let m=g,f=b;m<f;m+=3){const y=m,A=m+1,M=m+2;i=lr(this,a,t,n,l,h,d,y,A,M),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Ed(s,t,e,n,i,r,a,o){let c;if(t.side===on?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,t.side===bi,o),c===null)return null;or.copy(o),or.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(or);return l<e.near||l>e.far?null:{distance:l,point:or.clone(),object:s}}function lr(s,t,e,n,i,r,a,o,c,l){s.getVertexPosition(o,ir),s.getVertexPosition(c,sr),s.getVertexPosition(l,rr);const h=Ed(s,t,e,n,ir,sr,rr,Jl);if(h){const d=new D;An.getBarycoord(Jl,ir,sr,rr,d),i&&(h.uv=An.getInterpolatedAttribute(i,o,c,l,d,new Xt)),r&&(h.uv1=An.getInterpolatedAttribute(r,o,c,l,d,new Xt)),a&&(h.normal=An.getInterpolatedAttribute(a,o,c,l,d,new D),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new D,materialIndex:0};An.getNormal(ir,sr,rr,u.normal),h.face=u,h.barycoord=d}return h}class Dh extends Je{constructor(t=null,e=1,n=1,i,r,a,o,c,l=Xe,h=Xe,d,u){super(null,a,o,c,l,h,i,r,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ql extends Mn{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const ts=new qt,jl=new qt,cr=[],tc=new zi,wd=new qt,Cs=new oe,Rs=new xs;class ne extends oe{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ql(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,wd)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new zi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ts),tc.copy(t.boundingBox).applyMatrix4(ts),this.boundingBox.union(tc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new xs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,ts),Rs.copy(t.boundingSphere).applyMatrix4(ts),this.boundingSphere.union(Rs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Cs.geometry=this.geometry,Cs.material=this.material,Cs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Rs.copy(this.boundingSphere),Rs.applyMatrix4(n),t.ray.intersectsSphere(Rs)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,ts),jl.multiplyMatrices(n,ts),Cs.matrixWorld=jl,Cs.raycast(t,cr);for(let a=0,o=cr.length;a<o;a++){const c=cr[a];c.instanceId=r,c.object=this,e.push(c)}cr.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new Ql(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Dh(new Float32Array(i*this.count),i,this.count,al,Cn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*t;return r[c]=o,r.set(n,c+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ca=new D,Td=new D,Ad=new kt;class Li{constructor(t=new D(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Ca.subVectors(n,e).cross(Td.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const i=t.delta(Ca),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Ad.getNormalMatrix(t),i=this.coplanarPoint(Ca).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ri=new xs,Cd=new Xt(.5,.5),hr=new D;class pl{constructor(t=new Li,e=new Li,n=new Li,i=new Li,r=new Li,a=new Li){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=kn,n=!1){const i=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],p=r[7],g=r[8],b=r[9],m=r[10],f=r[11],y=r[12],A=r[13],M=r[14],C=r[15];if(i[0].setComponents(l-a,p-h,f-g,C-y).normalize(),i[1].setComponents(l+a,p+h,f+g,C+y).normalize(),i[2].setComponents(l+o,p+d,f+b,C+A).normalize(),i[3].setComponents(l-o,p-d,f-b,C-A).normalize(),n)i[4].setComponents(c,u,m,M).normalize(),i[5].setComponents(l-c,p-u,f-m,C-M).normalize();else if(i[4].setComponents(l-c,p-u,f-m,C-M).normalize(),e===kn)i[5].setComponents(l+c,p+u,f+m,C+M).normalize();else if(e===Hs)i[5].setComponents(c,u,m,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ri.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ri.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ri)}intersectsSprite(t){Ri.center.set(0,0,0);const e=Cd.distanceTo(t.center);return Ri.radius=.7071067811865476+e,Ri.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ri)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(hr.x=i.normal.x>0?t.max.x:t.min.x,hr.y=i.normal.y>0?t.max.y:t.min.y,hr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(hr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Uh extends vs{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new wt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const ec=new qt,Yo=new Ih,ur=new xs,dr=new D;class Rd extends Ve{constructor(t=new en,e=new Uh){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ur.copy(n.boundingSphere),ur.applyMatrix4(i),ur.radius+=r,t.ray.intersectsSphere(ur)===!1)return;ec.copy(i).invert(),Yo.copy(t.ray).applyMatrix4(ec);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,a.start),p=Math.min(l.count,a.start+a.count);for(let g=u,b=p;g<b;g++){const m=l.getX(g);dr.fromBufferAttribute(d,m),nc(dr,m,c,i,t,e,this)}}else{const u=Math.max(0,a.start),p=Math.min(d.count,a.start+a.count);for(let g=u,b=p;g<b;g++)dr.fromBufferAttribute(d,g),nc(dr,g,c,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function nc(s,t,e,n,i,r,a){const o=Yo.distanceSqToPoint(s);if(o<e){const c=new D;Yo.closestPointToPoint(s,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Nh extends Je{constructor(t=[],e=Fi,n,i,r,a,o,c,l,h){super(t,e,n,i,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Ms extends Je{constructor(t,e,n,i,r,a,o,c,l){super(t,e,n,i,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class gs extends Je{constructor(t,e,n=Vn,i,r,a,o=Xe,c=Xe,l,h=si,d=1){if(h!==si&&h!==Ni)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:d};super(u,i,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new dl(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Pd extends gs{constructor(t,e=Vn,n=Fi,i,r,a=Xe,o=Xe,c,l=si){const h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,e,n,i,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Fh extends Je{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class In extends en{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Ne(l,3)),this.setAttribute("normal",new Ne(h,3)),this.setAttribute("uv",new Ne(d,2));function g(b,m,f,y,A,M,C,T,P,x,v){const E=M/P,w=C/x,L=M/2,B=C/2,W=T/2,N=P+1,X=x+1;let G=0,J=0;const j=new D;for(let lt=0;lt<X;lt++){const dt=lt*w-B;for(let xt=0;xt<N;xt++){const jt=xt*E-L;j[b]=jt*y,j[m]=dt*A,j[f]=W,l.push(j.x,j.y,j.z),j[b]=0,j[m]=0,j[f]=T>0?1:-1,h.push(j.x,j.y,j.z),d.push(xt/P),d.push(1-lt/x),G+=1}}for(let lt=0;lt<x;lt++)for(let dt=0;dt<P;dt++){const xt=u+dt+N*lt,jt=u+dt+N*(lt+1),xe=u+(dt+1)+N*(lt+1),Zt=u+(dt+1)+N*lt;c.push(xt,jt,Zt),c.push(jt,xe,Zt),J+=6}o.addGroup(p,J,v),p+=J,u+=G}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new In(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class ml extends en{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],c=[],l=new D,h=new Xt;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const p=n+d/e*i;l.x=t*Math.cos(p),l.y=t*Math.sin(p),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Ne(a,3)),this.setAttribute("normal",new Ne(o,3)),this.setAttribute("uv",new Ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ml(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class Gs extends en{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],u=[],p=[];let g=0;const b=[],m=n/2;let f=0;y(),a===!1&&(t>0&&A(!0),e>0&&A(!1)),this.setIndex(h),this.setAttribute("position",new Ne(d,3)),this.setAttribute("normal",new Ne(u,3)),this.setAttribute("uv",new Ne(p,2));function y(){const M=new D,C=new D;let T=0;const P=(e-t)/n;for(let x=0;x<=r;x++){const v=[],E=x/r,w=E*(e-t)+t;for(let L=0;L<=i;L++){const B=L/i,W=B*c+o,N=Math.sin(W),X=Math.cos(W);C.x=w*N,C.y=-E*n+m,C.z=w*X,d.push(C.x,C.y,C.z),M.set(N,P,X).normalize(),u.push(M.x,M.y,M.z),p.push(B,1-E),v.push(g++)}b.push(v)}for(let x=0;x<i;x++)for(let v=0;v<r;v++){const E=b[v][x],w=b[v+1][x],L=b[v+1][x+1],B=b[v][x+1];(t>0||v!==0)&&(h.push(E,w,B),T+=3),(e>0||v!==r-1)&&(h.push(w,L,B),T+=3)}l.addGroup(f,T,0),f+=T}function A(M){const C=g,T=new Xt,P=new D;let x=0;const v=M===!0?t:e,E=M===!0?1:-1;for(let L=1;L<=i;L++)d.push(0,m*E,0),u.push(0,E,0),p.push(.5,.5),g++;const w=g;for(let L=0;L<=i;L++){const W=L/i*c+o,N=Math.cos(W),X=Math.sin(W);P.x=v*X,P.y=m*E,P.z=v*N,d.push(P.x,P.y,P.z),u.push(0,E,0),T.x=N*.5+.5,T.y=X*.5*E+.5,p.push(T.x,T.y),g++}for(let L=0;L<i;L++){const B=C+L,W=w+L;M===!0?h.push(W,W+1,B):h.push(W+1,W,B),x+=3}l.addGroup(f,x,M===!0?1:2),f+=x}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Gs(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class $n extends Gs{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new $n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class gl extends en{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),l(n),h(),this.setAttribute("position",new Ne(r,3)),this.setAttribute("normal",new Ne(r.slice(),3)),this.setAttribute("uv",new Ne(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(y){const A=new D,M=new D,C=new D;for(let T=0;T<e.length;T+=3)p(e[T+0],A),p(e[T+1],M),p(e[T+2],C),c(A,M,C,y)}function c(y,A,M,C){const T=C+1,P=[];for(let x=0;x<=T;x++){P[x]=[];const v=y.clone().lerp(M,x/T),E=A.clone().lerp(M,x/T),w=T-x;for(let L=0;L<=w;L++)L===0&&x===T?P[x][L]=v:P[x][L]=v.clone().lerp(E,L/w)}for(let x=0;x<T;x++)for(let v=0;v<2*(T-x)-1;v++){const E=Math.floor(v/2);v%2===0?(u(P[x][E+1]),u(P[x+1][E]),u(P[x][E])):(u(P[x][E+1]),u(P[x+1][E+1]),u(P[x+1][E]))}}function l(y){const A=new D;for(let M=0;M<r.length;M+=3)A.x=r[M+0],A.y=r[M+1],A.z=r[M+2],A.normalize().multiplyScalar(y),r[M+0]=A.x,r[M+1]=A.y,r[M+2]=A.z}function h(){const y=new D;for(let A=0;A<r.length;A+=3){y.x=r[A+0],y.y=r[A+1],y.z=r[A+2];const M=m(y)/2/Math.PI+.5,C=f(y)/Math.PI+.5;a.push(M,1-C)}g(),d()}function d(){for(let y=0;y<a.length;y+=6){const A=a[y+0],M=a[y+2],C=a[y+4],T=Math.max(A,M,C),P=Math.min(A,M,C);T>.9&&P<.1&&(A<.2&&(a[y+0]+=1),M<.2&&(a[y+2]+=1),C<.2&&(a[y+4]+=1))}}function u(y){r.push(y.x,y.y,y.z)}function p(y,A){const M=y*3;A.x=t[M+0],A.y=t[M+1],A.z=t[M+2]}function g(){const y=new D,A=new D,M=new D,C=new D,T=new Xt,P=new Xt,x=new Xt;for(let v=0,E=0;v<r.length;v+=9,E+=6){y.set(r[v+0],r[v+1],r[v+2]),A.set(r[v+3],r[v+4],r[v+5]),M.set(r[v+6],r[v+7],r[v+8]),T.set(a[E+0],a[E+1]),P.set(a[E+2],a[E+3]),x.set(a[E+4],a[E+5]),C.copy(y).add(A).add(M).divideScalar(3);const w=m(C);b(T,E+0,y,w),b(P,E+2,A,w),b(x,E+4,M,w)}}function b(y,A,M,C){C<0&&y.x===1&&(a[A]=y.x-1),M.x===0&&M.z===0&&(a[A]=C/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function f(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gl(t.vertices,t.indices,t.radius,t.detail)}}class _l extends gl{constructor(t=1,e=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,t,e),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new _l(t.radius,t.detail)}}class Pn extends en{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,d=t/o,u=e/c,p=[],g=[],b=[],m=[];for(let f=0;f<h;f++){const y=f*u-a;for(let A=0;A<l;A++){const M=A*d-r;g.push(M,-y,0),b.push(0,0,1),m.push(A/o),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let y=0;y<o;y++){const A=y+l*f,M=y+l*(f+1),C=y+1+l*(f+1),T=y+1+l*f;p.push(A,M,T),p.push(M,C,T)}this.setIndex(p),this.setAttribute("position",new Ne(g,3)),this.setAttribute("normal",new Ne(b,3)),this.setAttribute("uv",new Ne(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pn(t.width,t.height,t.widthSegments,t.heightSegments)}}class xl extends en{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new D,u=new D,p=[],g=[],b=[],m=[];for(let f=0;f<=n;f++){const y=[],A=f/n,M=a+A*o,C=t*Math.cos(M),T=Math.sqrt(t*t-C*C);let P=0;f===0&&a===0?P=.5/e:f===n&&c===Math.PI&&(P=-.5/e);for(let x=0;x<=e;x++){const v=x/e,E=i+v*r;d.x=-T*Math.cos(E),d.y=C,d.z=T*Math.sin(E),g.push(d.x,d.y,d.z),u.copy(d).normalize(),b.push(u.x,u.y,u.z),m.push(v+P,1-A),y.push(l++)}h.push(y)}for(let f=0;f<n;f++)for(let y=0;y<e;y++){const A=h[f][y+1],M=h[f][y],C=h[f+1][y],T=h[f+1][y+1];(f!==0||a>0)&&p.push(A,M,T),(f!==n-1||c<Math.PI)&&p.push(M,C,T)}this.setIndex(p),this.setAttribute("position",new Ne(g,3)),this.setAttribute("normal",new Ne(b,3)),this.setAttribute("uv",new Ne(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xl(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function _s(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];if(ic(i))i.isRenderTargetTexture?(Ot("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(ic(i[0])){const r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function Qe(s){const t={};for(let e=0;e<s.length;e++){const n=_s(s[e]);for(const i in n)t[i]=n[i]}return t}function ic(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Ld(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Oh(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const Id={clone:_s,merge:Qe};var Dd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ud=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Wn extends vs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Dd,this.fragmentShader=Ud,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=_s(t.uniforms),this.uniformsGroups=Ld(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new wt().setHex(i.value);break;case"v2":this.uniforms[n].value=new Xt().fromArray(i.value);break;case"v3":this.uniforms[n].value=new D().fromArray(i.value);break;case"v4":this.uniforms[n].value=new we().fromArray(i.value);break;case"m3":this.uniforms[n].value=new kt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new qt().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Nd extends Wn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Me extends vs{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new wt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new wt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xo,this.normalScale=new Xt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ei,this.combine=nl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Fd extends vs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Yu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Od extends vs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Bh extends Ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new wt(t),this.intensity=e}dispose(){this.dispatchEvent({type:"dispose"})}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Bd extends Bh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new wt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const Ra=new qt,sc=new D,rc=new D;class zd{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Xt(512,512),this.mapType=pn,this.map=null,this.mapPass=null,this.matrix=new qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new pl,this._frameExtents=new Xt(1,1),this._viewportCount=1,this._viewports=[new we(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;sc.setFromMatrixPosition(t.matrixWorld),e.position.copy(sc),rc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(rc),e.updateMatrixWorld(),Ra.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ra,e.coordinateSystem,e.reversedDepth),e.coordinateSystem===Hs||e.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ra)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const fr=new D,pr=new tn,Un=new D;class zh extends Ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qt,this.projectionMatrix=new qt,this.projectionMatrixInverse=new qt,this.coordinateSystem=kn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(fr,pr,Un),Un.x===1&&Un.y===1&&Un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fr,pr,Un.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(fr,pr,Un),Un.x===1&&Un.y===1&&Un.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(fr,pr,Un.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const mi=new D,ac=new Xt,oc=new Xt;class xn extends zh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=qo*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ra*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return qo*2*Math.atan(Math.tan(ra*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(mi.x,mi.y).multiplyScalar(-t/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mi.x,mi.y).multiplyScalar(-t/mi.z)}getViewSize(t,e){return this.getViewBounds(t,ac,oc),e.subVectors(oc,ac)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(ra*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,e-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class vl extends zh{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class kd extends zd{constructor(){super(new vl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Hd extends Bh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ve.DEFAULT_UP),this.updateMatrix(),this.target=new Ve,this.shadow=new kd}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const es=-90,ns=1;class Gd extends Ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new xn(es,ns,t,e);i.layers=this.layers,this.add(i);const r=new xn(es,ns,t,e);r.layers=this.layers,this.add(r);const a=new xn(es,ns,t,e);a.layers=this.layers,this.add(a);const o=new xn(es,ns,t,e);o.layers=this.layers,this.add(o);const c=new xn(es,ns,t,e);c.layers=this.layers,this.add(c);const l=new xn(es,ns,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,c]=e;for(const l of e)this.remove(l);if(t===kn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Hs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const b=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),t.setRenderTarget(n,4,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),n.texture.generateMipmaps=b,t.setRenderTarget(n,5,i),m&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(d,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Vd extends xn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const El=class El{constructor(t,e,n,i){this.elements=[1,0,0,1],t!==void 0&&this.set(t,e,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(t,e=0){for(let n=0;n<4;n++)this.elements[n]=t[n+e];return this}set(t,e,n,i){const r=this.elements;return r[0]=t,r[2]=e,r[1]=n,r[3]=i,this}};El.prototype.isMatrix2=!0;let lc=El;function cc(s,t,e,n){const i=Wd(n);switch(e){case Eh:return s*t;case al:return s*t/i.components*i.byteLength;case ol:return s*t/i.components*i.byteLength;case Oi:return s*t*2/i.components*i.byteLength;case ll:return s*t*2/i.components*i.byteLength;case wh:return s*t*3/i.components*i.byteLength;case Rn:return s*t*4/i.components*i.byteLength;case cl:return s*t*4/i.components*i.byteLength;case Or:case Br:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case zr:case kr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case go:case xo:return Math.max(s,16)*Math.max(t,8)/4;case mo:case _o:return Math.max(s,8)*Math.max(t,8)/2;case vo:case Mo:case So:case bo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case yo:case Xr:case Eo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case wo:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case To:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Ao:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Co:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Ro:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case Po:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Lo:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Io:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Do:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Uo:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case No:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Fo:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Oo:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case Bo:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case zo:case ko:case Ho:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Go:case Vo:return Math.ceil(s/4)*Math.ceil(t/4)*8;case qr:case Wo:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Wd(s){switch(s){case pn:case Mh:return{byteLength:1,components:1};case zs:case yh:case ii:return{byteLength:2,components:1};case sl:case rl:return{byteLength:2,components:4};case Vn:case il:case Cn:return{byteLength:4,components:1};case Sh:case bh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:el}}));typeof window<"u"&&(window.__THREE__?Ot("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=el);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function kh(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Xd(s){const t=new WeakMap;function e(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=s.createBuffer();s.bindBuffer(c,u),s.bufferData(c,l,h),o.onUploadCallback();let p;if(l instanceof Float32Array)p=s.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)p=s.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=s.SHORT;else if(l instanceof Uint32Array)p=s.UNSIGNED_INT;else if(l instanceof Int32Array)p=s.INT;else if(l instanceof Int8Array)p=s.BYTE;else if(l instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(s.bindBuffer(l,o),d.length===0)s.bufferSubData(l,0,h);else{d.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<d.length;p++){const g=d[u],b=d[p];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++u,d[u]=b)}d.length=u+1;for(let p=0,g=d.length;p<g;p++){const b=d[p];s.bufferSubData(l,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(s.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:r,update:a}}var qd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yd=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Kd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$d=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Jd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,jd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,tf=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,ef=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,nf=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sf=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,af=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,of=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,cf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,hf=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,uf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,df=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ff=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,pf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,mf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,gf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_f=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,xf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,vf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,yf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ef=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Tf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Af=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Cf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Rf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Pf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Lf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,If=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Df=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Uf=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Nf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ff=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Of=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Bf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,zf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,kf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Hf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Gf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Vf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Wf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Xf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,qf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Yf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Kf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Zf=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,$f=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Qf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tp=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ep=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,np=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,ip=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,sp=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ap=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,op=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,lp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,cp=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,hp=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,up=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,dp=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,fp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mp=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,gp=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,_p=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Mp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,yp=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sp=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,bp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ep=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,wp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ap=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cp=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rp=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Pp=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Lp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Ip=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Dp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Up=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Np=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fp=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Op=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,kp=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hp=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Gp=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Vp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Wp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Xp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,qp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Yp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Kp=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Zp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$p=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jp=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,tm=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,em=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,nm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,im=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rm=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,am=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,om=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,lm=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cm=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hm=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,um=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,dm=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fm=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,pm=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,mm=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gm=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_m=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xm=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vm=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Mm=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ym=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Sm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,bm=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Em=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wm=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tm=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vt={alphahash_fragment:qd,alphahash_pars_fragment:Yd,alphamap_fragment:Kd,alphamap_pars_fragment:Zd,alphatest_fragment:$d,alphatest_pars_fragment:Jd,aomap_fragment:Qd,aomap_pars_fragment:jd,batching_pars_vertex:tf,batching_vertex:ef,begin_vertex:nf,beginnormal_vertex:sf,bsdfs:rf,iridescence_fragment:af,bumpmap_pars_fragment:of,clipping_planes_fragment:lf,clipping_planes_pars_fragment:cf,clipping_planes_pars_vertex:hf,clipping_planes_vertex:uf,color_fragment:df,color_pars_fragment:ff,color_pars_vertex:pf,color_vertex:mf,common:gf,cube_uv_reflection_fragment:_f,defaultnormal_vertex:xf,displacementmap_pars_vertex:vf,displacementmap_vertex:Mf,emissivemap_fragment:yf,emissivemap_pars_fragment:Sf,colorspace_fragment:bf,colorspace_pars_fragment:Ef,envmap_fragment:wf,envmap_common_pars_fragment:Tf,envmap_pars_fragment:Af,envmap_pars_vertex:Cf,envmap_physical_pars_fragment:zf,envmap_vertex:Rf,fog_vertex:Pf,fog_pars_vertex:Lf,fog_fragment:If,fog_pars_fragment:Df,gradientmap_pars_fragment:Uf,lightmap_pars_fragment:Nf,lights_lambert_fragment:Ff,lights_lambert_pars_fragment:Of,lights_pars_begin:Bf,lights_toon_fragment:kf,lights_toon_pars_fragment:Hf,lights_phong_fragment:Gf,lights_phong_pars_fragment:Vf,lights_physical_fragment:Wf,lights_physical_pars_fragment:Xf,lights_fragment_begin:qf,lights_fragment_maps:Yf,lights_fragment_end:Kf,lightprobes_pars_fragment:Zf,logdepthbuf_fragment:$f,logdepthbuf_pars_fragment:Jf,logdepthbuf_pars_vertex:Qf,logdepthbuf_vertex:jf,map_fragment:tp,map_pars_fragment:ep,map_particle_fragment:np,map_particle_pars_fragment:ip,metalnessmap_fragment:sp,metalnessmap_pars_fragment:rp,morphinstance_vertex:ap,morphcolor_vertex:op,morphnormal_vertex:lp,morphtarget_pars_vertex:cp,morphtarget_vertex:hp,normal_fragment_begin:up,normal_fragment_maps:dp,normal_pars_fragment:fp,normal_pars_vertex:pp,normal_vertex:mp,normalmap_pars_fragment:gp,clearcoat_normal_fragment_begin:_p,clearcoat_normal_fragment_maps:xp,clearcoat_pars_fragment:vp,iridescence_pars_fragment:Mp,opaque_fragment:yp,packing:Sp,premultiplied_alpha_fragment:bp,project_vertex:Ep,dithering_fragment:wp,dithering_pars_fragment:Tp,roughnessmap_fragment:Ap,roughnessmap_pars_fragment:Cp,shadowmap_pars_fragment:Rp,shadowmap_pars_vertex:Pp,shadowmap_vertex:Lp,shadowmask_pars_fragment:Ip,skinbase_vertex:Dp,skinning_pars_vertex:Up,skinning_vertex:Np,skinnormal_vertex:Fp,specularmap_fragment:Op,specularmap_pars_fragment:Bp,tonemapping_fragment:zp,tonemapping_pars_fragment:kp,transmission_fragment:Hp,transmission_pars_fragment:Gp,uv_pars_fragment:Vp,uv_pars_vertex:Wp,uv_vertex:Xp,worldpos_vertex:qp,background_vert:Yp,background_frag:Kp,backgroundCube_vert:Zp,backgroundCube_frag:$p,cube_vert:Jp,cube_frag:Qp,depth_vert:jp,depth_frag:tm,distance_vert:em,distance_frag:nm,equirect_vert:im,equirect_frag:sm,linedashed_vert:rm,linedashed_frag:am,meshbasic_vert:om,meshbasic_frag:lm,meshlambert_vert:cm,meshlambert_frag:hm,meshmatcap_vert:um,meshmatcap_frag:dm,meshnormal_vert:fm,meshnormal_frag:pm,meshphong_vert:mm,meshphong_frag:gm,meshphysical_vert:_m,meshphysical_frag:xm,meshtoon_vert:vm,meshtoon_frag:Mm,points_vert:ym,points_frag:Sm,shadow_vert:bm,shadow_frag:Em,sprite_vert:wm,sprite_frag:Tm},ft={common:{diffuse:{value:new wt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new kt}},envmap:{envMap:{value:null},envMapRotation:{value:new kt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new kt},normalScale:{value:new Xt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new wt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new D},probesMax:{value:new D},probesResolution:{value:new D}},points:{diffuse:{value:new wt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0},uvTransform:{value:new kt}},sprite:{diffuse:{value:new wt(16777215)},opacity:{value:1},center:{value:new Xt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new kt},alphaMap:{value:null},alphaMapTransform:{value:new kt},alphaTest:{value:0}}},zn={basic:{uniforms:Qe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:Vt.meshbasic_vert,fragmentShader:Vt.meshbasic_frag},lambert:{uniforms:Qe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new wt(0)},envMapIntensity:{value:1}}]),vertexShader:Vt.meshlambert_vert,fragmentShader:Vt.meshlambert_frag},phong:{uniforms:Qe([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new wt(0)},specular:{value:new wt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphong_vert,fragmentShader:Vt.meshphong_frag},standard:{uniforms:Qe([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new wt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag},toon:{uniforms:Qe([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new wt(0)}}]),vertexShader:Vt.meshtoon_vert,fragmentShader:Vt.meshtoon_frag},matcap:{uniforms:Qe([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:Vt.meshmatcap_vert,fragmentShader:Vt.meshmatcap_frag},points:{uniforms:Qe([ft.points,ft.fog]),vertexShader:Vt.points_vert,fragmentShader:Vt.points_frag},dashed:{uniforms:Qe([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Vt.linedashed_vert,fragmentShader:Vt.linedashed_frag},depth:{uniforms:Qe([ft.common,ft.displacementmap]),vertexShader:Vt.depth_vert,fragmentShader:Vt.depth_frag},normal:{uniforms:Qe([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:Vt.meshnormal_vert,fragmentShader:Vt.meshnormal_frag},sprite:{uniforms:Qe([ft.sprite,ft.fog]),vertexShader:Vt.sprite_vert,fragmentShader:Vt.sprite_frag},background:{uniforms:{uvTransform:{value:new kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Vt.background_vert,fragmentShader:Vt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new kt}},vertexShader:Vt.backgroundCube_vert,fragmentShader:Vt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Vt.cube_vert,fragmentShader:Vt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Vt.equirect_vert,fragmentShader:Vt.equirect_frag},distance:{uniforms:Qe([ft.common,ft.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Vt.distance_vert,fragmentShader:Vt.distance_frag},shadow:{uniforms:Qe([ft.lights,ft.fog,{color:{value:new wt(0)},opacity:{value:1}}]),vertexShader:Vt.shadow_vert,fragmentShader:Vt.shadow_frag}};zn.physical={uniforms:Qe([zn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new kt},clearcoatNormalScale:{value:new Xt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new kt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new kt},sheen:{value:0},sheenColor:{value:new wt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new kt},transmissionSamplerSize:{value:new Xt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new kt},attenuationDistance:{value:0},attenuationColor:{value:new wt(0)},specularColor:{value:new wt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new kt},anisotropyVector:{value:new Xt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new kt}}]),vertexShader:Vt.meshphysical_vert,fragmentShader:Vt.meshphysical_frag};const mr={r:0,b:0,g:0},Am=new qt,Hh=new kt;Hh.set(-1,0,0,0,1,0,0,0,1);function Cm(s,t,e,n,i,r){const a=new wt(0);let o=i===!0?0:1,c,l,h=null,d=0,u=null;function p(y){let A=y.isScene===!0?y.background:null;if(A&&A.isTexture){const M=y.backgroundBlurriness>0;A=t.get(A,M)}return A}function g(y){let A=!1;const M=p(y);M===null?m(a,o):M&&M.isColor&&(m(M,1),A=!0);const C=s.xr.getEnvironmentBlendMode();C==="additive"?e.buffers.color.setClear(0,0,0,1,r):C==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||A)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function b(y,A){const M=p(A);M&&(M.isCubeTexture||M.mapping===Qr)?(l===void 0&&(l=new oe(new In(1,1,1),new Wn({name:"BackgroundCubeMaterial",uniforms:_s(zn.backgroundCube.uniforms),vertexShader:zn.backgroundCube.vertexShader,fragmentShader:zn.backgroundCube.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(C,T,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=M,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Am.makeRotationFromEuler(A.backgroundRotation)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Hh),l.material.toneMapped=Jt.getTransfer(M.colorSpace)!==ue,(h!==M||d!==M.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=M,d=M.version,u=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):M&&M.isTexture&&(c===void 0&&(c=new oe(new Pn(2,2),new Wn({name:"BackgroundMaterial",uniforms:_s(zn.background.uniforms),vertexShader:zn.background.vertexShader,fragmentShader:zn.background.fragmentShader,side:bi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=M,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=Jt.getTransfer(M.colorSpace)!==ue,M.matrixAutoUpdate===!0&&M.updateMatrix(),c.material.uniforms.uvTransform.value.copy(M.matrix),(h!==M||d!==M.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=M,d=M.version,u=s.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,A){y.getRGB(mr,Oh(s)),e.buffers.color.setClear(mr.r,mr.g,mr.b,A,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,A=1){a.set(y),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:g,addToRenderList:b,dispose:f}}function Rm(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,a=!1;function o(w,L,B,W,N){let X=!1;const G=d(w,W,B,L);r!==G&&(r=G,l(r.object)),X=p(w,W,B,N),X&&g(w,W,B,N),N!==null&&t.update(N,s.ELEMENT_ARRAY_BUFFER),(X||a)&&(a=!1,M(w,L,B,W),N!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(N).buffer))}function c(){return s.createVertexArray()}function l(w){return s.bindVertexArray(w)}function h(w){return s.deleteVertexArray(w)}function d(w,L,B,W){const N=W.wireframe===!0;let X=n[L.id];X===void 0&&(X={},n[L.id]=X);const G=w.isInstancedMesh===!0?w.id:0;let J=X[G];J===void 0&&(J={},X[G]=J);let j=J[B.id];j===void 0&&(j={},J[B.id]=j);let lt=j[N];return lt===void 0&&(lt=u(c()),j[N]=lt),lt}function u(w){const L=[],B=[],W=[];for(let N=0;N<e;N++)L[N]=0,B[N]=0,W[N]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:B,attributeDivisors:W,object:w,attributes:{},index:null}}function p(w,L,B,W){const N=r.attributes,X=L.attributes;let G=0;const J=B.getAttributes();for(const j in J)if(J[j].location>=0){const dt=N[j];let xt=X[j];if(xt===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(xt=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(xt=w.instanceColor)),dt===void 0||dt.attribute!==xt||xt&&dt.data!==xt.data)return!0;G++}return r.attributesNum!==G||r.index!==W}function g(w,L,B,W){const N={},X=L.attributes;let G=0;const J=B.getAttributes();for(const j in J)if(J[j].location>=0){let dt=X[j];dt===void 0&&(j==="instanceMatrix"&&w.instanceMatrix&&(dt=w.instanceMatrix),j==="instanceColor"&&w.instanceColor&&(dt=w.instanceColor));const xt={};xt.attribute=dt,dt&&dt.data&&(xt.data=dt.data),N[j]=xt,G++}r.attributes=N,r.attributesNum=G,r.index=W}function b(){const w=r.newAttributes;for(let L=0,B=w.length;L<B;L++)w[L]=0}function m(w){f(w,0)}function f(w,L){const B=r.newAttributes,W=r.enabledAttributes,N=r.attributeDivisors;B[w]=1,W[w]===0&&(s.enableVertexAttribArray(w),W[w]=1),N[w]!==L&&(s.vertexAttribDivisor(w,L),N[w]=L)}function y(){const w=r.newAttributes,L=r.enabledAttributes;for(let B=0,W=L.length;B<W;B++)L[B]!==w[B]&&(s.disableVertexAttribArray(B),L[B]=0)}function A(w,L,B,W,N,X,G){G===!0?s.vertexAttribIPointer(w,L,B,N,X):s.vertexAttribPointer(w,L,B,W,N,X)}function M(w,L,B,W){b();const N=W.attributes,X=B.getAttributes(),G=L.defaultAttributeValues;for(const J in X){const j=X[J];if(j.location>=0){let lt=N[J];if(lt===void 0&&(J==="instanceMatrix"&&w.instanceMatrix&&(lt=w.instanceMatrix),J==="instanceColor"&&w.instanceColor&&(lt=w.instanceColor)),lt!==void 0){const dt=lt.normalized,xt=lt.itemSize,jt=t.get(lt);if(jt===void 0)continue;const xe=jt.buffer,Zt=jt.type,$=jt.bytesPerElement,it=Zt===s.INT||Zt===s.UNSIGNED_INT||lt.gpuType===il;if(lt.isInterleavedBufferAttribute){const tt=lt.data,Nt=tt.stride,zt=lt.offset;if(tt.isInstancedInterleavedBuffer){for(let Pt=0;Pt<j.locationSize;Pt++)f(j.location+Pt,tt.meshPerAttribute);w.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=tt.meshPerAttribute*tt.count)}else for(let Pt=0;Pt<j.locationSize;Pt++)m(j.location+Pt);s.bindBuffer(s.ARRAY_BUFFER,xe);for(let Pt=0;Pt<j.locationSize;Pt++)A(j.location+Pt,xt/j.locationSize,Zt,dt,Nt*$,(zt+xt/j.locationSize*Pt)*$,it)}else{if(lt.isInstancedBufferAttribute){for(let tt=0;tt<j.locationSize;tt++)f(j.location+tt,lt.meshPerAttribute);w.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let tt=0;tt<j.locationSize;tt++)m(j.location+tt);s.bindBuffer(s.ARRAY_BUFFER,xe);for(let tt=0;tt<j.locationSize;tt++)A(j.location+tt,xt/j.locationSize,Zt,dt,xt*$,xt/j.locationSize*tt*$,it)}}else if(G!==void 0){const dt=G[J];if(dt!==void 0)switch(dt.length){case 2:s.vertexAttrib2fv(j.location,dt);break;case 3:s.vertexAttrib3fv(j.location,dt);break;case 4:s.vertexAttrib4fv(j.location,dt);break;default:s.vertexAttrib1fv(j.location,dt)}}}}y()}function C(){v();for(const w in n){const L=n[w];for(const B in L){const W=L[B];for(const N in W){const X=W[N];for(const G in X)h(X[G].object),delete X[G];delete W[N]}}delete n[w]}}function T(w){if(n[w.id]===void 0)return;const L=n[w.id];for(const B in L){const W=L[B];for(const N in W){const X=W[N];for(const G in X)h(X[G].object),delete X[G];delete W[N]}}delete n[w.id]}function P(w){for(const L in n){const B=n[L];for(const W in B){const N=B[W];if(N[w.id]===void 0)continue;const X=N[w.id];for(const G in X)h(X[G].object),delete X[G];delete N[w.id]}}}function x(w){for(const L in n){const B=n[L],W=w.isInstancedMesh===!0?w.id:0,N=B[W];if(N!==void 0){for(const X in N){const G=N[X];for(const J in G)h(G[J].object),delete G[J];delete N[X]}delete B[W],Object.keys(B).length===0&&delete n[L]}}}function v(){E(),a=!0,r!==i&&(r=i,l(r.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:v,resetDefaultState:E,dispose:C,releaseStatesOfGeometry:T,releaseStatesOfObject:x,releaseStatesOfProgram:P,initAttributes:b,enableAttribute:m,disableUnusedAttributes:y}}function Pm(s,t,e){let n;function i(c){n=c}function r(c,l){s.drawArrays(n,c,l),e.update(l,n,1)}function a(c,l,h){h!==0&&(s.drawArraysInstanced(n,c,l,h),e.update(l,n,h))}function o(c,l,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let p=0;p<h;p++)u+=l[p];e.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Lm(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(P){return!(P!==Rn&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const x=P===ii&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==pn&&n.convert(P)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==Cn&&!x)}function c(P){if(P==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(Ot("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=e.logarithmicDepthBuffer===!0,u=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control");e.reversedDepthBuffer===!0&&u===!1&&Ot("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),f=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),A=s.getParameter(s.MAX_VARYING_VECTORS),M=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),C=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:y,maxVaryings:A,maxFragmentUniforms:M,maxSamples:C,samples:T}}function Im(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new Li,o=new kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const p=d.length!==0||u||n!==0||i;return i=u,n=d.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,p){const g=d.clippingPlanes,b=d.clipIntersection,m=d.clipShadows,f=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{const y=r?0:n,A=y*4;let M=f.clippingState||null;c.value=M,M=h(g,u,A,p);for(let C=0;C!==A;++C)M[C]=e[C];f.clippingState=M,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,p,g){const b=d!==null?d.length:0;let m=null;if(b!==0){if(m=c.value,g!==!0||m===null){const f=p+b*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<f)&&(m=new Float32Array(f));for(let A=0,M=p;A!==b;++A,M+=4)a.copy(d[A]).applyMatrix4(y,o),a.normal.toArray(m,M),m[M+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=b,t.numIntersection=0,m}}const Si=4,hc=[.125,.215,.35,.446,.526,.582],Di=20,Dm=256,Ps=new vl,uc=new wt;let Pa=null,La=0,Ia=0,Da=!1;const Um=new D;class dc{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){const{size:a=256,position:o=Um}=r;Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ia=this._renderer.getActiveMipmapLevel(),Da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,n,i,c,o),e>0&&this._blur(c,0,0,e),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Pa,La,Ia),this._renderer.xr.enabled=Da,t.scissorTest=!1,is(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Fi||t.mapping===ms?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Pa=this._renderer.getRenderTarget(),La=this._renderer.getActiveCubeFace(),Ia=this._renderer.getActiveMipmapLevel(),Da=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:$e,minFilter:$e,generateMipmaps:!1,type:ii,format:Rn,colorSpace:Yr,depthBuffer:!1},i=fc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=fc(t,e,n);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Nm(r)),this._blurMaterial=Om(r,t,e),this._ggxMaterial=Fm(r,t,e)}return i}_compileMaterial(t){const e=new oe(new en,t);this._renderer.compile(e,Ps)}_sceneToCubeUV(t,e,n,i,r){const c=new xn(90,1,e,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,p=d.toneMapping;d.getClearColor(uc),d.toneMapping=Hn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new oe(new In,new _e({name:"PMREM.Background",side:on,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,m=b.material;let f=!1;const y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,f=!0):(m.color.copy(uc),f=!0);for(let A=0;A<6;A++){const M=A%3;M===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[A],r.y,r.z)):M===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[A]));const C=this._cubeSize;is(i,M*C,A>2?C:0,C,C),d.setRenderTarget(i),f&&d.render(b,c),d.render(t,c)}d.toneMapping=p,d.autoClear=u,t.background=y}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Fi||t.mapping===ms;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=mc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=pc());const r=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;is(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,Ps)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodMeshes.length;for(let r=1;r<i;r++)this._applyGGXFilter(t,r-1,r);e.autoClear=n}_applyGGXFilter(t,e,n){const i=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=e/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=0+l*1.25,p=d*u,{_lodMax:g}=this,b=this._sizeLods[n],m=3*b*(n>g-Si?n-g+Si:0),f=4*(this._cubeSize-b);c.envMap.value=t.texture,c.roughness.value=p,c.mipInt.value=g-e,is(r,m,f,3*b,2*b),i.setRenderTarget(r),i.render(o,Ps),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-n,is(t,m,f,3*b,2*b),i.setRenderTarget(t),i.render(o,Ps)}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&se("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[i];d.material=l;const u=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Di-1),b=r/g,m=isFinite(r)?1+Math.floor(h*b):Di;m>Di&&Ot(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Di}`);const f=[];let y=0;for(let P=0;P<Di;++P){const x=P/b,v=Math.exp(-x*x/2);f.push(v),P===0?y+=v:P<m&&(y+=2*v)}for(let P=0;P<f.length;P++)f[P]=f[P]/y;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:A}=this;u.dTheta.value=g,u.mipInt.value=A-n;const M=this._sizeLods[i],C=3*M*(i>A-Si?i-A+Si:0),T=4*(this._cubeSize-M);is(e,C,T,3*M,2*M),c.setRenderTarget(e),c.render(d,Ps)}}function Nm(s){const t=[],e=[],n=[];let i=s;const r=s-Si+1+hc.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);t.push(o);let c=1/o;a>s-Si?c=hc[a-s+Si-1]:a===0&&(c=0),e.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],p=6,g=6,b=3,m=2,f=1,y=new Float32Array(b*g*p),A=new Float32Array(m*g*p),M=new Float32Array(f*g*p);for(let T=0;T<p;T++){const P=T%3*2/3-1,x=T>2?0:-1,v=[P,x,0,P+2/3,x,0,P+2/3,x+1,0,P,x,0,P+2/3,x+1,0,P,x+1,0];y.set(v,b*g*T),A.set(u,m*g*T);const E=[T,T,T,T,T,T];M.set(E,f*g*T)}const C=new en;C.setAttribute("position",new Mn(y,b)),C.setAttribute("uv",new Mn(A,m)),C.setAttribute("faceIndex",new Mn(M,f)),n.push(new oe(C,null)),i>Si&&i--}return{lodMeshes:n,sizeLods:t,sigmas:e}}function fc(s,t,e){const n=new Gn(s,t,e);return n.texture.mapping=Qr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function is(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Fm(s,t,e){return new Wn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Dm,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:jr(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function Om(s,t,e){const n=new Float32Array(Di),i=new D(0,1,0);return new Wn({name:"SphericalGaussianBlur",defines:{n:Di,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:jr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function pc(){return new Wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:jr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function mc(){return new Wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:jr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function jr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Gh extends Gn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Nh(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new In(5,5,5),r=new Wn({name:"CubemapFromEquirect",uniforms:_s(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:on,blending:Qn});r.uniforms.tEquirect.value=e;const a=new oe(i,r),o=e.minFilter;return e.minFilter===Ui&&(e.minFilter=$e),new Gd(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}function Bm(s){let t=new WeakMap,e=new WeakMap,n=null;function i(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===na||p===ia)if(t.has(u)){const g=t.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const b=new Gh(g.height);return b.fromEquirectangularTexture(s,u),t.set(u,b),u.addEventListener("dispose",l),o(b.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const p=u.mapping,g=p===na||p===ia,b=p===Fi||p===ms;if(g||b){let m=e.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return n===null&&(n=new dc(s)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),m.texture;if(m!==void 0)return m.texture;{const y=u.image;return g&&y&&y.height>0||b&&y&&c(y)?(n===null&&(n=new dc(s)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,e.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,p){return p===na?u.mapping=Fi:p===ia&&(u.mapping=ms),u}function c(u){let p=0;const g=6;for(let b=0;b<g;b++)u[b]!==void 0&&p++;return p===g}function l(u){const p=u.target;p.removeEventListener("dispose",l);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function d(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function zm(s){const t={};function e(n){if(t[n]!==void 0)return t[n];const i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&ds("WebGLRenderer: "+n+" extension not supported."),i}}}function km(s,t,e,n){const i={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete i[u.id];const p=r.get(u);p&&(t.remove(p),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const p in u)t.update(u[p],s.ARRAY_BUFFER)}function l(d){const u=[],p=d.index,g=d.attributes.position;let b=0;if(g===void 0)return;if(p!==null){const y=p.array;b=p.version;for(let A=0,M=y.length;A<M;A+=3){const C=y[A+0],T=y[A+1],P=y[A+2];u.push(C,T,T,P,P,C)}}else{const y=g.array;b=g.version;for(let A=0,M=y.length/3-1;A<M;A+=3){const C=A+0,T=A+1,P=A+2;u.push(C,T,T,P,P,C)}}const m=new(g.count>=65535?Lh:Ph)(u,1);m.version=b;const f=r.get(d);f&&t.remove(f),r.set(d,m)}function h(d){const u=r.get(d);if(u){const p=d.index;p!==null&&u.version<p.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function Hm(s,t,e){let n;function i(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,u){s.drawElements(n,u,r,d*a),e.update(u,n,1)}function l(d,u,p){p!==0&&(s.drawElementsInstanced(n,u,r,d*a,p),e.update(u,n,p))}function h(d,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,d,0,p);let b=0;for(let m=0;m<p;m++)b+=u[m];e.update(b,n,1)}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function Gm(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:se("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Vm(s,t,e){const n=new WeakMap,i=new we;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let E=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",E)};var p=E;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let M=0;g===!0&&(M=1),b===!0&&(M=2),m===!0&&(M=3);let C=o.attributes.position.count*M,T=1;C>t.maxTextureSize&&(T=Math.ceil(C/t.maxTextureSize),C=t.maxTextureSize);const P=new Float32Array(C*T*4*d),x=new Ah(P,C,T,d);x.type=Cn,x.needsUpdate=!0;const v=M*4;for(let w=0;w<d;w++){const L=f[w],B=y[w],W=A[w],N=C*T*4*w;for(let X=0;X<L.count;X++){const G=X*v;g===!0&&(i.fromBufferAttribute(L,X),P[N+G+0]=i.x,P[N+G+1]=i.y,P[N+G+2]=i.z,P[N+G+3]=0),b===!0&&(i.fromBufferAttribute(B,X),P[N+G+4]=i.x,P[N+G+5]=i.y,P[N+G+6]=i.z,P[N+G+7]=0),m===!0&&(i.fromBufferAttribute(W,X),P[N+G+8]=i.x,P[N+G+9]=i.y,P[N+G+10]=i.z,P[N+G+11]=W.itemSize===4?i.w:1)}}u={count:d,texture:x,size:new Xt(C,T)},n.set(o,u),o.addEventListener("dispose",E)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const b=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(s,"morphTargetBaseInfluence",b),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Wm(s,t,e,n,i){let r=new WeakMap;function a(l){const h=i.render.frame,d=l.geometry,u=t.get(l,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const p=l.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function o(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const Xm={[dh]:"LINEAR_TONE_MAPPING",[fh]:"REINHARD_TONE_MAPPING",[ph]:"CINEON_TONE_MAPPING",[mh]:"ACES_FILMIC_TONE_MAPPING",[_h]:"AGX_TONE_MAPPING",[xh]:"NEUTRAL_TONE_MAPPING",[gh]:"CUSTOM_TONE_MAPPING"};function qm(s,t,e,n,i,r){const a=new Gn(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,depthTexture:i?new gs(t,e):void 0}),o=new Gn(t,e,{type:ii,depthBuffer:!1,stencilBuffer:!1}),c=new en;c.setAttribute("position",new Ne([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Ne([0,2,0,0,2,0],2));const l=new Nd({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new oe(c,l),d=new vl(-1,1,1,-1,0,1);let u=null,p=null,g=!1,b,m=null,f=[],y=!1;this.setSize=function(A,M){a.setSize(A,M),o.setSize(A,M);for(let C=0;C<f.length;C++){const T=f[C];T.setSize&&T.setSize(A,M)}},this.setEffects=function(A){f=A,y=f.length>0&&f[0].isRenderPass===!0;const M=a.width,C=a.height;for(let T=0;T<f.length;T++){const P=f[T];P.setSize&&P.setSize(M,C)}},this.begin=function(A,M){if(g||A.toneMapping===Hn&&f.length===0)return!1;if(m=M,M!==null){const C=M.width,T=M.height;(a.width!==C||a.height!==T)&&this.setSize(C,T)}return y===!1&&A.setRenderTarget(a),b=A.toneMapping,A.toneMapping=Hn,!0},this.hasRenderPass=function(){return y},this.end=function(A,M){A.toneMapping=b,g=!0;let C=a,T=o;for(let P=0;P<f.length;P++){const x=f[P];if(x.enabled!==!1&&(x.render(A,T,C,M),x.needsSwap!==!1)){const v=C;C=T,T=v}}if(u!==A.outputColorSpace||p!==A.toneMapping){u=A.outputColorSpace,p=A.toneMapping,l.defines={},Jt.getTransfer(u)===ue&&(l.defines.SRGB_TRANSFER="");const P=Xm[p];P&&(l.defines[P]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=C.texture,A.setRenderTarget(m),A.render(h,d),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),c.dispose(),l.dispose()}}const Vh=new Je,Ko=new gs(1,1),Wh=new Ah,Xh=new ud,qh=new Nh,gc=[],_c=[],xc=new Float32Array(16),vc=new Float32Array(9),Mc=new Float32Array(4);function ys(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=gc[i];if(r===void 0&&(r=new Float32Array(i),gc[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Be(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function ze(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function ta(s,t){let e=_c[t];e===void 0&&(e=new Int32Array(t),_c[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Ym(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Km(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;s.uniform2fv(this.addr,t),ze(e,t)}}function Zm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Be(e,t))return;s.uniform3fv(this.addr,t),ze(e,t)}}function $m(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;s.uniform4fv(this.addr,t),ze(e,t)}}function Jm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;Mc.set(n),s.uniformMatrix2fv(this.addr,!1,Mc),ze(e,n)}}function Qm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;vc.set(n),s.uniformMatrix3fv(this.addr,!1,vc),ze(e,n)}}function jm(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Be(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ze(e,t)}else{if(Be(e,n))return;xc.set(n),s.uniformMatrix4fv(this.addr,!1,xc),ze(e,n)}}function t0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function e0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;s.uniform2iv(this.addr,t),ze(e,t)}}function n0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;s.uniform3iv(this.addr,t),ze(e,t)}}function i0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;s.uniform4iv(this.addr,t),ze(e,t)}}function s0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function r0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Be(e,t))return;s.uniform2uiv(this.addr,t),ze(e,t)}}function a0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Be(e,t))return;s.uniform3uiv(this.addr,t),ze(e,t)}}function o0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Be(e,t))return;s.uniform4uiv(this.addr,t),ze(e,t)}}function l0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Ko.compareFunction=e.isReversedDepthBuffer()?ul:hl,r=Ko):r=Vh,e.setTexture2D(t||r,i)}function c0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Xh,i)}function h0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||qh,i)}function u0(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Wh,i)}function d0(s){switch(s){case 5126:return Ym;case 35664:return Km;case 35665:return Zm;case 35666:return $m;case 35674:return Jm;case 35675:return Qm;case 35676:return jm;case 5124:case 35670:return t0;case 35667:case 35671:return e0;case 35668:case 35672:return n0;case 35669:case 35673:return i0;case 5125:return s0;case 36294:return r0;case 36295:return a0;case 36296:return o0;case 35678:case 36198:case 36298:case 36306:case 35682:return l0;case 35679:case 36299:case 36307:return c0;case 35680:case 36300:case 36308:case 36293:return h0;case 36289:case 36303:case 36311:case 36292:return u0}}function f0(s,t){s.uniform1fv(this.addr,t)}function p0(s,t){const e=ys(t,this.size,2);s.uniform2fv(this.addr,e)}function m0(s,t){const e=ys(t,this.size,3);s.uniform3fv(this.addr,e)}function g0(s,t){const e=ys(t,this.size,4);s.uniform4fv(this.addr,e)}function _0(s,t){const e=ys(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function x0(s,t){const e=ys(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function v0(s,t){const e=ys(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function M0(s,t){s.uniform1iv(this.addr,t)}function y0(s,t){s.uniform2iv(this.addr,t)}function S0(s,t){s.uniform3iv(this.addr,t)}function b0(s,t){s.uniform4iv(this.addr,t)}function E0(s,t){s.uniform1uiv(this.addr,t)}function w0(s,t){s.uniform2uiv(this.addr,t)}function T0(s,t){s.uniform3uiv(this.addr,t)}function A0(s,t){s.uniform4uiv(this.addr,t)}function C0(s,t,e){const n=this.cache,i=t.length,r=ta(e,i);Be(n,r)||(s.uniform1iv(this.addr,r),ze(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=Ko:a=Vh;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,r[o])}function R0(s,t,e){const n=this.cache,i=t.length,r=ta(e,i);Be(n,r)||(s.uniform1iv(this.addr,r),ze(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Xh,r[a])}function P0(s,t,e){const n=this.cache,i=t.length,r=ta(e,i);Be(n,r)||(s.uniform1iv(this.addr,r),ze(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||qh,r[a])}function L0(s,t,e){const n=this.cache,i=t.length,r=ta(e,i);Be(n,r)||(s.uniform1iv(this.addr,r),ze(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Wh,r[a])}function I0(s){switch(s){case 5126:return f0;case 35664:return p0;case 35665:return m0;case 35666:return g0;case 35674:return _0;case 35675:return x0;case 35676:return v0;case 5124:case 35670:return M0;case 35667:case 35671:return y0;case 35668:case 35672:return S0;case 35669:case 35673:return b0;case 5125:return E0;case 36294:return w0;case 36295:return T0;case 36296:return A0;case 35678:case 36198:case 36298:case 36306:case 35682:return C0;case 35679:case 36299:case 36307:return R0;case 35680:case 36300:case 36308:case 36293:return P0;case 36289:case 36303:case 36311:case 36292:return L0}}class D0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=d0(e.type)}}class U0{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=I0(e.type)}}class N0{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const Ua=/(\w+)(\])?(\[|\.)?/g;function yc(s,t){s.seq.push(t),s.map[t.id]=t}function F0(s,t,e){const n=s.name,i=n.length;for(Ua.lastIndex=0;;){const r=Ua.exec(n),a=Ua.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){yc(e,l===void 0?new D0(o,s,t):new U0(o,s,t));break}else{let d=e.map[o];d===void 0&&(d=new N0(o),yc(e,d)),e=d}}}class Hr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),c=t.getUniformLocation(e,o.name);F0(o,c,this)}const i=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Sc(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const O0=37297;let B0=0;function z0(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const bc=new kt;function k0(s){Jt._getMatrix(bc,Jt.workingColorSpace,s);const t=`mat3( ${bc.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(s)){case Kr:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return Ot("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Ec(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+z0(s.getShaderSource(t),o)}else return r}function H0(s,t){const e=k0(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}const G0={[dh]:"Linear",[fh]:"Reinhard",[ph]:"Cineon",[mh]:"ACESFilmic",[_h]:"AgX",[xh]:"Neutral",[gh]:"Custom"};function V0(s,t){const e=G0[t];return e===void 0?(Ot("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const gr=new D;function W0(){Jt.getLuminanceCoefficients(gr);const s=gr.x.toFixed(4),t=gr.y.toFixed(4),e=gr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function X0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fs).join(`
`)}function q0(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Y0(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Fs(s){return s!==""}function wc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Tc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const K0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Zo(s){return s.replace(K0,$0)}const Z0=new Map;function $0(s,t){let e=Vt[t];if(e===void 0){const n=Z0.get(t);if(n!==void 0)e=Vt[n],Ot('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Zo(e)}const J0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ac(s){return s.replace(J0,Q0)}function Q0(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Cc(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const j0={[Fr]:"SHADOWMAP_TYPE_PCF",[Ns]:"SHADOWMAP_TYPE_VSM"};function tg(s){return j0[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const eg={[Fi]:"ENVMAP_TYPE_CUBE",[ms]:"ENVMAP_TYPE_CUBE",[Qr]:"ENVMAP_TYPE_CUBE_UV"};function ng(s){return s.envMap===!1?"ENVMAP_TYPE_CUBE":eg[s.envMapMode]||"ENVMAP_TYPE_CUBE"}const ig={[ms]:"ENVMAP_MODE_REFRACTION"};function sg(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":ig[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const rg={[nl]:"ENVMAP_BLENDING_MULTIPLY",[Wu]:"ENVMAP_BLENDING_MIX",[Xu]:"ENVMAP_BLENDING_ADD"};function ag(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":rg[s.combine]||"ENVMAP_BLENDING_NONE"}function og(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function lg(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=tg(e),l=ng(e),h=sg(e),d=ag(e),u=og(e),p=X0(e),g=q0(r),b=i.createProgram();let m,f,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Fs).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Fs).join(`
`),f.length>0&&(f+=`
`)):(m=[Cc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),f=[Cc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Hn?"#define TONE_MAPPING":"",e.toneMapping!==Hn?Vt.tonemapping_pars_fragment:"",e.toneMapping!==Hn?V0("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Vt.colorspace_pars_fragment,H0("linearToOutputTexel",e.outputColorSpace),W0(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fs).join(`
`)),a=Zo(a),a=wc(a,e),a=Tc(a,e),o=Zo(o),o=wc(o,e),o=Tc(o,e),a=Ac(a),o=Ac(o),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",e.glslVersion===Nl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Nl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const A=y+m+a,M=y+f+o,C=Sc(i,i.VERTEX_SHADER,A),T=Sc(i,i.FRAGMENT_SHADER,M);i.attachShader(b,C),i.attachShader(b,T),e.index0AttributeName!==void 0?i.bindAttribLocation(b,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(b,0,"position"),i.linkProgram(b);function P(w){if(s.debug.checkShaderErrors){const L=i.getProgramInfoLog(b)||"",B=i.getShaderInfoLog(C)||"",W=i.getShaderInfoLog(T)||"",N=L.trim(),X=B.trim(),G=W.trim();let J=!0,j=!0;if(i.getProgramParameter(b,i.LINK_STATUS)===!1)if(J=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,b,C,T);else{const lt=Ec(i,C,"vertex"),dt=Ec(i,T,"fragment");se("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(b,i.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+N+`
`+lt+`
`+dt)}else N!==""?Ot("WebGLProgram: Program Info Log:",N):(X===""||G==="")&&(j=!1);j&&(w.diagnostics={runnable:J,programLog:N,vertexShader:{log:X,prefix:m},fragmentShader:{log:G,prefix:f}})}i.deleteShader(C),i.deleteShader(T),x=new Hr(i,b),v=Y0(i,b)}let x;this.getUniforms=function(){return x===void 0&&P(this),x};let v;this.getAttributes=function(){return v===void 0&&P(this),v};let E=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(b,O0)),E},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(b),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=B0++,this.cacheKey=t,this.usedTimes=1,this.program=b,this.vertexShader=C,this.fragmentShader=T,this}let cg=0;class hg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new ug(t),e.set(t,n)),n}}class ug{constructor(t){this.id=cg++,this.code=t,this.usedTimes=0}}function dg(s){return s===Oi||s===Xr||s===qr}function fg(s,t,e,n,i,r){const a=new Ch,o=new hg,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function b(x,v,E,w,L,B){const W=w.fog,N=L.geometry,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?w.environment:null,G=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,J=t.get(x.envMap||X,G),j=J&&J.mapping===Qr?J.image.height:null,lt=p[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&Ot("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const dt=N.morphAttributes.position||N.morphAttributes.normal||N.morphAttributes.color,xt=dt!==void 0?dt.length:0;let jt=0;N.morphAttributes.position!==void 0&&(jt=1),N.morphAttributes.normal!==void 0&&(jt=2),N.morphAttributes.color!==void 0&&(jt=3);let xe,Zt,$,it;if(lt){const Mt=zn[lt];xe=Mt.vertexShader,Zt=Mt.fragmentShader}else{xe=x.vertexShader,Zt=x.fragmentShader;const Mt=o.getVertexShaderStage(x),ee=o.getFragmentShaderStage(x);o.update(x,Mt,ee),$=Mt.id,it=ee.id}const tt=s.getRenderTarget(),Nt=s.state.buffers.depth.getReversed(),zt=L.isInstancedMesh===!0,Pt=L.isBatchedMesh===!0,ye=!!x.map,Gt=!!x.matcap,ae=!!J,te=!!x.aoMap,Kt=!!x.lightMap,be=!!x.bumpMap&&x.wireframe===!1,Te=!!x.normalMap,Pe=!!x.displacementMap,Le=!!x.emissiveMap,fe=!!x.metalnessMap,Se=!!x.roughnessMap,U=x.anisotropy>0,ke=x.clearcoat>0,re=x.dispersion>0,R=x.iridescence>0,_=x.sheen>0,O=x.transmission>0,H=U&&!!x.anisotropyMap,q=ke&&!!x.clearcoatMap,et=ke&&!!x.clearcoatNormalMap,st=ke&&!!x.clearcoatRoughnessMap,Y=R&&!!x.iridescenceMap,Z=R&&!!x.iridescenceThicknessMap,at=_&&!!x.sheenColorMap,yt=_&&!!x.sheenRoughnessMap,ht=!!x.specularMap,ot=!!x.specularColorMap,Tt=!!x.specularIntensityMap,Lt=O&&!!x.transmissionMap,Bt=O&&!!x.thicknessMap,I=!!x.gradientMap,nt=!!x.alphaMap,K=x.alphaTest>0,rt=!!x.alphaHash,ut=!!x.extensions;let Q=Hn;x.toneMapped&&(tt===null||tt.isXRRenderTarget===!0)&&(Q=s.toneMapping);const St={shaderID:lt,shaderType:x.type,shaderName:x.name,vertexShader:xe,fragmentShader:Zt,defines:x.defines,customVertexShaderID:$,customFragmentShaderID:it,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:Pt,batchingColor:Pt&&L._colorsTexture!==null,instancing:zt,instancingColor:zt&&L.instanceColor!==null,instancingMorph:zt&&L.morphTexture!==null,outputColorSpace:tt===null?s.outputColorSpace:tt.isXRRenderTarget===!0?tt.texture.colorSpace:Jt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:ye,matcap:Gt,envMap:ae,envMapMode:ae&&J.mapping,envMapCubeUVHeight:j,aoMap:te,lightMap:Kt,bumpMap:be,normalMap:Te,displacementMap:Pe,emissiveMap:Le,normalMapObjectSpace:Te&&x.normalMapType===Ku,normalMapTangentSpace:Te&&x.normalMapType===Xo,packedNormalMap:Te&&x.normalMapType===Xo&&dg(x.normalMap.format),metalnessMap:fe,roughnessMap:Se,anisotropy:U,anisotropyMap:H,clearcoat:ke,clearcoatMap:q,clearcoatNormalMap:et,clearcoatRoughnessMap:st,dispersion:re,iridescence:R,iridescenceMap:Y,iridescenceThicknessMap:Z,sheen:_,sheenColorMap:at,sheenRoughnessMap:yt,specularMap:ht,specularColorMap:ot,specularIntensityMap:Tt,transmission:O,transmissionMap:Lt,thicknessMap:Bt,gradientMap:I,opaque:x.transparent===!1&&x.blending===jn&&x.alphaToCoverage===!1,alphaMap:nt,alphaTest:K,alphaHash:rt,combine:x.combine,mapUv:ye&&g(x.map.channel),aoMapUv:te&&g(x.aoMap.channel),lightMapUv:Kt&&g(x.lightMap.channel),bumpMapUv:be&&g(x.bumpMap.channel),normalMapUv:Te&&g(x.normalMap.channel),displacementMapUv:Pe&&g(x.displacementMap.channel),emissiveMapUv:Le&&g(x.emissiveMap.channel),metalnessMapUv:fe&&g(x.metalnessMap.channel),roughnessMapUv:Se&&g(x.roughnessMap.channel),anisotropyMapUv:H&&g(x.anisotropyMap.channel),clearcoatMapUv:q&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:et&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:st&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Y&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:at&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:yt&&g(x.sheenRoughnessMap.channel),specularMapUv:ht&&g(x.specularMap.channel),specularColorMapUv:ot&&g(x.specularColorMap.channel),specularIntensityMapUv:Tt&&g(x.specularIntensityMap.channel),transmissionMapUv:Lt&&g(x.transmissionMap.channel),thicknessMapUv:Bt&&g(x.thicknessMap.channel),alphaMapUv:nt&&g(x.alphaMap.channel),vertexTangents:!!N.attributes.tangent&&(Te||U),vertexNormals:!!N.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!N.attributes.color&&N.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!N.attributes.uv&&(ye||nt),fog:!!W,useFog:x.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||N.attributes.normal===void 0&&Te===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Nt,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:N.attributes.position!==void 0,morphTargets:N.morphAttributes.position!==void 0,morphNormals:N.morphAttributes.normal!==void 0,morphColors:N.morphAttributes.color!==void 0,morphTargetsCount:xt,morphTextureStride:jt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&E.length>0,shadowMapType:s.shadowMap.type,toneMapping:Q,decodeVideoTexture:ye&&x.map.isVideoTexture===!0&&Jt.getTransfer(x.map.colorSpace)===ue,decodeVideoTextureEmissive:Le&&x.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(x.emissiveMap.colorSpace)===ue,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Tn,flipSided:x.side===on,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:ut&&x.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ut&&x.extensions.multiDraw===!0||Pt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return St.vertexUv1s=c.has(1),St.vertexUv2s=c.has(2),St.vertexUv3s=c.has(3),c.clear(),St}function m(x){const v=[];if(x.shaderID?v.push(x.shaderID):(v.push(x.customVertexShaderID),v.push(x.customFragmentShaderID)),x.defines!==void 0)for(const E in x.defines)v.push(E),v.push(x.defines[E]);return x.isRawShaderMaterial===!1&&(f(v,x),y(v,x),v.push(s.outputColorSpace)),v.push(x.customProgramCacheKey),v.join()}function f(x,v){x.push(v.precision),x.push(v.outputColorSpace),x.push(v.envMapMode),x.push(v.envMapCubeUVHeight),x.push(v.mapUv),x.push(v.alphaMapUv),x.push(v.lightMapUv),x.push(v.aoMapUv),x.push(v.bumpMapUv),x.push(v.normalMapUv),x.push(v.displacementMapUv),x.push(v.emissiveMapUv),x.push(v.metalnessMapUv),x.push(v.roughnessMapUv),x.push(v.anisotropyMapUv),x.push(v.clearcoatMapUv),x.push(v.clearcoatNormalMapUv),x.push(v.clearcoatRoughnessMapUv),x.push(v.iridescenceMapUv),x.push(v.iridescenceThicknessMapUv),x.push(v.sheenColorMapUv),x.push(v.sheenRoughnessMapUv),x.push(v.specularMapUv),x.push(v.specularColorMapUv),x.push(v.specularIntensityMapUv),x.push(v.transmissionMapUv),x.push(v.thicknessMapUv),x.push(v.combine),x.push(v.fogExp2),x.push(v.sizeAttenuation),x.push(v.morphTargetsCount),x.push(v.morphAttributeCount),x.push(v.numDirLights),x.push(v.numPointLights),x.push(v.numSpotLights),x.push(v.numSpotLightMaps),x.push(v.numHemiLights),x.push(v.numRectAreaLights),x.push(v.numDirLightShadows),x.push(v.numPointLightShadows),x.push(v.numSpotLightShadows),x.push(v.numSpotLightShadowsWithMaps),x.push(v.numLightProbes),x.push(v.shadowMapType),x.push(v.toneMapping),x.push(v.numClippingPlanes),x.push(v.numClipIntersection),x.push(v.depthPacking)}function y(x,v){a.disableAll(),v.instancing&&a.enable(0),v.instancingColor&&a.enable(1),v.instancingMorph&&a.enable(2),v.matcap&&a.enable(3),v.envMap&&a.enable(4),v.normalMapObjectSpace&&a.enable(5),v.normalMapTangentSpace&&a.enable(6),v.clearcoat&&a.enable(7),v.iridescence&&a.enable(8),v.alphaTest&&a.enable(9),v.vertexColors&&a.enable(10),v.vertexAlphas&&a.enable(11),v.vertexUv1s&&a.enable(12),v.vertexUv2s&&a.enable(13),v.vertexUv3s&&a.enable(14),v.vertexTangents&&a.enable(15),v.anisotropy&&a.enable(16),v.alphaHash&&a.enable(17),v.batching&&a.enable(18),v.dispersion&&a.enable(19),v.batchingColor&&a.enable(20),v.gradientMap&&a.enable(21),v.packedNormalMap&&a.enable(22),v.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),v.numLightProbeGrids>0&&a.enable(22),v.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function A(x){const v=p[x.type];let E;if(v){const w=zn[v];E=Id.clone(w.uniforms)}else E=x.uniforms;return E}function M(x,v){let E=h.get(v);return E!==void 0?++E.usedTimes:(E=new lg(s,v,x,i),l.push(E),h.set(v,E)),E}function C(x){if(--x.usedTimes===0){const v=l.indexOf(x);l[v]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function T(x){o.remove(x)}function P(){o.dispose()}return{getParameters:b,getProgramCacheKey:m,getUniforms:A,acquireProgram:M,releaseProgram:C,releaseShaderCache:T,programs:l,dispose:P}}function pg(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,c){s.get(a)[o]=c}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function mg(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Rc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Pc(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,b,m,f){let y=s[t];return y===void 0?(y={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:b,renderOrder:u.renderOrder,z:m,group:f},s[t]=y):(y.id=u.id,y.object=u,y.geometry=p,y.material=g,y.materialVariant=a(u),y.groupOrder=b,y.renderOrder=u.renderOrder,y.z=m,y.group=f),t++,y}function c(u,p,g,b,m,f){const y=o(u,p,g,b,m,f);g.transmission>0?n.push(y):g.transparent===!0?i.push(y):e.push(y)}function l(u,p,g,b,m,f){const y=o(u,p,g,b,m,f);g.transmission>0?n.unshift(y):g.transparent===!0?i.unshift(y):e.unshift(y)}function h(u,p,g){e.length>1&&e.sort(u||mg),n.length>1&&n.sort(p||Rc),i.length>1&&i.sort(p||Rc),g&&(e.reverse(),n.reverse(),i.reverse())}function d(){for(let u=t,p=s.length;u<p;u++){const g=s[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:c,unshift:l,finish:d,sort:h}}function gg(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Pc,s.set(n,[a])):i>=r.length?(a=new Pc,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function _g(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new D,color:new wt};break;case"SpotLight":e={position:new D,direction:new D,color:new wt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new D,color:new wt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new D,skyColor:new wt,groundColor:new wt};break;case"RectAreaLight":e={color:new wt,position:new D,halfWidth:new D,halfHeight:new D};break}return s[t.id]=e,e}}}function xg(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Xt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let vg=0;function Mg(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function yg(s){const t=new _g,e=xg(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new D);const i=new D,r=new qt,a=new qt;function o(l){let h=0,d=0,u=0;for(let v=0;v<9;v++)n.probe[v].set(0,0,0);let p=0,g=0,b=0,m=0,f=0,y=0,A=0,M=0,C=0,T=0,P=0;l.sort(Mg);for(let v=0,E=l.length;v<E;v++){const w=l[v],L=w.color,B=w.intensity,W=w.distance;let N=null;if(w.shadow&&w.shadow.map&&(w.shadow.map.texture.format===Oi?N=w.shadow.map.texture:N=w.shadow.map.depthTexture||w.shadow.map.texture),w.isAmbientLight)h+=L.r*B,d+=L.g*B,u+=L.b*B;else if(w.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(w.sh.coefficients[X],B);P++}else if(w.isDirectionalLight){const X=t.get(w);if(X.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const G=w.shadow,J=e.get(w);J.shadowIntensity=G.intensity,J.shadowBias=G.bias,J.shadowNormalBias=G.normalBias,J.shadowRadius=G.radius,J.shadowMapSize=G.mapSize,n.directionalShadow[p]=J,n.directionalShadowMap[p]=N,n.directionalShadowMatrix[p]=w.shadow.matrix,y++}n.directional[p]=X,p++}else if(w.isSpotLight){const X=t.get(w);X.position.setFromMatrixPosition(w.matrixWorld),X.color.copy(L).multiplyScalar(B),X.distance=W,X.coneCos=Math.cos(w.angle),X.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),X.decay=w.decay,n.spot[b]=X;const G=w.shadow;if(w.map&&(n.spotLightMap[C]=w.map,C++,G.updateMatrices(w),w.castShadow&&T++),n.spotLightMatrix[b]=G.matrix,w.castShadow){const J=e.get(w);J.shadowIntensity=G.intensity,J.shadowBias=G.bias,J.shadowNormalBias=G.normalBias,J.shadowRadius=G.radius,J.shadowMapSize=G.mapSize,n.spotShadow[b]=J,n.spotShadowMap[b]=N,M++}b++}else if(w.isRectAreaLight){const X=t.get(w);X.color.copy(L).multiplyScalar(B),X.halfWidth.set(w.width*.5,0,0),X.halfHeight.set(0,w.height*.5,0),n.rectArea[m]=X,m++}else if(w.isPointLight){const X=t.get(w);if(X.color.copy(w.color).multiplyScalar(w.intensity),X.distance=w.distance,X.decay=w.decay,w.castShadow){const G=w.shadow,J=e.get(w);J.shadowIntensity=G.intensity,J.shadowBias=G.bias,J.shadowNormalBias=G.normalBias,J.shadowRadius=G.radius,J.shadowMapSize=G.mapSize,J.shadowCameraNear=G.camera.near,J.shadowCameraFar=G.camera.far,n.pointShadow[g]=J,n.pointShadowMap[g]=N,n.pointShadowMatrix[g]=w.shadow.matrix,A++}n.point[g]=X,g++}else if(w.isHemisphereLight){const X=t.get(w);X.skyColor.copy(w.color).multiplyScalar(B),X.groundColor.copy(w.groundColor).multiplyScalar(B),n.hemi[f]=X,f++}}m>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ft.LTC_FLOAT_1,n.rectAreaLTC2=ft.LTC_FLOAT_2):(n.rectAreaLTC1=ft.LTC_HALF_1,n.rectAreaLTC2=ft.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const x=n.hash;(x.directionalLength!==p||x.pointLength!==g||x.spotLength!==b||x.rectAreaLength!==m||x.hemiLength!==f||x.numDirectionalShadows!==y||x.numPointShadows!==A||x.numSpotShadows!==M||x.numSpotMaps!==C||x.numLightProbes!==P)&&(n.directional.length=p,n.spot.length=b,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=M+C-T,n.spotLightMap.length=C,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,x.directionalLength=p,x.pointLength=g,x.spotLength=b,x.rectAreaLength=m,x.hemiLength=f,x.numDirectionalShadows=y,x.numPointShadows=A,x.numSpotShadows=M,x.numSpotMaps=C,x.numLightProbes=P,n.version=vg++)}function c(l,h){let d=0,u=0,p=0,g=0,b=0;const m=h.matrixWorldInverse;for(let f=0,y=l.length;f<y;f++){const A=l[f];if(A.isDirectionalLight){const M=n.directional[d];M.direction.setFromMatrixPosition(A.matrixWorld),i.setFromMatrixPosition(A.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),d++}else if(A.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(A.matrixWorld),i.setFromMatrixPosition(A.target.matrixWorld),M.direction.sub(i),M.direction.transformDirection(m),p++}else if(A.isRectAreaLight){const M=n.rectArea[g];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(m),a.identity(),r.copy(A.matrixWorld),r.premultiply(m),a.extractRotation(r),M.halfWidth.set(A.width*.5,0,0),M.halfHeight.set(0,A.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),g++}else if(A.isPointLight){const M=n.point[u];M.position.setFromMatrixPosition(A.matrixWorld),M.position.applyMatrix4(m),u++}else if(A.isHemisphereLight){const M=n.hemi[b];M.direction.setFromMatrixPosition(A.matrixWorld),M.direction.transformDirection(m),b++}}}return{setup:o,setupView:c,state:n}}function Lc(s){const t=new yg(s),e=[],n=[],i=[];function r(u){d.camera=u,e.length=0,n.length=0,i.length=0}function a(u){e.push(u)}function o(u){n.push(u)}function c(u){i.push(u)}function l(){t.setup(e)}function h(u){t.setupView(e,u)}const d={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function Sg(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new Lc(s),t.set(i,[o])):r>=a.length?(o=new Lc(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const bg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Eg=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,wg=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],Tg=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],Ic=new qt,Ls=new D,Na=new D;function Ag(s,t,e){let n=new pl;const i=new Xt,r=new Xt,a=new we,o=new Fd,c=new Od,l={},h=e.maxTextureSize,d={[bi]:on,[on]:bi,[Tn]:Tn},u=new Wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Xt},radius:{value:4}},vertexShader:bg,fragmentShader:Eg}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new en;g.setAttribute("position",new Mn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new oe(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Fr;let f=this.type;this.render=function(T,P,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===wu&&(Ot("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Fr);const v=s.getRenderTarget(),E=s.getActiveCubeFace(),w=s.getActiveMipmapLevel(),L=s.state;L.setBlending(Qn),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);const B=f!==this.type;B&&P.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(N=>N.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,N=T.length;W<N;W++){const X=T[W],G=X.shadow;if(G===void 0){Ot("WebGLShadowMap:",X,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const J=G.getFrameExtents();i.multiply(J),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/J.x),i.x=r.x*J.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/J.y),i.y=r.y*J.y,G.mapSize.y=r.y));const j=s.state.buffers.depth.getReversed();if(G.camera._reversedDepth=j,G.map===null||B===!0){if(G.map!==null&&(G.map.depthTexture!==null&&(G.map.depthTexture.dispose(),G.map.depthTexture=null),G.map.dispose()),this.type===Ns){if(X.isPointLight){Ot("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}G.map=new Gn(i.x,i.y,{format:Oi,type:ii,minFilter:$e,magFilter:$e,generateMipmaps:!1}),G.map.texture.name=X.name+".shadowMap",G.map.depthTexture=new gs(i.x,i.y,Cn),G.map.depthTexture.name=X.name+".shadowMapDepth",G.map.depthTexture.format=si,G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Xe,G.map.depthTexture.magFilter=Xe}else X.isPointLight?(G.map=new Gh(i.x),G.map.depthTexture=new Pd(i.x,Vn)):(G.map=new Gn(i.x,i.y),G.map.depthTexture=new gs(i.x,i.y,Vn)),G.map.depthTexture.name=X.name+".shadowMap",G.map.depthTexture.format=si,this.type===Fr?(G.map.depthTexture.compareFunction=j?ul:hl,G.map.depthTexture.minFilter=$e,G.map.depthTexture.magFilter=$e):(G.map.depthTexture.compareFunction=null,G.map.depthTexture.minFilter=Xe,G.map.depthTexture.magFilter=Xe);G.camera.updateProjectionMatrix()}const lt=G.map.isWebGLCubeRenderTarget?6:1;for(let dt=0;dt<lt;dt++){if(G.map.isWebGLCubeRenderTarget)s.setRenderTarget(G.map,dt),s.clear();else{dt===0&&(s.setRenderTarget(G.map),s.clear());const xt=G.getViewport(dt);a.set(r.x*xt.x,r.y*xt.y,r.x*xt.z,r.y*xt.w),L.viewport(a)}if(X.isPointLight){const xt=G.camera,jt=G.matrix,xe=X.distance||xt.far;xe!==xt.far&&(xt.far=xe,xt.updateProjectionMatrix()),Ls.setFromMatrixPosition(X.matrixWorld),xt.position.copy(Ls),Na.copy(xt.position),Na.add(wg[dt]),xt.up.copy(Tg[dt]),xt.lookAt(Na),xt.updateMatrixWorld(),jt.makeTranslation(-Ls.x,-Ls.y,-Ls.z),Ic.multiplyMatrices(xt.projectionMatrix,xt.matrixWorldInverse),G._frustum.setFromProjectionMatrix(Ic,xt.coordinateSystem,xt.reversedDepth)}else G.updateMatrices(X);n=G.getFrustum(),M(P,x,G.camera,X,this.type)}G.isPointLightShadow!==!0&&this.type===Ns&&y(G,x),G.needsUpdate=!1}f=this.type,m.needsUpdate=!1,s.setRenderTarget(v,E,w)};function y(T,P){const x=t.update(b);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,p.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Gn(i.x,i.y,{format:Oi,type:ii})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(P,null,x,u,b,null),p.uniforms.shadow_pass.value=T.mapPass.texture,p.uniforms.resolution.value=T.mapSize,p.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(P,null,x,p,b,null)}function A(T,P,x,v){let E=null;const w=x.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(w!==void 0)E=w;else if(E=x.isPointLight===!0?c:o,s.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const L=E.uuid,B=P.uuid;let W=l[L];W===void 0&&(W={},l[L]=W);let N=W[B];N===void 0&&(N=E.clone(),W[B]=N,P.addEventListener("dispose",C)),E=N}if(E.visible=P.visible,E.wireframe=P.wireframe,v===Ns?E.side=P.shadowSide!==null?P.shadowSide:P.side:E.side=P.shadowSide!==null?P.shadowSide:d[P.side],E.alphaMap=P.alphaMap,E.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,E.map=P.map,E.clipShadows=P.clipShadows,E.clippingPlanes=P.clippingPlanes,E.clipIntersection=P.clipIntersection,E.displacementMap=P.displacementMap,E.displacementScale=P.displacementScale,E.displacementBias=P.displacementBias,E.wireframeLinewidth=P.wireframeLinewidth,E.linewidth=P.linewidth,x.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const L=s.properties.get(E);L.light=x}return E}function M(T,P,x,v,E){if(T.visible===!1)return;if(T.layers.test(P.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&E===Ns)&&(!T.frustumCulled||n.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,T.matrixWorld);const B=t.update(T),W=T.material;if(Array.isArray(W)){const N=B.groups;for(let X=0,G=N.length;X<G;X++){const J=N[X],j=W[J.materialIndex];if(j&&j.visible){const lt=A(T,j,v,E);T.onBeforeShadow(s,T,P,x,B,lt,J),s.renderBufferDirect(x,null,B,lt,T,J),T.onAfterShadow(s,T,P,x,B,lt,J)}}}else if(W.visible){const N=A(T,W,v,E);T.onBeforeShadow(s,T,P,x,B,N,null),s.renderBufferDirect(x,null,B,N,T,null),T.onAfterShadow(s,T,P,x,B,N,null)}}const L=T.children;for(let B=0,W=L.length;B<W;B++)M(L[B],P,x,v,E)}function C(T){T.target.removeEventListener("dispose",C);for(const x in l){const v=l[x],E=T.target.uuid;E in v&&(v[E].dispose(),delete v[E])}}}function Cg(s,t){function e(){let I=!1;const nt=new we;let K=null;const rt=new we(0,0,0,0);return{setMask:function(ut){K!==ut&&!I&&(s.colorMask(ut,ut,ut,ut),K=ut)},setLocked:function(ut){I=ut},setClear:function(ut,Q,St,Mt,ee){ee===!0&&(ut*=Mt,Q*=Mt,St*=Mt),nt.set(ut,Q,St,Mt),rt.equals(nt)===!1&&(s.clearColor(ut,Q,St,Mt),rt.copy(nt))},reset:function(){I=!1,K=null,rt.set(-1,0,0,0)}}}function n(){let I=!1,nt=!1,K=null,rt=null,ut=null;return{setReversed:function(Q){if(nt!==Q){const St=t.get("EXT_clip_control");Q?St.clipControlEXT(St.LOWER_LEFT_EXT,St.ZERO_TO_ONE_EXT):St.clipControlEXT(St.LOWER_LEFT_EXT,St.NEGATIVE_ONE_TO_ONE_EXT),nt=Q;const Mt=ut;ut=null,this.setClear(Mt)}},getReversed:function(){return nt},setTest:function(Q){Q?tt(s.DEPTH_TEST):Nt(s.DEPTH_TEST)},setMask:function(Q){K!==Q&&!I&&(s.depthMask(Q),K=Q)},setFunc:function(Q){if(nt&&(Q=sd[Q]),rt!==Q){switch(Q){case ao:s.depthFunc(s.NEVER);break;case oo:s.depthFunc(s.ALWAYS);break;case lo:s.depthFunc(s.LESS);break;case ps:s.depthFunc(s.LEQUAL);break;case co:s.depthFunc(s.EQUAL);break;case ho:s.depthFunc(s.GEQUAL);break;case Wr:s.depthFunc(s.GREATER);break;case uo:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}rt=Q}},setLocked:function(Q){I=Q},setClear:function(Q){ut!==Q&&(ut=Q,nt&&(Q=1-Q),s.clearDepth(Q))},reset:function(){I=!1,K=null,rt=null,ut=null,nt=!1}}}function i(){let I=!1,nt=null,K=null,rt=null,ut=null,Q=null,St=null,Mt=null,ee=null;return{setTest:function(le){I||(le?tt(s.STENCIL_TEST):Nt(s.STENCIL_TEST))},setMask:function(le){nt!==le&&!I&&(s.stencilMask(le),nt=le)},setFunc:function(le,ln,He){(K!==le||rt!==ln||ut!==He)&&(s.stencilFunc(le,ln,He),K=le,rt=ln,ut=He)},setOp:function(le,ln,He){(Q!==le||St!==ln||Mt!==He)&&(s.stencilOp(le,ln,He),Q=le,St=ln,Mt=He)},setLocked:function(le){I=le},setClear:function(le){ee!==le&&(s.clearStencil(le),ee=le)},reset:function(){I=!1,nt=null,K=null,rt=null,ut=null,Q=null,St=null,Mt=null,ee=null}}}const r=new e,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let h={},d={},u={},p=new WeakMap,g=[],b=null,m=!1,f=null,y=null,A=null,M=null,C=null,T=null,P=null,x=new wt(0,0,0),v=0,E=!1,w=null,L=null,B=null,W=null,N=null;const X=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,J=0;const j=s.getParameter(s.VERSION);j.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(j)[1]),G=J>=1):j.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),G=J>=2);let lt=null,dt={};const xt=s.getParameter(s.SCISSOR_BOX),jt=s.getParameter(s.VIEWPORT),xe=new we().fromArray(xt),Zt=new we().fromArray(jt);function $(I,nt,K,rt){const ut=new Uint8Array(4),Q=s.createTexture();s.bindTexture(I,Q),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let St=0;St<K;St++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(nt,0,s.RGBA,1,1,rt,0,s.RGBA,s.UNSIGNED_BYTE,ut):s.texImage2D(nt+St,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ut);return Q}const it={};it[s.TEXTURE_2D]=$(s.TEXTURE_2D,s.TEXTURE_2D,1),it[s.TEXTURE_CUBE_MAP]=$(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),it[s.TEXTURE_2D_ARRAY]=$(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),it[s.TEXTURE_3D]=$(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),tt(s.DEPTH_TEST),a.setFunc(ps),be(!1),Te(Pl),tt(s.CULL_FACE),te(Qn);function tt(I){h[I]!==!0&&(s.enable(I),h[I]=!0)}function Nt(I){h[I]!==!1&&(s.disable(I),h[I]=!1)}function zt(I,nt){return u[I]!==nt?(s.bindFramebuffer(I,nt),u[I]=nt,I===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=nt),I===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=nt),!0):!1}function Pt(I,nt){let K=g,rt=!1;if(I){K=p.get(nt),K===void 0&&(K=[],p.set(nt,K));const ut=I.textures;if(K.length!==ut.length||K[0]!==s.COLOR_ATTACHMENT0){for(let Q=0,St=ut.length;Q<St;Q++)K[Q]=s.COLOR_ATTACHMENT0+Q;K.length=ut.length,rt=!0}}else K[0]!==s.BACK&&(K[0]=s.BACK,rt=!0);rt&&s.drawBuffers(K)}function ye(I){return b!==I?(s.useProgram(I),b=I,!0):!1}const Gt={[Ii]:s.FUNC_ADD,[Au]:s.FUNC_SUBTRACT,[Cu]:s.FUNC_REVERSE_SUBTRACT};Gt[Ru]=s.MIN,Gt[Pu]=s.MAX;const ae={[Lu]:s.ZERO,[Iu]:s.ONE,[Du]:s.SRC_COLOR,[so]:s.SRC_ALPHA,[zu]:s.SRC_ALPHA_SATURATE,[Ou]:s.DST_COLOR,[Nu]:s.DST_ALPHA,[Uu]:s.ONE_MINUS_SRC_COLOR,[ro]:s.ONE_MINUS_SRC_ALPHA,[Bu]:s.ONE_MINUS_DST_COLOR,[Fu]:s.ONE_MINUS_DST_ALPHA,[ku]:s.CONSTANT_COLOR,[Hu]:s.ONE_MINUS_CONSTANT_COLOR,[Gu]:s.CONSTANT_ALPHA,[Vu]:s.ONE_MINUS_CONSTANT_ALPHA};function te(I,nt,K,rt,ut,Q,St,Mt,ee,le){if(I===Qn){m===!0&&(Nt(s.BLEND),m=!1);return}if(m===!1&&(tt(s.BLEND),m=!0),I!==Tu){if(I!==f||le!==E){if((y!==Ii||C!==Ii)&&(s.blendEquation(s.FUNC_ADD),y=Ii,C=Ii),le)switch(I){case jn:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ni:s.blendFunc(s.ONE,s.ONE);break;case Ll:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Il:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:se("WebGLState: Invalid blending: ",I);break}else switch(I){case jn:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ni:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Ll:se("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Il:se("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:se("WebGLState: Invalid blending: ",I);break}A=null,M=null,T=null,P=null,x.set(0,0,0),v=0,f=I,E=le}return}ut=ut||nt,Q=Q||K,St=St||rt,(nt!==y||ut!==C)&&(s.blendEquationSeparate(Gt[nt],Gt[ut]),y=nt,C=ut),(K!==A||rt!==M||Q!==T||St!==P)&&(s.blendFuncSeparate(ae[K],ae[rt],ae[Q],ae[St]),A=K,M=rt,T=Q,P=St),(Mt.equals(x)===!1||ee!==v)&&(s.blendColor(Mt.r,Mt.g,Mt.b,ee),x.copy(Mt),v=ee),f=I,E=!1}function Kt(I,nt){I.side===Tn?Nt(s.CULL_FACE):tt(s.CULL_FACE);let K=I.side===on;nt&&(K=!K),be(K),I.blending===jn&&I.transparent===!1?te(Qn):te(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),a.setFunc(I.depthFunc),a.setTest(I.depthTest),a.setMask(I.depthWrite),r.setMask(I.colorWrite);const rt=I.stencilWrite;o.setTest(rt),rt&&(o.setMask(I.stencilWriteMask),o.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),o.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Le(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?tt(s.SAMPLE_ALPHA_TO_COVERAGE):Nt(s.SAMPLE_ALPHA_TO_COVERAGE)}function be(I){w!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),w=I)}function Te(I){I!==bu?(tt(s.CULL_FACE),I!==L&&(I===Pl?s.cullFace(s.BACK):I===Eu?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Nt(s.CULL_FACE),L=I}function Pe(I){I!==B&&(G&&s.lineWidth(I),B=I)}function Le(I,nt,K){I?(tt(s.POLYGON_OFFSET_FILL),(W!==nt||N!==K)&&(W=nt,N=K,a.getReversed()&&(nt=-nt),s.polygonOffset(nt,K))):Nt(s.POLYGON_OFFSET_FILL)}function fe(I){I?tt(s.SCISSOR_TEST):Nt(s.SCISSOR_TEST)}function Se(I){I===void 0&&(I=s.TEXTURE0+X-1),lt!==I&&(s.activeTexture(I),lt=I)}function U(I,nt,K){K===void 0&&(lt===null?K=s.TEXTURE0+X-1:K=lt);let rt=dt[K];rt===void 0&&(rt={type:void 0,texture:void 0},dt[K]=rt),(rt.type!==I||rt.texture!==nt)&&(lt!==K&&(s.activeTexture(K),lt=K),s.bindTexture(I,nt||it[I]),rt.type=I,rt.texture=nt)}function ke(){const I=dt[lt];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function re(){try{s.compressedTexImage2D(...arguments)}catch(I){se("WebGLState:",I)}}function R(){try{s.compressedTexImage3D(...arguments)}catch(I){se("WebGLState:",I)}}function _(){try{s.texSubImage2D(...arguments)}catch(I){se("WebGLState:",I)}}function O(){try{s.texSubImage3D(...arguments)}catch(I){se("WebGLState:",I)}}function H(){try{s.compressedTexSubImage2D(...arguments)}catch(I){se("WebGLState:",I)}}function q(){try{s.compressedTexSubImage3D(...arguments)}catch(I){se("WebGLState:",I)}}function et(){try{s.texStorage2D(...arguments)}catch(I){se("WebGLState:",I)}}function st(){try{s.texStorage3D(...arguments)}catch(I){se("WebGLState:",I)}}function Y(){try{s.texImage2D(...arguments)}catch(I){se("WebGLState:",I)}}function Z(){try{s.texImage3D(...arguments)}catch(I){se("WebGLState:",I)}}function at(I){return d[I]!==void 0?d[I]:s.getParameter(I)}function yt(I,nt){d[I]!==nt&&(s.pixelStorei(I,nt),d[I]=nt)}function ht(I){xe.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),xe.copy(I))}function ot(I){Zt.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),Zt.copy(I))}function Tt(I,nt){let K=l.get(nt);K===void 0&&(K=new WeakMap,l.set(nt,K));let rt=K.get(I);rt===void 0&&(rt=s.getUniformBlockIndex(nt,I.name),K.set(I,rt))}function Lt(I,nt){const rt=l.get(nt).get(I);c.get(nt)!==rt&&(s.uniformBlockBinding(nt,rt,I.__bindingPointIndex),c.set(nt,rt))}function Bt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},d={},lt=null,dt={},u={},p=new WeakMap,g=[],b=null,m=!1,f=null,y=null,A=null,M=null,C=null,T=null,P=null,x=new wt(0,0,0),v=0,E=!1,w=null,L=null,B=null,W=null,N=null,xe.set(0,0,s.canvas.width,s.canvas.height),Zt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:tt,disable:Nt,bindFramebuffer:zt,drawBuffers:Pt,useProgram:ye,setBlending:te,setMaterial:Kt,setFlipSided:be,setCullFace:Te,setLineWidth:Pe,setPolygonOffset:Le,setScissorTest:fe,activeTexture:Se,bindTexture:U,unbindTexture:ke,compressedTexImage2D:re,compressedTexImage3D:R,texImage2D:Y,texImage3D:Z,pixelStorei:yt,getParameter:at,updateUBOMapping:Tt,uniformBlockBinding:Lt,texStorage2D:et,texStorage3D:st,texSubImage2D:_,texSubImage3D:O,compressedTexSubImage2D:H,compressedTexSubImage3D:q,scissor:ht,viewport:ot,reset:Bt}}function Rg(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Xt,h=new WeakMap,d=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(R,_){return g?new OffscreenCanvas(R,_):Zr("canvas")}function m(R,_,O){let H=1;const q=re(R);if((q.width>O||q.height>O)&&(H=O/Math.max(q.width,q.height)),H<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const et=Math.floor(H*q.width),st=Math.floor(H*q.height);u===void 0&&(u=b(et,st));const Y=_?b(et,st):u;return Y.width=et,Y.height=st,Y.getContext("2d").drawImage(R,0,0,et,st),Ot("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+et+"x"+st+")."),Y}else return"data"in R&&Ot("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),R;return R}function f(R){return R.generateMipmaps}function y(R){s.generateMipmap(R)}function A(R){return R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?s.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function M(R,_,O,H,q,et=!1){if(R!==null){if(s[R]!==void 0)return s[R];Ot("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let st;H&&(st=t.get("EXT_texture_norm16"),st||Ot("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=_;if(_===s.RED&&(O===s.FLOAT&&(Y=s.R32F),O===s.HALF_FLOAT&&(Y=s.R16F),O===s.UNSIGNED_BYTE&&(Y=s.R8),O===s.UNSIGNED_SHORT&&st&&(Y=st.R16_EXT),O===s.SHORT&&st&&(Y=st.R16_SNORM_EXT)),_===s.RED_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.R8UI),O===s.UNSIGNED_SHORT&&(Y=s.R16UI),O===s.UNSIGNED_INT&&(Y=s.R32UI),O===s.BYTE&&(Y=s.R8I),O===s.SHORT&&(Y=s.R16I),O===s.INT&&(Y=s.R32I)),_===s.RG&&(O===s.FLOAT&&(Y=s.RG32F),O===s.HALF_FLOAT&&(Y=s.RG16F),O===s.UNSIGNED_BYTE&&(Y=s.RG8),O===s.UNSIGNED_SHORT&&st&&(Y=st.RG16_EXT),O===s.SHORT&&st&&(Y=st.RG16_SNORM_EXT)),_===s.RG_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.RG8UI),O===s.UNSIGNED_SHORT&&(Y=s.RG16UI),O===s.UNSIGNED_INT&&(Y=s.RG32UI),O===s.BYTE&&(Y=s.RG8I),O===s.SHORT&&(Y=s.RG16I),O===s.INT&&(Y=s.RG32I)),_===s.RGB_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.RGB8UI),O===s.UNSIGNED_SHORT&&(Y=s.RGB16UI),O===s.UNSIGNED_INT&&(Y=s.RGB32UI),O===s.BYTE&&(Y=s.RGB8I),O===s.SHORT&&(Y=s.RGB16I),O===s.INT&&(Y=s.RGB32I)),_===s.RGBA_INTEGER&&(O===s.UNSIGNED_BYTE&&(Y=s.RGBA8UI),O===s.UNSIGNED_SHORT&&(Y=s.RGBA16UI),O===s.UNSIGNED_INT&&(Y=s.RGBA32UI),O===s.BYTE&&(Y=s.RGBA8I),O===s.SHORT&&(Y=s.RGBA16I),O===s.INT&&(Y=s.RGBA32I)),_===s.RGB&&(O===s.UNSIGNED_SHORT&&st&&(Y=st.RGB16_EXT),O===s.SHORT&&st&&(Y=st.RGB16_SNORM_EXT),O===s.UNSIGNED_INT_5_9_9_9_REV&&(Y=s.RGB9_E5),O===s.UNSIGNED_INT_10F_11F_11F_REV&&(Y=s.R11F_G11F_B10F)),_===s.RGBA){const Z=et?Kr:Jt.getTransfer(q);O===s.FLOAT&&(Y=s.RGBA32F),O===s.HALF_FLOAT&&(Y=s.RGBA16F),O===s.UNSIGNED_BYTE&&(Y=Z===ue?s.SRGB8_ALPHA8:s.RGBA8),O===s.UNSIGNED_SHORT&&st&&(Y=st.RGBA16_EXT),O===s.SHORT&&st&&(Y=st.RGBA16_SNORM_EXT),O===s.UNSIGNED_SHORT_4_4_4_4&&(Y=s.RGBA4),O===s.UNSIGNED_SHORT_5_5_5_1&&(Y=s.RGB5_A1)}return(Y===s.R16F||Y===s.R32F||Y===s.RG16F||Y===s.RG32F||Y===s.RGBA16F||Y===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function C(R,_){let O;return R?_===null||_===Vn||_===ks?O=s.DEPTH24_STENCIL8:_===Cn?O=s.DEPTH32F_STENCIL8:_===zs&&(O=s.DEPTH24_STENCIL8,Ot("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Vn||_===ks?O=s.DEPTH_COMPONENT24:_===Cn?O=s.DEPTH_COMPONENT32F:_===zs&&(O=s.DEPTH_COMPONENT16),O}function T(R,_){return f(R)===!0||R.isFramebufferTexture&&R.minFilter!==Xe&&R.minFilter!==$e?Math.log2(Math.max(_.width,_.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?_.mipmaps.length:1}function P(R){const _=R.target;_.removeEventListener("dispose",P),v(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function x(R){const _=R.target;_.removeEventListener("dispose",x),w(_)}function v(R){const _=n.get(R);if(_.__webglInit===void 0)return;const O=R.source,H=p.get(O);if(H){const q=H[_.__cacheKey];q.usedTimes--,q.usedTimes===0&&E(R),Object.keys(H).length===0&&p.delete(O)}n.remove(R)}function E(R){const _=n.get(R);s.deleteTexture(_.__webglTexture);const O=R.source,H=p.get(O);delete H[_.__cacheKey],a.memory.textures--}function w(R){const _=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(_.__webglFramebuffer[H]))for(let q=0;q<_.__webglFramebuffer[H].length;q++)s.deleteFramebuffer(_.__webglFramebuffer[H][q]);else s.deleteFramebuffer(_.__webglFramebuffer[H]);_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer[H])}else{if(Array.isArray(_.__webglFramebuffer))for(let H=0;H<_.__webglFramebuffer.length;H++)s.deleteFramebuffer(_.__webglFramebuffer[H]);else s.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&s.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&s.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let H=0;H<_.__webglColorRenderbuffer.length;H++)_.__webglColorRenderbuffer[H]&&s.deleteRenderbuffer(_.__webglColorRenderbuffer[H]);_.__webglDepthRenderbuffer&&s.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const O=R.textures;for(let H=0,q=O.length;H<q;H++){const et=n.get(O[H]);et.__webglTexture&&(s.deleteTexture(et.__webglTexture),a.memory.textures--),n.remove(O[H])}n.remove(R)}let L=0;function B(){L=0}function W(){return L}function N(R){L=R}function X(){const R=L;return R>=i.maxTextures&&Ot("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),L+=1,R}function G(R){const _=[];return _.push(R.wrapS),_.push(R.wrapT),_.push(R.wrapR||0),_.push(R.magFilter),_.push(R.minFilter),_.push(R.anisotropy),_.push(R.internalFormat),_.push(R.format),_.push(R.type),_.push(R.generateMipmaps),_.push(R.premultiplyAlpha),_.push(R.flipY),_.push(R.unpackAlignment),_.push(R.colorSpace),_.join()}function J(R,_){const O=n.get(R);if(R.isVideoTexture&&U(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&O.__version!==R.version){const H=R.image;if(H===null)Ot("WebGLRenderer: Texture marked for update but no image data found.");else if(H.complete===!1)Ot("WebGLRenderer: Texture marked for update but image is incomplete");else{Nt(O,R,_);return}}else R.isExternalTexture&&(O.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,O.__webglTexture,s.TEXTURE0+_)}function j(R,_){const O=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){Nt(O,R,_);return}else R.isExternalTexture&&(O.__webglTexture=R.sourceTexture?R.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,O.__webglTexture,s.TEXTURE0+_)}function lt(R,_){const O=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&O.__version!==R.version){Nt(O,R,_);return}e.bindTexture(s.TEXTURE_3D,O.__webglTexture,s.TEXTURE0+_)}function dt(R,_){const O=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&O.__version!==R.version){zt(O,R,_);return}e.bindTexture(s.TEXTURE_CUBE_MAP,O.__webglTexture,s.TEXTURE0+_)}const xt={[fo]:s.REPEAT,[Jn]:s.CLAMP_TO_EDGE,[po]:s.MIRRORED_REPEAT},jt={[Xe]:s.NEAREST,[qu]:s.NEAREST_MIPMAP_NEAREST,[Xs]:s.NEAREST_MIPMAP_LINEAR,[$e]:s.LINEAR,[sa]:s.LINEAR_MIPMAP_NEAREST,[Ui]:s.LINEAR_MIPMAP_LINEAR},xe={[Zu]:s.NEVER,[td]:s.ALWAYS,[$u]:s.LESS,[hl]:s.LEQUAL,[Ju]:s.EQUAL,[ul]:s.GEQUAL,[Qu]:s.GREATER,[ju]:s.NOTEQUAL};function Zt(R,_){if(_.type===Cn&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===$e||_.magFilter===sa||_.magFilter===Xs||_.magFilter===Ui||_.minFilter===$e||_.minFilter===sa||_.minFilter===Xs||_.minFilter===Ui)&&Ot("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(R,s.TEXTURE_WRAP_S,xt[_.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,xt[_.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,xt[_.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,jt[_.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,jt[_.minFilter]),_.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,xe[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Xe||_.minFilter!==Xs&&_.minFilter!==Ui||_.type===Cn&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const O=t.get("EXT_texture_filter_anisotropic");s.texParameterf(R,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function $(R,_){let O=!1;R.__webglInit===void 0&&(R.__webglInit=!0,_.addEventListener("dispose",P));const H=_.source;let q=p.get(H);q===void 0&&(q={},p.set(H,q));const et=G(_);if(et!==R.__cacheKey){q[et]===void 0&&(q[et]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,O=!0),q[et].usedTimes++;const st=q[R.__cacheKey];st!==void 0&&(q[R.__cacheKey].usedTimes--,st.usedTimes===0&&E(_)),R.__cacheKey=et,R.__webglTexture=q[et].texture}return O}function it(R,_,O){return Math.floor(Math.floor(R/O)/_)}function tt(R,_,O,H){const et=R.updateRanges;if(et.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,_.width,_.height,O,H,_.data);else{et.sort((yt,ht)=>yt.start-ht.start);let st=0;for(let yt=1;yt<et.length;yt++){const ht=et[st],ot=et[yt],Tt=ht.start+ht.count,Lt=it(ot.start,_.width,4),Bt=it(ht.start,_.width,4);ot.start<=Tt+1&&Lt===Bt&&it(ot.start+ot.count-1,_.width,4)===Lt?ht.count=Math.max(ht.count,ot.start+ot.count-ht.start):(++st,et[st]=ot)}et.length=st+1;const Y=e.getParameter(s.UNPACK_ROW_LENGTH),Z=e.getParameter(s.UNPACK_SKIP_PIXELS),at=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,_.width);for(let yt=0,ht=et.length;yt<ht;yt++){const ot=et[yt],Tt=Math.floor(ot.start/4),Lt=Math.ceil(ot.count/4),Bt=Tt%_.width,I=Math.floor(Tt/_.width),nt=Lt,K=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,Bt),e.pixelStorei(s.UNPACK_SKIP_ROWS,I),e.texSubImage2D(s.TEXTURE_2D,0,Bt,I,nt,K,O,H,_.data)}R.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,Y),e.pixelStorei(s.UNPACK_SKIP_PIXELS,Z),e.pixelStorei(s.UNPACK_SKIP_ROWS,at)}}function Nt(R,_,O){let H=s.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(H=s.TEXTURE_2D_ARRAY),_.isData3DTexture&&(H=s.TEXTURE_3D);const q=$(R,_),et=_.source;e.bindTexture(H,R.__webglTexture,s.TEXTURE0+O);const st=n.get(et);if(et.version!==st.__version||q===!0){if(e.activeTexture(s.TEXTURE0+O),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const K=Jt.getPrimaries(Jt.workingColorSpace),rt=_.colorSpace===yi?null:Jt.getPrimaries(_.colorSpace),ut=_.colorSpace===yi||K===rt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ut)}e.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment);let Z=m(_.image,!1,i.maxTextureSize);Z=ke(_,Z);const at=r.convert(_.format,_.colorSpace),yt=r.convert(_.type);let ht=M(_.internalFormat,at,yt,_.normalized,_.colorSpace,_.isVideoTexture);Zt(H,_);let ot;const Tt=_.mipmaps,Lt=_.isVideoTexture!==!0,Bt=st.__version===void 0||q===!0,I=et.dataReady,nt=T(_,Z);if(_.isDepthTexture)ht=C(_.format===Ni,_.type),Bt&&(Lt?e.texStorage2D(s.TEXTURE_2D,1,ht,Z.width,Z.height):e.texImage2D(s.TEXTURE_2D,0,ht,Z.width,Z.height,0,at,yt,null));else if(_.isDataTexture)if(Tt.length>0){Lt&&Bt&&e.texStorage2D(s.TEXTURE_2D,nt,ht,Tt[0].width,Tt[0].height);for(let K=0,rt=Tt.length;K<rt;K++)ot=Tt[K],Lt?I&&e.texSubImage2D(s.TEXTURE_2D,K,0,0,ot.width,ot.height,at,yt,ot.data):e.texImage2D(s.TEXTURE_2D,K,ht,ot.width,ot.height,0,at,yt,ot.data);_.generateMipmaps=!1}else Lt?(Bt&&e.texStorage2D(s.TEXTURE_2D,nt,ht,Z.width,Z.height),I&&tt(_,Z,at,yt)):e.texImage2D(s.TEXTURE_2D,0,ht,Z.width,Z.height,0,at,yt,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Lt&&Bt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,nt,ht,Tt[0].width,Tt[0].height,Z.depth);for(let K=0,rt=Tt.length;K<rt;K++)if(ot=Tt[K],_.format!==Rn)if(at!==null)if(Lt){if(I)if(_.layerUpdates.size>0){const ut=cc(ot.width,ot.height,_.format,_.type);for(const Q of _.layerUpdates){const St=ot.data.subarray(Q*ut/ot.data.BYTES_PER_ELEMENT,(Q+1)*ut/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,Q,ot.width,ot.height,1,at,St)}_.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,ot.width,ot.height,Z.depth,at,ot.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,K,ht,ot.width,ot.height,Z.depth,0,ot.data,0,0);else Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Lt?I&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,K,0,0,0,ot.width,ot.height,Z.depth,at,yt,ot.data):e.texImage3D(s.TEXTURE_2D_ARRAY,K,ht,ot.width,ot.height,Z.depth,0,at,yt,ot.data)}else{Lt&&Bt&&e.texStorage2D(s.TEXTURE_2D,nt,ht,Tt[0].width,Tt[0].height);for(let K=0,rt=Tt.length;K<rt;K++)ot=Tt[K],_.format!==Rn?at!==null?Lt?I&&e.compressedTexSubImage2D(s.TEXTURE_2D,K,0,0,ot.width,ot.height,at,ot.data):e.compressedTexImage2D(s.TEXTURE_2D,K,ht,ot.width,ot.height,0,ot.data):Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Lt?I&&e.texSubImage2D(s.TEXTURE_2D,K,0,0,ot.width,ot.height,at,yt,ot.data):e.texImage2D(s.TEXTURE_2D,K,ht,ot.width,ot.height,0,at,yt,ot.data)}else if(_.isDataArrayTexture)if(Lt){if(Bt&&e.texStorage3D(s.TEXTURE_2D_ARRAY,nt,ht,Z.width,Z.height,Z.depth),I)if(_.layerUpdates.size>0){const K=cc(Z.width,Z.height,_.format,_.type);for(const rt of _.layerUpdates){const ut=Z.data.subarray(rt*K/Z.data.BYTES_PER_ELEMENT,(rt+1)*K/Z.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,rt,Z.width,Z.height,1,at,yt,ut)}_.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,at,yt,Z.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,ht,Z.width,Z.height,Z.depth,0,at,yt,Z.data);else if(_.isData3DTexture)Lt?(Bt&&e.texStorage3D(s.TEXTURE_3D,nt,ht,Z.width,Z.height,Z.depth),I&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,at,yt,Z.data)):e.texImage3D(s.TEXTURE_3D,0,ht,Z.width,Z.height,Z.depth,0,at,yt,Z.data);else if(_.isFramebufferTexture){if(Bt)if(Lt)e.texStorage2D(s.TEXTURE_2D,nt,ht,Z.width,Z.height);else{let K=Z.width,rt=Z.height;for(let ut=0;ut<nt;ut++)e.texImage2D(s.TEXTURE_2D,ut,ht,K,rt,0,at,yt,null),K>>=1,rt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in s){const K=s.canvas;if(K.hasAttribute("layoutsubtree")||K.setAttribute("layoutsubtree","true"),Z.parentNode!==K){K.appendChild(Z),d.add(_),K.onpaint=rt=>{const ut=rt.changedElements;for(const Q of d)ut.includes(Q.image)&&(Q.needsUpdate=!0)},K.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,Z);else{const ut=s.RGBA,Q=s.RGBA,St=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,ut,Q,St,Z)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(Tt.length>0){if(Lt&&Bt){const K=re(Tt[0]);e.texStorage2D(s.TEXTURE_2D,nt,ht,K.width,K.height)}for(let K=0,rt=Tt.length;K<rt;K++)ot=Tt[K],Lt?I&&e.texSubImage2D(s.TEXTURE_2D,K,0,0,at,yt,ot):e.texImage2D(s.TEXTURE_2D,K,ht,at,yt,ot);_.generateMipmaps=!1}else if(Lt){if(Bt){const K=re(Z);e.texStorage2D(s.TEXTURE_2D,nt,ht,K.width,K.height)}I&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,at,yt,Z)}else e.texImage2D(s.TEXTURE_2D,0,ht,at,yt,Z);f(_)&&y(H),st.__version=et.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function zt(R,_,O){if(_.image.length!==6)return;const H=$(R,_),q=_.source;e.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+O);const et=n.get(q);if(q.version!==et.__version||H===!0){e.activeTexture(s.TEXTURE0+O);const st=Jt.getPrimaries(Jt.workingColorSpace),Y=_.colorSpace===yi?null:Jt.getPrimaries(_.colorSpace),Z=_.colorSpace===yi||st===Y?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const at=_.isCompressedTexture||_.image[0].isCompressedTexture,yt=_.image[0]&&_.image[0].isDataTexture,ht=[];for(let Q=0;Q<6;Q++)!at&&!yt?ht[Q]=m(_.image[Q],!0,i.maxCubemapSize):ht[Q]=yt?_.image[Q].image:_.image[Q],ht[Q]=ke(_,ht[Q]);const ot=ht[0],Tt=r.convert(_.format,_.colorSpace),Lt=r.convert(_.type),Bt=M(_.internalFormat,Tt,Lt,_.normalized,_.colorSpace),I=_.isVideoTexture!==!0,nt=et.__version===void 0||H===!0,K=q.dataReady;let rt=T(_,ot);Zt(s.TEXTURE_CUBE_MAP,_);let ut;if(at){I&&nt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,rt,Bt,ot.width,ot.height);for(let Q=0;Q<6;Q++){ut=ht[Q].mipmaps;for(let St=0;St<ut.length;St++){const Mt=ut[St];_.format!==Rn?Tt!==null?I?K&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St,0,0,Mt.width,Mt.height,Tt,Mt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St,Bt,Mt.width,Mt.height,0,Mt.data):Ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):I?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St,0,0,Mt.width,Mt.height,Tt,Lt,Mt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St,Bt,Mt.width,Mt.height,0,Tt,Lt,Mt.data)}}}else{if(ut=_.mipmaps,I&&nt){ut.length>0&&rt++;const Q=re(ht[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,rt,Bt,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(yt){I?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ht[Q].width,ht[Q].height,Tt,Lt,ht[Q].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Bt,ht[Q].width,ht[Q].height,0,Tt,Lt,ht[Q].data);for(let St=0;St<ut.length;St++){const ee=ut[St].image[Q].image;I?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St+1,0,0,ee.width,ee.height,Tt,Lt,ee.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St+1,Bt,ee.width,ee.height,0,Tt,Lt,ee.data)}}else{I?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Tt,Lt,ht[Q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Bt,Tt,Lt,ht[Q]);for(let St=0;St<ut.length;St++){const Mt=ut[St];I?K&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St+1,0,0,Tt,Lt,Mt.image[Q]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,St+1,Bt,Tt,Lt,Mt.image[Q])}}}f(_)&&y(s.TEXTURE_CUBE_MAP),et.__version=q.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function Pt(R,_,O,H,q,et){const st=r.convert(O.format,O.colorSpace),Y=r.convert(O.type),Z=M(O.internalFormat,st,Y,O.normalized,O.colorSpace),at=n.get(_),yt=n.get(O);if(yt.__renderTarget=_,!at.__hasExternalTextures){const ht=Math.max(1,_.width>>et),ot=Math.max(1,_.height>>et);q===s.TEXTURE_3D||q===s.TEXTURE_2D_ARRAY?e.texImage3D(q,et,Z,ht,ot,_.depth,0,st,Y,null):e.texImage2D(q,et,Z,ht,ot,0,st,Y,null)}e.bindFramebuffer(s.FRAMEBUFFER,R),Se(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,H,q,yt.__webglTexture,0,fe(_)):(q===s.TEXTURE_2D||q>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,H,q,yt.__webglTexture,et),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ye(R,_,O){if(s.bindRenderbuffer(s.RENDERBUFFER,R),_.depthBuffer){const H=_.depthTexture,q=H&&H.isDepthTexture?H.type:null,et=C(_.stencilBuffer,q),st=_.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;Se(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,fe(_),et,_.width,_.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,fe(_),et,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,et,_.width,_.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,st,s.RENDERBUFFER,R)}else{const H=_.textures;for(let q=0;q<H.length;q++){const et=H[q],st=r.convert(et.format,et.colorSpace),Y=r.convert(et.type),Z=M(et.internalFormat,st,Y,et.normalized,et.colorSpace);Se(_)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,fe(_),Z,_.width,_.height):O?s.renderbufferStorageMultisample(s.RENDERBUFFER,fe(_),Z,_.width,_.height):s.renderbufferStorage(s.RENDERBUFFER,Z,_.width,_.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Gt(R,_,O){const H=_.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,R),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const q=n.get(_.depthTexture);if(q.__renderTarget=_,(!q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),H){if(q.__webglInit===void 0&&(q.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),q.__webglTexture===void 0){q.__webglTexture=s.createTexture(),e.bindTexture(s.TEXTURE_CUBE_MAP,q.__webglTexture),Zt(s.TEXTURE_CUBE_MAP,_.depthTexture);const at=r.convert(_.depthTexture.format),yt=r.convert(_.depthTexture.type);let ht;_.depthTexture.format===si?ht=s.DEPTH_COMPONENT24:_.depthTexture.format===Ni&&(ht=s.DEPTH24_STENCIL8);for(let ot=0;ot<6;ot++)s.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0,ht,_.width,_.height,0,at,yt,null)}}else J(_.depthTexture,0);const et=q.__webglTexture,st=fe(_),Y=H?s.TEXTURE_CUBE_MAP_POSITIVE_X+O:s.TEXTURE_2D,Z=_.depthTexture.format===Ni?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(_.depthTexture.format===si)Se(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Z,Y,et,0,st):s.framebufferTexture2D(s.FRAMEBUFFER,Z,Y,et,0);else if(_.depthTexture.format===Ni)Se(_)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Z,Y,et,0,st):s.framebufferTexture2D(s.FRAMEBUFFER,Z,Y,et,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ae(R){const _=n.get(R),O=R.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==R.depthTexture){const H=R.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),H){const q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,H.removeEventListener("dispose",q)};H.addEventListener("dispose",q),_.__depthDisposeCallback=q}_.__boundDepthTexture=H}if(R.depthTexture&&!_.__autoAllocateDepthBuffer)if(O)for(let H=0;H<6;H++)Gt(_.__webglFramebuffer[H],R,H);else{const H=R.texture.mipmaps;H&&H.length>0?Gt(_.__webglFramebuffer[0],R,0):Gt(_.__webglFramebuffer,R,0)}else if(O){_.__webglDepthbuffer=[];for(let H=0;H<6;H++)if(e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[H]),_.__webglDepthbuffer[H]===void 0)_.__webglDepthbuffer[H]=s.createRenderbuffer(),ye(_.__webglDepthbuffer[H],R,!1);else{const q=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,et=_.__webglDepthbuffer[H];s.bindRenderbuffer(s.RENDERBUFFER,et),s.framebufferRenderbuffer(s.FRAMEBUFFER,q,s.RENDERBUFFER,et)}}else{const H=R.texture.mipmaps;if(H&&H.length>0?e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=s.createRenderbuffer(),ye(_.__webglDepthbuffer,R,!1);else{const q=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,et=_.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,et),s.framebufferRenderbuffer(s.FRAMEBUFFER,q,s.RENDERBUFFER,et)}}e.bindFramebuffer(s.FRAMEBUFFER,null)}function te(R,_,O){const H=n.get(R);_!==void 0&&Pt(H.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),O!==void 0&&ae(R)}function Kt(R){const _=R.texture,O=n.get(R),H=n.get(_);R.addEventListener("dispose",x);const q=R.textures,et=R.isWebGLCubeRenderTarget===!0,st=q.length>1;if(st||(H.__webglTexture===void 0&&(H.__webglTexture=s.createTexture()),H.__version=_.version,a.memory.textures++),et){O.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[Y]=[];for(let Z=0;Z<_.mipmaps.length;Z++)O.__webglFramebuffer[Y][Z]=s.createFramebuffer()}else O.__webglFramebuffer[Y]=s.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let Y=0;Y<_.mipmaps.length;Y++)O.__webglFramebuffer[Y]=s.createFramebuffer()}else O.__webglFramebuffer=s.createFramebuffer();if(st)for(let Y=0,Z=q.length;Y<Z;Y++){const at=n.get(q[Y]);at.__webglTexture===void 0&&(at.__webglTexture=s.createTexture(),a.memory.textures++)}if(R.samples>0&&Se(R)===!1){O.__webglMultisampledFramebuffer=s.createFramebuffer(),O.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let Y=0;Y<q.length;Y++){const Z=q[Y];O.__webglColorRenderbuffer[Y]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,O.__webglColorRenderbuffer[Y]);const at=r.convert(Z.format,Z.colorSpace),yt=r.convert(Z.type),ht=M(Z.internalFormat,at,yt,Z.normalized,Z.colorSpace,R.isXRRenderTarget===!0),ot=fe(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,ot,ht,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Y,s.RENDERBUFFER,O.__webglColorRenderbuffer[Y])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(O.__webglDepthRenderbuffer=s.createRenderbuffer(),ye(O.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(et){e.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture),Zt(s.TEXTURE_CUBE_MAP,_);for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)Pt(O.__webglFramebuffer[Y][Z],R,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,Z);else Pt(O.__webglFramebuffer[Y],R,_,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);f(_)&&y(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(st){for(let Y=0,Z=q.length;Y<Z;Y++){const at=q[Y],yt=n.get(at);let ht=s.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ht=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(ht,yt.__webglTexture),Zt(ht,at),Pt(O.__webglFramebuffer,R,at,s.COLOR_ATTACHMENT0+Y,ht,0),f(at)&&y(ht)}e.unbindTexture()}else{let Y=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Y=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Y,H.__webglTexture),Zt(Y,_),_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)Pt(O.__webglFramebuffer[Z],R,_,s.COLOR_ATTACHMENT0,Y,Z);else Pt(O.__webglFramebuffer,R,_,s.COLOR_ATTACHMENT0,Y,0);f(_)&&y(Y),e.unbindTexture()}R.depthBuffer&&ae(R)}function be(R){const _=R.textures;for(let O=0,H=_.length;O<H;O++){const q=_[O];if(f(q)){const et=A(R),st=n.get(q).__webglTexture;e.bindTexture(et,st),y(et),e.unbindTexture()}}}const Te=[],Pe=[];function Le(R){if(R.samples>0){if(Se(R)===!1){const _=R.textures,O=R.width,H=R.height;let q=s.COLOR_BUFFER_BIT;const et=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,st=n.get(R),Y=_.length>1;if(Y)for(let at=0;at<_.length;at++)e.bindFramebuffer(s.FRAMEBUFFER,st.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,st.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,st.__webglMultisampledFramebuffer);const Z=R.texture.mipmaps;Z&&Z.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,st.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,st.__webglFramebuffer);for(let at=0;at<_.length;at++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(q|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(q|=s.STENCIL_BUFFER_BIT)),Y){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,st.__webglColorRenderbuffer[at]);const yt=n.get(_[at]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,yt,0)}s.blitFramebuffer(0,0,O,H,0,0,O,H,q,s.NEAREST),c===!0&&(Te.length=0,Pe.length=0,Te.push(s.COLOR_ATTACHMENT0+at),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Te.push(et),Pe.push(et),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Pe)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Te))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Y)for(let at=0;at<_.length;at++){e.bindFramebuffer(s.FRAMEBUFFER,st.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.RENDERBUFFER,st.__webglColorRenderbuffer[at]);const yt=n.get(_[at]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,st.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+at,s.TEXTURE_2D,yt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,st.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&c){const _=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[_])}}}function fe(R){return Math.min(i.maxSamples,R.samples)}function Se(R){const _=n.get(R);return R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function U(R){const _=a.render.frame;h.get(R)!==_&&(h.set(R,_),R.update())}function ke(R,_){const O=R.colorSpace,H=R.format,q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||O!==Yr&&O!==yi&&(Jt.getTransfer(O)===ue?(H!==Rn||q!==pn)&&Ot("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):se("WebGLTextures: Unsupported texture color space:",O)),_}function re(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=X,this.resetTextureUnits=B,this.getTextureUnits=W,this.setTextureUnits=N,this.setTexture2D=J,this.setTexture2DArray=j,this.setTexture3D=lt,this.setTextureCube=dt,this.rebindTextures=te,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=be,this.updateMultisampleRenderTarget=Le,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=Pt,this.useMultisampledRTT=Se,this.isReversedDepthBuffer=function(){return e.buffers.depth.getReversed()}}function Pg(s,t){function e(n,i=yi){let r;const a=Jt.getTransfer(i);if(n===pn)return s.UNSIGNED_BYTE;if(n===sl)return s.UNSIGNED_SHORT_4_4_4_4;if(n===rl)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Sh)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===bh)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Mh)return s.BYTE;if(n===yh)return s.SHORT;if(n===zs)return s.UNSIGNED_SHORT;if(n===il)return s.INT;if(n===Vn)return s.UNSIGNED_INT;if(n===Cn)return s.FLOAT;if(n===ii)return s.HALF_FLOAT;if(n===Eh)return s.ALPHA;if(n===wh)return s.RGB;if(n===Rn)return s.RGBA;if(n===si)return s.DEPTH_COMPONENT;if(n===Ni)return s.DEPTH_STENCIL;if(n===al)return s.RED;if(n===ol)return s.RED_INTEGER;if(n===Oi)return s.RG;if(n===ll)return s.RG_INTEGER;if(n===cl)return s.RGBA_INTEGER;if(n===Or||n===Br||n===zr||n===kr)if(a===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Or)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===zr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===kr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Or)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===zr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===kr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===mo||n===go||n===_o||n===xo)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===mo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===go)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===_o)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===xo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===vo||n===Mo||n===yo||n===So||n===bo||n===Xr||n===Eo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===vo||n===Mo)return a===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===yo)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===So)return r.COMPRESSED_R11_EAC;if(n===bo)return r.COMPRESSED_SIGNED_R11_EAC;if(n===Xr)return r.COMPRESSED_RG11_EAC;if(n===Eo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===wo||n===To||n===Ao||n===Co||n===Ro||n===Po||n===Lo||n===Io||n===Do||n===Uo||n===No||n===Fo||n===Oo||n===Bo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===wo)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===To)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ao)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Co)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ro)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Po)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Lo)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Io)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Do)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Uo)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===No)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Fo)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Oo)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Bo)return a===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===zo||n===ko||n===Ho)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===zo)return a===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ko)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ho)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Go||n===Vo||n===qr||n===Wo)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Go)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Vo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===qr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Wo)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ks?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const Lg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ig=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Dg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Fh(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new Wn({vertexShader:Lg,fragmentShader:Ig,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new oe(new Pn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Ug extends Bi{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,p=null,g=null;const b=typeof XRWebGLBinding<"u",m=new Dg,f={},y=e.getContextAttributes();let A=null,M=null;const C=[],T=[],P=new Xt;let x=null;const v=new xn;v.viewport=new we;const E=new xn;E.viewport=new we;const w=[v,E],L=new Vd;let B=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let it=C[$];return it===void 0&&(it=new da,C[$]=it),it.getTargetRaySpace()},this.getControllerGrip=function($){let it=C[$];return it===void 0&&(it=new da,C[$]=it),it.getGripSpace()},this.getHand=function($){let it=C[$];return it===void 0&&(it=new da,C[$]=it),it.getHandSpace()};function N($){const it=T.indexOf($.inputSource);if(it===-1)return;const tt=C[it];tt!==void 0&&(tt.update($.inputSource,$.frame,l||a),tt.dispatchEvent({type:$.type,data:$.inputSource}))}function X(){i.removeEventListener("select",N),i.removeEventListener("selectstart",N),i.removeEventListener("selectend",N),i.removeEventListener("squeeze",N),i.removeEventListener("squeezestart",N),i.removeEventListener("squeezeend",N),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",G);for(let $=0;$<C.length;$++){const it=T[$];it!==null&&(T[$]=null,C[$].disconnect(it))}B=null,W=null,m.reset();for(const $ in f)delete f[$];t.setRenderTarget(A),p=null,u=null,d=null,i=null,M=null,Zt.stop(),n.isPresenting=!1,t.setPixelRatio(x),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&Ot("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&Ot("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return d===null&&b&&(d=new XRWebGLBinding(i,e)),d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(A=t.getRenderTarget(),i.addEventListener("select",N),i.addEventListener("selectstart",N),i.addEventListener("selectend",N),i.addEventListener("squeeze",N),i.addEventListener("squeezestart",N),i.addEventListener("squeezeend",N),i.addEventListener("end",X),i.addEventListener("inputsourceschange",G),y.xrCompatible!==!0&&await e.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(P),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let tt=null,Nt=null,zt=null;y.depth&&(zt=y.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,tt=y.stencil?Ni:si,Nt=y.stencil?ks:Vn);const Pt={colorFormat:e.RGBA8,depthFormat:zt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Pt),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),M=new Gn(u.textureWidth,u.textureHeight,{format:Rn,type:pn,depthTexture:new gs(u.textureWidth,u.textureHeight,Nt,void 0,void 0,void 0,void 0,void 0,void 0,tt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const tt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,tt),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),M=new Gn(p.framebufferWidth,p.framebufferHeight,{format:Rn,type:pn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Zt.setContext(i),Zt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function G($){for(let it=0;it<$.removed.length;it++){const tt=$.removed[it],Nt=T.indexOf(tt);Nt>=0&&(T[Nt]=null,C[Nt].disconnect(tt))}for(let it=0;it<$.added.length;it++){const tt=$.added[it];let Nt=T.indexOf(tt);if(Nt===-1){for(let Pt=0;Pt<C.length;Pt++)if(Pt>=T.length){T.push(tt),Nt=Pt;break}else if(T[Pt]===null){T[Pt]=tt,Nt=Pt;break}if(Nt===-1)break}const zt=C[Nt];zt&&zt.connect(tt)}}const J=new D,j=new D;function lt($,it,tt){J.setFromMatrixPosition(it.matrixWorld),j.setFromMatrixPosition(tt.matrixWorld);const Nt=J.distanceTo(j),zt=it.projectionMatrix.elements,Pt=tt.projectionMatrix.elements,ye=zt[14]/(zt[10]-1),Gt=zt[14]/(zt[10]+1),ae=(zt[9]+1)/zt[5],te=(zt[9]-1)/zt[5],Kt=(zt[8]-1)/zt[0],be=(Pt[8]+1)/Pt[0],Te=ye*Kt,Pe=ye*be,Le=Nt/(-Kt+be),fe=Le*-Kt;if(it.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(fe),$.translateZ(Le),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),zt[10]===-1)$.projectionMatrix.copy(it.projectionMatrix),$.projectionMatrixInverse.copy(it.projectionMatrixInverse);else{const Se=ye+Le,U=Gt+Le,ke=Te-fe,re=Pe+(Nt-fe),R=ae*Gt/U*Se,_=te*Gt/U*Se;$.projectionMatrix.makePerspective(ke,re,R,_,Se,U),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function dt($,it){it===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(it.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let it=$.near,tt=$.far;m.texture!==null&&(m.depthNear>0&&(it=m.depthNear),m.depthFar>0&&(tt=m.depthFar)),L.near=E.near=v.near=it,L.far=E.far=v.far=tt,(B!==L.near||W!==L.far)&&(i.updateRenderState({depthNear:L.near,depthFar:L.far}),B=L.near,W=L.far),L.layers.mask=$.layers.mask|6,v.layers.mask=L.layers.mask&-5,E.layers.mask=L.layers.mask&-3;const Nt=$.parent,zt=L.cameras;dt(L,Nt);for(let Pt=0;Pt<zt.length;Pt++)dt(zt[Pt],Nt);zt.length===2?lt(L,v,E):L.projectionMatrix.copy(v.projectionMatrix),xt($,L,Nt)};function xt($,it,tt){tt===null?$.matrix.copy(it.matrixWorld):($.matrix.copy(tt.matrixWorld),$.matrix.invert(),$.matrix.multiply(it.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(it.projectionMatrix),$.projectionMatrixInverse.copy(it.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=qo*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return L},this.getFoveation=function(){if(!(u===null&&p===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(L)},this.getCameraTexture=function($){return f[$]};let jt=null;function xe($,it){if(h=it.getViewerPose(l||a),g=it,h!==null){const tt=h.views;p!==null&&(t.setRenderTargetFramebuffer(M,p.framebuffer),t.setRenderTarget(M));let Nt=!1;tt.length!==L.cameras.length&&(L.cameras.length=0,Nt=!0);for(let Gt=0;Gt<tt.length;Gt++){const ae=tt[Gt];let te=null;if(p!==null)te=p.getViewport(ae);else{const be=d.getViewSubImage(u,ae);te=be.viewport,Gt===0&&(t.setRenderTargetTextures(M,be.colorTexture,be.depthStencilTexture),t.setRenderTarget(M))}let Kt=w[Gt];Kt===void 0&&(Kt=new xn,Kt.layers.enable(Gt),Kt.viewport=new we,w[Gt]=Kt),Kt.matrix.fromArray(ae.transform.matrix),Kt.matrix.decompose(Kt.position,Kt.quaternion,Kt.scale),Kt.projectionMatrix.fromArray(ae.projectionMatrix),Kt.projectionMatrixInverse.copy(Kt.projectionMatrix).invert(),Kt.viewport.set(te.x,te.y,te.width,te.height),Gt===0&&(L.matrix.copy(Kt.matrix),L.matrix.decompose(L.position,L.quaternion,L.scale)),Nt===!0&&L.cameras.push(Kt)}const zt=i.enabledFeatures;if(zt&&zt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&b){d=n.getBinding();const Gt=d.getDepthInformation(tt[0]);Gt&&Gt.isValid&&Gt.texture&&m.init(Gt,i.renderState)}if(zt&&zt.includes("camera-access")&&b){t.state.unbindTexture(),d=n.getBinding();for(let Gt=0;Gt<tt.length;Gt++){const ae=tt[Gt].camera;if(ae){let te=f[ae];te||(te=new Fh,f[ae]=te);const Kt=d.getCameraImage(ae);te.sourceTexture=Kt}}}}for(let tt=0;tt<C.length;tt++){const Nt=T[tt],zt=C[tt];Nt!==null&&zt!==void 0&&zt.update(Nt,it,l||a)}jt&&jt($,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}const Zt=new kh;Zt.setAnimationLoop(xe),this.setAnimationLoop=function($){jt=$},this.dispose=function(){}}}const Ng=new qt,Yh=new kt;Yh.set(-1,0,0,0,1,0,0,0,1);function Fg(s,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Oh(s)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function i(m,f,y,A,M){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?r(m,f):f.isMeshLambertMaterial?(r(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(m,f),d(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,M)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),b(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?c(m,f,y,A):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===on&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===on&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const y=t.get(f),A=y.envMap,M=y.envMapRotation;A&&(m.envMap.value=A,m.envMapRotation.value.setFromMatrix4(Ng.makeRotationFromEuler(M)).transpose(),A.isCubeTexture&&A.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Yh),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,y,A){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*y,m.scale.value=A*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function d(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,y){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===on&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function b(m,f){const y=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Og(s,t,e,n){let i={},r={},a=[];const o=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,C){const T=C.program;n.uniformBlockBinding(M,T)}function l(M,C){let T=i[M.id];T===void 0&&(m(M),T=h(M),i[M.id]=T,M.addEventListener("dispose",y));const P=C.program;n.updateUBOMapping(M,P);const x=t.render.frame;r[M.id]!==x&&(u(M),r[M.id]=x)}function h(M){const C=d();M.__bindingPointIndex=C;const T=s.createBuffer(),P=M.__size,x=M.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,P,x),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,C,T),T}function d(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return se("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const C=i[M.id],T=M.uniforms,P=M.__cache;s.bindBuffer(s.UNIFORM_BUFFER,C);for(let x=0,v=T.length;x<v;x++){const E=T[x];if(Array.isArray(E))for(let w=0,L=E.length;w<L;w++)p(E[w],x,w,P);else p(E,x,0,P)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function p(M,C,T,P){if(b(M,C,T,P)===!0){const x=M.__offset,v=M.value;if(Array.isArray(v)){let E=0;for(let w=0;w<v.length;w++){const L=v[w],B=f(L);g(L,M.__data,E),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(E+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(v,M.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,x,M.__data)}}function g(M,C,T){typeof M=="number"||typeof M=="boolean"?C[0]=M:M.isMatrix3?(C[0]=M.elements[0],C[1]=M.elements[1],C[2]=M.elements[2],C[3]=0,C[4]=M.elements[3],C[5]=M.elements[4],C[6]=M.elements[5],C[7]=0,C[8]=M.elements[6],C[9]=M.elements[7],C[10]=M.elements[8],C[11]=0):ArrayBuffer.isView(M)?C.set(new M.constructor(M.buffer,M.byteOffset,C.length)):M.toArray(C,T)}function b(M,C,T,P){const x=M.value,v=C+"_"+T;if(P[v]===void 0)return typeof x=="number"||typeof x=="boolean"?P[v]=x:ArrayBuffer.isView(x)?P[v]=x.slice():P[v]=x.clone(),!0;{const E=P[v];if(typeof x=="number"||typeof x=="boolean"){if(E!==x)return P[v]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(E.equals(x)===!1)return E.copy(x),!0}}return!1}function m(M){const C=M.uniforms;let T=0;const P=16;for(let v=0,E=C.length;v<E;v++){const w=Array.isArray(C[v])?C[v]:[C[v]];for(let L=0,B=w.length;L<B;L++){const W=w[L],N=Array.isArray(W.value)?W.value:[W.value];for(let X=0,G=N.length;X<G;X++){const J=N[X],j=f(J),lt=T%P,dt=lt%j.boundary,xt=lt+dt;T+=dt,xt!==0&&P-xt<j.storage&&(T+=P-xt),W.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=T,T+=j.storage}}}const x=T%P;return x>0&&(T+=P-x),M.__size=T,M.__cache={},this}function f(M){const C={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(C.boundary=4,C.storage=4):M.isVector2?(C.boundary=8,C.storage=8):M.isVector3||M.isColor?(C.boundary=16,C.storage=12):M.isVector4?(C.boundary=16,C.storage=16):M.isMatrix3?(C.boundary=48,C.storage=48):M.isMatrix4?(C.boundary=64,C.storage=64):M.isTexture?Ot("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(M)?(C.boundary=16,C.storage=M.byteLength):Ot("WebGLRenderer: Unsupported uniform value type.",M),C}function y(M){const C=M.target;C.removeEventListener("dispose",y);const T=a.indexOf(C.__bindingPointIndex);a.splice(T,1),s.deleteBuffer(i[C.id]),delete i[C.id],delete r[C.id]}function A(){for(const M in i)s.deleteBuffer(i[M]);a=[],i={},r={}}return{bind:c,update:l,dispose:A}}const Bg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Nn=null;function zg(){return Nn===null&&(Nn=new Dh(Bg,16,16,Oi,ii),Nn.name="DFG_LUT",Nn.minFilter=$e,Nn.magFilter=$e,Nn.wrapS=Jn,Nn.wrapT=Jn,Nn.generateMipmaps=!1,Nn.needsUpdate=!0),Nn}class kg{constructor(t={}){const{canvas:e=nd(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:p=pn}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const b=p,m=new Set([cl,ll,ol]),f=new Set([pn,Vn,zs,ks,sl,rl]),y=new Uint32Array(4),A=new Int32Array(4),M=new D;let C=null,T=null;const P=[],x=[];let v=null;this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Hn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let w=!1,L=null,B=null,W=null,N=null;this._outputColorSpace=Ze;let X=0,G=0,J=null,j=-1,lt=null;const dt=new we,xt=new we;let jt=null;const xe=new wt(0);let Zt=0,$=e.width,it=e.height,tt=1,Nt=null,zt=null;const Pt=new we(0,0,$,it),ye=new we(0,0,$,it);let Gt=!1;const ae=new pl;let te=!1,Kt=!1;const be=new qt,Te=new D,Pe=new we,Le={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let fe=!1;function Se(){return J===null?tt:1}let U=n;function ke(S,F){return e.getContext(S,F)}try{const S={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${el}`),e.addEventListener("webglcontextlost",ee,!1),e.addEventListener("webglcontextrestored",le,!1),e.addEventListener("webglcontextcreationerror",ln,!1),U===null){const F="webgl2";if(U=ke(F,S),U===null)throw ke(F)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(S){throw se("WebGLRenderer: "+S.message),S}let re,R,_,O,H,q,et,st,Y,Z,at,yt,ht,ot,Tt,Lt,Bt,I,nt,K,rt,ut,Q;function St(){re=new zm(U),re.init(),rt=new Pg(U,re),R=new Lm(U,re,t,rt),_=new Cg(U,re),R.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),B=U.createFramebuffer(),W=U.createFramebuffer(),N=U.createFramebuffer(),O=new Gm(U),H=new pg,q=new Rg(U,re,_,H,R,rt,O),et=new Bm(E),st=new Xd(U),ut=new Rm(U,st),Y=new km(U,st,O,ut),Z=new Wm(U,Y,st,ut,O),I=new Vm(U,R,q),Tt=new Im(H),at=new fg(E,et,re,R,ut,Tt),yt=new Fg(E,H),ht=new gg,ot=new Sg(re),Bt=new Cm(E,et,_,Z,g,c),Lt=new Ag(E,Z,R),Q=new Og(U,O,R,_),nt=new Pm(U,re,O),K=new Hm(U,re,O),O.programs=at.programs,E.capabilities=R,E.extensions=re,E.properties=H,E.renderLists=ht,E.shadowMap=Lt,E.state=_,E.info=O}St(),b!==pn&&(v=new qm(b,e.width,e.height,o,i,r));const Mt=new Ug(E,U);this.xr=Mt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const S=re.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=re.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return tt},this.setPixelRatio=function(S){S!==void 0&&(tt=S,this.setSize($,it,!1))},this.getSize=function(S){return S.set($,it)},this.setSize=function(S,F,V=!0){if(Mt.isPresenting){Ot("WebGLRenderer: Can't change size while VR device is presenting.");return}$=S,it=F,e.width=Math.floor(S*tt),e.height=Math.floor(F*tt),V===!0&&(e.style.width=S+"px",e.style.height=F+"px"),v!==null&&v.setSize(e.width,e.height),this.setViewport(0,0,S,F)},this.getDrawingBufferSize=function(S){return S.set($*tt,it*tt).floor()},this.setDrawingBufferSize=function(S,F,V){$=S,it=F,tt=V,e.width=Math.floor(S*V),e.height=Math.floor(F*V),this.setViewport(0,0,S,F)},this.setEffects=function(S){if(b===pn){se("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let F=0;F<S.length;F++)if(S[F].isOutputPass===!0){Ot("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(dt)},this.getViewport=function(S){return S.copy(Pt)},this.setViewport=function(S,F,V,z){S.isVector4?Pt.set(S.x,S.y,S.z,S.w):Pt.set(S,F,V,z),_.viewport(dt.copy(Pt).multiplyScalar(tt).round())},this.getScissor=function(S){return S.copy(ye)},this.setScissor=function(S,F,V,z){S.isVector4?ye.set(S.x,S.y,S.z,S.w):ye.set(S,F,V,z),_.scissor(xt.copy(ye).multiplyScalar(tt).round())},this.getScissorTest=function(){return Gt},this.setScissorTest=function(S){_.setScissorTest(Gt=S)},this.setOpaqueSort=function(S){Nt=S},this.setTransparentSort=function(S){zt=S},this.getClearColor=function(S){return S.copy(Bt.getClearColor())},this.setClearColor=function(){Bt.setClearColor(...arguments)},this.getClearAlpha=function(){return Bt.getClearAlpha()},this.setClearAlpha=function(){Bt.setClearAlpha(...arguments)},this.clear=function(S=!0,F=!0,V=!0){let z=0;if(S){let k=!1;if(J!==null){const mt=J.texture.format;k=m.has(mt)}if(k){const mt=J.texture.type,vt=f.has(mt),pt=Bt.getClearColor(),Et=Bt.getClearAlpha(),At=pt.r,Ht=pt.g,Wt=pt.b;vt?(y[0]=At,y[1]=Ht,y[2]=Wt,y[3]=Et,U.clearBufferuiv(U.COLOR,0,y)):(A[0]=At,A[1]=Ht,A[2]=Wt,A[3]=Et,U.clearBufferiv(U.COLOR,0,A))}else z|=U.COLOR_BUFFER_BIT}F&&(z|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),V&&(z|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z!==0&&U.clear(z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),L=S},this.dispose=function(){e.removeEventListener("webglcontextlost",ee,!1),e.removeEventListener("webglcontextrestored",le,!1),e.removeEventListener("webglcontextcreationerror",ln,!1),Bt.dispose(),ht.dispose(),ot.dispose(),H.dispose(),et.dispose(),Z.dispose(),ut.dispose(),Q.dispose(),at.dispose(),Mt.dispose(),Mt.removeEventListener("sessionstart",bt),Mt.removeEventListener("sessionend",Dt),Ut.stop()};function ee(S){S.preventDefault(),Ol("WebGLRenderer: Context Lost."),w=!0}function le(){Ol("WebGLRenderer: Context Restored."),w=!1;const S=O.autoReset,F=Lt.enabled,V=Lt.autoUpdate,z=Lt.needsUpdate,k=Lt.type;St(),O.autoReset=S,Lt.enabled=F,Lt.autoUpdate=V,Lt.needsUpdate=z,Lt.type=k}function ln(S){se("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function He(S){const F=S.target;F.removeEventListener("dispose",He),Ws(F)}function Ws(S){ki(S),H.remove(S)}function ki(S){const F=H.get(S).programs;F!==void 0&&(F.forEach(function(V){at.releaseProgram(V)}),S.isShaderMaterial&&at.releaseShaderCache(S))}this.renderBufferDirect=function(S,F,V,z,k,mt){F===null&&(F=Le);const vt=k.isMesh&&k.matrixWorld.determinantAffine()<0,pt=ai(S,F,V,z,k);_.setMaterial(z,vt);let Et=V.index,At=1;if(z.wireframe===!0){if(Et=Y.getWireframeAttribute(V),Et===void 0)return;At=2}const Ht=V.drawRange,Wt=V.attributes.position;let Rt=Ht.start*At,de=(Ht.start+Ht.count)*At;mt!==null&&(Rt=Math.max(Rt,mt.start*At),de=Math.min(de,(mt.start+mt.count)*At)),Et!==null?(Rt=Math.max(Rt,0),de=Math.min(de,Et.count)):Wt!=null&&(Rt=Math.max(Rt,0),de=Math.min(de,Wt.count));const Ie=de-Rt;if(Ie<0||Ie===1/0)return;ut.setup(k,z,pt,V,Et);let Re,pe=nt;if(Et!==null&&(Re=st.get(Et),pe=K,pe.setIndex(Re)),k.isMesh)z.wireframe===!0?(_.setLineWidth(z.wireframeLinewidth*Se()),pe.setMode(U.LINES)):pe.setMode(U.TRIANGLES);else if(k.isLine){let qe=z.linewidth;qe===void 0&&(qe=1),_.setLineWidth(qe*Se()),k.isLineSegments?pe.setMode(U.LINES):k.isLineLoop?pe.setMode(U.LINE_LOOP):pe.setMode(U.LINE_STRIP)}else k.isPoints?pe.setMode(U.POINTS):k.isSprite&&pe.setMode(U.TRIANGLES);if(k.isBatchedMesh)if(re.get("WEBGL_multi_draw"))pe.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const qe=k._multiDrawStarts,_t=k._multiDrawCounts,un=k._multiDrawCount,ie=Et?st.get(Et).bytesPerElement:1,mn=H.get(z).currentProgram.getUniforms();for(let Dn=0;Dn<un;Dn++)mn.setValue(U,"_gl_DrawID",Dn),pe.render(qe[Dn]/ie,_t[Dn])}else if(k.isInstancedMesh)pe.renderInstances(Rt,Ie,k.count);else if(V.isInstancedBufferGeometry){const qe=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,_t=Math.min(V.instanceCount,qe);pe.renderInstances(Rt,Ie,_t)}else pe.render(Rt,Ie)};function Ss(S,F,V){S.transparent===!0&&S.side===Tn&&S.forceSinglePass===!1?(S.side=on,S.needsUpdate=!0,nn(S,F,V),S.side=bi,S.needsUpdate=!0,nn(S,F,V),S.side=Tn):nn(S,F,V)}this.compile=function(S,F,V=null){V===null&&(V=S),T=ot.get(V),T.init(F),x.push(T),V.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),S!==V&&S.traverseVisible(function(k){k.isLight&&k.layers.test(F.layers)&&(T.pushLight(k),k.castShadow&&T.pushShadow(k))}),T.setupLights();const z=new Set;return S.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const mt=k.material;if(mt)if(Array.isArray(mt))for(let vt=0;vt<mt.length;vt++){const pt=mt[vt];Ss(pt,V,k),z.add(pt)}else Ss(mt,V,k),z.add(mt)}),T=x.pop(),z},this.compileAsync=function(S,F,V=null){const z=this.compile(S,F,V);return new Promise(k=>{function mt(){if(z.forEach(function(vt){H.get(vt).currentProgram.isReady()&&z.delete(vt)}),z.size===0){k(S);return}setTimeout(mt,10)}re.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let ct=null;function Ct(S){ct&&ct(S)}function bt(){Ut.stop()}function Dt(){Ut.start()}const Ut=new kh;Ut.setAnimationLoop(Ct),typeof self<"u"&&Ut.setContext(self),this.setAnimationLoop=function(S){ct=S,Mt.setAnimationLoop(S),S===null?Ut.stop():Ut.start()},Mt.addEventListener("sessionstart",bt),Mt.addEventListener("sessionend",Dt),this.render=function(S,F){if(F!==void 0&&F.isCamera!==!0){se("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;L!==null&&L.renderStart(S,F);const V=Mt.enabled===!0&&Mt.isPresenting===!0,z=v!==null&&(J===null||V)&&v.begin(E,J);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),F.parent===null&&F.matrixWorldAutoUpdate===!0&&F.updateMatrixWorld(),Mt.enabled===!0&&Mt.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(Mt.cameraAutoUpdate===!0&&Mt.updateCamera(F),F=Mt.getCamera()),S.isScene===!0&&S.onBeforeRender(E,S,F,J),T=ot.get(S,x.length),T.init(F),T.state.textureUnits=q.getTextureUnits(),x.push(T),be.multiplyMatrices(F.projectionMatrix,F.matrixWorldInverse),ae.setFromProjectionMatrix(be,kn,F.reversedDepth),Kt=this.localClippingEnabled,te=Tt.init(this.clippingPlanes,Kt),C=ht.get(S,P.length),C.init(),P.push(C),Mt.enabled===!0&&Mt.isPresenting===!0){const vt=E.xr.getDepthSensingMesh();vt!==null&&$t(vt,F,-1/0,E.sortObjects)}$t(S,F,0,E.sortObjects),C.finish(),E.sortObjects===!0&&C.sort(Nt,zt,F.reversedDepth),fe=Mt.enabled===!1||Mt.isPresenting===!1||Mt.hasDepthSensing()===!1,fe&&Bt.addToRenderList(C,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),te===!0&&Tt.beginShadows();const k=T.state.shadowsArray;if(Lt.render(k,S,F),te===!0&&Tt.endShadows(),(z&&v.hasRenderPass())===!1){const vt=C.opaque,pt=C.transmissive;if(T.setupLights(),F.isArrayCamera){const Et=F.cameras;if(pt.length>0)for(let At=0,Ht=Et.length;At<Ht;At++){const Wt=Et[At];Ae(vt,pt,S,Wt)}fe&&Bt.render(S);for(let At=0,Ht=Et.length;At<Ht;At++){const Wt=Et[At];ce(C,S,Wt,Wt.viewport)}}else pt.length>0&&Ae(vt,pt,S,F),fe&&Bt.render(S),ce(C,S,F)}J!==null&&G===0&&(q.updateMultisampleRenderTarget(J),q.updateRenderTargetMipmap(J)),z&&v.end(E),S.isScene===!0&&S.onAfterRender(E,S,F),ut.resetDefaultState(),j=-1,lt=null,x.pop(),x.length>0?(T=x[x.length-1],q.setTextureUnits(T.state.textureUnits),te===!0&&Tt.setGlobalState(E.clippingPlanes,T.state.camera)):T=null,P.pop(),P.length>0?C=P[P.length-1]:C=null,L!==null&&L.renderEnd()};function $t(S,F,V,z){if(S.visible===!1)return;if(S.layers.test(F.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(F);else if(S.isLightProbeGrid)T.pushLightProbeGrid(S);else if(S.isLight)T.pushLight(S),S.castShadow&&T.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||ae.intersectsSprite(S)){z&&Pe.setFromMatrixPosition(S.matrixWorld).applyMatrix4(be);const vt=Z.update(S),pt=S.material;pt.visible&&C.push(S,vt,pt,V,Pe.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||ae.intersectsObject(S))){const vt=Z.update(S),pt=S.material;if(z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Pe.copy(S.boundingSphere.center)):(vt.boundingSphere===null&&vt.computeBoundingSphere(),Pe.copy(vt.boundingSphere.center)),Pe.applyMatrix4(S.matrixWorld).applyMatrix4(be)),Array.isArray(pt)){const Et=vt.groups;for(let At=0,Ht=Et.length;At<Ht;At++){const Wt=Et[At],Rt=pt[Wt.materialIndex];Rt&&Rt.visible&&C.push(S,vt,Rt,V,Pe.z,Wt)}}else pt.visible&&C.push(S,vt,pt,V,Pe.z,null)}}const mt=S.children;for(let vt=0,pt=mt.length;vt<pt;vt++)$t(mt[vt],F,V,z)}function ce(S,F,V,z){const{opaque:k,transmissive:mt,transparent:vt}=S;T.setupLightsView(V),te===!0&&Tt.setGlobalState(E.clippingPlanes,V),z&&_.viewport(dt.copy(z)),k.length>0&&Ce(k,F,V),mt.length>0&&Ce(mt,F,V),vt.length>0&&Ce(vt,F,V),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Ae(S,F,V,z){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[z.id]===void 0){const Rt=re.has("EXT_color_buffer_half_float")||re.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[z.id]=new Gn(1,1,{generateMipmaps:!0,type:Rt?ii:pn,minFilter:Ui,samples:Math.max(4,R.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Jt.workingColorSpace})}const mt=T.state.transmissionRenderTarget[z.id],vt=z.viewport||dt;mt.setSize(vt.z*E.transmissionResolutionScale,vt.w*E.transmissionResolutionScale);const pt=E.getRenderTarget(),Et=E.getActiveCubeFace(),At=E.getActiveMipmapLevel();E.setRenderTarget(mt),E.getClearColor(xe),Zt=E.getClearAlpha(),Zt<1&&E.setClearColor(16777215,.5),E.clear(),fe&&Bt.render(V);const Ht=E.toneMapping;E.toneMapping=Hn;const Wt=z.viewport;if(z.viewport!==void 0&&(z.viewport=void 0),T.setupLightsView(z),te===!0&&Tt.setGlobalState(E.clippingPlanes,z),Ce(S,V,z),q.updateMultisampleRenderTarget(mt),q.updateRenderTargetMipmap(mt),re.has("WEBGL_multisampled_render_to_texture")===!1){let Rt=!1;for(let de=0,Ie=F.length;de<Ie;de++){const Re=F[de],{object:pe,geometry:qe,material:_t,group:un}=Re;if(_t.side===Tn&&pe.layers.test(z.layers)){const ie=_t.side;_t.side=on,_t.needsUpdate=!0,cn(pe,V,z,qe,_t,un),_t.side=ie,_t.needsUpdate=!0,Rt=!0}}Rt===!0&&(q.updateMultisampleRenderTarget(mt),q.updateRenderTargetMipmap(mt))}E.setRenderTarget(pt,Et,At),E.setClearColor(xe,Zt),Wt!==void 0&&(z.viewport=Wt),E.toneMapping=Ht}function Ce(S,F,V){const z=F.isScene===!0?F.overrideMaterial:null;for(let k=0,mt=S.length;k<mt;k++){const vt=S[k],{object:pt,geometry:Et,group:At}=vt;let Ht=vt.material;Ht.allowOverride===!0&&z!==null&&(Ht=z),pt.layers.test(V.layers)&&cn(pt,F,V,Et,Ht,At)}}function cn(S,F,V,z,k,mt){S.onBeforeRender(E,F,V,z,k,mt),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),k.onBeforeRender(E,F,V,z,S,mt),k.transparent===!0&&k.side===Tn&&k.forceSinglePass===!1?(k.side=on,k.needsUpdate=!0,E.renderBufferDirect(V,F,z,k,S,mt),k.side=bi,k.needsUpdate=!0,E.renderBufferDirect(V,F,z,k,S,mt),k.side=Tn):E.renderBufferDirect(V,F,z,k,S,mt),S.onAfterRender(E,F,V,z,k,mt)}function nn(S,F,V){F.isScene!==!0&&(F=Le);const z=H.get(S),k=T.state.lights,mt=T.state.shadowsArray,vt=k.state.version,pt=at.getParameters(S,k.state,mt,F,V,T.state.lightProbeGridArray),Et=at.getProgramCacheKey(pt);let At=z.programs;z.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?F.environment:null,z.fog=F.fog;const Ht=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;z.envMap=et.get(S.envMap||z.environment,Ht),z.envMapRotation=z.environment!==null&&S.envMap===null?F.environmentRotation:S.envMapRotation,At===void 0&&(S.addEventListener("dispose",He),At=new Map,z.programs=At);let Wt=At.get(Et);if(Wt!==void 0){if(z.currentProgram===Wt&&z.lightsStateVersion===vt)return ri(S,pt),Wt}else pt.uniforms=at.getUniforms(S),L!==null&&S.isNodeMaterial&&L.build(S,V,pt),S.onBeforeCompile(pt,E),Wt=at.acquireProgram(pt,Et),At.set(Et,Wt),z.uniforms=pt.uniforms;const Rt=z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Rt.clippingPlanes=Tt.uniform),ri(S,pt),z.needsLights=Zh(S),z.lightsStateVersion=vt,z.needsLights&&(Rt.ambientLightColor.value=k.state.ambient,Rt.lightProbe.value=k.state.probe,Rt.directionalLights.value=k.state.directional,Rt.directionalLightShadows.value=k.state.directionalShadow,Rt.spotLights.value=k.state.spot,Rt.spotLightShadows.value=k.state.spotShadow,Rt.rectAreaLights.value=k.state.rectArea,Rt.ltc_1.value=k.state.rectAreaLTC1,Rt.ltc_2.value=k.state.rectAreaLTC2,Rt.pointLights.value=k.state.point,Rt.pointLightShadows.value=k.state.pointShadow,Rt.hemisphereLights.value=k.state.hemi,Rt.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Rt.spotLightMatrix.value=k.state.spotLightMatrix,Rt.spotLightMap.value=k.state.spotLightMap,Rt.pointShadowMatrix.value=k.state.pointShadowMatrix),z.lightProbeGrid=T.state.lightProbeGridArray.length>0,z.currentProgram=Wt,z.uniformsList=null,Wt}function hn(S){if(S.uniformsList===null){const F=S.currentProgram.getUniforms();S.uniformsList=Hr.seqWithValue(F.seq,S.uniforms)}return S.uniformsList}function ri(S,F){const V=H.get(S);V.outputColorSpace=F.outputColorSpace,V.batching=F.batching,V.batchingColor=F.batchingColor,V.instancing=F.instancing,V.instancingColor=F.instancingColor,V.instancingMorph=F.instancingMorph,V.skinning=F.skinning,V.morphTargets=F.morphTargets,V.morphNormals=F.morphNormals,V.morphColors=F.morphColors,V.morphTargetsCount=F.morphTargetsCount,V.numClippingPlanes=F.numClippingPlanes,V.numIntersection=F.numClipIntersection,V.vertexAlphas=F.vertexAlphas,V.vertexTangents=F.vertexTangents,V.toneMapping=F.toneMapping}function wi(S,F){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;M.setFromMatrixPosition(F.matrixWorld);for(let V=0,z=S.length;V<z;V++){const k=S[V];if(k.texture!==null&&k.boundingBox.containsPoint(M))return k}return null}function ai(S,F,V,z,k){F.isScene!==!0&&(F=Le),q.resetTextureUnits();const mt=F.fog,vt=z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial?F.environment:null,pt=J===null?E.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Jt.workingColorSpace,Et=z.isMeshStandardMaterial||z.isMeshLambertMaterial&&!z.envMap||z.isMeshPhongMaterial&&!z.envMap,At=et.get(z.envMap||vt,Et),Ht=z.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Wt=!!V.attributes.tangent&&(!!z.normalMap||z.anisotropy>0),Rt=!!V.morphAttributes.position,de=!!V.morphAttributes.normal,Ie=!!V.morphAttributes.color;let Re=Hn;z.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(Re=E.toneMapping);const pe=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,qe=pe!==void 0?pe.length:0,_t=H.get(z),un=T.state.lights;if(te===!0&&(Kt===!0||S!==lt)){const ve=S===lt&&z.id===j;Tt.setState(z,S,ve)}let ie=!1;z.version===_t.__version?(_t.needsLights&&_t.lightsStateVersion!==un.state.version||_t.outputColorSpace!==pt||k.isBatchedMesh&&_t.batching===!1||!k.isBatchedMesh&&_t.batching===!0||k.isBatchedMesh&&_t.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&_t.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&_t.instancing===!1||!k.isInstancedMesh&&_t.instancing===!0||k.isSkinnedMesh&&_t.skinning===!1||!k.isSkinnedMesh&&_t.skinning===!0||k.isInstancedMesh&&_t.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&_t.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&_t.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&_t.instancingMorph===!1&&k.morphTexture!==null||_t.envMap!==At||z.fog===!0&&_t.fog!==mt||_t.numClippingPlanes!==void 0&&(_t.numClippingPlanes!==Tt.numPlanes||_t.numIntersection!==Tt.numIntersection)||_t.vertexAlphas!==Ht||_t.vertexTangents!==Wt||_t.morphTargets!==Rt||_t.morphNormals!==de||_t.morphColors!==Ie||_t.toneMapping!==Re||_t.morphTargetsCount!==qe||!!_t.lightProbeGrid!=T.state.lightProbeGridArray.length>0)&&(ie=!0):(ie=!0,_t.__version=z.version);let mn=_t.currentProgram;ie===!0&&(mn=nn(z,F,k),L&&z.isNodeMaterial&&L.onUpdateProgram(z,mn,_t));let Dn=!1,oi=!1,Hi=!1;const me=mn.getUniforms(),De=_t.uniforms;if(_.useProgram(mn.program)&&(Dn=!0,oi=!0,Hi=!0),z.id!==j&&(j=z.id,oi=!0),_t.needsLights){const ve=wi(T.state.lightProbeGridArray,k);_t.lightProbeGrid!==ve&&(_t.lightProbeGrid=ve,oi=!0)}if(Dn||lt!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),me.setValue(U,"projectionMatrix",S.projectionMatrix),me.setValue(U,"viewMatrix",S.matrixWorldInverse);const ci=me.map.cameraPosition;ci!==void 0&&ci.setValue(U,Te.setFromMatrixPosition(S.matrixWorld)),R.logarithmicDepthBuffer&&me.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(z.isMeshPhongMaterial||z.isMeshToonMaterial||z.isMeshLambertMaterial||z.isMeshBasicMaterial||z.isMeshStandardMaterial||z.isShaderMaterial)&&me.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),lt!==S&&(lt=S,oi=!0,Hi=!0)}if(_t.needsLights&&(un.state.directionalShadowMap.length>0&&me.setValue(U,"directionalShadowMap",un.state.directionalShadowMap,q),un.state.spotShadowMap.length>0&&me.setValue(U,"spotShadowMap",un.state.spotShadowMap,q),un.state.pointShadowMap.length>0&&me.setValue(U,"pointShadowMap",un.state.pointShadowMap,q)),k.isSkinnedMesh){me.setOptional(U,k,"bindMatrix"),me.setOptional(U,k,"bindMatrixInverse");const ve=k.skeleton;ve&&(ve.boneTexture===null&&ve.computeBoneTexture(),me.setValue(U,"boneTexture",ve.boneTexture,q))}k.isBatchedMesh&&(me.setOptional(U,k,"batchingTexture"),me.setValue(U,"batchingTexture",k._matricesTexture,q),me.setOptional(U,k,"batchingIdTexture"),me.setValue(U,"batchingIdTexture",k._indirectTexture,q),me.setOptional(U,k,"batchingColorTexture"),k._colorsTexture!==null&&me.setValue(U,"batchingColorTexture",k._colorsTexture,q));const li=V.morphAttributes;if((li.position!==void 0||li.normal!==void 0||li.color!==void 0)&&I.update(k,V,mn),(oi||_t.receiveShadow!==k.receiveShadow)&&(_t.receiveShadow=k.receiveShadow,me.setValue(U,"receiveShadow",k.receiveShadow)),(z.isMeshStandardMaterial||z.isMeshLambertMaterial||z.isMeshPhongMaterial)&&z.envMap===null&&F.environment!==null&&(De.envMapIntensity.value=F.environmentIntensity),De.dfgLUT!==void 0&&(De.dfgLUT.value=zg()),oi){if(me.setValue(U,"toneMappingExposure",E.toneMappingExposure),_t.needsLights&&Kh(De,Hi),mt&&z.fog===!0&&yt.refreshFogUniforms(De,mt),yt.refreshMaterialUniforms(De,z,tt,it,T.state.transmissionRenderTarget[S.id]),_t.needsLights&&_t.lightProbeGrid){const ve=_t.lightProbeGrid;De.probesSH.value=ve.texture,De.probesMin.value.copy(ve.boundingBox.min),De.probesMax.value.copy(ve.boundingBox.max),De.probesResolution.value.copy(ve.resolution)}Hr.upload(U,hn(_t),De,q)}if(z.isShaderMaterial&&z.uniformsNeedUpdate===!0&&(Hr.upload(U,hn(_t),De,q),z.uniformsNeedUpdate=!1),z.isSpriteMaterial&&me.setValue(U,"center",k.center),me.setValue(U,"modelViewMatrix",k.modelViewMatrix),me.setValue(U,"normalMatrix",k.normalMatrix),me.setValue(U,"modelMatrix",k.matrixWorld),z.uniformsGroups!==void 0){const ve=z.uniformsGroups;for(let ci=0,Gi=ve.length;ci<Gi;ci++){const wl=ve[ci];Q.update(wl,mn),Q.bind(wl,mn)}}return mn}function Kh(S,F){S.ambientLightColor.needsUpdate=F,S.lightProbe.needsUpdate=F,S.directionalLights.needsUpdate=F,S.directionalLightShadows.needsUpdate=F,S.pointLights.needsUpdate=F,S.pointLightShadows.needsUpdate=F,S.spotLights.needsUpdate=F,S.spotLightShadows.needsUpdate=F,S.rectAreaLights.needsUpdate=F,S.hemisphereLights.needsUpdate=F}function Zh(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return X},this.getActiveMipmapLevel=function(){return G},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(S,F,V){const z=H.get(S);z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,z.__autoAllocateDepthBuffer===!1&&(z.__useRenderToTexture=!1),H.get(S.texture).__webglTexture=F,H.get(S.depthTexture).__webglTexture=z.__autoAllocateDepthBuffer?void 0:V,z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,F){const V=H.get(S);V.__webglFramebuffer=F,V.__useDefaultFramebuffer=F===void 0},this.setRenderTarget=function(S,F=0,V=0){J=S,X=F,G=V;let z=null,k=!1,mt=!1;if(S){const pt=H.get(S);if(pt.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(U.FRAMEBUFFER,pt.__webglFramebuffer),dt.copy(S.viewport),xt.copy(S.scissor),jt=S.scissorTest,_.viewport(dt),_.scissor(xt),_.setScissorTest(jt),j=-1;return}else if(pt.__webglFramebuffer===void 0)q.setupRenderTarget(S);else if(pt.__hasExternalTextures)q.rebindTextures(S,H.get(S.texture).__webglTexture,H.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ht=S.depthTexture;if(pt.__boundDepthTexture!==Ht){if(Ht!==null&&H.has(Ht)&&(S.width!==Ht.image.width||S.height!==Ht.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(S)}}const Et=S.texture;(Et.isData3DTexture||Et.isDataArrayTexture||Et.isCompressedArrayTexture)&&(mt=!0);const At=H.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(At[F])?z=At[F][V]:z=At[F],k=!0):S.samples>0&&q.useMultisampledRTT(S)===!1?z=H.get(S).__webglMultisampledFramebuffer:Array.isArray(At)?z=At[V]:z=At,dt.copy(S.viewport),xt.copy(S.scissor),jt=S.scissorTest}else dt.copy(Pt).multiplyScalar(tt).floor(),xt.copy(ye).multiplyScalar(tt).floor(),jt=Gt;if(V!==0&&(z=B),_.bindFramebuffer(U.FRAMEBUFFER,z)&&_.drawBuffers(S,z),_.viewport(dt),_.scissor(xt),_.setScissorTest(jt),k){const pt=H.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+F,pt.__webglTexture,V)}else if(mt){const pt=F;for(let Et=0;Et<S.textures.length;Et++){const At=H.get(S.textures[Et]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+Et,At.__webglTexture,V,pt)}}else if(S!==null&&V!==0){const pt=H.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,pt.__webglTexture,V)}j=-1},this.readRenderTargetPixels=function(S,F,V,z,k,mt,vt,pt=0){if(!(S&&S.isWebGLRenderTarget)){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Et=H.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&vt!==void 0&&(Et=Et[vt]),Et){_.bindFramebuffer(U.FRAMEBUFFER,Et);try{const At=S.textures[pt],Ht=At.format,Wt=At.type;if(S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pt),!R.textureFormatReadable(Ht)){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!R.textureTypeReadable(Wt)){se("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}F>=0&&F<=S.width-z&&V>=0&&V<=S.height-k&&U.readPixels(F,V,z,k,rt.convert(Ht),rt.convert(Wt),mt)}finally{const At=J!==null?H.get(J).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(S,F,V,z,k,mt,vt,pt=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Et=H.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&vt!==void 0&&(Et=Et[vt]),Et)if(F>=0&&F<=S.width-z&&V>=0&&V<=S.height-k){_.bindFramebuffer(U.FRAMEBUFFER,Et);const At=S.textures[pt],Ht=At.format,Wt=At.type;if(S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pt),!R.textureFormatReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!R.textureTypeReadable(Wt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Rt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Rt),U.bufferData(U.PIXEL_PACK_BUFFER,mt.byteLength,U.STREAM_READ),U.readPixels(F,V,z,k,rt.convert(Ht),rt.convert(Wt),0);const de=J!==null?H.get(J).__webglFramebuffer:null;_.bindFramebuffer(U.FRAMEBUFFER,de);const Ie=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await id(U,Ie,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Rt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,mt),U.deleteBuffer(Rt),U.deleteSync(Ie),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,F=null,V=0){const z=Math.pow(2,-V),k=Math.floor(S.image.width*z),mt=Math.floor(S.image.height*z),vt=F!==null?F.x:0,pt=F!==null?F.y:0;q.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,V,0,0,vt,pt,k,mt),_.unbindTexture()},this.copyTextureToTexture=function(S,F,V=null,z=null,k=0,mt=0){let vt,pt,Et,At,Ht,Wt,Rt,de,Ie;const Re=S.isCompressedTexture?S.mipmaps[mt]:S.image;if(V!==null)vt=V.max.x-V.min.x,pt=V.max.y-V.min.y,Et=V.isBox3?V.max.z-V.min.z:1,At=V.min.x,Ht=V.min.y,Wt=V.isBox3?V.min.z:0;else{const De=Math.pow(2,-k);vt=Math.floor(Re.width*De),pt=Math.floor(Re.height*De),S.isDataArrayTexture?Et=Re.depth:S.isData3DTexture?Et=Math.floor(Re.depth*De):Et=1,At=0,Ht=0,Wt=0}z!==null?(Rt=z.x,de=z.y,Ie=z.z):(Rt=0,de=0,Ie=0);const pe=rt.convert(F.format),qe=rt.convert(F.type);let _t;F.isData3DTexture?(q.setTexture3D(F,0),_t=U.TEXTURE_3D):F.isDataArrayTexture||F.isCompressedArrayTexture?(q.setTexture2DArray(F,0),_t=U.TEXTURE_2D_ARRAY):(q.setTexture2D(F,0),_t=U.TEXTURE_2D),_.activeTexture(U.TEXTURE0),_.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,F.flipY),_.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,F.premultiplyAlpha),_.pixelStorei(U.UNPACK_ALIGNMENT,F.unpackAlignment);const un=_.getParameter(U.UNPACK_ROW_LENGTH),ie=_.getParameter(U.UNPACK_IMAGE_HEIGHT),mn=_.getParameter(U.UNPACK_SKIP_PIXELS),Dn=_.getParameter(U.UNPACK_SKIP_ROWS),oi=_.getParameter(U.UNPACK_SKIP_IMAGES);_.pixelStorei(U.UNPACK_ROW_LENGTH,Re.width),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Re.height),_.pixelStorei(U.UNPACK_SKIP_PIXELS,At),_.pixelStorei(U.UNPACK_SKIP_ROWS,Ht),_.pixelStorei(U.UNPACK_SKIP_IMAGES,Wt);const Hi=S.isDataArrayTexture||S.isData3DTexture,me=F.isDataArrayTexture||F.isData3DTexture;if(S.isDepthTexture){const De=H.get(S),li=H.get(F),ve=H.get(De.__renderTarget),ci=H.get(li.__renderTarget);_.bindFramebuffer(U.READ_FRAMEBUFFER,ve.__webglFramebuffer),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,ci.__webglFramebuffer);for(let Gi=0;Gi<Et;Gi++)Hi&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(S).__webglTexture,k,Wt+Gi),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,H.get(F).__webglTexture,mt,Ie+Gi)),U.blitFramebuffer(At,Ht,vt,pt,Rt,de,vt,pt,U.DEPTH_BUFFER_BIT,U.NEAREST);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(k!==0||S.isRenderTargetTexture||H.has(S)){const De=H.get(S),li=H.get(F);_.bindFramebuffer(U.READ_FRAMEBUFFER,W),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,N);for(let ve=0;ve<Et;ve++)Hi?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,De.__webglTexture,k,Wt+ve):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,De.__webglTexture,k),me?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,li.__webglTexture,mt,Ie+ve):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,li.__webglTexture,mt),k!==0?U.blitFramebuffer(At,Ht,vt,pt,Rt,de,vt,pt,U.COLOR_BUFFER_BIT,U.NEAREST):me?U.copyTexSubImage3D(_t,mt,Rt,de,Ie+ve,At,Ht,vt,pt):U.copyTexSubImage2D(_t,mt,Rt,de,At,Ht,vt,pt);_.bindFramebuffer(U.READ_FRAMEBUFFER,null),_.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else me?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(_t,mt,Rt,de,Ie,vt,pt,Et,pe,qe,Re.data):F.isCompressedArrayTexture?U.compressedTexSubImage3D(_t,mt,Rt,de,Ie,vt,pt,Et,pe,Re.data):U.texSubImage3D(_t,mt,Rt,de,Ie,vt,pt,Et,pe,qe,Re):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,mt,Rt,de,vt,pt,pe,qe,Re.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,mt,Rt,de,Re.width,Re.height,pe,Re.data):U.texSubImage2D(U.TEXTURE_2D,mt,Rt,de,vt,pt,pe,qe,Re);_.pixelStorei(U.UNPACK_ROW_LENGTH,un),_.pixelStorei(U.UNPACK_IMAGE_HEIGHT,ie),_.pixelStorei(U.UNPACK_SKIP_PIXELS,mn),_.pixelStorei(U.UNPACK_SKIP_ROWS,Dn),_.pixelStorei(U.UNPACK_SKIP_IMAGES,oi),mt===0&&F.generateMipmaps&&U.generateMipmap(_t),_.unbindTexture()},this.initRenderTarget=function(S){H.get(S).__webglFramebuffer===void 0&&q.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?q.setTextureCube(S,0):S.isData3DTexture?q.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?q.setTexture2DArray(S,0):q.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){X=0,G=0,J=null,_.reset(),ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return kn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}function Hg(s,t,e,n){const i=new vn;i.position.set(t,0,e);const r=[],a=f=>{const y=new Me({color:f});return r.push(y),y},o=f=>{const y=new _e({color:f});return r.push(y),y},c=f=>(r.push(f),f),l=(f,y,A,M,C,T,P)=>{const x=new oe(c(new In(y,A,M)),f);return x.position.set(C,T,P),i.add(x),x},h=(f,y,A,M,C,T=16,P=0,x=0)=>{const v=new oe(c(new Gs(y,A,M,T)),f);return v.position.set(P,C,x),i.add(v),v},d=(f,y,A,M,C)=>{const T=new oe(c(new xl(y,18,12)),f);return T.position.set(A,M,C),i.add(T),T},u=(f,y,A,M,C,T)=>{const P=c(new Gs(f,y,A,4,3)),x=new _e({color:C,transparent:!0,opacity:.35,depthWrite:!1}),v=new _e({color:T,wireframe:!0});r.push(x,v);const E=new oe(P,x);E.position.y=M,E.rotation.y=Math.PI/4,i.add(E);const w=new oe(P,v);w.position.y=M,w.rotation.y=Math.PI/4,i.add(w)},p=f=>{d(o(16724016),.5,0,f,0)};let g=8,b=8,m=40;switch(s){case"tokyo-tower":{u(3,11,34,17,14174746,16747088),u(1.2,3,20,44,14174746,16747088),l(o(16773328),9,2.2,9,0,34.5,0),l(o(16773328),4.5,1.6,4.5,0,55,0),h(a(14737632),.2,.3,14,62,6),p(69),g=12,b=12,m=70;break}case"namsan":{h(a(15263976),2.2,2.8,40,20),h(a(13684944),5.5,4.5,6,43),l(o(11065599),11.4,1.2,11.4,0,43,0),h(a(13684944),.35,.6,22,57,6),p(68),g=6,b=6,m=68;break}case"pearl":{const f=a(10133672);for(const[y,A]of[[-4.5,0],[2.25,-3.9],[2.25,3.9]])h(f,1.1,1.3,48,24,10,y,A);h(f,1.2,1.2,30,63,10),d(o(14696624),8,0,26,0),d(o(12595360),4.5,0,56,0),d(o(16736448),2,0,78,0),h(a(12632256),.25,.4,14,86,6),p(93),g=10,b=10,m=93;break}case"temple":{const f=a(13152400),y=o(15773744);l(f,24,3,24,0,1.5,0),l(f,18,3,18,0,4.5,0),l(f,12,3,12,0,7.5,0);const A=new oe(c(new $n(4.5,24,8)),y);A.position.y=21,i.add(A);for(const[M,C]of[[-8,-8],[8,-8],[-8,8],[8,8]]){const T=new oe(c(new $n(1.6,9,8)),y);T.position.set(M,13.5,C),i.add(T)}g=13,b=13,m=33;break}case"gateway":{const f=a(10127976);l(f,7,20,8,-9,10,0),l(f,7,20,8,9,10,0),l(f,26,5,8,0,21,0),l(o(16767120),11,2,1,0,14,4.1);for(const y of[-9,9])d(a(8022608),3.2,y,24.5,0);d(a(8022608),4.2,0,25.5,0),g=14,b=5,m=30;break}case"pyramid":{const f=new oe(c(new $n(21,27,4)),a(12626040));f.position.y=13.5,f.rotation.y=Math.PI/4,i.add(f),l(o(16760944),30,.3,.6,0,.2,15.2),l(o(16760944),30,.3,.6,0,.2,-15.2),g=15.5,b=15.5,m=27;break}case"mosque":{const f=a(12103840),y=a(6978186);l(f,24,12,24,0,6,0),d(y,10,0,12,0);for(const[A,M]of[[-8,0],[8,0],[0,-8],[0,8]])d(y,4.5,A,11,M);for(const[A,M]of[[-15,-15],[15,-15],[-15,15],[15,15]]){h(f,.9,1.1,34,17,10,A,M);const C=new oe(c(new $n(1.4,4,10)),y);C.position.set(A,36,M),i.add(C),l(o(16769184),2.8,.5,2.8,A,28,M)}g=16.5,b=16.5,m=38;break}case"kremlin":{const f=a(9054752);l(f,11,24,11,0,12,0),l(f,7,9,7,0,28.5,0),l(o(16773312),7.4,3,7.4,0,26,0);const y=new oe(c(new $n(5.2,11,4)),a(2779706));y.position.y=38.5,y.rotation.y=Math.PI/4,i.add(y);const A=new oe(c(new _l(2.2)),o(16722474));A.position.y=46,i.add(A),g=6.5,b=6.5,m=48;break}case"tv-tower":{h(a(13685976),1.8,3.2,52,26,12),d(a(12107976),8,0,52,0),l(o(11061503),17,1.2,17,0,52,0),h(a(12632256),.4,.8,30,74,6),p(89),g=9,b=9,m=89;break}case"eiffel":{u(4,15,24,12,10512944,16760944),u(2,4,26,37,10512944,16760944),u(.6,2,22,61,10512944,16760944),l(o(16773312),10,1.4,10,0,24.5,0),l(o(16773312),5,1.2,5,0,50.5,0),h(a(14737632),.2,.3,8,76,6),p(80),g=16,b=16,m=80;break}case"big-ben":{const f=a(11049592);l(f,7,36,7,0,18,0),l(o(16773296),8.4,8.4,8.4,0,39,0),l(f,7.6,3,7.6,0,45,0);const y=new oe(c(new $n(5.4,11,4)),a(2767418));y.position.y=52,y.rotation.y=Math.PI/4,i.add(y),h(a(13682864),.2,.4,6,60,6),g=5,b=5,m=63;break}case"spire":{l(n,20,42,20,0,21,0),l(n,15,30,15,0,57,0),l(n,9,24,9,0,84,0),l(o(16773328),6,1.5,6,0,96.5,0),h(a(13685976),.3,1.2,22,108,8),p(119),g=11,b=11,m=119;break}}return{group:i,disposables:r,halfW:g,halfD:b,height:m}}const Yt=16,It=34,ge=Yt+It,Gg=3.6,En=new qt,us=new tn,Bn=new D,wn=new D,Vg=new wt(0,0,0);function Ee(s,t,e,n,i,r,a,o,c=0){wn.set(e,n,i),us.setFromAxisAngle(new D(0,1,0),c),Bn.set(r,a,o),En.compose(wn,us,Bn),s.setMatrixAt(t,En)}function Wg(s,t){const e=document.createElement("canvas");e.width=128,e.height=256;const n=e.getContext("2d");n.fillStyle=s.wall,n.fillRect(0,0,128,256);const i=new wt(s.wall).offsetHSL(0,0,.05).getStyle();for(let a=4;a<252;a+=10)for(let o=4;o<124;o+=9){const c=t()<s.windowRate;n.fillStyle=c?t()<s.winWarmShare?s.winWarm:s.winCold:i,c?(n.shadowColor="#fff0c0",n.shadowBlur=4):n.shadowBlur=0,n.fillRect(o,a,5,6)}const r=new Ms(e);return r.colorSpace=Ze,r}class Xg{constructor(t,e){this.group=new vn,this.solids=[],this.circles=[],this.crowns=[],this.sky=new vn,this.parks=[],this.disposables=[],this.bldOfBlock=[],this.lampBlock=[],this.neonBlock=[],this.blackoutOrder=[],this.blockTop=[],this.blackoutDone=0,this.bldBase=[],this.landmarkBlock=-1,this.landmarkX=0,this.landmarkZ=0,this.spec=t;const n=t.theme;this.half=(t.grid*ge+Yt)/2;const i=t.grid;for(let ct=0;ct<i*i;ct++)this.solids.push([]),this.circles.push([]),this.crowns.push([]),this.bldOfBlock.push([]),this.blockTop.push(0);const r=Math.floor(i/2);this.landmarkBlock=r*i+r;const a=new Pn(this.half*2+6,this.half*2+6),o=new Me({color:n.ground}),c=new oe(a,o);c.rotation.x=-Math.PI/2,this.group.add(c),this.disposables.push(a,o);const l=new In(1,1,1);this.disposables.push(l);const h=new Me({color:n.walk}),d=new ne(l,h,i*i),u=new Me({color:n.park}),p=[];this.disposables.push(h,u);const g=Wg(n,e),b=new Me({map:g});this.disposables.push(g,b);const m=i*i*4,f=new ne(l,b,m);let y=0;const A=new Me({color:n.roof}),M=new ne(l,A,m);this.disposables.push(A);const C=new Me({color:16777215}),T=new Me({color:3812380}),P=new ne(l,C,i*i*12),x=new ne(l,T,i*i*6);let v=0,E=0;this.disposables.push(C,T);const w=new wt,L=(ct,Ct,bt,Dt)=>{let Ut,$t,ce,Ae,Ce,cn=.5;switch(ct){case"palm":Ut=5+e()*2.5,cn=.32,$t=3.6+e(),ce=.7,Ae=3.6+e(),Ce=Ut+.2,w.setHex(2775594);break;case"cypress":Ut=1.2+e()*.6,cn=.4,$t=1.4+e()*.4,ce=5+e()*2,Ae=$t,Ce=Ut+ce/2,w.setHex(1718814);break;case"bare":Ut=2.8+e()*1.6,cn=.4,$t=1.6+e(),ce=1.6+e(),Ae=$t,Ce=Ut+ce/2,w.setHex(2761752);break;case"fir":Ut=.8+e()*.5,cn=.45,$t=3.2+e(),ce=2.4,Ae=$t,Ce=Ut+ce/2,w.setHex(1194526);break;case"ginkgo":Ut=2.4+e()*1.8,$t=2.6+e()*1.4,ce=2.6+e(),Ae=2.6+e()*1.4,Ce=Ut+1.1,w.setHex(9075234);break;case"sakura":Ut=2.2+e()*1.4,$t=3+e()*1.4,ce=2.2+e(),Ae=3+e()*1.4,Ce=Ut+.9,w.setHex(8014430);break;default:Ut=2.4+e()*1.8,$t=2.6+e()*1.4,ce=2.6+e(),Ae=2.6+e()*1.4,Ce=Ut+1.1,w.setHex(1919524)}Ee(x,v,Ct,Ut/2,bt,cn,Ut,cn),Ee(P,E,Ct,Ce,bt,$t,ce,Ae),P.setColorAt(E,w),E++,ct==="fir"&&(Ee(P,E,Ct,Ce+ce*.9,bt,$t*.62,ce,Ae*.62),P.setColorAt(E,w),E++,ce*=1.9,Ce+=ce*.25),this.circles[Dt].push({x:Ct,z:bt,r:.3}),this.crowns[Dt].push({minX:Ct-$t/2,maxX:Ct+$t/2,minZ:bt-Ae/2,maxZ:bt+Ae/2,minY:Ce-ce/2,maxY:Ce+ce/2}),v++},B=new wt,W=(i-1)/2;for(let ct=0;ct<i;ct++)for(let Ct=0;Ct<i;Ct++){const bt=ct*i+Ct,Dt=-this.half+Yt+ct*ge+It/2,Ut=-this.half+Yt+Ct*ge+It/2,$t=bt===this.landmarkBlock,ce=!$t&&(ct*31+Ct*17+Math.floor(e()*3))%t.parkEvery===0;if(this.parks.push(ce),Ee(d,bt,Dt,.09,Ut,It+4,.18,It+4),$t){this.landmarkX=Dt,this.landmarkZ=Ut;for(const[nn,hn]of[[-1,-1],[1,-1],[-1,1],[1,1]])L(n.tree,Dt+nn*(It/2-3),Ut+hn*(It/2-3),bt);continue}if(ce){p.push(bt);const nn=4+Math.floor(e()*3);for(let hn=0;hn<nn&&v<i*i*6;hn++)L(n.tree,Dt+(e()-.5)*(It-8),Ut+(e()-.5)*(It-8),bt);continue}const Ae=1-(Math.abs(ct-W)+Math.abs(Ct-W))/i,Ce=e()<.35?1:e()<.6?2:4,cn=Ce===1?[[Dt,Ut,It-6,It-6]]:Ce===2?e()<.5?[[Dt-It/4,Ut,It/2-5,It-6],[Dt+It/4,Ut,It/2-5,It-6]]:[[Dt,Ut-It/4,It-6,It/2-5],[Dt,Ut+It/4,It-6,It/2-5]]:[[Dt-It/4,Ut-It/4,It/2-5,It/2-5],[Dt+It/4,Ut-It/4,It/2-5,It/2-5],[Dt-It/4,Ut+It/4,It/2-5,It/2-5],[Dt+It/4,Ut+It/4,It/2-5,It/2-5]];for(const[nn,hn,ri,wi]of cn){const ai=n.baseH[0]+e()*n.baseH[1]+Ae*Ae*(n.downtownH[0]+e()*n.downtownH[1]);B.setHSL(n.bldHue[0]+e()*(n.bldHue[1]-n.bldHue[0]),n.bldSat[0]+e()*(n.bldSat[1]-n.bldSat[0]),n.bldLight[0]+e()*(n.bldLight[1]-n.bldLight[0])),Ee(f,y,nn,ai/2,hn,ri,ai,wi),f.setColorAt(y,B),this.bldOfBlock[bt].push(y),this.bldBase.push(B.clone()),ai>this.blockTop[bt]&&(this.blockTop[bt]=ai),n.roofH>1?Ee(M,y,nn,ai+n.roofH/2,hn,ri-1.6,n.roofH,wi-1.6):Ee(M,y,nn,ai+n.roofH/2,hn,ri+.4,n.roofH,wi+.4),y++,this.solids[bt].push({minX:nn-ri/2-.2,maxX:nn+ri/2+.2,minZ:hn-wi/2-.2,maxZ:hn+wi/2+.2})}}f.count=y,M.count=y,P.count=E,x.count=v,f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0),P.instanceColor&&(P.instanceColor.needsUpdate=!0);const N=Hg(n.landmark,this.landmarkX,this.landmarkZ,b);this.group.add(N.group),this.disposables.push(...N.disposables),this.solids[this.landmarkBlock].push({minX:this.landmarkX-N.halfW,maxX:this.landmarkX+N.halfW,minZ:this.landmarkZ-N.halfD,maxZ:this.landmarkZ+N.halfD}),this.blockTop[this.landmarkBlock]=N.height;const X=new ne(l,u,Math.max(1,p.length));p.forEach((ct,Ct)=>{const bt=Math.floor(ct/i),Dt=ct%i,Ut=-this.half+Yt+bt*ge+It/2,$t=-this.half+Yt+Dt*ge+It/2;Ee(X,Ct,Ut,.14,$t,It-2,.14,It-2)}),X.count=p.length;const G=new _e({color:n.dash});this.disposables.push(G);const J=[];for(let ct=0;ct<=i;ct++)J.push(-this.half+Yt/2+ct*ge);const j=(i+1)*Math.ceil(this.half*2/6)*2,lt=new ne(l,G,j);let dt=0;for(const ct of J)for(let Ct=-this.half+3;Ct<this.half-3;Ct+=6)J.some(bt=>Math.abs(Ct-bt)<Yt/2+1)||(Ee(lt,dt++,ct,.03,Ct,.18,.05,1.9),Ee(lt,dt++,Ct,.03,ct,1.9,.05,.18));lt.count=dt;const xt=new _e({color:10133672});this.disposables.push(xt);const jt=(i+1)*(i+1)*4*4,xe=new ne(l,xt,jt);let Zt=0;for(const ct of J)for(const Ct of J)for(let bt=0;bt<4;bt++){const Dt=bt===0?1:bt===1?-1:0,Ut=bt===2?1:bt===3?-1:0,$t=ct+Dt*(Yt/2-1.6),ce=Ct+Ut*(Yt/2-1.6);if(!(Math.abs($t)>this.half||Math.abs(ce)>this.half))for(let Ae=-1.5;Ae<=1.5&&!(Zt>=jt);Ae++){const Ce=$t+(Ut!==0?Ae*1.4:0),cn=ce+(Dt!==0?Ae*1.4:0);Ee(xe,Zt++,Ce,.04,cn,Ut!==0?.7:1.9,.05,Dt!==0?.7:1.9)}}xe.count=Zt;const $=new Me({color:2303795});this.disposables.push($);const it=new ne(l,$,y),tt=new Me({color:5528422}),Nt=new Me({color:4864556}),zt=new Me({color:3817287});this.disposables.push(tt,Nt,zt);const Pt=new ne(l,tt,y*2),ye=new ne(l,Nt,y),Gt=new ne(l,zt,y);let ae=0,te=0,Kt=0;for(let ct=0;ct<y;ct++){f.getMatrixAt(ct,En),wn.setFromMatrixPosition(En),Bn.setFromMatrixScale(En);const Ct=wn.x,bt=wn.z,Dt=Bn.x,Ut=Bn.z,$t=Bn.y;Ee(it,ct,Ct,1.6,bt,Dt+.5,3.2,Ut+.5),e()<.5&&Ee(Pt,ae++,Ct+(e()-.5)*Dt*.5,$t+.75,bt+(e()-.5)*Ut*.5,1.6,1.2,1.6),e()<.35&&Ee(Pt,ae++,Ct+(e()-.5)*Dt*.4,$t+.6,bt+(e()-.5)*Ut*.4,1.1,.9,1.1),e()<.22&&$t>18&&Ee(ye,te++,Ct+(e()-.5)*Dt*.4,$t+1.8,bt+(e()-.5)*Ut*.4,2.2,3.2,2.2),e()<.3&&Ee(Gt,Kt++,Ct+(e()-.5)*Dt*.6,$t+2.6,bt+(e()-.5)*Ut*.6,.12,5.2,.12)}Pt.count=ae,ye.count=te,Gt.count=Kt;const be=new Me({color:1711396}),Te=new _e({color:16733e3}),Pe=new _e({color:6094714});this.disposables.push(be,Te,Pe);const Le=(i+1)*(i+1),fe=new ne(l,be,Le*2),Se=new ne(l,Te,Le),U=new ne(l,Pe,Le);let ke=0,re=0,R=0;for(const ct of J)for(const Ct of J){if(e()<.45)continue;const bt=ct-Yt/2-.8,Dt=Ct-Yt/2-.8;Math.abs(bt)>this.half-2||Math.abs(Dt)>this.half-2||(Ee(fe,ke++,bt,2.2,Dt,.18,4.4,.18),this.addCircle(bt,Dt,.2),Ee(fe,ke++,bt,4.65,Dt,.5,1.1,.5),e()<.5?Ee(Se,re++,bt,4.9,Dt+.26,.22,.22,.06):Ee(U,R++,bt,4.5,Dt+.26,.22,.22,.06))}fe.count=ke,Se.count=re,U.count=R;const _=new Me({color:3032118});this.disposables.push(_);const O=new ne(l,_,i*i*2);let H=0;for(let ct=0;ct<i;ct++)for(let Ct=0;Ct<i;Ct++){if(e()<.5)continue;const bt=-this.half+Yt+ct*ge+It/2,Dt=-this.half+Yt+Ct*ge+It/2,Ut=e()<.5?1:-1,$t=bt+Ut*(It/2+1.4),ce=Dt+(e()-.5)*It*.7;Ee(O,H++,$t,.55,ce,.8,1.1,.8),this.addCircle($t,ce,.5)}O.count=H;const q=new en,et=new Float32Array(n.stars*3);for(let ct=0;ct<n.stars;ct++){const Ct=e()*Math.PI*2,bt=.15+e()*1.2,Dt=200;et[ct*3]=Math.cos(Ct)*Math.cos(bt)*Dt,et[ct*3+1]=Math.sin(bt)*Dt,et[ct*3+2]=Math.sin(Ct)*Math.cos(bt)*Dt}q.setAttribute("position",new Mn(et,3));const st=new Uh({color:12570856,size:1.1,sizeAttenuation:!1,fog:!1});this.disposables.push(q,st);const Y=new Rd(q,st);Y.frustumCulled=!1,this.sky.add(Y);const Z=new ml(14,24),at=new _e({color:n.moon,fog:!1});this.disposables.push(Z,at);const yt=new oe(Z,at);yt.position.set(70,60,-170),yt.lookAt(0,0,0),yt.frustumCulled=!1,this.sky.add(yt),this.group.add(this.sky);for(const ct of[xe,it,Pt,ye,Gt,fe,Se,U,O])ct.instanceMatrix.needsUpdate=!0,ct.frustumCulled=!1,this.disposables.push(ct),this.group.add(ct);const ht=new Me({color:2764342}),ot=new _e({color:16777215}),Tt=new wt(n.lamp);this.disposables.push(ht,ot);const Lt=(i+1)*(i+1),Bt=new ne(l,ht,Lt),I=new ne(l,ot,Lt);let nt=0;for(let ct=0;ct<=i;ct++)for(let Ct=0;Ct<=i;Ct++){const bt=-this.half+Yt/2+ct*ge+Yt/2+.8,Dt=-this.half+Yt/2+Ct*ge+Yt/2+.8;bt>this.half||Dt>this.half||(Ee(Bt,nt,bt,2.6,Dt,.2,5.2,.2),this.addCircle(bt,Dt,.2),Ee(I,nt,bt,5.35,Dt,.55,.26,.55),I.setColorAt(nt,Tt),this.lampBlock.push(this.cellOf(bt,Dt)),nt++)}Bt.count=nt,I.count=nt;const K=document.createElement("canvas");K.width=64,K.height=64;const rt=K.getContext("2d"),ut=rt.createRadialGradient(32,32,3,32,32,31);ut.addColorStop(0,"rgba(255,224,150,0.28)"),ut.addColorStop(.55,"rgba(255,214,130,0.1)"),ut.addColorStop(1,"rgba(255,200,110,0)"),rt.fillStyle=ut,rt.fillRect(0,0,64,64);const Q=new Ms(K);Q.colorSpace=Ze;const St=new _e({map:Q,transparent:!0,depthWrite:!1,blending:ni}),Mt=new Pn(1,1);this.disposables.push(Q,St,Mt);const ee=new ne(Mt,St,nt);ee.renderOrder=1;for(let ct=0;ct<nt;ct++)I.getMatrixAt(ct,En),wn.setFromMatrixPosition(En),us.setFromAxisAngle(new D(1,0,0),-Math.PI/2),Bn.set(11,11,1),En.compose(wn.set(wn.x,.25,wn.z),us,Bn),ee.setMatrixAt(ct,En),ee.setColorAt(ct,Tt);ee.count=nt,ee.instanceMatrix.needsUpdate=!0,ee.frustumCulled=!1,this.disposables.push(ee),this.group.add(ee);const le=new Pn(1,1);this.disposables.push(le);const ln=new _e({side:Tn});this.disposables.push(ln);const He=new ne(le,ln,i*i),Ws=new wt;let ki=0;const Ss=n.neonHues;for(let ct=0;ct<i;ct++)for(let Ct=0;Ct<i;Ct++){if(this.parks[ct*i+Ct]||ct*i+Ct===this.landmarkBlock||e()>n.neonRate)continue;const bt=this.solids[ct*i+Ct][0];if(!bt)continue;const Dt=3+e()*4;wn.set((bt.minX+bt.maxX)/2,3.4+e()*3,bt.maxZ+.12),us.identity(),Bn.set(Dt,1.1+e()*.8,1),En.compose(wn,us,Bn),He.setMatrixAt(ki,En),Ws.setHSL(Ss[Math.floor(e()*Ss.length)],.9,.6),He.setColorAt(ki,Ws),this.neonBlock.push(ct*i+Ct),ki++}He.count=ki,He.instanceColor&&(He.instanceColor.needsUpdate=!0),this.bldMesh=f,this.lampMesh=I,this.poolMesh=ee,this.neonMesh=He,I.instanceColor&&(I.instanceColor.needsUpdate=!0),ee.instanceColor&&(ee.instanceColor.needsUpdate=!0),this.blackoutOrder=Array.from({length:i*i},(ct,Ct)=>Ct);for(let ct=this.blackoutOrder.length-1;ct>0;ct--){const Ct=Math.floor(e()*(ct+1));[this.blackoutOrder[ct],this.blackoutOrder[Ct]]=[this.blackoutOrder[Ct],this.blackoutOrder[ct]]}for(const ct of[d,X,f,M,P,x,lt,Bt,I,He])ct.instanceMatrix.needsUpdate=!0,this.disposables.push(ct),ct.frustumCulled=!1,this.group.add(ct);this.minimapBase=this.renderMinimapBase()}setBlackout(t){const e=this.spec.grid,n=Math.min(e*e,Math.floor(Math.max(0,Math.min(1,t))*e*e+1e-6));if(n<=this.blackoutDone)return 0;const i=new wt(658448),r=new wt;for(let o=this.blackoutDone;o<n;o++){const c=this.blackoutOrder[o];for(const l of this.bldOfBlock[c])r.copy(this.bldBase[l]).multiplyScalar(.22),this.bldMesh.setColorAt(l,r);for(let l=0;l<this.lampBlock.length;l++)this.lampBlock[l]===c&&(this.lampMesh.setColorAt(l,i),this.poolMesh.setColorAt(l,Vg));for(let l=0;l<this.neonBlock.length;l++)this.neonBlock[l]===c&&this.neonMesh.setColorAt(l,i)}const a=n-this.blackoutDone;this.blackoutDone=n;for(const o of[this.bldMesh,this.lampMesh,this.poolMesh,this.neonMesh])o.instanceColor&&(o.instanceColor.needsUpdate=!0);return a}skyline(t,e,n){const i=this.spec.grid,r=Math.floor((t-n+this.half-Yt/2)/ge),a=Math.floor((t+n+this.half-Yt/2)/ge),o=Math.floor((e-n+this.half-Yt/2)/ge),c=Math.floor((e+n+this.half-Yt/2)/ge);let l=0;for(let h=Math.max(0,r);h<=Math.min(i-1,a);h++)for(let d=Math.max(0,o);d<=Math.min(i-1,c);d++)l=Math.max(l,this.blockTop[h*i+d]);return l}get blackout(){return this.blackoutDone/(this.spec.grid*this.spec.grid)}cellOf(t,e){const n=this.spec.grid,i=Math.max(0,Math.min(n-1,Math.floor((t+this.half-Yt/2)/ge))),r=Math.max(0,Math.min(n-1,Math.floor((e+this.half-Yt/2)/ge)));return i*n+r}addCircle(t,e,n){this.circles[this.cellOf(t,e)].push({x:t,z:e,r:n})}cameraBlocked(t,e,n){const i=this.spec.grid,r=Math.floor((t+this.half-Yt/2)/ge),a=Math.floor((n+this.half-Yt/2)/ge);for(let o=Math.max(0,r-1);o<=Math.min(i-1,r+1);o++)for(let c=Math.max(0,a-1);c<=Math.min(i-1,a+1);c++)for(const l of this.crowns[o*i+c])if(t>l.minX-.4&&t<l.maxX+.4&&n>l.minZ-.4&&n<l.maxZ+.4&&e>l.minY-.4&&e<l.maxY+.4)return!0;return!1}roadAxes(){const t=[];for(let e=0;e<=this.spec.grid;e++)t.push(-this.half+Yt/2+e*ge);return t}randomSidewalk(t){const e=this.spec.grid,n=Math.floor(t()*e),i=Math.floor(t()*e),r=-this.half+Yt+n*ge+It/2,a=-this.half+Yt+i*ge+It/2,o=Math.floor(t()*4),c=(t()-.5)*(It+2),l=It/2+1;return o===0?{x:r+c,z:a-l}:o===1?{x:r+c,z:a+l}:o===2?{x:r-l,z:a+c}:{x:r+l,z:a+c}}collide(t,e,n){let i=!1;const r=this.half-1;t<-r&&(t=-r,i=!0),t>r&&(t=r,i=!0),e<-r&&(e=-r,i=!0),e>r&&(e=r,i=!0);const a=this.spec.grid,o=Math.floor((t+this.half-Yt/2)/ge),c=Math.floor((e+this.half-Yt/2)/ge);for(let l=Math.max(0,o-1);l<=Math.min(a-1,o+1);l++)for(let h=Math.max(0,c-1);h<=Math.min(a-1,c+1);h++){for(const d of this.solids[l*a+h]){const u=Math.max(d.minX,Math.min(t,d.maxX)),p=Math.max(d.minZ,Math.min(e,d.maxZ)),g=t-u,b=e-p,m=g*g+b*b;if(!(m>=n*n))if(i=!0,m>1e-6){const f=Math.sqrt(m);t=u+g/f*n,e=p+b/f*n}else{const f=t-d.minX,y=d.maxX-t,A=e-d.minZ,M=d.maxZ-e,C=Math.min(f,y,A,M);C===f?t=d.minX-n:C===y?t=d.maxX+n:C===A?e=d.minZ-n:e=d.maxZ+n}}for(const d of this.circles[l*a+h]){const u=t-d.x,p=e-d.z,g=n+d.r,b=u*u+p*p;if(!(b>=g*g))if(i=!0,b>1e-6){const m=Math.sqrt(b);t=d.x+u/m*g,e=d.z+p/m*g}else t=d.x+g}}return{x:t,z:e,hit:i}}awayFromRoad(t,e){let n=0,i=0;for(const a of this.roadAxes()){const o=t-a,c=e-a;Math.abs(o)<Yt/2&&(n=o>=0?1:-1),Math.abs(c)<Yt/2&&(i=c>=0?1:-1)}if(!n&&!i)return null;const r=Math.hypot(n,i);return{x:n/r,z:i/r}}lineOfSight(t,e,n,i){const r=n-t,a=i-e,o=Math.hypot(r,a),c=Math.ceil(o/3),l=this.spec.grid;for(let h=1;h<c;h++){const d=t+r*h/c,u=e+a*h/c,p=Math.floor((d+this.half-Yt/2)/ge),g=Math.floor((u+this.half-Yt/2)/ge);if(!(p<0||g<0||p>=l||g>=l)){for(const b of this.solids[p*l+g])if(d>b.minX&&d<b.maxX&&u>b.minZ&&u<b.maxZ)return!1}}return!0}renderMinimapBase(){const t=document.createElement("canvas");t.width=132,t.height=132;const e=t.getContext("2d");e.fillStyle="rgba(8,14,9,0.9)",e.fillRect(0,0,132,132);const n=132/(this.half*2),i=this.spec.grid;for(let r=0;r<i;r++)for(let a=0;a<i;a++){const o=(Yt+r*ge)*n,c=(Yt+a*ge)*n;e.fillStyle=r*i+a===this.landmarkBlock?"#4a4a3a":this.parks[r*i+a]?"#1c3a22":"#232a33",e.fillRect(o,c,It*n,It*n)}return t}dispose(){for(const t of this.disposables)t.dispose();this.group.removeFromParent()}}const ls=0,je=1,Ue=2,Dc=[80,110,140],qg=[20,25,30],Uc=[1.1,.9,.75],Yg=[26,28,30],Nc=[2373214,1977424,1447966],Kg=[1714248,1318458,789520],Zg=[9062970,3824266,9075258,5913210,3832410,7829367,10512938,2250103],_r=[14264454,13209194,10119754,8015670,15253658],Fc=[1709072,3022612,4862752,7031338,9071162,11569738,8006170,5593696],$g=9425998,Jg=4872752,Qg=3029532,Oc=new D(0,1,0),Fa=new D(1,0,0),Oa=new qt,Is=new qt,gi=new qt,_i=new tn,Pi=new tn,Fn=new D,xi=new D,xr=new qt().makeScale(0,0,0),jg=new D(0,0,1),t_=new D,e_=new wt,n_=120*120,ss=8,vr=2048,i_=140,Bc=70,Ba=240;class s_{constructor(t,e,n){this.people=[],this.infectedTotal=0,this.initialCiv=0,this.huntAll=!1,this.copTier=0,this.visionMul=1,this.frenzy=0,this.zombieN=0,this.parts={},this.partList=[],this.group=new vn,this.tracers=[],this.tracerShown=0,this.moanCd=0,this.disposables=[],this.clearAll=!0,this.cells=new Map,this.corpseParts=[],this.corpseN=0,this.corpseNext=0,this.pushOut=null,this.max=e,this.cb=n;const i=new In(1,1,1);this.disposables.push(i);const r=o=>{const c=new Me,l=new ne(i,c,e);return l.frustumCulled=!1,l.instanceMatrix.setUsage(qs),this.parts[o]=l,this.partList.push(l),this.group.add(l),this.disposables.push(c,l),l};for(const o of["torso","head","armL","armR","legL","legR","cap"])r(o);for(let o=0;o<3;o++){const c=new Me,l=new ne(i,c,Ba);l.frustumCulled=!1,l.count=0,this.corpseParts.push(l),this.group.add(l),this.disposables.push(c,l)}const a=new _e({color:16773824});this.tracerMesh=new ne(i,a,24),this.tracerMesh.frustumCulled=!1,this.tracerMesh.instanceMatrix.setUsage(qs),this.disposables.push(a,this.tracerMesh),this.group.add(this.tracerMesh),t.add(this.group)}get corpses(){return this.corpseN}populate(t,e,n,i,r=Zg,a=0){this.copTier=a,this.frenzy=0,this.zombieN=0,this.people.length=0,this.infectedTotal=0,this.initialCiv=n,this.tracers.length=0,this.clearAll=!0,this.corpseN=0,this.corpseNext=0;for(const c of this.corpseParts)c.count=0,c.instanceMatrix.needsUpdate=!0;const o=Math.min(this.max,n+i);for(let c=0;c<o;c++){const l=c<n?ls:je,h=t.randomSidewalk(e),d=t.collide(h.x,h.z,.5);this.people.push({alive:!0,kind:l,x:d.x,z:d.z,angle:e()*Math.PI*2,speed:0,state:"walk",t:e()*3,thinkT:e()*.6,phase:e()*10,target:-1,hp:l===je?Dc[a]:30,pitch:0,wasCiv:l===ls,body:new wt(l===je?Nc[a]:r[Math.floor(e()*r.length)]),skin:new wt(_r[Math.floor(e()*_r.length)]),shootT:1+e()*2,soldier:!1,aggroT:0,shown:!1,hair:l===je||e()<.12?null:new wt(Fc[Math.floor(e()*Fc.length)]),tier:l===je?a:0,scared:0,hold:!1})}this.repaintAll()}addCop(t,e,n=!1,i){const r=this.people.findIndex(u=>!u.alive),a=t.half-4,o=Math.floor(e()*4),c=(e()-.5)*a*2,l=i?i.x:o===0?-a:o===1?a:c,h=i?i.z:o<2?c:o===2?-a:a,d={alive:!0,kind:je,x:l,z:h,angle:Math.atan2(-l,-h),speed:0,state:"walk",t:0,thinkT:Math.random()*.3,phase:0,target:-2,hp:n?i_:Dc[this.copTier],pitch:0,wasCiv:!1,body:new wt(n?Jg:Nc[this.copTier]),skin:new wt(_r[Math.floor(e()*_r.length)]),shootT:1.5,soldier:n,aggroT:0,shown:!1,hair:null,tier:n?2:this.copTier,scared:0,hold:!1};if(i?.hold&&(d.hold=!0),r>=0)d.shown=this.people[r].shown,this.people[r]=d;else if(this.people.length<this.max)this.people.push(d);else return!1;return this.repaintAll(),!0}nearby(t,e,n){const i=[],r=Math.floor((t-n)/ss),a=Math.floor((t+n)/ss),o=Math.floor((e-n)/ss),c=Math.floor((e+n)/ss),l=n*n;for(let h=r;h<=a;h++)for(let d=o;d<=c;d++){const u=this.cells.get((h+vr)*4096+(d+vr));if(u)for(const p of u){if(!p.alive)continue;const g=p.x-t,b=p.z-e;g*g+b*b<=l&&i.push(p)}}return i}rebuildCells(){for(const t of this.cells.values())t.length=0;for(const t of this.people){if(!t.alive)continue;const e=(Math.floor(t.x/ss)+vr)*4096+(Math.floor(t.z/ss)+vr);let n=this.cells.get(e);n||(n=[],this.cells.set(e,n)),n.push(t)}}remainingVictims(){let t=0;for(const e of this.people)e.alive&&e.kind!==Ue&&e.state!=="stagger"&&t++;return t}nearestVictim(t,e){let n=null,i=1e9;for(const r of this.people){if(!r.alive||r.kind===Ue||r.state==="stagger")continue;const a=Math.hypot(r.x-t,r.z-e);a<i&&(i=a,n=r)}return n}get zombies(){return this.zombieN}count(t){let e=0;for(const n of this.people)n.alive&&n.kind===t&&e++;return e}bite(t,e,n,i){let r=null,a=i;for(const o of this.people){if(!o.alive||o.kind===Ue||o.state==="stagger")continue;const c=o.x-t,l=o.z-e,h=Math.hypot(c,l);if(h>a)continue;let u=Math.atan2(c,l)-n;for(;u>Math.PI;)u-=Math.PI*2;for(;u<-Math.PI;)u+=Math.PI*2;Math.abs(u)>1.25&&h>.7||(r=o,a=h)}return r&&this.infect(r,!0),r}carHit(t,e,n,i){let r=0;for(const a of this.people)!a.alive||a.kind===Ue||a.state==="stagger"||!i&&a.state==="down"||Math.hypot(a.x-t,a.z-e)>n||(r++,i?this.infect(a,!0):(a.state="down",a.t=2.5+Math.random()*2,a.speed=0));return r}blast(t,e,n){let i=0;for(const r of this.people)!r.alive||r.kind===Ue||r.state==="stagger"||Math.hypot(r.x-t,r.z-e)>n||(this.infect(r,!0),i++);return i}infect(t,e){if(!(t.kind===Ue||t.state==="stagger")){if(t.soldier&&t.hp>Bc){t.hp-=Bc,t.state="down",t.t=1.2,t.speed=0;return}t.state="stagger",t.t=2.2+Math.random()*1.5,t.speed=0,this.infectedTotal++,this.cb.onInfected(e,t.x,t.z,t.kind===je),this.cb.sfx("infected")}}turnZombie(t){t.kind=Ue,t.state="walk",t.t=0,t.target=-1,t.hp=60,t.skin.setHex($g),t.body.multiplyScalar(.45),t.hair&&t.hair.multiplyScalar(.6),this.repaintAll(),this.cb.onConvert(t.x,t.z)}addCorpse(t){const e=this.corpseNext;this.corpseNext=(this.corpseNext+1)%Ba,this.corpseN=Math.min(Ba,this.corpseN+1),Fn.set(t.x,.18,t.z),_i.setFromAxisAngle(Oc,t.angle),Pi.setFromAxisAngle(Fa,Math.PI/2),_i.multiply(Pi),xi.set(1,1,1),Oa.compose(Fn,_i,xi);const[n,i,r]=this.corpseParts;this.part(n,e,0,1.05,0,.52,.62,.3,0),this.part(i,e,0,1.56,0,.3,.3,.28,0),this.part(r,e,0,.55,0,.44,.55,.2,0),n.setColorAt(e,t.body),i.setColorAt(e,t.skin),r.setColorAt(e,e_.copy(t.body).multiplyScalar(.5));for(const a of this.corpseParts)a.count=this.corpseN,a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0)}repaintAll(){const{torso:t,head:e,armL:n,armR:i,legL:r,legR:a}=this.parts,o=new wt;for(let c=0;c<this.people.length;c++){const l=this.people[c];t.setColorAt(c,l.body),e.setColorAt(c,l.skin);const h=l.kind===Ue?l.skin:l.body;n.setColorAt(c,h),i.setColorAt(c,h),o.copy(l.body).multiplyScalar(.5),r.setColorAt(c,o),a.setColorAt(c,o),l.kind===je?o.setHex(l.soldier?Qg:Kg[l.tier]):l.hair&&o.copy(l.hair),this.parts.cap.setColorAt(c,o)}for(const c of this.partList)c.instanceColor&&(c.instanceColor.usage!==qs&&c.instanceColor.setUsage(qs),c.instanceColor.needsUpdate=!0)}panic(t,e,n,i){let r=!1;for(const a of this.people){if(!a.alive||a.kind!==ls||a.state!=="walk"&&a.state!=="flee")continue;const o=a.x-t,c=a.z-e,l=Math.hypot(o,c);l>n||l<.001||!i.lineOfSight(t,e,a.x,a.z)||(!r&&a.state!=="flee"&&Math.random()<.6&&(r=!0,this.cb.sfx("scream")),a.state="flee",a.angle=Math.atan2(o,c)+(Math.random()-.5)*.5,a.speed=3.2,a.thinkT=.7+Math.random()*.5)}}witness(t,e,n){for(const i of this.people){if(!i.alive||i.kind!==je)continue;Math.hypot(i.x-t,i.z-e)<26&&n.lineOfSight(i.x,i.z,t,e)&&(i.aggroT=8)}}update(t,e,n,i){const r=this.people;this.moanCd-=t,this.rebuildCells();let a=0;for(const l of r)l.alive&&l.kind===Ue&&a++;this.zombieN=a,this.frenzy=Math.max(0,Math.min(1,(a-10)/70));const o=t*60,c=Math.sqrt(Math.max(1,o));for(let l=0;l<r.length;l++){const h=r[l];if(h.alive){switch(h.t-=t,h.thinkT-=t,h.state){case"down":h.pitch=Math.min(h.pitch+t*4,Math.PI/2),h.t<=0&&(h.hp<=0?(h.alive=!1,this.addCorpse(h)):(h.state="walk",h.t=1));continue;case"stagger":h.pitch=Math.max(0,h.pitch-t*2),h.angle+=Math.sin(h.t*7)*t*2,h.t<=0&&this.turnZombie(h);continue}if(h.pitch>0&&(h.pitch=Math.max(0,h.pitch-t*3)),h.kind===ls?this.thinkCiv(h,t,e,n):h.kind===Ue?this.thinkZombie(h,l,t,e,n,i):this.thinkCop(h,l,t,e,n),h.speed>0){const d=h.x+Math.sin(h.angle)*h.speed*t,u=h.z+Math.cos(h.angle)*h.speed*t,p=e.collide(d,u,.4);if(h.x=p.x,h.z=p.z,p.hit&&h.thinkT>.2&&Math.random()<o&&(h.angle+=(Math.random()-.5)*1.5*c),this.pushOut){const g=this.pushOut(h.x,h.z,.4);g.hit&&(h.x=g.x,h.z=g.z,h.thinkT>.2&&Math.random()<o&&(h.angle+=(Math.random()-.5)*1.2*c))}h.phase+=h.speed*t*2.4}if(!n.inCar){const d=h.x-n.x,u=h.z-n.z,p=d*d+u*u;if(p<.64&&p>1e-6){const g=Math.sqrt(p);h.x=n.x+d/g*.8,h.z=n.z+u/g*.8}}}}for(let l=this.tracers.length-1;l>=0;l--)this.tracers[l].t-=t,this.tracers[l].t<=0&&this.tracers.splice(l,1)}thinkCiv(t,e,n,i){if(t.scared=Math.max(0,t.scared-e),t.thinkT>0)return;t.thinkT=.25+Math.random()*.25;let r=0,a=0,o=!1,c=14;for(const h of this.people){if(!h.alive||h.kind!==Ue)continue;const d=Math.hypot(h.x-t.x,h.z-t.z);d<c&&(c=d,r=h.x,a=h.z,o=!0)}if(o){t.state!=="flee"&&Math.random()<.35&&this.cb.sfx("scream"),t.state="flee",t.scared=4,t.angle=Math.atan2(t.x-r,t.z-a)+(Math.random()-.5)*.6,t.speed=3.9;return}if(t.scared<=0){for(const h of this.nearby(t.x,t.z,7))if(!(h===t||h.kind!==ls||h.scared<=1.5)){t.state="flee",t.scared=h.scared-1,t.angle=h.angle+(Math.random()-.5)*.7,t.speed=3.9,Math.random()<.12&&this.cb.sfx("scream");return}}else if(t.state==="flee")return;t.state==="flee"&&(t.state="walk",t.t=0),t.speed=1.4;const l=n.awayFromRoad(t.x,t.z);if(l){t.angle=Math.atan2(l.x,l.z)+(Math.random()-.5)*.7,t.speed=2.2;return}t.t<=0&&(t.t=2+Math.random()*4,t.angle+=(Math.random()-.5)*2.2)}thinkZombie(t,e,n,i,r,a){if(t.thinkT>0){if(t.target>=0){const l=this.people[t.target];l&&l.alive&&l.kind!==Ue?Math.hypot(l.x-t.x,l.z-t.z)<.9?(this.infect(l,!1),t.target=-1,t.speed=0,t.thinkT=1.6-.9*this.frenzy):t.angle=Math.atan2(l.x-t.x,l.z-t.z):t.target=-1}return}t.thinkT=.35+Math.random()*.2,this.moanCd<=0&&Math.random()<.1&&Math.hypot(r.x-t.x,r.z-t.z)<30&&(this.cb.sfx("moan"),this.moanCd=2.5);let o=-1,c=this.huntAll?1e9:(24+12*this.frenzy)*this.visionMul;for(let l=0;l<this.people.length;l++){const h=this.people[l];if(!h.alive||h.kind===Ue||h.state==="stagger"||l===e)continue;const d=Math.hypot(h.x-t.x,h.z-t.z);d<c&&(this.huntAll||d<3||i.lineOfSight(t.x,t.z,h.x,h.z))&&(c=d,o=l)}if(o>=0){t.target=o,t.state="chase";const l=this.people[o];t.angle=Math.atan2(l.x-t.x,l.z-t.z),t.speed=4.2*a*(1+.12*this.frenzy);return}if(t.target=-1,t.state="walk",t.speed=1.3+Math.random()*.5,t.t<=0){t.t=2+Math.random()*4;let l=0,h=0,d=25;if(Math.random()<.6)for(const u of this.nearby(t.x,t.z,25)){if(u===t||u.kind!==Ue)continue;const p=Math.hypot(u.x-t.x,u.z-t.z);p>4&&p<d&&(d=p,l=u.x,h=u.z)}d<25?t.angle=Math.atan2(l-t.x,h-t.z)+(Math.random()-.5)*.6:t.angle+=(Math.random()-.5)*2.4}}thinkCop(t,e,n,i,r){if(t.shootT-=n,t.aggroT-=n,t.thinkT>0)return;t.thinkT=.3+Math.random()*.2;let a=-1,o=24*this.visionMul;for(let d=0;d<this.people.length;d++){const u=this.people[d];if(!u.alive||u.kind!==Ue||u.state==="down"||d===e)continue;const p=Math.hypot(u.x-t.x,u.z-t.z);p<o&&i.lineOfSight(t.x,t.z,u.x,u.z)&&(o=p,a=d)}const c=Math.hypot(r.x-t.x,r.z-t.z),l=(t.soldier?36:Yg[t.tier])*this.visionMul;if((t.aggroT>0||t.soldier)&&!r.hidden&&c<l&&(a<0||c<o)&&i.lineOfSight(t.x,t.z,r.x,r.z)){t.state="chase",t.target=-2,t.angle=Math.atan2(r.x-t.x,r.z-t.z),t.speed=c>12?t.soldier?5.2:4.4:0,t.shootT<=0&&c<l-4&&(t.shootT=(t.soldier?.75:Uc[t.tier])+Math.random()*.6,this.fire(t,r.x,1.1,r.z),this.cb.onPlayerHit(t.soldier?r.inCar?7:14:r.inCar?4+t.tier:9+2*t.tier));return}if(a>=0){const d=this.people[a];t.state="chase",t.target=a,t.angle=Math.atan2(d.x-t.x,d.z-t.z),t.speed=o>10?4.2:0,t.shootT<=0&&o<20&&(t.shootT=(t.soldier?.9:Uc[t.tier])+Math.random()*.5,this.fire(t,d.x,1,d.z),d.hp-=t.soldier?40:qg[t.tier],d.hp<=0&&(d.state="down",d.t=2.2,d.speed=0));return}if(t.state="walk",t.target=-1,t.soldier&&!r.hidden){t.angle=Math.atan2(r.x-t.x,r.z-t.z)+(Math.random()-.5)*.4,t.speed=4.2;return}if(t.hold){t.speed=0;return}t.speed=1.7,t.t<=0&&(t.t=2+Math.random()*4,t.angle+=(Math.random()-.5)*2)}fireFrom(t,e,n,i){this.fire({x:t,z:e,angle:Math.atan2(n-t,i-e)},n,1.1,i)}crush(t,e,n){let i=0;for(const r of this.people)!r.alive||r.state==="down"||r.state==="stagger"||Math.hypot(r.x-t,r.z-e)>n||(i++,r.kind===Ue?(r.hp=0,r.state="down",r.t=1.2,r.speed=0):(r.state="down",r.t=2.5+Math.random()*2,r.speed=0));return i}fire(t,e,n,i){this.cb.sfx("shot"),this.cb.onFire(t.x+Math.sin(t.angle)*.5,1.35,t.z+Math.cos(t.angle)*.5),this.tracers.length<24&&this.tracers.push({t:.09,from:new D(t.x,1.35,t.z),to:new D(e,n,i)})}render(t,e){const{torso:n,head:i,armL:r,armR:a,legL:o,legR:c}=this.parts,l=this.partList,h=this.people.length;if(this.clearAll){this.clearAll=!1;for(let u=0;u<this.max;u++)for(const p of l)p.setMatrixAt(u,xr)}for(const u of l)u.count=h;for(let u=0;u<h;u++){const p=this.people[u],g=p.x-t,b=p.z-e;if(!p.alive||g*g+b*b>n_){if(p.shown){p.shown=!1;for(const M of l)M.setMatrixAt(u,xr)}continue}p.shown=!0;const m=p.kind===Ue,f=Math.sin(p.phase)*Math.min(1,p.speed/3)*.5,y=m?.25:0;Fn.set(p.x,p.pitch>.1?.18*(p.pitch/(Math.PI/2)):0,p.z),_i.setFromAxisAngle(Oc,p.angle),Pi.setFromAxisAngle(Fa,p.pitch+y),_i.multiply(Pi),xi.set(1,1,1),Oa.compose(Fn,_i,xi),this.part(n,u,0,1.05,0,.52,.62,.3,0),this.part(i,u,0,1.56,0,.3,.3,.28,0),p.kind===je?this.part(this.parts.cap,u,0,1.74,.02,.36,.1,.36,0):p.hair?this.part(this.parts.cap,u,0,1.7,-.02,.33,.12,.31,0):this.parts.cap.setMatrixAt(u,xr);const A=m?-1.35:f;this.part(r,u,-.34,1.3,0,.14,.55,.16,A,!0),this.part(a,u,.34,1.3,0,.14,.55,.16,m?-1.35:-f,!0),this.part(o,u,-.14,.55,0,.17,.55,.2,-f,!0),this.part(c,u,.14,.55,0,.17,.55,.2,f,!0)}for(const u of l)u.instanceMatrix.needsUpdate=!0;const d=this.tracers.length;for(let u=0;u<d;u++){const p=this.tracers[u];Fn.copy(p.from).add(p.to).multiplyScalar(.5);const g=p.from.distanceTo(p.to);_i.setFromUnitVectors(jg,t_.subVectors(p.to,p.from).normalize()),xi.set(.05,.05,g),gi.compose(Fn,_i,xi),this.tracerMesh.setMatrixAt(u,gi)}for(let u=d;u<this.tracerShown;u++)this.tracerMesh.setMatrixAt(u,xr);this.tracerMesh.count=d,(d>0||this.tracerShown>0)&&(this.tracerMesh.instanceMatrix.needsUpdate=!0),this.tracerShown=d}part(t,e,n,i,r,a,o,c,l,h=!1){if(Pi.setFromAxisAngle(Fa,l),h){const d=o/2;Fn.set(n,i+d,r),Is.compose(Fn,Pi,xi.set(1,1,1)),gi.makeTranslation(0,-d,0),Is.multiply(gi),gi.makeScale(a,o,c),Is.multiply(gi)}else Fn.set(n,i,r),Is.compose(Fn,Pi,xi.set(a,o,c));gi.multiplyMatrices(Oa,Is),t.setMatrixAt(e,gi)}dispose(){for(const t of this.disposables)t.dispose();this.group.removeFromParent()}}const r_={civ:{body:[0,.55,0,2,.62,4.4],cabin:[0,1.08,-.3,1.7,.5,2.2],wheel:[.95,.32,1.45,.28,.64,.72],lightY:.62,half:2.21},police:{body:[0,.55,0,2,.62,4.4],cabin:[0,1.08,-.3,1.7,.5,2.2],wheel:[.95,.32,1.45,.28,.64,.72],lightY:.62,half:2.21},army:{body:[0,.95,-.6,2.4,1.3,5.2],cabin:[0,1.15,2.6,2.2,1.5,1.6],wheel:[1.1,.42,1.9,.36,.84,.9],lightY:.9,half:3.41}},a_=15133682,o_=5596474,l_=1710101,c_=new wt(16724016),h_=new wt(2765346),u_=new wt(3830015);function Mr(s,t,e){return s+Gg*e*(t===0?1:-1)}function yr(s,t){return s===0?t>0?Math.PI/2:-Math.PI/2:t>0?0:Math.PI}const za=new D(0,1,0),zc=new D(1,0,0),kc=new qt,On=new tn,Sr=new tn,vi=new D,Mi=new D,Hc=new qt,rs=new qt,rn=new qt().makeScale(0,0,0),d_=[10104623,3103386,11579572,3816e3,10123823,3111498,6958970,12872218];function f_(){const s=document.createElement("canvas");s.width=64,s.height=64;const t=s.getContext("2d"),e=t.createRadialGradient(32,8,2,32,40,44);e.addColorStop(0,"rgba(255,240,190,0.55)"),e.addColorStop(.5,"rgba(255,235,170,0.18)"),e.addColorStop(1,"rgba(255,230,150,0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const n=new Ms(s);return n.colorSpace=Ze,n}class p_{constructor(t,e){this.cars=[],this.group=new vn,this.disposables=[],this.max=e;const n=new In(1,1,1);this.disposables.push(n);const i=new Me,r=new Me({color:1119260}),a=new _e({color:16773576}),o=new _e({color:16728128}),c=new Me({color:790034});this.body=new ne(n,i,e),this.cabin=new ne(n,r,e),this.lightsF=new ne(n,a,e),this.lightsR=new ne(n,o,e),this.wheels=new ne(n,c,e*4);const l=f_(),h=new _e({map:l,transparent:!0,depthWrite:!1,blending:ni}),d=new Pn(1,1);this.beams=new ne(d,h,e),this.beams.renderOrder=2;const u=new _e({color:16777215});this.bar=new ne(n,u,e);const p=new _e({map:l,transparent:!0,depthWrite:!1,blending:ni});this.flash=new ne(d,p,e),this.flash.renderOrder=2;for(const g of[this.body,this.cabin,this.lightsF,this.lightsR,this.wheels,this.beams,this.bar,this.flash])g.frustumCulled=!1,this.group.add(g),this.disposables.push(g);this.disposables.push(i,r,a,o,c,l,h,d,u,p),t.add(this.group)}populate(t,e,n,i=d_){this.cars.length=0;const r=t.roadAxes();for(let a=0;a<Math.min(n,this.max);a++){const o=e()<.5?0:1,c=r[Math.floor(e()*r.length)],l=e()<.5?1:-1,h=(e()-.5)*(t.half*2-10),d=Mr(c,o,l);this.cars.push({alive:!0,x:o===0?h:d,z:o===0?d:h,angle:yr(o,l),speed:0,color:new wt(i[Math.floor(e()*i.length)]),ai:!0,axis:o,sign:l,stuckT:0,honkT:0,honk:!1,laneX:null,laneZ:null,turnAt:null,kind:"civ",wrecked:!1,apc:!1,fireT:0})}this.repaint()}repaint(){for(let t=0;t<this.cars.length;t++)this.body.setColorAt(t,this.cars[t].color);this.body.instanceColor&&(this.body.instanceColor.needsUpdate=!0)}makePolice(t){t.kind="police",t.color.setHex(a_),this.repaint()}wreck(t){t.wrecked=!0,t.ai=!1,t.speed=0,t.color.setHex(l_),this.repaint()}spawnArmy(t,e,n=0){const i=t.roadAxes();let r=0;for(const a of this.cars){if(r>=e)break;if(!a.alive||!a.ai||a.kind!=="civ"||a.wrecked)continue;const o=r%2===0?0:1,c=i[Math.floor(Math.random()*i.length)],l=Math.random()<.5?1:-1,h=-l*(t.half-6),d=Mr(c,o,l);a.x=o===0?h:d,a.z=o===0?d:h,a.axis=o,a.sign=l,a.angle=yr(o,l),a.speed=0,a.stuckT=0,a.turnAt=null,a.laneX=null,a.laneZ=null,a.kind="army",a.apc=r<n,a.color.setHex(a.apc?3819056:o_),a.fireT=2,r++}return this.repaint(),r}nearest(t,e,n,i=!1){let r=null,a=n;for(const o of this.cars){if(!o.alive||o.wrecked||i&&!o.ai)continue;const c=Math.hypot(o.x-t,o.z-e);c<a&&(a=c,r=o)}return r}update(t,e,n){const i=e.roadAxes();for(const r of this.cars){if(!r.alive||!r.ai)continue;const a=Math.sin(r.angle),o=Math.cos(r.angle),c=r.x+a*7,l=r.z+o*7,h=r.x+a*3.4,d=r.z+o*3.4;let u=n(c,l,2.6,r)||n(h,d,2.2,r),p=!1;for(const y of this.cars)if(!(y===r||!y.alive)&&Math.hypot(y.x-c,y.z-l)<3.4){u=!0,p=Math.abs(y.speed)<.5&&(!y.ai||y.axis===r.axis&&y.sign!==r.sign);break}const g=u?0:7.5;r.speed+=Math.sign(g-r.speed)*Math.min(Math.abs(g-r.speed),t*10),u?(r.stuckT+=t,r.stuckT>2.4&&r.honkT<=0&&(r.honkT=.5,r.honk=!0),r.stuckT>5&&p&&(this.uTurn(r,i),r.stuckT=0)):r.stuckT=0,r.x+=a*r.speed*t,r.z+=o*r.speed*t;const b=r.axis===0?r.x:r.z;for(const y of i){const A=(b-y)*r.sign;if(!(A<=-.4||A>=.4)){if(r.turnAt===y||Math.abs(r.speed)<1)break;if(r.turnAt=y,Math.random()<.35){const M=1-r.axis,C=Math.random()<.5?1:-1;this.setLane(r,Mr(y,M,C),M),r.axis=M,r.sign=C,r.angle=yr(M,C)}break}}const m=Math.abs(r.speed)*t*.6;if(r.laneZ!==null){const y=r.laneZ-r.z;r.z+=Math.sign(y)*Math.min(Math.abs(y),m),Math.abs(y)<.05&&(r.laneZ=null)}if(r.laneX!==null){const y=r.laneX-r.x;r.x+=Math.sign(y)*Math.min(Math.abs(y),m),Math.abs(y)<.05&&(r.laneX=null)}const f=e.half-3;(r.axis===0?r.x:r.z)*r.sign>f&&(r.axis===0?r.x=f*r.sign:r.z=f*r.sign,this.uTurn(r,i)),r.honkT-=t}}setLane(t,e,n){n===0?(t.laneZ=e,t.laneX=null):(t.laneX=e,t.laneZ=null)}uTurn(t,e){t.sign=t.sign*-1,t.angle=yr(t.axis,t.sign),t.turnAt=null;const n=t.axis===0?t.z:t.x,i=e.reduce((r,a)=>Math.abs(n-a)<Math.abs(n-r)?a:r);this.setLane(t,Mr(i,t.axis,t.sign),t.axis)}pushOut(t,e,n,i=null){let r=!1;for(const a of this.cars){if(!a.alive||a===i)continue;const o=t-a.x,c=e-a.z;if(o*o+c*c>36)continue;const l=Math.sin(a.angle),h=Math.cos(a.angle),d=a.kind==="army"?2.6:1.6,u=Math.max(-d,Math.min(d,o*l+c*h)),p=a.x+l*u,g=a.z+h*u,b=t-p,m=e-g,f=b*b+m*m,y=(a.kind==="army"?1.35:1.15)+n;if(!(f>=y*y))if(r=!0,f>1e-6){const A=Math.sqrt(f);t=p+b/A*y,e=g+m/A*y}else t=p+h*y,e=g-l*y}return{x:t,z:e,hit:r}}render(t,e,n=0){const r=Math.floor(n*8)%2===0?c_:u_;for(let a=0;a<this.max;a++){const o=a<this.cars.length?this.cars[a]:null;if(!o||!o.alive){this.hide(a);continue}const c=o.x-t,l=o.z-e;if(c*c+l*l>12100){this.hide(a);continue}const h=r_[o.kind];vi.set(o.x,0,o.z),On.setFromAxisAngle(za,o.angle),Mi.set(1,1,1),kc.compose(vi,On,Mi);const[d,u,p,g,b,m]=h.body;this.place(this.body,a,d,u,p,g,b,m);const[f,y,A,M,C,T]=h.cabin;this.place(this.cabin,a,f,y,A,M,C,T),o.wrecked?(this.lightsF.setMatrixAt(a,rn),this.lightsR.setMatrixAt(a,rn),this.beams.setMatrixAt(a,rn)):(this.place(this.lightsF,a,0,h.lightY,h.half,1.5,.16,.06),this.place(this.lightsR,a,0,h.lightY,-h.half,1.6,.16,.06));const[P,x,v,E,w,L]=h.wheel;for(let B=0;B<4;B++){const W=B%2===0?-1:1,N=B<2?1:-1;this.place(this.wheels,a*4+B,W*P,x,N*v,E,w,L)}o.apc&&!o.wrecked?(this.place(this.bar,a,0,2,-.6,1.5,.8,1.8),this.bar.setColorAt(a,h_),this.flash.setMatrixAt(a,rn)):o.kind==="police"&&!o.wrecked?(this.place(this.bar,a,0,1.42,-.3,1.1,.14,.3),this.bar.setColorAt(a,r),vi.set(o.x,.26,o.z),On.setFromAxisAngle(za,o.angle),Sr.setFromAxisAngle(zc,-Math.PI/2),On.multiply(Sr),Mi.set(9,9,1),rs.compose(vi,On,Mi),this.flash.setMatrixAt(a,rs),this.flash.setColorAt(a,r)):(this.bar.setMatrixAt(a,rn),this.flash.setMatrixAt(a,rn)),!o.wrecked&&(vi.set(o.x+Math.sin(o.angle)*5.6,.25,o.z+Math.cos(o.angle)*5.6),On.setFromAxisAngle(za,o.angle),Sr.setFromAxisAngle(zc,-Math.PI/2),On.multiply(Sr),Mi.set(5.2,7.2,1),rs.compose(vi,On,Mi),this.beams.setMatrixAt(a,rs))}for(const a of[this.body,this.cabin,this.lightsF,this.lightsR,this.wheels,this.beams,this.bar,this.flash])a.instanceMatrix.needsUpdate=!0;this.bar.instanceColor&&(this.bar.instanceColor.needsUpdate=!0),this.flash.instanceColor&&(this.flash.instanceColor.needsUpdate=!0)}place(t,e,n,i,r,a,o,c){vi.set(n,i,r),On.identity(),Mi.set(a,o,c),Hc.compose(vi,On,Mi),rs.multiplyMatrices(kc,Hc),t.setMatrixAt(e,rs)}hide(t){this.body.setMatrixAt(t,rn),this.cabin.setMatrixAt(t,rn),this.lightsF.setMatrixAt(t,rn),this.lightsR.setMatrixAt(t,rn),this.beams.setMatrixAt(t,rn),this.bar.setMatrixAt(t,rn),this.flash.setMatrixAt(t,rn);for(let e=0;e<4;e++)this.wheels.setMatrixAt(t*4+e,rn)}dispose(){for(const t of this.disposables)t.dispose();this.group.removeFromParent()}}const m_=new D(0,1,0),g_=new D(1,0,0),Gc=new tn;class __{constructor(t){this.group=new vn,this.x=0,this.z=0,this.angle=0,this.hp=100,this.maxHp=100,this.camYaw=0,this.camPitch=.36,this.car=null,this.biteCd=0,this.lungeT=0,this.phase=0,this.parts={},this.disposables=[],this.speedMul=1,this.biteRadius=2.2,this.runMul=1,this.grip=1,this.camT=1,this.crashed=!1;const e=new In(1,1,1);this.disposables.push(e);const n=new Me({color:11065536,emissive:1980976}),i=new Me({color:13162664,emissive:1845782}),r=new Me({color:5929576,emissive:1056022}),a=new Me({color:2759698,emissive:656900});this.disposables.push(n,i,r,a);const o=new _e({color:10485680,transparent:!1,opacity:.6,blending:jn,depthFunc:Wr,depthWrite:!1});this.disposables.push(o);const c=(l,h,d,u,p,g=!1)=>{const b=new oe(e,h);if(b.scale.set(d,u,p),b.renderOrder=2,g){const m=new oe(e,o);m.renderOrder=1,b.add(m)}return this.parts[l]=b,this.group.add(b),b};c("torso",n,.54,.64,.32,!0).position.y=1.05,c("head",i,.32,.32,.3,!0).position.y=1.58,c("hair",a,.35,.12,.33).position.set(0,1.72,-.02),c("armL",i,.15,.56,.17).position.set(-.36,1.3,0),c("armR",i,.15,.56,.17).position.set(.36,1.3,0),c("legL",r,.18,.56,.21).position.set(-.15,.55,0),c("legR",r,.18,.56,.21).position.set(.15,.55,0),t.add(this.group)}reset(t,e){this.x=t,this.z=e,this.hp=this.maxHp,this.car=null,this.angle=0,this.camYaw=0,this.camT=1,this.group.visible=!0}get inCar(){return this.car!==null}carSpeed01(){return this.car?Math.min(1,Math.abs(this.car.speed)/17):0}update(t,e,n){if(this.camYaw-=e.camDX*.0042,this.camPitch=Math.max(.12,Math.min(.9,this.camPitch+e.camDY*.003)),this.biteCd-=t,this.lungeT=Math.max(0,this.lungeT-t*4),this.car){this.drive(t,e,n);return}const i=e.moveX,r=e.moveZ,a=Math.hypot(i,r);if(a>.1){let c=Math.atan2(-i,r)+this.camYaw-this.angle;for(;c>Math.PI;)c-=Math.PI*2;for(;c<-Math.PI;)c+=Math.PI*2;this.angle+=c*Math.min(1,t*12);const l=5.4*this.speedMul*this.runMul*Math.min(1,a),h=this.x+Math.sin(this.angle)*l*t,d=this.z+Math.cos(this.angle)*l*t,u=n.collide(h,d,.45);this.x=u.x,this.z=u.z,this.phase+=l*t*2.2}else this.phase*=.9;this.pose()}drive(t,e,n){const i=this.car,r=e.moveZ,a=r>.1?17:r<-.1?-6:0,o=Math.abs(a)>.1?9:6;i.speed+=Math.sign(a-i.speed)*Math.min(Math.abs(a-i.speed),t*o);const c=-e.moveX*Math.min(1,Math.abs(i.speed)/6)*1.9*this.grip;i.angle+=c*t*Math.sign(i.speed||1);const l=Math.sin(i.angle),h=Math.cos(i.angle),d=i.x+l*i.speed*t,u=i.z+h*i.speed*t,p=1.7,g=n.collide(d+l*p,u+h*p,1.15),b=n.collide(d-l*p,u-h*p,1.15);g.hit||b.hit?(this.crashed=Math.abs(i.speed)>7,i.speed*=-.25,i.x=(g.x+b.x)/2,i.z=(g.z+b.z)/2):(i.x=d,i.z=u),this.x=i.x,this.z=i.z,this.camYawFollow(i.angle,t)}camYawFollow(t,e){let n=t-this.camYaw;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;this.camYaw+=n*Math.min(1,e*1.6)}enterCar(t){this.car=t,t.ai=!1,this.group.visible=!1}exitCar(t,e){const n=this.car;if(!n)return;n.speed=0,this.car=null;const i=[[Math.PI/2,2.2],[-Math.PI/2,2.2],[Math.PI,3.6],[0,3.6]];let r=null;for(const[a,o]of i){const c=n.x+Math.sin(n.angle+a)*o,l=n.z+Math.cos(n.angle+a)*o,h=t.collide(c,l,.45),d=e?e.pushOut(h.x,h.z,.45):{x:h.x,z:h.z,hit:!1};if(!h.hit&&!d.hit){r={x:c,z:l};break}if(!r){const u=t.collide(d.x,d.z,.45);r={x:u.x,z:u.z}}}this.x=r.x,this.z=r.z,this.angle=n.angle,this.group.visible=!0,this.pose()}pose(){const t=Math.sin(this.phase)*.5,e=this.lungeT;this.group.position.set(this.x,0,this.z),this.group.quaternion.setFromAxisAngle(m_,this.angle),e>.001&&(Gc.setFromAxisAngle(g_,e*.5),this.group.quaternion.multiply(Gc));const n=(i,r)=>{this.parts[i].rotation.x=r};n("armL",e>.05?-1.5:t),n("armR",e>.05?-1.5:-t),n("legL",-t),n("legR",t)}applyCamera(t,e,n,i=0){const r=this.inCar,a=t.aspect<1?1.5:1,o=(r?10.5:6.2)*a,c=(r?4.2:2.4+this.camPitch*2.4)*(a>1?1.2:1),l=-Math.sin(this.camYaw),h=-Math.cos(this.camYaw),d=(f,y,A,M)=>{if(e.collide(f,A,.55).hit||e.cameraBlocked(f,y,A))return!0;if(!M)return!1;for(const C of n)if(!(!C.alive||C===this.car)&&Math.hypot(C.x-f,C.z-A)<2.3)return!0;return!1};t.near>.16&&(t.near=.15,t.updateProjectionMatrix());let u=0;for(let f=.14;f<=1.001&&!d(this.x+l*o*f,c*Math.max(.55,f),this.z+h*o*f,o*f>2.8);f+=.08)u=f;u<this.camT||i<=0?this.camT=u:this.camT=Math.min(u,this.camT+i*.9),u=this.camT;let p,g,b;u>0?(p=this.x+l*o*u,g=this.z+h*o*u,b=c*Math.max(.55,u)):(p=this.x+l*.5,g=this.z+h*.5,b=Math.max(c,3.4));const m=e.collide(p,g,.55);t.position.set(m.x,b,m.z),t.lookAt(this.x,1.4,this.z)}dispose(){for(const t of this.disposables)t.dispose();this.group.removeFromParent()}}const ka=300,Ha=160,br=new qt,Er=new D,wr=new D,Tr=new qt().makeScale(0,0,0),x_=new wt;function v_(){const s=document.createElement("canvas");s.width=32,s.height=32;const t=s.getContext("2d"),e=t.createRadialGradient(16,16,1,16,16,15);return e.addColorStop(0,"rgba(255,255,255,0.6)"),e.addColorStop(.6,"rgba(255,255,255,0.22)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,32,32),new Ms(s)}class M_{constructor(t){this.pool=[],this.smokePool=[],this.fires=[],this.disposables=[];const e=new Pn(1,1),n=v_(),i=new _e({map:n,transparent:!0,depthWrite:!1,blending:ni});this.mesh=new ne(e,i,ka),this.mesh.frustumCulled=!1,this.mesh.renderOrder=3,this.disposables.push(e,n,i,this.mesh);const r=new wt(0,0,0);for(let o=0;o<ka;o++)this.pool.push({life:0,max:1,x:0,y:0,z:0,vx:0,vy:0,vz:0,size:1,grow:0,color:new wt}),this.mesh.setMatrixAt(o,Tr),this.mesh.setColorAt(o,r);this.mesh.instanceColor.needsUpdate=!0,t.add(this.mesh);const a=new _e({map:n,transparent:!0,depthWrite:!1,opacity:.85,blending:jn});this.smoke=new ne(e,a,Ha),this.smoke.frustumCulled=!1,this.smoke.renderOrder=3,this.disposables.push(a,this.smoke);for(let o=0;o<Ha;o++)this.smokePool.push({life:0,max:1,x:0,y:0,z:0,vx:0,vy:0,vz:0,size:1,grow:0,color:new wt}),this.smoke.setMatrixAt(o,Tr),this.smoke.setColorAt(o,r);this.smoke.instanceColor.needsUpdate=!0,t.add(this.smoke)}get fireCount(){return this.fires.length}addFire(t,e){this.fires.push({x:t,z:e,acc:0})}clearFires(){this.fires.length=0;for(const t of this.smokePool)t.life=0}puff(t,e){for(const n of this.smokePool){if(n.life>0)continue;n.life=n.max=3.2+Math.random()*1.6,n.x=t+(Math.random()-.5)*1.2,n.y=1.4,n.z=e+(Math.random()-.5)*1.2,n.vx=(Math.random()-.5)*.6,n.vz=(Math.random()-.5)*.6,n.vy=1.6+Math.random()*.8,n.size=1.4+Math.random()*.6,n.grow=3.5;const i=.05+Math.random()*.05;n.color.setRGB(i,i,i*1.1);return}}emit(t,e,n,i,r,a,o,c,l=0){let h=0;for(const d of this.pool){if(h>=r)break;if(d.life>0)continue;h++,d.life=d.max=c*(.7+Math.random()*.6),d.x=t,d.y=e+Math.random()*.6,d.z=n;const u=Math.random()*Math.PI*2,p=a*(.4+Math.random()*.8);d.vx=Math.sin(u)*p,d.vz=Math.cos(u)*p,d.vy=a*(.5+Math.random()),d.size=o*(.7+Math.random()*.6),d.grow=l,d.color.setHex(i)}}infection(t,e){this.emit(t,1.2,e,8257354,8,1.4,.32,.5,.2)}conversion(t,e){this.emit(t,.6,e,4915050,10,1.8,.42,.7,.4)}muzzle(t,e,n){this.emit(t,e,n,16767370,3,.6,.4,.12)}crash(t,e){this.emit(t,.7,e,16756832,8,3,.3,.4)}outbreak(t,e){this.emit(t,.8,e,9109338,36,7,.6,.8,.8)}update(t,e){for(const n of this.fires){for(n.acc+=t;n.acc>.035;)n.acc-=.035,this.emit(n.x+(Math.random()-.5)*1.8,.8,n.z+(Math.random()-.5)*1.8,Math.random()<.5?16747040:16765024,1,1.5,1.3,.55,.4),Math.random()<.3&&this.puff(n.x,n.z);this.emit(n.x,.4,n.z,11553300,1,0,5.5,.12,0)}for(let n=0;n<Ha;n++){const i=this.smokePool[n];if(i.life<=0){this.smoke.setMatrixAt(n,Tr);continue}i.life-=t,i.x+=i.vx*t,i.y+=i.vy*t,i.z+=i.vz*t;const r=Math.max(0,i.life/i.max),a=i.size+i.grow*(1-r);Er.set(i.x,i.y,i.z),wr.set(a,a,a),br.compose(Er,e.quaternion,wr),this.smoke.setMatrixAt(n,br),this.smoke.setColorAt(n,x_.copy(i.color).multiplyScalar(Math.min(1,r*1.5)))}this.smoke.instanceMatrix.needsUpdate=!0,this.smoke.instanceColor&&(this.smoke.instanceColor.needsUpdate=!0);for(let n=0;n<ka;n++){const i=this.pool[n];if(i.life<=0){this.mesh.setMatrixAt(n,Tr);continue}i.life-=t,i.x+=i.vx*t,i.y+=i.vy*t,i.z+=i.vz*t,i.vy-=t*2.2;const r=Math.max(0,i.life/i.max),a=i.size*(r*.7+.3)+i.grow*(1-r);Er.set(i.x,i.y,i.z),wr.set(a,a,a),br.compose(Er,e.quaternion,wr),this.mesh.setMatrixAt(n,br),this.mesh.setColorAt(n,i.color)}this.mesh.instanceMatrix.needsUpdate=!0,this.mesh.instanceColor&&(this.mesh.instanceColor.needsUpdate=!0)}dispose(){for(const t of this.disposables)t.dispose();this.mesh.removeFromParent(),this.smoke.removeFromParent()}}const y_=new D(0,-1,0),Ar=new D,Vc=new tn;function S_(){const s=document.createElement("canvas");s.width=64,s.height=64;const t=s.getContext("2d"),e=t.createRadialGradient(32,32,2,32,32,31);e.addColorStop(0,"rgba(255,255,240,0.9)"),e.addColorStop(.6,"rgba(255,255,230,0.35)"),e.addColorStop(1,"rgba(255,255,220,0)"),t.fillStyle=e,t.fillRect(0,0,64,64);const n=new Ms(s);return n.colorSpace=Ze,n}class b_{constructor(t){this.group=new vn,this.active=!1,this.x=0,this.z=0,this.y=19,this.orbit=0,this.cx=0,this.cz=0,this.lightX=0,this.lightZ=0,this.craft=new vn,this.disposables=[];const e=new In(1,1,1),n=new Me({color:2304048}),i=new Me({color:1186342,emissive:660512});this.disposables.push(e,n,i);const r=(p,g,b,m,f,y,A)=>{const M=new oe(e,p);return M.scale.set(g,b,m),M.position.set(f,y,A),this.craft.add(M),M};r(n,1.7,1.5,4.4,0,0,0),r(i,1.5,1.1,1.2,0,.05,2.5),r(n,.5,.5,4.2,0,.35,-4),r(n,.12,1.4,.5,0,1,-6),r(n,.14,.14,3.6,-.9,-1,0),r(n,.14,.14,3.6,.9,-1,0),this.rotor=r(n,11,.07,.42,0,1.05,0),this.tailRotor=r(n,.07,2,.28,.32,.6,-6);const a=new _e({color:16724e3}),o=new _e({color:3211104});this.disposables.push(a,o),r(a,.22,.22,.22,-.95,.2,.8),r(o,.22,.22,.22,.95,.2,.8),this.group.add(this.craft);const c=new $n(1,1,18,1,!0);c.translate(0,-.5,0);const l=new _e({color:16774352,transparent:!0,opacity:.11,depthWrite:!1,blending:ni,side:Tn});this.cone=new oe(c,l),this.cone.renderOrder=2,this.cone.frustumCulled=!1,this.group.add(this.cone);const h=S_(),d=new Pn(1,1),u=new _e({map:h,transparent:!0,depthWrite:!1,blending:ni});this.disc=new oe(d,u),this.disc.rotation.x=-Math.PI/2,this.disc.renderOrder=2,this.disc.frustumCulled=!1,this.group.add(this.disc),this.disposables.push(c,l,h,d,u),this.group.visible=!1,t.add(this.group)}show(t,e=0,n=0){t&&!this.active&&(this.cx=e,this.cz=n,this.orbit=Math.random()*Math.PI*2,this.x=e+Math.cos(this.orbit)*140,this.z=n+Math.sin(this.orbit)*140,this.lightX=e,this.lightZ=n),this.active=t,this.group.visible=t}lights(t,e){return this.active&&Math.hypot(t-this.lightX,e-this.lightZ)<5.5}distanceTo(t,e){return Math.hypot(this.x-t,this.z-e)}update(t,e,n,i,r){if(!this.active)return;if(r){const b=Math.max(19,r.skyline(this.x,this.z,16)+6);this.y+=(b-this.y)*Math.min(1,t*1.5)}this.cx+=(e-this.cx)*Math.min(1,t*.35),this.cz+=(n-this.cz)*Math.min(1,t*.35),this.orbit+=t*.32;const a=42,o=this.cx+Math.cos(this.orbit)*a,c=this.cz+Math.sin(this.orbit)*a;this.x+=(o-this.x)*Math.min(1,t*1.2),this.z+=(c-this.z)*Math.min(1,t*1.2);const l=Math.sin(i*1.7)*.4;this.craft.position.set(this.x,this.y+l,this.z);const h=Math.atan2(Math.cos(this.orbit),-Math.sin(this.orbit));this.craft.rotation.set(0,h,0),this.craft.rotateZ(.14),this.rotor.rotation.y+=t*28,this.tailRotor.rotation.x+=t*40;const d=this.cx+Math.sin(i*.61)*14+Math.cos(i*.23)*6,u=this.cz+Math.cos(i*.47)*14+Math.sin(i*.31)*6;this.lightX+=(d-this.lightX)*Math.min(1,t*2),this.lightZ+=(u-this.lightZ)*Math.min(1,t*2);const p=this.y+l-.8;Ar.set(this.lightX-this.x,.2-p,this.lightZ-this.z);const g=Ar.length();Ar.normalize(),Vc.setFromUnitVectors(y_,Ar),this.cone.quaternion.copy(Vc),this.cone.position.set(this.x,p,this.z),this.cone.scale.set(4.2,g,4.2),this.disc.position.set(this.lightX,.22,this.lightZ),this.disc.scale.set(11,11,1)}dispose(){for(const t of this.disposables)t.dispose();this.group.removeFromParent()}}const Ga=[15263978,13158604,1711138,3816e3,3103386,10104623,6974064,11579572],Va=[3816e3,10132126,1711138,3103386,9054762,5921376,13158604,3107402],Cr=[2763312,3814720,4864554,2767434,5592405,3811882,2771514,6969930],Wc=[12610090,14196784,10107530,2787978,13650506,3840586,9062970,14733472],Ds=[9062970,3824266,9075258,5913210,3832410,7829367,10512938,2250103],E_=[{fog:[.62,.35,.1],fogDensity:.0105,hemi:[5333146,1843240],hemiIntensity:1.5,bldHue:[.55,.67],bldSat:[.1,.25],bldLight:[.62,.92],baseH:[8,14],downtownH:[26,30],roof:1185052,roofH:.3,ground:2303534,walk:4870234,park:1519644,dash:6448986,winWarm:"#ffdf9a",winCold:"#b8d4f0",winWarmShare:.3,windowRate:.24,wall:"#2a3040",lamp:15266047,neonHues:[.95,.55,.13,.75,.35],neonRate:.7,tree:"sakura",weather:"rain",landmark:"tokyo-tower",cars:Ga,clothes:Ds,stars:260,moon:15265528},{fog:[.72,.3,.1],fogDensity:.0115,hemi:[5918618,1842218],hemiIntensity:1.45,bldHue:[.6,.72],bldSat:[.08,.2],bldLight:[.6,.9],baseH:[8,12],downtownH:[18,26],roof:1315872,roofH:.3,ground:2368815,walk:5000796,park:1715740,dash:6711898,winWarm:"#ffd88a",winCold:"#c4d0ff",winWarmShare:.45,windowRate:.26,wall:"#2c2c44",lamp:16773840,neonHues:[.85,.6,.1,.5,0],neonRate:.9,tree:"ginkgo",weather:"none",landmark:"namsan",cars:Ga,clothes:Ds,stars:220,moon:15265528},{fog:[.6,.3,.13],fogDensity:.013,hemi:[4872858,2106412],hemiIntensity:1.4,bldHue:[.55,.62],bldSat:[.1,.2],bldLight:[.7,.95],baseH:[10,16],downtownH:[40,50],roof:1053720,roofH:.3,ground:2369327,walk:4870234,park:1519644,dash:6448986,winWarm:"#ffd070",winCold:"#a8d8ff",winWarmShare:.5,windowRate:.3,wall:"#28303c",lamp:16773312,neonHues:[0,.12,.55,.9],neonRate:.6,tree:"oak",weather:"none",landmark:"pearl",cars:Ga,clothes:Ds,stars:120,moon:15261904},{fog:[.17,.3,.1],fogDensity:.0115,hemi:[9083466,2763292],hemiIntensity:1.5,bldHue:[.1,.18],bldSat:[.1,.25],bldLight:[.6,.9],baseH:[6,10],downtownH:[14,22],roof:1710096,roofH:.3,ground:2762786,walk:5656648,park:1979416,dash:6973008,winWarm:"#ffe08a",winCold:"#d0f0c0",winWarmShare:.7,windowRate:.28,wall:"#3a3828",lamp:16770720,neonHues:[.13,.08,.95,.4],neonRate:.75,tree:"palm",weather:"rain",landmark:"temple",cars:[15263978,14196784,10104623,3111498,3816e3,3103386,14721216,12872218],clothes:Wc,stars:150,moon:15788232},{fog:[.07,.4,.11],fogDensity:.012,hemi:[10119738,2760730],hemiIntensity:1.5,bldHue:[.06,.12],bldSat:[.15,.3],bldLight:[.6,.88],baseH:[6,10],downtownH:[12,22],roof:1840144,roofH:.3,ground:2762272,walk:5918790,park:2241050,dash:6972496,winWarm:"#ffd080",winCold:"#e0e0c0",winWarmShare:.85,windowRate:.3,wall:"#3a2e24",lamp:16756800,neonHues:[.08,.13,.95],neonRate:.5,tree:"palm",weather:"none",landmark:"gateway",cars:[1711138,14725152,1711138,14725152,15263978,10104623,3103386,13158604],clothes:Wc,stars:100,moon:15785136},{fog:[.09,.35,.13],fogDensity:.0125,hemi:[10521178,2761754],hemiIntensity:1.55,bldHue:[.08,.12],bldSat:[.15,.3],bldLight:[.7,.95],baseH:[5,8],downtownH:[8,14],roof:2761752,roofH:.25,ground:3025442,walk:6445128,park:2765336,dash:7629912,winWarm:"#ffd88a",winCold:"#f0e8d0",winWarmShare:.9,windowRate:.22,wall:"#4a4030",lamp:16760928,neonHues:[.1,.13,.35],neonRate:.35,tree:"palm",weather:"dust",landmark:"pyramid",cars:[15263978,14209216,1711138,10104623,11579572,3816e3,9075290,3103386],clothes:[14735552,12628112,3816e3,9062970,2771562,13680800,6969930,10127978],stars:320,moon:16773328},{fog:[.66,.35,.1],fogDensity:.011,hemi:[5921434,1973802],hemiIntensity:1.5,bldHue:[.08,.15],bldSat:[.1,.22],bldLight:[.65,.92],baseH:[6,9],downtownH:[10,18],roof:3809304,roofH:.35,ground:2500142,walk:5526106,park:1847838,dash:6974042,winWarm:"#ffdc90",winCold:"#d8e0ff",winWarmShare:.75,windowRate:.26,wall:"#3a3040",lamp:16769184,neonHues:[.1,.55,.95],neonRate:.45,tree:"cypress",weather:"none",landmark:"mosque",cars:[14725152,15263978,14725152,3816e3,10104623,3103386,13158604,1711138],clothes:Ds,stars:240,moon:16052448},{fog:[.6,.15,.14],fogDensity:.012,hemi:[6978202,2764342],hemiIntensity:1.6,bldHue:[.55,.62],bldSat:[.05,.12],bldLight:[.7,.95],baseH:[10,12],downtownH:[14,24],roof:15265012,roofH:.6,ground:3817030,walk:9080470,park:9080984,dash:8027782,winWarm:"#ffd890",winCold:"#e8f0ff",winWarmShare:.8,windowRate:.3,wall:"#303640",lamp:16771248,neonHues:[0,.6],neonRate:.3,tree:"fir",weather:"snow",landmark:"kremlin",cars:Va,clothes:Cr,stars:180,moon:15791359},{fog:[.5,.2,.11],fogDensity:.011,hemi:[4876922,1975336],hemiIntensity:1.45,bldHue:[.45,.55],bldSat:[.05,.12],bldLight:[.62,.88],baseH:[14,4],downtownH:[4,6],roof:1711652,roofH:.4,ground:2369580,walk:5264472,park:1715740,dash:6711904,winWarm:"#ffe0a0",winCold:"#e0e8f0",winWarmShare:.7,windowRate:.22,wall:"#2e343a",lamp:15791359,neonHues:[.13,.6],neonRate:.25,tree:"oak",weather:"drizzle",landmark:"tv-tower",cars:Va,clothes:Cr,stars:140,moon:15265528},{fog:[.1,.25,.1],fogDensity:.0105,hemi:[9075290,1973274],hemiIntensity:1.5,bldHue:[.09,.13],bldSat:[.12,.25],bldLight:[.75,.95],baseH:[15,3],downtownH:[3,5],roof:2764864,roofH:2.2,ground:2500138,walk:5920850,park:1847838,dash:7105120,winWarm:"#ffd890",winCold:"#f0e8d0",winWarmShare:.9,windowRate:.28,wall:"#4a4436",lamp:16765040,neonHues:[.1,.95],neonRate:.3,tree:"oak",weather:"none",landmark:"eiffel",cars:Va,clothes:Ds,stars:160,moon:16051416},{fog:[.58,.12,.13],fogDensity:.0145,hemi:[5925498,2237994],hemiIntensity:1.45,bldHue:[.02,.07],bldSat:[.2,.35],bldLight:[.55,.85],baseH:[10,8],downtownH:[12,20],roof:1841690,roofH:.4,ground:2500652,walk:5527130,park:1847838,dash:6974050,winWarm:"#ffdca0",winCold:"#e0e6f0",winWarmShare:.8,windowRate:.24,wall:"#3a2e2c",lamp:16773328,neonHues:[0,.55],neonRate:.3,tree:"oak",weather:"drizzle",landmark:"big-ben",cars:[1711138,1711138,12591136,3816e3,10132126,3103386,13158604,1711138],clothes:Cr,stars:60,moon:15265008},{fog:[.6,.2,.1],fogDensity:.0105,hemi:[5267578,1843240],hemiIntensity:1.5,bldHue:[.55,.62],bldSat:[.05,.15],bldLight:[.65,.9],baseH:[12,18],downtownH:[50,60],roof:1053720,roofH:.3,ground:2237740,walk:4869718,park:1519644,dash:6448986,winWarm:"#ffe0a0",winCold:"#c8d8f0",winWarmShare:.6,windowRate:.32,wall:"#2a2e38",lamp:16774368,neonHues:[0,.13,.55,.95,.33],neonRate:.55,tree:"oak",weather:"none",landmark:"spire",cars:[14725152,14725152,1711138,3816e3,15263978,10132126,3103386,9054762],clothes:Cr,stars:90,moon:15265528}],Wa=520,_n={x:36,y:22,z:36},Xc=new qt,Rr=new D,qc=new D,Xa=new tn,Yc=new qt().makeScale(0,0,0);function w_(){const s=document.createElement("canvas");s.width=32,s.height=32;const t=s.getContext("2d"),e=t.createRadialGradient(16,16,1,16,16,15);return e.addColorStop(0,"rgba(255,255,255,0.9)"),e.addColorStop(.5,"rgba(255,255,255,0.35)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,32,32),new Ms(s)}class T_{constructor(t){this.kind="none",this.flakes=[],this.count=0,this.wind=0,this.disposables=[],this.sx=1,this.sy=1;const e=new Pn(1,1),n=w_();this.mat=new _e({map:n,transparent:!0,depthWrite:!1,opacity:.5,fog:!1}),this.mesh=new ne(e,this.mat,Wa),this.mesh.frustumCulled=!1,this.mesh.renderOrder=4,this.mesh.visible=!1;for(let i=0;i<Wa;i++)this.mesh.setMatrixAt(i,Yc),this.flakes.push({x:0,y:0,z:0,vx:0,vy:0,vz:0,s:1,phase:Math.random()*6.28});this.disposables.push(e,n,this.mat,this.mesh),t.add(this.mesh)}set(t){if(this.kind=t,this.mesh.visible=t!=="none",t==="none"){this.count=0;return}const e={rain:{n:480,color:10466512,opacity:.42,vy:-22,wind:4,s:[.035,.7]},drizzle:{n:260,color:10135740,opacity:.3,vy:-14,wind:2.5,s:[.03,.45]},snow:{n:420,color:16054527,opacity:.85,vy:-1.6,wind:.8,s:[.16,.16]},dust:{n:220,color:13150320,opacity:.16,vy:-.4,wind:7,s:[2.2,1.4]}}[t];this.count=e.n,this.wind=e.wind,this.mat.color.setHex(e.color),this.mat.opacity=e.opacity,this.mat.blending=t==="dust"?ni:jn;for(let n=0;n<Wa;n++){const i=this.flakes[n];i.x=(Math.random()-.5)*_n.x,i.y=Math.random()*_n.y,i.z=(Math.random()-.5)*_n.z,i.vy=e.vy*(.8+Math.random()*.4),i.vx=e.wind*(.7+Math.random()*.6),i.vz=(Math.random()-.5)*e.wind*.4,i.s=.7+Math.random()*.6,n>=this.count&&this.mesh.setMatrixAt(n,Yc)}this.sx=e.s[0],this.sy=e.s[1],this.mesh.instanceMatrix.needsUpdate=!0}update(t,e){if(this.kind==="none")return;const n=e.position.x,i=e.position.y-4,r=e.position.z,a=this.kind==="rain"||this.kind==="drizzle";if(a){Rr.set(this.wind,this.flakes[0].vy,0).normalize(),Xa.setFromUnitVectors(new D(0,1,0),Rr);const o=Math.atan2(e.position.x-n,e.position.z-r);Xa.premultiply(new tn().setFromAxisAngle(new D(0,1,0),o))}for(let o=0;o<this.count;o++){const c=this.flakes[o];c.x+=c.vx*t,c.y+=c.vy*t,c.z+=c.vz*t,this.kind==="snow"&&(c.x+=Math.sin(c.phase+c.y*.8)*t*.8),this.kind==="dust"&&(c.y+=Math.sin(c.phase+c.x*.3)*t*.6),c.y<0&&(c.y+=_n.y),c.y>_n.y&&(c.y-=_n.y),c.x>_n.x/2?c.x-=_n.x:c.x<-36/2&&(c.x+=_n.x),c.z>_n.z/2?c.z-=_n.z:c.z<-36/2&&(c.z+=_n.z),Rr.set(n+c.x,i+c.y,r+c.z),qc.set(this.sx*c.s,this.sy*c.s,1),Xc.compose(Rr,a?Xa:e.quaternion,qc),this.mesh.setMatrixAt(o,Xc)}this.mesh.instanceMatrix.needsUpdate=!0}dispose(){for(const t of this.disposables)t.dispose();this.mesh.removeFromParent()}}const Ft=s=>document.getElementById(s);class A_{constructor(t){this.input={moveX:0,moveZ:0,camDX:0,camDY:0,bite:!1,car:!1},this.touch=window.matchMedia("(pointer: coarse)").matches,this.keys=new Set,this.stickId=-1,this.camId=-1,this.stickBase={x:0,y:0},this.lastCam={x:0,y:0},this.toastT=null,this.blocked=!1,this.a=t,this.screens={title:Ft("title"),play:Ft("hud"),pause:Ft("pause"),dead:Ft("dead"),citywin:Ft("citywin"),victory:Ft("victory")};const e=(r,a)=>{Ft(r).addEventListener("click",()=>{this.blocked||a()})};e("btn-play",()=>this.a.play()),e("btn-continue",()=>this.a.play()),e("btn-resume",()=>this.a.resume()),e("btn-pause",()=>this.a.pause()),e("btn-retry",()=>this.a.retry()),e("btn-retry-pause",()=>this.a.retry()),e("btn-quit",()=>this.a.quit()),e("btn-quit-dead",()=>this.a.quit()),e("btn-quit-citywin",()=>this.a.quit()),e("btn-quit-victory",()=>this.a.quit()),e("btn-next",()=>this.a.next()),e("btn-again",()=>this.a.again()),e("btn-revive",()=>this.a.revive()),e("btn-dna2",()=>this.a.doubleDna());for(const r of["btn-lang","btn-lang2","btn-lang3","btn-lang4"])e(r,()=>void this.a.toggleLang());for(const r of["btn-sound","btn-sound2","btn-sound3","btn-sound4"])e(r,()=>this.a.toggleSound());e("btn-bite",()=>this.a.bite()),e("btn-car",()=>this.a.carAction()),e("btn-outbreak",()=>this.a.outbreak()),e("btn-delay",()=>this.a.delayArmy()),e("btn-daily",()=>this.a.daily(!1)),e("btn-daily-ad",()=>this.a.daily(!0));for(const r of["btn-share","btn-share2"])e(r,()=>this.a.share());window.addEventListener("keydown",r=>{if(this.blocked||r.repeat)return;this.keys.add(r.code);const a=document.activeElement instanceof HTMLButtonElement;r.code==="Space"&&!a&&(r.preventDefault(),this.a.bite()),r.code==="KeyE"&&this.a.carAction(),r.code==="Escape"&&this.a.pause()}),window.addEventListener("keyup",r=>this.keys.delete(r.code)),window.addEventListener("blur",()=>this.keys.clear());const n=document.getElementById("game");n.addEventListener("contextmenu",r=>r.preventDefault()),n.addEventListener("pointerdown",r=>{if(this.blocked)return;const a=window.innerWidth/2;if(this.touch&&r.clientX<a&&this.stickId<0){this.stickId=r.pointerId,this.stickBase={x:r.clientX,y:r.clientY};const o=Ft("stick");o.hidden=!1,o.style.left=r.clientX-59+"px",o.style.top=r.clientY-59+"px"}else this.camId<0&&(this.camId=r.pointerId,this.lastCam={x:r.clientX,y:r.clientY});n.setPointerCapture(r.pointerId)}),n.addEventListener("pointermove",r=>{if(r.pointerId===this.stickId){const a=r.clientX-this.stickBase.x,o=r.clientY-this.stickBase.y,c=Math.hypot(a,o)||1,l=Math.min(1,c/44);this.input.moveX=a/c*l,this.input.moveZ=-(o/c)*l;const h=Ft("stick-nub");h.style.left=`calc(50% + ${a/c*l*34}px)`,h.style.top=`calc(50% + ${o/c*l*34}px)`}else r.pointerId===this.camId&&(this.input.camDX+=r.clientX-this.lastCam.x,this.input.camDY+=r.clientY-this.lastCam.y,this.lastCam={x:r.clientX,y:r.clientY})});const i=r=>{r.pointerId===this.stickId&&(this.stickId=-1,this.input.moveX=0,this.input.moveZ=0,this.touch&&(Ft("stick").hidden=!0)),r.pointerId===this.camId&&(this.camId=-1)};n.addEventListener("pointerup",i),n.addEventListener("pointercancel",i),n.addEventListener("lostpointercapture",i),this.touch&&(Ft("touch-btns").hidden=!1,Ft("keys-hint").hidden=!0,Ft("touch-hint").hidden=!1)}poll(){if(!this.touch||this.stickId<0){const t=this.keys;this.input.moveX=(t.has("KeyD")||t.has("ArrowRight")?1:0)-(t.has("KeyA")||t.has("ArrowLeft")?1:0),this.input.moveZ=(t.has("KeyW")||t.has("ArrowUp")?1:0)-(t.has("KeyS")||t.has("ArrowDown")?1:0)}return this.input}endFrame(){this.input.camDX=0,this.input.camDY=0}show(t){for(const[e,n]of Object.entries(this.screens))n.hidden=e!==t}setContinue(t){Ft("btn-play").hidden=t,Ft("btn-continue").hidden=!t}hud(t,e,n,i,r,a,o){Ft("city-name").textContent=gt(t);const c=Math.min(100,e*100),l=Math.max(0,i/r*100);Ft("infect-fill").style.width=c.toFixed(1)+"%",Ft("infect-pct").textContent=Math.floor(n*100)+"%",Ft("horde").textContent=String(o),Ft("hp-fill").style.width=l.toFixed(1)+"%",Ft("infect-fill").parentElement.setAttribute("aria-valuenow",String(Math.round(c))),Ft("hp-fill").parentElement.setAttribute("aria-valuenow",String(Math.round(l))),Ft("dna").textContent=String(a)}clock(t,e){const n=Ft("clock");if(e){n.textContent=gt("АРМИЯ В ГОРОДЕ"),n.classList.add("army");return}n.classList.toggle("army",!1),n.classList.toggle("soon",t<=60);const i=Math.floor(t/60),r=Math.max(0,Math.floor(t%60));n.textContent=gt("Армия через:")+" "+i+":"+(r<10?"0":"")+r}sense(t){const e=Ft("sense");if(t===null){e.hidden=!0;return}e.hidden=!1;const n=110,i=Math.sin(t)*n-15,r=-Math.cos(t)*n-15;e.style.transform=`translate(${i.toFixed(0)}px, ${r.toFixed(0)}px) rotate(${t.toFixed(3)}rad)`}hint(t){const e=Ft("hint");if(!t){e.hidden=!0;return}e.hidden=!1,e.textContent=t}carButton(t){if(!this.touch)return;const e=Ft("btn-car");e.hidden=t===null,t&&(e.textContent=gt(t==="enter"?"Сесть":"Выйти"))}hideToast(){Ft("toast").hidden=!0,this.toastT&&(clearTimeout(this.toastT),this.toastT=null)}toast(t,e=2400){const n=Ft("toast");n.textContent=t,n.hidden=!1,this.toastT&&clearTimeout(this.toastT),this.toastT=setTimeout(()=>{n.hidden=!0},e)}stageBanner(t,e){const n=Ft("stage-banner");Ft("stage-banner-name").textContent=t,Ft("stage-banner-sub").textContent=e,n.hidden=!1,n.style.animation="none",n.offsetWidth,n.style.animation=""}titleProgress(t,e,n){const i=Ft("title-progress");if(t<=0&&n<=0){i.hidden=!0;return}i.hidden=!1,i.textContent=gt("Городов пало:")+" "+t+"/"+e+" · "+gt("Заражено всего:")+" "+n}deadStats(t){Ft("dead-stats").textContent=gt("Заражено в этом городе:")+" "+t}winStats(t,e,n,i,r,a){Ft("win-stats").textContent=gt(t)+" — "+gt("заражение необратимо.")+" "+gt("Новых носителей:")+" "+e+". "+gt("Собрано ДНК:")+" "+n+". "+gt("Время:")+" "+i+" · "+gt("Рекорд:")+" "+r;const o=Ft("win-record");o.hidden=!a,a&&(o.textContent=gt("Новый рекорд города!"))}goals(t){const e=Ft("goals");e.innerHTML="";for(const n of t){const i=document.createElement("div");i.className="goal"+(n.paid?" done":""),i.textContent=(n.paid?"✓ ":"◇ ")+n.label+" "+n.done+"/"+n.need,e.append(i)}}delayButton(t){Ft("btn-delay").hidden=!t}dailyButtons(t,e=!0){Ft("daily").hidden=!t,Ft("btn-daily-ad").hidden=!e}shareButton(t){for(const e of["btn-share","btn-share2"])Ft(e).hidden=!t}victoryStats(t){Ft("victory-stats").textContent=gt("Всего заражено за пандемию:")+" "+t}outbreakButton(t){const e=Ft("btn-outbreak");t<=0?(e.disabled=!1,e.textContent=gt("Вспышка (реклама)")):(e.disabled=!0,e.textContent=gt("Вспышка через:")+" "+Math.ceil(t))}dnaButton(t){Ft("btn-dna2").hidden=!t}reviveButton(t){Ft("btn-revive").hidden=!t}shopBalance(t){Ft("shop-dna").textContent=gt("ДНК:")+" "+t}shop(t){const e=Ft("shop");e.innerHTML="";for(const n of t){const i=document.createElement("div");i.className="shop-item";const r=document.createElement("span");r.className="name",r.textContent=gt(n.name);const a=document.createElement("span");a.className="lvl",a.textContent=n.lvl+"/"+n.max;const o=document.createElement("button");n.lvl>=n.max?(o.textContent=gt("Макс"),o.disabled=!0,o.setAttribute("aria-label",gt(n.name)+" — "+gt("Макс"))):(o.textContent=gt("ДНК:")+" "+n.cost,o.setAttribute("aria-label",gt(n.name)+" — "+gt("ДНК:")+" "+n.cost),o.disabled=!n.can,o.addEventListener("click",()=>{this.blocked||this.a.buy(n.key)})),i.append(r,a,o),e.append(i)}}meta(t){const e=Bs()==="en"?gt("Язык: English"):gt("Язык: русский"),n=gt(t?"Звук: выкл":"Звук: вкл");document.querySelectorAll(".lang-btn").forEach(i=>{i.textContent=e}),document.querySelectorAll(".sound-btn").forEach(i=>{i.textContent=n})}uiClick(t){const e={play:"btn-play",cont:"btn-continue",resume:"btn-resume",pause:"btn-pause",retry:"btn-retry",quit:"btn-quit",next:"btn-next",again:"btn-again",revive:"btn-revive",dna2:"btn-dna2",lang:"btn-lang",lang2:"btn-lang2",sound:"btn-sound",bite:"btn-bite",car:"btn-car",outbreak:"btn-outbreak",quitDead:"btn-quit-dead",quitCitywin:"btn-quit-citywin",quitVictory:"btn-quit-victory",lang3:"btn-lang3",lang4:"btn-lang4",sound2:"btn-sound2",sound3:"btn-sound3",sound4:"btn-sound4",delay:"btn-delay",daily:"btn-daily",dailyAd:"btn-daily-ad",share:"btn-share",share2:"btn-share2"},n=document.getElementById(e[t]??t);return!n||n.hidden||n.closest("[hidden]")?!1:(n.click(),!0)}}const Kc="pz_sound_off",Jr=class Jr{constructor(){this.ctx=null,this.master=null,this.noiseBuf=null,this.muted=Os(Kc,!1)===!0,this.adSilence=!1,this.away=!1,this.platformSilence=!1,this.engine=null,this.siren=null,this.pad=null,this.tension=null,this.musicName=null,this.musicEl=null,this.musicGain=null,this.musicFailed=!1,this.buffers=new Map,this.preloadStarted=!1,this.sirenLoop=null,this.heart=null,this.weatherLayer=null,this.weatherKind="none",this.horde=null,this.chopper=null}setMusic(t){if(t===this.musicName)return;const e=this.ensure(),n=this.out();if(!e||!n)return;if(this.musicName=t,this.musicEl&&this.musicGain){const o=this.musicEl,c=this.musicGain;c.gain.setTargetAtTime(0,e.currentTime,.6),setTimeout(()=>{o.pause(),o.src="",c.disconnect()},2500),this.musicEl=null,this.musicGain=null}if(!t||location.protocol==="file:")return;this.musicFailed=!1;const i=new Audio(`assets/music/${t}.mp3`);i.loop=!0,i.crossOrigin="anonymous",i.preload="auto";const r=e.createGain();r.gain.value=0;let a;try{a=e.createMediaElementSource(i)}catch{this.musicFailed=!0;return}a.connect(r),r.connect(n),this.musicEl=i,this.musicGain=r,i.addEventListener("error",()=>{this.musicFailed=!0,this.setAmbience(!0)}),t==="city"&&i.addEventListener("loadedmetadata",()=>{i.currentTime=24},{once:!0}),i.play().then(()=>{r.gain.setTargetAtTime(t==="title"?.7:.75,e.currentTime,1.2),this.setAmbience(!1)}).catch(()=>{this.musicFailed=!0,this.setAmbience(!0)})}musicAlive(){return!!this.musicEl&&!this.musicFailed}level(){return this.muted||this.adSilence||this.away||this.platformSilence?0:.85}loopSample(t,e){const n=this.ctx,i=this.master;if(!n||!i)return null;const r=this.buffers.get(t);if(!r||!r.length)return null;const a=n.createBufferSource();a.buffer=r[0],a.loop=!0;const o=n.createGain();return o.gain.value=0,a.connect(o),o.connect(i),a.start(),o.gain.setTargetAtTime(e,n.currentTime,.4),{g:o,src:a}}preload(){if(this.preloadStarted||!this.ctx||(this.preloadStarted=!0,location.protocol==="file:"))return;const t=async(e,n)=>{try{const i=await fetch(`assets/sfx/${n}.mp3`);if(!i.ok)return;const r=await this.ctx.decodeAudioData(await i.arrayBuffer()),a=this.buffers.get(e)??[];a.push(r),this.buffers.set(e,a)}catch{}};for(const[e,n]of Jr.SAMPLES)for(let i=1;i<=n;i++)t(e,`${e}_${i}`);t("click","click")}play(t,e,n=1){const i=this.ctx,r=this.master;if(!i||!r)return!1;const a=this.buffers.get(t);if(!a||!a.length)return!1;const o=i.createBufferSource();o.buffer=a[Math.floor(Math.random()*a.length)],o.playbackRate.value=n*(.92+Math.random()*.16);const c=i.createGain();return c.gain.value=e,o.connect(c),c.connect(r),o.start(),!0}applyLevel(){if(!this.master||!this.ctx)return;const t=this.ctx.currentTime;this.master.gain.cancelScheduledValues(t),this.master.gain.setTargetAtTime(this.level(),t,.05)}toggle(){return this.muted=!this.muted,Qo(Kc,this.muted),this.applyLevel(),this.muted}isMuted(){return this.muted}isLive(){return this.ctx!==null}adMute(t){this.adSilence=t,this.applyLevel()}platformMute(t){this.platformSilence=t,this.applyLevel()}focus(t){this.away=!t,this.applyLevel(),t&&this.ctx?.state==="suspended"&&this.ctx.resume()}ensure(){if(!this.ctx){const t=window.AudioContext??window.webkitAudioContext;if(!t)return null;this.ctx=new t,this.master=this.ctx.createGain(),this.master.gain.value=this.level(),this.master.connect(this.ctx.destination);const e=this.ctx.sampleRate;this.noiseBuf=this.ctx.createBuffer(1,e,this.ctx.sampleRate);const n=this.noiseBuf.getChannelData(0);for(let i=0;i<e;i++)n[i]=Math.random()*2-1}if(this.ctx.state==="suspended"&&this.ctx.resume(),this.preload(),this.weatherKind!=="none"&&!this.weatherLayer){const t=this.weatherKind;this.weatherKind="none",this.setWeather(t)}return this.ctx}out(){return this.master}noise(t,e,n,i=1,r="bandpass"){const a=this.ensure(),o=this.out();if(!a||!o||!this.noiseBuf)return;const c=a.createBufferSource();c.buffer=this.noiseBuf,c.loop=!0;const l=a.createBiquadFilter();l.type=r,l.frequency.value=n,l.Q.value=i;const h=a.createGain(),d=a.currentTime;h.gain.setValueAtTime(e,d),h.gain.exponentialRampToValueAtTime(.001,d+t),c.connect(l),l.connect(h),h.connect(o),c.start(d),c.stop(d+t+.05)}tone(t,e,n,i="sine",r){const a=this.ensure(),o=this.out();if(!a||!o)return;const c=a.createOscillator();c.type=i,c.frequency.value=t;const l=a.currentTime;r!==void 0&&c.frequency.exponentialRampToValueAtTime(Math.max(20,r),l+e);const h=a.createGain();h.gain.setValueAtTime(n,l),h.gain.exponentialRampToValueAtTime(.001,l+e),c.connect(h),h.connect(o),c.start(l),c.stop(l+e+.05)}click(){this.ensure(),this.play("click",.5)||this.tone(680,.06,.2,"square")}bite(t=1){this.ensure(),this.play("bite",1,1.1*t)||(this.noise(.12,.8,900,1.4),this.tone(160,.14,.6,"sawtooth",60))}infected(){this.ensure(),this.play("infected",.7)||(this.tone(220,.35,.35,"sawtooth",440),this.noise(.3,.3,2400,2,"highpass"))}moan(){if(this.ensure(),!this.play("moan",.6,.9)){const t=90+Math.random()*60;this.tone(t,.9,.3,"sawtooth",t*.6)}}scream(){if(this.ensure(),!this.play("scream",.45)){const t=700+Math.random()*300;this.tone(t,.4,.2,"square",t*1.6)}}shot(){this.ensure(),this.play("shot",.55)||(this.noise(.09,.9,1400,.8),this.tone(120,.08,.7,"square",50))}hurt(){this.ensure(),this.play("hurt",.8)||this.tone(300,.18,.6,"square",90)}crash(){this.ensure(),this.play("crash",.9)||(this.noise(.25,.9,500,.7,"lowpass"),this.tone(70,.3,.7,"sawtooth",30))}horn(){this.tone(330,.25,.4,"square"),this.tone(415,.25,.4,"square")}sting(t){t?(this.tone(220,.5,.5,"sawtooth",330),this.tone(277,.7,.42,"sawtooth",415)):(this.tone(220,.8,.5,"sawtooth",82),this.noise(.7,.35,300,.8,"lowpass"))}setEngine(t,e=0){if(!t&&!this.engine)return;const n=this.ensure(),i=this.out();if(!(!n||!i)){if(t&&!this.engine){const r=n.createOscillator();r.type="sawtooth",r.frequency.value=55;const a=n.createBiquadFilter();a.type="lowpass",a.frequency.value=400;const o=n.createGain();o.gain.value=0,r.connect(a),a.connect(o),o.connect(i),r.start(),this.engine={osc:r,gain:o,filter:a}}if(!t&&this.engine){const r=this.engine;this.engine=null,r.gain.gain.setTargetAtTime(0,n.currentTime,.1),r.osc.stop(n.currentTime+.4)}if(this.engine){const r=n.currentTime;this.engine.osc.frequency.setTargetAtTime(50+e*90,r,.1),this.engine.gain.gain.setTargetAtTime(.16+e*.16,r,.1)}}}setSiren(t){if(!t&&!this.siren&&!this.sirenLoop)return;const e=this.ensure(),n=this.out();if(!(!e||!n)){if(t&&!this.siren&&!this.sirenLoop&&(this.sirenLoop=this.loopSample("siren",.22),!this.sirenLoop)){const i=e.createOscillator();i.type="triangle",i.frequency.value=700;const r=e.createOscillator();r.type="square",r.frequency.value=.9;const a=e.createGain();a.gain.value=180,r.connect(a),a.connect(i.frequency);const o=e.createGain();o.gain.value=.1,i.connect(o),o.connect(n),i.start(),r.start(),this.siren={o1:i,g:o,lfo:r,lg:a}}if(!t&&this.sirenLoop){const i=this.sirenLoop;this.sirenLoop=null,i.g.gain.setTargetAtTime(0,e.currentTime,.4),i.src.stop(e.currentTime+1.6)}if(!t&&this.siren){const i=this.siren;this.siren=null,i.g.gain.setTargetAtTime(0,e.currentTime,.2),i.o1.stop(e.currentTime+.8),i.lfo.stop(e.currentTime+.8)}}}setAmbience(t){if(!t&&!this.pad)return;const e=this.ensure(),n=this.out();if(!(!e||!n)){if(t&&!this.pad){const i=e.createGain();i.gain.value=0,i.connect(n);const r=[];for(const[c,l]of[[55,.5],[82.4,.3],[110,.2]]){const h=e.createOscillator();h.type="sine",h.frequency.value=c;const d=e.createGain();d.gain.value=l,h.connect(d),d.connect(i),h.start(),r.push(h)}const a=e.createOscillator();a.frequency.value=.07;const o=e.createGain();o.gain.value=.03,a.connect(o),o.connect(i.gain),a.start(),r.push(a),i.gain.setTargetAtTime(.13,e.currentTime,1.2),this.pad={g:i,nodes:r}}if(!t&&this.pad){const i=this.pad;this.pad=null,i.g.gain.setTargetAtTime(0,e.currentTime,.4);for(const r of i.nodes)r.stop(e.currentTime+2)}}}setHeartbeat(t){if(!t&&!this.heart)return;const e=this.ensure(),n=this.out();if(!(!e||!n)){if(t&&!this.heart){const i=e.createOscillator();i.type="sine",i.frequency.value=52;const r=e.createGain();r.gain.value=0;const a=e.createOscillator();a.type="square",a.frequency.value=1.35;const o=e.createGain();o.gain.value=.2,a.connect(o),o.connect(r.gain),i.connect(r),r.connect(n),i.start(),a.start(),this.heart={g:r,o:i,lfo:a}}if(!t&&this.heart){const i=this.heart;this.heart=null,i.g.gain.setTargetAtTime(0,e.currentTime,.2),i.o.stop(e.currentTime+.8),i.lfo.stop(e.currentTime+.8)}}}setWeather(t){if(t===this.weatherKind)return;this.weatherKind=t;const e=this.ctx,n=this.master;if(this.weatherLayer){const l=this.weatherLayer;if(this.weatherLayer=null,e){l.g.gain.setTargetAtTime(0,e.currentTime,.5);for(const h of l.nodes)h.stop(e.currentTime+2)}}if(t==="none"||!e||!n||!this.noiseBuf)return;const i=e.createBufferSource();i.buffer=this.noiseBuf,i.loop=!0;const r=e.createBiquadFilter(),a=e.createGain();a.gain.value=0;let o=.05;t==="rain"?(r.type="bandpass",r.frequency.value=2600,r.Q.value=.5,o=.07):t==="drizzle"?(r.type="bandpass",r.frequency.value=3200,r.Q.value=.6,o=.035):(r.type="lowpass",r.frequency.value=220,r.Q.value=.9,o=t==="dust"?.09:.05),i.connect(r),r.connect(a),a.connect(n),i.start();const c=[i];if(t!=="rain"&&t!=="drizzle"){const l=e.createOscillator();l.frequency.value=.11;const h=e.createGain();h.gain.value=o*.6,l.connect(h),h.connect(a.gain),l.start(),c.push(l)}a.gain.setTargetAtTime(o,e.currentTime,1.5),this.weatherLayer={g:a,nodes:c}}setHorde(t){if(t<=.02&&!this.horde)return;const e=this.ensure(),n=this.out();if(!(!e||!n||!this.noiseBuf)){if(t>.02&&!this.horde){const i=e.createGain();i.gain.value=0,i.connect(n);const r=[];for(const[l,h]of[[62,.5],[93,.35],[124.5,.25]]){const d=e.createOscillator();d.type="sawtooth",d.frequency.value=l;const u=e.createBiquadFilter();u.type="lowpass",u.frequency.value=260;const p=e.createGain();p.gain.value=h;const g=e.createOscillator();g.frequency.value=.3+Math.random()*.4;const b=e.createGain();b.gain.value=2.5,g.connect(b),b.connect(d.frequency),d.connect(u),u.connect(p),p.connect(i),d.start(),g.start(),r.push(d,g)}const a=e.createBufferSource();a.buffer=this.noiseBuf,a.loop=!0;const o=e.createBiquadFilter();o.type="bandpass",o.frequency.value=180,o.Q.value=4;const c=e.createGain();c.gain.value=.35,a.connect(o),o.connect(c),c.connect(i),a.start(),r.push(a),this.horde={g:i,nodes:r}}if(this.horde&&(this.horde.g.gain.setTargetAtTime(t*.16,e.currentTime,.8),t<=.02)){const i=this.horde;this.horde=null;for(const r of i.nodes)r.stop(e.currentTime+2.5)}}}stageSting(){this.ensure(),this.tone(55,1.2,.7,"sawtooth",28),this.noise(.9,.6,300,.7,"lowpass"),this.tone(220,1.6,.25,"triangle",440)}alarm(){const t=this.ensure(),e=this.out();if(!t||!e||this.play("alarm",.5))return;const n=t.createOscillator();n.type="sawtooth";const i=t.createBiquadFilter();i.type="lowpass",i.frequency.value=1200;const r=t.createGain(),a=t.currentTime;r.gain.setValueAtTime(1e-4,a),r.gain.exponentialRampToValueAtTime(.13,a+.4),n.frequency.setValueAtTime(320,a);for(let o=0;o<3;o++)n.frequency.linearRampToValueAtTime(760,a+o*2.4+1.3),n.frequency.linearRampToValueAtTime(330,a+o*2.4+2.4);r.gain.setValueAtTime(.13,a+6.6),r.gain.exponentialRampToValueAtTime(1e-4,a+7.6),n.connect(i),i.connect(r),r.connect(e),n.start(a),n.stop(a+7.7)}explosion(t=1){this.ensure(),this.play("crash",1*t,.7)||this.noise(.5,1*t,400,.6,"lowpass"),this.tone(48,.9,.8*t,"sawtooth",24),this.noise(1.1,.5*t,160,.9,"lowpass")}setChopper(t){if(t<=0&&!this.chopper)return;const e=this.ensure(),n=this.out();if(!(!e||!n)&&(t>0&&!this.chopper&&(this.chopper=this.loopSample("chopper",0)),this.chopper&&(this.chopper.g.gain.setTargetAtTime(t*.3,e.currentTime,.6),t<=0))){const i=this.chopper;this.chopper=null,i.src.stop(e.currentTime+2)}}setTension(t){if(t<=0&&!this.tension)return;const e=this.ensure(),n=this.out();if(!(!e||!n)){if(t>0&&!this.tension){const i=e.createOscillator();i.type="triangle",i.frequency.value=164.8;const r=e.createGain();r.gain.value=0,i.connect(r),r.connect(n),i.start(),this.tension={g:r,o:i}}if(this.tension&&(this.tension.g.gain.setTargetAtTime(t*.09,e.currentTime,.5),t<=0)){const i=this.tension;this.tension=null,i.o.stop(e.currentTime+1.5)}}}};Jr.SAMPLES=[["bite",2],["infected",2],["moan",3],["scream",2],["hurt",2],["shot",2],["crash",2],["chopper",1],["siren",1],["alarm",1]];let $o=Jr;const he=[{name:"Токио",grid:6,civ:90,cop:6,threshold:.55,time:270,tier:0,reinforce:1,armyMax:60,flavor:"Неон и дождь",rule:"Кусай, заражай, беги",chopperAt:.35,exposes:!1,roadblocks:0,vision:1,run:1,grip:.9,apc:0},{name:"Сеул",grid:6,civ:110,cop:9,threshold:.6,time:270,tier:0,reinforce:1.3,armyMax:60,flavor:"Вывески до горизонта",rule:"Полиция реагирует быстрее",chopperAt:.35,exposes:!1,roadblocks:0,vision:1,run:1,grip:1,apc:0},{name:"Шанхай",grid:7,civ:130,cop:12,threshold:.62,time:280,tier:0,reinforce:1.3,armyMax:70,flavor:"Небоскрёбы в дымке",rule:"Прожектор вертолёта выдаёт тебя",chopperAt:.2,exposes:!0,roadblocks:0,vision:1,run:1,grip:1,apc:0},{name:"Бангкок",grid:7,civ:150,cop:15,threshold:.65,time:285,tier:1,reinforce:1.3,armyMax:70,flavor:"Ливень и золотые шпили",rule:"Усиленная полиция, блокпосты, мокрая дорога",chopperAt:.2,exposes:!0,roadblocks:2,vision:1,run:1,grip:.8,apc:0},{name:"Мумбаи",grid:7,civ:170,cop:18,threshold:.68,time:300,tier:1,reinforce:1.4,armyMax:80,flavor:"Тесные улицы, жёлтые такси",rule:"Блокпосты на каждом шагу",chopperAt:.2,exposes:!0,roadblocks:4,vision:1,run:1,grip:1,apc:0},{name:"Каир",grid:8,civ:185,cop:21,threshold:.7,time:310,tier:1,reinforce:1.4,armyMax:80,flavor:"Пыльная буря у пирамиды",rule:"В пыли не видят ни зомби, ни полиция",chopperAt:.2,exposes:!0,roadblocks:3,vision:.8,run:1,grip:1,apc:0},{name:"Стамбул",grid:8,civ:200,cop:24,threshold:.72,time:320,tier:2,reinforce:1.5,armyMax:90,flavor:"Минареты над проливом",rule:"Спецназ, армия приходит раньше",chopperAt:.2,exposes:!0,roadblocks:3,vision:1,run:1,grip:1,apc:0},{name:"Москва",grid:8,civ:220,cop:28,threshold:.75,time:330,tier:2,reinforce:1.5,armyMax:90,flavor:"Снег и спецназ",rule:"Лёд: бег медленнее, руль скользит",chopperAt:.2,exposes:!0,roadblocks:3,vision:1,run:.92,grip:.6,apc:0},{name:"Берлин",grid:8,civ:235,cop:31,threshold:.78,time:345,tier:2,reinforce:1.6,armyMax:100,flavor:"Морось и телебашня",rule:"Оцепление: блокпосты всюду",chopperAt:.15,exposes:!0,roadblocks:6,vision:1,run:1,grip:.85,apc:0},{name:"Париж",grid:9,civ:255,cop:35,threshold:.8,time:360,tier:2,reinforce:1.6,armyMax:100,flavor:"Золотые фонари, мансарды",rule:"С армией идёт бронемашина",chopperAt:.15,exposes:!0,roadblocks:4,vision:1,run:1,grip:1,apc:1},{name:"Лондон",grid:9,civ:275,cop:39,threshold:.82,time:375,tier:2,reinforce:1.7,armyMax:110,flavor:"Туман и чёрные кэбы",rule:"Туман слепит, бронемашин две",chopperAt:.15,exposes:!0,roadblocks:5,vision:.8,run:1,grip:.85,apc:2},{name:"Нью-Йорк",grid:9,civ:300,cop:44,threshold:.85,time:390,tier:2,reinforce:1.8,armyMax:120,flavor:"Последний город",rule:"Всё сразу — и меньше времени",chopperAt:.12,exposes:!0,roadblocks:6,vision:1,run:1,grip:1,apc:2}],Zc=["Полиция: обычная","Полиция: усиленная","Полиция: спецназ"],Pr=[[.25,"ЭПИДЕМИЯ","Город стягивает полицию"],[.5,"ГОРОД В ПАНИКЕ","Кварталы гаснут, улицы горят"],[.75,"ХАОС","Город почти твой"]],qa={bites:"Укуси сам:",carHits:"Сбей машиной:",cops:"Зарази полицейских:"},$c=30,Jc=90,Lr=()=>new Date().toISOString().slice(0,10),Ir="pz_save",as=5,Dr=s=>30*Math.pow(2,s);function Us(s){const t=Math.floor(s/60),e=Math.max(0,Math.floor(s%60));return t+":"+(e<10?"0":"")+e}function C_(s){let t=s>>>0;return()=>{t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}class R_{constructor(t){this.phase="title",this.audio=new $o,this.scene=new vd,this.cityIndex=0,this.cityDna=0,this.dnaDoubled=!1,this.reviveUsed=!1,this.copSpawnT=0,this.clock=0,this.armyArrived=!1,this.armySpawnT=0,this.minuteWarned=!1,this.policeWarned=!1,this.saveT=0,this.shakeT=0,this.hitPauseT=0,this.vignetteT=0,this.flashT=0,this.roadblocksUp=!1,this.exposed=!1,this.fireSites=0,this.abandoned=0,this.hintCd=0,this.minimapFrame=0,this.askedReview=!1,this.askedShortcut=!1,this.pendingOutbreak=!1,this.winInfected=0,this.hunt=!1,this.cloudHoldUntil=0,this.renderSkip=0,this.tutorialT=0,this.tutorialStep=0,this.droveThisCity=!1,this.goals=[],this.combo=0,this.comboT=0,this.cityElapsed=0,this.armyDelayed=!1,this.frames=0,this.outbreakCd=0,this.stage=0,this.renderer=new kg({canvas:t,antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),this.camera=new xn(66,1,.5,260),this.resize(),window.addEventListener("resize",()=>this.resize()),this.hemi=new Bd(5333146,1843240,1.5),this.scene.add(this.hemi);const e=new Hd(11058400,.9);e.position.set(40,80,20),this.scene.add(e),this.fx=new M_(this.scene),this.chopper=new b_(this.scene),this.weather=new T_(this.scene),this.crowd=new s_(this.scene,600,{onInfected:(r,a,o,c)=>{this.fx.infection(a,o),this.onInfected(r,a,o,c)},onConvert:(r,a)=>this.fx.conversion(r,a),onFire:(r,a,o)=>this.fx.muzzle(r,a,o),onPlayerHit:r=>this.onPlayerHit(r),sfx:r=>{r==="moan"?this.audio.moan():r==="scream"?this.audio.scream():r==="shot"?this.audio.shot():this.audio.infected()}}),this.cars=new p_(this.scene,34),this.crowd.pushOut=(r,a,o)=>this.cars.pushOut(r,a,o),this.player=new __(this.scene);const n=window.__PLATFORM__;Os(Ir,null)===null&&n&&n!=="none"&&(this.cloudHoldUntil=performance.now()+3e4),this.save=this.loadSave(),this.cityIndex=Math.min(this.save.city,he.length-1),this.minimapCtx=document.getElementById("minimap").getContext("2d"),this.ui=new A_({play:()=>this.continueCampaign(),resume:()=>this.setPhase("play"),pause:()=>{this.phase==="play"?this.setPhase("pause"):this.phase==="pause"&&this.setPhase("play")},retry:()=>void this.retry(),quit:()=>{this.persist(),this.setPhase("title")},next:()=>void this.nextCity(),again:()=>{this.save.city=0,this.cityIndex=0,this.persist(),this.startCity(0)},revive:()=>void this.revive(),doubleDna:()=>void this.doubleDna(),buy:r=>this.buy(r),toggleLang:async()=>{await nh(),this.refreshMeta()},toggleSound:()=>{const r=this.audio.toggle();return this.refreshMeta(),r},bite:()=>this.tryBite(),carAction:()=>this.carAction(),outbreak:()=>void this.outbreak(),delayArmy:()=>void this.delayArmy(),daily:r=>void this.claimDaily(r),share:()=>void this.share()}),window.__cloudArrived=()=>{this.cloudHoldUntil=0;const r=this.loadSave(),a=this.save;a.city=Math.max(a.city,r.city),a.dna=Math.max(a.dna,r.dna),a.total=Math.max(a.total,r.total);for(const o of Object.keys(a.up))a.up[o]=Math.max(a.up[o],r.up[o]);for(let o=0;o<he.length;o++){const c=a.best[o],l=r.best[o];a.best[o]=c&&l?Math.min(c,l):c||l}r.daily>a.daily&&(a.daily=r.daily),this.phase==="title"&&(this.cityIndex=Math.min(a.city,he.length-1)),this.applyUpgrades(),this.ui.setContinue(a.city>0||a.dna>0)};const i=()=>{document.removeEventListener("pointerdown",i),document.removeEventListener("keydown",i),this.audio.ensure(),this.phase==="title"&&this.audio.setMusic("title")};document.addEventListener("pointerdown",i),document.addEventListener("keydown",i),window.addEventListener("pagehide",()=>this.persist()),this.buildCity(this.cityIndex),this.applyUpgrades(),this.ui.setContinue(this.save.city>0||this.save.dna>0),this.refreshMeta(),this.setPhase("title")}buildCity(t){const e=he[t],n=E_[t],i={grid:e.grid,parkEvery:7,theme:n};this.city&&this.city.dispose();const r=C_(1e3+t*77);this.city=new Xg(i,r),this.scene.add(this.city.group);const a=new wt().setHSL(n.fog[0],n.fog[1],n.fog[2]);this.scene.fog=new fl(a,n.fogDensity),this.scene.background=a,this.hemi.color.setHex(n.hemi[0]),this.hemi.groundColor.setHex(n.hemi[1]),this.hemi.intensity=n.hemiIntensity,this.weather.set(n.weather),this.audio.setWeather(n.weather),this.crowd.populate(this.city,r,e.civ,e.cop,n.clothes,e.tier),this.crowd.visionMul=e.vision,this.player.runMul=e.run,this.player.grip=e.grip,this.stage=0,this.roadblocksUp=!1,this.cars.populate(this.city,r,Math.min(34,18+t*2),n.cars);const o=this.city.landmarkX+21,c=this.city.landmarkZ+21;this.player.reset(o,c),this.player.angle=this.player.camYaw=Math.atan2(this.city.landmarkX-o,this.city.landmarkZ-c),this.cityDna=0,this.dnaDoubled=!1,this.reviveUsed=!1,this.clock=e.time,this.armyArrived=!1,this.armySpawnT=0,this.minuteWarned=!1,this.policeWarned=!1,this.outbreakCd=0,this.pendingOutbreak=!1,this.hunt=!1,this.crowd.huntAll=!1,this.tutorialT=0,this.tutorialStep=0,this.droveThisCity=!1,this.combo=0,this.comboT=0,this.cityElapsed=0,this.armyDelayed=!1,this.ui.delayButton(!1);const l=[{kind:"bites",need:8+t*2,done:0,reward:20+t*5,paid:!1},{kind:"carHits",need:5+t,done:0,reward:25+t*5,paid:!1},{kind:"cops",need:2+Math.floor(t/2),done:0,reward:30+t*5,paid:!1}],h=t%3;this.goals=l.filter((d,u)=>u!==h),this.ui.goals(this.goals.map(d=>({label:gt(qa[d.kind]),done:d.done,need:d.need,paid:d.paid}))),this.fx.clearFires(),this.chopper.show(!1),this.fireSites=0,this.abandoned=0}continueCampaign(){if(this.save.city>=he.length){this.setPhase("victory"),this.ui.victoryStats(this.save.total);return}this.startCity(this.cityIndex)}startCity(t){this.cityIndex=Math.min(t,he.length-1),this.buildCity(this.cityIndex),this.audio.ensure(),this.audio.setMusic("city"),this.audio.musicAlive()||this.audio.setAmbience(!0),this.setPhase("play");const e=he[this.cityIndex],n=document.getElementById("city-banner");document.getElementById("city-banner-name").textContent=gt(e.name),document.getElementById("city-banner-goal").textContent=gt("Заразить жителей:")+" "+Math.round(e.threshold*100)+"% · "+gt("армия через")+" "+Us(e.time),document.getElementById("city-banner-flavor").textContent=gt(e.flavor)+" · "+gt(e.rule)+" · "+gt(Zc[e.tier]),n.hidden=!1,n.style.animation="none",n.offsetWidth,n.style.animation="",this.cityIndex===0&&this.ui.toast(gt("Кусай прохожих — зарази город"))}async retry(){await io(this.cityIndex),this.startCity(this.cityIndex)}async nextCity(){if(await io(this.cityIndex+1),this.cityIndex+1>=he.length){this.setPhase("victory"),this.ui.victoryStats(this.save.total);return}this.startCity(this.cityIndex+1)}async claimDaily(t){if(this.save.daily===Lr()){this.ui.dailyButtons(!1);return}if(t&&!await os()){this.rewardFailed();return}this.save.daily!==Lr()&&(this.save.daily=Lr(),this.save.dna+=t?Jc:$c,this.persist(),this.ui.dailyButtons(!1),this.ui.toast(gt("Бонус дня получен:")+" +"+(t?Jc:$c)+" "+gt("ДНК")),this.ui.titleProgress(Math.min(this.save.city,he.length),he.length,this.save.total),this.refreshShop())}async share(){if(!no())return;const t=1080,e=1920,n=document.createElement("canvas");n.width=t,n.height=e;const i=n.getContext("2d");this.renderer.render(this.scene,this.camera);const r=this.renderer.domElement,a=Math.max(t/r.width,e/r.height),o=t/a,c=e/a;i.drawImage(r,(r.width-o)/2,(r.height-c)/2,o,c,0,0,t,e);const l=i.createLinearGradient(0,0,0,e);l.addColorStop(0,"rgba(4,10,6,0.85)"),l.addColorStop(.35,"rgba(4,10,6,0)"),l.addColorStop(.7,"rgba(4,10,6,0)"),l.addColorStop(1,"rgba(4,10,6,0.9)"),i.fillStyle=l,i.fillRect(0,0,t,e),i.textAlign="center",i.fillStyle="#7dff4a",i.shadowColor="rgba(120,255,70,0.6)",i.shadowBlur=30,i.font='900 96px "Segoe UI", Arial, sans-serif',i.fillText(gt("НУЛЕВОЙ ПАЦИЕНТ"),t/2,260),i.shadowBlur=0,i.fillStyle="#eaffea",i.font='700 60px "Segoe UI", Arial, sans-serif';const h=this.phase==="victory"?gt("МИР ЗАРАЖЁН"):gt("Пал город:")+" "+gt(he[this.cityIndex].name);i.fillText(h,t/2,e-300),i.font='500 48px "Segoe UI", Arial, sans-serif',i.fillText(gt("Всего заражено за пандемию:")+" "+Math.round(this.save.total),t/2,e-210),await _u(n.toDataURL("image/jpeg",.86))}rewardFailed(){this.ui.toast(Nr()?gt("Ролик не досмотрен — награды нет"):gt("Реклама сейчас недоступна"))}async revive(){if(!await os()){this.rewardFailed();return}this.reviveUsed=!0,this.player.hp=this.player.maxHp,this.setPhase("play"),this.ui.toast(gt("Штамм мутировал — ты снова на ногах"))}async doubleDna(){if(this.dnaDoubled||this.cityDna<=0)return;if(!await os()){this.rewardFailed();return}this.dnaDoubled=!0,this.save.dna+=this.cityDna,this.persist(),this.ui.dnaButton(!1),this.refreshShop(),this.ui.winStats(he[this.cityIndex].name,this.winInfected,this.cityDna*2,Us(Math.round(this.cityElapsed)),Us(this.save.best[this.cityIndex]),!1),this.ui.toast(gt("ДНК удвоена"))}onInfected(t,e,n,i){if(this.phase!=="play")return;let r=t?2:1;t&&(this.combo=this.comboT>0?this.combo+1:1,this.comboT=2.5,r+=Math.min(3,this.combo-1),this.floatDna(e,n,this.combo>=3?"+"+r+" ×"+this.combo:"+"+r),i&&this.goalProgress("cops"),this.player.inCar?this.goalProgress("carHits"):this.goalProgress("bites")),this.save.dna+=r,this.save.total+=1,this.cityDna+=r,t&&(this.player.hp=Math.min(this.player.maxHp,this.player.hp+3));const a=he[this.cityIndex];this.phase==="play"&&this.crowd.infectedTotal>=Math.ceil(a.civ*a.threshold)&&this.cityWon()}goalProgress(t){const e=this.goals.find(n=>n.kind===t);!e||e.paid||(e.done++,e.done>=e.need&&(e.paid=!0,this.save.dna+=e.reward,this.cityDna+=e.reward,this.audio.sting(!0),this.ui.toast(gt("Цель выполнена:")+" +"+e.reward+" "+gt("ДНК"))),this.ui.goals(this.goals.map(n=>({label:gt(qa[n.kind]),done:Math.min(n.done,n.need),need:n.need,paid:n.paid}))))}async delayArmy(){if(this.phase!=="play"||this.ui.blocked||this.armyDelayed||this.armyArrived)return;if(!await os()){this.rewardFailed();return}this.armyArrived||(this.armyDelayed=!0,this.clock+=60,this.minuteWarned=this.clock<=60,this.ui.delayButton(!1),this.ui.toast(gt("Армия задержана на минуту")))}cityWon(){this.audio.sting(!0),fu(),this.save.city=Math.max(this.save.city,this.cityIndex+1),this.persist(),gu("infected",Math.round(this.save.total)),this.winInfected=this.crowd.infectedTotal;const t=Math.max(1,Math.round(this.cityElapsed)),e=this.save.best[this.cityIndex],n=!e||t<e;n&&(this.save.best[this.cityIndex]=t,this.persist()),this.setPhase("citywin"),this.ui.winStats(he[this.cityIndex].name,this.winInfected,this.cityDna,Us(t),Us(this.save.best[this.cityIndex]),n),this.ui.dnaButton(!this.dnaDoubled&&this.cityDna>0),this.refreshShop(),this.cityIndex>=1&&!this.askedReview?(this.askedReview=!0,pu()):this.cityIndex>=2&&!this.askedShortcut&&(this.askedShortcut=!0,mu())}onPlayerHit(t){this.phase==="play"&&(this.player.hp-=t,this.audio.hurt(),this.shakeT=.25,this.vignetteT=.5,this.player.hp<=0&&(this.player.hp=0,this.audio.sting(!1),this.audio.setEngine(!1),this.audio.setSiren(!1),this.setPhase("dead"),this.ui.deadStats(this.crowd.infectedTotal),this.ui.reviveButton(!this.reviveUsed&&!this.armyArrived),this.persist()))}witnessCheck(){this.crowd.witness(this.player.x,this.player.z,this.city)}tryBite(){if(this.phase!=="play"||this.ui.blocked||this.player.inCar||this.player.biteCd>0)return;this.player.biteCd=.55,this.player.lungeT=1;const t=this.crowd.bite(this.player.x,this.player.z,this.player.angle,this.player.biteRadius);if(t){this.audio.bite(1+Math.min(3,this.combo)*.06),this.witnessCheck(),this.crowd.panic(this.player.x,this.player.z,4.5,this.city),this.hitPauseT=.06;const e=t.x-this.player.x,n=t.z-this.player.z,i=Math.hypot(e,n)||1,r=this.city.collide(this.player.x+e/i*Math.min(.9,i-.4),this.player.z+n/i*Math.min(.9,i-.4),.45);this.player.x=r.x,this.player.z=r.z}else this.audio.click()}async outbreak(){if(this.phase!=="play"||this.ui.blocked||this.outbreakCd>0)return;if(!await os()){this.rewardFailed();return}if(this.phase!=="play"){this.pendingOutbreak=!0;return}this.applyOutbreak()}applyOutbreak(){this.pendingOutbreak=!1,this.outbreakCd=90;const t=this.crowd.blast(this.player.x,this.player.z,13);this.audio.infected(),this.audio.moan(),this.fx.outbreak(this.player.x,this.player.z),this.flashT=.6,this.shakeT=.35,this.witnessCheck(),this.crowd.panic(this.player.x,this.player.z,20,this.city),this.ui.toast(gt("Вирусная вспышка!")+" +"+t)}carAction(){if(this.phase!=="play"||this.ui.blocked)return;if(this.player.inCar){this.audio.setEngine(!1),this.player.exitCar(this.city,this.cars);return}const t=this.cars.nearest(this.player.x,this.player.z,3.6);t&&(this.player.enterCar(t),this.audio.setEngine(!0,0),this.droveThisCity=!0)}loadSave(){const t=Os(Ir,null),e=(a,o)=>Number.isInteger(a)?Math.min(o,Math.max(0,a)):0,n=a=>typeof a=="number"&&Number.isFinite(a)?Math.max(0,a):0,i=t?.up??{},r=Array.isArray(t?.best)?t.best.map(a=>n(a)):[];for(;r.length<he.length;)r.push(0);return{city:e(t?.city,he.length),dna:n(t?.dna),total:n(t?.total),up:{spd:e(i.spd,as),hp:e(i.hp,as),bite:e(i.bite,as),horde:e(i.horde,as)},best:r.slice(0,he.length),daily:typeof t?.daily=="string"?t.daily:""}}persist(){if(performance.now()<this.cloudHoldUntil){try{localStorage.setItem(Jo(Ir),JSON.stringify(this.save))}catch{}return}Qo(Ir,this.save)}applyUpgrades(){const t=this.save.up;this.player.speedMul=1+t.spd*.06,this.player.maxHp=100+t.hp*25,this.player.biteRadius=2.2*(1+t.bite*.08)}zombieMul(){return 1+this.save.up.horde*.05}shopItems(){const t=this.save.up;return[["spd","Скорость штамма"],["hp","Живучесть"],["bite","Заразность"],["horde","Свирепость орды"]].map(([n,i])=>({key:n,name:i,lvl:t[n],max:as,cost:Dr(t[n]),can:this.save.dna>=Dr(t[n])}))}refreshShop(){this.ui.shop(this.shopItems()),this.ui.shopBalance(this.save.dna)}buy(t){const e=this.save.up[t];e>=as||this.save.dna<Dr(e)||(this.save.dna-=Dr(e),this.save.up[t]++,this.applyUpgrades(),this.persist(),this.audio.click(),this.refreshShop())}refreshMeta(){this.ui.meta(this.audio.isMuted()),this.refreshShop()}setPhase(t){this.phase=t,this.renderSkip=0,this.ui.show(t),t!=="play"&&this.ui.hideToast(),uh(t==="play"),hh(t==="pause"||t==="dead"||t==="citywin"||t==="victory"),t!=="play"&&(this.audio.setEngine(!1),this.audio.setSiren(!1),this.audio.setTension(0),this.audio.setChopper(0),this.audio.setHorde(0)),t==="title"&&(this.audio.setAmbience(!1),this.audio.isLive()&&this.audio.setMusic("title"),this.ui.setContinue(this.save.city>0||this.save.dna>0),this.ui.titleProgress(Math.min(this.save.city,he.length),he.length,this.save.total),this.ui.dailyButtons(this.save.daily!==Lr()&&(this.save.city>0||this.save.total>0),Nr())),this.ui.shareButton(no()&&(t==="citywin"||t==="victory")),t==="victory"&&this.audio.setMusic("title")}frame(t){const e=Math.min(.05,t/1e3);this.frames++,this.hitPauseT>0?this.hitPauseT-=e:this.phase==="play"&&!this.ui.blocked?this.step(e):(this.phase==="title"||this.phase==="citywin"||this.phase==="victory")&&!this.ui.blocked&&(this.crowd.update(e,this.city,{x:this.player.x,z:this.player.z,inCar:!1,hidden:!0},this.zombieMul()),this.cars.update(e,this.city,(r,a,o)=>this.peopleAt(r,a,o))),this.crowd.render(this.player.x,this.player.z),this.cars.render(this.player.x,this.player.z,performance.now()/1e3),this.player.applyCamera(this.camera,this.city,this.cars.cars,e);const n=66+this.player.carSpeed01()*11;Math.abs(this.camera.fov-n)>.1&&(this.camera.fov+=(n-this.camera.fov)*Math.min(1,e*4),this.camera.updateProjectionMatrix()),this.shakeT>0&&(this.shakeT-=e,this.camera.position.x+=(Math.random()-.5)*.3,this.camera.position.y+=(Math.random()-.5)*.3),this.city.sky.position.copy(this.camera.position),this.weather.update(e,this.camera),this.fx.update(e,this.camera),this.overlays(e),(!(this.phase==="pause"||this.phase==="dead"||this.phase==="citywin"||this.phase==="victory")||this.renderSkip%3===0)&&this.renderer.render(this.scene,this.camera),this.renderSkip++,this.ui.endFrame()}peopleAt(t,e,n){return this.crowd.nearby(t,e,n).length>0}overlays(t){this.vignetteT=Math.max(0,this.vignetteT-t),this.flashT=Math.max(0,this.flashT-t);const e=this.phase==="play"&&this.player.hp<this.player.maxHp*.3,n=e?.22+Math.sin(performance.now()/260)*.1:0,i=document.getElementById("vignette");i.style.opacity=String(Math.min(1,this.vignetteT*1.6+n));const r=document.getElementById("flash");r.style.opacity=String(Math.min(1,this.flashT*1.4)),this.audio.setHeartbeat(e)}floatDna(t,e,n){const i=document.getElementById("float-layer");if(i.childElementCount>14)return;const r=new D(t,2.1,e).project(this.camera);if(r.z>1||Math.abs(r.x)>1||Math.abs(r.y)>1)return;const a=document.createElement("span");a.className="float-dna",a.textContent=n,a.style.left=(r.x*.5+.5)*100+"%",a.style.top=(-r.y*.5+.5)*100+"%",i.append(a),a.addEventListener("animationend",()=>a.remove())}step(t){this.pendingOutbreak&&this.applyOutbreak();const e=this.ui.poll();if(this.player.update(t,e,this.city),this.player.inCar){const h=this.player.car;for(const d of this.cars.cars){if(d===h||!d.alive)continue;const u=d.x-h.x,p=d.z-h.z,g=u*u+p*p;if(g>3.4*3.4||g<1e-6)continue;const b=Math.sqrt(g),m=(3.4-b)/2,f=u/b,y=p/b;d.wrecked?(h.x-=f*m*2,h.z-=y*m*2):(d.x+=f*m,d.z+=y*m,h.x-=f*m,h.z-=y*m),this.player.x=h.x,this.player.z=h.z,Math.abs(h.speed)>6&&(this.audio.crash(),this.shakeT=.2,this.fx.crash(d.x,d.z)),h.speed*=.35,d.speed=0}}else{const h=this.cars.pushOut(this.player.x,this.player.z,.45);h.hit&&(this.player.x=h.x,this.player.z=h.z)}if(this.player.inCar){const h=this.player.car;if(this.audio.setEngine(!0,this.player.carSpeed01()),Math.abs(h.speed)>4){const d=h.x+Math.sin(h.angle)*2.4*Math.sign(h.speed),u=h.z+Math.cos(h.angle)*2.4*Math.sign(h.speed);this.crowd.carHit(d,u,1.7,!0)>0&&(this.shakeT=.15,this.witnessCheck(),this.crowd.panic(d,u,6,this.city))}this.player.crashed&&(this.player.crashed=!1,this.audio.crash(),this.shakeT=.2,this.fx.crash(h.x+Math.sin(h.angle)*2.2,h.z+Math.cos(h.angle)*2.2))}this.crowd.update(t,this.city,{x:this.player.x,z:this.player.z,inCar:this.player.inCar,hidden:!1},this.zombieMul()),this.cars.update(t,this.city,(h,d,u,p)=>{if(this.player.car!==p){const g=this.player.x-h,b=this.player.z-d,m=u+.6;if(g*g+b*b<m*m)return!0}return this.peopleAt(h,d,u)});for(const h of this.cars.cars)if(h.honkT>0&&h.honkT<.02&&(this.audio.horn(),h.honkT=.5),h.ai&&h.alive&&Math.abs(h.speed)>2.5){const d=h.x+Math.sin(h.angle)*2.4,u=h.z+Math.cos(h.angle)*2.4;this.crowd.nearby(d,u,1.5).length>0&&this.crowd.carHit(d,u,1.5,!1)>0&&(h.speed=0,h.honkT=.01)}const n=he[this.cityIndex];if(this.armyArrived||(this.clock=Math.max(0,this.clock-t)),this.cityElapsed+=t,this.comboT=Math.max(0,this.comboT-t),this.comboT<=0&&(this.combo=0),!this.minuteWarned&&this.clock<=60&&(this.minuteWarned=!0,this.ui.toast(gt("Армия на подходе — осталась минута")),this.audio.horn()),this.ui.delayButton(!this.armyArrived&&!this.armyDelayed&&this.clock<=60&&this.clock>0&&Nr()),!this.armyArrived&&this.clock<=0){this.clock=0,this.armyArrived=!0,this.ui.toast(gt("АРМИЯ ВОШЛА В ГОРОД")),this.audio.sting(!1),this.audio.setMusic("army"),this.shakeT=.6,this.flashT=.3;for(let h=0;h<20;h++)this.crowd.addCop(this.city,Math.random,!0);this.cars.spawnArmy(this.city,5,n.apc),this.audio.alarm(),this.chopper.show(!0,this.player.x,this.player.z)}this.armyArrived&&(this.armySpawnT-=t,this.armySpawnT<=0&&(this.armySpawnT=n.armyMax>80?1.1:1.4,this.countSoldiers()<n.armyMax&&this.crowd.addCop(this.city,Math.random,!0)));const i=Math.min(1,this.crowd.infectedTotal/n.civ);if(this.copSpawnT-=t,!this.armyArrived&&i>.1&&this.copSpawnT<=0){if(this.copSpawnT=(7-i*4)/n.reinforce,!this.policeWarned){this.policeWarned=!0,this.ui.toast(gt("Полиция стягивает силы в город")),this.audio.alarm();for(let d=0;d<3;d++){const u=this.pickCar(30,1e9);if(!u)break;this.cars.makePolice(u)}}const h=Math.round(n.cop*(1+i*(1.8+.3*n.tier)));this.crowd.count(je)<h&&this.crowd.addCop(this.city,Math.random)}this.chaos(t,i);let r=!1,a=!1;for(const h of this.crowd.people){if(!h.alive||h.kind!==je||h.state!=="chase")continue;const d=Math.hypot(h.x-this.player.x,h.z-this.player.z);d<45&&(r=!0),h.target===-2&&d<40&&(a=!0)}this.audio.setSiren(r),this.audio.setTension(a?1:0),this.ui.hud(n.name,this.crowd.infectedTotal/(n.civ*n.threshold),Math.min(1,this.crowd.infectedTotal/n.civ),this.player.hp,this.player.maxHp,this.save.dna,this.crowd.zombies),this.stages(i),this.audio.setHorde(Math.min(1,this.crowd.zombies/90)),this.ui.clock(this.clock,this.armyArrived),this.outbreakCd=Math.max(0,this.outbreakCd-t),this.ui.outbreakButton(this.outbreakCd),this.updateHint(),this.tutorial(t);const o=this.crowd.remainingVictims(),c=this.crowd.infectedTotal/(n.civ*n.threshold),l=Math.ceil(n.civ*n.threshold)-this.crowd.infectedTotal;if(this.hunt=l<=10||c>=.8,this.crowd.huntAll=this.hunt,o>0&&this.hunt){const h=this.crowd.nearestVictim(this.player.x,this.player.z);if(h){const d=this.debugAxes(),u=h.x-this.player.x,p=h.z-this.player.z,g=u*d.fx+p*d.fz,b=u*d.rx+p*d.rz;this.ui.sense(Math.atan2(b,g))}}else this.ui.sense(null);++this.minimapFrame%3===0&&this.drawMinimap(),this.saveT-=t,this.saveT<=0&&(this.saveT=6,this.persist())}tutorial(t){if(this.cityIndex!==0||this.save.total>=30)return;this.tutorialT+=t;const e=n=>{this.tutorialStep++,this.ui.toast(n,4200)};if(this.tutorialStep===0&&this.tutorialT>7)e(gt("Укушенные встают и кусают сами — веди орду к толпе"));else if(this.tutorialStep===1&&this.tutorialT>17){if(this.droveThisCity){this.tutorialStep++;return}e(this.ui.touch?gt("Подойди к машине и нажми «Сесть» — сбитые заражаются"):gt("Подойди к машине и нажми E — сбитые заражаются"))}else this.tutorialStep===2&&this.tutorialT>32&&e(gt("Полиция стреляет по заражённым. Ты для неё человек — пока не укусишь на виду"))}stages(t){if(this.stage>=Pr.length||t<Pr[this.stage][0])return;const[,e,n]=Pr[this.stage++];this.ui.stageBanner(gt(e),gt(n)),this.audio.stageSting(),this.shakeT=Math.max(this.shakeT,.25)}chaos(t,e){const n=this.player.x,i=this.player.z;this.city.setBlackout((e-.12)/.6);const r=Math.min(6,Math.floor(Math.max(0,e-.15)/.12));this.fireSites<r&&this.igniteCar();const a=Math.min(5,Math.floor(Math.max(0,e-.35)/.1));if(this.abandoned<a){const c=this.pickCar(25,90);c&&(this.abandoned++,c.ai=!1,c.speed=0,c.honkT=.01)}const o=he[this.cityIndex];if(!this.chopper.active&&(e>=o.chopperAt||this.armyArrived)&&this.chopper.show(!0,n,i),this.chopper.active){this.chopper.update(t,n,i,performance.now()/1e3,this.city);const c=this.chopper.distanceTo(n,i);this.audio.setChopper(Math.max(0,1-c/130)),this.exposed=o.exposes&&!this.player.inCar&&this.chopper.lights(n,i),this.exposed&&this.witnessCheck()}!this.roadblocksUp&&o.roadblocks>0&&e>=.15&&(this.roadblocksUp=!0,this.buildRoadblocks(o.roadblocks),this.ui.toast(gt("Полиция перекрывает улицы"))),this.armyArrived&&this.apcs(t)}buildRoadblocks(t){const e=this.city.roadAxes(),n=this.player.x,i=this.player.z,r=[];for(const a of e)for(const o of e){const c=Math.hypot(a-n,o-i);c>40&&c<110&&Math.abs(a)<this.city.half-10&&Math.abs(o)<this.city.half-10&&r.push([a,o])}for(let a=r.length-1;a>0;a--){const o=Math.floor(Math.random()*(a+1));[r[a],r[o]]=[r[o],r[a]]}for(const[a,o]of r.slice(0,t)){for(let c=0;c<2;c++){const l=this.pickCar(30,1e9);if(!l)break;l.x=a+(c===0?-3.6:3.6),l.z=o+9,l.angle=Math.PI/2,l.speed=0,l.ai=!1,l.laneX=null,l.laneZ=null,l.turnAt=null,this.cars.makePolice(l)}for(let c=0;c<3;c++)this.crowd.addCop(this.city,Math.random,!1,{x:a-3+c*3,z:o+12,hold:!0})}}apcs(t){const e=this.player.x,n=this.player.z;for(const i of this.cars.cars){if(!i.alive||i.kind!=="army")continue;if(Math.abs(i.speed)>2){const a=i.x+Math.sin(i.angle)*3.4,o=i.z+Math.cos(i.angle)*3.4;this.crowd.nearby(a,o,2).length>0&&this.crowd.crush(a,o,2)}if(!i.apc)continue;i.fireT-=t;const r=Math.hypot(e-i.x,n-i.z);i.fireT<=0&&r<26&&r>2&&this.city.lineOfSight(i.x,i.z,e,n)&&(i.fireT=.35,this.crowd.fireFrom(i.x,i.z,e,n),this.onPlayerHit(this.player.inCar?3:4))}}pickCar(t,e){const n=this.player.x,i=this.player.z;let r=null,a=1e9;for(const o of this.cars.cars){if(!o.alive||!o.ai||o.wrecked||o.kind!=="civ"||o===this.player.car)continue;const c=Math.hypot(o.x-n,o.z-i),l=c<t?1e6+c:c>e?1e3+c:c;l<a&&(a=l,r=o)}return r}igniteCar(){const t=this.player.x,e=this.player.z,n=this.pickCar(20,80);if(!n)return;this.fireSites++,this.cars.wreck(n),this.fx.addFire(n.x,n.z),this.fx.crash(n.x,n.z);const i=Math.hypot(n.x-t,n.z-e);this.audio.explosion(Math.max(.3,1-i/120)),i<45&&(this.shakeT=.3,this.flashT=.15)}countSoldiers(){let t=0;for(const e of this.crowd.people)e.alive&&e.kind===je&&e.soldier&&t++;return t}updateHint(){if(this.hintCd-=1,this.player.inCar){this.ui.hint(this.ui.touch?null:gt("E — выйти из машины")),this.ui.carButton("exit");return}this.cars.nearest(this.player.x,this.player.z,3.6)?(this.ui.hint(this.ui.touch?null:gt("E — сесть в машину")),this.ui.carButton("enter")):(this.ui.hint(this.exposed?gt("Ты в луче прожектора — уходи из света"):null),this.ui.carButton(null))}drawMinimap(){const t=this.minimapCtx;t.clearRect(0,0,132,132),t.drawImage(this.city.minimapBase,0,0);const e=132/(this.city.half*2),n=(o,c,l,h)=>{t.fillStyle=l,t.fillRect((o+this.city.half)*e-h/2,(c+this.city.half)*e-h/2,h,h)},i=this.hunt;for(const o of this.crowd.people)o.alive&&(o.kind===Ue?n(o.x,o.z,"#6fdb4a",2):o.kind===je?n(o.x,o.z,"#5a8aff",2):n(o.x,o.z,i?"#ffe36a":"#8a8f96",i?3:2));const r=(this.player.x+this.city.half)*e,a=(this.player.z+this.city.half)*e;t.strokeStyle="#e8ffe0",t.lineWidth=1.6,t.beginPath(),t.moveTo(r,a),t.lineTo(r+Math.sin(this.player.angle)*7,a+Math.cos(this.player.angle)*7),t.stroke(),n(this.player.x,this.player.z,"#e8ffe0",4)}resize(){const t=window.innerWidth,e=window.innerHeight;this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),this.renderer.setSize(t,e,!1),this.renderSkip=0,this.camera.aspect=t/e,this.camera.updateProjectionMatrix()}debugDump(){return{phase:this.phase,city:this.cityIndex,cityName:he[this.cityIndex].name,infected:this.crowd.infectedTotal,civ:this.crowd.count(ls),cops:this.crowd.count(je),zombies:this.crowd.count(Ue),hp:this.player.hp,dna:this.save.dna,total:this.save.total,player:{x:this.player.x,z:this.player.z,inCar:this.player.inCar},threshold:he[this.cityIndex].threshold,cities:he.length,clock:this.clock,army:this.armyArrived,fires:this.fx.fireCount,corpses:this.crowd.corpses,blackout:this.city.blackout,chopper:this.chopper.active,police:this.cars.cars.filter(t=>t.alive&&t.kind==="police").length,frenzy:this.crowd.frenzy,combo:this.combo,goals:this.goals.map(t=>t.kind+":"+t.done+"/"+t.need+(t.paid?"✓":"")),best:this.save.best.slice(),daily:this.save.daily,stage:this.stage,tier:he[this.cityIndex].tier,trucks:this.cars.cars.filter(t=>t.alive&&t.kind==="army").length}}debugAllStrings(){return[...he.map(t=>t.name),...he.map(t=>t.flavor),...he.map(t=>t.rule),...Zc,...Pr.flatMap(([,t,e])=>[t,e]),...Object.values(qa),...this.shopItems().map(t=>t.name)]}debugInfect(t){const e=he[this.cityIndex],n=Math.ceil(e.civ*e.threshold*t);for(const i of this.crowd.people){if(this.crowd.infectedTotal>=n)break;i.alive&&i.kind!==Ue&&i.state!=="stagger"&&this.crowd.bite(i.x,i.z,0,3)}}uiClick(t){return this.ui.uiClick(t)}debugHurt(t){this.onPlayerHit(t)}debugAxes(){const t=new D;this.camera.getWorldDirection(t);const e=new D().crossVectors(t,new D(0,1,0));return{fx:t.x,fz:t.z,rx:e.x,rz:e.z}}debugNearestCiv(){let t=null,e=1e9;for(const n of this.crowd.people){if(!n.alive||n.kind===Ue)continue;const i=Math.hypot(n.x-this.player.x,n.z-this.player.z);i<e&&(e=i,t=n)}return t}debugTeleport(t,e){const n=this.city.collide(t,e,.5);this.player.x=n.x,this.player.z=n.z}debugCar(){return this.cars.nearest(this.player.x,this.player.z,1e9)}}const P_=document.getElementById("game"),L_=Qh();async function I_(){await Promise.race([tu(),new Promise(l=>setTimeout(l,4e3))]),await iu(L_);let s;try{s=new R_(P_)}catch(l){console.error("[boot] WebGL unavailable",l);const h=document.getElementById("boot-fail");h&&(h.hidden=!1),document.querySelector("#boot .dot")?.remove();return}const t=window.__platformLang;window.__platformLang=l=>{t?.(l),setTimeout(()=>s.refreshMeta(),700)},Mu(()=>s.phase==="play"),cu(l=>{s.ui.blocked=l,document.body.classList.toggle("ad-busy",l),s.audio.adMute(l),uh(!l&&s.phase==="play"),hh(!l&&(s.phase==="pause"||s.phase==="dead"||s.phase==="citywin"))}),au(l=>s.audio.platformMute(l));const e=l=>{s.audio.focus(l),!l&&(s.phase==="play"&&!lu()&&s.setPhase("pause"),s.persist())};ru(e),document.addEventListener("visibilitychange",()=>e(!document.hidden));const n=window;n.__toggleLang=nh,n.__lang=Bs,n.__appFocus=e,n.__androidBack=()=>s.ui.blocked?!0:s.phase==="play"?(s.setPhase("pause"),!0):s.phase==="pause"?(s.setPhase("play"),!0):s.phase==="dead"||s.phase==="citywin"||s.phase==="victory"?(s.setPhase("title"),!0):!1;const i=/(?:^|[?&])debug(?:[=&]|$)/.test(location.search);i&&(n.__game=s,n.__ads={platform:()=>({platform:jo(),ready:ah()}),interstitial:()=>ch(),rewarded:()=>os(),seam:l=>io(l),resetPacing:()=>Su()});let r=performance.now(),a=!1,o=!1;i&&(n.__stepMode=l=>{o=l},n.__step=l=>{s.frame(l)},n.__cinema=l=>{document.body.classList.toggle("cinema",l)});const c=l=>{if(!o)try{s.frame(l-r)}catch(h){console.error("[fatal]",h)}r=l,n.__frameCount=s.frames,!a&&s.frames>0&&(a=!0,document.getElementById("boot")?.remove(),document.getElementById("app").style.visibility="visible",yu()),requestAnimationFrame(c)};requestAnimationFrame(c)}I_();
