"use client"

import * as React from "react"

import { type ToastProps } from "./toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000 // A long time for testing, set to 1000 (1 second) normally

type ActionType =
  | {
      type: "ADD_TOAST"
      toast: ToastProps
    }
  | {
      type: "UPDATE_TOAST"
      toast: ToastProps
    }
  | {
      type: "DISMISS_TOAST"
      toastId?: string
    }
  | {
      type: "REMOVE_TOAST"
      toastId?: string
    }

interface State {
  toasts: ToastProps[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST":
      const { toastId } = action
      // ! This is a hacky fix that's required because an issue in Radix UI
      // ! The animation doesn't play if the toast is removed immediately
      // ! The toast animation is the last thing that plays when toast is dismissed
      // ! It needs the toast to still be in the DOM for the animation to play
      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === toastId ? { ...toast, open: false } : toast
        ),
      }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let state: State = {
  toasts: [],
}

function setState(action: ActionType) {
  state = reducer(state, action)
  listeners.forEach((listener) => listener(state))
}

function dispatch(action: ActionType) {
  if (action.type === "ADD_TOAST") {
    addToRemoveQueue(action.toast.id!)
  }

  if (action.type === "DISMISS_TOAST" && action.toastId) {
    clearTimeout(toastTimeouts.get(action.toastId))
    toastTimeouts.delete(action.toastId)
    return;
  }
  setState(action);
}

interface Toast extends Omit<ToastProps, "id"> {
  id: string
}

function createToast(
  props: ToastProps
): Toast {
  return {
    id: genId(),
    ...props,
  }
}

const genId = () => {
  return Math.random().toString(36).substring(2, 9);
}

function useToast() {
  const [activeToasts, setActiveToasts] = React.useState(state.toasts)

  React.useEffect(() => {
    listeners.push(setActiveToasts)
    return () => {
      let index = listeners.indexOf(setActiveToasts)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [])

  return {
    toasts: activeToasts,
    toast: React.useCallback(function toast({ ...props }: ToastProps) {
      const toast = createToast(props)
      dispatch({ type: "ADD_TOAST", toast })
      return toast
    }, []),
    dismiss: React.useCallback(function dismiss(toastId?: string) {
      dispatch({ type: "DISMISS_TOAST", toastId })
    }, []),
  }
}

export { useToast, reducer }
