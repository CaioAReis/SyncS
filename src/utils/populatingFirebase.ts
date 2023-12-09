import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { Section } from "../types";


async function createSection() {

  // const xpTypes = ["ship-wheel", "sword-cross", "brain"];

  const body: Section = {
    xpType: 2,
    answers: [],
    level: "EASY",
    answeredBy: [],
    experience: 100,
    segment: "doubts",
    questions: [

      {
        type: "SUBJECTIVE",
        description: "O inglês é realmente importante para a área?",
      },

      {
        type: "OBJECTIVE",
        description: "Qual é o seu nível de satisfação atual com sua vida profissional?",
        options: [
          "Muito satisfeito(a)",
          "Satisfeito(a)",
          "Neutro(a)",
          "Insatisfeito(a)"
        ]
      },

    ],
  };

  await addDoc(collection(db, "sections"), body).then(() => alert("Sessão de perguntas Criada com Sucesso!"));
}





export {
  createSection,
};
