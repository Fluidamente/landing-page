import { readFile } from "fs/promises";
import path from "path";

export const EBOOK_FILENAME = "el_camino_consciente_del_duelo.pdf";

export function getEbookFilePath() {
  return path.join(process.cwd(), "public", "ebooks", EBOOK_FILENAME);
}

export async function readEbookFile() {
  return readFile(getEbookFilePath());
}
