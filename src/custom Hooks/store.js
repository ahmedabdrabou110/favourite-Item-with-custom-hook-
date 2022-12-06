import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (listener = true) => {
  //   console.log("RENDERING");
  const setState = useState(globalState)[1];

  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };

    for (const listener of listeners) {
      if (listener) {
        listener(globalState);
      }
    }
  };

  useEffect(() => {
    if (listener) {
      listeners.push(setState);
    }

    return () => {
      listeners = listeners.filter((li) => li !== setState);
    };
  }, [setState, listener]);

  return [globalState, dispatch];
};

export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
};

async function getTodos() {
  try {
    // wait for te response
    const response = await fetch("https://jsonplaceholder.typcode.com/todos/1");
    const post = await response.json();
    return post;
  } catch (error) {
    alert(error.message);
  }
}

console.log(await getTodos());
