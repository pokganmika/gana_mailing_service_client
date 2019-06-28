export const selector = ["segment", "link"];

export const SendMailInitState = {
  field: {
    emailTitle: "",
    mainTitle: "",
    detailTitleEng: "",
    textEng: "",
    textEngOp: "",
    detailTitleKor: "",
    textKor: "",
    textKorOp: "",
    infoMail: true,
    linkEng: {
      segment: [],
      link: [],
    },
    linkKor: {
      segment: [],
      link: [],
    },
  },
  validate: {
    emailValidated: false,
    emailTitleValidated: false,
    mainTitleValidated: false,
    detailTitleEngValidated: false,
    textEngValidated: false,
    detailTitleKorValidated: false,
    textKorValidated: false,
  },
  temp: {
    selectEng: selector[0],
    selectKor: selector[0],
    linkTitleEng: "",
    linkTitleKor: "",
    linkUrlEng: "",
    linkUrlKor: "",
  },
};
