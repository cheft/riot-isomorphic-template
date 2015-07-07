var State = {
    PENDING: 0,
    FULFILLED: 2,
    REJECTED: 3
};

function resolve(promise, x) {
    if (promise.state === State.FULFILLED || promise.state === State.REJECTED) {
        return;
    }
    if (promise === x) { // 2.3.1
        promise.done = true;
        promise.state = State.REJECTED;
        promise.value = new TypeError("Resolving promise with it self is not allowed");
        purgeWaiting(promise);
    } else if (x instanceof Promise) { // 2.3.2
        x.then(function (value) { // 2.3.2.2
            resolve(promise, value);
        }, function (reason) { // 2.3.2.3
            reject(promise, reason);
        });
    } else if (x && (typeof x === "object" || typeof x === "function")) { // 2.3.3
        var then = null;
        var called = false;
        try {
            then = x.then; // 2.3.3.1
        } catch (e) { // 2.3.3.2
            promise.done = true;
            promise.state = State.REJECTED;
            promise.value = e;
            purgeWaiting(promise);
            return;
        }
        if (typeof then === "function") { // 2.3.3.3
            var called = false;
            try {
                then.call(x, function (value) { // 2.3.3.3.1
                    if (called) return; // 2.2.2.3
                    resolve(promise, value);
                    called = true;
                }, function (reason) { // 2.3.3.3.2
                    if (called) return; // 2.2.3.3
                    reject(promise, reason);
                    called = true;
                });
            } catch (e) { // 2.3.3.3.4
                if (!called) { // 2.3.3.3.4.1 && 2.3.3.3.4.2
                    promise.done = true;
                    promise.state = State.REJECTED;
                    promise.value = e;
                    purgeWaiting(promise);
                }
            }
        } else { // 2.3.3.4
            promise.done = true;
            promise.state = State.FULFILLED;
            promise.value = x;
            purgeWaiting(promise);
        }
    } else { // 2.3.4
        promise.done = true;
        promise.state = State.FULFILLED;
        promise.value = x;
        purgeWaiting(promise);
    }
}

function reject(promise, reason) {
    if (promise.state === State.FULFILLED || promise.state === State.REJECTED) {
        return; // 2.2.2.3
    }
    promise.done = true;
    promise.state = State.REJECTED;
    if (promise === reason) {
        promise.value = new TypeError("Promise cannot be reject with self as reason");
    } else {
        promise.value = reason;
    }
    purgeWaiting(promise);
}

function purgeWaiting(promise) {
    var item = null;
    var a = null;
    if (promise.done) {
        a = promise.pending;
        while (item = a.shift()) {
            setTimeout(function (p, fn) {
                if (typeof fn === "function") {
                    try {
                        var ret = fn(promise.value);
                        resolve(p, ret);
                    } catch (e) {
                        reject(p, e);
                    }
                } else {
                    if (promise.state === State.FULFILLED) {
                        resolve(p, promise.value);
                    } else if (promise.state === State.REJECTED) {
                        reject(p, promise.value);
                    }
                }
            }, 0, item.p, (promise.state === State.FULFILLED ? item.f : item.r));
        }
    }
}

function Promise(payload) {
    this.done = false;
    this.state = State.PENDING;
    this.value = null;
    this.pending = [];
    if (payload instanceof Function) {
        try  {
            var ret = payload(Promise.prototype.resolve.bind(this), Promise.prototype.reject.bind(this));
            if (ret !== undefined) {
                resolve(this, ret);
            }
        } catch (e) {
            reject(this, e);
        }
    } else if (payload !== undefined) {
        resolve(this, payload);
    }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
    var promise = new Promise();

    var obj = {
        f: (typeof onFulfilled === "function") ? onFulfilled : null, // 2.2.1.1
        r: (typeof onRejected === "function") ? onRejected : null, // 2.2.1.2
        p: promise
    };

    this.pending.push(obj);

    if (this.done) {
        purgeWaiting(this);
    }

    return promise; // 2.2.7
};

Promise.prototype.catch = function (onRejected) {
    return this.then(null, onRejected);
};

Promise.prototype.resolve = function (value) {
    resolve(this, value);
};

Promise.prototype.reject = function (value) {
    reject(this, value);
};

Promise.cast = function (obj) {
    if (obj instanceof Promise) {
        return obj;
    } else {
        return new Promise(function (resolve, reject) {
            resolve(obj);
        });
    }
};

Promise.resolve = function (value) {
    return new Promise(function (resolve, reject) {
        resolve(value);
    });
};

Promise.reject = function (reason) {
    return new Promise(function (resolve, reject) {
        reject(reason);
    });
};

Promise.all = function (promises) {
    return new Promise(function (resolve, reject) {
        var values = [];
        var done = 0;
        for (var i = 0; i < promises.length; ++i) {
            Promise.cast(promises[i]).then((function (n, value) {
                values[n] = value;
                if (++done === promises.length) {
                    resolve(values);
                }
            }).bind(undefined, i), function (reason) {
                reject(reason);
            });
        }
    });
};

Promise.race = function (promises) {
    return new Promise(function (resolve, reject) {
        for (var i = 0; i < promises.length; ++i) {
            Promise.cast(promises[i]).then((function (n, value) {
                resolve(value);
            }).bind(undefined, i), function (reason) {
                reject(reason);
            });
        }
    });
};

module.exports = Promise;