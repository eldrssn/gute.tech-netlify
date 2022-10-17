const MetrikScript = () => (
  <>
    <script
      dangerouslySetInnerHTML={{
        __html: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
          (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              `,
      }}
    />
  </>
);

const sendMetrik = (
  type: string,
  value: string | undefined,
  metricID: number | undefined,
) => {
  if (!value || !metricID) {
    return;
  }

  window.ym(metricID, type, value);
};

export { sendMetrik, MetrikScript };
