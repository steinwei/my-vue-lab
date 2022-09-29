export const PROMISE_STATUS = {
    'PENDING': Symbol('PENDING'),
    'REJECTED': Symbol('REJECTED'),
    'FULFILLED': Symbol('FULFILLED')
}

export class PromiseAPlus {
    constructor(excutor) { 
        this.value = undefined
        this.status = PROMISE_STATUS.PENDING
        this.fulfilledList = []
        this.rejectedList = []
        this.cancelToken = undefined
        const _reject = (val) => {
            const run = () => {
                if (this.status != PROMISE_STATUS.PENDING) {
                    return
                }
                this.status = PROMISE_STATUS.REJECTED
                const cb = this.rejectedList.shift()
                cb && cb()
                this.value = val
            }
            setTimeout(run)
        }
        const _resolve = (val) => {
            const run = () => {
                if (this.status != PROMISE_STATUS.PENDING) {
                    return
                }
                this.status = PROMISE_STATUS.FULFILLED
                const cb = this.fulfilledList.shift()
                cb && cb()
                this.value = val
            }
            setTimeout(run)
        }
        excutor(_resolve, _reject)
    }

    then(val) {
        return new Promise((resolve, reject) => {
            const resolveFn = typeof resolve == 'function' ? resolve : () => void 0
            const rejectFn = typeof reject == 'function' ? reject : () => void 0

            switch (this.status) {
                case PROMISE_STATUS.PENDING: {
                    this.fulfilledList.push(resolveFn)
                    this.rejectedList.push(rejectFn)
                    this.status = PROMISE_STATUS.FULFILLED
                    this.value = val
                    break
                }
                case PROMISE_STATUS.FULFILLED: {
                    const cb = this.fulfilledList.shift()
                    cb && cb()
                    this.value = val
                    break
                }
                case PROMISE_STATUS.REJECTED: {
                    const cb = this.fulfilledList.shift()
                    cb && cb()
                    this.value = val
                    break
                }
                default: {
                    throw new Error('promise status errors.')
                }
            }
        })
     }
    catch(err) { 
        return new Promise((null, () => new Error(err)))
    }

    static resolve() {

    }

    static race(promises = []) {
        return new Promise((_resolve) => {

        })
    }
    
    static all(promises = []) { 
        return new Promise((_resolve) => {
            let index = 0;
            const resultList = []
            const run = () => {
                if (index == promises.length) {
                    return resultList
                }
                const p = promises[index++]
                const r = _resolve(p)
                resultList.push(r)
                return r.then(() => run())
            }
            return run();
        })
    }

    static all_safe(promises = []) {
        return new Promise((_resolve) => {

        })
    }
}