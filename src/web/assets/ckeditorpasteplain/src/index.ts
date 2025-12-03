import { Plugin } from 'ckeditor5/src/core.js';
import type { ClipboardContentInsertionEvent } from 'ckeditor5/src/clipboard.js';
import type { ModelElement } from 'ckeditor5';

declare global {
	interface Window {
		// makes debugging in prod just that little bit easier :)
		ALYX_DEBUG_LOGGING?: boolean;
	}
}

const HTML_HEADING_REGEX = /htmlH\d+/;
const ILLEGAL_ATTRIBUTES = [ 'bold', 'italic' ];

const cleanElement = ( node: ModelElement ) => {
	if ( window.ALYX_DEBUG_LOGGING ) {
		console.group( 'DEBUG(cleanElement): Cleaning node:\n', node );
	}

	if ( node.name?.startsWith( 'heading' ) || node.name?.match( HTML_HEADING_REGEX ) ) {
		// @ts-expect-error This isn't *really* a ModelElement which is why this isn't actually `readonly`
		node.name = 'paragraph';
	} else if ( window.ALYX_DEBUG_LOGGING ) {
		console.warn( 'DEBUG(cleanElement): NODE HAS NO NAME!' );
	}

	for ( const attribute of ILLEGAL_ATTRIBUTES ) {
		if ( node.hasAttribute( attribute ) ) {
			node._removeAttribute( attribute );
		}
	}

	if ( 'getChildren' in node ) {
		for ( const child of node.getChildren() ) {
			cleanElement( child as unknown as ModelElement );
		}
	} else if ( window.ALYX_DEBUG_LOGGING ) {
		console.warn( 'DEBUG(cleanElement): NODE HAS NO getChildren METHOD!' );
	}

	console.groupEnd();
};

export class PastePlain extends Plugin {
	public static get pluginName() {
		return 'PastePlain' as const;
	}

	public init(): void {
		const editor = this.editor;

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
