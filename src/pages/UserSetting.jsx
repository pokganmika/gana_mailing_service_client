import React, { useState, useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";

export default function MaterialTableDemo() {
  const [state, setState] = useState({
    columns: [
      { title: "Email", field: "email" },
      { title: "Type", field: "type" },
      { title: "Subscribed", field: "subscribed", type: "boolean" },
      {
        title: "Created",
        field: "created_at",
      },
    ],
    data: [
      // {
      //   email: "gana@gananetworks.com",
      //   type: "email",
      //   subscribed: true,
      //   created_at: "2019-06-20",
      // },
      // {
      //   email: "ganagana@gmail.com",
      //   type: "email",
      //   subscribed: false,
      //   created_at: "2019-05-05",
      // },
    ],
    // columns: [
    //   { title: "Name", field: "name" },
    //   { title: "Surname", field: "surname" },
    //   { title: "Birth Year", field: "birthYear", type: "numeric" },
    //   {
    //     title: "Birth Place",
    //     field: "birthCity",
    //     lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
    //   },
    // ],
    // data: [
    //   { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
    //   {
    //     name: "Zerya Betül",
    //     surname: "Baran",
    //     birthYear: 2017,
    //     birthCity: 34,
    //   },
    // ],
  });

  const target = "http://192.168.0.114";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${target}/subscribe`);
      // const result = await axios.get("http://192.168.0.114/subscribe");
      // .then(res => console.log(res))
      // .catch(err => console.log(err));
      console.log("fetchData : ", result.data);
      console.log("fetchData Arr : ", result.data.Items);
      setState({ ...state, data: result.data.Items });
    };
    fetchData();
  }, []);

  const addData = async data => {
    console.log("UserSetting::addData::check -> ", data);
    await axios.post(`${target}/subscribe/add`, data);
  };

  const deleteData = async data => {
    console.log("UserSetting::deleteData::check -> ", data);
    await axios.post(`${target}/subscribe/delete`, data);
  };

  const updateData = async data => {
    console.log("UserSetting::updateData::check -> ", data);
    await axios.post(`${target}/subscribe/update`, data);
  };

  console.log("UserSetting::data:: -> ", state.data);
  return (
    <MaterialTable
      title="Subscriber Table"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.push(newData);
              console.log("tableData::addData::check -> ", newData);
              addData(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data[data.indexOf(oldData)] = newData;
              console.log(
                "tableData::updateData::check (newData / oldData) -> ",
                newData,
                oldData,
              );
              updateData(newData);
              setState({ ...state, data });
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              const data = [...state.data];
              data.splice(data.indexOf(oldData), 1);
              console.log("tableData::deleteData::check -> ", oldData);
              deleteData({ email: oldData.email });
              setState({ ...state, data });
            }, 600);
          }),
      }}
    />
  );
}
