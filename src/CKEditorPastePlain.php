<?php

namespace brikdigital\craftckeditorpasteplain;

use brikdigital\craftckeditorpasteplain\web\assets\ckeditorpasteplain\CKEditorPastePlainAsset;
use craft\base\Plugin;
use craft\ckeditor\Plugin as CKEditorPlugin;
use craft\fields\PlainText;

/**
 * CKEditor Paste Plain plugin
 *
 * @author Alyxia Sother <alyxia@riseup.net>
 * @license MSPL-2.0
 */
class CKEditorPastePlain extends Plugin
{
    private array $supportedFieldTypes = [PlainText::class];

    public function init(): void
    {
        parent::init();

        CKEditorPlugin::registerCkeditorPackage(CKEditorPastePlainAsset::class);
    }
}
