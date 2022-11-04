import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { callGetApiWithAuth } from 'utils/api'
import TreeView from 'components/treeView/TreeView'

export default function BinaryTreePage() {
  const dispatch = useDispatch()
  const nodeCount = 5
  const [isLoading, setIsLoading] = useState(false)
  const [treeData, setTreeData] = useState(undefined)
  const shouldSearchAgain = useSelector(state=>state.binaryTree.shouldSearchAgain)
  const searchingUserId = useSelector(state=>state.binaryTree.searchingUserId)  

  const onGetTreeData = (res) => {
    setIsLoading(false)
    
    setTreeData(res.data)
    dispatch({ type: 'binaryTree.SEARCH_DONE' })
  }
  const onFailTreeData = () => {
    setIsLoading(false)
    dispatch({ type: 'binaryTree.SEARCH_DONE' })
  }
  const loadTreeData = (userId) => {
    setIsLoading(true)
    setTreeData(undefined)
    const params = {
      user_id: userId,
      nodes: nodeCount
    }
    const q = Object.keys(params).map(k=>k+'='+params[k]).join('&')
    callGetApiWithAuth(`my_team/binary_tree/tree?${q}`, onGetTreeData, onFailTreeData)
  }
  const loadRoot = () => {
    loadTreeData('')
    dispatch({ type: 'binaryTree.INIT' })
  }
  const loadParent = () => {
    if (treeData.parent_id) {
      loadTreeData(treeData.parent_id)
    }
  }
  const search = (userId) => {
    loadTreeData(userId)
  }  

  useEffect(() => {
    if (shouldSearchAgain) {
      loadTreeData(searchingUserId)
    }
  }, [shouldSearchAgain])

  useEffect(() => {
    loadTreeData('')
    dispatch({ type: 'binaryTree.INIT' })
  }, [])

  return (
    <TreeView 
      page={'binary'}
      treeData={treeData} 
      isLoading={isLoading} 
      loadRoot={loadRoot}
      loadParent={loadParent}
      search={search}
    />
  )
}
