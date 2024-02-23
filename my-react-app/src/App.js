import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useFetcher } from 'react-router-dom';


function App() {
  const [apiData, setApiData] = useState([]);
  const {storyComments, setStoryComments} = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = [];
        for (let i = 1; i < 11; i++) {
          const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${i}.json?print=pretty`);
          data.push(response.data);
        }
        console.log(data); //log the data
        setApiData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = [];
        for (let i = 2921983; i < 2922083; i++) {
          const response = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${i}.json?print=pretty`);
          comments.push(response.data);
        }
        console.log(comments); //log the comments
        setStoryComments(comments);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchComments();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {
          apiData.map((item, index) => (
            <div key={index} className='story'>
              <div className='story-top'>
                <h3>{item.title}</h3>
                <a href={item.url}>link</a>
              </div>
              <div className='story-bottom'>
                <p>{item.score} points by {item.by}</p>
              </div>
            </div>
          ))
        }
        {/* {
          storyComments.map((comment, index) => (
            <div key={index} className='comment'>
              <p>{comment.text}</p>
            </div>
          ))
        } */}
      </header>
    </div>
  );
}

export default App;
