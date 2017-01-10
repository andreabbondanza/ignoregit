'use strict';
import { IgnoreType } from './ignoregit';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from "fs";
import * as ignoregit from "./ignoregit";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext)
{

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "ignoregit" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposableIgnoreFile = vscode.commands.registerCommand('ignoregit.ignoreFile', (args: any) =>
    {
        let ig: ignoregit.IgnoreGit = new ignoregit.IgnoreGit();
        let isPresent: boolean = ig.IsGitIgnorePresent();
        let path: string = args._fsPath;
        if (isPresent)
        {
            let isDir = fs.lstatSync(path).isDirectory();
            let type: IgnoreType = IgnoreType.File;
            if (isDir)
            {
                type = IgnoreType.Folder;
            }
            path = path.replace(vscode.workspace.rootPath, "");

            if (ig.AddFile(path, type))
            {
                vscode.window.showInformationMessage("Done!");
            }
            else
            {
                vscode.window.showErrorMessage("Something goes wrong");
            }
        }
        else
        {
            vscode.window.showErrorMessage("No .gitignore file founded, please init the repository");
        }

    });
    let disposableIgnoreExt = vscode.commands.registerCommand('ignoregit.ignoreExt', (args: any) =>
    {
        let ig: ignoregit.IgnoreGit = new ignoregit.IgnoreGit();
        let isPresent: boolean = ig.IsGitIgnorePresent();
        let path: string = args._fsPath;
        if (isPresent)
        {
            let isDir = fs.lstatSync(path).isDirectory();
            let type: IgnoreType = IgnoreType.File;
            if (!isDir)
            {
                type = IgnoreType.Extension;
                path = path.replace(vscode.workspace.rootPath, "");
                if (ig.AddExtension(path, type))
                {
                    vscode.window.showInformationMessage("Done!");
                }
                else
                {
                    vscode.window.showErrorMessage("Something goes wrong");
                }
            }
            else
            {
                vscode.window.showErrorMessage("Folder doesn't has extension");
            }

        }
        else
        {
            vscode.window.showErrorMessage("No .gitignore file founded, please init the repository");
        }
    });
    let disposableIncludeFile = vscode.commands.registerCommand('ignoregit.includeFile', (args: any) =>
    {
        let ig: ignoregit.IgnoreGit = new ignoregit.IgnoreGit();
        let isPresent: boolean = ig.IsGitIgnorePresent();
        let path: string = args._fsPath;
        if (isPresent)
        {
            let isDir = fs.lstatSync(path).isDirectory();
            let type: IgnoreType = IgnoreType.File;
            if (isDir)
            {
                type = IgnoreType.Folder;
            }
            path = path.replace(vscode.workspace.rootPath, "");

            if (ig.RemoveFile(path))
            {
                vscode.window.showInformationMessage("Done!");
            }
            else
            {
                vscode.window.showErrorMessage("Something goes wrong");
            }
        }
        else
        {
            vscode.window.showErrorMessage("No .gitignore file founded, please init the repository");
        }

    });
    let disposableIncludeExt = vscode.commands.registerCommand('ignoregit.includeExt', (args: any) =>
    {
        let ig: ignoregit.IgnoreGit = new ignoregit.IgnoreGit();
        let isPresent: boolean = ig.IsGitIgnorePresent();
        let path: string = args._fsPath;
        if (isPresent)
        {
            let isDir = fs.lstatSync(path).isDirectory();
            let type: IgnoreType = IgnoreType.File;
            if (!isDir)
            {
                type = IgnoreType.Extension;
                path = path.replace(vscode.workspace.rootPath, "");
                if (ig.RemoveExtension(path))
                {
                    vscode.window.showInformationMessage("Done!");
                }
                else
                {
                    vscode.window.showErrorMessage("Something goes wrong");
                }
            }
            else
            {
                vscode.window.showErrorMessage("Folder doesn't has extension");
            }

        }
        else
        {
            vscode.window.showErrorMessage("No .gitignore file founded, please init the repository");
        }
    });
    context.subscriptions.push(disposableIgnoreFile);
    context.subscriptions.push(disposableIgnoreExt);
    context.subscriptions.push(disposableIncludeFile);
    context.subscriptions.push(disposableIncludeExt);
}

// this method is called when your extension is deactivated
export function deactivate()
{
}