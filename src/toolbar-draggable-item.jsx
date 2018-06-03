/**
  * <ToolbarItem />
  */

import React from 'react'
import PropTypes from 'prop-types'
import { DragSource, ConnectDragSource } from 'react-dnd'
import ItemTypes from './ItemTypes'

const cardSource = {
	beginDrag(props) {
		return {
			id: '',
      index: -1,
      data: props.data,
      onCreate: props.onCreate
		}
	},
}

@DragSource(ItemTypes.CARD, cardSource, connect => ({
	connectDragSource: connect.dragSource(),
}))
export default class ToolbarItem extends React.Component {

	render() {
		const { connectDragSource, data, onClick } = this.props
		return (
			connectDragSource && connectDragSource(
        <li onClick={onClick}><i className={data.icon}></i>{data.name}</li>
      )
		)
	}
}