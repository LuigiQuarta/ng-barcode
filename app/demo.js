(function () {
    'use strict';

    angular
        .module('demo', [
            'ngBarcode'
        ])
        .controller('DemoCtrl', [DemoCtrl]);

    function DemoCtrl(){
        this.textField = 'Hello world';
        this.barcodeInput = this.barcodeInput || this.textField;

        this.hex = '#03A9F4';
        this.rgb = {
            r: 0,
            g: 0,
            b: 0
        };

        this.colorBarcode = getBarcodeColor;
        this.colorBackground = [255, 255, 255];
        this.updateBarcode = updateBarcode;

        function updateBarcode(){
            this.barcodeInput = this.textField;
        }

        function getBarcodeColor() {
            if(this.showHex) {
                return this.hex;
            } else {
                return [this.rgb.r, this.rgb.g, this.rgb.b];
            }
        }
    }

})();