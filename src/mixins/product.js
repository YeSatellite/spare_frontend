export default {
  methods:{
    productsFilter(filter){
      let products = this.$store.getters.products;

      if(filter == null) return products;

      if(filter.device && filter.device.length === 1){
        products = products.filter(product => product.type.device.id === this.filter.device[0]+1)
      }

      if(filter.few){
        products = products.filter(product => product.amount < 2)
      }

      if (filter.search) {
        let newProducts = products.slice();
        const searches = filter.search.split(',').map((part)=>part.trim());
        console.log(searches);
        for(let search of searches) {
          console.log(search);
          let tmp = products.filter((product) => {
            return product.name.includes(search)
                || product.type.name.includes(search)
          });
          newProducts = newProducts.filter(value => -1 !== tmp.indexOf(value));
        }
        products = newProducts
      }

      return products
    }
  }
}
