import { parseModuleInformation, parseSutInformation } from "./parser";

export function generateCode(filePath: string): string {
  if (filePath.endsWith("component.ts")) {
    return generateComponentCode(filePath);
  } else if (filePath.endsWith("service.ts")) {
    return generateServiceCode(filePath);
  }
}

function generateComponentCode(filePath: string): string {
  const { modules } = parseModuleInformation(filePath);
  const { dependencies, functions, className } = parseSutInformation(filePath);
  let result = `describe('${className}', () => {
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [${className}],
                imports: [
                    ${modules.reduce(
                      (prev, next) =>
                        prev.concat(`MockModule(${next.trim()}),\n`),
                      ""
                    )}
                ],
                providers: [
                  ${dependencies.reduce(
                    (prev, next) =>
                      prev.concat(`MockProvider(${next.trim()}),`),
                    ""
                  )}
                ],
            }).compileComponents()
        })
    );

    ${functions.reduce(
      (prev, next) => prev.concat(`describe('${next.trim()}', () => {}); \n`),
      ""
    )}
});`;
  return result;
}

function generateServiceCode(filePath: string): string {
  const { dependencies, functions, className } = parseSutInformation(filePath);
  let result = `describe('${className}', () => {
    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                providers: [
                  ${dependencies.reduce(
                    (prev, next) =>
                      prev.concat(`MockProvider(${next.trim()}),`),
                    ""
                  )}
                ],
            })
        })
    );

    ${functions.reduce(
      (prev, next) => prev.concat(`describe('${next.trim()}', () => {}); \n`),
      ""
    )}
});`;
  return result;
}
