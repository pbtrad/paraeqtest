"use strict";

$(function() {
    $(".freqDial").knob({

        change: function(valueFreqDial) {
            parametricEQ1.frequency.value = valueFreqDial;


        }
    });

    $(".bandwidthDial").knob({

        change: function(valueBandwidthDial) {
            parametricEQ1.Q.value = valueBandwidthDial;

        }
    });

    $(".gainDial").knob({

        change: function(valueGainDial) {
            parametricEQ1.gain.value = valueGainDial;


        }
    });
    
    $(".thresholdDial").knob({

        change: function(valueThresholdDial) {
            compressor.threshold.value = valueThresholdDial;
        }
    });

    $(".ratioDial").knob({

        change: function(valueRatioDial) {
            compressor.ratio.value = valueRatioDial;
        }
    });

    $(".kneeDial").knob({

        change: function(valueKneeDial) {
            compressor.knee.value = valueKneeDial;
        }
    });

    $(".releaseDial").knob({

        change: function(valueReleaseDial) {
            compressor.release.value = valueReleaseDial;
        }
    });

    $(".attackDial").knob({

        change: function(valueAttackDial) {
            compressor.attack.value = valueAttackDial;
        }
    });

});