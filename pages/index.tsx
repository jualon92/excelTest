import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { LoadingButton } from "@mui/lab";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { ChangeEvent, useState } from "react";
import { Persona } from "../utils/interfaces";
import { PersonasSchemaValidation } from "../utils/validation";
import useNotification from "../lib/useSnackbar";
import { Inter } from "next/font/google";
import { buildExcelPersonas, buildNormalizedExcel } from "../utils/xlsx";
import Divider from '@mui/material/Divider';
//@ts-ignore
import * as XLSX from "xlsx-js-style";
import { Typography, Box } from "@mui/material";
import cellImage from "../public/assets/cell_format.png";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [msg, sendNotification] = useNotification();

  const getJSONFromSheet = (e: ProgressEvent<FileReader>): Persona[] => {
    const bufferArray = e?.target?.result;
    const wb = XLSX.read(bufferArray, { type: "buffer" });
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];

    return XLSX.utils.sheet_to_json(ws);
  };

  const readExcel = async (
    e: ChangeEvent<HTMLInputElement>,
    buildFunction: {
      (rawData: Persona[]): void;
      (rawData: Persona[]): void;
      (arg0: Persona[]): void;
    }
  ) => {
    //init file reader
    const fileReader = new FileReader();
    const targetFile = (e.target as HTMLInputElement)?.files?.[0];
    if (targetFile) {
      fileReader.readAsArrayBuffer(targetFile);
    }

    fileReader.onload = async (e) => {
      const rawData: Persona[] = getJSONFromSheet(e);
      try {
        await PersonasSchemaValidation.validate(rawData);
        buildFunction(rawData);

        sendNotification({
          msg: `archivo descargado `,
          variant: "success",
        });
      } catch (err) {
        sendNotification({
          msg: `formato de archivo incompatible.`,
          variant: "error",
        });
      }
    };
  };

  return (
    <>
      <Head>
        <title>Excel</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Box>
          <Typography variant="h3" mb={1.5}>
            Sheet Schema
          </Typography>

          <Image
            src={cellImage}
            alt="excel debe contener columnas id, nombre, apellido y monto"
          />
        </Box>
<Box>  
        <Typography variant="h4" mb={0.5}>
          Goals
        </Typography>

        <ul>
          <li>Extract elements appearing more than once </li>
          <li>Extract elements without an id</li>
          <li>
            {" "}
            Show  elements appearing more than once, taking into
            account: element.amount = total sum of amounts between elements
            sharing the same id
          </li>
          <li>
            Add all elements with an empty id field to a newly created sheet. Style respective
            cells as red.{" "}
          </li>
        </ul>
        </Box>
        <LoadingButton
          sx={{
            minHeight: "51px",
            border: "1px solid transparent",
          }}
          loading={loading}
          loadingPosition="start"
          startIcon={<CloudUploadIcon />}
          variant="contained"
          component="label"
        >
          GET EXCEL FILE
          <input
            onChange={(e) => readExcel(e, buildExcelPersonas)}
            hidden
            accept=".xlsx, .xls"
            multiple
            type="file"
          />
        </LoadingButton>
 
          <Typography variant="h3" gutterBottom >
            Extra
          </Typography>
        <Box>
          <Typography variant="h4" mb={1.5}>
            Personal take:
          </Typography>

          <Typography variant="h5" mb={0.5}>
            Management Requires
          </Typography>
          <ul>
            <li>making sure users wont forget adding the id field</li>
            <li>
              if the same person is added more than once, sum their amount
              shared between elements with the same id
            </li>
          </ul>

          <Typography variant="h5" mb={0.5} mt={1.5}>
            Steps
          </Typography>
          <ul>
            <li>Show in sheet all the valid elements</li>
            <li>
              Repeated elements should show only once, their amount is the total
              sum between elements sharing the same id
            </li>
            <li>
              Elements with empty id should show in red, as a visual hint
              (warning)
            </li>
          </ul>
        </Box>

        <LoadingButton
          sx={{
            minHeight: "51px",
            border: "1px solid transparent",
          }}
          loading={loading}
          loadingPosition="start"
          startIcon={<CloudUploadIcon />}
          variant="contained"
          component="label"
        >
          GET NORMALIZED EXCEL FILE
          <input
            onChange={(e) => readExcel(e, buildNormalizedExcel)}
            hidden
            accept=".xlsx"
            multiple
            type="file"
          />
        </LoadingButton>
      </main>
    </>
  );
}
