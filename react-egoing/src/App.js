import React, { Component } from 'react';
import TOC from './components/TOC';
import Content from './components/Content';
import Subject from './components/Subject';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      mode: 'read',
      selected_content_id: 2,
      subject: {title: 'WEB', sub: 'World Wide Web'},
      welcome: {title:'Welcom', desc:'Hello, React!'},
      contents: [
        {id:1, title:'HTML', desc:'HTML is HyperText ...'},
        {id:2, title:'CSS', desc:'CSS is for design ...'},
        {id:3, title:'JS', desc:'JS is for interaction ...'}
      ]
    }
  }
  render() {
    let _title, _desc = null;
    if(this.state.mode === 'welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    }
    else if(this.state.mode === 'read'){
      let id = this.state.selected_content_id - 1;
      _title = this.state.contents[id].title;
      _desc = this.state.contents[id].desc;
    }
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function(){
            this.setState({mode: 'welcome'});
          }.bind(this)}
        >
        </Subject>
        <TOC
          data={this.state.contents}
          onChangePage={function(id) {
            this.setState({
              mode: 'read',
              selected_content_id: Number(id)
            });
          }.bind(this)}
        >
        </TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
