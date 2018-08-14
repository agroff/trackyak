class Cacheable {
    constructor(){
        this.cache = {};
    }

    cacheable(key, promise){
        if(this.cache.hasOwnProperty(key)){
            return Promise.resolve(this.cache[key]);
        }

        return promise.then((data)=>{
            this.cache[key] = data;
            return data;
        });
    }
}

export default Cacheable;