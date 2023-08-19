// attach static images to the document
(() => {
  const container = document.createElement('div');
  container.id = 'imgs';
  for (i = 0; i < files.length; i++){
    container.innerHTML = container.innerHTML + "<img src=\"" + "/" + files[i] + "\" id=\"" + files[i] + "\" />";
  }
  document.body.appendChild(container);
})();
