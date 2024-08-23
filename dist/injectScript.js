(function() {
    const script = document.createElement('script');
    script.textContent = `
      (function() {
        const zaraValue = window.zara ? JSON.stringify(window.zara) : null;
        window.postMessage({ type: 'FROM_PAGE', zaraValue: zaraValue }, '*');
      })();
    `;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
  })();
  