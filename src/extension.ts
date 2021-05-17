import * as vscode from 'vscode';
import { generateFoldersAndFiles, generateResource } from "./commands";


export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.commands.registerCommand("getxresources.generateStructure", generateFoldersAndFiles),
		vscode.commands.registerCommand("getxresources.generateResource", generateResource)
	);
}

// this method is called when your extension is deactivated
export function deactivate() {}
