(function(){

    // rewrited default method "setTimeout()"
    function ownSetTimeout(defaultFunc) {

        return function (delay, callback) {

            return defaultFunc(callback, delay);

        }

    }

    // testing method "setTimeout"
    window.setTimeout = ownSetTimeout(setTimeout);

    function work () {

        window.setTimeout(1000, inf);

    }

    function inf() {

       return console.log("function is work");

    }

    work();

    // rewriting default method "setInterval()" and using method "ownSetTimeout()"

    function ownSetInterval(callback, delay) {

        setTimeout(delay, function () {

            callback();

           return ownSetInterval(callback, delay);

        });

    }

    window.setInterval = ownSetInterval;

    // testing method "ownSetTimeout"

    function inf1() {
       return console.log("function 1 is work");
    }

    window.setInterval(inf1, 5000);


    //altered function  freeze

    function freeze (delay, fnc) {

        var timeout = false;

        return function () {

            var args = arguments;

            if(!timeout) {

                timeout = setTimeout(delay, function () {

                    fnc.apply(this, args);

                });

            }

        }

    }

    function fncToDelay (param) {

        console.log('Delayed run : ' + param);

    }


    var frozenFunc = freeze(1000, fncToDelay);

    frozenFunc('1');
    frozenFunc('2');
    frozenFunc('3');
    frozenFunc('4');
    frozenFunc('5');
    frozenFunc('6');
    frozenFunc('7');
    frozenFunc('8');
    frozenFunc('9');

    // creating dekorator for filters

    function createPipe(originalFnc, flt) {

        return function (str) {

            var resAbc = str;

            for (var i = 0; i < flt.length; i++) {

                resAbc = flt[i](resAbc);

            }

            return originalFnc(resAbc);

        }
    }

    function originalFnc(str) {

        var result, ABC = str.split(' ');

        for (var i = 0; i < ABC.length; i++) {

            ABC[i] = ABC[i].charAt(0).toUpperCase() + ABC[i].substring(1, 50);

        }

        result = ABC.join(' ');

        console.log(result);
    }

    function filterDigits(str) {

        var result = str.replace(/\d/g, '');

        return result;

    }

    function filterSpecial(str) {

        var result = str.replace(/[!@#$%^&*()]/g, '');

        return result;

    }

    function filterWhiteSpaces(str) {

        var result = str.replace(/\s+/g, '  ');

        return result;

    }

    //testing dekorator "createPipe"
    var pipe = createPipe(originalFnc, [filterDigits, filterSpecial, filterWhiteSpaces]);

    pipe('on345l90)y  4   te**x((((t     h$&er@@@e'); // logs 'Only Text Here'

})();