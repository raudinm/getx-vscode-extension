import * as _ from "lodash";
import * as mkdirp from "mkdirp";

import { window, workspace } from "vscode";


export const generateFoldersAndFiles =  async (): Promise<void> => {
  
  if(workspace.workspaceFolders !== undefined) {

    let projectFolder = workspace.workspaceFolders[0].uri.fsPath;
    // Main folders
    const appFolder = `${projectFolder}/lib/app`;
    const dataFolder = `${appFolder}/data`;
    const bindingsFolder = `${appFolder}/bindings`;
    const controllersFolder = `${appFolder}/controllers`;
    const routesFolder = `${appFolder}/routes`;
    const translationFolder = `${appFolder}/translation`;
    const uiFolder = `${appFolder}/ui`;

    // Data folder
    const servicesFolder = `${dataFolder}/services`;
    const modelsFolder = `${dataFolder}/models`;
    const providersFolder = `${dataFolder}/provider`;

    // UI Folder
    const pagesFolder = `${uiFolder}/pages`;
    const widgetsFolder = `${uiFolder}/global_widgets`;
    const themesFolder = `${uiFolder}/theme`;
    const utilsFolder = `${uiFolder}/utils`;

    try {
      await Promise.all([
        // Main folders
        mkdirp(bindingsFolder),
        mkdirp(controllersFolder),
        mkdirp(routesFolder),
        mkdirp(translationFolder),
        // Data folders
        mkdirp(servicesFolder),
        mkdirp(modelsFolder),
        mkdirp(providersFolder),
        // UI folders
        mkdirp(pagesFolder),
        mkdirp(widgetsFolder),
        mkdirp(themesFolder),
        mkdirp(utilsFolder),
      ]);
      
      window.showInformationMessage("GetX Directory tree successfully created");
      
    } catch(err) {
      console.log(err);
      window.showErrorMessage(err);
    }

  } else {
    window.showErrorMessage("Please open your folder project before continue");
  }
};
