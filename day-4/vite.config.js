import { defineConfig } from "vite";
import path from 'path';

export default defineConfig({
    test: {
        environment: "jsdom"
    },
    resolve: {
        alias: {
            '@components':path.resolve(__dirname,'./src/components')
        }
    }
})