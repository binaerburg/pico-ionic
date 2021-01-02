# @binaerburg/pico-ionic
![version](https://badge.fury.io/js/%40binaerburg%2Fpico-ionic.svg)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

Palette Pico Plugin Wrapper for Ionic 

## Installation

`npm i -s @binaerburg/pico-ionic`

## Usage 
```typescript
class AppComponent implements OnInit {
    import { PicoProvider, PicoInfo, PicoLab, PicoRGB, PicoBatteryState, PicoCalibrationResult } from '@binaerburg/pico-ionic';
    
    ...
    
    constructor(private picoProvider: PicoProvider) {
        // Initialize the Pico Sesnor
        picoProvider.triggerInitializeSensor();
    }
    
    ngOnInit(): void {
        // Listen on Pico events
        this.picoProvider.sensorConnection$.subscribe((conn: boolean) => {
            console.log(`Sensor connected: ${conn}`);
        });
        ...
        // Trigger Pico Events
        this.picoProvider.triggerConnectSensor();
    }
    
    ...
}
```

## Dependencies
- [cordova-plugin-pico](https://github.com/binaerburg/cordova-plugin-pico) This is the actual cordova plugin to communicate with the Palette Pico Sensor

