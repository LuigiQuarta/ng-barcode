(function () {
    'use strict';

    angular
        .module('demo', [
            'ngBarcode'
        ])
        .controller('DemoCtrl', [DemoCtrl]);

    function DemoCtrl() {
        var demoCtrl = this;
        var defaultInputs = [];

        defaultInputs['code39'] = 'Hello World';
        defaultInputs['i25'] = '010101';

        demoCtrl.textField = defaultInputs['code39'];
        demoCtrl.updateBarcode = updateBarcode;

        updateBarcode();

        function updateBarcode() {
            demoCtrl.hex = '#03A9F4';
            demoCtrl.rgb = { r: 0, g: 0, b: 0 };
            demoCtrl.colorBarcode = getBarcodeColor;
            demoCtrl.colorBackground = [255, 255, 255];
            demoCtrl.barcodeInput = demoCtrl.textField;
        }

        function getBarcodeColor() {
            if(demoCtrl.showHex) {
                return demoCtrl.hex;
            } else {
                return [demoCtrl.rgb.r, demoCtrl.rgb.g, demoCtrl.rgb.b];
            }
        }
    }

})();
