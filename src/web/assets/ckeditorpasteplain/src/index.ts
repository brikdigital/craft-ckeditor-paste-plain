import { Plugin } from 'ckeditor5/src/core.js';
import type { ClipboardContentInsertionEvent } from 'ckeditor5/src/clipboard.js';
import type { ModelElement } from 'ckeditor5';
import { cleanElement } from './utils.js';

declare global {
	interface Window {
		// makes debugging in prod just that little bit easier :)
		ALYX_DEBUG_LOGGING?: boolean;
	}
}

export class PastePlain extends Plugin {
	public static get pluginName() {
		return 'PastePlain' as const;
	}

	public init(): void {
		const editor = this.editor;

		// Makes sure single-paragraph monoliths are transformed into separate paragraphs
		editor.model.schema.addChildCheck( ( ctx, child ) => {
			if ( child.name === 'softBreak' && Array.from( ctx.getNames() ).includes( 'paragraph' ) ) {
				return false;
			}
		} );

		editor.plugins.get( 'ClipboardPipeline' ).on<ClipboardContentInsertionEvent>( 'contentInsertion', ( _e, data ) => {
			if ( window.ALYX_DEBUG_LOGGING ) {
				console.group( 'DEBUG(contentInsertion): triggered with data:\n', data );
			}

			for ( const _child of data.content.getChildren() ) {
				// TODO: Find what this really is
				const child = _child as unknown as ModelElement;
				if ( !child.name ) {
					return;
				}

				cleanElement( child );
			}

			console.groupEnd();
		} );
	}
}
