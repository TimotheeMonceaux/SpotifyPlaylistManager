(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{127:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(15),l=n.n(i),o=n(29),c=n(30),s=n(33),u=n(31),d=n(32),f=n(12),m=n(16),y=0,p=1,g=3,k=4,h=6,b=8,v=9,E=11,P=12,j=14,T=15,O=16,I=0,w=1,C=2,x=3,S={forceState:function(e){return{type:y,newState:e}},setEnvironment:function(e){return{type:p,environment:e}},setClientId:function(e){return{type:g,clientId:e}},loadInitialConfig:function(){return function(e){return fetch("/config/spotify.json").then(function(e){return e.json()},function(e){return console.log(e)}).then(function(t){e(S.setEnvironment(t.environment)),"TEST"===t.environment?e(S.forceState(t.testState)):e(S.setClientId(t.clientId))})}},addUserToken:function(e){return{type:k,userToken:e}},loadUserProfile:function(e){return function(t){return fetch("https://api.spotify.com/v1/me",{method:"GET",headers:new Headers({Authorization:"Bearer "+e}),mode:"cors",cache:"default"}).then(function(e){return e.json()},function(e){return console.log(e)}).then(function(e){return t(S.addUserProfile(e))})}},addUserProfile:function(e){return{type:h,userProfile:e}},loadUserPlaylists:function(e){return function(t){return fetch("https://api.spotify.com/v1/me/playlists",{method:"GET",headers:new Headers({Authorization:"Bearer "+e}),mode:"cors",cache:"default"}).then(function(e){return e.json()},function(e){return console.log(e)}).then(function(n){return t(S.addUserPlaylists(n.items,e))})}},addUserPlaylists:function(e,t){return function(n){n({type:b,userPlaylists:e}),e.map(function(e){return n(S.loadPlaylistTracks(t,e.id))})}},toggleUserPlaylist:function(e){return{type:v,playlistId:e}},loadLibraryTracks:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return function(n){return fetch("https://api.spotify.com/v1/me/tracks?limit=50&offset="+t,{method:"GET",headers:new Headers({Authorization:"Bearer "+e}),mode:"cors",cache:"default"}).then(function(e){return e.json()},function(e){return console.log(e)}).then(function(r){n(S.appendLibraryTracks(r.items)),null!==r.next&&n(S.loadLibraryTracks(e,t+r.limit))})}},appendLibraryTracks:function(e){return{type:E,tracks:e}},changeLibrarySort:function(e){return{type:P,librarySort:e}},loadPlaylistTracks:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0;return function(r){return fetch("https://api.spotify.com/v1/playlists/"+t+"/tracks?fields=items(track(id))%2Climit%2Cnext%2Coffset%2Cprevious%2Ctotal&limit=100&offset="+n,{method:"GET",headers:new Headers({Authorization:"Bearer "+e}),mode:"cors",cache:"default"}).then(function(e){return e.json()},function(e){return console.log(e)}).then(function(a){r(S.appendPlaylistTracks(t,a.items)),null!==a.next&&r(S.loadPlaylistTracks(e,t,n+a.limit))})}},appendPlaylistTracks:function(e,t){return{type:j,playlistId:e,tracks:t}},addPlaylistTrack:function(e,t,n){return function(r){return fetch("https://api.spotify.com/v1/playlists/"+t+"/tracks?uris=spotify:track:"+n,{method:"POST",headers:new Headers({Authorization:"Bearer "+e}),mode:"cors",cache:"default"}).then(function(){return r({type:T,playlistId:t,trackId:n})},function(e){return console.log(e)})}},deletePlaylistTrack:function(e,t,n){return function(r){return fetch("https://api.spotify.com/v1/playlists/"+t+"/tracks",{method:"DELETE",headers:new Headers({Authorization:"Bearer "+e,"Content-Type":"application/json"}),mode:"cors",cache:"default",body:JSON.stringify({tracks:[{uri:"spotify:track:"+n}]})}).then(function(){return r({type:O,playlistId:t,trackId:n})},function(e){return console.log(e)})}}},U=n(13);function L(){var e=Object(f.a)(["\n    display: flex;\n    flex-direction: row;\n    justify-content: space-evenly;\n"]);return L=function(){return e},e}function A(){var e=Object(f.a)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: space-evenly;\n"]);return A=function(){return e},e}var B=U.a.div(A()),z=U.a.div(L()),N=n(66),H=n.n(N);function G(){var e=Object(f.a)(["\n    width: 100px;\n    height: 100px;\n"]);return G=function(){return e},e}var W=U.a.img(G()),J=function(){return a.a.createElement(W,{src:"/img/Gear-4s-200px.svg"})},M=n(128),R=n(129),_=n(130);n(87);function D(){var e=Object(f.a)(["\n    color: white;\n"]);return D=function(){return e},e}var F=U.a.div(D()),K=function(e){return e.sort===w?1===e.asc?"/img/sort-arrows-asc.svg":"/img/sort-arrows-desc.svg":"/img/sort-arrows.svg"},$=function(e){return e.sort===C?1===e.asc?"/img/sort-arrows-asc.svg":"/img/sort-arrows-desc.svg":"/img/sort-arrows.svg"},q=function(e){return e.sort===x?1===e.asc?"/img/sort-arrows-asc.svg":"/img/sort-arrows-desc.svg":"/img/sort-arrows.svg"},Q=function(e){var t=e.onImgClicked;return a.a.createElement("td",null,a.a.createElement("img",{src:"/img/plus.svg",onClick:t,alt:"Not In Playlist"}))},V=function(e){var t=e.onImgClicked;return a.a.createElement("td",null,a.a.createElement("img",{src:"/img/tick.svg",onClick:t,alt:"In Playlist"}))},X=function(e){var t=e.userToken,n=e.track,r=e.userPlaylists,i=e.onNotInPlaylistClicked,l=e.onInPlaylistClicked;return a.a.createElement("tr",{key:n.track.id},a.a.createElement("td",null,a.a.createElement("a",{href:n.track.uri},a.a.createElement("img",{src:"/img/play-button.svg",alt:"Play Button"}))),a.a.createElement("td",null,n.track.name),a.a.createElement("td",null,n.track.artists[0].name),a.a.createElement("td",null,n.track.album.name),r.filter(function(e){return e.enabled}).map(function(e){return!0===e.tracks[n.track.id]?a.a.createElement(V,{key:e.id+n.track.id,onImgClicked:l(t,e.id,n.track.id)}):a.a.createElement(Q,{key:e.id+n.track.id,onImgClicked:i(t,e.id,n.track.id)})}))},Y=Object(m.b)(function(e){return{userToken:e.userToken,library:e.library,librarySort:e.librarySort,userPlaylists:e.userPlaylists}},function(e){return{onTitleClicked:function(){e(S.changeLibrarySort(w))},onArtistClicked:function(){e(S.changeLibrarySort(C))},onAlbumClicked:function(){e(S.changeLibrarySort(x))},onNotInPlaylistClicked:function(t,n,r){return function(){return e(S.addPlaylistTrack(t,n,r))}},onInPlaylistClicked:function(t,n,r){return function(){return e(S.deletePlaylistTrack(t,n,r))}}}})(function(e){var t=e.userToken,n=e.library,r=e.librarySort,i=e.userPlaylists,l=e.onTitleClicked,o=e.onArtistClicked,c=e.onAlbumClicked,s=e.onNotInPlaylistClicked,u=e.onInPlaylistClicked;return a.a.createElement(F,null,a.a.createElement("table",null,a.a.createElement("thead",null,a.a.createElement("tr",null,a.a.createElement("th",null),a.a.createElement("th",{onClick:l},a.a.createElement("img",{src:K(r),alt:"Sorting Arrows"})," Title"),a.a.createElement("th",{onClick:o},a.a.createElement("img",{src:$(r),alt:"Sorting Arrows"})," Artist"),a.a.createElement("th",{onClick:c},a.a.createElement("img",{src:q(r),alt:"Sorting Arrows"})," Album"),i.filter(function(e){return e.enabled}).map(function(e){return a.a.createElement("th",{key:e.id},e.name)}))),a.a.createElement("tbody",null,r.sort===I?n.map(function(e){return a.a.createElement(X,{key:e.track.id,userToken:t,track:e,userPlaylists:i,onNotInPlaylistClicked:s,onInPlaylistClicked:u})}):n.sort(function(e){return e.sort===C?function(t,n){return t.track.artists[0].name>n.track.artists[0].name?e.asc:-1*e.asc}:e.sort===x?function(t,n){return t.track.album.name>n.track.album.name?e.asc:-1*e.asc}:function(t,n){return t.track.name>n.track.name?e.asc:-1*e.asc}}(r)).map(function(e){return a.a.createElement(X,{key:e.track.id,userToken:t,track:e,userPlaylists:i,onNotInPlaylistClicked:s,onInPlaylistClicked:u})}))))}),Z=n(69),ee=n.n(Z),te=n(38),ne=n.n(te),re=n(19),ae=n.n(re),ie=function(e){if(null==e)return!0;if(Array.isArray(e)||"string"===typeof e)return 0===e.length;for(var t in e)if(e.hasOwnProperty(t))return!1;return!0};function le(){var e=Object(f.a)(["\n    color: white;\n    font-size: 80%;\n    text-decoration: underline;\n"]);return le=function(){return e},e}function oe(){var e=Object(f.a)(["\n    color: white;\n    font-weight: bold;\n    font-size: 100%;\n    margin-bottom: 10px;\n    margin-top: 5px;\n"]);return oe=function(){return e},e}function ce(){var e=Object(f.a)(["\n    background: url(",") 50% 50% no-repeat;\n    background-size: 175%;\n    width: 50px;\n    height: 50px;\n    margin: 5px;\n"]);return ce=function(){return e},e}function se(){var e=Object(f.a)(["\n    border-left: solid 3px lightgray;\n    border-right: solid 3px lightgray;\n    padding: 5px;\n    background-color: #4B4B4B;\n    height: 100%;\n"]);return se=function(){return e},e}var ue=U.a.div(se()),de=U.a.div(ce(),function(e){return e.url}),fe=U.a.div(oe()),me=U.a.div(le()),ye=Object(m.b)(function(e){return{userProfile:e.userProfile}})(function(e){var t=e.userProfile;return a.a.createElement(ue,null,a.a.createElement(z,null,a.a.createElement(de,{url:ie(t.images)?"http://groovesharks.org/assets/images/default_avatar.jpg":t.images[0].url}),a.a.createElement(B,null,a.a.createElement(fe,null,t.display_name),a.a.createElement(me,null,t.email))))}),pe=n(131),ge=function(e){var t=e.playlist,n=e.onPlaylistToggle;return a.a.createElement(pe.a.Item,{as:"label"},a.a.createElement("input",{type:"checkbox",defaultChecked:t.enabled,onChange:n(t.id)})," ",t.name)},ke=Object(m.b)(function(e){return{userPlaylists:e.userPlaylists}},function(e){return{onPlaylistToggle:function(t){return function(){return e(S.toggleUserPlaylist(t))}}}})(function(e){var t=e.userPlaylists,n=e.onPlaylistToggle;return a.a.createElement(pe.a,{id:"userplaylists-dropdown",title:"Playlists",style:{color:"white"}},t.map(function(e){return a.a.createElement(ge,{playlist:e,key:e.id,onPlaylistToggle:n})}))});function he(){var e=Object(f.a)(["\n    height: 40px;\n    margin: 0 9px;\n    border: 1px solid #666;\n    margin-left: 25px;\n    margin-right: 25px;\n"]);return he=function(){return e},e}var be=U.a.div(he()),ve=function(){return a.a.createElement(ee.a,{fluid:!0,style:{paddingLeft:0,paddingRight:0,marginBottom:10}},a.a.createElement(ne.a,{expand:"lg",bg:"dark",variant:"dark",sticky:"top",style:{paddingTop:0,paddingBottom:0}},a.a.createElement(ne.a.Brand,null,"Spotify Playlist Manager"),a.a.createElement(ae.a,null,a.a.createElement(ke,null)),a.a.createElement(be,null),a.a.createElement(ae.a,{variant:"pills",defaultActiveKey:"/library"},a.a.createElement(ae.a.Item,null,a.a.createElement(ae.a.Link,{href:"/library"},"Library")),a.a.createElement(ae.a.Item,null,a.a.createElement(ae.a.Link,{disabled:!0},"Duplicates")),a.a.createElement(ae.a.Item,null,a.a.createElement(ae.a.Link,{disabled:!0},"Out of Library"))),a.a.createElement(ne.a.Collapse,{className:"justify-content-end"},a.a.createElement(ae.a,null,a.a.createElement(ye,null)))))},Ee=(n(124),function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){"TEST"!==this.props.environment&&(this.props.loadUserProfile(this.props.userToken),this.props.loadUserPlaylists(this.props.userToken),this.props.loadLibraryTracks(this.props.userToken))}},{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement(ve,null),a.a.createElement(M.a,null,a.a.createElement(R.a,null,a.a.createElement(_.a,null,a.a.createElement(Y,null)))))}}]),t}(a.a.Component)),Pe=Object(m.b)(function(e){return{environment:e.environment,userToken:e.userToken,userProfile:e.userProfile,userPlaylists:e.userPlaylists,library:e.library}},function(e){return{loadUserProfile:function(t){e(S.loadUserProfile(t))},loadUserPlaylists:function(t){e(S.loadUserPlaylists(t))},loadLibraryTracks:function(t){e(S.loadLibraryTracks(t))}}})(Ee);function je(){var e=Object(f.a)(["\n    color: white;\n    background-color: forestgreen;\n    padding: 25px;\n    font-weight: bold;\n    border-radius: 20px;\n    font-family: Arial;\n    font-size: 150%;\n    border: none;\n    cursor: pointer;\n"]);return je=function(){return e},e}var Te=Object(U.a)(H.a)(je()),Oe=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"componentWillMount",value:function(){this.props.loadInitialConfig()}},{key:"render",value:function(){var e=this;return""===this.props.clientId?a.a.createElement(B,null,a.a.createElement(z,null,a.a.createElement(J,null))):""===this.props.userToken?a.a.createElement(B,null,a.a.createElement(z,null,a.a.createElement(Te,{clientId:this.props.clientId,redirectUri:"http://localhost:3000/callback/",scope:"user-read-private user-read-email user-library-read playlist-modify-public playlist-modify-private",onSuccess:function(t){return e.props.onUserTokenRetrieved(t)},onFailure:function(e){return console.error(e)}}))):a.a.createElement(Pe,null)}}]),t}(a.a.Component),Ie=Object(m.b)(function(e){return{clientId:e.clientId,userToken:e.userToken,userProfile:e.userProfile,userPlaylists:e.userPlaylists,library:e.library}},function(e){return{loadInitialConfig:function(){e(S.loadInitialConfig())},onUserTokenRetrieved:function(t){e(S.addUserToken(t.access_token))},loadUserProfile:function(t){e(S.loadUserProfile(t))},loadUserPlaylists:function(t){e(S.loadUserPlaylists(t))},loadLibraryTracks:function(t){e(S.loadLibraryTracks(t))}}})(Oe),we=n(70),Ce=n(27),xe=function(e){function t(){return Object(o.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return a.a.createElement(we.a,null,a.a.createElement(Ce.c,null,a.a.createElement(Ce.a,{name:"home",exact:!0,path:"/",component:Ie}),a.a.createElement(Ce.a,{name:"callback",path:"/callback/",component:Ie})))}}]),t}(r.Component),Se=n(26),Ue=n(73),Le=n(74),Ae=n(22),Be=Object(Se.c)({environment:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;return"TEST"===e&&console.log(t),t.type===y?t.newState.environment:t.type===p?t.environment:e},clientId:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;return t.type===y?t.newState.clientId:t.type===g?t.clientId:e},userToken:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1?arguments[1]:void 0;return t.type===y?t.newState.userToken:t.type===k?t.userToken:e},userProfile:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return t.type===y?t.newState.userProfile:t.type===h?t.userProfile:e},userPlaylists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;if(t.type===y)return t.newState.userPlaylists;if(t.type===b)return t.userPlaylists.map(function(e){return Object.assign({},e,{enabled:!0,tracks:{}})});if(t.type===v){var n=e.findIndex(function(e){return e.id===t.playlistId});return[].concat(Object(Ae.a)(e.slice(0,n)),[Object.assign({},e[n],{enabled:!e[n].enabled})],Object(Ae.a)(e.slice(n+1,e.length)))}if(t.type===j){var r=e.findIndex(function(e){return e.id===t.playlistId});return[].concat(Object(Ae.a)(e.slice(0,r)),[Object.assign({},e[r],{tracks:Object(Le.a)({},e[r].tracks,t.tracks.map(function(e){return e.track.id}).reduce(function(e,t){return e[t]=!0,e},{}))})],Object(Ae.a)(e.slice(r+1,e.length)))}if(t.type===T){var a=e.findIndex(function(e){return e.id===t.playlistId}),i=Object.assign({},e[a].tracks);return i[t.trackId]=!0,[].concat(Object(Ae.a)(e.slice(0,a)),[Object.assign({},e[a],{tracks:i})],Object(Ae.a)(e.slice(a+1,e.length)))}if(t.type===O){var l=e.findIndex(function(e){return e.id===t.playlistId}),o=Object.assign({},e[l].tracks);return o[t.trackId]=!1,[].concat(Object(Ae.a)(e.slice(0,l)),[Object.assign({},e[l],{tracks:o})],Object(Ae.a)(e.slice(l+1,e.length)))}return e},library:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return t.type===y?t.newState.library:t.type===E?e.concat(t.tracks):e},librarySort:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{sort:I,asc:1},t=arguments.length>1?arguments[1]:void 0;return t.type===y?t.newState.librarySort:t.type===P&&t.librarySort!==I?e.sort===t.librarySort?Object.assign({},e,{asc:-1*e.asc}):{sort:t.librarySort,asc:1}:e}}),ze=Object(Se.d)(Be,Object(Se.a)(Ue.a));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(a.a.createElement(m.a,{store:ze},a.a.createElement(xe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},77:function(e,t,n){e.exports=n(127)},87:function(e,t,n){}},[[77,1,2]]]);
//# sourceMappingURL=main.0cf3ea42.chunk.js.map