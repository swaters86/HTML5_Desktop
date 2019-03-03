import React, { Component } from 'react';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    let dragged;
  }

  dragOver(event) {
    // Prevent default to allow drop
    event.preventDefault();
  }

  dragLeave(event) {
    event.target.style.background = '';
  }

  dragEnter(event) {
    const target = event.target;
    if (target && this.dragged) {
      event.preventDefault();
      // Set the dropEffect to move
      event.dataTransfer.dropEffect = 'move'
      target.style.background = '#1f904e';
    }
  }

  drop(event) {
    const target = event.target;

    if (target.classList.value != 'drop-zone') {
      let closestAnchor = target.closest('.desktop-icon').id;
    }
    if (target && this.dragged && target.classList.value === 'drop-zone') {
      target.style.backgroundColor = '';
      event.preventDefault();

      this.dragged.parentNode.removeChild(this.dragged);
      this.dragged.style.opacity = '';
      console.log('target: ', target);
      target.appendChild(this.dragged);
    }
  }

  dragStart(event) {
    let target = event.target;

    if (target && target.nodeName === 'A') {
      this.dragged = target;
      event.dataTransfer.setData('text', target.id);
      event.dataTransfer.dropEffect = 'move';
      // Make it half transparent
      event.target.style.opacity = .3;
    }
  }

  dragEnd(event) {
    if (event.target && event.target.nodeName === 'A') {
      // Reset the transparency
      event.target.style.opacity = ''; // reset opacity when drag ends 
      this.dragged = null;
    }
  }

  render() {
    return (
      //{(e) => this.handleClick(e)}
      <div
        className='drop-zone'
        onDrop={(e) => this.drop(e)}
        onDragEnter={(e) => this.dragEnter(e)} 
        onDragLeave={(e) => this.dragLeave(e)}
        onDragOver={(e) => this.dragOver(e)}
      >
        <a id='desktop-icon'
          className='desktop-icon terminal'
          draggable='true'
          onDragStart={(e) => this.dragStart(e)}
          onDragEnd={(e) => this.dragEnd(e)}
          href='#'
        >
          <div className='shell'>
            <div className='window'>
              <div className='prompt-text'>
                <div className='chevron'>></div>
                <div className='underscore'>_</div>
              </div>
            </div>
          </div>
          <div className='label'>CSS Terminal</div>
        </a>
      </div>
    );
  }
}

export default App;
