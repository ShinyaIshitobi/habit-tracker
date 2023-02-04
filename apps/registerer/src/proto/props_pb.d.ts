// package: habitTracker
// file: props.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Empty extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Empty.AsObject;
    static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Empty;
    static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
    export type AsObject = {
    }
}

export class HProps extends jspb.Message { 
    getDate(): string;
    setDate(value: string): HProps;
    getBedby12(): boolean;
    setBedby12(value: boolean): HProps;
    getCooking(): boolean;
    setCooking(value: boolean): HProps;
    getMeditation(): boolean;
    setMeditation(value: boolean): HProps;
    getTraining(): boolean;
    setTraining(value: boolean): HProps;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HProps.AsObject;
    static toObject(includeInstance: boolean, msg: HProps): HProps.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HProps, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HProps;
    static deserializeBinaryFromReader(message: HProps, reader: jspb.BinaryReader): HProps;
}

export namespace HProps {
    export type AsObject = {
        date: string,
        bedby12: boolean,
        cooking: boolean,
        meditation: boolean,
        training: boolean,
    }
}

export class SProps extends jspb.Message { 
    getDate(): string;
    setDate(value: string): SProps;
    getBedby12(): boolean;
    setBedby12(value: boolean): SProps;
    getCooking(): boolean;
    setCooking(value: boolean): SProps;
    getMeditation(): boolean;
    setMeditation(value: boolean): SProps;
    getRingfit(): boolean;
    setRingfit(value: boolean): SProps;
    getTechblog(): boolean;
    setTechblog(value: boolean): SProps;
    getWakeupby8(): boolean;
    setWakeupby8(value: boolean): SProps;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SProps.AsObject;
    static toObject(includeInstance: boolean, msg: SProps): SProps.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SProps, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SProps;
    static deserializeBinaryFromReader(message: SProps, reader: jspb.BinaryReader): SProps;
}

export namespace SProps {
    export type AsObject = {
        date: string,
        bedby12: boolean,
        cooking: boolean,
        meditation: boolean,
        ringfit: boolean,
        techblog: boolean,
        wakeupby8: boolean,
    }
}
