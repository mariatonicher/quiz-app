const callPage = async (pageName: string): Promise<string> => {
  const resp = await fetch(`pages/${pageName}.html`);
  return await resp.text(); //tech interagir com api de forma asynchron
};

function renderPage(pageName: string) {
  callPage(pageName).then((html) => {
    //.then, promise lidar com resolução
    //callback function
    const rootElem = document.getElementById("root") as HTMLElement;
    rootElem.innerHTML = html;

    const formElem = document.getElementById("form-start") as HTMLFormElement; //casting, forçando, para nao fazer o if
    console.log(formElem);
    // TEREFA 4
    formElem.addEventListener("submit", async function (event) {
      event.preventDefault(); // se não começa do zero, ao refrescar a pagina

      const inputElem = document.getElementById(
        "input-name"
      ) as HTMLInputElement;
      const inputValue: string = inputElem.value;
      if (inputValue === "") {
        alert("Please fill in the form.");
      } else {
        localStorage.setItem("name", inputValue);
        document.getElementsByTagName("body")[0].style.backgroundColor =
          "white";

        onsubmit = (event) => {};
        // TEREFA 5
        callPage("quiz").then((html) => {
          const rootElem = document.getElementById("root") as HTMLElement;
          rootElem.innerHTML = html;
          document.getElementsByTagName("body")[0].style.backgroundColor =
            "grey";

          // TEREFA 6
          interface quiz {
            questions: question[];
          }

          interface question {
            question: string;
            options: string[];
            correct: number;
          }

          fetch("questions.json")
            .then(async (response) => {
              if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
              }
              return await response.json();
            })
            .then((data) => {
              const questionContainer = document.querySelector(
                ".question-container"
              );

              if (questionContainer) {
                questionContainer.innerHTML = "";
                const firstQuestion = data.questions[0];
                questionContainer.innerHTML = firstQuestion.question;

                const btnList = document.querySelector(
                  ".btn-list"
                ) as HTMLElement;
                const btnOptions = document.querySelectorAll(
                  ".btn-answer"
                ) as NodeListOf<HTMLElement>;

                btnOptions.forEach((btn, index) => {
                  const options = firstQuestion.options[index];
                  btn.textContent = options;
                  btn.addEventListener("click", function clickHandler() {
                    btn.style.backgroundColor = "green";
                    const isCorrect = index === firstQuestion.correct;
                    // btn.removeEventListener("click", clickHandler); nao funciona porque é um loop
                    /* localStorage.setItem(
                      "userAnswer",
                      JSON.stringify(isCorrect)
                    ); */

                    const nextBtn = document.getElementById(
                      "next-btn"
                    ) as HTMLElement;
                    nextBtn.addEventListener("click", () => {
                      if (isCorrect) {
                        alert("Resposta correta");
                      } else {
                        alert("Resposta incorreta");
                      }
                      /*  localStorage.setItem(
                        "userAnswer",
                        JSON.stringify(isCorrect)
                      ); */
                      // Tarefa 7 -
                      callPage("leaderboard").then((html) => {
                        const rootElem = document.getElementById(
                          "root"
                        ) as HTMLElement;
                        rootElem.innerHTML = html;
                        document.getElementsByTagName(
                          "body"
                        )[0].style.backgroundColor = "grey";
                        localStorage.setItem(
                          "userAnswer",
                          JSON.stringify(isCorrect)
                        );
                      });
                    });
                  });
                });
              }
            })
            .catch((err) => {
              console.error(err);
            });
        });
      }
    });
  });
}
renderPage("start"); // trocar pagina

//Fazer o fetch do arquivo questions.json e renderizar a pergunta, 4 alternativas e a resposta correta
//---------TAREFA 3 - NOME DO UTILIZADOR E GUARADR NO LOCAL STORAGE-------- CONCLUIDA
// consultei https://www.tutorialspoint.com/how-to-work-with-form-elements-in-typescript
// consultei https://www.w3schools.com/jsref/prop_win_localstorage.asp
//https://www.quora.com/How-do-I-make-a-page-change-with-JavaScript-once-a-form-has-been-submitted
// ---------TAREFA 4 / Quando clicar no botão começar, renderizar a página de quiz --------
// TAREFA 6 - Fazer o fetch do arquivo questions.json e renderizar a pergunta, 4 alternativas e a resposta correta
//https://stackoverflow.com/questions/73310918/how-do-i-check-the-answer-of-a-clicked-button-to-see-if-it-matches-the-correct-a
//https://developer.mozilla.org/en-US/docs/Web/API/fetch
//https://stackoverflow.com/questions/68700561/using-local-storage-to-save-game-progress
//https://www.sitepoint.com/community/t/checking-answer-in-a-quiz/325000
//https://codereview.stackexchange.com/questions/119804/answer-checking-script
//https://www.educative.io/answers/how-to-ensure-an-event-listener-is-only-fired-once-in-javascript
