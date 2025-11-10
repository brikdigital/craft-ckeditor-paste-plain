import { Plugin } from 'ckeditor5/src/core.js';
import { plainTextToHtml } from 'ckeditor5/src/clipboard.js';

export class PastePlain extends Plugin {
	public static get pluginName() {
		return 'PastePlain' as const;
	}

	public init(): void {
		const editor = this.editor;
		const editingView = editor.editing.view;

		editingView.document.on( 'clipboardInput', ( e, data ) => {
			if ( editor.isReadOnly ) {
				return;
			};

			const dataTransfer = data.dataTransfer;
			const content = plainTextToHtml( dataTransfer.getData( 'text/plain' ) );

			data.content = this.editor.data.htmlProcessor.toView( content );
		} );
	}
}
