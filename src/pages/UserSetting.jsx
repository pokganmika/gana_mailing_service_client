import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import moment from "moment";
import MaterialTable from "material-table";

import config from "../config";
const { SERVER_URL } = config();

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
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${SERVER_URL}/subscribe`);
      // .then(res => console.log(res))
      // .catch(err => console.log(err));
      setState({ ...state, data: result.data });
    };
    fetchData();
  }, []);

  /**
   * TODO: DB issue
   * data.created_at => unix time check
   * data.subscrived => bool value -> num value
   */
  const addData = async data => {
    console.log("UserSetting::addData::check -> ", data);
    // if (!data.email) {
    // } else {
    //   if (!data.type || !data.created_at) {
    //     if (!data.type) {
    //       data.type = "email";
    //     }
    //     if (!data.created_at) {
    //       // data.created_at = moment()
    //       //   .format()
    //       //   .slice(0, 10);
    //       data.created_at = new Date().getTime();
    //     }
    //     await axios.post(`${SERVER_URL}/subscribe/add`, data);
    //   } else {
    //     await axios.post(`${SERVER_URL}/subscribe/add`, data);
    //   }
    // }
    data.type = "email";
    data.created_at = new Date().getTime();
    if (data.subscribed === true) {
      data.subscribed = 1;
    } else {
      data.subscribed = 0;
    }
    await axios.post(`${SERVER_URL}/subscribe/add`, data);
  };

  const deleteData = async data => {
    console.log("::UserSetting::deleteData::check -> ", data);
    await axios.post(`${SERVER_URL}/subscribe/delete`, data);
  };

  const updateData = async data => {
    console.log("::UserSetting::updateData::check -> ", data);
    if (data.subscribed === true) {
      data.subscribed = 1;
    } else {
      data.subscribed = 0;
    }
    await axios.post(`${SERVER_URL}/subscribe/update`, data);
  };

  console.log("::UserSetting::data:: -> ", state.data);
  return (
    <UserSettingWrapper>
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
    </UserSettingWrapper>
  );
}

const UserSettingWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1260px;
`;
