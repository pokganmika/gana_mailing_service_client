// export const selector = ["email", "segment", "link"];
export const selector = ["segment", "link"];

export const TestMailInitState = {
  field: {
    email: "",
    emailTitle: "",
    mainTitle: "",
    detailTitleEng: "",
    textEng: "",
    textEngOp: "",
    detailTitleKor: "",
    textKor: "",
    textKorOp: "",
    infoMail: true,
    link: {
      linkETitle: "",
      linkEUrl: "",
      linkKTitle: "",
      linkKUrl: "",
      fSegETitle: "",
      fSegEUrl: "",
      sSegETitle: "",
      sSegEUrl: "",
      fSegKTitle: "",
      fSegKUrl: "",
      sSegKTitle: "",
      sSegKUrl: "",
    },
    // linkEng: {
    //   email: [],
    //   segment: [],
    //   link: [],
    // },
    // linkKor: {
    //   email: [],
    //   segment: [],
    //   link: [],
    // },
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
