const questions = [
  {
    title: "¿Ya intentó dietas estrictas, ejercicios intensos y nada funcionó?",
    step: 1,
    answers: [
      {
        text: "Si",
        value: 1,
      },
      {
        text: "No",
        value: 2,
      },
    ],
  },
  {
    title: "¿Ya conoce el Proyecto CG, estudiada por varias universidades, que le ayudará a borrar 1kg diario de grasa?",
    step: 2,
    answers: [
      {
        text: "Sí, lo he visto antes",
        value: 1,
      },
      {
        text: "No, pero me interesa",
        value: 2,
      },
    ],
  },
  {
    title: "¡Hoy mismo! El Doc.Jhon le revelará su investigación en un video de 10 minutos, ¿Está dispuesta verlo hasta el final?",
    step: 3,
    answers: [
      {
        text: "Sí, me interesa",
        value: 1,
      },
      {
        text: "Nó podré, pero me interesa",
        value: 2,
      },
    ],
  },
];

// VARIABLES
let stepQuiz = 0;
let answersSelected = [null, null, null, null, null];

const onClickAnswer = (value) => {
  answersSelected[stepQuiz] = value;
  if (stepQuiz + 1 == questions.length) {
    const textContainer = document.getElementById("text-bottom-container");
    textContainer.classList.add("d-none");
    loadingResults();
    setTimeout(() => {
      fillResultsTest();
    }, 1500);
  }
  stepQuiz += 1;
  setTimeout(() => {
    fillQuizQuestions();
  }, 500);
};

const boxContainer = document.getElementById("quiz-container");
const functionMain = () => {
  console.log("init");
  fillQuizQuestions();
};

function onContinueBtn() {
  if (!answersSelected[stepQuiz]) {
    alert("Choose an option");
    return;
  }
  stepQuiz += 1;
  fillQuizQuestions();
}
function onFinishResults() {
  window.location.href = "https://jhonnutricionmoderna.com/resumen-2";
}
function onBackBtn() {
  stepQuiz -= 1;
  const newAnswers = answersSelected.map((item, index) =>
    index > stepQuiz ? null : item
  );
  answersSelected = newAnswers;
  fillQuizQuestions();
}

const fillQuizQuestions = () => {
  function iterateQuestions(answers) {
    let stringGenerated = "";

    for (let index = 0; index < answers.length; index++) {
      const element = answers[index];
      stringGenerated += `
      <button class="btn ripple mt-2 alert alert-secondary" onClick={onClickAnswer(${element.value})}>

      ${element.text}
      </button>`;
    }
    return stringGenerated;
  }

  boxContainer.innerHTML = `
    <div class="card p-4 container-result">
      <div class="progress">
        <div class="progress-bar progress-bar-animated bg-warning" role="progressbar" aria-valuenow="${
          (stepQuiz + 1) * 20
        }" aria-valuemin="0" aria-valuemax="100" style="width: ${
    (stepQuiz + 1) * 20
  }%; color: black"
  >${(stepQuiz + 1) * 20}%</div>
      </div>
      <h4 class="text-center mt-4">${questions[stepQuiz].title}</h4>
      ${iterateQuestions(questions[stepQuiz].answers)}
    </div>
  `;
};

const fillResultsTest = () => {
  boxContainer.innerHTML = `
    <div class="card p-4 container-result">
    <h4 class="text-center mt-4">
      ¡ENHORABUENA! Antes de ver la presentación del Dr.Jhon, donde revelará el "Proyecto CG" que derrite mucha grasa, descubierto en su último viaje al trópico. Tiene que estar desacuerdo con lo siguiente:
      </h4>
      <div class="mt-4">
        <div class="card p-4" style="background: black;">
          <p >
            <i class="fa fa-circle-check"></i>
            Mira la presentación hasta el final para descubrir cómo reavivar su lento metabolismo para que pueda sentirse feliz, saludable y llena de vida.
          </p>
          <p>
          <i class="fa fa-circle-check" ></i>
          Además, NO abuse de la información y los consejos que se proporcionarán. Este consejo solo debe utilizarse según las indicaciones.

          </p>
          <p>
          <i class="fa fa-circle-check" ></i>
          Esta presentación SOLO se pone a disposición de un grupo selecto de personas y se ELIMINARá si se somete a demasiada presión de la industria de la salud. Si no desea descubrir estos secretos de la industria, CIERRE ESTA VENTANA INMEDIATAMENTE para liberar su espacio para la siguiente mujer en la fila.
          </p>
        </div>
        <p class="text-center mt-2" >Si esta deacuerdo y desea ver la presentación completa del Dr.Jhon, dale clic al botón «Quiero ver la presentación completa»</p>
        <div class="container-btn" >
          <button onclick="onFinishResults()" ><i class="fa fa-hand-point-right" ></i> Quiero ver la presentación completa</button>
        </div>
      
        </div>
  `;
};
const loadingResults = () => {
  boxContainer.innerHTML = `
  <div class="card p-4 container-result">
  <div class="py-5 d-flex justify-content-center align-items-center flex-column">
  <div class="spinner-border text-light" role="status">
  <span class="sr-only">Loading...</span>
</div>
  <h5 class="mt-3">Validando sus respuestas...</h5>
</div>
  </div>
  `;
};

functionMain();
