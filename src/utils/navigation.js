let navigateFn = null

export const setNavigator = (navigate) => {
    navigateFn = navigate
}

export const navigateTo = (path, options) => {
    if (navigateFn) {
        navigateFn(path, options)
    } else {
        window.location.href = path
    }
}