const callPage = (pageName: string): Promise<string> => {
  return fetch(`pages/${pageName}.html`).then((resp) => resp.text());
};

const renderPage = (pageName: string) => {
  callPage(pageName).then((html) => {
    const rootElem = document.getElementById("root") as HTMLElement;
    rootElem.innerHTML = html;

    const formElem = document.getElementById("form-start") as HTMLFormElement;
    formElem.addEventListener("submit", function (event): void {
      event.preventDefault(); // se não começa do zero, ao refrescar a pagina

      const inputElem = document.getElementById(
        "input-name"
      ) as HTMLInputElement;
      const inputValue: string = inputElem.value;

      if (inputValue === "") {
        alert("Please fill in the form."); //https://www.quora.com/How-do-I-make-a-page-change-with-JavaScript-once-a-form-has-been-submitted
      } else {
        localStorage.setItem("name", inputValue);
        document.getElementsByTagName("body")[0].style.backgroundColor =
          "white";

        onsubmit = (event) => {};
        renderPage("quiz"); //window.location.href = "quiz.html"; renderiza/ recarrega dentro dapagina atual
      }
    });
  });
};

renderPage("start"); // trocar pagina

/* fetch("pages/start.html")
  .then((resp) => resp.text())
  .then((html) => 
    const rootElem = document.getElementById("root") as HTMLElement;
    rootElem.innerHTML = html;
  }); //npm run dev, fetch com as 3 paginas
 */

//---------TAREFA 2 - NOME DO UTILIZADOR E GUARADR NO LOCAL STORAGE-------- CONCLUIDA
// consultei exercico da to do list:
/*const formElem = document.getElementById("form");
  formElem.addEventListener("submit", function (event) {
  event.preventDefault();
  const inputElem = document.getElementById("input-name");
  const inputValue = inputElem.value; 
  inputElem.value = ""; */

// consultei https://www.tutorialspoint.com/how-to-work-with-form-elements-in-typescript
// consultei https://www.w3schools.com/jsref/prop_win_localstorage.asp

// ---------TAREFA 3 / Quando clicar no botão começar, renderizar a página de quiz --------
