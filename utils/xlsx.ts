import * as XLSX from "xlsx-js-style";
import { Persona } from "./interfaces";

import _ from "lodash";

const getDuplicatesArray = (rawData: Persona[]) => {
  return _(rawData)
    .filter((i) => !isNaN(i.id))
    .groupBy("id")
    .filter((o) => o.length > 1) // remove groups that have less than two members
    .map((x) => ({
      id: x[0].id,
      first_name: x[0].first_name,
      last_name: x[0].last_name,
      amount: _.sumBy(x, (x) => x.amount),
    }))
    .value();
};

const paintNonIDCells = (
  ws: XLSX.WorkSheet,
  wb: XLSX.WorkBook,
  color: string,
  arrLength: number
) => {
  let i;
  for (i = 2; i <= arrLength + 1; i++) {
    //A2 as starting point
    if (wb.Sheets["Sheet1"]["A" + i] == undefined) {
      wb.Sheets["Sheet1"]["A" + i] = {
        t: "s",
        v: "",
        s: { fill: { fgColor: { rgb: color } } },
      };
      wb.Sheets["Sheet1"]["B" + i].s = {
        fill: { fgColor: { rgb: color } },
      };
      wb.Sheets["Sheet1"]["C" + i].s = {
        fill: { fgColor: { rgb: color } },
      };
      wb.Sheets["Sheet1"]["D" + i].s = {
        fill: { fgColor: { rgb: color } },
      };
    }
  }
};


const getExcelBody = (rawData: Persona[]) => {
  const duplicatesArray = getDuplicatesArray(rawData);
  const noIDFieldArray = rawData.filter((e) => e.id === undefined);
  return duplicatesArray.concat(noIDFieldArray);
};

export const buildExcelPersonas = (rawData: Persona[]) => {
  const Heading = [["id", "first_name", "last_name", "amount"]];
  const arrPersonas = getExcelBody(rawData);
  const wb = XLSX.utils.book_new();

  const ws = XLSX.utils.json_to_sheet([]);
  XLSX.utils.sheet_add_aoa(ws, Heading);
  XLSX.utils.sheet_add_json(ws, arrPersonas, {
    origin: "A2",
    skipHeader: true,
  });

  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  paintNonIDCells(ws, wb, "C0504D", arrPersonas.length);

  XLSX.writeFile(wb, "MOCK_DATA_BDO_FINAL.xlsx");
};

 