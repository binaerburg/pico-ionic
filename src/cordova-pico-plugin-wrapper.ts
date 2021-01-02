import {Cordova} from '@ionic-native/core';

export class CordovaPicoPluginWrapper {
    /**
     * trigger init
     */
    @Cordova()
    triggerInitialize(): void {}

    /**
     * destroy the pico instance
     */
    @Cordova()
    destroy(): void { }

    /**
     * connect to the pico sensor
     */
    @Cordova()
    connect(): void { }

    /**
     * [explicitly] disconnect the pico sensor
     */
    @Cordova()
    disconnect(): void { }

    /**
     * get the info of a connected pico sensor - returns null if non connected
     */
    @Cordova()
    info(): void { }

    /**
     * [explicitly] scan with the pico sensor
     */
    @Cordova()
    scan(): void { }

    /**
     * calibrate the pico sensor
     */
    @Cordova()
    calibrate(): void { }
}
