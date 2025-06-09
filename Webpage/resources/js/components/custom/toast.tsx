import { toast } from 'react-toastify';

export const notifyPromise = (promise: Promise<any>, successMsg: string, errorMsg: string, pendingMsg?: string,) => toast.promise(promise, {
    pending: pendingMsg,
    success: successMsg,
    error: errorMsg
})

export const notifyError = (content: string) => toast.error(
    content
)