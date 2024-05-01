import { writable } from 'svelte/store'

export function useStorage(key, initialValue) {
    let serialize = JSON.stringify
    let deserialize = JSON.parse

    // get stored value
    let storedValue = deserialize(localStorage.getItem(key))

    // if value exists return it otherwise use initial value
    let store = writable(storedValue ? storedValue : initialValue)
    // subscribe to the store and update local storage when it changes
    store.subscribe((value) => localStorage.setItem(key, serialize(value)))

    return store
}
