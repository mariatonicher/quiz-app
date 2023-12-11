const renderPage = async (pageName: string): Promise<void> => {
  const html = await fetch(`pages/${pageName}.html`).then((resp) =>
    resp.text()
  );

  const rootElem = document.getElementById("root") as HTMLElement;
  rootElem.innerHTML = html;
};

renderPage("start"); // trocar pagina

/* fetch("pages/start.html")
  .then((resp) => resp.text())
  .then((html) => {
    const rootElem = document.getElementById("root") as HTMLElement;
    rootElem.innerHTML = html;
  }); //npm run dev, fetch com as 3 paginas
 */
