import {Injector, isDevMode} from '@angular/core';
import { LoaderService } from "@shared/modules/custom-loader";


export let LoaderServiceInjector: Injector;

export function setLoaderServiceInjector(injector: Injector): void {
    if (LoaderServiceInjector) {
        console.error('Programming error: AppInjector was already set');
    } else {
        LoaderServiceInjector = injector;
    }
}

export const getLoaderServiceInjector = (): LoaderService | null => {
    try {
        const loader = LoaderServiceInjector && LoaderServiceInjector.get(LoaderService)
        return loader;
    } catch (e) {
        if (isDevMode()) {
            console.error(e);
        }
        return null;
    }
};
