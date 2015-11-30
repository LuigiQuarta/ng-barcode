(function () {
    'use strict';

    angular
        .module('demo', [
            'ngBarcode'
        ])
        .controller('DemoCtrl', [DemoCtrl]);

    function DemoCtrl(){
        var demoCtrl = this;
        var defaultInputs = [];

        defaultInputs['code39'] = 'Hello World';
        defaultInputs['i25'] = '010101';

        demoCtrl.textField = defaultInputs['i25'];
        demoCtrl.updateBarcode = updateBarcode;

        updateBarcode();

        function updateBarcode() {
            demoCtrl.barcodeInput = demoCtrl.textField;
        }
    }

})();
