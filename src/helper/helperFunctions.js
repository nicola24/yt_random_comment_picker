const moment = require('moment');

const formatDataCostServiceType = (arr) => {
  const newObj = {};
  const resultArr = [];

  arr.forEach((x) => {
    if (newObj[x.sr_type]) {
      newObj[x.sr_type] += x.extended_cost_$ + x.labour_cost_$;
    } else {
      newObj[x.sr_type] = x.extended_cost_$ + x.labour_cost_$;
    }
  });

  for (const key in newObj) {
    if ({}.hasOwnProperty.call(newObj, key)) {
      resultArr.push({
        sr_type: key,
        cost: Math.round(newObj[key] * 100) / 100,
      });
    }
  }

  return resultArr;
};

const formatDataCumulativeCost = (arr) => {
  const resultArr = [];
  const obj = {};

  arr.forEach((x) => {
    const prop = x.service_date;
    if (!obj[prop]) {
      obj[prop] = {
        extendedCost: 0,
        labourCost: 0,
      };
    }
  });

  for (const key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) {
      arr.forEach((x) => {
        if (x.service_date === key) {
          obj[key].extendedCost += x.extended_cost_$;
          obj[key].labourCost += x.labour_cost_$;
        }
      });
    }
  }

  for (const key in obj) {
    if ({}.hasOwnProperty.call(obj, key)) {
      resultArr.push({
        serviceDate: key,
        extendedCost: obj[key].extendedCost,
        labourCost: obj[key].labourCost,
      });
    }
  }

  const sortByDateArr = resultArr.sort((a, b) => moment(a.serviceDate).format('X') - moment(b.serviceDate).format('X'));

  const newArr = sortByDateArr.concat();

  for (let i = 1; i < sortByDateArr.length; i += 1) {
    newArr[i].extendedCost = Math.round(
      (newArr[i - 1].extendedCost + sortByDateArr[i].extendedCost) * 100,
    ) / 100;
    newArr[i].labourCost = Math.round(
      (newArr[i - 1].labourCost + sortByDateArr[i].labourCost) * 100,
    ) / 100;
    newArr[i].serviceDate = moment.utc(newArr[i].serviceDate).local().format('MMM-DD-YYYY');
  }

  return newArr;
};

const formatDataTopRepairsCost = (arr) => {
  const newObj = {};
  const resultArr = [];

  arr.forEach((x) => {
    if (newObj[x.service_req_description]) {
      newObj[x.service_req_description] += x.extended_cost_$ + x.labour_cost_$;
    } else {
      newObj[x.service_req_description] = x.extended_cost_$ + x.labour_cost_$;
    }
  });

  for (const key in newObj) {
    if ({}.hasOwnProperty.call(newObj, key)) {
      resultArr.push({
        serviceDesc: key,
        cost: Math.round(newObj[key] * 100) / 100,
      });
    }
  }

  return resultArr.sort((a, b) => b.cost - a.cost).slice(0, 10);
};

const formatDataTopRepairsTime = (arr) => {
  const newObj = {};
  const resultArr = [];

  arr.forEach((x) => {
    if (newObj[x.service_req_description]) {
      newObj[x.service_req_description] += x.duration_mins;
    } else {
      newObj[x.service_req_description] = x.duration_mins;
    }
  });

  for (const key in newObj) {
    if ({}.hasOwnProperty.call(newObj, key)) {
      resultArr.push({
        serviceDesc: key,
        duration: newObj[key],
      });
    }
  }

  return resultArr.sort((a, b) => b.duration - a.duration).slice(0, 10);
};

const filterTurbineName = (arr) => {
  const result = [];
  arr.map(x => result.push(x.turbine_name));
  return Array.from(new Set(result)).sort((a, b) => a.substring(3, 5) - b.substring(3, 5));
};

const filterWindfarmName = (arr) => {
  const result = [];
  arr.map(x => result.push(x.windfarm_name));
  return Array.from(new Set(result)).sort((a, b) => a.substring(9, 10) - b.substring(9, 10));
};

const sortByTurbineName = arr => arr.sort((a, b) => (
  a.turbine_name.substring(3, 5) - b.turbine_name.substring(3, 5)));

const filterServiceType = (arr) => {
  const result = [];
  arr.map(x => result.push(x.sr_type));
  return Array.from(new Set(result));
};

module.exports = {
  formatDataCostServiceType,
  formatDataCumulativeCost,
  formatDataTopRepairsCost,
  formatDataTopRepairsTime,
  filterTurbineName,
  filterWindfarmName,
  sortByTurbineName,
  filterServiceType,
};
