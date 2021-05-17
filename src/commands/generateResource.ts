import * as _ from "lodash";
import * as changeCase from "change-case";

import mkdirp = require("mkdirp");
import { InputBoxOptions, Uri, window, workspace } from "vscode";
import { existsSync, writeFile } from "fs";
import { generateBindingTemplate, generateControllerTemplate, generatePageTemplate } from "../utils";


export const generateResource =  async (uri: Uri): Promise<void> => {

  if(workspace.workspaceFolders !== undefined) {
    let projectFolder = workspace.workspaceFolders[0].uri.fsPath;
    
    try {
    
      const resourceName = await promptForResourceName();
      if(!resourceName || resourceName.length === 0) {
        window.showErrorMessage("You must provide a resource name to generate the files");
        return;
      }
      const pascalCaseName = changeCase.pascalCase(resourceName!.toLowerCase());
      const baseDirectory = `${projectFolder}/lib/app`;

      await generateCode(pascalCaseName, baseDirectory);

      window.showInformationMessage("GetX files successfully created");
      
    } catch(err) {
      console.log(err);
      window.showErrorMessage(err);
    }

  } else {
    window.showErrorMessage("Please open your project folder before continue");
  }
};

async function generateCode(
  resourceName: string,
  baseDirectory: string,
) {
  const snakeCaseName = changeCase.snakeCase(resourceName!.toLowerCase());

  const controllerFolder = `${baseDirectory}/controllers`;
  const bindingsFolder = `${baseDirectory}/bindings`;
  const pageFolder = `${baseDirectory}/ui/pages/${snakeCaseName}_page`;

  if (!existsSync(controllerFolder)) {
    await mkdirp(controllerFolder);
  }

  if (!existsSync(bindingsFolder)) {
    await mkdirp(bindingsFolder);
  }

  if (!existsSync(pageFolder)) {
    await mkdirp(pageFolder);
  }

  const bindingTemplate = generateBindingTemplate(resourceName);
  const controllerTemplate = generateControllerTemplate(resourceName);
  const homePageTemplate = generatePageTemplate(resourceName);

  await Promise.all([
    createFile(resourceName, controllerFolder, controllerTemplate, "controller"),
    createFile(resourceName, bindingsFolder, bindingTemplate, "binding"),
    createFile(resourceName, pageFolder, homePageTemplate, "page"),
  ]);
}


function promptForResourceName(): Thenable<string | undefined> {
  const resourceNamePromptOptions: InputBoxOptions = {
    prompt: "Controller Name, Page or Binding",
    placeHolder: "Home",
  };
  return window.showInputBox(resourceNamePromptOptions);
}

async function createFile(
  fileName: string, targetDirectory: string, fileTemplate: string,
  type: "controller" | "binding" | "page"
): Promise<void> {

  const snakeCaseName = changeCase.snakeCase(fileName.toLowerCase());
  let targetPath: string;

  if(type === "binding") {
    targetPath = `${targetDirectory}/${snakeCaseName}_binding.dart`;
  } else if(type === "controller") {
    targetPath = `${targetDirectory}/${snakeCaseName}_controller.dart`;
  } else {
    targetPath = `${targetDirectory}/${snakeCaseName}_page.dart`;
  }
  
  if (existsSync(targetPath)) {
    throw Error(`${snakeCaseName}.dart already exists`);
  }
 
  return new Promise<void>(async (resolve, reject) => {
    writeFile(
      targetPath,
      fileTemplate,
      "utf8",
      (error) => {
        if (error) {
          window.showErrorMessage(`${error}`);
          reject(error);
          return;
        }
        resolve();
      }
    );
  });
}

