import type { ModelElement } from 'ckeditor5';

const HTML_HEADING_REGEX = /htmlH\d+/;
const ILLEGAL_ATTRIBUTES = [ 'bold', 'italic' ];

export const cleanElement = ( node: ModelElement ): void => {
	if ( window.ALYX_DEBUG_LOGGING ) {
		console.groupCollapsed( `DEBUG(cleanElement): Cleaning ${ node.name ?? 'unnamed node' }` );
		console.log( 'DEBUG(cleanElement):\n', node );
	}

	if ( node.name?.startsWith( 'heading' ) || node.name?.match( HTML_HEADING_REGEX ) ) {
		// @ts-expect-error This isn't *really* a ModelElement which is why this isn't actually `readonly`
		node.name = 'paragraph';
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

	if ( window.ALYX_DEBUG_LOGGING ) {
		console.groupEnd();
	}
};
