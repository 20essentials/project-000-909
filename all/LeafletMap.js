const p="modulepreload",b=function(c){return"/"+c},f={},g=function(e,t,d){let a=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),o=l?.nonce||l?.getAttribute("nonce");a=Promise.allSettled(t.map(r=>{if(r=b(r),r in f)return;f[r]=!0;const n=r.endsWith(".css"),u=n?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${r}"]${u}`))return;const i=document.createElement("link");if(i.rel=n?"stylesheet":p,n||(i.as="script"),i.crossOrigin="",i.href=r,o&&i.setAttribute("nonce",o),document.head.appendChild(i),n)return new Promise((h,m)=>{i.addEventListener("load",h),i.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${r}`)))})}))}function s(l){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=l,window.dispatchEvent(o),!o.defaultPrevented)throw l}return a.then(l=>{for(const o of l||[])o.status==="rejected"&&s(o.reason);return e().catch(s)})};class v extends HTMLElement{observer=null;initialized=!1;connectedCallback(){this.observer=new IntersectionObserver(this.handleIntersection.bind(this),{rootMargin:"200px",threshold:0}),this.observer.observe(this)}disconnectedCallback(){this.observer&&(this.observer.disconnect(),this.observer=null)}async handleIntersection(e){if(e[0]?.isIntersecting&&!this.initialized){this.initialized=!0,this.observer&&(this.observer.disconnect(),this.observer=null),await this.loadLeafletCSS();const a=(await g(()=>import("./leaflet-src.r9KgTLRM.js").then(s=>s.l),[])).default;await this.initializeMap(a)}}async loadLeafletCSS(){return new Promise(e=>{const t=document.createElement("link");t.rel="stylesheet",t.href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",t.integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=",t.crossOrigin="",t.onload=()=>{this.addCustomStyles(),e()},document.head.appendChild(t)})}addCustomStyles(){const e=document.createElement("style");e.textContent=`
        .leaflet-tile {
          filter: hue-rotate(220deg);
        }

        .leaflet-pane {
          z-index: 10;
        }

        .leaflet-top {
          z-index: 11;
        }

        .leaflet-control-zoom.leaflet-bar.leaflet-control {
          border-radius: 24px;
          overflow: hidden;
          margin: 14px;
          border-color: var(--color-primary);
        }

        a.leaflet-control-zoom-in,
        a.leaflet-control-zoom-out {
          background-color: var(--color-primary-light);
          color: var(--color-primary);
          border-color: var(--color-primary);
        }

        a.leaflet-control-zoom-in:hover,
        a.leaflet-control-zoom-out:hover {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary-light);
        }
      `,document.head.appendChild(e)}async initializeMap(e){const{latitude:t,longitude:d,zoom:a,tiles:s,attribution:l,geojson:o}=this.dataset,r=[Number(t),Number(d)],n=e.map(this,{scrollWheelZoom:!1,dragging:!1,attributionControl:!0}).setView(r,Number(a));n.once("click",()=>{n.scrollWheelZoom.enable(),n.dragging.enable()}),e.tileLayer(s,{attribution:l}).addTo(n);const u=e.icon({iconUrl:"images/icons/marker.webp",iconSize:[25,36],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]});if(e.marker(r,{icon:u}).addTo(n).bindPopup("Aquopolis Villanueva de la Cañada"),!o)return;JSON.parse(o).forEach(({data:h,color:m})=>{e.geoJSON(h,{style:{color:m,weight:5,opacity:.65}}).addTo(n)})}}window.customElements.define("leaflet-map",v);
