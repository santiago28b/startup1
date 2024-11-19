import React from 'react';

export function About() {

  const [imageUrl, setImageUrl] = React.useState('data:image/gif;base64,R0lGODlhAQABAIAAAAUEBAAAACwAAAAAAQABAAACAkQBADs=');
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');

  // We only want this to render the first time the component is created and so we provide an empty dependency list.
  React.useEffect(() => {
    const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#picture');

        const defaultWidth = 600;
        const defaultHeight = 400;

        const width = containerEl?.offsetWidth || defaultWidth;
        const height = containerEl?.offsetHeight || defaultHeight;

        const apiUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
        setImageUrl(apiUrl);
      })
      .catch();

    fetch('https://quote.cs260.click')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.quote);
        setQuoteAuthor(data.author);
      })
      .catch();
  }, []);

  return (
    <main className='container-fluid bg-secondary text-center'>
        <p className="lead" style={{color:"black"}} > 
        Habit App is a web app that you can use to manage and track your goal and habits. In this app you will be able to create a new goal and track them, you can see how other people makes new goals and you can set a time to complete them days or weeks.
        </p>
        <p className="h1" style={{color:"black"}}>Motivational quote of the day</p>
        
        <hr></hr>
        <div id='picture' style={{ width: '600px', height: '400px' }}>
        <img  src={imageUrl} className="img-fluid" style={{width:'100%', height:'100%'}} alt="stock background"></img>
        </div>
        <br></br>
        <figure className="text-center">
            <blockquote className="blockquote">
              <p style={{color:"black"}}>{quote}</p>
            </blockquote>
            <figcaption className="blockquote-footer">
               {quoteAuthor}
            </figcaption>
          </figure>
    </main>
  );
}