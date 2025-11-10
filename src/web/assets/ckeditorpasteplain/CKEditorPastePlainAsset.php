<?php

namespace brikdigital\craftckeditorpasteplain\web\assets\ckeditorpasteplain;

use craft\ckeditor\web\assets\BaseCkeditorPackageAsset;

class CKEditorPastePlainAsset extends BaseCkeditorPackageAsset
{
    public $sourcePath = __DIR__ . '/build';

    public $js = [
        'paste-plain.js',
    ];

    public array $pluginNames = [
        'PastePlain',
    ];
}
