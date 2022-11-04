import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  Spin
} from 'components/common'
import OrganizationChart from '@dabeng/react-orgchart'
import TreeNode from './TreeNode'
import DetailBox from './DetailBox'
import SearchBar from './SearchBar'

export default function TreeView ({ 
  page, treeData, isLoading, 
  loadRoot, loadParent, search,
}) {
  return (
    <Wrapper>
      {treeData &&
        <>
          <SearchBar 
            page={page}
            treeData={treeData} 
            loadRoot={loadRoot}
            loadParent={loadParent}
            search={search}
          />
          <OrganizationChart
            datasource={treeData}
            pan={true}
            zoom={false}
            collapsible={false}
            draggable={false}
            NodeTemplate={TreeNode}
          />
          <DetailBox 
            page={page}
          /> 
        </>
      }
      {isLoading &&
      <div className={'loadingRoot'}>
        <Spin spinning={true} className={`spinner`} />
      </div>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  position: relative;
  padding-top: 0;
  min-height: 400px;,
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(53, 64, 82, 0.25);
  .orgchart-container {
    background-color: transparent;
    border: 0 none;
    height: calc(100vh - 135px);
    width: calc(100% - 20px);
  },
  .orgchart {
    background-image: none;
    cursor: move !important;
    ul > li > ul li {
      &::before {
        border: 1px solid rgba(53, 64, 82, 0.25);
      }
      & > .oc-node {
        &::before {
          background-color: rgba(53, 64, 82, 0.25);
        }
      }
    }
    ul {
      li {
        .oc-node {
          &:hover, &:focus, &:active, &.selected {
            background-color: transparent;
          }        
        }
      }
    }
  }
  .orgchart ul li .oc-node:not(:only-child)::after {
    background-color: rgba(53, 64, 82, 0.25);
  }
  .loadingRoot {
    width: 100%;
    height: 100%;
    min-height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
