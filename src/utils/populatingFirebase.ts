import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { AchievementProps, FigureProps, Section } from "../types";


async function createSection() {
  // const xpTypes = ["ship-wheel", "sword-cross", "brain"];
  const body: Partial<Section> = {
    xpType: 2,
    answers: [],
    level: "EASY",
    answeredBy: [],
    experience: 100,
    segment: "doubts",
    createdAt: Timestamp.fromDate(new Date()),
    updatedAt: Timestamp.fromDate(new Date()),
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

  await addDoc(collection(db, "sections"), body)
    .then(() => alert("Sessão de perguntas Criada com Sucesso!"))
    .catch(() => alert("Deu error!"));
}

async function createAchievement() {

  const body: Partial<AchievementProps> = {
    name: "Titã",
    image: "https://humulos.com/digimon/images/art/terrier.jpg",
    description: "Alcance o nível 30.",
  };

  await addDoc(collection(db, "achievements"), body)
    .then(r => {
      console.warn(r.id);
      alert("CONQUISTA CRIADA");

    })
    .catch(() => alert("DEU ERRO"));
}

async function createFigure() {

  const body: Partial<FigureProps> = {
    name: "C9",
    code: "C9",
    image: "https://humulos.com/digimon/images/dot/vbdm/grey_b.gif",
  };

  await addDoc(collection(db, "figures"), body)
    .then(() => alert("CONQUISTA CRIADA"))
    .catch(() => alert("DEU ERRO"));
}




export {
  createSection, createAchievement, createFigure,
};
