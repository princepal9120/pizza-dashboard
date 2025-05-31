'use client';

import * as React from 'react';
import { toast as sonnerToast } from 'sonner';

// Define our own types since we're not importing from a local toast component
type ToastVariant = 'default' | 'success' | 'error' | 'destructive' | 'info';

interface ToastAction {
  label: string;
  onClick: () => void;
}

interface ToastOptions {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariant;
  action?: ToastAction;
  duration?: number;
}

type ToasterToast = ToastOptions & {
  id: string;
};

const TOAST_LIMIT = 5; // Increased since Sonner can handle more
const TOAST_REMOVE_DELAY = 4000; // More reasonable delay

const actionTypes = {
  ADD_TOAST: 'ADD_TOAST',
  UPDATE_TOAST: 'UPDATE_TOAST',
  DISMISS_TOAST: 'DISMISS_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType['ADD_TOAST'];
      toast: ToasterToast;
    }
  | {
      type: ActionType['UPDATE_TOAST'];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType['DISMISS_TOAST'];
      toastId?: ToasterToast['id'];
    }
  | {
      type: ActionType['REMOVE_TOAST'];
      toastId?: ToasterToast['id'];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: 'REMOVE_TOAST',
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_TOAST':
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case 'UPDATE_TOAST':
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case 'DISMISS_TOAST': {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case 'REMOVE_TOAST':
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, 'id'>;

function toast({ variant = 'default', ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: 'UPDATE_TOAST',
      toast: { ...props, id },
    });
  
  const dismiss = () => {
    sonnerToast.dismiss(id);
    dispatch({ type: 'DISMISS_TOAST', toastId: id });
  };

  // Use Sonner's toast function based on variant
  let sonnerToastId: string | number;
  
  const toastMessage = props.title || props.description || '';
  const toastOptions = {
    description: props.title ? props.description : undefined,
    action: props.action,
    duration: props.duration,
    id,
  };

  switch (variant) {
    case 'success':
      sonnerToastId = sonnerToast.success(toastMessage, toastOptions);
      break;
    case 'error':
      sonnerToastId = sonnerToast.error(toastMessage, toastOptions);
      break;
    case 'destructive':
      sonnerToastId = sonnerToast.warning(toastMessage, toastOptions);
      break;
    case 'info':
      sonnerToastId = sonnerToast.info(toastMessage, toastOptions);
      break;
    default:
      sonnerToastId = sonnerToast(toastMessage, toastOptions);
  }

  dispatch({
    type: 'ADD_TOAST',
    toast: {
      ...props,
      variant,
      id,
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => {
      if (toastId) {
        sonnerToast.dismiss(toastId);
      } else {
        sonnerToast.dismiss();
      }
      dispatch({ type: 'DISMISS_TOAST', toastId });
    },
  };
}

export { useToast, toast };