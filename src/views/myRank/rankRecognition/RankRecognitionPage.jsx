import React from 'react'
import BadgeCard from './badge/BadgeCard'
import RecogCard from './recog/RecogCard'

export default function RankRecognitionPage() {
  return (
    <>
      <BadgeCard />
      <div style={{height: 24}} />
      <RecogCard />
      <div style={{height: 24}} />
    </>
  )
}
