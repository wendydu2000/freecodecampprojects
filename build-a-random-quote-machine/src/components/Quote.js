import React from 'react';

class Quote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quotes: null,
            error: '',
            text: '',
            author: ''
        }
    }

    componentDidMount() {
        fetch("https://type.fit/api/quotes")
        .then(response => response.json())
        .then(data => {
            let initIndex = Math.floor((Math.random() * data.length) + 1);
            console.log(initIndex);
            this.setState({
                quotes: data,
                text: data[initIndex].text,
                author: data[initIndex].author
            });
        })
        .catch(error => this.setState({ error }));
    }

    getRandomindex() {
        return Math.floor((Math.random() * this.state.quotes.length) + 1);
    }

    render() {
        return (
            <div className="card-body" id="quote-box">
                <blockquote className="blockquote text-center">
                    <p className="mb-0" id="text">{this.state.text}</p>
                    <footer className="blockquote-footer text-right" id="author">
                        <cite title="Source Title">{this.state.author}</cite>
                    </footer>
                </blockquote>
                <a className="btn btn-primary mr-2" id="tweet-quote">tweet</a> 
                <a className="btn btn-primary" id="new-quote">New quote</a>
            </div>
        )
    }

}

export default Quote;
