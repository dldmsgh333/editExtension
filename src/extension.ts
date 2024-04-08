
import { exec, execSync } from 'child_process';
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	let commitAndPushDisPosable = vscode.commands.registerCommand('extension.commitAndPush', function () {
		vscode.window.showInputBox({
				prompt: "Commit 메시지를 입력하세요.",
				placeHolder: "여기에 commit 메시지를 입력하세요."
		}).then(async value => {
				if (value === undefined || value.trim() === '') {
						vscode.window.showInformationMessage('Commit 메시지가 입력되지 않았습니다.');
						return;
				}
				const commitMessage = value.trim();
				await commitAndPush(commitMessage); 
				vscode.window.showInformationMessage(`'${commitMessage}'로 Commit and Push 되었습니다.`);
		});
});

context.subscriptions.push(commitAndPushDisPosable);
}

const child_process = require('child_process');

async function  commitAndPush(commitMessage: string) {
    // Git 커밋 및 푸시 스크립트 실행
    try {
			child_process.execSync('git add .');
      child_process.execSync(`git commit -m "${commitMessage}"`);
      child_process.execSync('git push');
      vscode.window.showInformationMessage('Git commit and push successful.');
    } catch (error: any) {
    	vscode.window.showErrorMessage('Error committing and pushing to Git: ' + error.message);
    }
}

// This method is called when your extension is deactivated
export function deactivate() {}
