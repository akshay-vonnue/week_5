import { render404Page } from "./pages.js"
import { store } from "./main.js"
import { Route } from "./type.js"

export function createRouter(): {
    register: (path: string, component: () => void) => void,
    navigate: (path: string) => void,
    route:() => void
} {
    const routes:Route[] = []

    function register(path:string,component:() => void){
        routes.push({
            path:path,
            component:component
        })
    }

    function navigate(path:string){
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

            let todoId = Number(detailPathParams[2])
            let route = routes.find(route => route.path === '/detail/:id')

            if (!route) {
                render404Page()
                console.log("page 404")
                return
            }

            route.component({todoId,store})

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
            render404Page()
            console.log('page 404')
            return
        }

        route.component()
    }

    window.onload = () => {
        console.log('laodiajdkajsdkajdkajdkajd')
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