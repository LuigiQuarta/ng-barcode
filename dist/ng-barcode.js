(function () {
    'use strict';

    angular
        .module('ngBarcode', [])
        .directive('ngBarcode', ngBarcode);

    function ngBarcode() {
        var directive = {
            bindToController: true,
            controller: BarcodeCtrl,
            controllerAs: 'barcodeCtrl',
            restrict: 'AEC',
            template: '<img width="100%" height="100%" ng-if="barcodeCtrl.input" ng-src="{{barcodeCtrl.base64Barcode()}}" />',
            scope: {
                input: '@ngBarcodeInput',
                code: '@ngBarcodeCode',
                colorBarcode: '@ngBarcodeColor',
                colorBackground: '@ngBarcodeBackground'
            }
        };

        return directive;
    }

    function BarcodeCtrl() {
        var barcodeCtrl = this;
        var codes = {};

        codes.code39 = {};
        codes.code39.plain = {};
        codes.code39.plain['0'] = 'bwbWBwBwb';
        codes.code39.plain['1'] = 'BwbWbwbwB';
        codes.code39.plain['2'] = 'bwBWbwbwB';
        codes.code39.plain['3'] = 'BwBWbwbwb';
        codes.code39.plain['4'] = 'bwbWBwbwB';
        codes.code39.plain['5'] = 'BwbWBwbwb';
        codes.code39.plain['6'] = 'bwBWBwbwb';
        codes.code39.plain['7'] = 'bwbWbwBwB';
        codes.code39.plain['8'] = 'BwbWbwBwb';
        codes.code39.plain['9'] = 'bwBWbwBwb';
        codes.code39.plain['A'] = 'BwbwbWbwB';
        codes.code39.plain['B'] = 'bwBwbWbwB';
        codes.code39.plain['C'] = 'BwBwbWbwb';
        codes.code39.plain['D'] = 'bwbwBWbwB';
        codes.code39.plain['E'] = 'BwbwBWbwb';
        codes.code39.plain['F'] = 'bwBwBWbwb';
        codes.code39.plain['G'] = 'bwbwbWBwB';
        codes.code39.plain['H'] = 'BwbwbWBwb';
        codes.code39.plain['I'] = 'bwBwbWBwb';
        codes.code39.plain['J'] = 'bwbwBWBwb';
        codes.code39.plain['K'] = 'BwbwbwbWB';
        codes.code39.plain['L'] = 'bwBwbwbWB';
        codes.code39.plain['M'] = 'BwBwbwbWb';
        codes.code39.plain['N'] = 'bwbwBwbWB';
        codes.code39.plain['O'] = 'BwbwBwbWb';
        codes.code39.plain['P'] = 'bwBwBwbWb';
        codes.code39.plain['Q'] = 'bwbwbwBWB';
        codes.code39.plain['R'] = 'BwbwbwBWb';
        codes.code39.plain['S'] = 'bwBwbwBWb';
        codes.code39.plain['T'] = 'bwbwBwBWb';
        codes.code39.plain['U'] = 'BWbwbwbwB';
        codes.code39.plain['V'] = 'bWBwbwbwB';
        codes.code39.plain['W'] = 'BWBwbwbwb';
        codes.code39.plain['X'] = 'bWbwBwbwB';
        codes.code39.plain['Y'] = 'BWbwBwbwb';
        codes.code39.plain['Z'] = 'bWBwBwbwb';
        codes.code39.plain['-'] = 'bWbwbwBwB';
        codes.code39.plain['.'] = 'BWbwbwBwb';
        codes.code39.plain[' '] = 'bWBwbwBwb';
        codes.code39.plain['*'] = 'bWbwBwBwb';
        codes.code39.plain['$'] = 'bWbWbWbwb';
        codes.code39.plain['/'] = 'bWbWbwbWb';
        codes.code39.plain['+'] = 'bWbwbWbWb';
        codes.code39.plain['%'] = 'bwbWbWbWb';

        codes.I25 = {};
        codes.I25.plain = {};
        codes.I25.plain['START'] = 'wwwwwwwwwwbwbw';
        codes.I25.plain['END'] = 'Bwbwwwwwwwwww';
        codes.I25.plain['0'] = 'bbBBb';
        codes.I25.plain['1'] = 'BbbbB';
        codes.I25.plain['2'] = 'bBbbB';
        codes.I25.plain['3'] = 'BBbbb';
        codes.I25.plain['4'] = 'bbBbB';
        codes.I25.plain['5'] = 'BbBbb';
        codes.I25.plain['6'] = 'bBBbb';
        codes.I25.plain['7'] = 'bbbBB';
        codes.I25.plain['8'] = 'BbbBb';
        codes.I25.plain['9'] = 'bBbBb';

        function generateBarcode() {
            /* Cache BMP translation codes */
            codes.code39.BMP = {};

            for (var x in codes.code39.plain) {
                var tcodes = codes.code39.plain[x];

                codes.code39.BMP[x] = '';

                for (var j = 0; j < 9; j++) {
                    switch (tcodes.charAt(j)) {
                        case 'B':
                            codes.code39.BMP[x] += '\x00\x00\x00\x00\x00\x00\x00\x00\x00';
                            break;

                        case 'b':
                            codes.code39.BMP[x] += '\x00\x00\x00';
                            break;

                        case 'W':
                            codes.code39.BMP[x] += '\x01\x01\x01\x01\x01\x01\x01\x01\x01';
                            break;

                        case 'w':
                            codes.code39.BMP[x] += '\x01\x01\x01';
                            break;
                    }

                    codes.code39.BMP[x] += '\x01\x01\x01';
                }
            }

            return barcodeBMP();
        }

        // Auxiliary function for the I25 encoding
        // Returns true if the input has an even number of digits and is numeric
        function isValidI25Input(input) {
          var isValidInput = false;

          if( (input.length % 2 == 0) && !isNaN(parseInt(input)))
            isValidInput = true;

          return isValidInput;
        }

        function barcodeBMP() {
            var encoded = '';
            var code = barcodeCtrl.code;
            var input = barcodeCtrl.input.toUpperCase();
            var colorBarcode = formatColor(barcodeCtrl.colorBarcode, 1);
            var colorBackground = formatColor(barcodeCtrl.colorBackground, 2);
            var palette = [colorBarcode, colorBackground];


            switch (code) {
                case 'code39' :
                    var stringToEncode = '*' + input.trim() + '*';

                    for (var i = 0; i < stringToEncode.length; i++) {
                        encoded += codes.code39.BMP[stringToEncode.charAt(i)];
                    }

                    break;

                case 'i25' :
                    var code = input.trim();
                    
                    // Check on the input
                    if(!isValidI25Input(code)) {
                      throw('Invalid input format');
                      return;
                    }

                    encoded =   codes.I25.plain['START'];

                    if(code.length % 2 == 1)
                        code = '0' + code;

                    for(var i = 0; i < code.length; i+=2) {
                        var code1 = codes.I25.plain[code.charAt(i)];
                        var code2 = codes.I25.plain[code.charAt(i+1)].replace(/b/g,"w").replace(/B/g, "W");
                        for(var i2 = 0; i2 < 5; i2++) {
                            encoded += code1.charAt(i2) + code2.charAt(i2);
                        }
                    }

                    encoded +=  codes.I25.plain['END'];
                    encoded = encoded.replace(/w/g, '\x01\x01\x01');
                    encoded = encoded.replace(/W/g, '\x01\x01\x01\x01\x01\x01\x01\x01\x01');
                    encoded = encoded.replace(/b/g, '\x00\x00\x00');
                    encoded = encoded.replace(/B/g, '\x00\x00\x00\x00\x00\x00\x00\x00\x00');
                    break;

                default :
                    throw('Code ' + code + ' not implemented');
                    return;
            }

            return createBmp([encoded], palette);
        }

        function encode64(input) {
            var output = '';
            var i = 0;

            do {
                var chr1 = input.charCodeAt(i++);
                var chr2 = input.charCodeAt(i++);
                var chr3 = input.charCodeAt(i++);

                var enc1 = chr1 >> 2;
                var enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                var enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                var enc4 = chr3 & 63;

                if (isNaN(chr2))
                    enc3 = enc4 = 64;

                else if (isNaN(chr3))
                    enc4 = 64;

                output = output + encode64.keyStr.charAt(enc1) +
                    encode64.keyStr.charAt(enc2) +
                    encode64.keyStr.charAt(enc3) +
                    encode64.keyStr.charAt(enc4);
            }

            while (i < input.length);

            return output;
        }

        encode64.keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

        function multiByteEncode(number, bytes) {
            if (number < 0 || bytes < 0) {
                throw('Negative numbers not allowed.');
            }

            var oldbase = 1;
            var string = '';

            for (var x = 0; x < bytes; x++) {
                if (number == 0) {
                    CharCode = 0;
                }

                else {
                    var base = oldbase * 256;
                    var CharCode = number % base;
                    number = number - CharCode;
                    CharCode = CharCode / oldbase;
                    oldbase = base;
                }
                string += String.fromCharCode(CharCode);
            }

            if (number != 0)
                throw('Overflow, number too big for string length');

            return string;
        }

        function createBmp(grid, palette) {
            // xxxx and yyyy are placeholders for offsets (computed later).
            var bitmapFileHeader = 'BMxxxx\0\0\0\0yyyy';

            // Assemble the info header.
            var height = grid.length;
            var width = height && grid[0].length;
            var biHeight = multiByteEncode(height, 4);
            var biWidth = multiByteEncode(width, 4);
            var bfOffBits = multiByteEncode(40, 4);
            var bitCount = 8;

            var biBitCount = multiByteEncode(bitCount, 2);
            var bitmapInfoHeader = bfOffBits + biWidth + biHeight + '\x01\0' + biBitCount + '\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0';

            if (bitCount != 24) {
                var rgbQuad = [];
                var r = 0;
                var g = 0;
                var b = 0;
                for (var x = 0; x < 256; x++) {
                    if (x < palette.length) {
                        r = palette[x][0];
                        g = palette[x][1];
                        b = palette[x][2];
                    }
                    rgbQuad[x] = String.fromCharCode(b, g, r, 0);
                }

                rgbQuad = rgbQuad.join('');
            }

            var padding;

            if (width % 4 == 1) {
                padding = '\0\0\0';
            }

            else if (width % 4 == 2) {
                padding = '\0\0';
            }

            else if (width % 4 == 3) {
                padding = '\0';
            }

            else {
                padding = '';
            }

            var data = [];

            for (var y = 0; y < height; y++) {
                data[y] = grid[height - y - 1] + padding;
            }

            var bitmap = bitmapFileHeader + bitmapInfoHeader + rgbQuad + data.join('');

            bitmap = bitmap.replace(/yyyy/, multiByteEncode(bitmapFileHeader.length + bitmapInfoHeader.length + rgbQuad.length, 4));
            bitmap = bitmap.replace(/xxxx/, multiByteEncode(bitmap.length, 4));

            return 'data:image/bmp;base64,' + encode64(bitmap);
        }

        function hexToRgb(hex) {
            var rgb = null;

            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

            if(result) {
                rgb = [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
            } else {
                //alert('Color expression: "'+ hex +'" is not supported');
                rgb = [0, 0, 0];
            }

            return rgb;
        }

        function formatColor(color, type) {
            // type defines bar or background: 1 = bar | 2 = background
            if(color) {
                return isRgb(color) ? JSON.parse(color) : hexToRgb(color);
            } else {
                return type === 1 ? [0, 0, 0] : [255, 255, 255]
            }
        }

        function isRgb(color) {
            try {
                return JSON.parse(color);
            } catch(e) {
                return false;
            }
        }

        barcodeCtrl.base64Barcode = generateBarcode;
    }
})();
