import React from 'react'
import CButton from "../../../components/CButton";

export const tableData = {
  tHead: [
    {
      key: 'key',
      title: 'key',
      dataIndex: 'key',
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'name',
      filterMultiple: false,
      filters: [
        {
          value: '1',
          text: '用户类型1'
        },
        {
          value: '2',
          text: '用户类型2'
        },
        {
          value: '3',
          text: '用户类型3'
        }
      ]
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: 'address',
      filterMultiple: true,
      filters: [
        {
          value: '1',
          text: '用户类型1'
        },
        {
          value: '2',
          text: '用户类型2'
        },
        {
          value: '3',
          text: '用户类型3'
        }
      ]
    },
    {
      key: 'phone',
      dataIndex: 'phone',
      title: 'phone',
      filterMultiple: true,
      filters: [
        {
          value: '1',
          text: '用户类型1'
        },
        {
          value: '2',
          text: '用户类型2'
        },
        {
          value: '3',
          text: '用户类型3'
        }
      ]
    },
    {
      key: 'IDCard',
      dataIndex: 'IDCard',
      title: 'IDCard',
      filterMultiple: true,
      filters: [
        {
          value: '1',
          text: '用户类型1'
        },
        {
          value: '2',
          text: '用户类型2'
        },
        {
          value: '3',
          text: '用户类型3'
        }
      ]
    },
    {
      key: 'operate',
      dataIndex: 'operate',
      title: '操作',
      width: 60,
      render: () => <CButton type='text'>查看</CButton>,
    }
  ],
  tBody: [
    {
      key: '1',
      name: '111',
      age: '222',
      grade: '333',
      checked: true
    }
  ],
  tPage: {
    total: 0,
    page: 1,
    pageSize: 10
  }
};
