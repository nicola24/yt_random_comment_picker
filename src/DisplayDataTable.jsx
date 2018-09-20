import React from 'react';
import PropTypes from 'prop-types';

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import moment from 'moment';

const styles = {
  tableHead: {
    fontSize: 12,
  },
  tableRow: {
    fontSize: 11,
  },
  tableButton: {
    fontSize: 11,
    color: 'black',
    fontWeight: 'bold',
  },
};

const DisplayDataTable = ({
  tableData,
  handleClickSort,
  arrow,
  serviceType,
}) => (
  <div>
    {/* <div>
      <p className="h6">Filter</p>
      <br />
      <form>
        Filter By Service Req No
        <br />
        <input type="text" />
        <br />
        <br />
        Filter BY SR Type
        <br />
        <select>
          <option disabled selected value> -- </option>
          {serviceType.map(x => (
            <option value={x} key={x}>
              {x}
            </option>
          ))}
          <option>All turbines</option>
        </select>
        <br />
        <br />
        Search Service Description
        <br />
        <input type="text" />
        <br />
        <br />
        Select Date Range
        <br />
        <input type="date" />
        <input type="date" />
        <br />
        <br />
        <input type="submit" value="Filter" />
        <input type="submit" value="Clear" />
        <br />
        <br />
      </form>
    </div> */}
    <div className="container-fluid">
      <div className="row justify-content-between">
        <div className="col-auto">
          <p className="h6 p-3">Maintenance Table</p>
        </div>
        <div className="col-auto align-self-center">
          <ReactHTMLTableToExcel
            className="btn btn-outline-dark btn-sm"
            table="table"
            filename="ensemble_energy_data"
            sheet="ensemble_energy_data"
            buttonText="Export to xls"
          />
        </div>
      </div>
    </div>

    <div className="table-responsive">
      <table className="table table-striped table-sm table-hover" id="table">
        <thead>
          <tr>
            <th scope="col" style={styles.tableHead}>Asset</th>
            <th scope="col">
              <button onClick={handleClickSort} type="button" value="device" className="btn btn-link btn-sm" style={styles.tableButton}>
                {`Device ${arrow}`}
              </button>
            </th>
            <th scope="col">
              <button onClick={handleClickSort} type="button" value="sreqn" className="btn btn-link btn-sm" style={styles.tableButton}>
                {`Service Req No ${arrow}`}
              </button>
            </th>
            <th scope="col" style={styles.tableHead}>Service Description</th>
            <th scope="col">
              <button onClick={handleClickSort} type="button" value="start" className="btn btn-link btn-sm" style={styles.tableButton}>
                {`Start Time ${arrow}`}
              </button>
            </th>
            <th scope="col">
              <button onClick={handleClickSort} type="button" value="end" className="btn btn-link btn-sm" style={styles.tableButton}>
                {`End Time ${arrow}`}
              </button>
            </th>
            <th scope="col">
              <button onClick={handleClickSort} type="button" value="duration" className="btn btn-link btn-sm" style={styles.tableButton}>
                {`Duration (hrs) ${arrow}`}
              </button>
            </th>
            <th scope="col" style={styles.tableHead}>SR Type</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map(x => (
            <tr key={x.pk}>
              <td style={styles.tableRow}>{x.windfarm_name}</td>
              <td style={styles.tableRow}>{x.turbine_name}</td>
              <td style={styles.tableRow}>{x.service_req_number}</td>
              <td style={styles.tableRow}>{x.service_req_description}</td>
              <td style={styles.tableRow}>{moment.utc(x.start_date).local().format('YYYY-MM-DD hh:mm A')}</td>
              <td style={styles.tableRow}>{moment.utc(x.end_date).local().format('YYYY-MM-DD hh:mm A')}</td>
              <td style={styles.tableRow}>{x.duration_mins}</td>
              <td style={styles.tableRow}>{x.sr_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
);

DisplayDataTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  serviceType: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleClickSort: PropTypes.func.isRequired,
  arrow: PropTypes.string.isRequired,
};

export default DisplayDataTable;
