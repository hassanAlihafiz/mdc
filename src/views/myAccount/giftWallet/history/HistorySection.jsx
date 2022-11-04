import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { 
  Select, TablePanel, Badge, Button,
	Popconfirm, SuccessNotification
} from 'components/common'
import {
	varKey, varLabel, varIs
} from 'common/var'
import {
	callGetApiWithAuth, callDeleteApiWithAuth
} from 'utils/api'
import { asDate, asUsdPrice } from 'utils/text'

export default function HistorySection(props) {
  const [tableMode, setTableMode] = useState('sent')
	const [tableData, setTableData] = useState([])
	const [paginationParam, setPaginationParam] = useState({
		currentPage: 1,
		perPage: 5,
		total: 0
	})
	const [columns, setColumns] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const onGetTableData = (res) => {
		setTableData(res.data.data)
		setPaginationParam({
			...paginationParam,
			currentPage: res.data.current_page,
			total: res.data.total
		})
		setIsLoading(false)
		props.setShouldLoad(false)
	}
	const onFailTableData = () => {
		setIsLoading(false)
		props.setShouldLoad(false)
	}
	const loadTableData = (paginationParam0) => {
		setIsLoading(true)
		const params = {
			page: paginationParam0.currentPage,
			per_page: paginationParam0.perPage,
		}
		const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
		if (tableMode==='purchase') {
			callGetApiWithAuth(`my_account/gift_wallet/purchase_histories?${q}`, 
				onGetTableData, onFailTableData
			)
		} else if (tableMode==='sent') {
			callGetApiWithAuth(`my_account/gift_wallet/sent_histories?${q}`, 
				onGetTableData, onFailTableData
			)
		} else if (tableMode==='received') {
			callGetApiWithAuth(`my_account/gift_wallet/received_histories?${q}`, 
				onGetTableData, onFailTableData
			)
		} else if (tableMode==='consume') {
			callGetApiWithAuth(`my_account/gift_wallet/consume_histories?${q}`, 
				onGetTableData, onFailTableData
			)
		} 
	}

	const onPageChange = (page) => {
		const paginationParam0 = {
			...paginationParam,
			currentPage: page
		}
		loadTableData(paginationParam0)
	}

	const handleSearch = () => {
		loadTableData(paginationParam)
	}

	useEffect(() => {
		if (tableMode==='purchase') {
			setColumns([
				{ 
					title: 'Date', 
					key: 'created_at',
					render: (_, record) => (
						<span>{asDate(record.created_at)}</span>
					)
				},
				{ 
					title: 'Product',
					key: 'product',
					render: (_, record) => (
						<span>{record.product.title}</span>
					)
				},
				{ 
					title: 'Amount',
					key: 'amount',
					render: (_, record) => (
						<span>{record.amount}</span>
					)
				}
			])
		} else if (tableMode==='sent') {
			setColumns([
				{ 
					title: 'Date',
					key: 'date',
					render: (_, record) => (
						<span>{asDate(record.created_at)}</span>
					)
				},
				{
					title: 'Amount',
					key: 'amount',
					render: (_, record) => (
						<span>{asUsdPrice(record.amount)}</span>
					)
				},
				{
					title: 'Receiver',
					key: 'receiver',
					render: (_, record) => (
						<span>
							{record.receiver?
								`${record.receiver.first_name} ${record.receiver.last_name}`
							: `${record.receiver_first_name} ${record.receiver_last_name}`}
						</span>						
					)
				},
				{
					title: 'Status',
					key: 'status',
					render: (_, record) => (
						<span>
							<Badge type={'giftTransferHistoryStatus'}
								keyName={varKey('giftTransferHistory.status', record.status)}
								label={varLabel('giftTransferHistory.status', record.status)}
							/>
						</span>
					)
				},
				{
					title: 'Action',
					key: 'action',
					render: (_, record) => (
						<div className='d-flex align-items-center'>
							{varIs('giftTransferHistory.status', record.status, 'pending') && 
								<CancelBtn data={record} 
									handleSearch={handleSearch}
								/>
							}
						</div>						
					)
				}
			])
		} else if (tableMode==='received') {
			setColumns([
				{ 
					title: 'Date',
					key: 'date',
					render: (_, record) => (
						<span>{asDate(record.created_at)}</span>
					)
				},
				{
					title: 'Amount',
					key: 'amount',
					render: (_, record) => (
						<span>{asUsdPrice(record.amount)}</span>
					)
				},
				{
					title: 'Sender',
					key: 'sender',
					render: (_, record) => (
						<span>
							{`${record.sender.first_name} ${record.sender.last_name}`}
						</span>						
					)
				},
				{
					title: 'Status',
					key: 'status',
					render: (_, record) => (
						<span>
							<Badge type={'giftTransferHistoryStatus'}
								keyName={varKey('giftTransferHistory.status', record.status)}
								label={varLabel('giftTransferHistory.status', record.status)}
							/>
						</span>
					)
				}
			])
		} else if (tableMode==='consume') {
			setColumns([
				{ 
					title: 'Date',
					key: 'date',
					render: (_, record) => (
						<span>{asDate(record.created_at)}</span>
					)
				},
				{
					title: 'Type',
					key: 'type', 
					render: (_, record) => (
						<span>
							{varLabel('giftConsumeHistory.type', record.type)}
						</span>
					)
				},
				{
					title: 'Amount',
					key: 'amount',
					render: (_, record) => (
						<span>{asUsdPrice(record.amount)}</span>
					)
				},
				{
					title: 'Comment',
					key: 'comment',
					render: (_, record) => (
						<span>{record.comment}</span>
					)
				}
			])
		}

		setTableData([])
		const paginationParam0 = {
			...paginationParam,
			currentPage: 1
		}
		loadTableData(paginationParam0)

	}, [tableMode])

	useEffect(() => {
		if (props.shouldLoad) {
			loadTableData(paginationParam)
		}
	}, [props.shouldLoad])

  return (
		<TablePanel 
			title={'Histories'}
			toolbar={
				<Select value={tableMode}
					onChange={v=>setTableMode(v)}
					options={[
						{ label: 'Purchase', value: 'purchase' },
						{ label: 'Sent', value: 'sent' },
						{ label: 'Received', value: 'received' },
						{ label: 'Consume', value: 'consume' },
					]}
					style={{ width: '120px' }}
				/>
			}
			columns={columns}
			data={tableData}
			paginationParam={paginationParam}
			onPageChange={onPageChange}
			loading={isLoading}
		/>
  )
}

const CancelBtn = (props) => {
	const dispatch = useDispatch()
	const [isUpdating, setIsUpdating] = useState(false)
	
	const onCancelDone = (res) => {
		SuccessNotification(res.message)
		setIsUpdating(false)
		dispatch({ type: 'auth.RELOAD' })
		props.handleSearch()
	}
	const onCancelFail = () => {
		setIsUpdating(false)
	}
	const handleCancel = () => {
		callDeleteApiWithAuth(`my_account/gift_wallet/${props.data.id}/cancel_transfer`, 
			onCancelDone, onCancelFail
		)
	}

	return (
		<Popconfirm onConfirm={handleCancel}>
			<Button loading={isUpdating}>
				Cancel
			</Button>
		</Popconfirm>
	)
}
