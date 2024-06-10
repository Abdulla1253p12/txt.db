declare module 'st.db' {
    export interface DatabaseEntry {
        Date: {
            Year: string;
            Month: string;
            Day: string;
            Hours: string;
            Minutes: string;
            Seconds: string;
            Full: string;
        };
        Data: {
            Key: string;
            Value: {
            Data: any;
            Type: string;
            };
        };
    }
    export interface Database {
        set(Key: string | { Key: string; Value: any }, Value?: any): void;
        get(Key: string): DatabaseEntry | undefined;
        delete(Key: string): void;
        has(Key: string | { Key: string; Value: any }, Value?: any): boolean;
        add(Key: string | { Key: string; Value: any }, Value?: any): void;
        subtraction(Key: string | { Key: string; Value: any }, Value?: any): void;
        push(Key: string | { Key: string; Value: any }, Value?: any): void;
        pull(Key: string | { Key: string; Value: any }): void;
        allKeys(): string[];
        allValues(): any[];
        all(): DatabaseEntry[];
        type(Key: string): string | undefined;
        readonly reset: void;
        backup(Path: string): void;
        readonly length: number;
    }
    export function Database(File: string): Database;
    export interface SettingsEntry {
        STTM: Boolean;
    }
    export interface Settings {
        set(STTM: Boolean): SettingsEntry;
        readonly this: void;
    }
}  