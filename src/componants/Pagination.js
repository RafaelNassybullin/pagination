import { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';

export const Pagination = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  const fetchingAoi = async () => {
    await axios.get(`http://localhost:8080/users?page=${currentPage}&limit=5`)
      .then((res) => {
        setItems([...items, ...res.data])
        setCurrentPage(prevState => prevState + 1)
      })
      .finally(() => setFetching(false))
  }

  useEffect(() => {
    if (fetching) {
      fetchingAoi()
    }
  }, [fetching])


  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerWidth) < 100) {
      setFetching(true)
    }
  }
  return (
    <>
      <h1>Simple Infinity Scroll Test</h1>
      {items.map((item) => (
        <Block key={item.id} color={item.color}><p>{item.user}</p></Block>
      ))}
    </>
  );
}

const Block = styled.div`
  width: 750px;
  height: 420px;
  border-radius: 20px;
  margin: 50px;
  background: ${props => props.color ? props.color : "crimson"};;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 120px;
    text-transform: uppercase;
    color: white;
    font-family: sans-serif;
  }
`

