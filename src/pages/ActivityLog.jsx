import React from "react";
import axios from "axios";
import { Table, Input, Button, Icon } from "antd";
import Highlighter from "react-highlight-words";

class ActivityLog extends React.Component {
  state = {
    searchText: "",
    allLog: [],
  };

  async componentDidMount() {
    const result = await axios.get(`http://192.168.0.114/log`);
    this.getData(result.data);
  }

  getData = arr => {
    this.setState({ ...this.state, allLog: arr });
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ ...this.state, searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ ...this.state, searchText: "" });
  };

  render() {
    console.log("::actLog::data::check:: ---> : ", this.state.allLog);
    const columns = [
      {
        title: "Operation Name",
        dataIndex: "operName",
        key: "operName",
        width: "30%",
        ...this.getColumnSearchProps("operName"),
      },
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        // width: "20%",
        ...this.getColumnSearchProps("category"),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        ...this.getColumnSearchProps("status"),
      },
      {
        title: "Event Initiated By",
        dataIndex: "eventInitBy",
        key: "eventInitBy",
        ...this.getColumnSearchProps("eventInitBy"),
      },
      {
        title: "Target",
        dataIndex: "target",
        key: "target",
        ...this.getColumnSearchProps("target"),
      },
      {
        title: "Created At",
        dataIndex: "time",
        key: "time",
        ...this.getColumnSearchProps("time"),
      },
    ];
    return (
      <div
        style={{
          width: "90%",
          height: "100%",
        }}
      >
        <Table columns={columns} dataSource={this.state.allLog} />
        {/* <Table columns={columns} dataSource={data} /> */}
      </div>
    );
  }
}

export default ActivityLog;
