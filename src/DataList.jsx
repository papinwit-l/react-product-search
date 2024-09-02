import { useState, useEffect } from "react";

function DataList(props) {
  const { search } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProduct, setAllProduct] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(0);

  const fetchData = async (item = "") => {
    try {
      const resp = await fetch(
        `https://dummyjson.com/products?limit=0&skip=0&select=title,category,price`
      );
      const data = await resp.json();
      const result = data.products.filter(
        (el) =>
          String(el.title).toLowerCase().includes(search.toLowerCase()) ||
          String(el.category).toLowerCase().includes(search.toLowerCase()) ||
          String(el.price).toLowerCase().includes(search.toLowerCase())
      );
      console.log(result);
      setAllProduct(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 2000);
    return () => {
      clearTimeout();
    };
  }, [search]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      <ul>
        {allProduct.map((el) => (
          <li>
            {el.title} | {el.category} | {el.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DataList;
