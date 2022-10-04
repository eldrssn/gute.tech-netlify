/* eslint-disable @next/next/no-img-element */

const METRIK_ID = 88162525;

const MetrikScript = () => (
  <>
    <script
      dangerouslySetInnerHTML={{
        __html: `
                (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
      
                ym(${METRIK_ID}, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true
                });
              `,
      }}
    />
    <noscript>
      <div>
        <img
          src={`https://mc.yandex.ru/watch/${METRIK_ID}`}
          style={{ position: 'absolute', left: '-9999px' }}
          alt=''
        />
      </div>
    </noscript>
  </>
);

const sendMetrik = (type: string, value: string) => {
  window.ym(METRIK_ID, type, value);
};

export { sendMetrik, MetrikScript };