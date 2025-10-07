function renderWithTemplate(template, container) {
  container.innerHTML = template;
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}   

export async function loadMainTemplates() {
  const headerTemplate = await loadTemplate("partials/header.html");
  const headerElement = document.querySelector("header");
  renderWithTemplate(headerTemplate, headerElement);

  const footerTemplate = await loadTemplate("partials/footer.html");
  const footerElement = document.querySelector("footer");
  renderWithTemplate(footerTemplate,footerElement);
}