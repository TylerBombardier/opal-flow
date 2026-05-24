export class UIRegistry {
    private registry = new Map<string, any>()

    register(key: string, component: any){
        this.registry.set(key,component)
    }

    get(key: string){
        return this.registry.get(key);
    }

    has(key: string){
        return this.registry.has(key);
    }

    getAll() {
        return Array.from(this.registry.values());
    }

    getMap() {
        return this.registry;
    }

    clear() {
        this.registry.clear();
    }
}
