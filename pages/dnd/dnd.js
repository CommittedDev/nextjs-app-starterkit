import React, { Component } from 'react'
import DND from 'src/components/dnd/DND'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'



export default class Dnd extends Component {
    render() {
        return (
            <div className="App">
                <DndProvider backend={HTML5Backend}>
                    <DND />
                </DndProvider>
            </div>
        )
    }
}