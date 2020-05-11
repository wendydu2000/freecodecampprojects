import React from 'react';

class Quote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quotes: null,
            error: '',
            text: '',
            author: null,
            currentQuoteIndex: 0,
            currentColorIndex: 0,
            currentColor: "#0275d8"
        };

        this.handleNewQuote = this.handleNewQuote.bind(this);
    }

    componentDidMount() {
        fetch("https://type.fit/api/quotes")
        .then(response => response.json())
        .then(data => {
            let initIndex = Math.floor((Math.random() * data.length) + 1);
            this.setState({
                quotes: data,
                text: data[initIndex].text,
                author: data[initIndex].author,
                currentQuoteIndex: initIndex
            }, () => {
                this.handleBgColor();
            });
        })
        .catch(error => this.setState({ error }));
    }

    getRandomindex() {
        return Math.floor((Math.random() * this.state.quotes.length) + 1);
    }

    handleNewQuote(event) {
        const bgColors = ["#0275d8", "#5cb85c", "#5bc0de", "#f0ad4e"];
        const bgIndex = this.state.currentColorIndex;
        const colorIndex = (bgIndex === bgColors.length - 1 )? 0 : bgIndex + 1 ;
        const bgColor= bgColors[colorIndex];
        let quoteIndex = this.getRandomindex();
        while (this.state.currentQuoteIndex === quoteIndex) {
            quoteIndex = this.getRandomindex();
        }
        this.setState({
            text: this.state.quotes[quoteIndex].text,
            author: this.state.quotes[quoteIndex].author,
            currentQuoteIndex: quoteIndex,
            currentColorIndex: colorIndex,
            currentColor: bgColor,
        }, () => {
            this.handleBgColor();
        });
    }

    handleBgColor() {
        document.body.style.backgroundColor = this.state.currentColor;
        document.getElementById("tweet-quote").style.backgroundColor = this.state.currentColor;
        document.getElementById("new-quote").style.backgroundColor = this.state.currentColor;
        document.getElementById("text").style.color = this.state.currentColor;
    }

    render() {
        return (
            <div className="card-body" id="quote-box">
                <blockquote className="blockquote text-center">
                    <p className="quoteText" id="text">{this.state.text}</p>
                    <footer className="blockquote-footer text-right" id="author">
                        <cite title="Source Title">
                            {
                                this.state.author === null ? "Anonymous" : this.state.author
                            }
                        </cite>
                    </footer>
                </blockquote>
                <a className="btn text-light mr-2" id="tweet-quote" href="http://twitter.com/intent/tweet" role="button">tweet</a> 
                <a className="btn text-light" id="new-quote" href="/#" onClick={this.handleNewQuote}>New quote</a>
            </div>
        )
    }

}

export default Quote;
