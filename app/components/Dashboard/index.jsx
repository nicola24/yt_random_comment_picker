import React, { Component } from 'react';

import CostServiceType from '../CostServiceType';
import CumulativeCost from '../CumulativeCost';
import TopRepairsCost from '../TopRepairsCost';
import TopRepairsTime from '../TopRepairsTime';
import DisplayDataTable from '../DisplayDataTable';
import Header from '../Header';

import maintainenceData from '../../data/maintainence_data.json';

import {
  formatDataCostServiceType,
  formatDataCumulativeCost,
  formatDataTopRepairsCost,
  formatDataTopRepairsTime,
  filterTurbineName,
  sortByTurbineName,
  filterWindfarmName,
  filterServiceType,
} from '../../helper/helperFunctions';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: maintainenceData,
      newData: [],
      dataTable: [],
      dataCostServiceType: [],
      dataCumulativeCost: [],
      dataTopRepairsCost: [],
      dataTopRepairsTime: [],
      turbineList: [],
      windfarmList: [],
      serviceType: [],
      currTurbine: '',
      buttonClick: 'false',
      arrowDevice: '↓',
      arrowServ: '↓',
      arrowStart: '↓',
      arrowEnd: '↓',
      arrowDuration: '↓',
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateData = this.updateData.bind(this);
    this.handleClickSort = this.handleClickSort.bind(this);
  }

  componentDidMount() {
    const { data } = this.state;

    this.setState({
      dataCostServiceType: formatDataCostServiceType(data),
      dataCumulativeCost: formatDataCumulativeCost(data),
      dataTopRepairsCost: formatDataTopRepairsCost(data),
      dataTopRepairsTime: formatDataTopRepairsTime(data),
      turbineList: filterTurbineName(data),
      windfarmList: filterWindfarmName(data),
      serviceType: filterServiceType(data),
      dataTable: sortByTurbineName(data),
    });
  }

  updateData() {
    const { newData } = this.state;

    this.setState({
      dataCostServiceType: formatDataCostServiceType(newData),
      dataCumulativeCost: formatDataCumulativeCost(newData),
      dataTopRepairsCost: formatDataTopRepairsCost(newData),
      dataTopRepairsTime: formatDataTopRepairsTime(newData),
      dataTable: newData,
    });
  }

  handleChange(e) {
    const { data } = this.state;

    if (e.target.value === 'allTurbs') {
      this.setState({
        newData: data,
        currTurbine: '',
      }, () => this.updateData());
    } else {
      const newDataTurbine = data.filter(x => x.turbine_name === e.target.value);

      this.setState({
        newData: newDataTurbine,
        currTurbine: e.target.value,
      }, () => this.updateData());
    }
  }

  handleClickSort(e) {
    const { buttonClick, dataTable } = this.state;
    const { value } = e.target;

    this.setState(state => ({ buttonClick: !state.buttonClick }));

    if (!buttonClick) {
      if (value === 'device') { // device
        const newDataTable = dataTable.sort((a, b) => (
          Number(a.turbine_name.substring(3, 5)) - Number(b.turbine_name.substring(3, 5))
        ));
        this.setState({ dataTable: newDataTable, arrowDevice: '↓' });
      } else if (value === 'sreqn') { // service_req_number
        const newDataTable = dataTable.sort((a, b) => a.service_req_number - b.service_req_number);
        this.setState({ dataTable: newDataTable, arrowServ: '↓' });
      } else if (value === 'start') { // date start
        const newDataTable = dataTable.sort((a, b) => (
          Number(a.start_date.substring(0, 4)) - Number(b.start_date.substring(0, 4))
        ));
        this.setState({ dataTable: newDataTable, arrowStart: '↓' });
      } else if (value === 'end') { // date end
        const newDataTable = dataTable.sort((a, b) => (
          Number(a.end_date.substring(0, 4)) - Number(b.end_date.substring(0, 4))
        ));
        this.setState({ dataTable: newDataTable, arrowEnd: '↓' });
      } else if (value === 'duration') { // duration
        const newDataTable = dataTable.sort((a, b) => a.duration_mins - b.duration_mins);
        this.setState({ dataTable: newDataTable, arrowDuration: '↓' });
      }
    } else if (buttonClick) {
      if (value === 'device') { // device
        const newDataTable = dataTable.sort((a, b) => (
          Number(b.turbine_name.substring(3, 5)) - Number(a.turbine_name.substring(3, 5))
        ));
        this.setState({ dataTable: newDataTable, arrowDevice: '↑' });
      } else if (value === 'sreqn') { // service_req_number
        const newDataTable = dataTable.sort((a, b) => b.service_req_number - a.service_req_number);
        this.setState({ dataTable: newDataTable, arrowServ: '↑' });
      } else if (value === 'start') { // date start
        const newDataTable = dataTable.sort((a, b) => (
          Number(b.start_date.substring(0, 4)) - Number(a.start_date.substring(0, 4))
        ));
        this.setState({ dataTable: newDataTable, arrowStart: '↑' });
      } else if (value === 'end') { // date end
        const newDataTable = dataTable.sort((a, b) => (
          Number(b.end_date.substring(0, 4)) - Number(a.end_date.substring(0, 4))
        ));
        this.setState({ dataTable: newDataTable, arrowEnd: '↑' });
      } else if (value === 'duration') { // duration
        const newDataTable = dataTable.sort((a, b) => b.duration_mins - a.duration_mins);
        this.setState({ dataTable: newDataTable, arrowDuration: '↑' });
      }
    }
  }

  render() {
    const {
      dataCostServiceType,
      dataCumulativeCost,
      dataTopRepairsCost,
      dataTopRepairsTime,
      turbineList,
      currTurbine,
      dataTable,
      windfarmList,
      serviceType,
      arrowDevice,
      arrowServ,
      arrowStart,
      arrowEnd,
      arrowDuration,
    } = this.state;

    return (
      <div className="bg-light">
        <nav className="navbar fixed-top bg-light border-bottom">
          <Header
            turbineList={turbineList}
            handleChange={this.handleChange}
            windfarmList={windfarmList}
          />
        </nav>
        <div className="container-fluid">
          <div className="row mt-4 mb-5" />
          <div className="row justify-content-center">
            <div className="col-auto card m-1">
              <TopRepairsCost
                topCost={dataTopRepairsCost}
                turbineName={currTurbine}
              />
            </div>
            <div className="col-auto card m-1">
              <TopRepairsTime
                topTime={dataTopRepairsTime}
                turbineName={currTurbine}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-auto card m-1">
              <CumulativeCost
                costTrends={dataCumulativeCost}
                turbineName={currTurbine}
              />
            </div>
            <div className="col-auto card m-1">
              <CostServiceType
                sumOfExtendedAndLaborCost={dataCostServiceType}
                turbineName={currTurbine}
              />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-9 card m-1">
              <DisplayDataTable
                tableData={dataTable}
                handleClickSort={this.handleClickSort}
                arrowDevice={arrowDevice}
                arrowServ={arrowServ}
                arrowStart={arrowStart}
                arrowEnd={arrowEnd}
                arrowDuration={arrowDuration}
                serviceType={serviceType}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
