import React from 'react'
import StatCard from './stat/StatCard'
import TableView from './table/TableView'

export default function UnilevelListPage() {
  return (
    <>
      <StatCard />
      <div style={{height: 24}} />
      <TableView />
    </>
  )
}
