declare namespace jasmine {
    interface AsyncMatchers<T> {
        toThrowErrorOfType(
            constructor: new (...args: any[]) => { message: string },
            message?: RegExp
        ): PromiseLike<void>;
    }
    interface Matchers<T> {
        toThrowErrorOfType(
            constructor: new (...args: any[]) => { message: string },
            message?: RegExp
        ): void;
    }
}
