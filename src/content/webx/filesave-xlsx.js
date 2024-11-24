import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { NumberFormat, numc } from "../../services/srvc-utilities";

export const XLSXFileDownload = (fileData, fileName) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const file = Array.from(fileData, (x) => {
    return {
      created: new Date(x?.created).toLocaleString(),
      user: x?.user?.name,
      memo: x?.memo,
      amount: NumberFormat(x?.amount?.number / 1000000, "w", "2").toString(),
      mode: x?.mode,
      status: x?.status, //reference: x.item //, format: x.meta.format,
    };
  });

  // rename headers
  const headers = {
    created: "Date",
    user: "Name",
    memo: "Comments",
    amount: "Amount",
    mode: "Cr/Db",
    status: "Status",
    format: "Type",
    reference: "Reference ID",
  };
  file.unshift(headers);

  const ws = XLSX.utils.json_to_sheet(file, {
    header: [
      "created",
      "user",
      "memo",
      "amount",
      "mode",
      "status",
      "format",
      "reference",
    ],
    skipHeader: true,
    origin: "A1",
  });

  const wb = { Sheets: { statement: ws }, SheetNames: ["statement"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });

  FileSaver.saveAs(data, fileName + fileExtension);
};
