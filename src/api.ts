export default {
  getCatsFactsLimited: (qty:number) => `https://cat-fact.herokuapp.com/facts?limit=${qty}&offset=0`,
 getCatsFacts: `https://cat-fact.herokuapp.com/facts`,
}