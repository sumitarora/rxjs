let nextHandle = 0;
const tasksByHandle: { [handle: string]: () => void } = {};
const resolvedPromise = Promise.resolve();

function runIfPresent(handle: number) {
  const cb = tasksByHandle[handle];
  if (cb) {
    cb();
  }
}

export const Immediate = {
  setImmediate(cb: () => void): number {
    const handle = nextHandle++;
    tasksByHandle[handle] = cb;
    resolvedPromise.then(() => runIfPresent(handle));
    return handle;
  },

  clearImmediate(handle: number): void {
    delete tasksByHandle[handle];
  },
};
