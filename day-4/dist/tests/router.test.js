import { describe, it, expect, beforeEach, vi } from "vitest";
import { createRouter } from "../router.js";
describe("router test", () => {
    beforeEach(() => {
        window.history.pushState({}, "", "/");
        document.body.innerHTML = `<div id="app"></div>`;
    });
    it("testing navigaiton", () => {
        let router = createRouter();
        const homeComponent = vi.fn();
        const detailsPageComponent = vi.fn();
        router.register('/home', homeComponent);
        router.register('/detail/:id', detailsPageComponent);
        expect(window.location.href).toBe('http://localhost:3000/');
        router.navigate('/home');
        expect(homeComponent).toHaveBeenCalledOnce();
        expect(window.location.href).toBe('http://localhost:3000/home');
        console.log(window.location.href);
        router.navigate('/detail/0');
        expect(detailsPageComponent).toHaveBeenCalled();
        router.navigate('/');
        expect(homeComponent).toHaveBeenCalledTimes(2);
        // document.body.innerHTML = `
        //     <div class="app"></div>
        // `
        // // router.navigate('/someErrorState');
        // // let app = document.querySelector(".app") as HTMLElement;
        // // expect(render404Page).toHaveBeenCalled()
    });
});
