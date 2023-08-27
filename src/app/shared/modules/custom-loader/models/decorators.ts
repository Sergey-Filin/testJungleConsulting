import {isObservable, throwError} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';

import {getLoaderServiceInjector} from './loader-service.injector';

export function loader(hide = false): MethodDecorator {
    return (target: any, key: string, descriptor: PropertyDescriptor) => {

        const originalMethod = descriptor.value;
        descriptor.value = function(...args) {
            const method = originalMethod.apply(this, args);
            const injector = getLoaderServiceInjector();
            if (!injector) {
                return method;
            }
            if (isObservable(method)) {
                injector.show();
                return method.pipe(
                    tap(() => {
                        if (!hide) {
                            injector.hide();
                        }
                    }),
                    catchError((error) => {
                        injector.forceClose();
                        return throwError(error);
                    }),
                    finalize(() => {
                        injector.hide();
                    }),
                );
            }
            return method;
        };
        return descriptor;
    };
}
