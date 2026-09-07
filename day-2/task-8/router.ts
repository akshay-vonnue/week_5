type Router = {
    path: string,
    component: (params: Record<string, string>) => HTMLElement
}

export function createRouter() {
    const routes:Router[] = []

    function register(path: string, component: (params: Record<string, string>) => HTMLElement) {
        routes.push({
            path:path,
            component:component
        })
    }

    function navigate(path: string, params?: Record<string, string>): void{
        history.pushState({},"",path)
        console.log("inside navigate", path)
        route()
    }

    function route() {
        console.log("inside route..")
        let path = window.location.pathname

        // detail path
        let detailPathParams = path.split("/")
        if (detailPathParams.length === 3 && detailPathParams[1] === "detail") {

            let todoId = detailPathParams[2]
            let route = routes.find(route => route.path === '/detail/:id')

            if (!route) {
                // render404Page()
                console.log("page 404")
                return
            }
            route.component({})

            return
        }


        console.log("inside route", path) // /home
        
        if (path === '/') {
            console.log("entering root....")
            path = '/home'
        }

        let route = routes.find(route => route.path === path)
        console.log(route)

        if (!route) {
            // render404Page()
            console.log('page 404')
            return
        }

        route.component({})
    }

    window.onload = () => {
        route()
    }


    window.addEventListener("popstate", () => {
        console.log("popping...")
        route()
    })

    return {
        register,
        navigate,
        route
    }
}
