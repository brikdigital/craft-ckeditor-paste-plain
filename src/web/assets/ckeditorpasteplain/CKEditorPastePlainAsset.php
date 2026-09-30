<?php

namespace brikdigital\craftckeditorpasteplain\web\assets\ckeditorpasteplain;

use craft\ckeditor\web\assets\BaseCkeditorPackageAsset;

class CKEditorPastePlainAsset extends BaseCkeditorPackageAsset
{
	public $sourcePath = __DIR__ . '/dist/browser';

	public string $namespace = '@brikdigital/ckeditor5-paste-plain';

	public $js = [
		['index.es.js', 'type' => 'module'],
	];

	public array $pluginNames = [
		'PastePlain',
	];
}
