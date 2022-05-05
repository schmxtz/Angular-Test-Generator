export abstract class TypescriptRegex {
  static readonly sutConstructor: RegExp = /(?<=constructor\().*?(?=\)\/?)/s;
  static readonly sutDependencyRegex: RegExp = /(?<=\:\s)(.*?)(?=,|\s)/g;
  static readonly sutFunctionNameRegex: RegExp =
    /(?<=\s)([a-zA-Z_$][0-9a-zA-Z_$]*)(?=\([0-9a-zA-Z_$,\s:]*\)\s)/g;
  static readonly className: RegExp = /(?<=class\s)(\w*)(?=\s)/s;
}

export abstract class FileRegex {
  static readonly componentType: RegExp = /(?<=\.)(.).*?(?=\.ts)/s;
}

export abstract class ModuleRegex {
  static readonly moduleImports: RegExp = /(?<=imports:\s\[)(.).*?(?=\])/s;
  static readonly moduleSingle: RegExp = /(?<=\s\s)()\w*?(?=\,)/g;
}
