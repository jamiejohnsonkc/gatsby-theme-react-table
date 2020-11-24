/** @jsx jsx */
import { jsx, Box } from 'theme-ui'
import React from 'react'

import styled from '@emotion/styled'
import { useTable } from 'react-table'

import makeData from './makeData'

const Styles = (props) => (
	<Box
		{...props}
		sx={{
			padding: '1rem',
			'& > table': {
				borderSpacing: '0px',
				border: '1px solid #000',
				tr: {
					borderBottom: '1px solid #777',
					':last-child': {
						td: {
							borderBottom: '0px',
						},
					},
				},

				'th,td': {
					margin: '0',
					padding: '0.5rem',
					borderBottom: '1px solid #000',
					borderRight: '1px solid #000',
					':last-child': {
						borderRight: '0px',
					},
				},
				// td: {
				// 	margin: '0',
				// 	padding: '0.5rem',
				// 	borderBottom: '1px solid #000',
				// 	borderRight: '1px solid #000',
				// 	':last-child': {
				// 		borderRight: '0',
				// 	},
				// },
			},
		}}
	/>
)

function Table({ columns, data }) {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
	} = useTable({
		columns,
		data,
	})

	// Render the UI for your table
	return (
		<table {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps()}>{column.render('Header')}</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row, i) => {
					prepareRow(row)
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
							})}
						</tr>
					)
				})}
			</tbody>
		</table>
	)
}

function SimpleExample() {
	const columns = React.useMemo(
		() => [
			{
				Header: 'Name',
				columns: [
					{
						Header: 'First Name',
						accessor: 'firstName',
					},
					{
						Header: 'Last Name',
						accessor: 'lastName',
					},
				],
			},
			{
				Header: 'Info',
				columns: [
					{
						Header: 'Age',
						accessor: 'age',
					},
					{
						Header: 'Visits',
						accessor: 'visits',
					},
					{
						Header: 'Status',
						accessor: 'status',
					},
					{
						Header: 'Profile Progress',
						accessor: 'progress',
					},
				],
			},
		],
		[]
	)

	const data = React.useMemo(() => makeData(20), [])

	return (
		<Styles>
			<Table columns={columns} data={data} />
		</Styles>
	)
}

export default SimpleExample
