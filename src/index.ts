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
                  0;
                  btn.textContent = options;
                  btn.addEventListener("click", function clickHandler() {
                    btn.style.backgroundColor = "green";
                    const isCorrect = index === firstQuestion.correct;

                    // btn.removeEventListener("click", clickHandler); nao funciona porque é um loop, tenho e usar o break?
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

                        // Tarefa 8 -  carrsgar local storage (ok), encontrar nome utilizador(ok), contar a vvezes que ganhou(ok) e organnizar segundo o valor maior e depois, limpar os nomes que estoa e representar or ordem no conatiner, os tres primerios podium restantes se existirem remaining
                        // const leaderboard = () => {

                        //capresnetar valores
                        let removeText = () => {
                          const allDivs =
                            document.querySelectorAll(".container div");
                          allDivs.forEach((div) => {
                            div.childNodes.forEach((child) => {
                              if (child.nodeType === Node.TEXT_NODE) {
                                child.textContent = "";
                              }
                            });
                          });
                          const spans = document.getElementsByTagName("span");
                          for (const span of spans) {
                            span.textContent = "";
                          }
                        };
                        removeText();

                        let score = () => {
                          const getValue = localStorage.getItem(
                            "userAnswer"
                          ) as string;
                          const userName = localStorage.getItem(
                            "name"
                          ) as string;
                          const userAnswer = JSON.parse(
                            localStorage.getItem("userAnswer") || "null"
                          ) as number | string;
                          console.log(userName, userAnswer);

                          let userScores: number = parseInt(
                            localStorage.getItem("userScores") || "0",
                            10
                          );

                          if (isNaN(userScores)) {
                            userScores = 0;
                          }

                          if (userAnswer !== null) {
                            userScores += userAnswer ? 1 : 0; // Increment if the answer is correct
                          } else {
                            userScores = Math.max(0, userScores - 1);
                          }

                          localStorage.setItem(
                            "userScores",
                            userScores.toString()
                          );
                          console.log(userName, userScores);
                        };

                        let leaderboard = () => {
                          const podiumContainer =
                            document.querySelector(".podium-container");
                          const remainingList =
                            document.querySelector(".remaining-list");

                          let finalScores: { name: string; score: number }[] =
                            JSON.parse(
                              localStorage.getItem("userScores") || "[]"
                            );

                          console.log(finalScores);
                        };

                        score();
                        leaderboard();
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
renderPage("start");

// trocar pagina

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
// Tarefa 7  Inserir resultados no leaderboard
//https://bobbyhadz.com/blog/typescript-jump-target-cannot-cross-function-boundary
//https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_storage_getitem
//https://jsfiddle.net/fgybyem2/15/
//https://leancloud.github.io/javascript-sdk/docs/leaderboard.js.html
//https://greasyfork.org/en/scripts/478317-%E6%B5%A9%E9%B2%B8%E8%80%83%E8%AF%95%E5%8A%A9%E6%89%8B/code
//https://dev.to/sanderdebr/mastering-the-javascript-reduce-method-2foj
//https://forum.freecodecamp.org/t/i-dont-really-understand-what-the-reduce-function-is-doing-in-this-code/500407
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR

//https://www.w3schools.com/js/js_loop_for.asp
