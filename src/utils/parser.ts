import * as fs from "fs";
import { ModuleRegex, TypescriptRegex } from "./regex";

export function parseModuleInformation(filePath: string) {
  const moduleFilePath = filePath.replace(/\.\w*\.ts/, ".module.ts");
  try {
    const content = fs.readFileSync(moduleFilePath, "utf-8") ?? "";
    const modules =
      content
        .match(ModuleRegex.moduleImports)?.[0]
        .match(ModuleRegex.moduleSingle) ?? [];
    return { modules };
  } catch (error) {
    return { modules: [] };
  }
}

export function parseSutInformation(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, "utf-8") ?? "";
    const dependencies =
      content
        .match(TypescriptRegex.sutConstructor)[0]
        .match(TypescriptRegex.sutDependencyRegex) ?? [];
    const className = content.match(TypescriptRegex.className)?.[0] ?? "";
    const functions = content.match(TypescriptRegex.sutFunctionNameRegex) ?? [];
    return { dependencies, functions, className };
  } catch (error) {
    return { dependencies: [], functions: [], className: "" };
  }
}
