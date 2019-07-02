export const selector = ["segment", "link"];

export const SendLaterInitState = {
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

export const timeTable = {
  month: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  day: [],
  hour: [],
  minute: [],
  second: [],
};

for (let i = 1; i < 32; i++) {
  timeTable.day.push(i.toString());
}

for (let i = 0; i < 23; i++) {
  timeTable.hour.push(i.toString());
}

for (let i = 0; i < 60; i++) {
  timeTable.minute.push(i.toString());
}

for (let i = 0; i < 60; i++) {
  timeTable.second.push(i.toString());
}
