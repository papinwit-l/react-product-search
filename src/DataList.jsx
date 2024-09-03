import { useState, useEffect } from "react";

function DataList(props) {
  const { search } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allProduct, setAllProduct] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);

  const _LIMIT = 10;

  const fetchData = async (item = "") => {
    try {
      // const resp = await fetch(
      //   `https://dummyjson.com/products?limit=0&skip=0&select=title,category,price`
      // );
      const resp = await fetch(
        `https://dummyjson.com/products/search?q=${search}&limit=${_LIMIT}&skip=${skip}`
      );
      const data = await resp.json();
      console.log(data);
      setTotal(data.total);
      const result = data.products;
      // const result = data.products.filter(
      //   (el) =>
      //     String(el.title).toLowerCase().includes(search.toLowerCase()) ||
      //     String(el.category).toLowerCase().includes(search.toLowerCase()) ||
      //     String(el.price).toLowerCase().includes(search.toLowerCase())
      // );
      console.log(result);
      setAllProduct(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    fetchData();
  }, [skip]);

  const hdlClick = (num) => {
    setSkip((prev) => prev + num);
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {1 + skip > 1 && <button onClick={() => hdlClick(-10)}>prev</button>}
      <p>
        {1 + skip}-{skip + 10 < total ? skip + 10 : total} of {total}
      </p>
      {skip + 10 < total && <button onClick={() => hdlClick(10)}>next</button>}
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
