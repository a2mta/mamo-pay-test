let serverUrl = '';
let domainName = '';
const checkoutDiv = document.getElementById('mamo-checkout');
const consumerUrl = encodeURIComponent(window.location.href);
function getDomain(url) {
  const parts = url.split('/');
  if (url.startsWith('http://')) {
    return parts[0] + '//' + parts[2];
  } else if (url.startsWith('https://')) {
    return parts[0] + '//' + parts[2];
  } else {
    return null;
  }
}
function addIframeToWebsite() {
  serverUrl = checkoutDiv.getAttribute('data-src');
  domainName = getDomain(serverUrl);
  const iframe = document.createElement('iframe');
  iframe.src = `${serverUrl}?consumer=${consumerUrl}`;
  iframe.setAttribute('crossorigin', 'anonymous');
  iframe.setAttribute('id', 'iframe-mamo-checkout');
  iframe.setAttribute('allowTransparency', 'true');
  iframe.setAttribute('allow', 'payment');
  iframe.allowTransparency = 'true';
  iframe.style.backgroundColor = 'transparent';
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = '0';
  iframe.style.display = 'block';
  iframe.style.zIndex = 99999;
  checkoutDiv.appendChild(iframe);
  iframe.onload = handleIframeLoaded;
}
function handleIframeLoaded() {
  window.addEventListener('message', (event) => {
    const iframe = document.getElementById('iframe-mamo-checkout');
    if (event.origin !== domainName) {
      return;
    }
    if (event.data === 'closeIframe' || event.message === 'closeIframe') {
      iframe.style.display = 'none';
    }
    if (
      event.data === 'checkout-complete' ||
      event.message === 'checkout-complete'
    ) {
      iframe.style.display = 'none';
    }
    if (
      event.data === 'connectionEstablished' ||
      event.message === 'connectionEstablished'
    ) {
      console.log('connection establised');
    }
    if (event.data.type && event.data.type === 'confirmation_required') {
      iframe.style.display = 'none';
      window.location.replace(event.data.payload);
    }
  });
}
window.onload = () => {
  addIframeToWebsite();
};
