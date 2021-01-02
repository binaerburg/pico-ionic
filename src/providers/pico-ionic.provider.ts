import {Injectable, OnDestroy} from '@angular/core';
import {Broadcaster} from '@ionic-native/broadcaster/ngx';
import {Plugin} from '@ionic-native/core';
import {Observable} from 'rxjs';
import PicoInfo from '../shared/interface/pico-info';
import PicoLab from '../shared/interface/pico-lab';
import PicoBatteryState from '../shared/enum/pico-battery-state.enum';
import {Platform} from 'ionic-angular';
import {CordovaPicoPluginWrapper} from '../cordova-pico-plugin-wrapper';
import PicoCalibrationResult from '../shared/enum/pico-calibration-result.enum';

@Plugin(
    {
        pluginName: "cordova-plugin-pico",
        plugin: "cordova-plugin-pico",
        pluginRef: "CordovaPicoPlugin",
        repo: "https://github.com/binaerburg/cordova-plugin-pico",
        platforms: ["Android", "iOS"]
    }
)
@Injectable()
export class PicoProvider implements OnDestroy {

    sensorError$!: Observable<any>;
    sensorConnection$!: Observable<boolean>;
    sensorCalibration$!: Observable<PicoCalibrationResult>;
    sensorInfo$!: Observable<PicoInfo>;
    sensorLabScan$!: Observable<PicoLab>;
    sensorData$!: Observable<any>;
    sensorBatteryLevel$!: Observable<number>;
    sensorBatteryState$!: Observable<PicoBatteryState>;

    private cordovaPluginWrapper = new CordovaPicoPluginWrapper();

    constructor(private broadcaster: Broadcaster,
                private platform: Platform) {
        // subscribe all pico listeners
        this.platform.ready().then(() => {
            if (this.platform.is('cordova')) {
                this.sensorError$ = broadcaster.addEventListener('error');
                this.sensorConnection$ = broadcaster.addEventListener('connection');
                this.sensorCalibration$ = broadcaster.addEventListener('calibration');
                this.sensorInfo$ = broadcaster.addEventListener('picoInfo');
                this.sensorLabScan$ = broadcaster.addEventListener('labScan');
                this.sensorData$ = broadcaster.addEventListener('sensorData');
                this.sensorBatteryLevel$ = broadcaster.addEventListener('batteryLevel');
                this.sensorBatteryState$ = broadcaster.addEventListener('batteryStatus');
            }
        });
    }

    ngOnDestroy(): void {
        if (this.platform.is('cordova')) {
            this.cordovaPluginWrapper.destroy();
        }
    }

    // -------------------------------------------------------
    // methods to explicitly trigger Pico Events
    // -------------------------------------------------------

    triggerConnectSensor(): void {
        this.cordovaPluginWrapper.connect();
    }

    triggerDisconnectSensor(): void {
        this.cordovaPluginWrapper.disconnect();
    }

    triggerScanColor(): void {
        this.cordovaPluginWrapper.scan();
    }

    triggerCalibrateSensor(): void {
        this.cordovaPluginWrapper.calibrate();
    }

    triggerSensorInfo(): void {
        this.cordovaPluginWrapper.info();
    }

    triggerInitializeSensor(): void {
        this.cordovaPluginWrapper.triggerInitialize();
    }
}
