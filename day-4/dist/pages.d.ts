import { PageParams, Router, Store } from "./type.js";
export declare function renderHomePage(): void;
export declare function renderListPage(store: Store, router: Router): void;
export declare function renderSettingsPage(store: Store): void;
export declare function renderDetailPage({ todoId, store }: PageParams): void;
export declare function render404Page(): void;
