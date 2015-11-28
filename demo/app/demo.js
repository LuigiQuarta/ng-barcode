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
        this.colorBarcode = '#0288D1';
        this.colorBackground = [255, 255, 255];
        this.updateBarcode = updateBarcode;

        function updateBarcode(){
            this.barcodeInput = this.textField;
        }
    }

})();