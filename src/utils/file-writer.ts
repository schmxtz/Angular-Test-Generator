import * as fs from "fs";

export function writeFile(filePath: string, content: string) {
  // Remove the .ts from end of file, don't use replace as to avoid mistake
  // when file is sth like: ...component.tsuper.ts -> would replace the first .ts occurance
  const testFilePath = filePath.slice(0, -3) + ".spec.ts";
  if (fs.existsSync(testFilePath)) {
    fs.writeFileSync(testFilePath + "_2.ts", content, "utf-8");
    return testFilePath + "_2.ts";
  }
  fs.writeFileSync(testFilePath, content, "utf-8");
  return testFilePath;
}
