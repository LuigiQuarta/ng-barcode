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
        this.colorBarcode = '#004E71';
        this.colorBackground = [200, 200, 200];
        this.updateBarcode = updateBarcode;

        function updateBarcode(){
            this.barcodeInput = this.textField;
        }
    }

})();