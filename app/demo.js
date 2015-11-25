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
        this.updateBarcode = updateBarcode;

        function updateBarcode(){
            this.barcodeInput = this.textField;
        }
    }

})();