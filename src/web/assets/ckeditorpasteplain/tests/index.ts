import { describe, expect, it } from 'vitest';
import { PastePlain as PastePlainDll, icons } from '../src/index.js';
import PastePlain from '../src/pasteplain.js';

import ckeditor from './../theme/icons/ckeditor.svg';

describe( 'CKEditor5 PastePlain DLL', () => {
	it( 'exports PastePlain', () => {
		expect( PastePlainDll ).to.equal( PastePlain );
	} );

	describe( 'icons', () => {
		it( 'exports the "ckeditor" icon', () => {
			expect( icons.ckeditor ).to.equal( ckeditor );
		} );
	} );
} );
